// /app/mypage/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from "@/lib/supabase/server";

export default async function MyPage() {
  const supabase = createClient();

  // ✅ 로그인한 사용자 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login'); // 로그인 안 된 경우
  }

  // ✅ 사용자 정보 조회
  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('provider_user_id', user.id)
    .single();

  if (error) {
    return <p>사용자 정보를 불러오는 중 오류가 발생했습니다.</p>;
  }

  return (
    <div className="flex-1 p-8">
      <h1 className="text-xl font-bold">마이페이지</h1>
      <p>이름: {userData?.nickname}</p>
      <p>이메일: {userData?.email}</p>
      {/* 필요한 사용자 정보 추가 */}
    </div>
  );
}
