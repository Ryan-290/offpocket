import { supabase } from '@/lib/supabase/client';
import MapPage from '@/component/map/MapPage';

export default async function Home() {
  const { data: contents, error } = await supabase
    .from('offpick_contents')
    .select('*');

  if (error) {
    return <p>데이터를 불러오는 중 오류 발생: {error.message}</p>;
  }

  return <MapPage contents={contents ?? []} />;
}
