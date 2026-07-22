import { useTranslation } from '../hooks/useTranslation'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[90vh] flex items-center bg-ivory overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-bl from-sand to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-terracotta-light/40 to-transparent" />
        <svg className="absolute top-1/4 right-[8%] w-24 h-24 text-sand-dark opacity-20" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="4" fill="currentColor" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 flex flex-col gap-6">
            <div className="animate-fade-up stagger-1">
              <span className="inline-block text-xs font-semibold text-terracotta bg-terracotta-light px-4 py-1.5 rounded-full tracking-wider uppercase">
                {t('about.badge')}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-ink leading-[1.08] tracking-tight animate-fade-up stagger-2">
              {t('hero.title')}
            </h1>

            <p className="text-lg sm:text-xl text-stone leading-relaxed max-w-lg animate-fade-up stagger-3">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 animate-fade-up stagger-4">
              <a
                href="#services"
                className="px-7 py-3 bg-ink text-white text-sm font-semibold rounded-lg hover:bg-ink-light shadow-sm hover:shadow-md transition-all duration-300"
              >
                {t('hero.cta_books')}
              </a>
              <a
                href="#services"
                className="px-7 py-3 border border-ink/15 text-ink text-sm font-semibold rounded-lg hover:border-terracotta/40 hover:text-terracotta transition-all duration-300"
              >
                {t('hero.cta_services')}
              </a>
            </div>
          </div>

          <div className="md:col-span-5 hidden md:flex items-center justify-center animate-fade-in stagger-5">
            <div className="relative">
              <div className="w-72 h-96 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=500&fit=crop"
                  alt="Library"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-48 h-32 rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&h=200&fit=crop"
                  alt="Books"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
              </div>
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-xl bg-terracotta flex items-center justify-center shadow-lg animate-float">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 30 C 360 70, 1080 10, 1440 30 L 1440 80 L 0 80 Z" fill="var(--color-sand-light)" />
        </svg>
      </div>
    </section>
  )
}
