"use client";

import Image from 'next/image';

import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginButton() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?redirect=${redirect}`,
      },
    });
  };

  return (
    <div className="flex flex-col space-y-4 w-full py-10">
      <button
        onClick={handleLogin}
        className="flex justify-center items-center space-x-4 bg-white border border-[#747775] rounded-4xl h-[60px] cursor-pointer"
      >
        <Image alt="구글로고" src="/googleLogo.png" width={24} height={24} />
        <div className="text-[#1F1F1F]">구글 로그인</div>
      </button>
    </div>
  );
}