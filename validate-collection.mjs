// validate-collection.mjs — 수집 3탭 품질 게이트 (루틴 ① 완료 조건)
// 규칙(system/daily-collection.md): "탭을 하나라도 만든 소식은 정리본·자세히·💬 반응 3탭을
//   빠짐없이, 순서대로, 실존 파일로 갖추고, 반응은 5개 정규 각도를 모두 담는다."
// 이 스크립트가 그 규칙의 '기계가 검사하는 정본'이다. 산문 규칙만으로는 Haiku가 뭉갤 수 있어
//   (자세히 누락·각도 축약·밀도 저하 등) 커밋 전에 반드시 통과해야 한다.
//
// 실행:  node validate-collection.mjs
// 종료 코드:  위반(HARD FAIL) 있으면 1, 없으면 0.  (CI·루틴 완료 게이트로 사용)
// 의존:  Node 내장 fs만.

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = process.cwd();
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(ROOT, p));

// ---------- 발행 브랜치 (단일 정본) ----------
// 대시보드/사이트가 빌드되는 저장소 '기본 브랜치'. 수집물은 반드시 여기로 커밋돼야
//   대시보드에 뜬다. 자동 세션은 매번 임시 작업 브랜치(claude/…-xxxx)로 스폰되므로,
//   그 브랜치에 커밋하면 푸시는 되지만 대시보드엔 영영 안 보인다(2026-07-16 사고).
// 그래서 '틀린 브랜치면 커밋 자체를 막는' 하드 가드를 여기(유일한 강제 관문)에 둔다.
//   기본 브랜치가 바뀌면 이 상수만 고친다. 로컬 개발용 우회: ALLOW_ANY_BRANCH=1.
const PUBLISH_BRANCH = 'claude/github-upload-setup-vimtlp';

const gitTry = (cmd) => {
  try { return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim(); }
  catch { return null; }
};
// 현재 브랜치
const curBranch = gitTry('git rev-parse --abbrev-ref HEAD');
// 원격 기본 브랜치(권위 있음, 네트워크). 안 되면 로컬 심볼릭레프 → 그것도 없으면 상수.
const remoteDefault = (() => {
  const ls = gitTry('git ls-remote --symref origin HEAD');
  const m = ls && ls.match(/^ref:\s+refs\/heads\/(\S+)\s+HEAD/m);
  if (m) return m[1];
  const sym = gitTry('git symbolic-ref --short refs/remotes/origin/HEAD');
  if (sym && sym.startsWith('origin/')) return sym.slice('origin/'.length);
  return null;
})();
const expectedBranch = remoteDefault || PUBLISH_BRANCH;

// ---------- 규칙 상수 ----------
// 반응(H)은 여러 각도(섹션)를 담아야 한다. HARD 기준은 '각도 섹션 개수'다 —
//   이번 사고(3~4각도로 축약·1불릿)는 잡고, 표현이 다른 풍부한 파일(🤖 AI업계, 번호형 8섹션 등)은
//   통과시키기 위해서다. 특정 각도 '정확 매칭'은 대체 분류(🏢 vs 🤖)를 오탐하므로 WARN(가이드)로만 둔다.
const MIN_ANGLE_SECTIONS = 5; // 반응 각도 섹션(종합·출처 제외) 최소 개수 — 빈 각도는 '갭'으로라도 채운다.
const THIN_BYTES = 2500;      // 이 미만이면 '얇음' 경고(정직한 갭은 허용하므로 하드페일 아님).

// 표준 5각도 — 있으면 좋다는 '가이드'(WARN)용. 문구/이모지가 파일마다 달라 관대하게 탐지.
const ANGLES = [
  { key: '🇰🇷 한국',         re: /🇰🇷|한국/ },
  { key: '🏛️ 정치권·국가별', re: /🏛️|정치|규제|국가별|정부|의회|백악관|당국/ },
  { key: '🏢 경쟁/업계',      re: /🏢|🤖|경쟁|라이벌|CEO|맞불|경쟁사|업계/ },
  { key: '⚖️ 당사자·윤리',    re: /⚖️|👤|💼|당사자|윤리|시민|노동|노조|인권|이용자|사용자|제작자/ },
  { key: '📱 소셜',          re: /📱|🌍|🌐|소셜|여론|레딧|트위터|스레드|디시|HN|커뮤니티|지정학/ },
];
const TAB_ORDER = ['정리본', '자세히', '반응']; // 반드시 이 상대 순서

// ---------- 결과 수집 ----------
const hard = []; // 커밋 차단
const warn = []; // 참고
const H = (item, msg) => hard.push(`❌ [${item}] ${msg}`);
const W = (item, msg) => warn.push(`⚠️  [${item}] ${msg}`);

// ---------- 브랜치 가드 (커밋 전 최우선) ----------
// 임시 브랜치에 수집물을 커밋하는 사고(대시보드 미반영)를 '기계가' 차단한다.
if (process.env.ALLOW_ANY_BRANCH === '1') {
  W('브랜치', `ALLOW_ANY_BRANCH=1 — 브랜치 가드 우회(로컬 개발용). 현재: ${curBranch || '?'}`);
} else if (!curBranch) {
  W('브랜치', 'git 브랜치를 확인할 수 없음 — git 저장소가 맞는지 확인');
} else if (curBranch === 'HEAD') {
  H('브랜치', `detached HEAD 상태 — 발행 브랜치(${expectedBranch})로 checkout 후 작업하세요.`);
} else if (curBranch !== expectedBranch) {
  H('브랜치',
    `현재 '${curBranch}' — 수집물은 반드시 발행 브랜치 '${expectedBranch}'에 커밋해야 대시보드에 뜬다. ` +
    `해결: git fetch origin && git checkout -B ${expectedBranch} origin/${expectedBranch}  (작업 파일은 따라온다) → 재검증 후 커밋.`);
} else if (remoteDefault && remoteDefault !== PUBLISH_BRANCH) {
  // 브랜치는 맞지만 상수가 원격 기본과 어긋남 — 정본 갱신 필요(차단은 안 함).
  W('브랜치', `PUBLISH_BRANCH 상수('${PUBLISH_BRANCH}')가 원격 기본('${remoteDefault}')과 다름 — validate-collection.mjs 상수를 갱신하세요.`);
}

