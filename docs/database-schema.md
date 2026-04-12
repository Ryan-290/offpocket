# Database Schema — Supabase

> Supabase 프로젝트: `pzwfxlohnoiemrlczoyt`
> 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 현재 상태

### `offpick_contents` (기존 — Phase 2에서 `places`로 대체 예정)
```sql
-- 현재 수동 등록된 콘텐츠
offpick_contents (
  id          UUID PRIMARY KEY,
  title       TEXT,
  description TEXT,
  thumbnail_url TEXT,
  image_urls  TEXT[],
  start_date  TEXT,       -- 'YYYY-MM-DD'
  end_date    TEXT,       -- 'YYYY-MM-DD'
  available_dates TEXT[],
  time        TEXT,
  location    TEXT,
  latitude    FLOAT,
  longitude   FLOAT,
  likes       INTEGER,
  slug        TEXT
)
```

---

## Phase 2 스키마 (새로 생성 필요)

### 1. `places` — 메인 장소 테이블

`offpick_contents`를 대체하는 확장 테이블. 크롤링 데이터 + 수동 등록 모두 수용.

```sql
CREATE TABLE places (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT,

  -- 카테고리
  category        TEXT NOT NULL CHECK (category IN ('performance', 'popup', 'exhibition', 'restaurant', 'date_course')),
  sub_category    TEXT,

  -- 이미지
  thumbnail_url   TEXT,
  image_urls      TEXT[] DEFAULT '{}',

  -- 위치
  location_name   TEXT NOT NULL,         -- "성수동 카페거리" 같은 사람이 읽는 주소
  address         TEXT,                  -- 도로명/지번 전체 주소
  district        TEXT,                  -- '성동구', '마포구' 등 (필터용)
  latitude        DOUBLE PRECISION NOT NULL,
  longitude       DOUBLE PRECISION NOT NULL,

  -- 기간
  start_date      DATE,
  end_date        DATE,
  time_info       TEXT,                  -- "10:00~18:00" 등 운영시간
  is_permanent    BOOLEAN DEFAULT FALSE, -- 상설 장소 (맛집 등)

  -- 인게이지먼트
  like_count      INTEGER DEFAULT 0,
  bookmark_count  INTEGER DEFAULT 0,
  review_count    INTEGER DEFAULT 0,
  avg_rating      DECIMAL(2,1) DEFAULT 0,
  view_count      INTEGER DEFAULT 0,

  -- 외부 링크
  external_url    TEXT,                  -- 원본 소스 URL
  ticket_url      TEXT,                  -- 제휴 티켓 링크

  -- 태그
  tags            TEXT[] DEFAULT '{}',   -- ['무료', '데이트', '혼자가기좋은', '주차가능']

  -- 크롤링 메타데이터
  source          TEXT NOT NULL DEFAULT 'manual',  -- 'manual' | 'seoul_api' | 'data_go_kr' | 'interpark' | 'melon' | 'blog_crawl'
  source_id       TEXT,                  -- 원본 소스에서의 ID (중복체크용)
  last_synced_at  TIMESTAMPTZ,

  -- 상태
  status          TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended', 'draft', 'hidden')),
  is_promoted     BOOLEAN DEFAULT FALSE, -- 스폰서드 리스팅 (광고)

  -- 타임스탬프
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_places_category ON places(category);
CREATE INDEX idx_places_status ON places(status);
CREATE INDEX idx_places_dates ON places(start_date, end_date);
CREATE INDEX idx_places_district ON places(district);
CREATE INDEX idx_places_source ON places(source, source_id);
CREATE INDEX idx_places_slug ON places(slug);
CREATE INDEX idx_places_location ON places(latitude, longitude);

-- RLS (Row Level Security)
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "places_read_all" ON places FOR SELECT USING (true);
CREATE POLICY "places_insert_service" ON places FOR INSERT WITH CHECK (true);
CREATE POLICY "places_update_service" ON places FOR UPDATE USING (true);
```

### 2. `categories` — 카테고리 마스터

