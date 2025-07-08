"use client";

import Image from "next/image"
import MenuButton from "@/component/common/MenuButton"
import Link from "next/link"

import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import clsx from "clsx";

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

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
          <div className='flex justify-center space-x-8'>
            <MenuButton
              href="/offpick"
            >
              OFF PICK !
            </MenuButton>
            <MenuButton
              href="/eating"
            >
              OFF 먹킷리스트
            </MenuButton>
          </div>
          {/* 로그인 / 마이페이지 버튼 */}
          <div className=''>
            <MenuButton
              href="/login"
            >
              로그인
            </MenuButton>
          </div>
        </div>
        {/* 버튼 - md 이하*/}
        <div className='md:hidden flex px-2'>
          <button
            onClick={toggleMenu}
          >
            <FaBars className="w-[16px] h-[16px] cursor-pointer" />
          </button>
        </div>
        {/* 모바일 메뉴 오픈 */}
        <div className={clsx(
          'fixed md:hidden top-0 right-0 w-[200px] h-full bg-[#FFE6D0] transform transition-transform duration-300 linear',
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          {/* close Button */}
          <div className='flex justify-end w-full h-[47px] px-4 '>
            <button
              onClick={toggleMenu}
            >
              <FaTimes className="w-[20px] h-[20px] cursor-pointer" />
            </button>
          </div>
          {/* 메뉴 리스트 */}
          <div className='flex flex-col px-8 py-4 space-y-4 text-sm'>
            <MenuButton
              href="/offpick"
            >
              OFF PICK !
            </MenuButton>
            <MenuButton
              href="/eating"
            >
              OFF 먹킷리스트
            </MenuButton>
            <MenuButton
              href="/login"
            >
              로그인
            </MenuButton>
          </div>
        </div>

      </div>
    </header >
  )
}