import Image from "next/image"
import MenuButton from "@/component/common/MenuButton"
import Link from "next/link"
import HeaderMobile from "./headerMobile";
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import LogoutButton from "../login/logoutButton";
export const dynamic = "force-dynamic"


export default function Header() {

  return (
    <header className='sticky top-0 z-50 w-full h-auto md:py-4 py-2 bg-white border-b-[1px] border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
        {/* 로고 */}
        <div className='flex relative md:w-[196px] w-[140px] md:h-[42px] h-[30px] shrink-0'>
          <Link href="/">
            <Image
              src='/logo.png'
              alt='회사 로고'
              fill
              unoptimized
              className="object-contain"
            />
          </Link>
        </div>
        {/* 버튼 컨테이너 - md 이상*/}
        <div className='hidden md:flex justify-between w-full pl-40 mr-4 md:mr-0'>
          {/* 메뉴 버튼 */}
          <div className='flex justify-center items-center space-x-8'>
            <MenuButton href="/offpick">OFF PICK !</MenuButton>
            <MenuButton href="/eating">OFF 먹킷리스트</MenuButton>
          </div>
          {/* 로그인 / 마이페이지 버튼 */}
          {/* <MenuButton href="/login">로그인</MenuButton> */}
        </div>
        {/* 모바일 */}
        <HeaderMobile />
      </div>
    </header >
  )
}