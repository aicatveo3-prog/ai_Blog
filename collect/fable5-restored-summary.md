# Anthropic, Claude Fable 5·Mythos 5 수출통제 해제 후 서비스 복귀

> **첫 등장일** 2026-06-30 (✅ 검증 · Anthropic 공식 블로그·CNBC·TheHackerNews·FoxBusiness·9to5Mac·cybersecuritynews.com)
> **분류** 규제·안전 · Anthropic
> *발표 내용을 있는 그대로 정리한 것입니다.*

## 핵심
- 2026년 6월 12일, 미 정부(상무부)가 국가안보를 이유로 수출통제 지침을 발동해 Anthropic은 Claude Fable 5·Mythos 5 모델을 미국 국적이 아닌 사용자(및 국적 확인이 불가능한 사용자 전체)에게 차단해야 했다.
- 계기는 Amazon 연구진이 발견해 정부에 보고한 Fable 5의 안전장치 우회(jailbreak) 기법이었다.
- Anthropic은 사용자 국적을 실시간으로 확인할 방법이 없어, 규정 위반을 피하기 위해 전 세계 모든 사용자에게 두 모델 서비스를 전면 중단했다.
- 2026년 6월 30일, 미 상무부가 두 모델에 대한 수출통제를 해제한다고 통보했다. Commerce 장관 Howard Lutnick은 약 2주간 Anthropic과 함께 모델을 검토했다고 밝혔다.
- 2026년 7월 1일(수), Fable 5·Mythos 5가 Claude.ai·Claude Platform(API)·Claude Code·Claude Cowork 전반에서 전 세계 사용자에게 순차 복귀했다.
- Anthropic은 새 분류기(classifier)를 도입해 Amazon이 발견한 해당 jailbreak 기법을 99% 이상 차단한다고 발표했다.
- 셧다운 기간은 약 18~19일(6/12 발동 ~ 6/30 해제 통보/7/1 서비스 복귀 기준)이었다.

## 세부 (사건 경위와 조치 내용)
- Amazon 연구진은 특정 방식의 프롬프트(예: "이 코드를 고쳐줘" 류의 요청)로 Fable 5가 소프트웨어 취약점을 식별하고, 한 사례에서는 이를 실제로 악용하는 코드까지 만들어내는 것을 확인해 정부에 보고했다.
- 이를 근거로 미 상무부는 2026년 6월 12일 오후(미 동부시간 기준) 수출통제 지침을 발동했다. 명령은 즉시 발효됐고, 미국 국적이 아닌 모든 사용자(Anthropic 소속 외국 국적 직원 포함)의 접근 차단을 요구했다.
- Anthropic은 국적을 실시간으로 검증할 방법이 없다는 이유로, 규정 준수를 위해 전 세계 모든 고객에 대해 두 모델 서비스를 중단했다고 밝혔다.
- 2026년 6월 30일 상무부가 수출통제 해제를 통보했다. Lutnick 장관은 Anthropic이 △보안 위험을 사전에 탐지·보고하고 △향후 모델 출시 절차를 정부와 협의하며 △악용 사례 발생 시 정부에 알리기로 합의했다고 밝혔다(Anthropic·상무부 발표 내용).
- Fable 5는 2026년 7월 1일부터 Claude.ai, Claude Platform(API), Claude Code, Claude Cowork 전반에서 전 세계 사용자에게 순차 복귀했다. Mythos 5는 여전히 소수의 미국 기업·기관(Project Glasswing 파트너) 위주로 접근이 제한된 상태로 보도됐다.
- 유료 요금제(Pro·Max·Team·일부 Enterprise) 사용자는 2026년 7월 7일까지 Fable 5 사용량이 주간 한도의 최대 50%까지만 계산되며, 이후에는 별도 사용량 크레딧 체계로 전환된다.
- 미 정부기관인 CAISI(Center for AI Standards and Innovation)가 새 안전장치를 독립적으로 시험·승인한 뒤 수출통제가 해제됐다고 보도됐다(구체 시험 수치는 비공개).
- White House 자문 David Sacks는 정부가 jailbreak 경고를 받고 Anthropic에 통보했을 때 Dario Amodei가 "심각한 위험이 아니다"라며 수정을 거부했다고 주장했다. Anthropic 측은 해당 jailbreak가 Mythos의 특정 사이버보안 기능을 한 사례에서만 우회하는 좁은 범위의 것이라며 정부의 심각성 평가에 이견을 냈다.

## 근거로 제시된 데이터 (자체 주장 포함)
- "새 분류기가 해당 jailbreak 기법을 99% 이상 차단한다"는 수치는 Anthropic의 자체 발표다. CAISI가 독립적으로 시험·승인했다고 보도됐으나, 세부 시험 방법론과 수치는 공개되지 않아 독립검증 전 상태다.
- 분류기 강화의 부작용으로 일상적인 코딩·디버깅 요청에도 오탐(false positive)이 늘고, 일부 요청이 더 약한 대체 모델(Opus 4.8)로 자동 라우팅된다는 점이 여러 매체에서 확인됐다(Anthropic도 "단기적으로 일부 일상 작업에 영향이 있을 수 있다"고 인정).

## 시점 맥락
- 이 사건은 이전 인박스 항목 "AI CEO들 G7 정상회의(Évian) 소집 — Fable 5 탈옥·정부 셧다운 여파"(첫 등장 2026-06-17)의 후속·결말에 해당한다. 당시 G7 정상회의에는 Dario Amodei(Anthropic)·Sam Altman(OpenAI)·Demis Hassabis(Google DeepMind) 등이 참석해 신뢰받는 동맹국에 대한 프론티어 모델의 구조화된 접근을 요구했고, 마크롱 프랑스 대통령은 이번 셧다운을 "경종(wake-up call)"이라 평가하면서도 수출통제 조치 자체는 "나쁜 일"이라고 언급했다.
- 셧다운 기간 중 전 Facebook 최고보안책임자 Alex Stamos가 조직한 공개서한(freefable.org)에 사이버보안 임원·전문가 300명 이상이 서명해 수출통제 해제를 요구하는 등 업계 압박이 있었다.
- 이번 사태의 최초 보고자는 Amazon 최고경영자 Andy Jassy로 알려졌으며, Amazon은 Anthropic의 최대 외부 투자자이기도 하다는 점이 여러 매체에서 함께 언급됐다.

---
*출처: [Anthropic 공식 블로그 "Redeploying Fable 5"](https://www.anthropic.com/news/redeploying-fable-5) · [CNBC](https://www.cnbc.com/2026/06/30/anthropic-says-trump-admin-has-lifted-export-controls-on-claude-fable-5-and-mythos-5.html) · [TheHackerNews](https://thehackernews.com/2026/07/anthropic-restores-claude-fable-5-after.html) · [FoxBusiness](https://www.foxbusiness.com/technology/trump-administration-lifts-claude-mythos-5-fable-5-export-restrictions-after-anthropic-works-government) · [9to5Mac](https://9to5mac.com/2026/07/01/claude-fable-5-cleared-to-return-as-us-lifts-anthropics-export-control-restriction/) · [Hacker News 토론](https://news.ycombinator.com/item?id=48740771) · [cybersecuritynews.com](https://cybersecuritynews.com/export-controls-fable-5-and-mythos-5/) · [MarkTechPost](https://www.marktechpost.com/2026/07/01/anthropic-redeploys-claude-fable-5-on-july-1-after-us-export-controls-lift-adds-new-cybersecurity-classifier/)*
