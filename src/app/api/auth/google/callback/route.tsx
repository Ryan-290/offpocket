import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const redirectPath = req.nextUrl.searchParams.get('state') || '/';

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', req.url));
  }

  // 1. 토큰 요청
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
    }),
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login?error=token_failed', req.url));
  }

  // 2. 유저 정보 요청
  const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const user = await userRes.json();

  const googleId = user.sub;
  const email = user.email ?? null;
  const nickname = user.name ?? null;
  const profile_image = user.picture ?? null;

  // 3. Supabase 저장 or 조회
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('provider', 'google')
    .eq('provider_user_id', googleId)
    .single();

  if (!existingUser) {
    await supabase.from('users').insert([
      {
        provider: 'google',
        provider_user_id: googleId,
        email,
        nickname,
        profile_image,
      },
    ]);
  }

  // 4. 쿠키 저장 및 리다이렉트
  const response = NextResponse.redirect(new URL(redirectPath, req.url));
  response.cookies.set('user_id', googleId, {
    path: '/',
    httpOnly: true,
  });

  return response;
}
