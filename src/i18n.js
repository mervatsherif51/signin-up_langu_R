import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import english  from './Languages/en.json';
import  arabic  from './Languages/ar.json';
import français  from './Languages/fr.json';

const resources = {
  en: {
    translation: english
  },
  ar: {
    translation: arabic
  },

  fr: {
    translation:  français
  }
};

i18n.use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection: {
      order: ['localStorage','htmlTag' ],
      caches: ['localStorage'],

    },


    interpolation: {
      escapeValue: false // react already safes from xss
    },

    react: {
      useSuspense: false
    }
  });

  export default i18n;