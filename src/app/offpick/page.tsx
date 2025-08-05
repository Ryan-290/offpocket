import OffpickCardMobile from '@/component/card/cardMobile';
import { supabase } from '@/lib/supabase/client';
import MapContent from '@/component/offpick/mapContent';


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
        {/* 데스크탑일 때 */}
        <div className='sm:block hidden w-[1250px]'>
          {/* 필터링 바 */}
          {/* <div className=''>
            필터링 바
          </div> */}
          <MapContent
            contents={contents}
          />
        </div>
        {/* 모바일 일때 */}
        <div className='sm:hidden blocks'>
          {/* <div className='sticky top-[47px] z-50'> */}
            {/* 필터링 바 */}
            {/* <div className='bg-red-200'>
              필터링
            </div> */}
            {/* 지도 */}
            {/* <div className='w-full aspect-[2/1] bg-gray-300 py-10 '>
              지도
            </div>
            <div className='w-full h-[16px] bg-white border-b-[1px] border-gray-200'></div>
          </div> */}
          {/* 콘텐츠프레임 */}
          <div className='flex flex-col py-4 gap-x-4 gap-y-4'>
            {contents.map(item => (
              <OffpickCardMobile
                key={item.id}
                content={item}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}