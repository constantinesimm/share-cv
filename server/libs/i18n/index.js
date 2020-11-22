const { join } = require('path');
const i18n = require('i18n');

i18n.configure({
    locales: ['en', 'uk', 'ru'],
    defaultLocale: 'en',
    directory: join(__dirname, '/locales'),
    header: 'accept-language',
    register: global
});

module.exports = i18n;
