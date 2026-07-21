import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import LanguageSwitcher from './LanguageSwitcher'
import { getContactHref, getContactIcon } from '../utils/contactActions'

const navKeys = ['home', 'services', 'news', 'about', 'contact']

export default function Header() {
  const { t, lang } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [coordonnees, setCoordonnees] = useState([])
  const [coordonneesOpen, setCoordonneesOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    fetch('/api/coordonnees')
      .then((r) => r.json())
      .then((data) => setCoordonnees(data.filter((c) => c.active !== false).sort((a, b) => a.order - b.order)))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCoordonneesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/90 backdrop-blur-lg shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-ink flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
              <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                <path d="M8 24 L16 10 L24 24" stroke="#C75B39" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 21.5 L16 12.5 L22 21.5" stroke="#C9A94E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5 19 L16 15 L19.5 19" stroke="#E8D5C4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="font-['Playfair_Display'] text-lg font-bold text-ink tracking-wide leading-none block">
                OLA
              </span>
              <span className="text-[10px] font-medium text-stone tracking-[2.5px] uppercase leading-tight block">
                {lang === 'ar' ? 'مكتبة مدرسية' : 'Librairie Scolaire'}
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navKeys.map((key) => (
              <a
                key={key}
                href={key === 'home' ? '#' : `#${key}`}
                className="px-3 py-2 text-sm font-medium text-stone hover:text-terracotta rounded-lg hover:bg-terracotta-light/50 transition-all duration-200"
              >
                {t(`nav.${key}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                onClick={() => setCoordonneesOpen(!coordonneesOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ink text-white text-sm font-semibold hover:bg-ink-light shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {t('coordonnees.title')}
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${coordonneesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {coordonneesOpen && (
                <div className={`absolute top-full mt-2 bg-ivory rounded-xl shadow-xl border border-sand-dark/30 py-2 min-w-[220px] z-50 ${lang === 'ar' ? 'left-0' : 'right-0'}`}>
                  {coordonnees.map((item) => (
                    <a
                      key={item.id}
                      href={getContactHref(item)}
                      target={item.type === 'phone' ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      onClick={() => setCoordonneesOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-stone hover:text-ink hover:bg-sand-light transition-all duration-200 no-underline"
                    >
                      <span className="w-8 h-8 rounded-lg bg-sand-dark/30 flex items-center justify-center text-stone shrink-0">
                        {getContactIcon(item.type)}
                      </span>
                      <div>
                        <span className="font-medium text-ink block text-xs">
                          {item.label}
                        </span>
                        <span className="text-xs text-stone-light">{item.value}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-ink/5 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-sand-dark bg-ivory">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navKeys.map((key) => (
              <a
                key={key}
                href={key === 'home' ? '#' : `#${key}`}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-3 text-sm font-medium text-stone hover:text-terracotta rounded-lg hover:bg-terracotta-light/50 transition-all duration-200"
              >
                {t(`nav.${key}`)}
              </a>
            ))}
            <div className="mt-2 border-t border-sand-dark/30 pt-2">
              <span className="px-3 py-2 text-xs font-semibold text-stone-light uppercase tracking-wider">
                {t('coordonnees.title')}
              </span>
              {coordonnees.map((item) => (
                <a
                  key={item.id}
                  href={getContactHref(item)}
                  target={item.type === 'phone' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-sm text-stone hover:text-terracotta rounded-lg hover:bg-terracotta-light/50 transition-all duration-200 no-underline"
                >
                  <span className="w-8 h-8 rounded-lg bg-sand-dark/30 flex items-center justify-center text-stone shrink-0">
                    {getContactIcon(item.type)}
                  </span>
                  <div>
                    <span className="font-medium text-ink block text-xs">{item.label}</span>
                    <span className="text-xs text-stone-light">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
