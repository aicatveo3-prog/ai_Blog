# Vector — AI Blog

AI 소식을 다루는 블로그 사이트 **Vector**입니다. 제품 소식, 릴리스, 리서치, 인사이트, 튜토리얼을 한곳에서 모아 봅니다.

## 구성

- `index.html` — 사이트 전체가 담긴 단일 HTML 파일입니다. 별도 빌드나 서버 없이 브라우저에서 바로 열 수 있습니다.

## 로컬에서 보기

파일을 브라우저로 직접 열거나, 간단한 로컬 서버를 띄워서 확인할 수 있습니다.

```bash
# 파일을 그대로 열기
open index.html          # macOS
xdg-open index.html      # Linux

# 또는 로컬 서버로 실행
python3 -m http.server 8000
# http://localhost:8000 접속
```

## GitHub Pages로 배포하기

1. 저장소 **Settings → Pages** 로 이동합니다.
2. **Build and deployment**의 Source를 `Deploy from a branch`로 설정합니다.
3. 배포할 브랜치와 루트(`/`) 폴더를 선택하고 저장합니다.
4. 잠시 후 `https://<사용자명>.github.io/ai_Blog/` 주소에서 사이트가 열립니다.

---

© 2026 Vector
