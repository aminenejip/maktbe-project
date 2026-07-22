import { useState, useEffect } from 'react'
import { api } from '../../api/client'

const emptyForm = {
  name: '', name_en: '', name_ar: '',
  description: '', description_en: '', description_ar: '',
  description_detailed: '', description_detailed_en: '', description_detailed_ar: '',
  image: '', images: [], external_link: '',
  order: 1, active: true,
}

export default function ServicesPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const token = localStorage.getItem('admin_token')
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  const load = () => {
    api('/api/admin/services', { headers })
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {})
  }

  useEffect(load, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editingId ? `/api/admin/services/${editingId}` : '/api/admin/services'
    const method = editingId ? 'PUT' : 'POST'
    await api(url, { method, headers, body: JSON.stringify(form) })
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
    load()
  }

  const handleEdit = (item) => {
    setForm(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce service ?')) return
    await api(`/api/admin/services/${id}`, { method: 'DELETE', headers })
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
          <h1 className="text-2xl font-bold text-ink">Services</h1>
          <p className="text-stone text-sm">Gerer les services affiches sur le site</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-ink text-white rounded-lg text-sm font-semibold hover:bg-ink-light transition-colors cursor-pointer">
            + Nouveau service
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-5 mb-6 space-y-4">
          <h3 className="font-semibold text-ink">{editingId ? 'Modifier' : 'Ajouter'} un service</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Nom (FR)*</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Nom (EN)</label>
              <input type="text" value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Nom (AR)</label>
              <input type="text" value={form.name_ar} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" />
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
              <label className="block text-xs font-medium text-stone mb-1">Image / Icone (URL)</label>
              <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Ordre d'affichage</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="svc-active" checked={form.active !== false} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="rounded" />
              <label htmlFor="svc-active" className="text-sm text-stone">Actif</label>
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
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Ordre</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...items].sort((a, b) => (a.order || 0) - (b.order || 0)).map((item) => (
              <tr key={item.id} className="border-b border-sand-dark/10 hover:bg-sand-light/50">
                <td className="px-4 py-3">
                  {item.image ? (
                    <img src={item.image} alt="" className="w-12 h-8 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-8 bg-sand-dark/30 rounded flex items-center justify-center text-xs text-stone-light">N/A</div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3 text-stone">{item.order}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.active !== false ? 'Actif' : 'Inactif'}
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
              <tr><td colSpan={5} className="px-4 py-8 text-center text-stone-light">Aucun service</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
