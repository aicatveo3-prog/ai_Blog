# Notion 인박스 DB 스키마

> 모든 글감은 이 DB에 한 행으로 쌓인다. Status 필드가 상태 머신(2.2)의 값이 되고, 칸반 뷰로 보면 곧 파이프라인이 된다.

## 필드 정의

| 필드 | 타입 | 용도 |
|---|---|---|
| **Title** | 제목 | 원문 제목 |
| **URL** | URL (unique) | 중복 제거 기준 |
| **Source** | Select | 소스명 |
| **SourceTier** | Select | 1차 / 커뮤니티 / 큐레이션 |
| **PublishedAt** | Date | 원문 발행일 (신선도) |
| **CollectedAt** | Date | 수집 시각 |
| **Status** | Select | 인박스 / 검토중 / 선정 / 조사중 / 작성중 / 검수중 / 발행 / 보류 / 폐기 |
| **AI_Summary** | Text | 3문장 요약 |
| **Score_영향** | Number | 1~5 |
| **Score_신선도** | Number | 1~5 |
| **Score_차별화** | Number | 1~5 |
| **Score_적합** | Number | 1~5 |
| **Score_축적** | Number | 1~5 |
| **Score_Total** | Formula | 가중합 (아래) |
| **Tags** | Multi-select | 주제 태그 |
| **ContentType** | Select | 브리핑 / 심층 / 튜토리얼 / 종합 |
| **Cluster** | Relation | 같은 사건의 다른 소스 묶기 |
| **KillReason** | Text | 폐기 사유 (필수) |
| **Notes** | Text | 메모 / 관점 한 줄 |

## Score_Total 공식 (Notion formula)
```
round(
  (prop("Score_영향") * 0.30
 + prop("Score_차별화") * 0.30
 + prop("Score_신선도") * 0.15
 + prop("Score_적합") * 0.15
 + prop("Score_축적") * 0.10) * 100
) / 100
```

## 추천 뷰
1. **인박스 칸반** (Status별 그룹) — 파이프라인 전체 한눈에
2. **선별용 테이블** (Status=검토중, Score_Total 내림차순) — 편집회의 때 상위 20%만
3. **이번 주 발행** (Status=선정/작성중/검수중) — 주간 슬롯 관리

## 세팅 순서 (비개발자용)
1. Notion에서 새 페이지 → `/database - full page` 생성, 이름 "인박스".
2. 위 필드를 하나씩 추가 (타입 맞춰서).
3. Score_Total은 Formula 타입으로 위 공식 붙여넣기.
4. Status Select에 위 9개 옵션 추가.
5. n8n에서 이 DB에 쓰려면: Notion Integration 생성 → DB를 Integration에 Connect → n8n Notion 노드에 API 키 등록.
