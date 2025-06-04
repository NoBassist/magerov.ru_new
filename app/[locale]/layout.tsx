import './globals.css';
import type { Metadata } from 'next';
import SmoothScroll from '@/components/ui/SmoothScroll';
import I18nProvider from '@/providers/I18nProvider.client';
import { loadAllLocales } from '@/i18n/loadAllLocales';
import { cookies, headers } from 'next/headers';
import i18n from '@/i18n/config';
import React from "react";


export const metadata: Metadata = {
    title: 'Magerov',
    description: 'We bring your ideas to life with sound'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    await loadAllLocales();              // оба словаря в памяти

    // определяем язык: cookie → Accept-Language
    const cookieLang = (await cookies()).get('lang')?.value as 'en' | 'ru' | undefined;
    const headerLang = ((await headers()).get('accept-language') ?? '').slice(0, 2) as 'en' | 'ru';
    const lang = cookieLang ?? (headerLang === 'ru' ? 'ru' : 'en');

    await i18n.changeLanguage(lang);           // синхронно (ресурс уже есть)

    return (
        <html lang={lang}>
        <body>
        <I18nProvider>
            <SmoothScroll>{children}</SmoothScroll>
        </I18nProvider>
        </body>
        </html>
    );
}