// ---------- 로드 ----------
const inbox = JSON.parse(read('inbox.json'));
const items = inbox.items || [];
const withTabs = items.filter((it) => Array.isArray(it.articleVersions) && it.articleVersions.length);

// slug(파일 경로에서 역추출) — 오류 메시지용 짧은 이름
const shortName = (it) => (it.title || '(무제)').slice(0, 42);

for (const it of withTabs) {
  const name = shortName(it);
  const avs = it.articleVersions;
  const labelOf = (a) => (a && a.v) || '';
  const has = (kw) => avs.some((a) => labelOf(a).includes(kw));

  // 1) 3탭 완비 — 하나라도 만들었으면 셋 다 있어야 한다(점수 무관, 항상).
  const missing = TAB_ORDER.filter((t) => !has(t));
  if (missing.length) {
    H(name, `3탭 미완 — 누락: ${missing.join(', ')} (현재: ${avs.map(labelOf).join(' / ')})`);
  }

  // 2) 순서 — 정리본 → 자세히 → 💬 반응 (있는 것들의 상대 순서만 확인).
  const idx = TAB_ORDER.map((t) => avs.findIndex((a) => labelOf(a).includes(t))).filter((i) => i >= 0);
  const ordered = idx.every((v, i) => i === 0 || idx[i - 1] < v);
  if (!ordered) H(name, `articleVersions 순서 위반 — 정리본→자세히→💬 반응 이어야 함 (현재: ${avs.map(labelOf).join(' / ')})`);

  // 3) 경로 실존 — articleVersions가 가리키는 파일이 실제로 있어야 한다.
  for (const a of avs) {
    if (a && a.path && !exists(a.path)) H(name, `경로 없음: ${a.path} (${labelOf(a)})`);
  }

  // 4) 반응 파일 구조 검사 — 각도 섹션 수(HARD) + 표준각도/종합/출처/밀도(WARN).
  const reaction = avs.find((a) => labelOf(a).includes('반응'));
  if (reaction && reaction.path && exists(reaction.path)) {
    const body = read(reaction.path);
    const headings = body.split('\n').filter((l) => /^#{2,3}\s/.test(l));
    // 각도 섹션 = ## / ### 헤딩 중 '종합'·'출처'가 아닌 것.
    const angleHeads = headings.filter((h) => !/종합|출처/.test(h));
    const headBlob = headings.join('\n');

    // 4a) 각도 섹션 개수 — 이번 사고의 핵심(3~4각도로 축약)을 잡는 하드체크.
    if (angleHeads.length < MIN_ANGLE_SECTIONS)
      H(name, `반응 각도 섹션 ${angleHeads.length}개(<${MIN_ANGLE_SECTIONS}) — 5개 각도를 모두 두되, 반응이 없는 각도도 '확인 안 됨(갭)'으로 섹션을 남길 것`);

    // 4b) 표준 5각도 커버리지 — 가이드(WARN). 대체 분류(🤖 AI업계 등)는 관대하게 인정.
    const missStd = ANGLES.filter((ang) => !ang.re.test(headBlob)).map((a) => a.key);
    if (missStd.length && angleHeads.length >= MIN_ANGLE_SECTIONS)
      W(name, `표준 각도 중 미포함 추정: ${missStd.join(', ')} (대체 분류면 무시 가능)`);

    // 4c) 종합·출처 블록(정직성/추적성 보조). WARN.
    if (!/종합/.test(headBlob)) W(name, `반응에 '🔭 종합' 블록 없음`);
    if (!/출처/.test(headBlob)) W(name, `반응에 '## 출처' 블록 없음`);

    // 4d) 분량 — 너무 얇으면 경고(정직한 갭은 허용이라 하드 아님).
    if (body.length < THIN_BYTES) W(name, `반응 ${body.length}바이트(<${THIN_BYTES}) — 얇음, 밀도 검토 권장`);
  }
}

// ---------- 백로그(참고) — 아직 탭이 하나도 없는 수집 후보 ----------
const backlog = items.filter(
  (it) => it.status !== '폐기' && !(Array.isArray(it.articleVersions) && it.articleVersions.length)
);

// ---------- 출력 ----------
console.log(`\n📋 수집 3탭 검증 — 탭 보유 ${withTabs.length}건 검사\n`);
if (hard.length) {
  console.log(`HARD FAIL ${hard.length}건 (커밋 차단):`);
  hard.forEach((m) => console.log('  ' + m));
  console.log('');
}
if (warn.length) {
  console.log(`경고 ${warn.length}건 (참고 — 차단 안 함):`);
  warn.forEach((m) => console.log('  ' + m));
  console.log('');
}
console.log(`ℹ️  탭 미착수 수집 후보 ${backlog.length}건 (새 규칙상 3탭 대상 — 순차 구축).`);

if (hard.length) {
  console.log(`\n❌ 검증 실패 — 위 HARD FAIL ${hard.length}건을 해결한 뒤 커밋하세요.\n`);
  process.exit(1);
} else {
  console.log(`\n✅ 검증 통과 — 3탭 완비·각도 완전.${warn.length ? ` (경고 ${warn.length}건은 확인 권장)` : ''}\n`);
  process.exit(0);
}
