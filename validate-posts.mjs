#!/usr/bin/env node
// validate-posts.mjs — posts.json 보호 게이트 (강함/Git 문지기)
// 자동 루틴이 대시보드 명단(posts.json)을 망가뜨리는 사고를 커밋 단계에서 물리적으로 차단한다.
//
// 잠금 3개:
//   ① 명단 축소 방지  — 글 수가 이전보다 줄면 거부 (2026-07-20 사고: 루틴②가 16→2편으로 통째 덮어씀)
//   ② 발행글 보호      — 이미 '발행'된 글의 상태·발행일을 되돌리거나 삭제하면 거부 (moonshot-kimi-k3 회귀)
//   ③ 껍데기 초안 거부 — 작성중/검수중 글의 초안이 너무 짧으면(세 줄 요약 스텁) 거부
//
// 사람이 일부러 하는 작업 우회 스위치(환경변수):
//   ALLOW_POSTS_SHRINK=1  — 글을 의도적으로 삭제할 때(잠금①)
//   ALLOW_POSTS_CHANGE=1  — 발행글을 의도적으로 내리거나 바꿀 때(잠금②)
//   ALLOW_SHORT_DRAFT=1   — 짧은 초안을 의도적으로 둘 때(잠금③)
//
// 실행 모드:
//   (기본) pre-commit hook — 스테이징된 내용(:posts.json)을 직전 커밋(HEAD)과 비교
//   --ci                   — 서버(GitHub Actions)용. HEAD를 부모(HEAD~1)와 비교

import { execSync } from 'node:child_process';
import fs from 'node:fs';

const MIN_DRAFT_CHARS = 1500; // 실측: 실제 글 최소 2429자 · 스텁 427자 → 1500이면 안전 분리

const CI = process.argv.includes('--ci');
const [CUR, PREV] = CI ? ['HEAD', 'HEAD~1'] : ['', 'HEAD']; // CUR=''  →  git show :file (스테이징)

const HARD = [];
const WARN = [];
const H = (m) => HARD.push(m);
const W = (m) => WARN.push(m);

function sh(cmd) {
  try { return execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'] }).toString(); }
  catch { return null; }
}
const showCur = (f) => sh(`git show ${CUR}:${f}`);
const showPrev = (f) => sh(`git show ${PREV}:${f}`);

// ── 현재(커밋될) posts.json ──
const curRaw = showCur('posts.json');
if (curRaw === null) process.exit(0); // 이번 커밋에 posts.json 변경 없음 → 검사 불필요

let cur;
try { cur = JSON.parse(curRaw); }
catch (e) { console.error('🔒 posts.json 잠금 — JSON 파싱 실패, 커밋 거부:', e.message); process.exit(1); }

// ── 이전 posts.json (없으면 최초 커밋 → 비교 잠금은 건너뜀) ──
let prev = null;
const prevRaw = showPrev('posts.json');
if (prevRaw) { try { prev = JSON.parse(prevRaw); } catch { prev = null; } }

const cPosts = cur.posts || [];
const pPosts = prev ? (prev.posts || []) : [];

// ── 잠금 ① 명단 축소 방지 ──
if (prev && !process.env.ALLOW_POSTS_SHRINK) {
  if (cPosts.length < pPosts.length) {
    const cIds = new Set(cPosts.map((p) => p.id));
    const gone = pPosts.filter((p) => !cIds.has(p.id)).map((p) => p.id);
    H(`잠금①(명단 축소): 글이 ${pPosts.length} → ${cPosts.length}편으로 줄었습니다.`
      + `\n        사라진 글: ${gone.join(', ')}`
      + `\n        일부러 지우는 거면  ALLOW_POSTS_SHRINK=1 git commit ...  으로 다시 실행.`);
  }
}

// ── 잠금 ② 발행글 보호 ──
if (prev && !process.env.ALLOW_POSTS_CHANGE) {
  const cById = new Map(cPosts.map((p) => [p.id, p]));
  for (const pp of pPosts) {
    if (pp.stage !== '발행') continue;
    const cp = cById.get(pp.id);
    if (!cp) { H(`잠금②(발행글 보호): 발행된 글 '${pp.id}'가 명단에서 사라졌습니다.`); continue; }
    if (cp.stage !== '발행') H(`잠금②(발행글 보호): 발행글 '${pp.id}' 상태가 '발행' → '${cp.stage}'로 바뀌었습니다.`);
    if (pp.published && !cp.published) H(`잠금②(발행글 보호): 발행글 '${pp.id}'의 발행일(published)이 지워졌습니다.`);
  }
}

// ── 잠금 ③ 껍데기 초안 거부 ──
if (!process.env.ALLOW_SHORT_DRAFT) {
  for (const p of cPosts) {
    if (p.stage !== '작성중' && p.stage !== '검수중') continue; // 발행글은 이미 검증됨
    const v = p.versions && p.versions[0];
    if (!v || !v.path) { W(`잠금③: '${p.id}' 최신 버전 경로가 없습니다.`); continue; }
    let body = showCur(v.path);
    if (body === null) { try { body = fs.readFileSync(v.path, 'utf8'); } catch { body = null; } }
    if (body === null) { H(`잠금③(껍데기): '${p.id}' 초안 파일이 없습니다: ${v.path}`); continue; }
    if (body.length < MIN_DRAFT_CHARS) {
      H(`잠금③(껍데기): '${p.id}' 초안이 ${body.length}자로 너무 짧습니다(최소 ${MIN_DRAFT_CHARS}자).`
        + ` 세 줄 요약만 저장된 껍데기일 수 있음: ${v.path}`);
    }
  }
}

if (WARN.length) { console.error('\n⚠️  posts.json 경고:'); WARN.forEach((w) => console.error('   - ' + w)); }
if (HARD.length) {
  console.error('\n🔒 posts.json 잠금 발동 — 커밋 거부:');
  HARD.forEach((h) => console.error('   ❌ ' + h));
  console.error('\n   (사람이 일부러 하는 작업이면 위 안내의 우회 스위치를 붙여 다시 커밋하세요.)\n');
  process.exit(1);
}
console.error(`✅ posts.json 잠금 통과 (${cPosts.length}편 · 발행 ${cPosts.filter((p) => p.stage === '발행').length})`);
process.exit(0);
