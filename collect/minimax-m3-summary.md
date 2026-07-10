# MiniMax M3 — 오픈웨이트 프런티어 모델 공개

> **첫 등장일** 2026-06-01 (✅ 검증 · VentureBeat·llm-stats·DataNorth. 가중치 HF 6/7)
> **분류** 오픈모델
> *발표·문서 내용을 있는 그대로 정리한 것입니다. 벤치마크는 상당수 자체 발표치임을 명시.*

상하이의 MiniMax가 2026년 6월 1일 **[MiniMax M3](https://datanorth.ai/news/minimax-launches-m3)**를 출시했다(API 즉시 제공, 오픈 가중치는 6월 7일 Hugging Face 공개). **오픈웨이트 최초로 프런티어급 코딩·에이전트 성능 + [1M 토큰 컨텍스트](https://datanorth.ai/news/minimax-launches-m3) + 네이티브 멀티모달을 한 아키텍처에 결합**했다고 밝혔다.

## 스펙
- **컨텍스트**: 1,048,576 토큰(최대 출력 512,000)
- **아키텍처**: MiniMax Sparse Attention(MSA) — 전체 어텐션 대신 KV-블록 선택으로 롱컨텍스트 토큰당 연산을 낮춤(1M 토큰에서 이전 세대의 약 1/20 비용, prefill·decode 빠름)
- **모달리티**: 텍스트·이미지·비디오 입력 → 텍스트 출력

## 벤치마크 (⚠️ 상당수 자체 발표치)
- **[SWE-Bench Pro 59.0%](https://datanorth.ai/news/minimax-launches-m3)**
- Terminal Bench 2.1 **66.0%** · MCP Atlas **74.2%** · BrowseComp **83.5**
- 일부 매체는 이 수치가 GPT-5.5·Gemini 3.1 Pro를 앞선다고 보도했으나, **독립 검증 전**이다.

## 가격 · 라이선스
- 가격: 입력 **[$0.30/M](https://datanorth.ai/news/minimax-launches-m3)**, 출력 **$1.20/M**. 프롬프트 캐싱 지원(반복 컨텍스트 최대 90% 절감).
- 라이선스: **[MIT](https://datanorth.ai/news/minimax-launches-m3)** — 상업적 사용·셀프호스트 가능.

---
# 출처
- [DataNorth - MiniMax Launches M3](https://datanorth.ai/news/minimax-launches-m3)
- [VentureBeat](https://venturebeat.com/technology/minimax-m3-debuts-eclipsing-gpt-5-5-and-gemini-3-1-pro-on-key-benchmark-performance-for-just-5-10-of-the-cost)
- [llm-stats](https://llm-stats.com/models/minimax-m3)
- [Artificial Analysis](https://artificialanalysis.ai/models/minimax-m3)
