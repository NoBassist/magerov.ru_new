// i18n/config.ts
import i18n, { InitOptions } from 'i18next';

const options: InitOptions = {
  resources: {},            // словари добавим вручную (loadAllLocales)
  fallbackLng: 'ru',
  detection: {
    order: ['cookie', 'htmlTag', 'navigator'],
    caches: ['cookie'],
    lookupCookie: 'lang',   // корректное имя поля вместо cookieName
  },
  interpolation: { escapeValue: false },
  react: { useSuspense: false },   // будет активировано только в браузере
};

if (!i18n.isInitialized) {
  i18n.init(options);
}

export default i18n;