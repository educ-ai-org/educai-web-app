import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    ns: ['home', 'login', 'turma', 'landingPage', 'talkWithEdu', 'material', 'criarAtividade'],
    defaultNS: 'landingPage', // Adicione o namespace default correto
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json' // Verifique se esse caminho está correto
    }
  })

export default i18n
