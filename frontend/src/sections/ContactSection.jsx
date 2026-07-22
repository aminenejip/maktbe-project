import { useState, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { getContactHref, getContactIcon } from '../api/contact'
import { api } from '../api/client'

export default function ContactSection() {
  const { t } = useTranslation()
  const [coordonnees, setCoordonnees] = useState([])

  useEffect(() => {
    api('/api/coordonnees')
      .then((r) => r.json())
      .then((data) => setCoordonnees(data.filter((c) => c.active !== false).sort((a, b) => a.order - b.order)))
      .catch(() => {})
  }, [])

  return (
    <section id="contact" className="py-20 md:py-28 bg-sand-light">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
            {t('contact.title')}
          </h2>
          <p className="text-stone mt-3 max-w-lg mx-auto">
            {t('contact.subtitle')}
          </p>
          <div className="mt-5 w-16 h-0.5 bg-gradient-to-r from-terracotta to-gold rounded-full mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {coordonnees.map((item) => (
            <a
              key={item.id}
              href={getContactHref(item)}
              target={item.type === 'phone' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] max-w-xs bg-white rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500 p-6 flex flex-col items-center text-center border border-transparent hover:border-terracotta/10 cursor-pointer no-underline"
            >
              <div className="w-14 h-14 rounded-xl bg-ink text-sand-light flex items-center justify-center mb-4 group-hover:bg-terracotta group-hover:text-white group-hover:scale-105 transition-all duration-500">
                {getContactIcon(item.type)}
              </div>
              <h3 className="font-['DM_Sans'] font-bold text-ink mb-1">
                {item.label}
              </h3>
              <p className="text-stone text-sm">{item.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
