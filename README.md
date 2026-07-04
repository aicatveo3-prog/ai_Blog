# Vector — AI 자동화 블로그 & 운영 시스템

AI 자동화 소식을 **직접 돌려보고, 남다르게 해석해서** 쓰는 블로그 Vector와, 그 블로그를 반자동으로 굴리는 **운영 시스템**입니다.

> 핵심 철학 한 줄: **기계는 후보를 가져오고 초안을 만들며, 사람은 고르고, 겪고, 해석하고, 승인한다.**
> (수집·정리·초안·형식 = 기계 / 사실 판단·선별·관점·경험·최종 승인 = 사람)

---

## 📁 저장소 구성

| 위치 | 내용 |
|---|---|
| `index.html` | 발행 사이트 (Vector 블로그, 단일 HTML) |
| **`docs/manual.md`** | 📖 전체 설계서 v1 — **여기서 시작** (진실의 원천) |
| `workflow.md` | 🗓️ 매주·매월 무엇을 하는가 (실행 체크리스트) |
| `system/` | 운영 규칙 — 사람이 판단할 때 쓰는 문서들 |
| `prompts/` | AI에게 시키는 프롬프트 A~G (프롬프트 = 코드) |
| `automation/` | n8n·Notion 자동화 설정 가이드 |
| `research/` | 글감별 조사 노트 (`system/research-note.md` 복사해 사용) |
| `drafts/` | 작성 중인 초안 |

### `system/` 안내
| 파일 | 역할 | 상태 |
|---|---|---|
| `positioning.md` | 독자·범위 정의 | ✍️ **당신이 채워야 함** |
| `sources.md` | 소스 리스트 | 초안 완료 (RSS URL 갱신 필요) |
| `scoring-rubric.md` | 선별 채점 + 킬 기준 | ✅ |
| `style-guide.md` | 문체 규칙 | 일부 ✍️ |
| `post-templates.md` | 글 유형 4종 | ✅ |
| `test-protocol.md` | 직접 테스트 시나리오 | ✅ |
| `checklists.md` | 검수·발행 게이트 | ✅ |
| `research-note.md` | 조사 노트 템플릿 | ✅ |

---

## 🚀 지금부터 할 일 (로드맵 0~1주차)

1. **[ ] `system/positioning.md` 채우기** — 독자 한 명, 다루는/안 다루는 범위. (이게 모든 기준의 뿌리)
2. **[ ] `system/sources.md` 확정** — 실제 구독할 RSS를 골라 URL 갱신.
3. **[ ] Notion 인박스 DB 세팅** — `automation/notion-inbox-schema.md` 따라.
4. **[ ] n8n 워크플로 A 구축** — `automation/n8n-workflows.md` 따라 (일단 A만).
   - 완료 기준: **"아침에 열면 선별할 후보가 자동으로 쌓여 있다."**
5. **[ ] 2주차: 거의 수동으로 글 3편** (브리핑 2 + 심층 1), 단계별 소요 시간 실측.

> ⚠️ 실패 패턴 5(가장 흔함): **좋은 글을 먼저 손으로 만들 수 있어야 시스템화가 된다.** 자동화를 서두르지 말고, 2주차 수동 3편을 꼭 거칠 것.

---

## 사이트 로컬 실행 / 배포

```bash
python3 -m http.server 8000   # http://localhost:8000
```
GitHub Pages: Settings → Pages → Deploy from a branch → 루트(`/`) 선택.

---

© 2026 Vector
