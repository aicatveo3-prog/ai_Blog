# 조사 노트: MCP, 1년 만에 표준이 되다

- 소스 티어: 1차(LangChain/Microsoft 문서) + 2차(GetKnit, 업계 정리)
- 조사 날짜: 2026-07-04 / 글 유형: B 심층(짧게) / 렌즈 ① + 타임라인 포지셔닝
- 👉 출처는 맨 아래

## A. 확인된 팩트
- F1. **MCP(Model Context Protocol)가 1년 남짓 만에 사실상 산업 표준.** 모든 major Python 에이전트 프레임워크가 MCP를 네이티브 지원. [출처 1,2]
- F2. **Microsoft Agent Framework**: 코어에 네이티브 MCP, **Python·.NET 1.0 동시 출시 2026-04-03**. [출처 3]
- F3. LangChain: 공식 `langchain-mcp-adapters`가 MCP 도구를 LangChain/LangGraph 호환 도구로 변환. [출처 1,2]
- F4. 새 프로토콜 기능(streamable HTTP 전송, OAuth, structured tool outputs)이 **Anthropic MCP SDK에 먼저** 들어가고 → 래핑 프레임워크로 전파. [출처 2]
- F5. 핵심 명제: **"Build once, use everywhere"** — MCP 서버 하나가 프로토콜을 말하는 모든 프레임워크와 작동. [출처 2]

## B. 주장·해석
- "도구의 USB-C 순간"이라는 비유는 필자 해석 (검증 불필요, 관점).

## F. 관점
- (채택) 작년까진 프레임워크마다 도구를 새로 붙였는데, 이제 MCP 하나로 어디서든. **지금 MCP 지원 도구를 고르면 나중에 안 갈아엎는다.**

## G. 미해결 질문
- "표준"이라지만 각 벤더의 확장으로 파편화될 위험은? (반대 가설로 글에 반영)

## 출처 링크 (클릭)
- [LangChain — AI agent frameworks 2026](https://www.langchain.com/resources/ai-agent-frameworks) — F1, F3
- [GetKnit — MCP vs LangChain Tools (2026)](https://www.getknit.dev/blog/integrating-mcp-with-popular-frameworks-langchain-openagents) — F1, F4, F5
- [LangChain Docs — MCP](https://docs.langchain.com/oss/python/langchain/mcp) — F3
- [Deepak Gupta — Top MCP frameworks 2026](https://guptadeepak.com/tools/top-10-mcp-frameworks-2026/) — F2

> ⚠️ 발행 전: Microsoft Agent Framework 1.0 날짜(4/3)와 "모든 major 프레임워크" 범위를 1차 문서로 재확인.
