import { useState } from 'react'

export default function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onLogin(data.token)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise to-violet flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-turquoise to-violet flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">O</div>
          <h1 className="text-2xl font-extrabold text-slate">Administration</h1>
          <p className="text-slate-light text-sm mt-1">Connectez-vous pour gérer le contenu</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate">Identifiant</label>
          <input
            type="text"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-turquoise focus:ring-2 focus:ring-turquoise/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate">Mot de passe</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-turquoise focus:ring-2 focus:ring-turquoise/20"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-turquoise to-violet text-white font-semibold text-sm hover:shadow-lg transition-all cursor-pointer"
        >
          Se connecter
        </button>
      </form>
    </div>
  )
}
