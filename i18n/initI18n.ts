// i18n/initServer.ts
import { getPayloadServer } from '@/lib/payloadServer';
import i18n from '@/i18n/config';

export async function addServerDictionary(lang: 'en' | 'ru') {
    if (i18n.hasResourceBundle(lang, 'translation')) return;
    const payload = await getPayloadServer();
    const { raw } = await payload.findGlobal<any, any>({
      slug: 'translations',
      locale: lang,
    }); // raw локализован
    i18n.addResourceBundle(lang, 'translation', raw[lang] ?? raw.en, true, true);
}