import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import DashboardPage from './pages/admin/DashboardPage'
import CoordonneesPage from './pages/admin/CoordonneesPage'
import AboutPage from './pages/admin/AboutPage'
import NewsPage from './pages/admin/NewsPage'
import ServicesPage from './pages/admin/ServicesPage'
import ChangePasswordPage from './pages/admin/ChangePasswordPage'

const navItems = [
  { path: '/admin', label: 'Tableau de bord', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', exact: true },
  { path: '/admin/coordonnees', label: 'Coordonnees', icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z' },
  { path: '/admin/about', label: 'A propos', icon: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z' },
  { path: '/admin/news', label: 'Actualites', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { path: '/admin/services', label: 'Services', icon: 'M11.42 15.17l-5.1 3.06 5.1 3.06m0-6.12l5.1 3.06-5.1 3.06m0-6.12L6.33 9m5.1 3.06L16.77 9' },
  { path: '/admin/change-password', label: 'Mot de passe', icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' },
]

function PrivateRoute({ children }) {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }
    fetch('/api/admin/verify', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => {
      if (r.ok) setValid(true)
      else {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_username')
        navigate('/admin/login', { replace: true })
      }
    }).catch(() => {
      navigate('/admin/login', { replace: true })
    }).finally(() => setChecking(false))
  }, [])

  if (checking) return null
  return valid ? children : null
}

export default function AdminApp() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const username = localStorage.getItem('admin_username') || 'Admin'

  const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path)

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_username')
    navigate('/admin/login')
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-sand-light flex">
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-ink text-ivory flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
          <div className="p-5 border-b border-ivory/10">
            <Link to="/admin" className="flex items-center gap-3 no-underline">
              <div className="w-9 h-9 rounded-lg bg-ivory/10 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
                  <path d="M8 24 L16 10 L24 24" stroke="#C75B39" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 21.5 L16 12.5 L22 21.5" stroke="#C9A94E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.5 19 L16 15 L19.5 19" stroke="#E8D5C4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="font-['Playfair_Display'] text-lg font-bold leading-none block">OLA</span>
                <span className="text-[9px] text-stone-light tracking-[2px] uppercase leading-tight block">Back-Office</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 no-underline ${
                  isActive(item.path, item.exact)
                    ? 'bg-terracotta text-white'
                    : 'text-stone-light hover:text-ivory hover:bg-ivory/5'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-3 border-t border-ivory/10">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-xs font-bold text-white shrink-0">
                {username[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{username}</p>
              </div>
              <button onClick={handleLogout} className="text-stone-light hover:text-red-400 transition-colors cursor-pointer" title="Deconnexion">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white/80 backdrop-blur-sm border-b border-sand-dark/20 px-4 lg:px-8 h-16 flex items-center gap-4 lg:gap-0">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-sand-light transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex-1" />
            <Link to="/" className="text-xs text-stone-light hover:text-terracotta transition-colors no-underline">
              &larr; Voir le site
            </Link>
          </header>

          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            <Routes>
              <Route index element={<DashboardPage />} />
              <Route path="coordonnees" element={<CoordonneesPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
            </Routes>
          </main>
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </div>
    </PrivateRoute>
  )
}
