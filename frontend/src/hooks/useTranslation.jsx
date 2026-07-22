import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import fr from '../locales/fr.json'
import en from '../locales/en.json'
import ar from '../locales/ar.json'

const translations = { fr, en, ar }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return sessionStorage.getItem('app_lang') || 'fr'
  })

  useEffect(() => {
    sessionStorage.setItem('app_lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const t = useCallback(
    (path) => {
      const keys = path.split('.')
      let result = translations[lang]
      for (const key of keys) {
        result = result?.[key]
      }
      return result ?? path
    },
    [lang]
  )

  const setLanguage = useCallback((newLang) => {
    if (translations[newLang]) setLang(newLang)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider')
  return ctx
}
