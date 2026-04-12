'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback, useRef } from 'react';
import { OffpickContent } from '@/type/content';
import CategoryChips, { CategoryId } from './CategoryChips';
import BottomSheet from './BottomSheet';
import SidebarCard from './SidebarCard';
import CurrentLocationButton from './CurrentLocationButton';
import MarkerPreview from './MarkerPreview';

const MapViewer = dynamic(() => import('./MapViewer'), { ssr: false });

interface MapPageProps {
  contents: OffpickContent[];
}

export default function MapPage({ contents }: MapPageProps) {
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(['all']);
  const [visibleContents, setVisibleContents] = useState<OffpickContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<OffpickContent | null>(null);
  const mapRef = useRef<any>(null);

  const handleCategoryToggle = useCallback((id: CategoryId) => {
    if (id === 'all') {
      setSelectedCategories(['all']);
      return;
    }
    setSelectedCategories((prev) => {
      const withoutAll = prev.filter((c) => c !== 'all');
      const exists = withoutAll.includes(id);
      const next = exists ? withoutAll.filter((c) => c !== id) : [...withoutAll, id];
      return next.length === 0 ? ['all'] : next;
    });
  }, []);

  const handleVisibleChange = useCallback((visible: OffpickContent[]) => {
    setVisibleContents(visible);
  }, []);

  const handleMarkerClick = useCallback((content: OffpickContent) => {
    setSelectedContent(content);
    // 사이드바에서 해당 카드로 스크롤
    const cardEl = document.getElementById(`card-${content.id}`);
    cardEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const handleLocate = useCallback((lat: number, lng: number) => {
    if (!mapRef.current || !window.kakao?.maps) return;
    const kakao = window.kakao;
    const position = new kakao.maps.LatLng(lat, lng);
    mapRef.current.setCenter(position);
    mapRef.current.setLevel(4);
  }, []);

  // 카테고리별 카운트
  const categoryCounts: Record<string, number> = {};
  contents.forEach((c) => {
    const cat = (c as any).category ?? 'popup';
    categoryCounts[cat] = (categoryCounts[cat] ?? 0) + 1;
  });

  const categoryChips = (
    <CategoryChips
      selected={selectedCategories}
      onToggle={handleCategoryToggle}
      counts={categoryCounts}
    />
  );

  return (
    <div className="relative w-full h-[calc(100vh-64px)] md:h-[calc(100vh-72px)]">
      {/* Desktop: 좌측 사이드바 + 우측 지도 */}
      <div className="hidden md:flex h-full">
        {/* 사이드바 */}
        <div className="w-[380px] shrink-0 flex flex-col h-full border-r border-gray-200 bg-white">
          <div className="px-4 pt-3 shrink-0">
            {categoryChips}
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
            {visibleContents.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                이 지역에 표시할 콘텐츠가 없습니다
              </div>
            ) : (
              visibleContents.map((item) => (
                <SidebarCard
                  key={item.id}
                  content={item}
                  isHighlighted={item.id === selectedContent?.id}
                  onClick={() => handleMarkerClick(item)}
                />
              ))
            )}
          </div>
          <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 shrink-0">
            {visibleContents.length}개 표시 중
          </div>
        </div>

        {/* 지도 */}
        <div className="flex-1 relative">
          <MapViewer
            contents={contents}
            selectedCategories={selectedCategories}
            onVisibleChange={handleVisibleChange}
            onMarkerClick={handleMarkerClick}
            selectedContentId={selectedContent?.id}
            mapRef={mapRef}
          />

          {/* 현위치 버튼 */}
          <div className="absolute bottom-6 right-4 z-10">
            <CurrentLocationButton onLocate={handleLocate} />
          </div>

          {/* 마커 프리뷰 */}
          {selectedContent && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
              <MarkerPreview
                content={selectedContent}
                onClose={() => setSelectedContent(null)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile: 풀스크린 지도 + 바텀시트 */}
      <div className="md:hidden h-full relative">
        <MapViewer
          contents={contents}
          selectedCategories={selectedCategories}
          onVisibleChange={handleVisibleChange}
          onMarkerClick={handleMarkerClick}
          selectedContentId={selectedContent?.id}
          mapRef={mapRef}
        />

        {/* 현위치 버튼 */}
        <div className="absolute bottom-[52vh] right-4 z-30">
          <CurrentLocationButton onLocate={handleLocate} />
        </div>

        {/* 마커 프리뷰 (모바일) */}
        {selectedContent && (
          <div className="absolute bottom-[52vh] left-1/2 -translate-x-1/2 z-30 mb-2">
            <MarkerPreview
              content={selectedContent}
              onClose={() => setSelectedContent(null)}
            />
          </div>
        )}

        {/* 바텀시트 */}
        <BottomSheet header={categoryChips}>
          <div className="space-y-1">
            {visibleContents.length === 0 ? (
              <div className="flex items-center justify-center h-20 text-gray-400 text-sm">
                이 지역에 표시할 콘텐츠가 없습니다
              </div>
            ) : (
              visibleContents.map((item) => (
                <SidebarCard
                  key={item.id}
                  content={item}
                  isHighlighted={item.id === selectedContent?.id}
                  onClick={() => handleMarkerClick(item)}
                />
              ))
            )}
          </div>
        </BottomSheet>
      </div>
    </div>
  );
}
