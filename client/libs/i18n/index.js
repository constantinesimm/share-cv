import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from '@/libs/i18n/locales/en.json';
import ukLocale from '@/libs/i18n/locales/uk.json';
import ruLocale from '@/libs/i18n/locales/ru.json';

/**
 * Element UI locale
 */
import enElem from 'element-ui/lib/locale/lang/en';
import ukElem from 'element-ui/lib/locale/lang/ua';
import ruElem from 'element-ui/lib/locale/lang/ru-RU';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...enElem
  },
  uk: {
    ...ukLocale,
    ...ukElem
  },
  ru: {
    ...ruLocale,
    ...ruElem
  }
};

const PreferredLocale = (locale) => {
    const browserLang = window.navigator.language ||  window.navigator.userLanguage;

    locale = browserLang.substring(0, 2).toLowerCase();

    return locale;
};

const i18n = new VueI18n({
  locale: PreferredLocale(),
  fallbackLocale: 'en',
  messages
});

export default i18n;
