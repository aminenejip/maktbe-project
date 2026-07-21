import { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'

const iconMap = {
  books: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  supplies: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
    </svg>
  ),
  stationery: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
  ),
  news: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
}

export default function ServiceCard({ service, onClick }) {
  const { t, lang } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  const name = lang === 'ar' && service.name_ar ? service.name_ar : lang === 'en' && service.name_en ? service.name_en : service.name
  const desc = lang === 'ar' && service.description_ar ? service.description_ar : lang === 'en' && service.description_en ? service.description_en : service.description
  const detailedDesc = lang === 'ar' && service.description_detailed_ar
    ? service.description_detailed_ar
    : lang === 'en' && service.description_detailed_en
      ? service.description_detailed_en
      : service.description_detailed || ''

  const iconId = typeof service.iconId === 'string' ? service.iconId : `icon_${service.id}`
  const images = service.images || []
  const hasExtra = detailedDesc || service.external_link

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500 border border-transparent hover:border-terracotta/10 flex flex-col w-full min-h-[340px]">
      <button
        onClick={onClick}
        className="flex-1 flex flex-col items-center text-center p-7 cursor-pointer w-full"
      >
        <div className="w-14 h-14 rounded-xl bg-ink text-sand-light flex items-center justify-center mb-5 group-hover:bg-terracotta group-hover:text-white transition-all duration-500 group-hover:scale-105">
          {iconMap[iconId] || iconMap.books}
        </div>
        <h3 className="font-['DM_Sans'] font-bold text-ink mb-2">{name}</h3>
        <p className="text-stone text-sm leading-relaxed">{desc}</p>
      </button>

      {hasExtra && (
        <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-7 pb-3">
            {detailedDesc && (
              <p className="text-stone text-xs leading-relaxed border-t border-sand-dark/20 pt-3">
                {detailedDesc}
              </p>
            )}
            {images.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {images.map((img, i) => (
                  <div key={i} className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            {service.external_link && (
              <a
                href={service.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs text-terracotta font-semibold hover:underline"
              >
                {t('news.read_more')}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-7 pb-7 mt-auto gap-2">
        {detailedDesc && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-xs text-terracotta font-semibold hover:text-terracotta-dark transition-colors hover:underline cursor-pointer"
          >
            {expanded ? 'Réduire' : t('news.read_more')}
          </button>
        )}
        <button
          onClick={onClick}
          className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center hover:bg-terracotta transition-all duration-300 hover:scale-110 cursor-pointer ml-auto"
          title={t('services.contact')}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
