# Microsoft, 자체 개발 'MAI' 모델 7종 공개

> **첫 등장일** 2026-06-02 (✅ 검증 · CNBC·Microsoft AI·Simon Willison)
> **분류** 모델 출시 · Microsoft
> *아래는 발표 내용을 있는 그대로 정리한 것입니다. (해석·의견 없음)*

Microsoft가 2026년 6월 2일, 사내(Microsoft AI)에서 자체 개발한 **[7종의 MAI 모델 패밀리](https://www.cnbc.com/2026/06/02/microsoft-unveils-new-ai-models-lessen-reliance-on-openai-lower-costs.html)**를 공개했다. 타 랩 모델에 대한 distillation 없이, 추적 가능하고 기업용 등급의 데이터로 학습했다고 밝혔다.

## 공개된 7종

| 모델 | 유형 |
|---|---|
| MAI-Thinking-1 | 추론 |
| MAI-Code-1-Flash | 코딩 |
| MAI-Image-2.5 / 2.5 Flash | 이미지 |
| MAI-Transcribe-1.5 | 전사(STT) |
| MAI-Voice-2 / Voice-2 Flash | 음성 |

## MAI-Thinking-1 (추론)
- 규모: **1T 파라미터 / 활성 35B** (중간 규모)
- 벤치마크: **[AIME 2025 97.0%](https://www.cnbc.com/2026/06/02/microsoft-unveils-new-ai-models-lessen-reliance-on-openai-lower-costs.html)**, **AIME 2026 94.5%**
- 블라인드 인간 side-by-side 평가에서 **Claude Sonnet 4.6보다 선호**됨
- 소프트웨어 엔지니어링 주요 벤치에서 동급 최강 모델들과 대등

## MAI-Code-1-Flash (코딩)
- 구조: **Sparse MoE, 137B 총 / 5B 활성, 256K 컨텍스트**
- "adaptive thinking" — 단순 요청엔 간결하게, 복잡한 작업엔 추론 예산을 더 씀
- **[Claude Haiku 4.5](https://www.cnbc.com/2026/06/02/microsoft-unveils-new-ai-models-lessen-reliance-on-openai-lower-costs.html)**를 4개 핵심 코딩 벤치에서 모두 상회 (SWE-Bench Pro 16점 차), SWE-Bench Verified에서 최대 **60% 적은 토큰**으로 해결
- **GitHub Copilot(VS Code)** 개인 사용자에게 롤아웃
- 가격: 입력 **$0.75/M**, 캐시 입력 **$0.075/M**, 출력 **$4.50/M**

## 배경
Microsoft가 밝힌 목적은 **OpenAI 의존도를 낮추고 개발자 비용을 내리는 것**이다.

---
# 출처
- [CNBC - Microsoft Unveils New AI Models](https://www.cnbc.com/2026/06/02/microsoft-unveils-new-ai-models-lessen-reliance-on-openai-lower-costs.html)
- [Microsoft AI — 7종 발표](https://microsoft.ai/news/building-a-hillclimbing-machine-launching-seven-new-mai-models/)
- [MAI-Thinking-1](https://microsoft.ai/news/introducing-mai-thinking-1/)
- [MAI-Code-1-Flash](https://microsoft.ai/news/introducingmai-code-1-flash/)
- [Simon Willison](https://simonwillison.net/2026/Jun/2/microsofts-new-models/)
- [Neowin](https://www.neowin.net/news/microsoft-unveils-mai-thinking-1-reasoning-and-mai-code-1-coding-models/)
