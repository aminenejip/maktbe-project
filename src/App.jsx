import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './hooks/useTranslation'
import Header from './components/Header'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import BooksSection from './sections/BooksSection'
import ServicesSection from './sections/ServicesSection'
import BundlesSection from './sections/BundlesSection'
import PromoSection from './sections/PromoSection'
import NewsletterSection from './sections/NewsletterSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'
import Admin from './admin/Admin'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <BooksSection />
        <ServicesSection />
        <BundlesSection />
        <PromoSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
    </LanguageProvider>
  )
}
