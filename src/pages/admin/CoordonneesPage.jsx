import { useState, useEffect } from 'react'

const TYPE_OPTIONS = [
  { value: 'phone', label: 'Telephone' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'link', label: 'Lien externe' },
]

const emptyForm = { type: 'phone', label: '', label_en: '', value: '', order: 1, active: true }

export default function CoordonneesPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const token = localStorage.getItem('admin_token')
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  const load = () => {
    fetch('/api/admin/coordonnees', { headers })
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {})
  }

  useEffect(load, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editingId ? `/api/admin/coordonnees/${editingId}` : '/api/admin/coordonnees'
    const method = editingId ? 'PUT' : 'POST'

    await fetch(url, { method, headers, body: JSON.stringify(form) })
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
    if (!confirm('Supprimer cette coordonnee ?')) return
    await fetch(`/api/admin/coordonnees/${id}`, { method: 'DELETE', headers })
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
          <h1 className="text-2xl font-bold text-ink">Coordonnees de contact</h1>
          <p className="text-stone text-sm">Gerer les informations de contact affichees sur le site</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-ink text-white rounded-lg text-sm font-semibold hover:bg-ink-light transition-colors cursor-pointer">
            + Ajouter
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-5 mb-6 space-y-4">
          <h3 className="font-semibold text-ink">{editingId ? 'Modifier' : 'Ajouter'} une coordonnee</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40">
                {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Ordre d'affichage</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Label (FR)</label>
              <input type="text" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone mb-1">Label (EN)</label>
              <input type="text" value={form.label_en} onChange={(e) => setForm({ ...form, label_en: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone mb-1">Valeur (telephone, email, URL...)</label>
              <input type="text" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" required />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="active" checked={form.active !== false} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="rounded" />
              <label htmlFor="active" className="text-sm text-stone">Active</label>
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
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Valeur</th>
              <th className="px-4 py-3">Ordre</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.sort((a, b) => a.order - b.order).map((item) => (
              <tr key={item.id} className="border-b border-sand-dark/10 hover:bg-sand-light/50">
                <td className="px-4 py-3 capitalize">{item.type}</td>
                <td className="px-4 py-3 font-medium">{item.label}</td>
                <td className="px-4 py-3 text-stone">{item.value}</td>
                <td className="px-4 py-3">{item.order}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.active !== false ? 'Active' : 'Inactive'}
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
              <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-light">Aucune coordonnee</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
