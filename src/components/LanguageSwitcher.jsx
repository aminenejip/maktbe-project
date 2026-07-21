import { useTranslation } from '../hooks/useTranslation'

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
]

export default function LanguageSwitcher() {
  const { lang, setLanguage } = useTranslation()

  return (
    <div className="flex items-center gap-1">
      {languages.map((l, i) => (
        <span key={l.code} className="flex items-center">
          <button
            onClick={() => setLanguage(l.code)}
            className={`px-2 py-1.5 rounded-lg text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              lang === l.code
                ? 'text-ink font-semibold bg-sand-dark/40'
                : 'text-stone hover:text-terracotta'
            }`}
            aria-label={`Switch to ${l.label}`}
          >
            {l.label}
          </button>
          {i < languages.length - 1 && (
            <span className="text-stone-light mx-0.5 text-xs">/</span>
          )}
        </span>
      ))}
    </div>
  )
}
