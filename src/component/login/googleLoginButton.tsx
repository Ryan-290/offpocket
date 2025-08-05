'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function GoogleLoginButton() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const state = encodeURIComponent(redirect);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!);
  const scope = encodeURIComponent('openid email profile');

  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;

  return (
    <Link
      href={googleUrl}
      className="flex justify-center items-center space-x-4 bg-white border border-[#747775] rounded-4xl h-[60px] cursor-pointer"
    >
      <Image alt="구글로고" src="/googleLogo.png" width={24} height={24} />
      <div className="text-[#1F1F1F]">구글 로그인</div>
    </Link>
  );
}