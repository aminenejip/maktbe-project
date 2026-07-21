import { useTranslation } from '../hooks/useTranslation'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-ink text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-ivory/10 flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
                  <path d="M8 24 L16 10 L24 24" stroke="#C75B39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 21.5 L16 12.5 L22 21.5" stroke="#C9A94E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.5 19 L16 15 L19.5 19" stroke="#E8D5C4" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="font-['Playfair_Display'] text-lg font-bold tracking-wide leading-none block">
                  OLA
                </span>
                <span className="text-[10px] font-medium text-stone-light tracking-[2.5px] uppercase leading-tight block">
                  Librairie Scolaire
                </span>
              </div>
            </a>
            <p className="text-stone-light text-sm leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
            <p className="text-stone-light/60 text-xs mt-2">{t('footer.copyright')}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-['DM_Sans'] font-bold text-lg">{t('footer.newsletter_title')}</h3>
            <p className="text-stone-light text-sm">{t('footer.newsletter_desc')}</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder={t('footer.newsletter_placeholder')}
                className="flex-1 px-4 py-3 rounded-lg bg-ivory/5 border border-ivory/10 text-ivory placeholder:text-stone-light/50 text-sm focus:outline-none focus:border-terracotta/50 transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-lg bg-terracotta text-ivory text-sm font-semibold hover:bg-terracotta-dark transition-colors whitespace-nowrap cursor-pointer"
              >
                {t('footer.newsletter_cta')}
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-['DM_Sans'] font-bold text-lg">{t('footer.contact_title')}</h3>
            <div className="flex flex-col gap-3 text-sm text-stone-light">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-terracotta shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>{t('footer.email')}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-terracotta shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
                <span>{t('footer.whatsapp')}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-terracotta shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.5 6.5v12a2 2 0 01-2 2h-13a2 2 0 01-2-2v-12a2 2 0 012-2h13a2 2 0 012 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                <span>{t('footer.instagram')}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-terracotta shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-terracotta shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t('footer.hours')}</span>
              </div>
            </div>
            <div className="flex gap-4 mt-2 text-xs text-stone-light/60">
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
