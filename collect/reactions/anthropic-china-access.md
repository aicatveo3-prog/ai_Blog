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
> 한국 국내 · 정치권/국가별 · 경쟁사/CEO · 당사자/시민/윤리 · 날것의 소셜 시선을 추가로 모았습니다.

## 🇰🇷 한국 국내 반응
- [위키트리](https://www.wikitree.co.kr/articles/1144679): Ant Financial(싱가포르 법인 계정)·ByteDance(VPN 개인구독 환급) 우회 정황과 탐지 강화 조치를 스트레이트로 전달.
- [위키트리 - 클로드 코드 은닉 추적 코드](https://www.wikitree.co.kr/articles/1144239): 4월부터 시간대·프록시로 중국 이용자를 식별해 스테가노그래피 방식으로 신호를 보내온 사실을 상세 보도.
- [AI타임스](https://www.aitimes.com/news/articleView.html?idxno=212357): "클로드 코드 중국 사용자 비밀 추적 논란…결국 기능 철회"(403으로 직접 열람 실패, 2차 요약 기반).
- [데일리시큐](https://www.dailysecu.com/news/articleView.html?idxno=207434): 보안매체 관점에서 시간대·프록시 식별 로직, 유니코드 은닉 방식을 기술적으로 설명. "무단 재판매·증류 방지 목적"이라는 Anthropic 해명 전달.
- [디지털포커스](https://www.digitalfocus.news/news/articleView.html?idxno=21967): 알리바바의 클로드 코드 사내 사용 금지를 "백도어 의혹" 프레임으로 보도.
- [뉴스핌](https://www.newspim.com/news/view/20260703000623): "中 앤트, 클로드 몰래 쓰다 딱 걸렸다...앤스로픽 '우회접속 철벽차단'"(403으로 본문 미확인).
- [SBS](https://news.sbs.co.kr/news/endPage.do?news_id=N1008640867): 지상파 뉴스에서도 다룰 만큼 화제성 있는 소식(본문 미확인).
- [GeekNews(news.hada.io)](https://news.hada.io/topic?id=29461): "클로드 90% 할인의 정체, 알고 보니 데이터 탈취 통로" — 국내 개발자 커뮤니티가 '트랜스퍼 스테이션' 현상을 다룬 사실상 유일한 스레드(403으로 댓글 미확인, 제목·주제만 확인).
- *갭*: 클리앙·아카라이브·에펨코리아·디시 클로드 갤러리에서 이번 7/2 FT 보도(우회접근·2.5만 계정 증류) 자체를 정면으로 다룬 게시물은 확인되지 않음. 국내 담론은 ①미 수출통제발 "AI 주권" 논쟁, ②클로드 코드 백도어 논란(국내 개발자 다수가 실사용자라 민감도 높음)에 집중.

## 🏛️ 정치권·국가별 시선
- [Eastern Herald](https://easternherald.com/2026/06/27/anthropic-alibaba-claude-distillation-senate-sanctions/): 상원의원 Bill Hagerty(공화)·Andy Kim(민주)이 NDAA에 증류 캠페인 연루 중국기업 제재 조항 부착 합의, 하원도 초당적 버전 추진.
- Anthropic이 상원 은행위(Tim Scott/Elizabeth Warren)에 보낸 6/10 서한([TechTimes](https://www.techtimes.com/articles/319105/20260625/alibaba-ran-largest-known-ai-theft-campaign-against-claude-anthropic-tells-senate.htm) 인용): 수출통제 강화, 증류를 지재권 침해로 규정하는 입법 요청.
- [Global Times](https://www.globaltimes.cn/page/202606/1364418.shtml): 전 센스타임 연구원 톈펑이 "기술 패권 불안에서 비롯된 주장"이자 "사다리 걷어차기 전술"이라 비판. 중국 정부도 "근거 없는 비방"이라는 취지.
- [Al Jazeera](https://www.aljazeera.com/news/2026/6/19/us-export-ban-on-anthropics-ai-models-further-strains-alliances) / [VoIP Review](https://voip.review/2026/07/02/austria-urges-eu-court-anthropic-ai-sovereignty/): 핀란드 유럽의회 의원 Aura Salla "외국 정부가 하룻밤 새 끌 수 있는 접근에 의존할 수 없다", 프랑스 Attal "호르무즈 해협 봉쇄"에 비유. ※ 엄밀히는 6월 중순 별도 수출통제 건에 대한 반응이나 동일한 "접근 통제 리스크" 우려를 공유.
- *갭*: 이번 7/2 우회접근 건에 대한 중국 외교부의 별도 신규 논평, 영국·한국 정부·국회의 공식 반응은 확인되지 않음(인접 사건 반응만 준용 가능).

## 🏢 경쟁 기업·CEO 반응
- [신징바오](https://www.bjnews.com.cn/detail/1771931946129432.html): 머스크가 X에서 "MisAnthropic"이라 조롱. ※ 2월 DeepSeek·Moonshot·MiniMax 지목 건에 대한 반응이며 이번 7월 알리바바 건에 대한 별도 발언은 확인되지 않음.
- [CNBC](https://www.cnbc.com/2026/06/24/anthropic-alibaba-distillation-campaign.html): 알리바바는 "독점 모델 산출물을 학습에 쓰지 않으며 지재권법을 준수한다"는 취지로 부인.
- [知乎](https://zhuanlan.zhihu.com/p/2056507708392600235) / [163.com](https://www.163.com/dy/article/L0TVV3NC0511CPVM.html): 알리바바가 7/3 사내 공지로 클로드 전 제품 사용 금지(7/10 발효), 자체 도구 Qoder로 전환 지시 — 증류 고발에 대한 맞대응 성격.
- [Built In](https://builtin.com/articles/openai-google-anthropic-ai-model-theft-china): OpenAI도 2월 DeepSeek 겨냥 유사 증류 의혹 제기, Google은 기업명 특정 없이 "중국 연계 위협 행위자"만 언급. 4월 세 회사가 Frontier Model Forum으로 정보공유 합의.
- [CryptoTimes](https://www.cryptotimes.io/2026/07/03/justin-suns-b-ai-anthropics-china-claude-ban-crypto-loophole/): TRON 창립자 Justin Sun의 B.AI(5월 개설, 크립토 결제 기반 AI 릴레이)가 '트랜스퍼 스테이션' 대표 사례로 주목. 단, Anthropic이 B.AI를 공식 지목·제소한 근거는 없음.

## ⚖️ 당사자·시민·윤리
- [Yahoo Finance](https://finance.yahoo.com/news/critics-mock-anthropics-claims-chinese-224040472.html) / [Cybernews](https://cybernews.com/ai-news/anthropic-ai-china-distillation-attack/): "오픈 인터넷을 긁어 학습시켜 놓고 남이 그렇게 배우면 '증류 공격'이라 부른다"는 위선 비판. Anthropic이 저작권 침해로 저자·출판사에 15억달러 합의금을 낸 전례가 함께 거론.
- [ChinaTalk](https://www.chinatalk.media/p/china-reacts-to-anthropic-dow)(2차 요약, 403으로 직접 열람 불가): 중국 매체 다수가 "도둑이 도둑이야(贼喊捉贼)" 프레임 반복, 36Kr은 이 고발이 국방부 계약분쟁 국면에 맞춰 "중국 위협론"을 활용한 로비 문서라는 해석 제기.
- 중국 개발자 반응([搜狐](https://www.sohu.com/a/1044144864_121118999), [知乎](https://zhuanlan.zhihu.com/p/2055396524956332262)): "이래서 최근 집단으로 계정이 정지됐구나"라는 자기 경험 재해석 확산, "국적 근거로 몰래 시스템 정보를 전송한다면 또 무엇을 하는지 모른다"는 신뢰 훼손 우려가 해외 개발자 쪽에서도 제기.

## 📱 날 것의 소셜 반응 (X·스레드·레딧·디시 등)
- [知乎 "又他妈告中国AI公司"](https://zhuanlan.zhihu.com/p/2053505585916777522)("또 X발 중국 AI회사를 고소하네"): Anthropic의 반복되는 중국기업 고발에 대한 피로·냉소(403으로 본문 미확인, 제목·2차 요약 기반).
- [知乎 "这次是阿里！"](https://zhuanlan.zhihu.com/p/2053571240397385851)("이번엔 알리바바! 중국 대형모델팀들이 죄다 고소당한다"): 유사한 냉소 톤.
- 웨이보 밈(2차 요약, ChinaTalk 인용): "우리는 가끔씩 다 싱가포르인이다" — 트랜스퍼 스테이션이 해외 계정을 경유하는 현실을 풍자(원문 링크 특정 못함, 갭).
- [cybernews](https://cybernews.com/ai-news/claude-code-steganography-china-users/): 클로드 코드 은닉코드 발견 이후 "스파이웨어" 프레임과 "그냥 반증류 기법일 뿐"이라는 반박이 동시 확산, 개발자 사회 내부 의견 분열.
- 중국 커뮤니티([搜狐/163.com 제목](https://www.163.com/dy/article/L0TLCIBF05198CJN.html)): "Claude Code 官方投毒标记中国用户翻车，这次国外用户也怒了"("공식 낙인이 뒤집혔다, 이번엔 해외 사용자도 분노") — 분노가 해외 개발자 커뮤니티로도 번졌다는 프레이밍.

## 🔭 종합 — 반응의 큰 흐름
미국 쪽(Anthropic·의회)은 "중국 기업이 약관·안보 규범을 조직적으로 우회해 미국 AI 자산을 증류·탈취한다"는 안보·지재권 프레임을 강하게 밀고 있고, 중국 관영매체·개발자 사회·중국어권 소셜은 "정작 Anthropic도 저작권 침해로 거액 합의금을 문 회사면서 '도둑이 도둑이야' 외치는 위선"이라는 반박·냉소로 맞선다. 특히 같은 시기 터진 '클로드 코드 중국 사용자 은닉 추적 코드' 사건은 원래 의도(중국 겨냥)를 넘어 전 세계 개발자의 신뢰 문제로 번져 알리바바의 클로드 코드 전면 금지라는 실질적 보복으로 이어졌다. 한국에서는 이 사건 자체보다 "AI가 국적 기반 전략자산이 됐다"는 인접 담론과 백도어 논란에 반응이 집중돼, FT발 우회접근·증류 이슈에 대한 국내 커뮤니티의 직접 반응은 상대적으로 얇다(갭).

## 출처
- [Investing.com · Anthropic, 중국 기업의 Claude 우회 접근 차단](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998)
  https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998
