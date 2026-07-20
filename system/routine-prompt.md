# 루틴 ① 정본 프롬프트 — 매일 AI 소식 수집

> **이 파일이 Claude 스케줄 트리거가 실행하는 프롬프트의 정본(single source of truth)이다.**
> 트리거 프롬프트는 아래 한 줄만 두고, 나머지는 이 파일을 참조하게 하면 드리프트가 없다:
>
> > `system/routine-prompt.md`에 적힌 루틴 ① 프롬프트를 그대로 실행하라. (작업 브랜치: `claude/github-upload-setup-vimtlp`)
>
> 규칙이 바뀌면 여기 + `system/daily-collection.md` + `system/routines.md` **세 곳을 같이** 고친다.
> (과거 사고: 트리거 프롬프트에 '고신호만 3탭 / 조용한 날 정리본만' 옛 규칙이 남아 자세히 누락·반응 대충으로 이어짐.
> 그래서 프롬프트를 레포로 끌어와 버전 관리 + 검증기(`validate-collection.mjs`)로 강제한다.)

---

## 프롬프트 본문 (트리거가 실행)

```text
매일 AI 소식 수집 루틴(루틴 ①)을 실행해줘. system/routines.md의 루틴 ①과
system/daily-collection.md 플레이북을 그대로 따른다.

작업 브랜치: claude/github-upload-setup-vimtlp (이 브랜치에서 작업하고 여기로 push).

순서:
0. 발행 브랜치로 강제 이동(첫 동작 — 반드시). 자동 세션은 매번 임시 브랜치(claude/…-xxxx)로
   스폰되고, 거기에 커밋하면 push는 돼도 대시보드(기본 브랜치 빌드)엔 안 뜬다(2026-07-16 사고).
   그러니 무엇보다 먼저:
     git fetch origin
     git checkout -B claude/github-upload-setup-vimtlp origin/claude/github-upload-setup-vimtlp
     git config core.hooksPath githooks   # posts.json 보호 잠금 활성화(강함)
   (기본 브랜치가 바뀌었으면 git ls-remote --symref origin HEAD로 확인해 그 이름으로.)
   git config core.hooksPath githooks 는 posts.json 잠금(명단 축소·발행글 회귀·껍데기 초안)을
   켠다. 새 세션은 매번 clone되니 이 줄을 빠뜨리면 잠금이 꺼진 채 작업하게 된다.
   이제 모든 커밋·push가 곧장 발행 브랜치로 간다. 빠뜨려도 7단계 검증기가 발행 브랜치가
   아니면 커밋을 HARD FAIL로 막는다.
1. 수집 — 지난 24시간 AI 소식을 8각도로 웹검색(모델 출시·자동화/노코드·에이전트/
   프레임워크·정책/규제·연구/논문·자금/M&A·논란/소송·하드웨어).
2. 후보 추출 + 중복 제거(엄격) — 눈대중 말고 세 기준으로 기존과 대조해 이미 있으면 버린다:
   ① source URL이 inbox 기존 항목과 같으면 버림 ② 핵심 고유명사(회사·제품·모델명)가 같은
   대상의 '같은 사건'(= firstSeen도 같음)이면 표현 달라도 버림(예: 7/7 발표 'Meta Muse Image'
   이미 있으면 재수집 금지) ③ posts.json에 있거나 postId 붙은 주제는 재수집 금지.
   ★ 단, 같은 주제라도 firstSeen(원문 날짜)이 다르면 '새 전개'이니 수집한다(예: "Grok 4.5
   출시"[7/8] vs "Grok 5 지연"[7/6]) — 새 항목으로 넣되 무엇이 새로운지 제목에 명시.
   (7단계 검증기: 제목 유사 AND 첫 등장일 일치 = 같은 사건 → HARD FAIL. 날짜 다르면 안 막음.)
3. 날짜 검증 — system/collection-dating.md 규칙대로 각 후보의 1차 원문을 찾아 게시일을
   2곳+ 교차확인. 확정이면 firstSeen 채우고 verified:true, 못 찾으면 firstSeen:null·
   verified:false(절대 지어내지 말 것). 각 항목에 verifyNote와 source를 남긴다.
   그리고 각 항목에 surfaced = 오늘(실행일)을 반드시 기록한다 — 이게 대시보드의
   "추가한 날짜"이자 최신순 정렬 기준. 빠지면 오늘 추가한 항목이 옛 firstSeen 날짜로
   밀려 내려간다.
4. 1차 점수·태깅 — prompts/A-scoring.md 루브릭으로 대략 점수·태그.
5. 세 탭 구축(수집하는 모든 verified 항목에 3탭 전부) — 점수로 자세히·반응을 빼지 않는다.
   인박스에 등재하는 verified:true 항목은 정리본·자세히(prompts/J-collect-explainers.md)와
   반응(prompts/H-reactions-multiangle.md)을 예외 없이 셋 다 만든다. 여럿이면 소식당 서브에이전트 병렬.
   - inbox.json의 articleVersions 순서는 반드시 정리본 → 자세히 → 💬 반응.
   - 반응은 5개 각도 섹션을 모두 둔다. 반응이 없는 각도도 삭제하지 말고
     '확인 안 됨(갭)'으로 섹션을 남긴다(각도 축약·1불릿 금지).
   - ★ 수집=3탭. '여력 안 되면 탭 없이 인박스 후보로만'은 폐지(stub만 쌓임). 그날 3탭까지
     못 만들 소식은 아예 인박스에 넣지 말고 다음 날 다시 수집한다. 7단계 검증기가
     '오늘 수집한 verified인데 탭 없는 항목'을 HARD FAIL로 막는다.
6. 인박스 반영 — inbox.json에 append하고 generated 날짜를 갱신.
7. 검증 게이트(커밋 전 — 반드시) — node validate-collection.mjs 실행.
   HARD FAIL이 하나라도 있으면 커밋 금지. 발행 브랜치 아님·3탭 미완·반응 각도 5개 미만·
   경로 없음 등을 그 자리에서 고치고 재실행한다. 초록불(exit 0)이 나올 때까지 반복.
   빨간불인 채로 "완료" 보고 금지.
8. 커밋·푸시 — 0단계에서 이미 발행 브랜치에 있으므로 그대로
   git push -u origin claude/github-upload-setup-vimtlp. non-fast-forward면
   git pull --rebase 후 재push. (옛 cherry-pick 동기화 단계는 폐지 — 0단계로 대체.)

🔗 출처 링크(필수 · 철칙 0): 3탭(정리본·자세히·반응)의 모든 사실·수치·인용에 그 자리
인라인 링크 [텍스트](URL)를 단다. 특히 반응은 항목마다 - [출처](URL): 요약 형식으로
시작하고, 집단 입장(미국 의회·EU·중국 등)도 근거 기사 URL이 없으면 그 불릿을 삭제한다
(상상해서 채우지 말 것). 각 파일 하단엔 제목 링크 + 실제 전체 주소(raw URL)를 둘 다
남긴다. 저장 전, 링크 없는 반응 불릿이 0개인지 확인한다.

중요: 글(종합 심층 글)은 쓰지 마라. 무엇을 글로 쓸지 선별과 관점은 사람이 한다. 이 루틴은
"검증된 후보가 쌓인 상태"까지만 만든다. 선별·지시 없이 prompts/I로 초안을 자동 생성하는
것은 금지.

마지막에, 그날 새로 검증된 항목 3~5개를 한 줄씩 요약해서 알려줘. (링크 없는 반응 불릿
잔여 수 = 0 확인, 그리고 validate-collection.mjs 초록불 여부도 함께 보고.)
```

---

## v4(옛 버전)에서 바뀐 점

| 부분 | 옛 프롬프트 | 정본(현재) |
|---|---|---|
| 5단계 탭 규칙 | "세 탭 구축**(고신호 항목만)** … 조용한 날은 **정리본만**" | "**탭 만든 소식은 3탭 전부** + 반응 5각도 필수" |
| 검증 게이트 | 없음 | **7단계 신설** — `validate-collection.mjs` 초록불이 커밋 조건 |
| 마지막 요약 | "고신호 항목 3~5개" | "검증된 항목 3~5개 + 검증기 초록불 보고" |

## 변경 로그
- v1 (2026-07-16): 트리거 프롬프트를 레포 정본으로 이관. '항상 3탭' + 검증 게이트 반영(옛 '고신호만/정리본만' 규칙 폐기).
