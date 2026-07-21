import { useState, useEffect } from 'react'

export default function AdminDashboard({ token }) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/content').then((r) => r.json()),
      fetch('/api/contacts', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch('/api/newsletter', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ])
      .then(([content, contacts, newsletter]) => {
        setStats({
          books: content.books?.length || 0,
          bundles: content.bundles?.length || 0,
          contacts: contacts.length || 0,
          newsletter: newsletter.length || 0,
        })
      })
      .catch(() => {})
  }, [token])

  const cards = [
    { label: 'Livres', value: stats?.books ?? '...', icon: '📚', color: 'bg-turquoise-light text-turquoise-dark' },
    { label: 'Packs', value: stats?.bundles ?? '...', icon: '📦', color: 'bg-violet-light text-violet-dark' },
    { label: 'Messages reçus', value: stats?.contacts ?? '...', icon: '✉️', color: 'bg-orange-light text-orange-dark' },
    { label: 'Abonnés newsletter', value: stats?.newsletter ?? '...', icon: '📬', color: 'bg-turquoise-light text-turquoise-dark' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate mb-8">Tableau de bord</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl shadow-md p-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${card.color}`}>{card.icon}</div>
            <p className="text-3xl font-extrabold text-slate">{card.value}</p>
            <p className="text-slate-light text-sm mt-1">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
