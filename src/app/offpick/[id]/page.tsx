import { supabase } from '@/lib/supabase/client'
// import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
// import { GoHeartFill, GoHeart } from "react-icons/go";
import BackButton from '@/component/common/backButton';
import ImageCarousel from '@/component/card/ImageCarousel';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function OffpickDetailPage({ params }: PageProps ) {
  const { id } = params;

  const { data, error } = await supabase
    .from('offpick_contents')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return <div className="p-4">❌ 콘텐츠를 찾을 수 없습니다.</div>
  }

  return (
    <main className='flex-1 max-w-[1000px] mx-auto px-4'>
      <div className='flex flex-col'>
        {/* 뒤로가기 */}
        <div className='py-5'>
          <BackButton />
        </div>
        {/* 이미지 - 캐러셀로 개발 예정 */}
        <div className='relative w-full overflow-hidden'>
            <ImageCarousel
              thumbnail_url={data.thumbnail_url}
              image_urls={data.image_urls}
            />
        </div>
        {/* 버튼 */}
        {/* <div className='flex justify-end space-x-2 sm:space-x-4 py-3 sm:py-5 mx-2'>
          <GoHeartFill className='w-[20px] sm:w-[35px] h-[20px] sm:h-[35px] text-red-500' />
          <RiBookmarkFill className='w-[20px] sm:w-[35px] h-[20px] sm:h-[35px] text-sky-500' />
        </div> */}
        {/* 타이틀 */}
        <div className='text-xl sm:text-3xl font-semibold py-3 sm:py-5'>
          {data.title}
        </div>
        {/* 기간 + 시간 */}
        <div className='text-base sm:text-lg text-gray-600 pt-3'>
          일시 : {data.start_date}~{data.end_date} | {data.time}
        </div>
        {/* 장소 */}
        <div className='text-base sm:text-lg text-gray-600 pt-3'>
          장소 : {data.location}
        </div>
        {/* 설명 */}
        <div className='text-lg sm:text-xl pt-10'>
          {data.description}
        </div>
      </div>
    </main>
  )
}