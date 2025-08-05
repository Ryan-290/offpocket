import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import React from 'react';

type props = {
  href : string,
  src : string,
  title : string,
  desc : React.ReactNode,
  linkto : string
}

export default function PageIntro({ linkto, src, title, desc, href } : props ) {

  return (
    <div className='grid grid-cols-3 items-center py-5 md:py-10'>
      <div className='relative p-0 lg:p-8'>
        <div className='hidden sm:block sm:col-span-1 relative w-full aspect-[500/500] rounded-4xl overflow-hidden'>
          <Image
            alt={linkto}
            src={src}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className='col-span-3 sm:col-span-2 px-4 md:px-10 lg:px-20'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold'>
          {title}
        </div>
        <div className='text-xs sm:text-base md:text-lg lg:text-xl py-[4vw]'>
          {desc}
        </div>
        <div>
          <Link
            href={href}
            className="flex space-x-1 md:space-x-2 items-center w-fit p-3 md:p-4 bg-[#C1776D] rounded-3xl text-white transition-transform duration-200 hover:scale-105"
          >
            <div className='text-xs sm:text-base md:text-lg lg:text-xl'>
              {linkto}
            </div>
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </div>
  )
}