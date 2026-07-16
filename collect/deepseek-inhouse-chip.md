# 딥시크가 직접 'AI 칩'을 만든다고? — 왜, 그리고 무엇이 걸림돌인가

> **첫 등장일** 2026-07-07 (✅ 검증 · Reuters(US News)·TechNode·Japan Times·Yahoo Finance)
> **분류** 칩·하드웨어 · DeepSeek(중국)
> *어려운 개념을 비유로 풀어 설명합니다. 맨 아래 [용어 사전]도 참고하세요.*

---
## 한마디로 요약

중국 AI 스타트업 딥시크(DeepSeek)가 자기 서비스를 돌릴 [전용 반도체를 직접 만들기 시작했다는 보도](https://www.usnews.com/news/top-news/articles/2026-07-07/exclusive-chinas-deepseek-developing-its-own-ai-chip-sources-say)가 나왔습니다. 지금까지 빌려 쓰던 남의 칩(엔비디아·화웨이)에 대한 의존을 줄이려는 겁니다.

> 남의 주방을 빌려 장사하던 식당이, 이제 자기 주방을 짓기로 한 셈입니다. 다만 주방을 짓는 데는 시간도, 돈도, 그리고 '허가'도 필요합니다.

## 그런데 이 칩은 '학습용'이 아니라 '추론용'이래요

AI 칩에는 크게 두 종류의 일이 있습니다.

- **학습(training)**: AI에게 처음부터 지식을 가르치는 과정. 짧은 기간에 엄청난 연산을 몰아서 씁니다.
- **추론(inference)**: 이미 다 배운 AI가 사용자의 질문에 답을 만들어 내는 과정. [딥시크가 만든다는 칩은 바로 이 '추론' 전용](https://technode.com/2026/07/08/deepseek-begins-in-house-ai-chip-development-to-cut-reliance-on-nvidia-sources-say/)입니다.

> 학습이 '요리사를 학원에 보내 가르치는 것'이라면, 추론은 '그 요리사가 매일 손님 주문을 받아 음식을 내는 것'입니다. 손님이 많아질수록 매일의 요리 비용(추론 비용)이 중요해지죠.

딥시크·챗봇 사용량이 폭발하면서 [이 '매일의 비용'을 낮추는 게 급해졌고](https://mlq.ai/news/deepseek-designing-proprietary-ai-inference-chip-to-cut-nvidia-huawei-dependence/), 그래서 [추론에 딱 맞춘 자체 칩으로 비용·전력·안정성을 잡으려는](https://technode.com/2026/07/08/deepseek-begins-in-house-ai-chip-development-to-cut-reliance-on-nvidia-sources-say/) 전략입니다.

## 왜 하필 지금, '탈(脫) 엔비디아·화웨이'인가?

딥시크가 걸어온 길을 보면 이유가 보입니다.

1. 원래는 엔비디아 칩(H800)으로 모델을 학습시켰는데, [미국이 수출 규제로 최신 칩 판매를 막으면서](https://www.igorslab.de/en/deepseek-inference-chip-china-ai-less-dependent-nvidia-huawei/) 길이 좁아졌습니다.
2. 그래서 국산 대안인 [화웨이 어센드(Ascend)로 옮겨갔고, 2026년 4월엔 어센드에 맞춘 V4 모델까지 냈습니다](https://uk.finance.yahoo.com/news/chinas-deepseek-returns-model-viral-031101640.html).
3. 이제는 화웨이 칩에도 마냥 기대지 않으려고, [아예 자기 칩을 직접 만드는 쪽으로](https://wccftech.com/deepseek-building-its-own-inference-chip-to-break-free-from-nvidia-huawei/) 한 발 더 나아간 겁니다.

여기에 [중국 정부가 "국산 칩을 키우라"고 자국 기업을 압박](https://finance.yahoo.com/technology/ai/articles/exclusive-chinas-deepseek-developing-own-103437335.html)해 온 배경도 겹칩니다. 실제로 [같은 시기 또 다른 중국 AI 기업 즈푸(Zhipu)도 전용 칩(ASIC)을 검토](https://www.trendforce.com/news/2026/07/08/news-china-ai-model-developers-ramp-up-in-house-chips-deepseek-zhipu-explore-custom-silicon/) 중이라 알려졌습니다.

## 그럼 이제 엔비디아는 큰일 난 걸까? — 아직은 '아니다'에 가깝다

보도가 나오자 [엔비디아 주가가 잠깐 1.6~2% 빠졌지만](https://www.investing.com/news/stock-market-news/nvidia-stock-slips-after-report-says-deepseek-is-designing-its-own-ai-chip-4778739), 시장의 반응은 생각보다 차분했습니다. 이유가 있습니다.

- 미국 규제 탓에 [엔비디아의 중국 매출은 이미 거의 사라진 상태](https://blockonomi.com/deepseek-develops-custom-ai-chip-as-nvidia-nvda-stock-falls-2/)라, "이미 잃은 시장"이라는 분석이 많습니다.
- 게다가 딥시크 칩이 [해외 최첨단 공장을 못 쓰는 한, 세계 시장에 팔리긴 어렵다](https://www.igorslab.de/en/deepseek-inference-chip-china-ai-less-dependent-nvidia-huawei/)는 지적도 있습니다.

즉 "당장의 위협"이라기보다는 "장기적으로 지켜볼 흐름"이라는 평가입니다. 사람마다 이 신호의 무게를 다르게 봅니다.

## 만드는 게 쉽진 않다 — 세 개의 벽

딥시크 앞에 놓인 현실적 장벽도 큽니다.

| 벽 | 무슨 뜻인가 |
|---|---|
| **시간·돈** | [경쟁력 있는 칩 하나 만드는 데 보통 수년과 막대한 자본이 든다](https://finance.yahoo.com/technology/ai/articles/exclusive-chinas-deepseek-developing-own-103437335.html) |
| **제조(파운드리)** | 설계를 해도 [미국 규제로 해외 최첨단 공장을 못 쓴다](https://www.igorslab.de/en/deepseek-inference-chip-china-ai-less-dependent-nvidia-huawei/). 좋은 도면이 있어도 찍어줄 공장이 없는 셈 |
| **메모리(HBM)** | 추론 칩에 꼭 필요한 [고대역폭 메모리(HBM) 확보도 규제로 막혀 있다](https://technode.com/2026/07/08/deepseek-begins-in-house-ai-chip-development-to-cut-reliance-on-nvidia-sources-say/) |

여기에 하나 더. 엔비디아의 진짜 힘은 칩 자체가 아니라 [개발자들이 오래 써온 소프트웨어 생태계(CUDA)](https://blockonomi.com/deepseek-develops-custom-ai-chip-as-nvidia-nvda-stock-falls-2/)에 있습니다. 아무리 좋은 칩을 만들어도, 개발자들이 갈아탈 이유를 주지 못하면 소용이 없습니다.

> 새 스마트폰을 잘 만들어도, 앱이 하나도 없으면 아무도 안 사는 것과 같습니다.

## 이게 우리한테 어떤 의미인가?

- **AI 반도체 판도**: '모델 만드는 회사가 칩까지 직접 만드는' 흐름은 이미 [오픈AI·구글·아마존·앤스로픽이 걷던 길](https://finance.yahoo.com/technology/ai/articles/exclusive-chinas-deepseek-developing-own-103437335.html)입니다. 여기에 중국 기업까지 합류하면서 '칩 내재화'가 업계 표준 전략이 되고 있습니다.
- **미·중 기술 갈등의 축소판**: 이 뉴스는 규제(미국) vs 자립(중국)이라는 큰 그림의 한 장면입니다. 결과가 어떻게 될지는 [제조·메모리 장벽을 딥시크가 넘느냐](https://www.igorslab.de/en/deepseek-inference-chip-china-ai-less-dependent-nvidia-huawei/)에 달려 있습니다.
- **아직은 소문 단계**: 딥시크가 공식 확인한 게 아니라 [익명 소식통 기반 보도](https://www.usnews.com/news/top-news/articles/2026-07-07/exclusive-chinas-deepseek-developing-its-own-ai-chip-sources-say)이고, 상업화 일정도 없습니다. 기대와 회의가 함께 있는 이유입니다.

## 용어 사전

| 용어 | 뜻 |
|---|---|
| 추론(inference) | 이미 학습을 마친 AI가 사용자 질문에 답을 만들어 내는 과정. 서비스가 실제로 돌아가는 단계 |
| 학습(training) | AI에게 처음부터 지식을 가르치는 과정. 짧게 막대한 연산이 필요 |
| 파운드리(foundry) | 반도체 설계도를 실제 칩으로 찍어내는 위탁 생산 공장(예: TSMC) |
| HBM(고대역폭 메모리) | 여러 층으로 쌓아 데이터를 아주 빠르게 주고받는 고성능 메모리. AI 칩의 필수 부품 |
| CUDA | 엔비디아 칩 위에서 프로그램을 돌리는 소프트웨어 도구 모음. 개발자들이 오래 써와 '이사 비용'이 큰 생태계 |
| ASIC | 특정 작업 하나만 아주 잘하도록 맞춤 설계한 전용 칩. 즈푸가 검토 중이라 알려진 방식 |
| 어센드(Ascend) | 화웨이의 AI 칩. 중국의 대표적 국산 엔비디아 대안 |

---
# 출처
- [US News(로이터 단독) · Exclusive: China's DeepSeek Developing Its Own AI Chip, Sources Say](https://www.usnews.com/news/top-news/articles/2026-07-07/exclusive-chinas-deepseek-developing-its-own-ai-chip-sources-say)
  https://www.usnews.com/news/top-news/articles/2026-07-07/exclusive-chinas-deepseek-developing-its-own-ai-chip-sources-say
- [TechNode · DeepSeek begins in-house AI chip development to cut reliance on NVIDIA](https://technode.com/2026/07/08/deepseek-begins-in-house-ai-chip-development-to-cut-reliance-on-nvidia-sources-say/)
  https://technode.com/2026/07/08/deepseek-begins-in-house-ai-chip-development-to-cut-reliance-on-nvidia-sources-say/
- [Yahoo Finance · Exclusive-China's DeepSeek developing its own AI chip, sources say](https://finance.yahoo.com/technology/ai/articles/exclusive-chinas-deepseek-developing-own-103437335.html)
  https://finance.yahoo.com/technology/ai/articles/exclusive-chinas-deepseek-developing-own-103437335.html
- [wccftech · DeepSeek Is Reportedly Building Its Own Inference Chip to Break Free From NVIDIA and Huawei](https://wccftech.com/deepseek-building-its-own-inference-chip-to-break-free-from-nvidia-huawei/)
  https://wccftech.com/deepseek-building-its-own-inference-chip-to-break-free-from-nvidia-huawei/
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
