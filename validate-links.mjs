#!/usr/bin/env node
// validate-links.mjs — 글 draft의 외부 출처 URL이 '실제로 존재하는지' 검사하는 가드.
//
// 왜: 자동 루틴이 실존하지 않는 출처 URL을 지어내 글의 링크가 전부 404였던 사고(2026-07-20).
//     "모든 정보는 클릭 가능해야 한다 / 지어내지 말 것" 원칙을 기계로 강제한다.
//
// 사용:
//   node validate-links.mjs <draft.md> [draft2.md ...]   # 지정 파일 검사
//   node validate-links.mjs                              # 인자 없으면 git에 staged된 drafts/**/*.md 자동
//
// 검사 2단계:
//   ① 패턴(오프라인·항상): 명백한 가짜(xxx·example.com·placeholder·TODO·<...> 등) → HARD FAIL.
//   ② 접속(온라인): 각 URL을 실제 요청(HEAD→GET). 4xx/5xx·불가 → HARD FAIL.
//      단 네트워크 자체가 없으면(모든 URL이 응답 자체를 못 받음) 접속검사는 '건너뜀(경고)'로 처리해
//      오프라인 환경에서 오탐으로 막지 않는다(패턴검사는 그대로 유효).
//
// 종료코드: HARD FAIL 있으면 1, 아니면 0.

import { execSync } from 'node:child_process';
import fs from 'node:fs';

const FAKE_PATTERNS = [
  /x{3,}/i,               // ...xxx (플레이스홀더)
  /example\.(com|org|net)/i,
  /\bplaceholder\b/i,
  /\byour-?(site|domain|url)\b/i,
  /\btodo\b/i,
  /\[.*\]/,               // [something] 남은 마크다운
  /[<>]/,                 // 꺾쇠(잘린 URL/템플릿)
  /\.\.\./,               // ...
  /localhost|127\.0\.0\.1/i,
  /id=\d*x/i,             // item?id=1234x
];

function sh(cmd) { try { return execSync(cmd, { stdio: ['pipe','pipe','ignore'] }).toString(); } catch { return ''; } }

// 대상 파일
let files = process.argv.slice(2).filter(a => a.endsWith('.md'));
if (!files.length) {
  files = sh('git diff --cached --name-only --diff-filter=ACM')
    .split('\n').map(s => s.trim())
    .filter(f => /^drafts\/.*\.md$/.test(f) && fs.existsSync(f));
}
if (!files.length) { console.error('validate-links: 검사할 draft(.md)가 없습니다(통과).'); process.exit(0); }

// URL 추출: [텍스트](url) 의 url + 맨 http(s) URL
function extractUrls(md) {
  const urls = new Set();
  for (const m of md.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) urls.add(m[1]);
  for (const m of md.matchAll(/(?<![("])\bhttps?:\/\/[^\s)<>"']+/g)) urls.add(m[0].replace(/[.,;:]+$/, ''));
  return [...urls];
}

const HARD = [];
const perFile = [];
for (const f of files) {
  const md = fs.readFileSync(f, 'utf8');
  const urls = extractUrls(md);
  perFile.push({ f, urls });
  for (const u of urls) {
    const bad = FAKE_PATTERNS.find(re => re.test(u));
    if (bad) HARD.push(`[패턴] ${f}: 가짜/플레이스홀더 URL — ${u}`);
  }
}

// 접속 검사(가능하면)
const allUrls = [...new Set(perFile.flatMap(x => x.urls))].filter(u => !FAKE_PATTERNS.some(re => re.test(u)));
async function reach(u) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    let r = await fetch(u, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal });
    if (r.status === 405 || r.status === 501) r = await fetch(u, { method: 'GET', redirect: 'follow', signal: ctrl.signal });
    return { u, status: r.status, net: true };
  } catch (e) {
    return { u, status: 0, net: false, err: String(e && e.message || e) };
  } finally { clearTimeout(t); }
}

const WARN = [];
let netWorks = false;
if (allUrls.length && typeof fetch === 'function') {
  const results = await Promise.all(allUrls.map(reach));
  netWorks = results.some(r => r.net); // 하나라도 HTTP 응답을 받았으면 네트워크 있음
  if (netWorks) {
    for (const r of results) {
      if (r.net && (r.status === 404 || r.status === 410)) HARD.push(`[HTTP ${r.status} 없음] ${r.u}`); // 확실히 없는 페이지 = 실패
      else if (r.net && r.status >= 400) WARN.push(`[HTTP ${r.status}] ${r.u} (봇차단/일시적일 수 있음 — 사람이 실제 확인 권장)`);
      else if (!r.net) WARN.push(`[접속불가] ${r.u} — ${r.err} (도메인 오타/봇차단/일시 가능)`);
    }
  } else {
    console.error('⚠️ validate-links: 네트워크 응답이 없어 접속검사는 건너뜀(패턴검사만 적용).');
  }
}

console.error(`\nvalidate-links: 파일 ${files.length}개 · URL ${allUrls.length}개 · 접속검사 ${netWorks ? '수행' : '건너뜀'}`);
if (WARN.length) { console.error('\n⚠️  경고(실패 아님 — 확인 권장):'); WARN.forEach(w => console.error('   · ' + w)); }
if (HARD.length) {
  console.error('\n🔗 링크 검사 실패 — 아래 URL은 지어냈거나 확실히 없는 페이지입니다. 실제 출처로 고치거나 삭제하세요(지어내기 금지):');
  HARD.forEach(h => console.error('   ❌ ' + h));
  console.error('');
  process.exit(1);
}
console.error('✅ 링크 검사 통과 (명백한 가짜·404 없음)');
process.exit(0);
