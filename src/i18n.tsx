import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa los archivos de traducciones
import enTranslation from './locales/en/translation.json'; 
import esTranslation from './locales/es/translation.json';

i18next
  .use(initReactI18next) // Conecta i18next con React
  .init({
    resources: {
      en: {
        translation: enTranslation, // Traducciones en inglés
      },
      es: {
        translation: esTranslation, // Traducciones en español
      },
    },
    lng: 'en', // Idioma por defecto
    fallbackLng: 'en', // Idioma de respaldo si falla la traducción
    interpolation: {
      escapeValue: false, // Permite usar HTML en traducciones si es necesario
    },
  });

export default i18next;