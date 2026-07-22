import { useState, useEffect } from 'react'

const defaultAdvantages = [
  { key: 'levels', title: '', title_en: '', title_ar: '', desc: '', desc_en: '', desc_ar: '' },
  { key: 'quality', title: '', title_en: '', title_ar: '', desc: '', desc_en: '', desc_ar: '' },
  { key: 'advice', title: '', title_en: '', title_ar: '', desc: '', desc_en: '', desc_ar: '' },
]

export default function AboutPage() {
  const [form, setForm] = useState({
    image: '',
    badge: '', badge_en: '', badge_ar: '',
    title: '', title_en: '', title_ar: '',
    description: '', description_en: '', description_ar: '',
    expertise_number: '',
    expertise_label: '', expertise_label_en: '', expertise_label_ar: '',
    advantages: defaultAdvantages,
  })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('admin_token')
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  useEffect(() => {
    fetch('/api/admin/content', { headers })
      .then((r) => r.json())
      .then((data) => {
        if (data.about) {
          setForm({
            image: data.about.image || '',
            badge: data.about.badge || '',
            badge_en: data.about.badge_en || '',
            badge_ar: data.about.badge_ar || '',
            title: data.about.title || '',
            title_en: data.about.title_en || '',
            title_ar: data.about.title_ar || '',
            description: data.about.description || '',
            description_en: data.about.description_en || '',
            description_ar: data.about.description_ar || '',
            expertise_number: data.about.expertise_number || '',
            expertise_label: data.about.expertise_label || '',
            expertise_label_en: data.about.expertise_label_en || '',
            expertise_label_ar: data.about.expertise_label_ar || '',
            advantages: data.about.advantages?.length
              ? data.about.advantages.map((a) => ({
                  key: a.key,
                  title: a.title || '',
                  title_en: a.title_en || '',
                  title_ar: a.title_ar || '',
                  desc: a.desc || '',
                  desc_en: a.desc_en || '',
                  desc_ar: a.desc_ar || '',
                }))
              : defaultAdvantages,
          })
        }
      })
      .catch(() => {})
  }, [])

  const updateAdvantage = (key, field, value) => {
    setForm((prev) => ({
      ...prev,
      advantages: prev.advantages.map((a) => (a.key === key ? { ...a, [field]: value } : a)),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ about: form }),
      })
      if (res.ok) {
        setMessage({ type: 'success', text: 'Section "A propos" mise a jour avec succes' })
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-1">Section "A propos"</h1>
      <p className="text-stone text-sm mb-8">Modifier tout le contenu de la section "A propos" sur le site public</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6 max-w-4xl">
        {message.text && (
          <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {message.text}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-ink mb-3">Image</h3>
          <div>
            <label className="block text-xs font-medium text-stone mb-1">URL de l'image</label>
            <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" placeholder="https://..." />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-ink mb-3">Badge (petit tag au-dessus du titre)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone mb-1">FR</label>
              <input type="text" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">EN</label>
              <input type="text" value={form.badge_en} onChange={(e) => setForm({ ...form, badge_en: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">AR</label>
              <input type="text" value={form.badge_ar} onChange={(e) => setForm({ ...form, badge_ar: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-ink mb-3">Titre</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone mb-1">FR</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">EN</label>
              <input type="text" value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">AR</label>
              <input type="text" value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-ink mb-3">Description</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone mb-1">FR</label>
              <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">EN</label>
              <textarea rows={4} value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">AR</label>
              <textarea rows={4} value={form.description_ar} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-ink mb-3">Badge d'expertise (superposé sur l'image)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Nombre (ex: 12+)</label>
              <input type="text" value={form.expertise_number} onChange={(e) => setForm({ ...form, expertise_number: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Label FR</label>
              <input type="text" value={form.expertise_label} onChange={(e) => setForm({ ...form, expertise_label: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Label EN</label>
              <input type="text" value={form.expertise_label_en} onChange={(e) => setForm({ ...form, expertise_label_en: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Label AR</label>
              <input type="text" value={form.expertise_label_ar} onChange={(e) => setForm({ ...form, expertise_label_ar: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-ink mb-3">Avantages (3 blocs : levels, quality, advice)</h3>
          {form.advantages.map((adv) => (
            <div key={adv.key} className="mb-5 p-4 bg-sand-light rounded-xl border border-sand-dark/20">
              <h4 className="text-sm font-bold text-ink capitalize mb-3">{adv.key}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                <div>
                  <label className="block text-xs font-medium text-stone mb-1">Titre FR</label>
                  <input type="text" value={adv.title} onChange={(e) => updateAdvantage(adv.key, 'title', e.target.value)} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone mb-1">Titre EN</label>
                  <input type="text" value={adv.title_en} onChange={(e) => updateAdvantage(adv.key, 'title_en', e.target.value)} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone mb-1">Titre AR</label>
                  <input type="text" value={adv.title_ar} onChange={(e) => updateAdvantage(adv.key, 'title_ar', e.target.value)} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone mb-1">Description FR</label>
                  <input type="text" value={adv.desc} onChange={(e) => updateAdvantage(adv.key, 'desc', e.target.value)} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone mb-1">Description EN</label>
                  <input type="text" value={adv.desc_en} onChange={(e) => updateAdvantage(adv.key, 'desc_en', e.target.value)} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone mb-1">Description AR</label>
                  <input type="text" value={adv.desc_ar} onChange={(e) => updateAdvantage(adv.key, 'desc_ar', e.target.value)} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading} className="px-6 py-2.5 bg-ink text-white rounded-lg font-semibold text-sm hover:bg-ink-light transition-colors disabled:opacity-50 cursor-pointer">
          {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
      </form>
    </div>
  )
}
