# "싱가포르 사람인 척, VPN으로 몰래" — Anthropic이 막으려는 중국의 Claude 뒷문

> **첫 등장일** 2026-07-02 (✅ 검증 · Financial Times·Investing.com·Seeking Alpha)
> **분류** 논란·정책 · Anthropic
> *어려운 개념을 비유로 풀어 설명합니다. 맨 아래 [용어 사전]도 참고하세요.*

---

## 한마디로 요약
Anthropic이 만든 AI Claude는 규정상 중국 기업이 정식으로 쓰기 어렵습니다. 그런데 일부 중국 기업이 "[싱가포르 회사인 척" 계정을 만들거나, 직원이 VPN으로 우회해 쓰는 식으로 뒷문을 이용해 왔다고 FT가 7월 2일 보도했고](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998), [Anthropic이 그 뒷문을 막기 시작했습니다](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998).

> 여기엔 사실 **서로 다른 두 사건**이 얽혀 있습니다. 이 글은 그 둘을 헷갈리지 않게 나눠서 설명합니다.
> - **사건 ①** (7/2): [중국 기업이 우회로 Claude를 쓰고, 그 답변을 베껴 자기 AI를 학습시켰다는 "증류" 문제 → Anthropic이 차단](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998).
> - **사건 ②** (6/30): [Claude Code 안에 "중국 사용자를 몰래 찾아내는 숨은 코드"가 있었다는 프라이버시 논란](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998).

## 우선, 왜 중국 기업이 "우회"까지 하나요? (사건 ①)
Claude 같은 미국 최고급 AI는 여러 규제와 회사 정책 때문에 중국 기업이 대놓고 계약해 쓰기 어렵습니다. 마치 특정 손님에게는 물건을 팔지 않기로 한 가게 같은 상황입니다.

그러자 일부 기업이 **뒷문**을 찾았다는 게 [FT 보도의 핵심](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998)입니다.
- **[Ant Financial](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998)**: 싱가포르에 세운 법인 이름으로 계정을 만들어, "우리는 중국이 아니라 싱가포르 회사예요" 하고 들어왔다는 것.
- **[ByteDance](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998)**: 직원이 개인적으로 VPN을 걸어 접속하고, 그 구독료를 회사가 대신 내주는 방식이었다는 것.

가게 입장에서 보면, 팔지 않기로 한 손님이 **다른 사람 이름표를 달고** 다시 온 셈입니다. [Anthropic은 이런 뒷문을 하나씩 막겠다고 나선 겁니다](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998).

## '증류'가 뭐길래 문제인가요? (사건 ①)
여기서 핵심 단어가 [**증류(distillation)**](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998) 입니다. 어렵게 들리지만 비유는 간단합니다.

> 아주 똑똑한 **선생님(Claude)** 에게 수천만 번 질문을 던지고, 그 **모범답안을 전부 받아 적어서**, 그 답안 모음으로 **내 학생 AI를 가르치는** 겁니다.

이렇게 하면 선생님을 직접 데려오지 않고도, 선생님의 실력을 상당 부분 **베껴** 자기 AI에 옮겨 담을 수 있습니다. [Anthropic은 이런 식으로 누군가 Claude를 대량으로 "받아 적었다"고 봅니다](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998).

[Anthropic 발표에 따르면, 4~6월에 **약 2.5만 개의 부정 계정**이 **약 2880만 번**을 주고받으며 이런 증류를 시도한 정황을 탐지했다고 합니다](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998)(이 수치는 Anthropic이 자체적으로 집계해 밝힌 것입니다). [Anthropic은 특히 Alibaba의 Qwen 계열이 "역사상 최대 규모"의 증류를 벌였다고 지목했습니다](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998).

반대로 [Alibaba는 "우리는 남의 AI 답변을 학습에 쓰지 않았고 법도 지켰다"며 부인했습니다](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998). 오히려 [7월 3일에는 사내에 **"Claude 쓰지 말라"** 는 지시(7/10부터)를 내리고 자체 도구로 갈아타라고 했습니다](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998). 누가 맞는지는 아직 한쪽으로 정해지지 않았습니다.

## 그럼 '트랜스퍼 스테이션'은 뭔가요?
우회 접근에는 **중계소** 역할을 하는 서비스가 등장합니다. 이걸 '트랜스퍼 스테이션(transfer station)'이라고 부릅니다.

> 쉽게 말해 **대리 구매 창구**입니다. 내가 직접 못 사는 물건을, 살 수 있는 누군가가 대신 사서 넘겨주는 가게 같은 것이죠.

국내 개발자 커뮤니티(GeekNews)에서는 "Claude 90% 할인의 정체가 알고 보니 데이터가 새 나가는 통로였다"는 이야기가 돌았습니다. 값싸게 Claude를 쓰게 해준다면서, 실제로는 그 이용 기록이 다른 곳으로 흘러가는 구조일 수 있다는 겁니다. TRON 창립자 Justin Sun이 만든 'B.AI'(암호화폐로 결제하는 AI 중계 서비스)가 대표 사례로 거론됐지만, **Anthropic이 B.AI를 공식적으로 지목했다는 근거는 없습니다.**

