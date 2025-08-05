'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useState, useMemo } from 'react';

const baseURL = "https://pzwfxlohnoiemrlczoyt.supabase.co/storage/v1/object/public/offpick-images//";

type CarouselProps = {
  thumbnail_url : string,
  image_urls : string
}

export default function ImageCarousel({ thumbnail_url, image_urls }:CarouselProps) {
  const allImages = useMemo(
    () => [thumbnail_url, ...(image_urls ?? [])].filter(Boolean),
    [thumbnail_url, image_urls]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const [currentSlide, setCurrentSlide] = useState(0);
  const onSelect = () => setCurrentSlide(emblaApi?.selectedScrollSnap() ?? 0);
  emblaApi?.on('select', onSelect);

  return (
    <div className="w-full relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {allImages.map((url, idx) => (
            <div
              key={idx}
              className="flex-[0_0_100%] aspect-[2/1] flex items-center justify-center"
            >
              <img
                src={baseURL + url}
                alt={`slide-${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 도트 네비게이션 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {allImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={`sm:w-3 w-2 sm:h-3 h-2 rounded-full transition ${
              currentSlide === idx ? 'bg-[#DBA39A]' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
