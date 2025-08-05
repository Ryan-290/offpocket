"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function NaverLoginButton() {

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/'; // 원래 가고자 했던 경로

  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!;
  const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI!);
  const state = encodeURIComponent(redirect); // state로 전달

  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
  console.log('[🔐 NAVER LOGIN URL]', naverUrl);

  return (
    <Link 
      href={naverUrl}
      className='flex justify-center items-center space-x-2 bg-[#03C75A] rounded-4xl h-[60px] cursor-pointer'
    >
        <Image
          alt="네이버로고"
          src="/naverLogo.png"
          width={35}
          height={35}
          className='text-white'
        />
        <div className='text-white'>네이버 로그인</div>
    </Link>
  );
}