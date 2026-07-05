# Anthropic, 중국 기업의 Claude 우회 접근(싱가포르 법인·VPN) 차단 나서

> **첫 등장일** 2026-07-02 (✅ 검증 · Financial Times·Investing.com·Seeking Alpha)
> **분류** 논란·정책 · Anthropic
> *발표·보도된 사실을 있는 그대로 정리한 것입니다.*

이 정리본은 같은 시기에 얽혀 보도된 **두 개의 별개 사안**을 구분해 다룹니다.
**사안 ①** = 7/2 FT 보도(중국 기업의 Claude 우회 접근·증류 차단), **사안 ②** = 6/30 공개된 Claude Code 은닉 탐지 코드 프라이버시 논란.

## 핵심
- **[사안 ①]** Financial Times가 7/2(현지) 단독으로, Anthropic이 중국 기업들의 Claude 우회 접근 경로(loophole)를 막는 조치에 나섰다고 보도했다. (헤드라인: "Anthropic moves to close loopholes that allow Chinese access to Claude")
- **[사안 ①]** FT 보도에 따르면 Ant Financial은 싱가포르 법인 계정을 통해, ByteDance는 직원의 VPN 개인 구독 비용을 대납하는 방식으로 접근한 것으로 지목됐다.
- **[사안 ①]** Anthropic은 별도로, 4~6월 약 2.5만 개 부정 계정과 2880만 건의 상호작용에 걸친 증류(distillation) 공격을 탐지했다고 6/10 상원 서한 등을 통해 밝혔다.
- **[사안 ②]** 6/30 Reddit(r/ClaudeAI)의 이용자 LegitMichel777이 Claude Code를 리버스엔지니어링하던 중, 시스템 시간대·프록시를 검사해 중국 사용자를 식별하는 은닉 탐지 코드를 발견했다고 공개했다.
- **[사안 ②]** Anthropic 기술 담당자 Thariq Shihipar는 이 코드가 무단 재판매·증류를 막기 위한 실험이라고 해명하며 "완전히 롤백될 것"이라고 밝혔고, 해당 기능은 이후 철회됐다.

## 세부

### 사안 ① — 우회 접근·증류 차단 (7/2 FT 보도)
- Anthropic은 중국 기업이 미국의 접근 제한을 우회해 Claude를 이용하는 경로를 차단·탐지 강화하는 조치에 착수했다.
- 지목된 우회 수법: Ant Financial의 싱가포르 법인 계정 이용, ByteDance의 직원 VPN 개인 구독 대납.
- 증류 공격 발표(별건): Anthropic은 자사 블로그에서 증류 공격 탐지·방지 방법론을 설명하며, Alibaba(Qwen) 계열이 "역사상 최대 규모"의 증류 캠페인을 벌였다고 명시했다.
- Alibaba는 "독점 모델의 산출물을 학습에 쓰지 않으며 지재권법을 준수한다"는 취지로 부인했다(CNBC 6/24).
- Alibaba는 7/3 사내 공지로 Claude 전 제품 사용 금지(7/10 발효)와 자체 도구(Qoder) 전환을 지시한 것으로 보도됐다.

### 사안 ② — Claude Code 은닉 탐지 코드 (6/30 공개)
- 발견 경로: 6/30 Reddit r/ClaudeAI 이용자 LegitMichel777의 리버스엔지니어링 공개.
- 동작: 시스템 시간대·프록시로 중국 이용자를 식별하고, 유니코드 기반 스테가노그래피 방식으로 신호를 전송하는 코드로 보도됐다(데일리시큐·위키트리).
- Anthropic 측 해명: Thariq Shihipar가 "무단 재판매자의 계정 남용과 증류를 막기 위한 실험"(3월 시작)이라고 설명하고 "완전히 롤백될 것"이라 밝혔다.
- 결과: 해당 기능은 철회됐다(AI타임스, 2차 요약 기반). 사용자 동의 없이 국적 기반으로 시스템 정보를 검사·전송했다는 점에서 신뢰 위반 비판이 제기됐다.

## 근거로 제시된 데이터
- 부정 계정 약 2.5만 개, 상호작용 약 2880만 건(Anthropic 발표, 4~6월 탐지분). — 발표 주체 자체 집계.
- 앞서 2월 관련 보도에서는 "1600만 건의 Claude 쿼리로 모델을 복제했다"는 폭로가 있었고, 이번 규모(2880만 건)가 그보다 컸다는 점이 재확인됐다(TheHackerNews 2월 보도 대비).
- Alibaba(Qwen)의 증류 캠페인을 "역사상 최대 규모"로 규정 — Anthropic 자체 주장.

## 시점 맥락
- 두 사안은 별개 타임라인이다. 사안 ①은 7/2 FT 보도, 사안 ②는 6/30 Reddit 공개로, 접근 차단 정책과 은닉 코드 논란은 서로 다른 사건이다.
- 정치권 움직임: 상원의원 Bill Hagerty(공화)·Andy Kim(민주)이 NDAA에 증류 캠페인 연루 중국 기업 제재 조항을 부착하기로 합의했고, Anthropic은 6/10 상원 은행위(Tim Scott/Elizabeth Warren)에 수출통제 강화·증류의 지재권 침해 규정 입법을 요청하는 서한을 보냈다.
- 위선 논란: 일부 논평은 Anthropic이 오픈 인터넷 데이터로 모델을 학습했고 저작권 침해로 저자·출판사에 15억 달러 합의금을 낸 전례를 들어 "도둑이 도둑이야" 식 위선이라고 비판했다(Yahoo Finance·Cybernews).

---
*출처: [Financial Times (X)](https://x.com/FT/status/2072901316104380676) · [Investing.com](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998) · [Seeking Alpha](https://seekingalpha.com/news/4609813-anthropic-cracks-down-on-chinese-workaround-access-to-claude-ft-reports) · [Anthropic — 증류 공격 탐지·방지](https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks) · [CyberSecurityNews (은닉 코드)](https://cybersecuritynews.com/anthropic-claude-hidden-code/) · [위키트리](https://www.wikitree.co.kr/articles/1144679)*
