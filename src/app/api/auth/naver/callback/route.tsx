import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state') || '/';

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', req.url));
  }

  // 1. 토큰 요청
  const tokenRes = await fetch('https://nid.naver.com/oauth2.0/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
      client_secret: process.env.NAVER_CLIENT_SECRET!,
      redirect_uri: process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI!,
      code,
    }),
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login?error=token_failed', req.url));
  }

  // 2. 유저 정보 요청
  const userRes = await fetch('https://openapi.naver.com/v1/nid/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const userJson = await userRes.json();

  const user = userJson.response;
  const naverId = user.id?.toString();
  const email = user.email ?? null;
  const nickname = user.nickname ?? null;
  const profile_image = user.profile_image ?? null;
  const gender = user.gender ?? null;
  const birth = user.birthyear ?? null;

  if (!naverId) {
    return NextResponse.redirect(new URL('/login?error=user_data_invalid', req.url));
  }

  // 3. Supabase에 유저 저장 or 조회
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('provider', 'naver')
    .eq('provider_user_id', naverId)
    .single();

  if (!existingUser) {
    await supabase.from('users').insert([
      {
        provider: 'naver',
        provider_user_id: naverId,
        email,
        nickname,
        profile_image,
        gender,
        birthday: birth,
      },
    ]);
  }

  // 4. 세션 쿠키 저장 및 리다이렉트
  const response = NextResponse.redirect(new URL(state, req.url));
  response.cookies.set('user_id', naverId, {
    path: '/',
    httpOnly: true,
  });

  return response;
}
