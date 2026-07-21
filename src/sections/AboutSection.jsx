import { useTranslation } from '../hooks/useTranslation'

const advantages = ['levels', 'quality', 'advice']

const advantageIcons = {
  levels: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
    </svg>
  ),
  quality: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  ),
  advice: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
}

export default function AboutSection() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-20 md:py-28 bg-sand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=500&fit=crop"
                alt="Library"
                className="w-full h-[440px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/15 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-xl bg-terracotta/10 -z-10" />
            <div className="absolute -top-5 -left-5 w-24 h-24 rounded-xl bg-gold/10 -z-10" />
            <div className="absolute bottom-6 left-6 bg-ivory/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg">
              <span className="font-['Playfair_Display'] text-3xl font-bold text-terracotta">12+</span>
              <span className="text-xs text-stone block mt-0.5">années d'expertise</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-terracotta bg-terracotta-light px-4 py-1.5 rounded-full self-start tracking-wider uppercase">
              {t('about.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.12]">
              {t('about.title')}
            </h2>
            <p className="text-stone leading-relaxed">{t('about.description')}</p>
            <div className="flex flex-col gap-5 mt-2">
              {advantages.map((key) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-ink flex items-center justify-center shrink-0 text-sand-light">
                    {advantageIcons[key]}
                  </div>
                  <div>
                    <h4 className="font-['DM_Sans'] font-bold text-ink">{t(`about.advantages.${key}.title`)}</h4>
                    <p className="text-sm text-stone">{t(`about.advantages.${key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
