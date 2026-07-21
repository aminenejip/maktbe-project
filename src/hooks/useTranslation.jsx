import { createContext, useContext, useState, useCallback } from 'react'
import fr from '../locales/fr.json'
import en from '../locales/en.json'

const translations = { fr, en }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')

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

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'fr' ? 'en' : 'fr'))
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider')
  return ctx
}