```sql
CREATE TABLE categories (
  id          TEXT PRIMARY KEY,         -- 'performance', 'popup', 'exhibition', 'restaurant', 'date_course'
  label       TEXT NOT NULL,            -- '공연', '팝업', '전시', '맛집', '데이트코스'
  marker_color TEXT NOT NULL,           -- '#FF6B6B'
  icon_name   TEXT,                     -- 이모지 또는 아이콘 이름
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE
);

-- Seed Data
INSERT INTO categories (id, label, marker_color, icon_name, sort_order) VALUES
  ('performance', '공연', '#FF6B6B', '🎵', 1),
  ('popup', '팝업', '#4ECDC4', '🛍️', 2),
  ('exhibition', '전시', '#9B59B6', '🖼️', 3),
  ('restaurant', '맛집', '#F39C12', '🍴', 4),
  ('date_course', '데이트코스', '#E91E63', '💕', 5);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_read_all" ON categories FOR SELECT USING (true);
```

### 3. `users` — 유저 (Phase 3)

```sql
CREATE TABLE users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider            TEXT NOT NULL CHECK (provider IN ('kakao', 'google', 'naver')),
  provider_user_id    TEXT NOT NULL,
  email               TEXT,
  nickname            TEXT,
  profile_image       TEXT,

  -- 선호 설정
  preferred_categories TEXT[] DEFAULT '{}',
  preferred_districts  TEXT[] DEFAULT '{}',

  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(provider, provider_user_id)
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_read_own" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (auth.uid() = id);
```

### 4. `bookmarks` — 북마크 (Phase 3)

```sql
CREATE TABLE bookmarks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  place_id        UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  collection_id   UUID REFERENCES collections(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, place_id)
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bookmarks_own" ON bookmarks FOR ALL USING (auth.uid() = user_id);
```

### 5. `collections` — 컬렉션 (Phase 3)

```sql
CREATE TABLE collections (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  cover_image_url TEXT,
  is_public       BOOLEAN DEFAULT TRUE,
  slug            TEXT UNIQUE,

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_collections_user ON collections(user_id);
CREATE INDEX idx_collections_slug ON collections(slug);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "collections_read_public" ON collections FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "collections_manage_own" ON collections FOR ALL USING (auth.uid() = user_id);
```

### 6. `reviews` — 리뷰 (Phase 3)

```sql
CREATE TABLE reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  place_id    UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content     TEXT,                     -- 최대 500자 (프론트에서 제한)
  image_urls  TEXT[] DEFAULT '{}',      -- 최대 3장

  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, place_id)
);

CREATE INDEX idx_reviews_place ON reviews(place_id);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_read_all" ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews_manage_own" ON reviews FOR ALL USING (auth.uid() = user_id);
```

### 7. `crawl_logs` — 크롤링 로그 (Phase 2)

```sql
CREATE TABLE crawl_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source          TEXT NOT NULL,         -- 'seoul_api', 'data_go_kr', 'interpark', 'melon', 'blog_crawl'
  status          TEXT NOT NULL CHECK (status IN ('success', 'partial', 'failed')),
  items_found     INTEGER DEFAULT 0,
  items_created   INTEGER DEFAULT 0,
  items_updated   INTEGER DEFAULT 0,
  items_skipped   INTEGER DEFAULT 0,
  error_message   TEXT,
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  completed_at    TIMESTAMPTZ
);

CREATE INDEX idx_crawl_logs_source ON crawl_logs(source);

ALTER TABLE crawl_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crawl_logs_read_all" ON crawl_logs FOR SELECT USING (true);
CREATE POLICY "crawl_logs_insert_service" ON crawl_logs FOR INSERT WITH CHECK (true);
```

---

## 데이터 마이그레이션 (offpick_contents → places)

```sql
INSERT INTO places (
  id, slug, title, description, thumbnail_url, image_urls,
  location_name, latitude, longitude,
  start_date, end_date, time_info,
  like_count, category, source, status
)
SELECT
  id,
  COALESCE(slug, id::text),
  title,
  description,
  thumbnail_url,
  image_urls,
  location,
  latitude,
  longitude,
  start_date::date,
  end_date::date,
  time,
  likes,
  'popup',           -- 기존 데이터는 기본 popup으로 (수동 분류 필요)
  'manual',
  'active'
FROM offpick_contents;
```

---

## Storage

- **버킷**: `offpick-images`
- **Base URL**: `https://pzwfxlohnoiemrlczoyt.supabase.co/storage/v1/object/public/offpick-images//`
- 이미지 경로는 `thumbnail_url`, `image_urls`에 파일명만 저장 (Base URL은 프론트에서 붙임)

---

## ER Diagram (간략)

```
categories 1──* places
places 1──* bookmarks *──1 users
places 1──* reviews *──1 users
users 1──* collections 1──* bookmarks
places ← crawl_logs (source로 연결)
```
