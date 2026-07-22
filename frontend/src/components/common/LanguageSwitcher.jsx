import { useTranslation } from '../../hooks/useTranslation'

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'العربية' },
]

export default function LanguageSwitcher() {
  const { lang, setLanguage } = useTranslation()

  return (
    <div className="flex items-center gap-1 bg-sand-dark/40 rounded-lg p-0.5">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer ${
            lang === l.code
              ? 'bg-ivory text-ink shadow-sm'
              : 'text-stone-light hover:text-ink'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
