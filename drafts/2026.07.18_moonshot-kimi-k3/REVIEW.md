# 검사 리포트 — Moonshot Kimi K3 (v1 → v2)

> 루틴 ③(검사), Opus 4.8. 대상: `drafts/2026.07.18_moonshot-kimi-k3/v1.md`. 대응 원자료: `collect/moonshot-kimi-k3*.md`, `collect/reactions/moonshot-kimi-k3.md`, `research/moonshot-kimi-k3-crosscheck.md`.

## ⓐ 무엇을 왜 고쳤나

1. **가짜 인용 정정 (규칙 17-5)** — 5번 섹션의 David Sacks(데이비드 색스) 인용 `"미국이 중국에 AI 경쟁에서 뒤질 수 있다"`는 실제 발언이 아니라 요지를 대사처럼 지어낸 것이었어요. 웹 재검증 결과 실제 발언은 "Kimi K3가 Frontend Code Arena 코딩 벤치마크에서 처음으로 1위를 차지했다. 미국은 데이터센터를 막고 규제를 쌓는 사이 이렇게 AI 경쟁에서 진다"는 훨씬 구체적인 내용이었어요(Axios, 2026-07-17). 큰따옴표를 없애고 실제 발언 내용(코딩 벤치마크 1위 사실 포함)으로 풀어써 귀속했어요.
2. 그 외 항목은 웹 재검증(아래 표) 결과 대체로 정확했어요 — 수정하지 않았어요.

## 웹 재검증 결과 (수정 안 한 항목 — 이상 없음 확인)

| 항목 | 초안 서술 | 재검증 결과 |
|---|---|---|
| Sam Altman "풍자인 줄 알았다" | 요지 인용 | 실제 트윗 "i thought this was satire, kept looking for the handle to be spelled c1audeai or something" — 요지는 일치하나 "가짜 계정 이름 확인" 디테일은 생략됨. 의미 왜곡은 없어 유지(사람 판단 사안으로 아래 플래그) |
| Forbes 제목 인용 | "China plans AI agent recalls. America can't even agree who regulates them." | 실제 제목과 대소문자만 다르고 문장은 일치 (2026-07-14 발행) |
| TechCrunch "격차를 좁힐 것으로 예상" | 인용구 | 실제 제목과 일치 |
| Axios "China just erased America's AI lead" | 제목 인용 | 일치 |
| 세계 4위 벤치마크 주장 | Moonshot 자체 벤치마크로 이미 명시 | Artificial Analysis Intelligence Index 기준 대략 일치(4위 근방, 세부 산정 방식에 따라 3위로도 해석 가능) — 이미 "Moonshot의 주장"으로 정확히 귀속돼 있어 추가 수정 불필요 |
| 가격 $3/$15 (Opus 4.8의 절반) | 명세 | Codersera 소스와 일치. Axios는 다른 계산식으로 "40% 저렴"이라고 썼는데, 이건 리스트 가격이 아닌 다른 지표로 보여 초안의 리스트가 기준(정확히 절반)은 그대로 둠 |
| HN 댓글 1,600개 이상 | 수치 | 정확한 댓글 수는 재확인 불가(뉴스 API 접근 제한). 원자료(collect)에 이미 출처 있어 유지 |

## ⓑ 남은 리스크

- 낮음. 모든 핵심 수치(파라미터·컨텍스트·가격·공개일)가 다중 소스로 교차 확인됨. "세계 4위" 주장은 이미 Moonshot 자체 평가로 명확히 프레이밍돼 있어 명예훼손·정정 리스크 낮음.
- Sam Altman 인용은 요지는 정확하지만 원문의 유머러스한 디테일(가짜 계정 이름 확인)이 생략돼 있음 — 팩트 왜곡은 아니지만 사람이 원하면 더 촘촘하게 옮길 수 있음.

## ⓒ 사람이 판단할 사안 (앵글·taste)

- 없음. 구성·앵글은 그대로 두었어요.
