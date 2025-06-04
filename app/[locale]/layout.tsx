import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { initI18n } from '@/i18n/initI18n';
import I18nProvider from '@/providers/I18nProvider.client';

export const metadata: Metadata = {
    title: 'Magerov',
    description: 'We bring your ideas to life with sound'
};

export default async function RootLayout({
                                       children,
                                       params,
                                   }: {
    children: ReactNode;
    params: { lang: 'en' | 'ru' };
}) {
    await initI18n(params.lang);
    return (
        <html lang={params.lang}>
        <body>
        <I18nProvider>
            <SmoothScroll>{children}</SmoothScroll>
        </I18nProvider>
        </body>
        </html>
    );
}