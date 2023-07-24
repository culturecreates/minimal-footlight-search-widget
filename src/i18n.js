import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import Backend from "i18next-http-backend";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
});

export default i18n;
