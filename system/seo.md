# SEO 설계 — 정적 프리렌더 방식

> Vector 블로그의 검색 최적화 구조. GitHub Pages(정적 호스팅)에 맞춰,
> **발행 시 정적 HTML을 굽는 빌드**(`build-seo.mjs`)로 SEO를 확보한다.
> 원칙: 검색엔진·카카오톡·네이버가 **JS 없이** 본문과 미리보기를 바로 읽게 한다.

---

## 왜 이 방식인가

기존 대시보드/SPA는 JS로 본문을 그려서, JS를 안 돌리는 크롤러(네이버 Yeti)·카카오톡 공유엔
**빈 페이지**로 보였다. 그래서 발행 글은 **정적 HTML로 미리 구워** 본문·메타를 파일에 박아둔다.

## 무엇이 생성되나 (`node build-seo.mjs`)

| 산출물 | 내용 |
|---|---|
| `p/<slug>/index.html` | 글별 정적 페이지. 본문 프리렌더 + `<title>`·description·canonical·robots·OG·트위터카드·JSON-LD(BlogPosting+BreadcrumbList) |
| `p/<slug>/og.png` | 글별 OG 이미지 1200×630 (제목·카테고리·브랜드) |
| `index.html` | 홈. **진짜 `<a href="p/<slug>/">` 링크**가 있는 정적 목록(피처드+그리드) + Blog JSON-LD |
| `assets/blog.css` | 공유 스타일(홈·글 공통) |
| `assets/og-default.png` | 홈/기본 OG 이미지 |
| `sitemap.xml` | 홈 + 전 글 URL(loc·lastmod·priority) |
| `robots.txt` | 크롤 허용 + 사이트맵 링크 |
| `feed.xml` | RSS 2.0 피드(구독·발견성) |

데이터 원천은 `posts.json`의 `stage:"발행"` 항목. 본문은 각 글의 `versions[0].path`(예: `drafts/<slug>/v1.md`).

## posts.json에 필요한 필드 (발행 글)

```json
{ "id":"<slug>", "title":"...", "date":"YYYY-MM-DD", "type":"B 심층 분석",
  "category":"최신 AI 소식", "stage":"발행", "readMin":14, "author":"Vector",
  "angle":"메타 description으로 쓰임(155자 이내 권장)",
  "versions":[{ "v":"v1","date":"YYYY-MM-DD","note":"...","path":"drafts/<slug>/v1.md" }] }
```
- `category`: **"최신 AI 소식"** 단일 (인사이트/리서치/튜토리얼 폐지). 홈 내비 메뉴 + OG 라벨.
- `angle`: **메타 설명**이 되므로 한 문장으로 핵심을 담는다.
- `readMin`: 없으면 홈 카드에 '분 읽기' 생략.

## 발행할 때마다 (반드시)

1. `posts.json`에 발행 항목 추가/갱신.
2. `node build-seo.mjs` 실행.
3. 생성물 전체 커밋·푸시.
   → 안 돌리면 새 글이 검색·공유에 안 잡힌다.

## 커버된 SEO 항목 (P0+P1)

- ✅ 글별 정적 본문(색인 가능) · 글별 고유 URL · 고유 title/description/canonical
- ✅ Open Graph + 트위터 카드 + 글별 OG 이미지(PNG)
- ✅ JSON-LD BlogPosting + BreadcrumbList, 홈 Blog 스키마
- ✅ sitemap.xml · robots.txt · feed.xml(RSS)
- ✅ 홈→글 진짜 링크(크롤러 추적) · `lang=ko` · 시맨틱(article/nav/time)

## 남은 것 (P2 — 필요 시)

- **검색엔진 등록**: [Google Search Console](https://search.google.com/search-console)·
  [네이버 서치어드바이저](https://searchadvisor.naver.com)·[Bing Webmaster]에
  사이트 등록 후 `sitemap.xml` 제출. (가장 큰 노출 레버)
- **robots.txt 위치 한계**: 프로젝트 페이지는 `/ai_Blog/robots.txt`로 서빙돼
  루트(`/robots.txt`) 표준 위치가 아니다. **커스텀 도메인**(CNAME)을 붙이면
  루트 robots.txt·짧은 URL로 해결된다. 그전엔 사이트맵을 콘솔에 직접 제출.
- 관련 글 내부 링크, 이미지 alt, 작성자 프로필(Person 스키마), 발행/수정일 노출.

## 변경 로그
- v1 (2026-07-07): 정적 프리렌더 빌드(build-seo.mjs) 도입. P0+P1 SEO 확보.
