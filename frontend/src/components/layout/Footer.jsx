import { useState, useEffect } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import { getContactHref, getContactIcon } from '../../api/contact'

export default function Footer() {
  const { t, lang } = useTranslation()
  const [coordonnees, setCoordonnees] = useState([])

  useEffect(() => {
    fetch('/api/coordonnees')
      .then((r) => r.json())
      .then((data) => setCoordonnees(data.filter((c) => c.active !== false).sort((a, b) => a.order - b.order)))
      .catch(() => {})
  }, [])

  return (
    <footer className="bg-ink text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-ivory/10 flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
                  <path d="M8 24 L16 10 L24 24" stroke="#C75B39" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 21.5 L16 12.5 L22 21.5" stroke="#C9A94E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.5 19 L16 15 L19.5 19" stroke="#E8D5C4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="font-['Playfair_Display'] text-lg font-bold tracking-wide leading-none block">
                  OLA
                </span>
                <span className="text-[10px] font-medium text-stone-light tracking-[2.5px] uppercase leading-tight block">
                  {lang === 'ar' ? 'مكتبة مدرسية' : 'Librairie Scolaire'}
                </span>
              </div>
            </a>
            <p className="text-stone-light text-sm leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
            <p className="text-stone-light/60 text-xs mt-2">{t('footer.copyright')}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-['DM_Sans'] font-bold text-lg">{t('footer.contact_title')}</h3>
            <div className="flex flex-col gap-2">
              {coordonnees.map((item) => (
                <a
                  key={item.id}
                  href={getContactHref(item)}
                  target={item.type === 'phone' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-stone-light hover:text-terracotta transition-colors duration-200 group no-underline"
                >
                  <span className="w-8 h-8 rounded-lg bg-ivory/5 flex items-center justify-center shrink-0 group-hover:bg-terracotta/20 transition-colors">
                    {getContactIcon(item.type)}
                  </span>
                  <div>
                    <span className="text-xs text-stone-light/70 block">{item.label}</span>
                    <span className="text-sm text-ivory">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-['DM_Sans'] font-bold text-lg">{t('footer.contact_title')}</h3>
            <div className="flex flex-wrap gap-3">
              {coordonnees.map((item) => (
                <a
                  key={item.id}
                  href={getContactHref(item)}
                  target={item.type === 'phone' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-ivory/5 flex items-center justify-center text-stone-light hover:bg-terracotta hover:text-white transition-all duration-300"
                  title={item.label}
                >
                  {getContactIcon(item.type)}
                </a>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-xs text-stone-light/60">
              <a href="#" className="hover:text-terracotta transition-colors">
                {t('footer.legal')}
              </a>
              <a href="#" className="hover:text-terracotta transition-colors">
                {t('footer.privacy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
