import { useTranslation } from '../hooks/useTranslation'
import Header from '../components/layout/Header'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import NewsSection from '../sections/NewsSection'
import ContactSection from '../sections/ContactSection'
import Footer from '../components/layout/Footer'

export default function HomePage() {
  const { lang } = useTranslation()

  return (
    <div className={`min-h-screen ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <NewsSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
