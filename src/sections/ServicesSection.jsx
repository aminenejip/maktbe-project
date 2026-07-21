import { useTranslation } from '../hooks/useTranslation'
import { services } from '../data/services'
import ServiceCard from '../components/ServiceCard'

export default function ServicesSection() {
  const { t } = useTranslation()

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
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
