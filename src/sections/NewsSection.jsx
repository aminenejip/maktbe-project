import { useState, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'

const fallbackIcon = (
  <svg className="w-10 h-10 text-stone-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
  </svg>
)

export default function NewsSection() {
  const { t, lang } = useTranslation()
  const [news, setNews] = useState([])
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then(setNews)
      .catch(() => {})
  }, [])

  const activeNews = news.filter((n) => n.published !== false)
    .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))

  if (activeNews.length === 0) return null

  const toggleExpand = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <section id="news" className="py-20 md:py-28 bg-sand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
            {t('news.title')}
          </h2>
          <div className="mt-5 w-16 h-0.5 bg-gradient-to-r from-terracotta to-gold rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeNews.map((item) => {
            const detailedDesc = lang === 'ar' && item.description_detailed_ar
              ? item.description_detailed_ar
              : lang === 'en' && item.description_detailed_en
                ? item.description_detailed_en
                : item.description_detailed || ''
            const isExpanded = expanded[item.id]
            const images = item.images || []
            const hasExtra = detailedDesc || item.external_link

            return (
              <article
                key={item.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden border border-transparent hover:border-terracotta/10 flex flex-col"
              >
                {item.image ? (
                  <div className="aspect-[16/9] overflow-hidden bg-sand-dark/30">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-sand-dark/20 flex items-center justify-center">
                    {fallbackIcon}
                  </div>
                )}

                <div className="p-5 flex flex-col flex-1">
                  {item.createdAt && (
                    <time className="text-xs text-stone-light font-medium mb-2">
                      {t('news.published_on')}{' '}
                      {new Date(item.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-MA' : lang === 'en' ? 'en-US' : 'fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  )}
                  <h3 className="font-['DM_Sans'] font-bold text-ink text-lg mb-2">
                    {lang === 'ar' && item.title_ar ? item.title_ar : lang === 'en' && item.title_en ? item.title_en : item.title}
                  </h3>

                  <p className={`text-stone text-sm leading-relaxed ${!isExpanded && detailedDesc ? 'line-clamp-3' : ''}`}>
                    {lang === 'ar' && item.description_ar
                      ? item.description_ar
                      : lang === 'en' && item.description_en
                        ? item.description_en
                        : item.description}
                  </p>

                  {hasExtra && (
                    <>
                      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 mt-3' : 'max-h-0'}`}>
                        {detailedDesc && (
                          <p className="text-stone text-sm leading-relaxed border-t border-sand-dark/20 pt-3">
                            {detailedDesc}
                          </p>
                        )}
                        {images.length > 0 && (
                          <div className="flex gap-2 mt-3 overflow-x-auto">
                            {images.map((img, i) => (
                              <div key={i} className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                        {item.external_link && (
                          <a
                            href={item.external_link}
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

                      <div className="flex items-center gap-3 mt-3">
                        {detailedDesc && (
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="text-xs text-terracotta font-semibold hover:underline cursor-pointer"
                          >
                            {isExpanded ? 'Réduire' : t('news.read_more')}
                          </button>
                        )}
                        {item.external_link && !detailedDesc && (
                          <a
                            href={item.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-terracotta font-semibold hover:underline"
                          >
                            {t('news.read_more')}
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
