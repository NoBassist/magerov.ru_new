import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'ru'] as const;
const DEFAULT = 'en';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // язык уже в URL?  (/en/…  или  /ru/…)
  const urlLang = pathname.match(/^\/(en|ru)(?=\/|$)/)?.[1] as
      | 'en'
      | 'ru'
      | undefined;

  if (!urlLang) {
    // если нет — решаем из Accept-Language или берём default
    const header = req.headers.get('accept-language') ?? '';
    const prefer = header.slice(0, 2);               // «en», «ru», «fr»…
    const lang = LOCALES.includes(prefer as any) ? prefer : DEFAULT;
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url));
  }

  return NextResponse.next();
}

// пропускаем статику, _next, api
export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};