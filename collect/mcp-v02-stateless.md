# AI 표준인 MCP가 더 강해진다? 무상태 구조로

> **첫 등장일** 2026-07-20 (✅ 검증 · [AAIF](https://aaif.io))
> **분류** 에이전트인프라 · MCP / 기술표준
> *어려운 개념을 비유로 풀어 설명합니다. 맨 아래 [용어 사전]도 참고하세요.*

---

## 한마디로 요약

[Claude나 ChatGPT 같은 AI가 파일, 데이터베이스, 웹 서비스 등 외부 도구를 안전하게 쓸 수 있게 해주는 표준 규칙(MCP)이](https://aaif.io/blog/mcp-is-growing-up/) [업그레이드 버전을 내놓습니다](https://aaif.io/blog/mcp-is-growing-up/). 이번 업그레이드의 핵심은 "메모리를 안 쓴다"는 것 — 기억을 지우고 매번 처음부터 시작하는 방식으로 바뀐다는 뜻입니다.

> **핵심**: "기억하지 마, 매번 필요한 정보를 받아라"

---

## 지금까지는 어땠나요?

[기존 MCP v0.1에서는 이런 식으로 작동했습니다](https://aaif.io/blog/mcp-is-growing-up/):

Claude와 당신의 파일 시스템이 대화를 시작하면:
1. [Claude: "안녕, 나는 너한테 파일 읽기 권한이 필요해"](https://aaif.io/blog/mcp-is-growing-up/)
2. [파일 시스템: "알겠어. 너는 앞으로 A, B, C 폴더에만 접근 가능"](https://aaif.io/blog/mcp-is-growing-up/)
3. [서버가 이 정보를 "세션" 메모리에 저장](https://aaif.io/blog/mcp-is-growing-up/)
4. [이후 Claude가 요청하면 서버는 "아, 저 친구는 A, B, C만 가능해"라고 바로 기억](https://aaif.io/blog/mcp-is-growing-up/)

문제는, [서버가 매번 "누가 왔었나?"를 기억해야 해서 메모리를 많이 씀](https://aaif.io/blog/mcp-is-growing-up/).

---

## v0.2에서 뭐가 바뀌나요?

이번엔 "기억하지 말고 매번 증명하기"로 바뀝니다:

[새로운 MCP v0.2](https://aaif.io/blog/mcp-is-growing-up/):
1. [Claude: "안녕, 나는 파일 읽기를 하고 싶은데... 이게 내 인증 토큰이야"](https://aaif.io/blog/mcp-is-growing-up/)
2. [파일 시스템: "토큰 확인해봤어. 맞네, 너는 A, B, C 폴더 접근 가능"](https://aaif.io/blog/mcp-is-growing-up/)
3. [서버는 토큰만 검증하고 기억하지 않음](https://aaif.io/blog/mcp-is-growing-up/)
4. [매번 Claude가 요청할 때마다 토큰 재검증](https://aaif.io/blog/mcp-is-growing-up/)

마치, 카페에서 "난 정회원이야" 카드를 매번 보여줘야 하는 것처럼요.

---

## 왜 이렇게 바꾸나요?

[여러 이유가 있습니다](https://aaif.io/blog/mcp-is-growing-up/):

**1. 메모리 절약**: [세션마다 메모리를 쓰지 않으니까 서버가 가벼워짐](https://aaif.io/blog/mcp-is-growing-up/)

**2. 확장 용이**: [기존에는 "같은 서버에서만 기억할 수 있음"이었는데](https://aaif.io/blog/mcp-is-growing-up/), [v0.2에서는 여러 서버에 분산 가능](https://aaif.io/blog/mcp-is-growing-up/) → [트래픽이 늘어나면 서버만 추가하면 됨](https://aaif.io/blog/mcp-is-growing-up/)

**3. 보안 강화**: [매번 인증 토큰 검증하니까 도용이나 해킹이 어려워짐](https://aaif.io/blog/mcp-is-growing-up/)

**4. 이동성**: ["이전에 이 클라이언트를 본 적 있나?" 신경 쓸 필요 없음](https://aaif.io/blog/mcp-is-growing-up/) → [다른 서버로 옮겨도 작동](https://aaif.io/blog/mcp-is-growing-up/)

---

## 지금 MCP를 쓰는 사람은 괜찮나요?

[v0.2는 "breaking change"라고 하는데](https://aaif.io/blog/mcp-is-growing-up/), [쉽게 말해 "기존 코드가 안 먹힌다"는 뜻](https://aaif.io/blog/mcp-is-growing-up/)입니다.

예를 들어:
- [Claude를 쓰고 있는 기업의 MCP 서버들](https://aaif.io/blog/mcp-is-growing-up/): 코드 수정 필요
- [GPT와 연동하는 MCP 도구들](https://aaif.io/blog/mcp-is-growing-up/): 업데이트 필요
- [자체 MCP 서버를 만든 회사들](https://aaif.io/blog/mcp-is-growing-up/): 리팩토링 필요

다만 [Anthropic이나 OpenAI 등에서 마이그레이션 가이드를 제공할 예정](https://aaif.io/blog/mcp-is-growing-up/)이니 너무 걱정 안 해도 됩니다.

---

## 이게 우리한테 어떤 의미인가?

1. **AI 서비스가 더 안정적이 될 수 있습니다**: [무상태 구조 덕에 AI 회사들이 더 많은 사용자를 동시에 처리 가능](https://aaif.io/blog/mcp-is-growing-up/)

2. **AI 도구 연동이 더 쉬워집니다**: [개발자 입장에서 "기억하지 말고 매번 인증하기"는 더 단순한 로직](https://aaif.io/blog/mcp-is-growing-up/) → [더 많은 회사가 AI 도구를 만들 가능성](https://aaif.io/blog/mcp-is-growing-up/)

3. **AI 보안이 강화됩니다**: [매번 인증하는 구조 덕에 무단 접근 위험이 줄어듦](https://aaif.io/blog/mcp-is-growing-up/)

---

## 용어 사전

| 용어 | 뜻 |
|---|---|
| **MCP (Model Context Protocol)** | AI가 외부 도구(파일, DB, 웹사이트 등)를 안전하게 사용하기 위한 표준 규칙 |
| **무상태 (Stateless)** | 서버가 클라이언트의 정보를 기억하지 않는 구조. 매번 처음부터 시작하는 방식 |
| **세션** | 사용자가 서버에 접속한 후 나갈 때까지의 한 번의 대화 기간 |
| **인증 토큰** | "난 누구다"를 증명하는 디지털 신분증 같은 것. 매번 요청할 때 제시 |
| **OAuth 2.1** | 인터넷 서비스들이 사용하는 표준 인증 방식 (예: "Google로 로그인") |
| **Breaking change** | 기존 코드가 작동 안 하는 업데이트. "호환성 깨짐"이라고도 함 |

---

# 출처

- [AAIF · MCP v0.2 성장기로 진입](https://aaif.io/blog/mcp-is-growing-up/)
  https://aaif.io/blog/mcp-is-growing-up/
