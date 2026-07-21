import { useState, useRef } from 'react'
import { useTranslation } from '../hooks/useTranslation'

const API_ENDPOINT = '/api/contact'
const WHATSAPP_NUMBER = '212600000000'

const subjectKeys = ['info', 'order', 'suggestion', 'complaint', 'other']

export default function ContactSection() {
  const { t } = useTranslation()
  const fileRef = useRef(null)
  const [method, setMethod] = useState('email')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'info',
    message: '',
  })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || [])
    setFiles((prev) => [...prev, ...selected].slice(0, 5))
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const sendFilesToApi = async () => {
    if (files.length === 0) return
    const payload = new FormData()
    payload.append('name', form.name)
    payload.append('phone', form.phone)
    payload.append('email', form.email)
    payload.append('subject', 'whatsapp')
    payload.append('message', form.message)
    files.forEach((f) => payload.append('attachments', f))
    await fetch(API_ENDPOINT, { method: 'POST', body: payload }).catch(() => {})
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const payload = new FormData()
    payload.append('name', form.name)
    payload.append('email', form.email)
    payload.append('subject', form.subject)
    payload.append('message', form.message)
    files.forEach((f) => payload.append('attachments', f))
    try {
      const res = await fetch(API_ENDPOINT, { method: 'POST', body: payload })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setForm({ name: '', phone: '', email: '', subject: 'info', message: '' })
      setFiles([])
      if (fileRef.current) fileRef.current.value = ''
    } catch {
      setStatus('error')
    }
  }

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    const lines = [
      `*${t('contact_form.sender_phone')}* : ${form.phone}`,
      '',
      `*${t('contact_form.message')}* :`,
      form.message,
    ]
    if (files.length > 0) {
      lines.push('', '*Fichiers joints :*')
      files.forEach((f) => lines.push(`- ${f.name}`))
    }
    const text = lines.join('\n')
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    sendFilesToApi()
    window.open(url, '_blank')
    setStatus('success')
    setForm({ name: '', phone: '', email: '', subject: 'info', message: '' })
    setFiles([])
    if (fileRef.current) fileRef.current.value = ''
  }

  const resetForm = () => {
    setStatus('idle')
    setForm({ name: '', phone: '', email: '', subject: 'info', message: '' })
    setFiles([])
  }

  if (status === 'success') {
    return (
      <section id="contact-form" className="py-20 md:py-28 bg-sand-light">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-ivory rounded-2xl shadow-sm p-12">
            <div className="w-16 h-16 rounded-xl bg-terracotta/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-ink mb-3">{t('contact_form.success')}</h2>
            <button
              onClick={resetForm}
              className="mt-6 px-6 py-3 rounded-lg bg-ink text-ivory font-semibold hover:bg-ink-light transition-all cursor-pointer"
            >
              {t('contact_form.send')}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact-form" className="py-20 md:py-28 bg-sand-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
            {t('contact_form.title')}
          </h2>
          <p className="text-stone mt-3 max-w-lg mx-auto">
            {t('contact_form.subtitle')}
          </p>
          <div className="mt-5 w-16 h-0.5 bg-gradient-to-r from-terracotta to-gold rounded-full mx-auto" />
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setMethod('email')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
              method === 'email'
                ? 'bg-ink text-ivory shadow-sm'
                : 'bg-ivory text-stone hover:text-ink border border-sand-dark'
            }`}
          >
            {t('contact_form.tab_email')}
          </button>
          <button
            onClick={() => setMethod('whatsapp')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
              method === 'whatsapp'
                ? 'bg-ink text-ivory shadow-sm'
                : 'bg-ivory text-stone hover:text-ink border border-sand-dark'
            }`}
          >
            {t('contact_form.tab_whatsapp')}
          </button>
        </div>

        <form
          onSubmit={method === 'email' ? handleEmailSubmit : handleWhatsAppSubmit}
          className="bg-ivory rounded-2xl shadow-sm p-6 md:p-10 space-y-5 border border-sand-dark/30"
          noValidate
        >
          {method === 'email' ? (
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-ink">{t('contact_form.sender_name')}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  disabled={status === 'sending'}
                  className="px-4 py-3 rounded-lg border border-sand-dark bg-ivory text-ink text-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 transition-all disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-ink">{t('contact_form.sender_email')}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  disabled={status === 'sending'}
                  className="px-4 py-3 rounded-lg border border-sand-dark bg-ivory text-ink text-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 transition-all disabled:opacity-50"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-ink">{t('contact_form.sender_phone')}</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={update('phone')}
                placeholder="+212 6XX XXX XXX"
                disabled={status === 'sending'}
                className="px-4 py-3 rounded-lg border border-sand-dark bg-ivory text-ink text-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 transition-all disabled:opacity-50"
              />
            </div>
          )}

          {method === 'email' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-ink">{t('contact_form.subject')}</label>
              <select
                value={form.subject}
                onChange={update('subject')}
                disabled={status === 'sending'}
                className="px-4 py-3 rounded-lg border border-sand-dark bg-ivory text-ink text-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 transition-all disabled:opacity-50"
              >
                {subjectKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(`contact_form.subjects.${key}`)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink">{t('contact_form.message')}</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={update('message')}
              disabled={status === 'sending'}
              className="px-4 py-3 rounded-lg border border-sand-dark bg-ivory text-ink text-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 transition-all disabled:opacity-50 resize-y"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-ink">{t('contact_form.attachment')}</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={status === 'sending'}
                className="px-4 py-2.5 rounded-lg border-2 border-dashed border-sand-dark text-stone text-sm hover:border-terracotta hover:text-terracotta transition-all cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 inline mr-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32a1.5 1.5 0 01-2.122-2.122L16.5 6.5" />
                </svg>
                {t('contact_form.attachment')}
              </button>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFiles}
                className="hidden"
              />
              <span className="text-xs text-stone-light">{t('contact_form.attachment_hint')}</span>
            </div>
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-terracotta-light text-terracotta-dark text-xs font-medium px-3 py-1.5 rounded-md"
                  >
                    <span className="truncate max-w-28">{f.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      disabled={status === 'sending'}
                      className="hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {status === 'error' && (
            <p className="text-red-500 text-sm text-center">{t('contact_form.error')}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3 rounded-lg bg-ink text-ivory font-semibold text-sm hover:bg-ink-light shadow-sm hover:shadow transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {method === 'email'
              ? status === 'sending' ? t('contact_form.sending') : t('contact_form.send')
              : t('contact_form.whatsapp_send')}
          </button>
        </form>
      </div>
    </section>
  )
}
