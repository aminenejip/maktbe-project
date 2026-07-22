import { Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './hooks/useTranslation'
import HomePage from './pages/HomePage'
import AdminApp from './AdminApp'
import LoginPage from './pages/admin/LoginPage'

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/*" element={<AdminApp />} />
      <Route
        path="/*"
        element={
          <LanguageProvider>
            <HomePage />
          </LanguageProvider>
        }
      />
    </Routes>
  )
}
