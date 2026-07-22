import { useState, useEffect } from 'react'
import { api } from '../../api/client'

const emptyForm = {
  title: '', title_en: '', title_ar: '',
  description: '', description_en: '', description_ar: '',
  description_detailed: '', description_detailed_en: '', description_detailed_ar: '',
  image: '', images: [], external_link: '',
  createdAt: new Date().toISOString().slice(0, 10),
  published: true,
}

export default function NewsPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const token = localStorage.getItem('admin_token')
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  const load = () => {
    api('/api/admin/news', { headers })
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {})
  }

  useEffect(load, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editingId ? `/api/admin/news/${editingId}` : '/api/admin/news'
    const method = editingId ? 'PUT' : 'POST'
    const payload = { ...form, createdAt: form.createdAt ? new Date(form.createdAt).toISOString() : new Date().toISOString() }
    await api(url, { method, headers, body: JSON.stringify(payload) })
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
    load()
  }

  const handleEdit = (item) => {
    setForm({ ...item, createdAt: item.createdAt ? item.createdAt.slice(0, 10) : '' })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette actualite ?')) return
    await api(`/api/admin/news/${id}`, { method: 'DELETE', headers })
    load()
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">Actualites & Nouveautes</h1>
          <p className="text-stone text-sm">Gerer les actualites affichees sur le site</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-ink text-white rounded-lg text-sm font-semibold hover:bg-ink-light transition-colors cursor-pointer">
            + Nouvelle actualite
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-5 mb-6 space-y-4">
          <h3 className="font-semibold text-ink">{editingId ? 'Modifier' : 'Ajouter'} une actualite</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Titre (FR)*</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Titre (EN)</label>
              <input type="text" value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Titre (AR)</label>
              <input type="text" value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Description courte (FR)*</label>
              <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Description courte (EN)</label>
              <textarea rows={2} value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Description courte (AR)</label>
              <textarea rows={2} value={form.description_ar} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-medium text-stone mb-1">Description detaillee (FR)</label>
              <textarea rows={3} value={form.description_detailed} onChange={(e) => setForm({ ...form, description_detailed: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-medium text-stone mb-1">Description detaillee (EN)</label>
              <textarea rows={3} value={form.description_detailed_en} onChange={(e) => setForm({ ...form, description_detailed_en: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-medium text-stone mb-1">Description detaillee (AR)</label>
              <textarea rows={3} value={form.description_detailed_ar} onChange={(e) => setForm({ ...form, description_detailed_ar: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Image (URL)</label>
              <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Date de publication</label>
              <input type="date" value={form.createdAt} onChange={(e) => setForm({ ...form, createdAt: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="news-published" checked={form.published !== false} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded" />
              <label htmlFor="news-published" className="text-sm text-stone">Publiee</label>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-ink text-white rounded-lg text-sm font-semibold hover:bg-ink-light transition-colors cursor-pointer">
              {editingId ? 'Enregistrer' : 'Ajouter'}
            </button>
            <button type="button" onClick={handleCancel} className="px-4 py-2 border border-sand-dark rounded-lg text-sm text-stone hover:bg-sand-light transition-colors cursor-pointer">
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-dark/30 text-left text-xs text-stone-light uppercase tracking-wider">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...items].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)).map((item) => (
              <tr key={item.id} className="border-b border-sand-dark/10 hover:bg-sand-light/50">
                <td className="px-4 py-3">
                  {item.image ? (
                    <img src={item.image} alt="" className="w-12 h-8 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-8 bg-sand-dark/30 rounded flex items-center justify-center text-xs text-stone-light">N/A</div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3 text-stone text-xs">{item.createdAt ? new Date(item.createdAt).toLocaleDateString('fr-FR') : '-'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.published !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.published !== false ? 'Publiee' : 'Masquee'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="text-xs text-terracotta hover:underline cursor-pointer">Modifier</button>
                    <button onClick={() => handleDelete(item.id)} className="text-xs text-red-500 hover:underline cursor-pointer">Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-stone-light">Aucune actualite</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
