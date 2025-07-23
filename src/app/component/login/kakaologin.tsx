"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function KakaoLoginButton() {

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
  const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!);
  const state = encodeURIComponent(redirect);

  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;


  return (
    <Link
      href={kakaoUrl}
      className='flex justify-center items-center space-x-4 bg-[#FEE500] rounded-4xl h-[60px] cursor-pointer'
    >
      <Image
        alt="카톡심볼"
        src="/kakaoSymbol.png"
        width={20}
        height={20}
        className='text-[#000000]'
      />
      <div className='text-[#000000] text-opacity-80'>카카오 로그인</div>
    </Link>
  )
}