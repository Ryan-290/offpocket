# Offpocket

MZ세대를 위한 서울 핫플 발견 지도 플랫폼

## What

서울의 공연, 팝업스토어, 전시, 맛집, 데이트코스를 **지도 위에서 한눈에** 발견하고, 저장하고, 공유하는 서비스.

## Why

- 공연/팝업/전시 정보가 서울문화포털, 인터파크, 블로그, 인스타 등에 파편화
- **"이번 주말 뭐하지?"** 에 대한 지도 기반 원스톱 답이 없음
- 기존 서비스들은 지도 중심이 아니거나, 카테고리가 제한적

## Target Users

| 세그먼트 | 니즈 |
|---------|------|
| 주말 플래너 | "홍대 근처 이번 주말에 뭐 있지?" |
| 데이트 코스 빌더 | "성수 팝업 + 맛집 같이 보여줘" |
| 문화 탐험가 | "곧 끝나는 전시 뭐 있어?" |
| FOMO 브라우저 | "요즘 다들 어디 가?" |

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS 4
- **Map**: Kakao Maps SDK
- **Database**: Supabase (PostgreSQL + Storage + Auth)
- **Deploy**: Vercel
- **Data**: 공공 API (서울시 문화행사) + 웹 크롤링

## Features

### Phase 1 (Done)
- 지도 중심 메인 페이지
- 모바일: 풀스크린 맵 + 드래그 바텀시트
- 데스크톱: 좌측 사이드바 + 풀높이 지도
- 카테고리별 커스텀 마커 (공연/팝업/전시/맛집/데이트)
- 마커 클릭 프리뷰 카드
- 현위치 버튼

### Phase 2 (In Progress)
- 데이터 크롤링 파이프라인 (서울시 API, 공공데이터)
- places 테이블 + 카테고리 시스템
- 뷰포트 기반 데이터 로딩
- 검색 + 필터링

### Phase 3 (Planned)
- OAuth 로그인 (Google, Kakao, Naver)
- 북마크 & 컬렉션
- 리뷰/별점

### Phase 4 (Planned)
- 카카오톡/SNS 공유
- 동적 OG 태그
- 딥링크

### Phase 5 (Future)
- 광고/스폰서드 콘텐츠
- 제휴 커미션 (티켓 구매)
- 프리미엄 구독

## Getting Started

```bash
pnpm install
pnpm dev
```

### Environment Variables

`.env.local` 필요:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_KAKAO_MAP_KEY=
```

## Architecture

```
/                  → 지도 메인 (MapPage)
/about             → 브랜드 소개
/place/[id]        → 장소 상세
/api/places        → 장소 조회 API
/api/crawl/*       → 크롤링 엔드포인트
```

### Data Sources
- **서울시 문화행사 API** — 공연, 전시, 축제
- **공공데이터포털** — 축제, 전시
- **웹 크롤링** — 팝업스토어, 티켓사이트

### Categories
| Category | Color | 설명 |
|----------|-------|------|
| 🎵 공연 | #FF6B6B | 뮤지컬, 콘서트, 연극 |
| 🛍️ 팝업 | #4ECDC4 | 팝업스토어, 브랜드 이벤트 |
| 🖼️ 전시 | #9B59B6 | 미술관, 갤러리, 전시회 |
| 🍴 맛집 | #F39C12 | 레스토랑, 카페 |
| 💕 데이트 | #E91E63 | 데이트코스, 커플스팟 |

## Revenue Model (Post-MVP)
1. **광고**: 스폰서드 리스팅 (CPC/CPM)
2. **제휴**: 티켓 구매 연결 커미션 (2-5%)
3. **프리미엄**: AI 맞춤 코스 추천, 알림 (3,900원/월)
