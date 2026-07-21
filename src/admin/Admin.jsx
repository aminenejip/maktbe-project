import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'
import AdminDashboard from './AdminDashboard'
import AdminContent from './AdminContent'
import AdminBooks from './AdminBooks'
import AdminBundles from './AdminBundles'
import AdminContacts from './AdminContacts'
import AdminNewsletter from './AdminNewsletter'
import AdminSettings from './AdminSettings'

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token'))
  const navigate = useNavigate()

  useEffect(() => {
    if (token) sessionStorage.setItem('admin_token', token)
    else sessionStorage.removeItem('admin_token')
  }, [token])

  const handleLogin = (newToken) => {
    setToken(newToken)
    navigate('/admin')
  }

  const handleLogout = () => {
    setToken(null)
    navigate('/admin')
  }

  if (!token) return <AdminLogin onLogin={handleLogin} />

  return (
    <AdminLayout onLogout={handleLogout}>
      <Routes>
        <Route index element={<AdminDashboard token={token} />} />
        <Route path="content" element={<AdminContent token={token} />} />
        <Route path="books" element={<AdminBooks token={token} />} />
        <Route path="bundles" element={<AdminBundles token={token} />} />
        <Route path="contacts" element={<AdminContacts token={token} />} />
        <Route path="newsletter" element={<AdminNewsletter token={token} />} />
        <Route path="settings" element={<AdminSettings token={token} />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </AdminLayout>
  )
}
