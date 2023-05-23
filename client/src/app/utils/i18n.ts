import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '@/app/constants/locales/en.json';
import ruTranslation from '@/app/constants/locales/ru.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslation
            },
            ru: {
                translation: ruTranslation
            }
        },
        lng: 'ru',
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;