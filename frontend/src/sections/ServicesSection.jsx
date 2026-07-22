import { useState, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ServiceCard from '../components/ui/ServiceCard'
import ServiceModal from '../components/ui/ServiceModal'

export default function ServicesSection() {
  const { t } = useTranslation()
  const [services, setServices] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then(setServices)
      .catch(() => {})
  }, [])

  const activeServices = services.filter((s) => s.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  if (activeServices.length === 0) return null

  return (
    <section id="services" className="py-20 md:py-28 bg-sand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
            {t('services.title')}
          </h2>
          <div className="mt-5 w-16 h-0.5 bg-gradient-to-r from-terracotta to-gold rounded-full mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activeServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => setSelected(service)}
            />
          ))}
        </div>
      </div>

      <ServiceModal
        service={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
