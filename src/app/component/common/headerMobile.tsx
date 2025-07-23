"use client";

import MenuButton from "@/app/component/common/MenuButton"

import { FaBars, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import { useState } from "react";

export default function HeaderMobile() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div>
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
        'fixed md:hidden top-0 right-0 w-[200px] h-full bg-[#FFF5EF] transform transition-transform duration-300 linear',
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
  )
}