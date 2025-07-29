import i18n, { t } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import RFP_en from "./translations/RFP_en.json";
import RFP_nl from "./translations/RFP_nl.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    resources: {
      en: {
        RFP: RFP_en,
      },
      nl: {
        RFP: RFP_nl,
      },
    },

    detection: {
      order: ["htmlTag"], // ✅ only use <html lang="...">
      caches: [], // ❌ disable caching
    },
  });

export type T = typeof t;

export default i18n;
