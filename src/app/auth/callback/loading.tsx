'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthCallbackLoadingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("[❌ Session Error]", error.message);
        router.push("/login?error=session");
        return;
      }

      if (session) {
        // 🔄 로그인 성공 시 리디렉트
        router.push(redirect);
      } else {
        // ❗ session 없을 경우 로그인 실패 처리
        router.push("/login?error=no-session");
      }
    };

    checkSession();
  }, [redirect, router]);

  return <p className="text-center mt-10">로그인 처리 중입니다...</p>;
}