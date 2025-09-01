// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend) // Charge les traductions depuis les fichiers
    .use(LanguageDetector) // Détecte automatiquement la langue du navigateur
    .use(initReactI18next) // Lie i18next avec React
    .init({
        fallbackLng: 'en', // Langue de secours si la traduction n'est pas trouvée
        supportedLngs: ['en', 'fr', 'es', 'de', 'ja', 'zh', 'ar', 'ru', 'pt', 'hi'],
        backend: {
            // Configure la recherche des fichiers de traduction
            loadPath: '/locales/{{lng}}/translation.json',
        },
        detection: {
            order: ['localStorage', 'navigator'], // Ordre de détection de la langue
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;