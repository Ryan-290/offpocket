# Offpocket - Project Instructions

## Project Overview
MZ세대(20-30대) 대상 서울 핫플 발견 지도 플랫폼. 공연, 팝업스토어, 전시, 맛집, 데이트코스를 지도 위에 보여주고, 공유/북마크/리뷰 기능을 제공.

## Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript strict)
- **Styling**: Tailwind CSS 4 — 모든 스타일링은 Tailwind 유틸리티 클래스로. CSS-in-JS나 별도 CSS 모듈 사용 금지.
- **Database**: Supabase (PostgreSQL) — `@supabase/supabase-js`
- **Map**: Kakao Maps SDK (JavaScript) — CustomOverlay 기반 커스텀 마커
- **Deploy**: Vercel
- **Package Manager**: pnpm

## Architecture

### Route Structure
| Route | Purpose |
|-------|---------|
| `/` | 지도 메인 (MapPage) |
| `/about` | 브랜드 소개 랜딩 |
| `/place/[id]` | 장소 상세 |
| `/login` | OAuth 로그인 |
| `/mypage` | 프로필/북마크/리뷰 (TODO) |
| `/api/places` | 장소 조회 API (TODO) |
| `/api/crawl/[source]` | 크롤링 엔드포인트 (TODO) |

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
├── component/
│   ├── map/                # 지도 관련 (MapPage, MapViewer, BottomSheet, CategoryChips...)
│   ├── card/               # 카드 컴포넌트 (cardWeb, cardMobile, ImageCarousel)
│   ├── common/             # 공통 (header, footer, MenuButton)
│   ├── home/               # About 페이지용 (features, pageIntro)
│   └── offpick/            # Legacy (mapContent, mapViewer) — 새 map/ 으로 대체됨
├── lib/
│   ├── supabase/           # Supabase 클라이언트 (client.tsx, server.tsx)
│   └── crawl/              # 크롤링 유틸 (TODO)
└── type/                   # TypeScript 타입 정의
```

### Key Components
- `MapPage` (`component/map/MapPage.tsx`): 메인 통합 컴포넌트. 데스크톱(사이드바+지도) + 모바일(풀맵+바텀시트)
- `MapViewer` (`component/map/MapViewer.tsx`): 카카오맵 래퍼. 커스텀 마커, 클러스터, 뷰포트 필터링
- `BottomSheet` (`component/map/BottomSheet.tsx`): 모바일 드래그 바텀시트 (collapsed/half/expanded)
- `CategoryChips` (`component/map/CategoryChips.tsx`): 카테고리 필터. CATEGORIES 상수가 여기 정의됨

### Database
- **전체 스키마**: `docs/database-schema.md` 참조 (SQL DDL + 마이그레이션 + ER diagram)
- **현재 테이블**: `offpick_contents` — 수동 등록 콘텐츠
- **Phase 2 테이블**: `places` (offpick_contents 대체), `categories`, `crawl_logs`
- **Phase 3 테이블**: `users`, `bookmarks`, `collections`, `reviews`
- **Supabase Storage**: `offpick-images` 버킷 (이미지)
- **Base URL**: `https://pzwfxlohnoiemrlczoyt.supabase.co`
- **환경변수**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Categories
| ID | Label | Color | Icon |
|----|-------|-------|------|
| performance | 공연 | #FF6B6B | 🎵 |
| popup | 팝업 | #4ECDC4 | 🛍️ |
| exhibition | 전시 | #9B59B6 | 🖼️ |
| restaurant | 맛집 | #F39C12 | 🍴 |
| date_course | 데이트 | #E91E63 | 💕 |

## Development Rules

### Styling
- **Tailwind CSS only**. 인라인 style은 동적 값(마커 색상 등)에만 사용
- 반응형: `md:` 브레이크포인트 기준으로 모바일/데스크톱 분리
- 색상: 카테고리 색상은 `CategoryChips.tsx`의 CATEGORIES에서 관리

### Components
- 서버 컴포넌트 기본, 클라이언트 필요시만 `'use client'`
- 지도 관련은 모두 `dynamic(() => import(...), { ssr: false })` 로 로드
- 이미지: `next/image` + Supabase Storage URL

### Data Flow
- 서버 컴포넌트에서 Supabase 조회 → 클라이언트 컴포넌트에 props 전달
- 지도 뷰포트 변경 시 `onVisibleChange` 콜백으로 보이는 콘텐츠 필터링
- 카테고리 필터: URL params 또는 React state로 관리

### API Routes
- `/api/crawl/*`: 크롤링 엔드포인트. Vercel Cron으로 스케줄링
- `/api/places`: bounds + category + date 필터 쿼리

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_KAKAO_MAP_KEY
NEXT_PUBLIC_GOOGLE_CLIENT_ID
NEXT_PUBLIC_GOOGLE_REDIRECT_URI
NEXT_PUBLIC_KAKAO_REST_API_KEY
NEXT_PUBLIC_KAKAO_REDIRECT_URI
NEXT_PUBLIC_NAVER_CLIENT_ID
NEXT_PUBLIC_NAVER_REDIRECT_URI
```

## Implementation Status

### Done (Phase 1)
- [x] 라우트 재구성 (/ = 지도, /about = 랜딩, /place/[id] = 상세)
- [x] 모바일 풀스크린 맵 + 바텀시트
- [x] 데스크톱 좌측 사이드바 + 풀높이 지도
- [x] 카테고리별 커스텀 마커 + 프리뷰 카드
- [x] 카테고리 칩 필터 UI
- [x] 현위치 버튼

### In Progress (Phase 2)
- [ ] Supabase `places` 테이블 생성 + 데이터 마이그레이션
- [ ] 서울시 문화행사 API 크롤러 (`/api/crawl/seoul-culture`)
- [ ] 공공데이터포털 크롤러
- [ ] 데이터 정규화 + 지오코딩 + 중복제거
- [ ] Vercel Cron Jobs 설정
- [ ] 뷰포트 기반 API (`/api/places`)
- [ ] 카테고리 필터 연동
- [ ] 검색 기능

### TODO (Phase 3-5)
- [ ] OAuth 로그인 (Google/Kakao/Naver)
- [ ] 유저 프로필 + 북마크 + 컬렉션
- [ ] 리뷰/별점
- [ ] 공유 (카카오톡, 딥링크, OG 태그)
- [ ] 스폰서드 리스팅 + 제휴 커미션
