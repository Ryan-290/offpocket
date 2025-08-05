
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const redirectPath = req.nextUrl.searchParams.get('state') || '/';

  console.log('[🔁 KAKAO CALLBACK START]');
  console.log('[🌐 CODE]', code);
  console.log('[🌐 REDIRECT PATH]', redirectPath);

  if (!code) {
    return NextResponse.redirect('/login?error=missing_code');
  }

  // 1. 액세스 토큰 요청
  const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_REST_API_KEY!,
      redirect_uri: process.env.KAKAO_REDIRECT_URI!,
      code,
      client_secret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  });

  const tokenData = await tokenRes.json();

  console.log('[🌐 TOKEN DATA]', tokenData);

  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return NextResponse.redirect('/login?error=token_failed');
  }

  // 2. 사용자 정보 요청
  const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const userData = await userRes.json();

  console.log('[🌐 USER DATA]', userData);

  const kakaoId = userData.id?.toString();
  const kakaoAccount = userData.kakao_account || {};
  const profile = kakaoAccount.profile || {};

  const email = kakaoAccount.email ?? null;
  const nickname = profile.nickname ?? null;
  const profile_image = profile.profile_image_url ?? null;
  const gender = kakaoAccount.gender ?? null;
  const birthday = kakaoAccount.birthday ?? null;

  // 3. Supabase에 유저 저장 or 조회
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('provider', 'kakao')
    .eq('provider_user_id', kakaoId)
    .single();

  if (!existingUser) {
    await supabase.from('users').insert([
      {
        provider: 'kakao',
        provider_user_id: kakaoId,
        email,
        nickname,
        profile_image,
        gender,
        birthday,
      },
    ]);
  }

  // 4. 로그인 세션 쿠키 저장 (간단히 user_id만 저장)
  const response = NextResponse.redirect(new URL(redirectPath, req.url));
  response.cookies.set('user_id', kakaoId, {
    path: '/',
    httpOnly: true,
  });

  return response;
}