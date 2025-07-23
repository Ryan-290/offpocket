import OffpickCard from '@/component/card/card'
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export default async function OffContentPage() {

  const { data: contents, error } = await supabase
    .from('offpick_contents')
    .select('*');

  if (error) {
    return <p>데이터를 불러오는 중 오류 발생: {error.message}</p>
  }

  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4">
        {/* 필터링 바 */}
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#c1776d] font-bold py-10'>
          놓치면 아쉬운 OFF PICK!
        </div>
        <div className='bg-red-200'>
          필터링
        </div>
        {/* 지도 */}
        <div className='w-full aspect-[2/1] bg-gray-300 py-10 '>
          지도
        </div>
        {/* 콘텐츠프레임 */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4'>
          {contents.map(item => (
            <OffpickCard
              key={item.id}
              content={item}
            />
          ))}
        </div>
      </div>
    </main>
  )
}