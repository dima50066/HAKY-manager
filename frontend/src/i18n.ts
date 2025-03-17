import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { store } from "./redux/store";
import { selectLanguage } from "./redux/profile/selectors";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    defaultNS: "translation",
    ns: ["translation"],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

setTimeout(() => {
  try {
    const state = store.getState();
    const userLanguage = selectLanguage(state) || "en";
    if (userLanguage) {
      i18n.changeLanguage(userLanguage);
    }
  } catch (error) {
    console.error("Error getting user language from Redux:", error);
  }
}, 100);

export default i18n;
