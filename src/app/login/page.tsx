"use client";

import GoogleLoginButton from "@/component/login/googleLoginButton";
import KakaoLoginButton from "@/component/login/kakaologin";
import NaverLoginButton from "@/component/login/naverLoginButton";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";


export default function loginPage() {

  const [inputEmail, setInputEmail] = useState('');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);

  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4">
        <div className='flex flex-col md:flex-row py-10 sm:py-15 items-center'>
          <div className='relative w-[200px] md:w-[400px] lg:w-[600px] aspect-[600/400] rounded-4xl overflow-hidden'>
            <Image
              alt="updating"
              src="/updating.png"
              fill
              className="object-contain"
            />
          </div>
          <div className="px-4 py-5 md:py-0 md:pl-15">
            <div className='text-[#C1776D] text-xl sm:text-2xl lg:text-3xl font-semibold py-5'>
              <div>곧, 비일상을 담는 포켓을 만나보세요! </div>
              <div>지금은 준비 중이에요!</div>
            </div>
            <div className='text-base sm:text-lg lg:text-xl py-5'>
              <div>비일상적인 경험을 고민하는 수간</div>
              <div>어떤 비일상이 있었는지 놓치지 않도록  </div>
              <div>offpocket이 로그인/북마크 기능을 준비할께요.</div>
              <br />
              <div>현재는 열심히 업데이트 중이에요!  </div>
              <div>조금만 기다려주시면 만나보실 수 있어요 !!</div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="max-w-[375px] md:max-w-[440px] mx-auto px-4 py-5 h-[800px]">
        <div className='flex flex-col items-center w-full'>
          <div className='relative w-[250px] h-[250px]'>
            <Image
              src="/logo_bgremove.png"
              alt="전체 로고"
              fill
              className="object-contain"
            />
          </div>
          <div className='text-2xl md:text-3xl font-extrabold text-center text-[#4f4f4f]'>
            <p>일상 <span className="text-[#DBA39A]">OFF</span></p>
            <p>소소한 설렘의 시작</p>
          </div>
        </div>
        <div className='flex flex-col space-y-4 w-full py-10'>
          <KakaoLoginButton/>
          <NaverLoginButton/>
          <GoogleLoginButton/>
        </div> */}

      {/* <div className='flex flex-col space-y-4'>
          <div className='flex space-x-2 items-center w-full text-gray-400 text-sm'>
            <hr  className="flex-grow border-t border-gray-300"/>
              또는 이메일 시작하기
            <hr className="flex-grow border-t border-gray-300"/>
          </div>
          <input
            type="email"
            name="email"
            aria-label="email 입력"
            value={inputEmail}
            onChange={(e)=>setInputEmail(e.target.value)}
            className='w-full h-[50px] px-4 rounded-2xl border-[1px] border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBA39A]'
            placeholder="이메일을 입력해주세요"       
          />
          <button
            disabled={!isValidEmail}
            className={clsx(
              "flex justify-center items-center rounded-2xl my-5 h-[60px] text-xl font-semibold",
              isValidEmail ? 'bg-[#DBA39A] text-white cursor-pointer' : 'bg-gray-300 text-gray-400'
            )}
          >
            시작하기
          </button>
        </div> */}
    {/* </div> */}
    </main >
  )
}