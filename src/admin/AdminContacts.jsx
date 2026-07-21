import { useState, useEffect } from 'react'

export default function AdminContacts({ token }) {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    fetch('/api/contacts', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setContacts)
      .catch(() => {})
  }, [token])

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate mb-8">Messages reçus ({contacts.length})</h1>

      <div className="space-y-4">
        {contacts.length === 0 && <p className="text-slate-light">Aucun message pour le moment.</p>}
        {contacts.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-sm font-bold text-slate">{c.name || 'Anonyme'}</span>
              {c.email && <span className="text-sm text-slate-light">{c.email}</span>}
              {c.phone && <span className="text-sm text-slate-light">{c.phone}</span>}
              <span className="text-xs text-slate-lighter ml-auto">{new Date(c.createdAt).toLocaleString()}</span>
            </div>
            {c.subject && <span className="inline-block text-xs font-semibold bg-turquoise-light text-turquoise-dark px-2.5 py-1 rounded-full mb-2">{c.subject}</span>}
            <p className="text-sm text-slate leading-relaxed whitespace-pre-wrap">{c.message}</p>
            {c.files?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {c.files.map((f, i) => (
                  <a
                    key={i}
                    href={`/uploads/${f.filename}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs bg-gray-100 text-slate-light px-3 py-1.5 rounded-full hover:bg-turquoise-light hover:text-turquoise-dark transition-all"
                  >
                    📎 {f.originalName}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
