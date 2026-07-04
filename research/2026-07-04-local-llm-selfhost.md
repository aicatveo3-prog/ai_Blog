# 조사 노트: 내 GPU로 돌리는 로컬 LLM (2026)

- 소스 티어: 2차(Hugging Face 블로그, SitePoint, Thundercompute) — 실측은 직접 예정
- 조사 날짜: 2026-07-04 / 글 유형: C 가이드형 / 렌즈 ②(직접) + ①
- 👉 출처는 맨 아래

## A. 확인된 팩트
- F1. 2026 최상위 오픈웨이트: **Qwen 3 235B-A22B**(전반 추론·코딩), **DeepSeek R1**(수학 추론), **Llama 4 Scout**(롱컨텍스트 최대 10M 토큰). [출처 1,3]
- F2. 소비자 GPU 1장으로 쉬운 것: **Gemma 3 27B**(약 16GB VRAM), **Phi-4 14B**(약 8GB). [출처 1]
- F3. **Gemma 3** 라인업: 1B/4B/12B/27B. 4B 이상은 텍스트+이미지, 128K 컨텍스트, 140+ 언어. [출처 1]
- F4. 도구: **Ollama**(사실상 표준 CLI/서버, OpenAI 호환 REST API, 모델 pull·양자화·GPU offload 자동), **LM Studio**(비주얼 모델 브라우저, HF 원클릭, 로컬 서버 포트 **1234**). [출처 4,5]
- F5. VRAM 기준: 7B@Q4 ≈ **4~5GB**, 14B ≈ **8~10GB**, 30B ≈ **16~20GB**. 입문 GPU: RTX 4060(8GB). [출처 4]

## D. 직접 테스트
- 미실시. 다음: Ollama로 Gemma 3 27B를 표준 시나리오(S1 요약 파이프라인)에 물려 실측(토큰 속도·품질).

## F. 관점
- (채택) "GPT 살 돈·프라이버시 걱정?" → 답은 **내 VRAM 기준으로 뭘 돌릴 수 있나**다. 모델명보다 VRAM 표가 먼저.

## G. 미해결 질문
- 한국어 품질: 위 모델들의 한국어 성능 실측치 미확인 (직접 테스트로 채울 것).

## 출처 링크 (클릭)
- [Hugging Face — Best open LLMs to run locally 2026](https://huggingface.co/blog/daya-shankar/open-source-llm-models-to-run-locally) — F1, F2, F3
- [SitePoint — Run Local LLMs 2026](https://www.sitepoint.com/run-local-llms-2026-complete-developer-guide/) — F4, F5
- [Thundercompute — Best open source LLMs (July 2026)](https://www.thundercompute.com/blog/best-open-source-llms) — F1, F5
- [SitePoint — Local LLMs are getting easier](https://www.sitepoint.com/local-llms-are-getting-easier-the-complete-guide-2026/) — F4

> ⚠️ 발행 전: VRAM 수치·모델 라인업을 1차(모델카드)로 재확인. 한국어 품질은 직접 테스트 후 보강.