## 두 번째 사건 — Claude Code 속 '숨은 감시 코드' (사건 ②)
이건 위 이야기와 **날짜도 성격도 다른 별개 사건**입니다.

[6월 30일, 한 개발자(Reddit 아이디 LegitMichel777)가 Anthropic의 코딩 도구 **Claude Code**를 뜯어보다가 이상한 걸 발견했다고 공개했습니다](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998). [프로그램이 **몰래** 사용자의 **시간대(시계)와 프록시**를 확인해서 "이 사람이 중국에서 쓰는 것 같다"를 판별하고, 그 신호를 **눈에 안 보이는 글자(스테가노그래피)** 에 숨겨 내보내고 있었다는 겁니다](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998).

> 비유하자면, 학원이 수강생 몰래 **가방에 위치 추적기**를 넣어두고 "이 학생이 어디 사람인지" 표시를 남겨온 셈입니다.

[Anthropic 기술 담당자 Thariq Shihipar는 이에 대해 "3월에 시작한 실험이고, **무단 재판매·증류를 막으려던 것**이며, **완전히 되돌리겠다**"고 해명했습니다](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998). [실제로 이 기능은 이후 철회됐습니다](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998).

문제는, **의도가 무엇이든 사용자에게 알리지 않고** 국적을 근거로 시스템 정보를 몰래 검사·전송했다는 점입니다. 그래서 "그냥 도둑질 막는 정당한 방어다"라는 편과 "이건 스파이웨어에 가깝다"는 편으로 개발자 사회의 의견이 갈렸습니다.

## 그런데 이 논란엔 '위선' 이야기도 붙어요
한쪽에서는 이런 반박도 나옵니다.

> "[Anthropic도 결국 **오픈 인터넷의 남의 글**을 잔뜩 긁어다 AI를 가르쳤잖아](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998). 심지어 저작권 문제로 저자·출판사에 **15억 달러 합의금**까지 냈고. 그래놓고 남이 자기 AI에서 배우면 '[증류 공격](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998)'이라 부르는 건 **도둑이 도둑이야 외치는 격** 아니냐."

반대편은 "약관과 안보 규범을 조직적으로 우회한 것과, 공개된 데이터를 학습한 건 다르다"고 봅니다. 이 대목 역시 **사람마다 다르게 봅니다.**

## 이게 우리한테 어떤 의미인가?
- **AI가 '전략 자산'이 됐습니다.** 어느 나라 사람이 어떤 AI를 쓸 수 있느냐가 국가 안보·수출통제 문제로 번지고 있습니다. 미국 의회에서는 관련 중국 기업 제재 조항까지 논의 중입니다.
- **내가 쓰는 개발 도구가 나를 관찰할 수 있습니다.** 사건 ②는 "편리한 도구 속에 사용자도 모르는 판별·전송 로직이 숨어 있을 수 있다"는 걸 보여줬습니다. 의도가 방어였더라도, 투명성 없는 감시는 신뢰를 무너뜨린다는 점이 드러났습니다.
- **어느 한쪽이 완전히 옳다고 정해지지 않았습니다.** "안보·지재권을 지키려는 정당한 조치"라는 시각과 "위선적이고 과도한 감시"라는 시각이 팽팽합니다.

## 용어 사전
| 용어 | 뜻 |
|---|---|
| Claude / Claude Code | Anthropic이 만든 AI(Claude)와, 그 AI를 코딩에 쓰도록 만든 개발자 도구(Claude Code). |
| 증류 (distillation) | 강한 AI에게 대량으로 질문해 그 답변을 모아, 그 답변으로 다른(작은) AI를 학습시켜 실력을 베끼는 기법. |
| 트랜스퍼 스테이션 (transfer station) | 직접 못 쓰는 사람을 대신해 AI에 접속·중계해 주는 '대리 구매 창구' 같은 서비스. |
| VPN | 인터넷 접속 위치를 다른 나라인 것처럼 바꿔 주는 우회 접속 기술. |
| 프록시 (proxy) | 나 대신 인터넷 요청을 중계해 주는 중간 서버. 접속 위치나 신원을 가리는 데 쓰이기도 함. |
| 스테가노그래피 (steganography) | 정보를 눈에 잘 안 띄는 곳(예: 특수 문자)에 숨겨 몰래 실어 보내는 기술. |
| 수출통제 | 특정 국가·기업에 첨단 기술·제품 판매를 정부가 제한하는 정책. |

---
*출처: [Financial Times (X)](https://x.com/FT/status/2072901316104380676) · [Investing.com](https://www.investing.com/news/stock-market-news/anthropic-targets-loopholes-used-by-chinese-firms-to-access-claude-ft-reports-4774998) · [Anthropic — 증류 공격 탐지·방지](https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks) · [CyberSecurityNews (은닉 코드)](https://cybersecuritynews.com/anthropic-claude-hidden-code/) · [Yahoo Finance (위선 비판)](https://finance.yahoo.com/news/critics-mock-anthropics-claims-chinese-224040472.html) · [위키트리](https://www.wikitree.co.kr/articles/1144679)*
