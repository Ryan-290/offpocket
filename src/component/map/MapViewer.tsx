'use client';

import { useEffect, useRef, useState } from 'react';
import { OffpickContent } from '@/type/content';
import { CategoryId, CATEGORIES } from './CategoryChips';

interface MapViewerProps {
  contents: OffpickContent[];
  selectedCategories: CategoryId[];
  onVisibleChange?: (visible: OffpickContent[]) => void;
  onMarkerClick?: (content: OffpickContent) => void;
  selectedContentId?: string | null;
  mapRef?: React.MutableRefObject<any>;
}

declare global {
  interface Window {
    kakao: any;
  }
}

function getCategoryColor(category?: string): string {
  const cat = CATEGORIES.find((c) => c.id === category);
  return cat?.color ?? '#4ECDC4';
}

function getCategoryIcon(category?: string): string {
  const cat = CATEGORIES.find((c) => c.id === category);
  return cat?.icon ?? '📍';
}

export default function MapViewer({
  contents,
  selectedCategories,
  onVisibleChange,
  onMarkerClick,
  selectedContentId,
  mapRef: externalMapRef,
}: MapViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const overlaysRef = useRef<any[]>([]);
  const clustererRef = useRef<any>(null);

  // SDK 로드
  useEffect(() => {
    if (window.kakao?.maps) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=clusterer`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => setScriptLoaded(true));
    };
    document.head.appendChild(script);
  }, []);

  // 지도 생성
  useEffect(() => {
    if (!scriptLoaded || map || !containerRef.current) return;
    const kakao = window.kakao;
    const mapInstance = new kakao.maps.Map(containerRef.current, {
      center: new kakao.maps.LatLng(37.5665, 126.9780),
      level: 7,
    });
    setMap(mapInstance);
    if (externalMapRef) externalMapRef.current = mapInstance;
  }, [scriptLoaded, map, externalMapRef]);

  // 필터링된 콘텐츠
  const filteredContents = selectedCategories.includes('all')
    ? contents
    : contents.filter((c) => {
        const cat = (c as any).category ?? 'popup';
        return selectedCategories.includes(cat);
      });

  // 마커 + 클러스터 + idle 이벤트
  useEffect(() => {
    if (!map || !window.kakao?.maps) return;
    const kakao = window.kakao;

    // 기존 오버레이 제거
    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    overlaysRef.current = [];
    if (clustererRef.current) {
      clustererRef.current.clear();
    }

    const markers: any[] = [];
    const markerContentMap = new Map<any, OffpickContent>();

    filteredContents.forEach((content, index) => {
      const category = (content as any).category ?? 'popup';
      const color = getCategoryColor(category);
      const icon = getCategoryIcon(category);
      const isSelected = content.id === selectedContentId;

      const offset = 0.00005 * index;
      const position = new kakao.maps.LatLng(
        content.latitude + offset,
        content.longitude + offset
      );

      // 커스텀 마커 오버레이
      const markerEl = document.createElement('div');
      markerEl.innerHTML = `
        <div style="
          width: ${isSelected ? '44px' : '36px'};
          height: ${isSelected ? '44px' : '36px'};
          background: ${color};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          cursor: pointer;
          transition: transform 0.2s ease;
          font-size: ${isSelected ? '20px' : '16px'};
          ${isSelected ? 'border: 3px solid white; box-shadow: 0 2px 12px rgba(0,0,0,0.4);' : ''}
        "
        onmouseenter="this.style.transform='scale(1.2)'"
        onmouseleave="this.style.transform='scale(1)'"
        >${icon}</div>
      `;

      markerEl.addEventListener('click', () => {
        onMarkerClick?.(content);
      });

      const overlay = new kakao.maps.CustomOverlay({
        position,
        content: markerEl,
        yAnchor: 0.5,
        xAnchor: 0.5,
      });

      overlay.setMap(map);
      overlaysRef.current.push(overlay);

      // 클러스터용 숨겨진 마커
      const marker = new kakao.maps.Marker({ position, visible: false });
      markerContentMap.set(marker, content);
      markers.push(marker);
    });

    // 클러스터러
    clustererRef.current = new kakao.maps.MarkerClusterer({
      map,
      markers,
      gridSize: 60,
      averageCenter: true,
      minLevel: 5,
      styles: [
        {
          width: '44px',
          height: '44px',
          background: 'rgba(79, 70, 229, 0.8)',
          borderRadius: '50%',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '44px',
          fontSize: '14px',
        },
      ],
    });

    // idle 이벤트 - 현재 뷰포트 콘텐츠 필터
    const updateVisible = () => {
      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const visible = filteredContents.filter((c) => {
        return (
          c.latitude >= sw.getLat() &&
          c.latitude <= ne.getLat() &&
          c.longitude >= sw.getLng() &&
          c.longitude <= ne.getLng()
        );
      });

      onVisibleChange?.(visible);
    };

    updateVisible();
    kakao.maps.event.addListener(map, 'idle', updateVisible);

    return () => {
      overlaysRef.current.forEach((overlay) => overlay.setMap(null));
      overlaysRef.current = [];
      if (clustererRef.current) clustererRef.current.clear();
      kakao.maps.event.removeListener(map, 'idle', updateVisible);
    };
  }, [map, filteredContents, selectedContentId, onMarkerClick, onVisibleChange]);

  return <div ref={containerRef} className="w-full h-full bg-gray-200" />;
}
