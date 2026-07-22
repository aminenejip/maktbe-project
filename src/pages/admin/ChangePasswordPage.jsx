import { useState } from 'react'

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas' })
      return
    }
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Le nouveau mot de passe doit contenir au moins 6 caracteres' })
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('admin_token')
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Erreur' })
        return
      }
      setMessage({ type: 'success', text: 'Mot de passe modifie avec succes' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-1">Changer le mot de passe</h1>
      <p className="text-stone text-sm mb-8">Modifiez votre mot de passe d'acces au Back-Office</p>

      <div className="max-w-md">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          {message.text && (
            <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {message.text}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Mot de passe actuel</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Nouveau mot de passe</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Confirmer le nouveau mot de passe</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-sand-dark rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40" required />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2.5 bg-ink text-white rounded-lg font-semibold text-sm hover:bg-ink-light transition-colors disabled:opacity-50 cursor-pointer">
            {loading ? 'Modification...' : 'Modifier le mot de passe'}
          </button>
        </form>
      </div>
    </div>
  )
}
