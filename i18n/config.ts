import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { InitOptions } from 'i18next';

export function initClientI18n() {
    if (!i18n.isInitialized) {
        i18n
            .use(HttpBackend)          // грузит JSON‑файлы /locales/{{lng}}/{{ns}}.json
            .use(LanguageDetector)     // читает cookie «lang», <html lang>, navigator…
            .use(initReactI18next)
            .init({
                fallbackLng: 'ru',
                supportedLngs: ['ru', 'en'],
                ns: ['translation'],
                defaultNS: 'translation',
                detection: {
                    order: ['cookie', 'htmlTag', 'navigator'],
                    lookupCookie: 'lang',
                    caches: ['cookie']
                },
                backend: {
                    loadPath: '/locales/{{lng}}/{{ns}}.json'  // файлы лежат в public/locales
                },
                interpolation: {
                    escapeValue: false
                }
            } as InitOptions);
    }
    return i18n;
}

/* Синглтон: сразу инициализируем, чтобы можно было
   import i18n from '@/i18n/config' */
export default initClientI18n();