import { useState, useEffect } from 'react'

export default function AdminBundles({ token }) {
  const [bundles, setBundles] = useState([])

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => setBundles(d.bundles || []))
      .catch(() => {})
  }, [])

  const updateMain = (id, field) => (e) =>
    setBundles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, main: { ...b.main, [field]: e.target.value } } : b))
    )

  const updateAtt = (bId, aIdx, field) => (e) =>
    setBundles((prev) =>
      prev.map((b) =>
        b.id === bId
          ? { ...b, attachments: b.attachments.map((a, i) => (i === aIdx ? { ...a, [field]: e.target.value } : a)) }
          : b
      )
    )

  const addAtt = (id) =>
    setBundles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, attachments: [...b.attachments, { emoji: '', name: '' }] } : b))
    )

  const removeAtt = (bId, aIdx) =>
    setBundles((prev) =>
      prev.map((b) => (b.id === bId ? { ...b, attachments: b.attachments.filter((_, i) => i !== aIdx) } : b))
    )

  const add = () => {
    const maxId = bundles.reduce((m, b) => Math.max(m, b.id), 0)
    setBundles((prev) => [...prev, { id: maxId + 1, main: { name: '', emoji: '📦', color: 'from-turquoise to-turquoise-dark' }, attachments: [] }])
  }

  const remove = (id) => setBundles((prev) => prev.filter((b) => b.id !== id))

  const save = async () => {
    await fetch('/api/bundles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ bundles }),
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-slate">Packs produits</h1>
        <div className="flex gap-3">
          <button onClick={add} className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-slate text-sm font-semibold hover:bg-gray-50 transition-all cursor-pointer">+ Ajouter</button>
          <button onClick={save} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-turquoise to-violet text-white font-semibold text-sm hover:shadow-lg transition-all cursor-pointer">Enregistrer</button>
        </div>
      </div>

      <div className="space-y-4">
        {bundles.map((bundle) => (
          <div key={bundle.id} className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{bundle.main.emoji}</span>
              <button onClick={() => remove(bundle.id)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg text-sm cursor-pointer">✕</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-light">Nom du pack</label>
                <input type="text" value={bundle.main.name} onChange={updateMain(bundle.id, 'name')} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-turquoise" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-light">Emoji</label>
                <input type="text" value={bundle.main.emoji} onChange={updateMain(bundle.id, 'emoji')} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-turquoise" />
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate mb-2">Accessoires</h3>
            <div className="space-y-2">
              {bundle.attachments.map((att, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="text" value={att.emoji} onChange={updateAtt(bundle.id, i, 'emoji')} placeholder="Emoji" className="w-16 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-turquoise" />
                  <input type="text" value={att.name} onChange={updateAtt(bundle.id, i, 'name')} placeholder="Nom" className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-turquoise" />
                  <button onClick={() => removeAtt(bundle.id, i)} className="text-red-500 text-sm hover:bg-red-50 px-2 py-1 rounded cursor-pointer">✕</button>
                </div>
              ))}
              <button onClick={() => addAtt(bundle.id)} className="text-sm text-turquoise-dark hover:bg-turquoise-light px-3 py-1.5 rounded-lg transition-all cursor-pointer">+ Ajouter accessoire</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
