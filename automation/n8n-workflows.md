# n8n 수집 워크플로 설계

> 세 개의 워크플로로 분리한다. 하나로 합치면 소스 하나가 죽었을 때 전체가 멈춘다.
> 각 워크플로에 **에러 시 알림 노드**를 단다 — 수집이 조용히 죽어 있는 것이 최악의 장애다.

---

## 워크플로 A — RSS 폴링 (2시간 간격)

```
[Schedule Trigger: 2h]
   → [RSS Feed Read] × 소스 개수 (병렬)
   → [Merge] 전체 항목 합치기
   → [Code] URL 정규화(UTM 제거, 트레일링 슬래시 통일) + Notion 기존 URL 대조 중복 제거
   → [Filter] 키워드 화이트리스트(agent, automation, workflow, LLM, MCP, RAG, orchestration, no-code)
              + 블랙리스트(펀딩 라운드, 인사 발표, 이벤트 홍보)
   → [AI 노드: 경량 모델] 3문장 요약 + 카테고리 태깅 + 1차 점수 (prompts/A-scoring.md, JSON 출력)
   → [Notion] 인박스 DB에 페이지 생성 (요약·점수·태그 포함)
   → [IF: Score_Total ≥ 임계값] → [Slack/Telegram] "고점수 항목 발견" 알림
```

**URL 정규화 Code 노드 (예시 로직):**
```javascript
// UTM 등 추적 파라미터 제거 + 트레일링 슬래시 통일
const url = new URL($json.link);
['utm_source','utm_medium','utm_campaign','utm_term','utm_content','ref','fbclid']
  .forEach(p => url.searchParams.delete(p));
let clean = url.origin + url.pathname.replace(/\/$/, '') + url.search;
return { json: { ...$json, clean_url: clean } };
```

---

## 워크플로 B — HN·Reddit (6시간 간격)

```
[Schedule Trigger: 6h]
   → [HTTP Request] HN Algolia: https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=points>50&query=AI
   → [HTTP Request] Reddit 서브레딧 RSS (r/LocalLLaMA, r/n8n, r/automation ...)
   → (이후 A의 4~8번 노드와 동일: 중복제거 → 필터 → AI 점수 → Notion → 알림)
```

---

## 워크플로 C — GitHub 릴리즈 (1일 1회)

```
[Schedule Trigger: daily]
   → [RSS Feed Read] 추적 저장소들의 releases.atom (sources.md의 에이전트 FW 목록)
   → [Filter] 메이저·마이너 릴리즈만 (패치 릴리즈 x.y.Z 는 버림)
   → (이후 AI 점수 → Notion → 알림)
```

---

## 클러스터링 (3.5)
큰 발표는 소스 5~10곳에서 동시 유입. URL 정규화만으로 못 잡으므로, AI 노드 프롬프트에 다음을 추가:
> "다음 기존 항목 제목들과 같은 사건인가? 같으면 해당 항목 ID를 `duplicate_of`에 반환하라: {최근 인박스 제목 목록}"
같은 사건은 Cluster로 묶고 검토는 클러스터당 1회. 묶인 소스들은 조사 때 반응 데이터로 전부 활용.

---

## 셀프호스트 설치 (비개발자용 최소 경로)
- **가장 쉬운 길**: [n8n Cloud](https://n8n.io) 무료 체험 → 익숙해지면 셀프호스트로 이전.
- **셀프호스트**: 저가 VPS 또는 로컬에서 Docker
  ```bash
  docker volume create n8n_data
  docker run -d --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
  # http://localhost:5678 접속
  ```
- 워크플로는 처음엔 **A만** 만들어 돌려보고, 익숙해지면 B·C를 추가한다 (로드맵 0~1주차).
