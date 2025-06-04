// payload/globals/i18nHooks.ts
import type { GlobalAfterReadHook, GlobalBeforeChangeHook } from 'payload';

/** Рекурсивно удаляем ключ 'raw' и system-поля, возвращаем остальное */
const strip = (obj: any): any =>
    Object.fromEntries(
        Object.entries(obj)
            .filter(([k]) => !['id', 'raw', '_verified'].includes(k))
            .map(([k, v]) => [k, v && typeof v === 'object' ? strip(v) : v]),
    );

/** beforeChange: собираем все UI-поля → raw */
export const pack: GlobalBeforeChangeHook = async (args): Promise<any> => {
    const { data, locale } = args as any;
    const raw = strip(data);       // оставляем только пользовательские поля
    return { ...data, raw: { ...(data.raw ?? {}), [locale || 'en']: raw[locale || 'en'] ?? raw } };
};

/** afterRead: рассыпаем raw обратно в UI-поля, чтобы админ видел значения */
export const unpack: GlobalAfterReadHook = async (args): Promise<any> => {
    const { doc, locale } = args as any;
    if (!doc.raw) return doc;
    const merge = (src: any, dest: any): any => {
        for (const [k, v] of Object.entries(src)) {
            dest[k] = typeof v === 'object' && !Array.isArray(v) ? merge(v, dest[k] || {}) : v;
        }
        return dest;
    };
    return merge(doc.raw[locale || 'en'] || doc.raw.en || {}, doc);  // при открытии админки
};