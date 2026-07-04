# 소스 리스트 v1

> 원칙: **1차 소스(발표 원문) > 커뮤니티(반응) > 큐레이션(안전망).**
> 큐레이션은 "놓친 게 없는지 확인"용일 뿐, 글의 출처로 쓰지 않는다.
> 분기마다 "지난 3개월간 이 소스에서 실제 발행 글이 나왔는가"로 정리한다. 소스는 많을수록가 아니라 **신호/노이즈 비율**이 좋아야 한다.

---

## 1차 소스 (글감의 원천)

| 분류 | 소스 | 수집 방법 | RSS/URL 힌트 | 비고 |
|---|---|---|---|---|
| 모델사 공식 | OpenAI News | RSS | openai.com/news | 발표문 |
| 모델사 공식 | Anthropic News / Engineering | RSS | anthropic.com/news | 발표+기술블로그 |
| 모델사 공식 | Google DeepMind Blog | RSS | deepmind.google/discover/blog | |
| 모델사 공식 | Meta AI | RSS | ai.meta.com/blog | |
| 오픈소스 허브 | Hugging Face Blog | RSS | huggingface.co/blog/feed.xml | |
| 오픈소스 허브 | HF Daily Papers | RSS | | 논문 트렌드 감지 |
| 논문 | arXiv cs.AI / cs.CL / cs.LG | RSS(카테고리별) | export.arxiv.org/rss/cs.AI | 제목+초록만 훑기 |
| 자동화 도구 | n8n 블로그·체인지로그 | RSS/releases.atom | n8n.io/blog | 블로그 주제의 심장부 |
| 자동화 도구 | Make 블로그 | RSS | | |
| 자동화 도구 | Zapier 블로그 | RSS | | |
| 에이전트 FW | LangChain releases | GitHub Releases RSS | github.com/langchain-ai/langchain/releases.atom | |
| 에이전트 FW | LlamaIndex releases | GitHub Releases RSS | github.com/run-llama/llama_index/releases.atom | |
| 에이전트 FW | CrewAI releases | GitHub Releases RSS | github.com/crewAIInc/crewAI/releases.atom | |
| 에이전트 FW | AutoGen(AG2) releases | GitHub Releases RSS | | |
| 에이전트 FW | Dify releases | GitHub Releases RSS | github.com/langgenius/dify/releases.atom | |
| 에이전트 FW | Flowise releases | GitHub Releases RSS | github.com/FlowiseAI/Flowise/releases.atom | |
| 프로토콜·표준 | MCP 스펙 저장소 | GitHub Watch | github.com/modelcontextprotocol | 표준화 흐름 추적 |

> GitHub 릴리즈 RSS 패턴: `github.com/{org}/{repo}/releases.atom`

---

## 커뮤니티 소스 (반응·실사용 데이터)

| 소스 | 수집 방법 | 보는 이유 |
|---|---|---|
| Hacker News | Algolia API `hn.algolia.com/api/v1/search_by_date` | 개발자 반응 온도, 반박 논거 |
| Reddit r/LocalLLaMA | 서브레딧 RSS `reddit.com/r/LocalLLaMA/.rss` | 실사용자 불만 = 글감 금광 |
| Reddit r/n8n | 서브레딧 RSS | 자동화 실사용 |
| Reddit r/automation | 서브레딧 RSS | |
| Reddit r/MachineLearning | 서브레딧 RSS | |
| X(트위터) 리스트 | 수동 큐레이션 리스트 1개 | 연구자·빌더 30~50명만 |
| 공식 Discord (n8n, LangChain 등) | 수동, 주 1회 | 릴리즈 전 분위기 |

---

## 큐레이션·국내 (안전망 — 5개 이하 유지)

Ben's Bites · TLDR AI · Import AI · Latent.Space · Simon Willison 블로그
국내: GeekNews · AI타임스 · 요즘IT

> ⚠️ 안전망이므로 글의 소스로 쓰지 않는다. "내가 놓친 게 없나" 확인만.

---

## 변경 로그
- v1 (YYYY-MM-DD): 최초 작성. (실제 RSS URL은 구독 시 확인해 갱신할 것)
