import { useTranslation } from '../../hooks/useTranslation'
import { getContactHref, getContactIcon } from '../../api/contact'

export default function ServiceModal({ service, onClose }) {
  const { t, lang } = useTranslation()

  if (!service) return null

  const name = lang === 'ar' && service.name_ar ? service.name_ar : lang === 'en' && service.name_en ? service.name_en : service.name
  const desc = lang === 'ar' && service.description_ar ? service.description_ar : lang === 'en' && service.description_en ? service.description_en : service.description
  const detailedDesc = lang === 'ar' && service.description_detailed_ar
    ? service.description_detailed_ar
    : lang === 'en' && service.description_detailed_en
      ? service.description_detailed_en
      : service.description_detailed || ''
  const contacts = service.coordonnees || []
  const images = service.images || []
  const hasImages = !!service.image || images.length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-ivory rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {hasImages && (
          <div className="space-y-2 p-2">
            {service.image && (
              <div className="aspect-video overflow-hidden rounded-xl">
                <img src={service.image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            {images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <div key={i} className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-ink">
              {name}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-sand-dark/30 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-stone" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {desc && (
            <p className="text-stone leading-relaxed mb-4">{desc}</p>
          )}

          {detailedDesc && (
            <div className="mb-6">
              <p className="text-stone text-sm leading-relaxed">{detailedDesc}</p>
            </div>
          )}

          {service.external_link && (
            <a
              href={service.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-terracotta/10 text-terracotta text-sm font-semibold hover:bg-terracotta/20 transition-all no-underline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              En savoir plus
            </a>
          )}

          {contacts.length > 0 && (
            <div className="mb-4">
              <h4 className="font-['DM_Sans'] font-bold text-ink text-sm mb-3">
                {t('services.contact')}
              </h4>
              <div className="flex flex-col gap-2">
                {contacts.map((contact) => (
                  <a
                    key={contact.id || contact.type}
                    href={getContactHref(contact)}
                    target={contact.type === 'phone' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sand-light hover:bg-sand-dark/40 transition-all duration-200 group no-underline"
                  >
                    <span className="w-10 h-10 rounded-lg bg-ink text-sand-light flex items-center justify-center group-hover:bg-terracotta transition-colors duration-300">
                      {getContactIcon(contact.type)}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-ink block">
                        {contact.label}
                      </span>
                      <span className="text-xs text-stone">{contact.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-6 w-full py-3 rounded-xl bg-ink text-ivory font-semibold text-sm hover:bg-ink-light transition-all duration-300 cursor-pointer"
          >
            {t('services.close')}
          </button>
        </div>
      </div>
    </div>
  )
}
