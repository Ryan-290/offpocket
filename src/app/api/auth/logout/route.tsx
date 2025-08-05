import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;

  const response = NextResponse.redirect(`${origin}/`);

  response.cookies.set('user_id', '', {
    path: '/',
    expires: new Date(0),
    httpOnly: true,
  });

  return response;
}