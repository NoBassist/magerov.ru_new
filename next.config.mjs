/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['en', 'ru'], // Список поддерживаемых языков
        defaultLocale: 'en', // Язык по умолчанию
    },
};
module.exports = nextConfig;