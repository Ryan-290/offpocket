'use client';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';

const baseURL = "https://pzwfxlohnoiemrlczoyt.supabase.co/storage/v1/object/public/offpick-images//";

export default function ImageCarousel({ thumbnail_url, image_urls }) {

  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });


  const allImages = [thumbnail_url, ...(image_urls ?? [])].filter(Boolean);

  return (
    <div ref={sliderRef} className="keen-slider relative w-full h-full">
      {allImages.map((url, idx) => (
        <div
          key={idx}
          className="keen-slider__slide w-full h-full flex items-center justify-center shrink-0"
        >
          <img
            src={baseURL + url}
            alt={`slide-${idx}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* 도트 (선택 사항) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {allImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition ${
              currentSlide === idx ? 'bg-[#DBA39A]' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}