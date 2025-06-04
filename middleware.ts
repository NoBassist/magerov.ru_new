// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
export function middleware(req: NextRequest) {
  if (req.cookies.has('lang')) return NextResponse.next();
  const h = req.headers.get('accept-language') ?? '';
  const lang = h.slice(0, 2) === 'ru' ? 'ru' : 'en';
  const res = NextResponse.next();
  res.cookies.set('lang', lang, { path: '/', maxAge: 31536000 });
  return res;
}
export const config = { matcher: '/' };