import Image from 'next/image'

import { OffpickContent } from '@/type/content'
import Link from 'next/link';

export default function OffpickCard({
  content
}: {
  content: OffpickContent;
}) {

  const baseURL = "https://pzwfxlohnoiemrlczoyt.supabase.co/storage/v1/object/public/offpick-images//"

  return (
    <Link
      href={`/offpick/${content.id}`}
      className='flex flex-col px-4 py-4 rounded-2xl shadow-md transition-transform duration-300 hover:scale-105'
    >
      {/* 이미지 */}
      <div className='relative w-full h-[240px] rounded-3xl overflow-hidden'>
        <Image
          alt="thumbnail"
          src={baseURL + content.thumbnail_url}
          fill
          className='object-cover'
        />
      </div>
      {/* 타이틀 */}
      <div className='px-2 pt-5 text-2xl font-semibold'>
        {content.title}
      </div>
      {/* 위치 */}
      <div className='px-2 py-2 text-gray-600'>
        {content.location}
      </div>
      {/* 기간, 시간 */}
      <div className='px-2  text-gray-400'>
        {content.start_date}~{content.end_date}, {content.time}
      </div>

    </Link>
  )
}