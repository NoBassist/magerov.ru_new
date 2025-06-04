// i18n/initI18n.ts
import i18n from '@/i18n/config';
import { getPayloadServer } from '@/lib/payloadServer';

function stripArrayObjects(obj: unknown): unknown {
    // hero.section1.text2 -> [{ value: 'x' }, { value: 'y' }]  →  ['x','y']
    if (Array.isArray(obj)) return obj.map((el) =>
        typeof el === 'object' && el && 'value' in el ? (el as any).value : el
    );
    if (obj && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k, stripArrayObjects(v)]),
        );
    }
    return obj;
}

export async function initI18n(locale: 'en' | 'ru') {
    if (i18n.hasResourceBundle(locale, 'translation')) return;

    const payload = await getPayloadServer();
    const { data } = await payload.findGlobal({
        slug: 'translations',
        locale,
    });

    // убираем { value } из массивов, оставляя массив строк
    const dictionary = stripArrayObjects(data);

    i18n.addResourceBundle(locale, 'translation', dictionary, true, true);
}