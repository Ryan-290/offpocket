'use client'
import dynamic from 'next/dynamic'
import OffpickCardWeb from '@/component/card/cardWeb';
import { useState } from 'react';
import { OffpickContent } from '@/type/content';

interface MapViewerProps {
  contents: OffpickContent[];
}

const MapViewer = dynamic(() => import('@/component/offpick/mapViewer'), {
  ssr: false,
})

export default function MapContent({ contents }: MapViewerProps) {
  // const [dateFiltered, setDateFiltered] = useState<Content[]>([])
  const [mapFiltered, setMapFiltered] = useState<OffpickContent[]>([])

  return (
    <div>
      <div className='grid grid-cols-3 py-4'>
        <div className='col-span-2'>
          <MapViewer
            contents={contents} // 날짜 필터 적용된 데이터로 지도 표시
            onVisibleChange={(visible) => setMapFiltered(visible as OffpickContent[])} // 지도 범위 필터
          />
        </div>
        <div className='col-span-1 flex flex-col h-[800px] overflow-y-auto mx-2 gap-y-4'>
          {mapFiltered.map(item => (
            <OffpickCardWeb
              key={item.id}
              content={item}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
