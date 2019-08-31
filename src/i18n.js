import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
    }
  },
  sl: {
    translation: {
      'Home': 'Domov',
      'Booklet': 'Knjiga',
      'User': 'Uporabnik',
      'Block': 'Bločno',
      'Text': 'Tekstovno',
      'Exercises': 'Naloge'
    }
  }
};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
