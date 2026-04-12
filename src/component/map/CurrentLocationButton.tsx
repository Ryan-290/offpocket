'use client';

import { MdMyLocation } from 'react-icons/md';

interface CurrentLocationButtonProps {
  onLocate: (lat: number, lng: number) => void;
}

export default function CurrentLocationButton({ onLocate }: CurrentLocationButtonProps) {
  const handleClick = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => onLocate(pos.coords.latitude, pos.coords.longitude),
      () => alert('위치 정보를 가져올 수 없습니다.'),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
      aria-label="현재 위치"
    >
      <MdMyLocation className="w-5 h-5 text-gray-700" />
    </button>
  );
}
