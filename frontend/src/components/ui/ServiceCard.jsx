import { useTranslation } from '../../hooks/useTranslation'

export default function ServiceCard({ service, onClick }) {
  const { t, lang } = useTranslation()

  const name = lang === 'ar' && service.name_ar ? service.name_ar : lang === 'en' && service.name_en ? service.name_en : service.name
  const desc = lang === 'ar' && service.description_ar ? service.description_ar : lang === 'en' && service.description_en ? service.description_en : service.description
  const hasImage = !!service.image

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-pointer border border-transparent hover:border-terracotta/10"
    >
      {hasImage && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={service.image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}
      <div className={`${hasImage ? 'p-5' : 'p-6'}`}>
        <h3 className="font-['Playfair_Display'] text-lg font-bold text-ink group-hover:text-terracotta transition-colors">
          {name}
        </h3>
        {desc && (
          <p className="text-stone text-sm mt-2 leading-relaxed line-clamp-3">
            {desc}
          </p>
        )}
        <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-terracotta group-hover:gap-2.5 transition-all">
          {t('services.learn_more')}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </div>
  )
}
