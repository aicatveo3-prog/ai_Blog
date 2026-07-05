# 💬 반응 모음 — Anthropic, 중국 기업의 Claude 우회 접근 차단 (2026-07-02)

> 이 글은 이 소식에 대한 **실제 반응**(커뮤니티·전문가·언론)을 모은 것입니다.
> 각 항목에는 출처 링크가 달려 있어 원문을 직접 확인할 수 있습니다.
> *참고: 이 사안과 밀접히 얽힌 별개 사건 — 6/30 Reddit에서 공개된 Claude Code의 중국 시간대/프록시 탐지 은닉 코드 논란 — 은 접근 차단 정책과는 별개 타임라인이라 항목별로 구분해 표시했습니다.*

## 💬 커뮤니티 반응 (찬반 논쟁)
- [r/ClaudeAI (Reddit)](https://cybersecuritynews.com/anthropic-claude-hidden-code/) 이용자 LegitMichel777이 6/30 Claude Code 리버스엔지니어링 중 발견한 은닉 탐지 코드를 공개 — "동의 없이 시스템 시간대·프록시를 검사해 중국 사용자를 색출하는 건 신뢰 위반"이라는 비판이 확산. (스레드 원문은 2차 요약 기반 확인, 사용자명은 매체가 실명 공개한 경우만 표기)
- [TheHackerNews](https://thehackernews.com/2026/02/anthropic-says-chinese-ai-firms-used-16.html)(2월 관련 보도): 이전에도 "중국 AI 기업이 1600만 건의 Claude 쿼리로 모델을 복제했다"는 폭로가 있었고, 이번 FT 보도로 그 규모(2880만 건, 2.5만 계정)가 훨씬 컸다는 게 재확인되며 커뮤니티 냉소가 반복.

## 🎓 전문가·연구자 반응
- [Anthropic 공식](https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks): 자사 블로그에서 증류(distillation) 공격 탐지·방지 방법론을 설명 — Alibaba(Qwen) 계열이 "역사상 최대 규모"의 증류 캠페인을 벌였다고 명시.
- Anthropic 기술 담당자 Thariq Shihipar([cybersecuritynews.com](https://cybersecuritynews.com/anthropic-claude-hidden-code/) 인용): 은닉 탐지 코드에 대해 "3월에 시작한 실험으로, 무단 재판매자의 계정 남용과 증류를 막기 위한 것"이라며 "완전히 롤백될 것"이라고 해명.

## 📰 언론·논평
- [Financial Times](https://x.com/FT/status/2072901316104380676) (원문 유료, X 게시로 헤드라인 확인): "Anthropic moves to close loopholes that allow Chinese access to Claude."
- [Seeking Alpha](https://seekingalpha.com/news/4609813-anthropic-cracks-down-on-chinese-workaround-access-to-claude-ft-reports) · [Investing.com](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998): FT 보도를 인용해 Ant Financial·ByteDance의 구체적 우회 수법(싱가포르 법인 계정, VPN 대납)을 정리.
- [Il Sole 24 ORE](https://en.ilsole24ore.com/art/anthropic-patches-vulnerabilities-blocks-chinese-users-AI9ZpszD): 이탈리아 경제지 시각에서 "베이징을 막기 위한 취약점 패치"로 프레이밍.

---

# 🌐 다각도 확장 반응
