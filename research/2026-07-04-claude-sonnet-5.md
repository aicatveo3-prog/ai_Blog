# 조사 노트: Claude Sonnet 5 출시

- 원본 링크(1차): [anthropic.com/news/claude-sonnet-5](https://www.anthropic.com/news/claude-sonnet-5) (※ 공식 페이지 직접 확인은 발행 전 재시도 필요)
- 소스 티어: 1차(Anthropic 발표) + 2차(TechCrunch, MarkTechPost, DataCamp, llm-stats 등 교차확인)
- 👉 전체 출처 링크는 맨 아래 **"출처 링크"** 섹션에 정리 (전부 클릭 가능)
- 조사 날짜: 2026-07-04
- 글 유형: A 속보 브리핑
- 렌즈: ① "그래서 나한테?" (가격/손익분기)

## A. 확인된 팩트 (2개 이상 출처 교차확인)
- F1. 출시일: **2026년 6월 30일** [TechCrunch, llm-stats, MarkTechPost]
- F2. 도입가: 입력 **100만 토큰당 $2**, 출력 **100만 토큰당 $10**, **2026년 8월 31일까지** [llm-stats, 검색 교차]
- F3. 이후 정가: 입력 **$3** / 출력 **$15** (100만 토큰당) [llm-stats]
- F4. **새 토크나이저** 주의: 같은 텍스트가 **약 1.0~1.35배 더 많은 토큰**으로 계산됨 → 표시가만 보면 실질 비용을 과소평가하게 됨 [llm-stats, 검색 교차]
- F5. 에이전틱 코딩 벤치마크: Sonnet 5 **63.2%** / Opus 4.8 **69.2%** / Sonnet 4.6 **58.1%** [MarkTechPost, buildfastwithai]
- F6. GPQA-AAA v2(대학원 수준 추론)에서 Sonnet 5가 Opus 4.8을 **근소하게 앞섬** [검색 교차]
- F7. 가용성: 전 플랜 사용 가능, **Free·Pro 기본 모델**, Max·Team·Enterprise도 제공 [검색 교차]
- F8. 능력 변화: **task follow-through(끝까지 완수)** 개선 — 이전 Sonnet이 중간에 멈추던 복잡한 작업을 완수하고, 시키지 않아도 자기 출력을 점검 [검색 교차, DEV/DataCamp]

## B. 주장 수준 (출처는 있으나 검증 필요)
- "미드티어 Sonnet이 주요 벤치마크에서 Opus를 처음 앞선 사례"(GPQA 기준) — 일부 매체의 해석 [buildfastwithai]
- "대부분의 워크로드에서 Opus 4.8을 사실상 선택사항으로 만든 첫 Sonnet" — 논평성 표현 [검색 교차]

## C. 커뮤니티 반응 요약
- 긍정: 복잡한 버그를 수백 스텝에 걸쳐 끈질기게 고쳐냄, "half-done patch"(하다 만 수정) 감소 [Anthropic 리서치 인용]
- 주의/불만: 토크나이저 변경으로 "체감 비용"이 표시가와 다를 수 있다는 지적 [llm-stats, Medium "hidden cost"]
- (HN/레딧 실제 스레드는 발행 전 직접 확인 권장)

## D. 직접 테스트 로그
- (이번 첫 글은 브리핑이라 미실시. 다음 편에서 test-protocol.md S3 에이전트 태스크로 실측 예정)

## E. 과거 맥락 / 경쟁
- 흐름: Sonnet 3.5(코딩 강세) → 4.5/4.6 → 5. "큰 모델(Opus)이라야 에이전트를 돌린다"는 프레임을 미드티어가 흔드는 방향.
- 경쟁: OpenAI GPT-5.6 "Sol" 프리뷰, Unisound U2($0.15/$0.30, 에이전트용 MoE) 등 "에이전트 상시 구동 = 저비용" 경쟁이 심화.

## F. 떠오른 관점 후보
- (채택) 이건 성능 뉴스가 아니라 **"에이전트를 상시 돌리는 비용의 손익분기점"이 내려간 사건**이다.
- 단, F4(토크나이저) 때문에 "표시가 반값"을 곧이곧대로 믿으면 안 된다 → 이게 남들이 안 짚는 차별화 포인트.

## G. 미해결 질문 (글에 "모른다"고 솔직히 쓸 것)
- 한국어 텍스트에서 새 토크나이저의 토큰 증가율은? (F4는 일반 수치, 한국어 특화 데이터 미확인)
- F5의 "63.2%"가 agentic coding vs SWE-bench Pro 중 정확히 무엇인지 출처마다 명칭이 엇갈림 → 발행 전 공식 모델카드로 확정 필요. **[모순: 확정 전까지 벤치 수치는 "약 63%대"로 완충 표기]**

## 출처 링크 (클릭)

**1차 (공식)**
- [Anthropic — Claude Sonnet 5 발표](https://www.anthropic.com/news/claude-sonnet-5) — F1, F8 (발표문·능력 설명)

**2차 (교차확인)**
- [TechCrunch — "cheaper way to run agents"](https://techcrunch.com/2026/06/30/anthropic-launches-claude-sonnet-5-as-a-cheaper-way-to-run-agents/) — F1, F2, F3 (출시·가격)
- [MarkTechPost — Sonnet 5 vs 4.6 vs Opus 4.8 벤치·가격 비교](https://www.marktechpost.com/2026/06/30/anthropic-claude-sonnet-5-vs-sonnet-4-6-vs-opus-4-8-agentic-coding-benchmarks-api-pricing-and-cost-performance-tradeoffs-compared/) — F5 (벤치마크)
- [llm-stats — LLM updates](https://llm-stats.com/llm-updates) — F2, F3, F4 (가격·토크나이저)
- [buildfastwithai — Claude Sonnet 5 리뷰](https://www.buildfastwithai.com/blogs/claude-sonnet-5-review-benchmarks-pricing-2026) — F5, B (벤치·해석)

> ⚠️ 발행 전 체크: 위 링크가 모두 살아 있고 올바른 문서를 가리키는지 재확인 (검수 체크리스트). 공식 페이지(1차)로 F2·F5 수치 최종 확정.

