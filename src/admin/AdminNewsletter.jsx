import { useState, useEffect } from 'react'

export default function AdminNewsletter({ token }) {
  const [subscribers, setSubscribers] = useState([])

  useEffect(() => {
    fetch('/api/newsletter', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setSubscribers)
      .catch(() => {})
  }, [token])

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate mb-8">Abonnés newsletter ({subscribers.length})</h1>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="p-6 text-slate-light">Aucun abonné pour le moment.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-slate-light">Email</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-light">Date d'inscription</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 text-slate font-medium">{s.email}</td>
                  <td className="px-6 py-4 text-slate-light">{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
