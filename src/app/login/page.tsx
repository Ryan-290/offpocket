"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";


export default function loginPage() {

  const [inputEmail, setInputEmail] = useState('');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);

  return (
    <main className="flex-1">
      <div className="max-w-[375px] md:max-w-[440px] mx-auto px-4 py-5 h-[800px]">
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
        <div className='flex flex-col space-y-2 w-full py-10'>
          <button
            className='flex justify-center items-center bg-yellow-300 rounded-4xl h-[60px]'
          >
            카카오톡 시작하기
          </button>
          <button
            className='flex justify-center items-center bg-green-300 rounded-4xl h-[60px]'
          >
            네이버 시작하기
          </button>
          <button
            className='flex justify-center items-center bg-white border-[1px] border-gray-200 rounded-4xl h-[60px]'
          >
            구글 시작하기
          </button>
        </div>
        <div className='flex flex-col space-y-4'>
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
              isValidEmail ? 'bg-[#DBA39A] text-white' : 'bg-gray-300 text-gray-400'
            )}
          >
            시작하기
          </button>
        </div>
      </div>
    </main>
  )
}