# 🟠 루틴 ② 정본 — 자동 글쓰기 (Opus 4.6)

> ⚠️ **폐지(2026-07-20)** — 이 문서는 `system/routine-write-verify.md`(글쓰기+검사 통합, Sonnet 5)로 **대체됨**. 아래 내용은 통합 전 기록용. 실제 루틴은 통합 정본을 따른다.

> 이 파일이 **글쓰기 루틴의 정본**. 트리거는 "이 파일을 읽고 그대로 실행하라"만 담아 드리프트를 막는다.
> 짝 문서: `system/routine-verify.md`(검사 루틴) · `system/routines.md`(전체 파이프라인) · `system/writing-guide.md`(글쓰기 기준).

| 항목 | 내용 |
|---|---|
| **모델** | **Opus 4.6** |
| **실행 시각** | 매일 **KST 07:00** (수집 06:00 뒤). 새 세션. |
| **작업 브랜치** | `claude/github-upload-setup-vimtlp` (여기서 작업, 여기로 push) |
| **끝점** | 그날 뉴스로 초안 v1을 쓰고 `stage:"작성중"`으로 둔 상태. **검사·발행은 안 한다.** |

---

## 무엇을 쓰나 — 대상 선별 (자동)

**사람이 고르지 않는다.** `inbox.json`에서 아래를 **모두** 만족하는 항목을 대상으로 한다:

1. **`surfaced`(수집한 날)가 오늘** — 그날 새로 들어온 뉴스. (전날 누락분이 있으면 함께 처리해도 됨)
2. **`verified: true`** — 날짜·사실이 검증된 것만. 소문·미검증은 쓰지 않는다.
3. **3탭 자료가 다 있는 것** — `articleVersions`에 정리본·자세히·반응이 갖춰진 항목만. (자료 없는 인박스 후보는 쓸 재료가 없으므로 제외)
4. **아직 글이 없는 것** — `postId`가 안 붙은 항목. (이미 쓴 건 건너뜀)

### 하루 최대 2편 (HARD CAP)

- 대상이 **2개 이하면 전부**, **3개 이상이면 가장 중요한(임팩트 큰) 2편만** 쓴다.
- 어느 2편을 골랐고 무엇을 건너뛰었는지 마지막 보고에 남긴다. (건너뛴 항목은 다음 날 다시 대상이 될 수 있음)
- **절대 2편을 넘기지 않는다.** 뉴스가 몰린 날에도 2편에서 멈춘다.

---

## 0단계 — 발행 브랜치로 강제 이동 (첫 동작 · 반드시)

대상 선별·집필을 시작하기 **전에** 발행 브랜치로 옮긴다. 자동 세션은 임시 브랜치(`claude/…-xxxx`)로 스폰되고, 거기 커밋하면 push는 돼도 대시보드(기본 브랜치 빌드)엔 안 뜬다(2026-07-16 수집 루틴 사고).
```bash
git fetch origin
git checkout -B claude/github-upload-setup-vimtlp origin/claude/github-upload-setup-vimtlp
git config core.hooksPath githooks   # posts.json 보호 잠금 활성화(강함) — 빠뜨리지 말 것
```
(기본 브랜치가 바뀌었으면 `git ls-remote --symref origin HEAD`로 확인해 그 이름으로.) 이후 모든 커밋·push가 곧장 발행 브랜치로 간다 → 별도 cherry-pick 동기화 불필요.
`git config core.hooksPath githooks`는 **posts.json 잠금**을 켠다: 명단을 통째로 덮어써 글이 줄면(잠금①) 커밋이 거부되고, 초안이 세 줄 요약 수준으로 짧으면(잠금③) 거부된다(2026-07-20 posts.json 덮어쓰기·껍데기 초안 사고). **5단계 등재는 반드시 기존 posts.json을 읽어 append**하고 새로 만들지 않는다. 안 켜도 서버측 `posts guard`가 한 번 더 잡는다.

