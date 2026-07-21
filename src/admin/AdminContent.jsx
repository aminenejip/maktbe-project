import { useState, useEffect } from 'react'

export default function AdminContent({ token }) {
  const [data, setData] = useState(null)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => setData(d.content))
      .catch(() => {})
  }, [])

  const update = (section, field) => (e) =>
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: e.target.value },
    }))

  const save = async () => {
    setSaving(true)
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: data }),
      })
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    } catch {}
    setSaving(false)
  }

  if (!data) return <p className="text-slate-light">Chargement...</p>

  const sections = [
    { label: 'Site', key: 'site', fields: ['name', 'name_en', 'tagline', 'tagline_en'] },
    { label: 'Hero', key: 'hero', fields: ['title', 'title_en', 'subtitle', 'subtitle_en'] },
    { label: 'À propos', key: 'about', fields: ['badge', 'badge_en', 'title', 'title_en', 'description', 'description_en'] },
    { label: 'Promo', key: 'promo', fields: ['title', 'title_en', 'desc', 'desc_en', 'cta', 'cta_en'] },
    { label: 'Footer', key: 'footer', fields: ['description', 'description_en', 'email', 'whatsapp', 'facebook', 'instagram', 'address', 'address_en', 'hours', 'hours_en'] },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-slate">Contenu texte</h1>
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-turquoise to-violet text-white font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
        >
          {done ? '✅ Enregistré' : saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.key} className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-bold text-slate text-lg mb-4">{section.label}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-light uppercase">{field}</label>
                  {field.includes('description') || field === 'desc' || field === 'desc_en' ? (
                    <textarea
                      rows={3}
                      value={data[section.key]?.[field] || ''}
                      onChange={update(section.key, field)}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-turquoise resize-y"
                    />
                  ) : (
                    <input
                      type="text"
                      value={data[section.key]?.[field] || ''}
                      onChange={update(section.key, field)}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-turquoise"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
