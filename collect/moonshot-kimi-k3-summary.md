# 정리본: Moonshot AI, Kimi K3 공개 — 2.8조 파라미터 MoE 모델

> **첫 등장일** [2026-07-16](https://www.marktechpost.com/2026/07/16/moonshot-ai-releases-kimi-k3-a-2-8-trillion-parameter-open-moe-model-with-kimi-delta-attention-and-1m-context/) (✅ 검증 · MarkTechPost · TechCrunch)
> **분류** 모델 출시 · Moonshot AI
> *발표 내용을 있는 그대로 정리한 것입니다.*

## 핵심

- [2.8조 파라미터 규모](https://www.marktechpost.com/2026/07/16/moonshot-ai-releases-kimi-k3-a-2-8-trillion-parameter-open-moe-model-with-kimi-delta-attention-and-1m-context/) Mixture-of-Experts(MoE) 구조, [896개 전문가 중 16개 활성화](https://techcrunch.com/2026/07/16/moonshots-upcoming-kimi-3-is-expected-to-close-the-gap-with-anthropics-opus-4-8/)
- [100만 토큰 컨텍스트 윈도우](https://kie.ai/blog/what-is-kimi-k3) 지원, 장문 처리 및 코딩 작업 최적화
- [Kimi Delta Attention(KDA)과 Attention Residuals(AttnRes)](https://www.marktechpost.com/2026/07/16/moonshot-ai-releases-kimi-k3-a-2-8-trillion-parameter-open-moe-model-with-kimi-delta-attention-and-1m-context/) 기술 채용
- [오픈 가중치 모델로 공개](https://fortune.com/2026/07/16/moonshots-kimi-k3-pushes-chinese-ai-into-fable-level-territory/), [2026-07-27 전체 가중치 공개 예정](https://www.axios.com/2026/07/16/moonshot-kimi-ai-china-model-openai-anthropic)
- [K3 Max와 K3 Swarm Max 두 가지 변형](https://codersera.com/blog/kimi-k3-complete-guide-2026/)으로 채팅·에이전트 및 병렬 처리 지원
- [입력 $3/백만 토큰, 출력 $15/백만 토큰](https://codersera.com/blog/kimi-k3-complete-guide-2026/) 가격, Opus 4.8 대비 저렴

## 기술 명세

| 항목 | 사양 |
|------|------|
| 모델명 | [Kimi K3 / K3 Max / K3 Swarm Max](https://www.marktechpost.com/2026/07/16/moonshot-ai-releases-kimi-k3-a-2-8-trillion-parameter-open-moe-model-with-kimi-delta-attention-and-1m-context/) |
| 매개변수 | [2.8조 (2.8T)](https://www.marktechpost.com/2026/07/16/moonshot-ai-releases-kimi-k3-a-2-8-trillion-parameter-open-moe-model-with-kimi-delta-attention-and-1m-context/) |
| 아키텍처 | [Stable LatentMoE](https://kie.ai/blog/what-is-kimi-k3), 16/896 활성화 전문가 |
| 컨텍스트 | [100만 토큰](https://kie.ai/blog/what-is-kimi-k3) |
| 라이선스 | [Modified MIT](https://www.marktechpost.com/2026/07/16/moonshot-ai-releases-kimi-k3-a-2-8-trillion-parameter-open-moe-model-with-kimi-delta-attention-and-1m-context/) |

## 성능 평가

[Moonshot의 주장에 따르면](https://codersera.com/blog/kimi-k3-complete-guide-2026/) 전 세계 모든 프론티어 모델 중 4위로, [Claude Fable 5와 GPT-5.6 Sol에만 뒤처지고](https://winbuzzer.com/2026/07/17/moonshot-ai-unveils-28t-parameter-kimi-k3-ai-model-xcxwbn/) Claude Opus 4.8을 상회한다는 평가.

---

# 출처

- [MarkTechPost · Moonshot AI Releases Kimi K3: A 2.8 Trillion Parameter Open MoE Model With Kimi Delta Attention and 1M Context](https://www.marktechpost.com/2026/07/16/moonshot-ai-releases-kimi-k3-a-2-8-trillion-parameter-open-moe-model-with-kimi-delta-attention-and-1m-context/)
  https://www.marktechpost.com/2026/07/16/moonshot-ai-releases-kimi-k3-a-2-8-trillion-parameter-open-moe-model-with-kimi-delta-attention-and-1m-context/
- [TechCrunch · Moonshot's upcoming Kimi 3 is expected to close the gap with Anthropic's Opus 4.8](https://techcrunch.com/2026/07/16/moonshots-upcoming-kimi-3-is-expected-to-close-the-gap-with-anthropics-opus-4-8/)
  https://techcrunch.com/2026/07/16/moonshots-upcoming-kimi-3-is-expected-to-close-the-gap-with-anthropics-opus-4-8/
- [KIE · What Is Kimi K3? Moonshot's 2.8T, 1M-Context Flagship](https://kie.ai/blog/what-is-kimi-k3)
  https://kie.ai/blog/what-is-kimi-k3
- [Fortune · Moonshot's Kimi K3 pushes Chinese AI into Fable-level territory](https://fortune.com/2026/07/16/moonshots-kimi-k3-pushes-chinese-ai-into-fable-level-territory/)
  https://fortune.com/2026/07/16/moonshots-kimi-k3-pushes-chinese-ai-into-fable-level-territory/
- [Axios · China's open-weight Kimi model stuns AI world with frontier-level results](https://www.axios.com/2026/07/16/moonshot-kimi-ai-china-model-openai-anthropic)
  https://www.axios.com/2026/07/16/moonshot-kimi-ai-china-model-openai-anthropic
- [Codersera · Kimi K3: Moonshot AI's 2.8T Open-Weight Model — Release, Specs & Pricing (2026)](https://codersera.com/blog/kimi-k3-complete-guide-2026/)
  https://codersera.com/blog/kimi-k3-complete-guide-2026/
- [WinBuzzer · Moonshot AI Unveils 2.8T-Parameter Kimi K3 AI Model](https://winbuzzer.com/2026/07/17/moonshot-ai-unveils-28t-parameter-kimi-k3-ai-model-xcxwbn/)
  https://winbuzzer.com/2026/07/17/moonshot-ai-unveils-28t-parameter-kimi-k3-ai-model-xcxwbn/
