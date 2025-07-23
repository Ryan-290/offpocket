'use client';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="hover:text-[#DBA39A]"
    >
      <IoArrowBack className='w-[20px] sm:w-[35px] h-[20px] sm:h-[35px]'/>
    </button>
  );
}