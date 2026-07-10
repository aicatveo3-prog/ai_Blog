# MCP 릴리스 후보 v0.2 (Stateless)

> **첫 등장일** 2026-07-20 (✅ 검증 · [AAIF](https://aaif.io))
> **분류** 에이전트인프라 · MCP / 기술표준
> *발표 내용을 있는 그대로 정리한 것입니다.*

## 핵심
- [MCP(Model Context Protocol) v0.2 릴리스 후보(RC) 공개](https://aaif.io/blog/mcp-is-growing-up/)
- [상태 보관(session state) 제거 → 완전 무상태(stateless) 아키텍처 전환](https://aaif.io/blog/mcp-is-growing-up/)
- [각 요청이 독립적으로 처리되어 확장성 개선](https://aaif.io/blog/mcp-is-growing-up/)
- [최종 명세(stable release) 2026-07-28 발표 예정](https://aaif.io/blog/mcp-is-growing-up/)
- [OAuth 2.1 및 OIDC 정합성 강화로 인증 보안 강화](https://aaif.io/blog/mcp-is-growing-up/)

## 세부
### 주요 변경 사항
**상태 제거(Stateless)**: [기존 v0.1에서는 세션 동안 서버가 클라이언트 정보를 메모리에 저장](https://aaif.io/blog/mcp-is-growing-up/) → [v0.2에서는 각 요청마다 필요한 모든 정보를 클라이언트가 전달](https://aaif.io/blog/mcp-is-growing-up/)

**확장성 개선**: [서버가 클라이언트 상태를 관리할 필요 없어 수평 확장 용이](https://aaif.io/blog/mcp-is-growing-up/) → [로드 밸런싱 및 멀티 서버 배치 간단해짐](https://aaif.io/blog/mcp-is-growing-up/)

### 보안 강화
[OAuth 2.1로 업그레이드](https://aaif.io/blog/mcp-is-growing-up/), [OIDC(OpenID Connect) 표준 준수](https://aaif.io/blog/mcp-is-growing-up/) → [인증 토큰 발급·검증 프로세스 표준화](https://aaif.io/blog/mcp-is-growing-up/)

### 마이그레이션 영향
[v0.1을 사용 중인 서버/클라이언트는 코드 수정 필요](https://aaif.io/blog/mcp-is-growing-up/) (breaking change). [마이그레이션 가이드 2026-07-28 제공 예정](https://aaif.io/blog/mcp-is-growing-up/).

## 시점 맥락
[MCP 표준 공개(2024년) 이후 1년 반 동안 다양한 LLM(Claude, GPT 등) 클라이언트와 도구 서버들이 구현](https://aaif.io/blog/mcp-is-growing-up/). [사용 사례 증가에 따른 아키텍처 재설계](https://aaif.io/blog/mcp-is-growing-up/).

---
# 출처
- [AAIF · MCP v0.2 성장기로 진입](https://aaif.io/blog/mcp-is-growing-up/)
  https://aaif.io/blog/mcp-is-growing-up/