## 한 편을 쓰는 순서 (대상마다 반복)

1. **교차검증** — `prompts/K-crosscheck.md`로 자료(정리본·자세히·반응) 간 모순·과장·함정을 먼저 훑는다. 앵글·렌즈를 잡는다.
2. **초안 집필** — **규칙의 단일 진실원은 `system/writing-guide.md`**(현재 **17규칙 전체** + 문단 리듬 + 과단정 스캔). `prompts/I-synthesis-deepdive.md`는 구조 뼈대로만 쓰고, 프롬프트와 writing-guide가 충돌하면 **writing-guide를 따른다.** 특히 12(반복)·13(압축)·14(비중)·15(진행 중 사건=주장·리스크)·16(정밀표기)·17(과단정)을 빠짐없이 반영. 골드 스탠다드 = `drafts/microsoft-mai/v1.md`(원리만, 베끼지 말 것).
   - **관점·정체성** — 이 블로그의 렌즈 ① **"그래서 나한테?"**(`system/positioning.md`)를 반드시 통과시킨다: "무슨 일인지"보다 **"독자에게 뭐가 바뀌는지"**를 짚는다. 분석 깊이는 `system/analysis-frameworks.md`에서 2~3개 적용(So-What 3단·반대 가설 한 단락·한국 로컬 번역·"관점 한 줄 테스트"). *(렌즈 ② "직접 써봤다"·경험 문장·스크린샷은 뉴스 설명글엔 미적용.)*
3. **자기 점검** — 저장 전, writing-guide의 **발행 전 체크리스트**를 스스로 훑는다(해요체·후크+앵커·세 줄 요약·용어 풀이·양쪽 말·인라인 출처·과단정 스캔 등). 걸리면 고친 뒤 저장.
4. **저장** — `drafts/YYYY.MM.DD_<slug>/v1.md` 에 저장(폴더명 = 오늘 날짜_슬러그).
5. **posts.json 등재** — `posts`에 항목 추가, **`stage:"작성중"`**(발행·검수중 아님). 필드: `id, title, date(=뉴스 firstSeen), type, category, stage:"작성중", layout:"feature", readMin, author:"AI 쉽게 알려주는 집", angle, versions:[{v:"v1", date:오늘, note, path}]`. `published`는 넣지 않는다(발행 아님).
6. **inbox.json 연결** — 대응 수집 항목에 **`"postId":"<글 id>"`** 를 붙인다(이게 "이 뉴스는 글로 착수됨" 표시이자, 중복 집필 방지).

## 절대 규칙 (예외 없음)

- ❌ **`node build-seo.mjs` 실행·발행 금지.** 이 루틴은 초안까지만. 정적 페이지·OG·sitemap 굽지 않는다.
- ❌ **`stage`를 `검수중`/`발행`으로 올리지 않는다.** 글쓰기의 끝은 `작성중`. (검사 루틴이 `검수중`으로, 사람이 `발행`으로 올린다.)
- ❌ **하루 2편 초과 금지.**
- ✅ 초안·posts.json·inbox.json을 **발행 브랜치로 commit & push** (0단계에서 이미 그 브랜치에 있음): `git push -u origin claude/github-upload-setup-vimtlp`. non-fast-forward면 `git pull --rebase` 후 재push.
- ✅ **0단계(발행 브랜치 강제 이동)를 빠뜨리지 않았는지가 곧 동기화다.** 0단계만 지키면 커밋은 자동으로 대시보드 브랜치에 오른다(옛 cherry-pick 동기화 폐지).

## 마지막 보고

- 오늘 쓴 글 제목 + slug (최대 2편).
- 대상이 3개 이상이었다면: **고른 2편 / 건너뛴 항목**을 한 줄씩.
- 각 글이 `작성중`으로 저장·연결됐는지 확인. (검사 루틴이 08:00에 이어받는다.)
