import { useLocation, useNavigate } from 'react-router-dom'

const nav = [
  { path: '/admin', label: 'Tableau de bord', icon: '📊' },
  { path: '/admin/content', label: 'Contenu texte', icon: '📝' },
  { path: '/admin/books', label: 'Livres', icon: '📚' },
  { path: '/admin/bundles', label: 'Packs', icon: '📦' },
  { path: '/admin/contacts', label: 'Messages', icon: '✉️' },
  { path: '/admin/newsletter', label: 'Newsletter', icon: '📬' },
  { path: '/admin/settings', label: 'Configuration', icon: '⚙️' },
]

export default function AdminLayout({ children, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-slate text-white hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-turquoise to-violet flex items-center justify-center text-white font-bold">O</div>
            <span className="font-bold">Admin OLA</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                location.pathname === item.path
                  ? 'bg-white/15 text-white'
                  : 'text-slate-lighter hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full px-4 py-2.5 rounded-xl text-sm text-slate-lighter hover:bg-white/5 hover:text-white transition-all cursor-pointer text-left"
          >
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4 md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate">Admin OLA</span>
            <button onClick={onLogout} className="text-sm text-slate-light hover:text-red-500 cursor-pointer">Déconnexion</button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
