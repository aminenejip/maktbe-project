import { useState, useEffect } from 'react'

const levels = ['college', 'lycee']

export default function AdminBooks({ token }) {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => setBooks(d.books || []))
      .catch(() => {})
  }, [])

  const update = (id, field) => (e) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: e.target.value } : b)))

  const add = () => {
    const maxId = books.reduce((m, b) => Math.max(m, b.id), 0)
    setBooks((prev) => [...prev, { id: maxId + 1, title: '', author: '', level: 'college', cover: '' }])
  }

  const remove = (id) => setBooks((prev) => prev.filter((b) => b.id !== id))

  const save = async () => {
    await fetch('/api/books', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ books }),
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-slate">Livres</h1>
        <div className="flex gap-3">
          <button onClick={add} className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-slate text-sm font-semibold hover:bg-gray-50 transition-all cursor-pointer">+ Ajouter</button>
          <button onClick={save} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-turquoise to-violet text-white font-semibold text-sm hover:shadow-lg transition-all cursor-pointer">Enregistrer</button>
        </div>
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-16 h-24 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
              {book.cover && <img src={book.cover} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-light">Titre</label>
                <input type="text" value={book.title} onChange={update(book.id, 'title')} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-turquoise" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-light">Auteur</label>
                <input type="text" value={book.author} onChange={update(book.id, 'author')} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-turquoise" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-light">Niveau</label>
                <select value={book.level} onChange={update(book.id, 'level')} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-turquoise">
                  {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-light">Image URL</label>
                <div className="flex gap-2">
                  <input type="text" value={book.cover} onChange={update(book.id, 'cover')} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-turquoise" />
                  <button onClick={() => remove(book.id)} className="px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-all text-sm cursor-pointer">✕</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
