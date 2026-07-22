import { useState, useEffect } from 'react'
import { api } from '../../api/client'

export default function DashboardPage() {
  const [stats, setStats] = useState({ services: 0, news: 0, contacts: 0 })
  const username = localStorage.getItem('admin_username') || 'Admin'

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const headers = { Authorization: `Bearer ${token}` }
    Promise.all([
      api('/api/admin/services', { headers }).then((r) => r.json()).catch(() => []),
      api('/api/admin/news', { headers }).then((r) => r.json()).catch(() => []),
      api('/api/coordonnees').then((r) => r.json()).catch(() => []),
    ]).then(([services, news, contacts]) => {
      setStats({
        services: services.length,
        news: news.filter((n) => n.published !== false).length,
        contacts: contacts.length,
      })
    })
  }, [])

  const cards = [
    { label: 'Services', value: stats.services, icon: 'M11.42 15.17l-5.1 3.06 5.1 3.06m0-6.12l5.1 3.06-5.1 3.06m0-6.12L6.33 9m5.1 3.06L16.77 9', color: 'bg-terracotta' },
    { label: 'Actualites publiees', value: stats.news, icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z', color: 'bg-gold' },
    { label: 'Coordonnees de contact', value: stats.contacts, icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z', color: 'bg-ink-light' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-1">Bon retour, {username}</h1>
      <p className="text-stone text-sm mb-8">Vue d'ensemble de votre site</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center shrink-0`}>
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">{card.value}</p>
              <p className="text-xs text-stone-light">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
