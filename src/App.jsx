import { Routes, Route } from 'react-router-dom'
import { LanguageProvider, useTranslation } from './hooks/useTranslation'
import Header from './components/Header'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import NewsSection from './sections/NewsSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'
import AdminApp from './AdminApp'
import LoginPage from './pages/admin/LoginPage'

function HomePage() {
  const { lang } = useTranslation()

  return (
    <div className={lang === 'ar' ? 'rtl' : 'ltr'}>
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

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/*" element={<AdminApp />} />
      <Route
        path="/*"
        element={
          <LanguageProvider>
            <div className="min-h-screen">
              <HomePage />
            </div>
          </LanguageProvider>
        }
      />
    </Routes>
  )
}