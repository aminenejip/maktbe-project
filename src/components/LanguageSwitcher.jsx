import { useTranslation } from '../hooks/useTranslation'

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useTranslation()

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-ink/10 text-xs font-medium text-stone hover:border-terracotta/30 hover:text-terracotta transition-all duration-300 cursor-pointer tracking-wider uppercase"
      aria-label="Switch language"
    >
      <span className={lang === 'fr' ? 'text-ink font-semibold' : ''}>fr</span>
      <span className="text-stone-light mx-0.5">/</span>
      <span className={lang === 'en' ? 'text-ink font-semibold' : ''}>en</span>
    </button>
  )
}
