import { useState, useEffect } from 'react'

const BLANK = {
  email: {
    enabled: false,
    smtp_host: '',
    smtp_port: 587,
    smtp_user: '',
    smtp_pass: '',
    from_name: '',
    from_email: '',
    to_email: '',
  },
  whatsapp: {
    enabled: false,
    api_type: 'cloud_api',
    phone_number_id: '',
    business_account_id: '',
    api_token: '',
    from_phone: '',
  },
}

export default function AdminSettings({ token }) {
  const [settings, setSettings] = useState(null)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [testResult, setTestResult] = useState(null)

  useEffect(() => {
    fetch('/api/settings', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {})
  }, [token])

  const update = (section, field) => (e) => {
    const value = field === 'enabled' ? e.target.checked : field === 'smtp_port' ? Number(e.target.value) : e.target.value
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }))
  }

  const save = async () => {
    setSaving(true)
    setTestResult(null)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error('Erreur')
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    } catch {}
    setSaving(false)
  }

  const testEmail = async () => {
    setTestResult({ type: 'email', status: 'sending' })
    setTimeout(() => setTestResult({ type: 'email', status: 'ok', message: 'Test configuré — l\'envoi réel sera disponible quand le backend SMTP sera branché.' }), 1000)
  }

  const testWhatsApp = async () => {
    setTestResult({ type: 'whatsapp', status: 'sending' })
    setTimeout(() => setTestResult({ type: 'whatsapp', status: 'ok', message: 'Test configuré — l\'envoi réel sera disponible quand l\'API WhatsApp sera branchée.' }), 1000)
  }

  if (!settings) return <p className="text-slate-light">Chargement...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-slate">Configuration</h1>
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-turquoise to-violet text-white font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
        >
          {done ? '✅ Enregistré' : saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate text-lg">✉️ Email (SMTP)</h2>
            <label className="flex items-center gap-2 text-sm text-slate-light cursor-pointer">
              Activer
              <input type="checkbox" checked={settings.email.enabled} onChange={update('email', 'enabled')} className="w-4 h-4 accent-turquoise" />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Serveur SMTP" value={settings.email.smtp_host} onChange={update('email', 'smtp_host')} />
            <Field label="Port" value={settings.email.smtp_port} onChange={update('email', 'smtp_port')} type="number" />
            <Field label="Utilisateur" value={settings.email.smtp_user} onChange={update('email', 'smtp_user')} />
            <Field label="Mot de passe" value={settings.email.smtp_pass} onChange={update('email', 'smtp_pass')} type="password" />
            <Field label="Nom de l'expéditeur" value={settings.email.from_name} onChange={update('email', 'from_name')} />
            <Field label="Email expéditeur" value={settings.email.from_email} onChange={update('email', 'from_email')} />
            <Field label="Email destinataire (admin)" value={settings.email.to_email} onChange={update('email', 'to_email')} className="sm:col-span-2" />
          </div>

          <button onClick={testEmail} disabled={!settings.email.enabled} className="mt-4 px-4 py-2 rounded-lg border border-gray-200 text-sm text-slate-light hover:bg-gray-50 transition-all disabled:opacity-40 cursor-pointer">
            Tester la configuration email
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate text-lg">💬 WhatsApp API</h2>
            <label className="flex items-center gap-2 text-sm text-slate-light cursor-pointer">
              Activer
              <input type="checkbox" checked={settings.whatsapp.enabled} onChange={update('whatsapp', 'enabled')} className="w-4 h-4 accent-turquoise" />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Type d'API" value={settings.whatsapp.api_type} onChange={update('whatsapp', 'api_type')} />
            <Field label="Phone Number ID" value={settings.whatsapp.phone_number_id} onChange={update('whatsapp', 'phone_number_id')} />
            <Field label="Business Account ID" value={settings.whatsapp.business_account_id} onChange={update('whatsapp', 'business_account_id')} />
            <Field label="API Token" value={settings.whatsapp.api_token} onChange={update('whatsapp', 'api_token')} type="password" />
            <Field label="Numéro émetteur" value={settings.whatsapp.from_phone} onChange={update('whatsapp', 'from_phone')} />
          </div>

          <button onClick={testWhatsApp} disabled={!settings.whatsapp.enabled} className="mt-4 px-4 py-2 rounded-lg border border-gray-200 text-sm text-slate-light hover:bg-gray-50 transition-all disabled:opacity-40 cursor-pointer">
            Tester la configuration WhatsApp
          </button>
        </div>

        {testResult && (
          <div className="bg-green-50 text-green-700 rounded-2xl p-4 text-sm">
            {testResult.message}
          </div>
        )}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-xs font-semibold text-slate-light uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-turquoise"
      />
    </div>
  )
}
