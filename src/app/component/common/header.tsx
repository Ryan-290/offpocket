// src/app/component/common/header.tsx
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import MenuButton from '@/app/component/common/MenuButton';
import Link from 'next/link';
import HeaderMobile from './headerMobile';

export const dynamic = 'force-dynamic';

export default async function Header() {
  const supabase = createServerComponentClient({ cookies }); // ✅ 동기 함수 그대로 넘김
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profileImage = user?.user_metadata?.avatar_url;

  return (
    <header className="sticky top-0 z-50 w-full h-auto md:py-4 py-2 bg-white border-b-[1px] border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* 로고 */}
        <div className="flex relative md:w-[196px] w-[140px] md:h-[42px] h-[30px] shrink-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="회사 로고"
              fill
              unoptimized
              className="object-contain"
            />
          </Link>
        </div>
        {/* 버튼 컨테이너 */}
        <div className="hidden md:flex justify-between w-full pl-40 mr-4 md:mr-0">
          <div className="flex justify-center space-x-8">
            <MenuButton href="/offpick">OFF PICK !</MenuButton>
            <MenuButton href="/eating">OFF 먹킷리스트</MenuButton>
          </div>
          {user ? (
            <div className="flex space-x-4">
              <Link href="/mypage">
                <img
                  src={profileImage || '/defaultProfile.png'}
                  alt="프로필"
                  width={30}
                  height={30}
                  className="rounded-full transition-transform duration-300 hover:scale-110"
                />
              </Link>
              <Link href="/logout" className="text-sm mt-[2px]">로그아웃</Link>
            </div>
          ) : (
            <MenuButton href="/login">로그인</MenuButton>
          )}
        </div>

        <HeaderMobile />
      </div>
    </header>
  );
}
