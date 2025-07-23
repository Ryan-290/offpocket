
import { supabase } from '@/lib/supabase/supabaseClient'

export default async function OffpickDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  const { data, error } = await supabase
    .from('offpick_contents')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return <div className="p-4">❌ 콘텐츠를 찾을 수 없습니다.</div>
  }

  const baseURL = "https://pzwfxlohnoiemrlczoyt.supabase.co/storage/v1/object/public/offpick-images//"
  const fullThumbnailURL = baseURL + data.thumbnail_url
  const fullImageURL = data.image_urls.map((url:string) => `${baseURL}${url}`)

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <img src={fullThumbnailURL} alt={data.title} className="rounded-xl mb-4" />
      <p className="text-gray-700 mb-2">{data.description}</p>
      <p className="text-sm text-gray-500">{data.time} @ {data.location}</p>
      <p className="text-sm text-gray-400 mt-2">콘텐츠 ID: {id}</p>
    </div>
  )
}