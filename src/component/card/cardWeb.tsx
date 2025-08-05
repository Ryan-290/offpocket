import { OffpickContent } from '@/type/content';
import Image from 'next/image'
import Link from 'next/link';

export default function OffpickCardWeb({
  content
}: {
  content: OffpickContent;
}) {

  const formatDate = (dateStr: string) => {
    const [_, month, day] = dateStr.split("-");
    return `${month}.${day}`;
  };

  const baseURL = "https://pzwfxlohnoiemrlczoyt.supabase.co/storage/v1/object/public/offpick-images//"

  return (
    <Link
      href={`/offpick/${content.id}`}
      className='flex flex-col px-4 py-4 rounded-2xl border-[0.5px] border-gray-100 shadow-md transition-transform duration-300 hover:scale-102'
    >
      <div className='flex items-center'>
        {/* 이미지 */}
        <div className='relative w-[140px] h-[100px] rounded-xl overflow-hidden shrink-0'>
          <Image
            alt="thumbnail"
            src={baseURL + content.thumbnail_url}
            fill
            className='object-cover'
          />
        </div>
        <div className='flex flex-col min-w-0 px-4'>
          {/* 타이틀 */}
          <div className='text-xl font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>
            {content.title}
          </div>
          {/* 위치 */}
          <div className='py-2 text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis'>
            {content.location}
          </div>
          {/* 기간, 시간 */}
          <div className='text-gray-500'>
            {formatDate(content.start_date)}~{formatDate(content.end_date)}, {content.time}
          </div>
        </div>
      </div>

    </Link>
  )
}