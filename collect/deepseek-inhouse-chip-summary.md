# DeepSeek, 자체 AI칩 개발 시작 — NVIDIA 의존도 감소 전략

> **첫 등장일** 2026-07-07 (✅ 검증 · Reuters(US News)·TechNode·Japan Times·Yahoo Finance)
> **분류** 칩·하드웨어 · DeepSeek(중국)
> *발표 내용을 있는 그대로 정리한 것입니다.*

## 핵심

- 중국 AI 스타트업 DeepSeek이 [자체 AI칩을 개발 중이라고 소식통 3명이 전했다는 로이터 단독 보도](https://www.usnews.com/news/top-news/articles/2026-07-07/exclusive-chinas-deepseek-developing-its-own-ai-chip-sources-say)가 2026년 7월 7일 나왔습니다.
- 이 칩은 모델 학습(training)이 아니라 [이미 학습된 모델이 사용자 요청에 응답하는 '추론(inference)' 단계에 특화](https://technode.com/2026/07/08/deepseek-begins-in-house-ai-chip-development-to-cut-reliance-on-nvidia-sources-say/)됩니다.
- 목적은 [NVIDIA와 Huawei 칩에 대한 의존도를 함께 낮추는 것](https://wccftech.com/deepseek-building-its-own-inference-chip-to-break-free-from-nvidia-huawei/)입니다.
- 프로젝트는 [약 1년 전 시작됐고 최근 채용을 늘렸으며](https://techstartups.com/2026/07/07/deepseek-is-building-its-own-ai-chip-to-cut-reliance-on-nvidia-and-huawei/), 아직 [초기 단계로 상업화 일정은 미정](https://technode.com/2026/07/08/deepseek-begins-in-house-ai-chip-development-to-cut-reliance-on-nvidia-sources-say/)입니다.
- DeepSeek은 [칩설계·파운드리·메모리 업체들과 외부 파트너십을 논의 중](https://www.usnews.com/news/top-news/articles/2026-07-07/exclusive-chinas-deepseek-developing-its-own-ai-chip-sources-say)입니다.
- 보도 직후 [NVIDIA 주가는 프리마켓에서 약 1.6~2% 하락](https://www.investing.com/news/stock-market-news/nvidia-stock-slips-after-report-says-deepseek-is-designing-its-own-ai-chip-4778739)했습니다.

## 세부 — 무엇을 왜

- **추론 전용 설계**: 학습은 짧은 시간에 막대한 연산을 몰아쓰지만, 추론은 [대량의 사용자 요청을 상시 처리해야 해 비용·전력·안정성이 중요](https://technode.com/2026/07/08/deepseek-begins-in-house-ai-chip-development-to-cut-reliance-on-nvidia-sources-say/)합니다. 자체 칩으로 [추론 비용을 낮추려는 전략](https://mlq.ai/news/deepseek-designing-proprietary-ai-inference-chip-to-cut-nvidia-huawei-dependence/)입니다.
- **공급 제약 배경**: [미국의 수출 규제로 중국 기업은 NVIDIA 최신 칩 구매가 막혀 있고](https://www.igorslab.de/en/deepseek-inference-chip-china-ai-less-dependent-nvidia-huawei/), 중국 당국은 자국 기업에 [국산 대안 마련을 압박](https://finance.yahoo.com/technology/ai/articles/exclusive-chinas-deepseek-developing-own-103437335.html)해 왔습니다.
- **동종 흐름**: 같은 시기 [중국 Zhipu(즈푸) AI도 NVIDIA GPU 대안으로 ASIC(특정 작업 전용 칩)을 검토하며 중국 칩설계사와 접촉](https://www.trendforce.com/news/2026/07/08/news-china-ai-model-developers-ramp-up-in-house-chips-deepseek-zhipu-explore-custom-silicon/) 중이라는 보도가 함께 나왔습니다.
- **당사자 언급 없음**: DeepSeek은 이 보도에 대해 공식 확인·부인을 내놓지 않았고, 보도는 [익명 소식통에 기반](https://www.usnews.com/news/top-news/articles/2026-07-07/exclusive-chinas-deepseek-developing-its-own-ai-chip-sources-say)합니다(자체 확인 전).

## 남아 있는 장벽 (보도가 든 제약)

- [경쟁력 있는 AI칩 설계에는 통상 수년과 막대한 자본이 필요](https://finance.yahoo.com/technology/ai/articles/exclusive-chinas-deepseek-developing-own-103437335.html)합니다.
- 제조도 관문입니다 — [미국은 중국 설계사가 해외 최첨단 파운드리를 쓰지 못하게 막고 있고](https://www.igorslab.de/en/deepseek-inference-chip-china-ai-less-dependent-nvidia-huawei/), 별도 규제로 [추론 칩에 필수인 고대역폭 메모리(HBM) 확보도 제한](https://technode.com/2026/07/08/deepseek-begins-in-house-ai-chip-development-to-cut-reliance-on-nvidia-sources-say/)됩니다.
- NVIDIA의 우위는 하드웨어뿐 아니라 [CUDA 소프트웨어 생태계에서 나오므로, 칩만으로 대체가 어렵다](https://blockonomi.com/deepseek-develops-custom-ai-chip-as-nvidia-nvda-stock-falls-2/)는 지적도 있습니다.

## 시점 맥락

- DeepSeek은 앞서 [미국 규제로 NVIDIA H800 확보가 끊긴 뒤 Huawei Ascend로 이동](https://www.igorslab.de/en/deepseek-inference-chip-china-ai-less-dependent-nvidia-huawei/)해 왔고, [2026년 4월 Huawei Ascend에 맞춘 V4 모델을 내놓은](https://uk.finance.yahoo.com/news/chinas-deepseek-returns-model-viral-031101640.html) 바 있습니다. 이번 자체 칩은 NVIDIA뿐 아니라 Huawei 의존까지 줄이려는 다음 수순입니다.
- DeepSeek은 [첫 외부 투자 유치도 추진 중이며, 약 70억 달러 규모(기업가치 520억~590억 달러)로 알려졌습니다](https://finance.yahoo.com/technology/ai/articles/exclusive-chinas-deepseek-developing-own-103437335.html)(보도 기준, 미확정).

---
# 출처
- [US News(로이터 단독) · Exclusive: China's DeepSeek Developing Its Own AI Chip, Sources Say](https://www.usnews.com/news/top-news/articles/2026-07-07/exclusive-chinas-deepseek-developing-its-own-ai-chip-sources-say)
  https://www.usnews.com/news/top-news/articles/2026-07-07/exclusive-chinas-deepseek-developing-its-own-ai-chip-sources-say
- [TechNode · DeepSeek begins in-house AI chip development to cut reliance on NVIDIA](https://technode.com/2026/07/08/deepseek-begins-in-house-ai-chip-development-to-cut-reliance-on-nvidia-sources-say/)
  https://technode.com/2026/07/08/deepseek-begins-in-house-ai-chip-development-to-cut-reliance-on-nvidia-sources-say/
- [Japan Times · China's DeepSeek developing its own AI chip, sources say](https://www.japantimes.co.jp/business/2026/07/08/tech/china-deepseek-ai-chip/)
  https://www.japantimes.co.jp/business/2026/07/08/tech/china-deepseek-ai-chip/
- [Yahoo Finance · Exclusive-China's DeepSeek developing its own AI chip, sources say](https://finance.yahoo.com/technology/ai/articles/exclusive-chinas-deepseek-developing-own-103437335.html)
  https://finance.yahoo.com/technology/ai/articles/exclusive-chinas-deepseek-developing-own-103437335.html
- [wccftech · DeepSeek Is Reportedly Building Its Own Inference Chip to Break Free From NVIDIA and Huawei](https://wccftech.com/deepseek-building-its-own-inference-chip-to-break-free-from-nvidia-huawei/)
  https://wccftech.com/deepseek-building-its-own-inference-chip-to-break-free-from-nvidia-huawei/
- [Tech Startups · DeepSeek is building its own AI chip to cut reliance on Nvidia and Huawei](https://techstartups.com/2026/07/07/deepseek-is-building-its-own-ai-chip-to-cut-reliance-on-nvidia-and-huawei/)
  https://techstartups.com/2026/07/07/deepseek-is-building-its-own-ai-chip-to-cut-reliance-on-nvidia-and-huawei/
- [MLQ News · DeepSeek Designing Proprietary AI Inference Chip to Cut Nvidia, Huawei Dependence](https://mlq.ai/news/deepseek-designing-proprietary-ai-inference-chip-to-cut-nvidia-huawei-dependence/)
  https://mlq.ai/news/deepseek-designing-proprietary-ai-inference-chip-to-cut-nvidia-huawei-dependence/
- [igor'sLAB · DeepSeek is reportedly developing its own inference chip](https://www.igorslab.de/en/deepseek-inference-chip-china-ai-less-dependent-nvidia-huawei/)
  https://www.igorslab.de/en/deepseek-inference-chip-china-ai-less-dependent-nvidia-huawei/
- [TrendForce · China AI Model Developers Ramp Up In-house Chips: DeepSeek, Zhipu Explore Custom Silicon](https://www.trendforce.com/news/2026/07/08/news-china-ai-model-developers-ramp-up-in-house-chips-deepseek-zhipu-explore-custom-silicon/)
  https://www.trendforce.com/news/2026/07/08/news-china-ai-model-developers-ramp-up-in-house-chips-deepseek-zhipu-explore-custom-silicon/
- [Investing.com · Nvidia stock slips after report says DeepSeek is designing its own AI chip](https://www.investing.com/news/stock-market-news/nvidia-stock-slips-after-report-says-deepseek-is-designing-its-own-ai-chip-4778739)
  https://www.investing.com/news/stock-market-news/nvidia-stock-slips-after-report-says-deepseek-is-designing-its-own-ai-chip-4778739
- [Blockonomi · DeepSeek Develops Custom AI Chip as Nvidia (NVDA) Stock Falls 2%](https://blockonomi.com/deepseek-develops-custom-ai-chip-as-nvidia-nvda-stock-falls-2/)
  https://blockonomi.com/deepseek-develops-custom-ai-chip-as-nvidia-nvda-stock-falls-2/
- [Yahoo Finance · China's DeepSeek unveils new model tailored for Huawei chips](https://uk.finance.yahoo.com/news/chinas-deepseek-returns-model-viral-031101640.html)
  https://uk.finance.yahoo.com/news/chinas-deepseek-returns-model-viral-031101640.html
