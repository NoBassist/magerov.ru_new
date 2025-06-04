// lib/loadAllLocales.ts
import i18n from '@/i18n/config';
import { getPayloadServer } from '@/lib/payloadServer';

export async function loadAllLocales() {
    if (i18n.hasResourceBundle('en', 'translation')) return;   // уже есть

    const payload = await getPayloadServer();

    // берём сразу обе локали
    const dictRaw = await payload.findGlobal<any, any>({
        slug: 'pages',
        locale: 'all',
    });

    // helper превращает {"title": {"en":"…","ru":"…"}} → два объекта
    const pick = (lang: 'en' | 'ru') =>
        JSON.parse(JSON.stringify(dictRaw), (_k, v) =>
            v && typeof v === 'object' && lang in v ? v[lang] : v,
        );

    i18n.addResourceBundle('en', 'translation', pick('en'), true, true);
    i18n.addResourceBundle('ru', 'translation', pick('ru'), true, true);
}