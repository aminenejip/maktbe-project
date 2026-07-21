import { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'

const API_ENDPOINT = '/api/newsletter'

export default function NewsletterSection() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 md:py-28 bg-sand-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-terracotta/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-ivory rounded-2xl shadow-sm p-8 md:p-12 border border-sand-dark/30">
          <div className="w-14 h-14 rounded-xl bg-ink flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-sand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-3">
            {t('newsletter.title')}
          </h2>
          <p className="text-stone text-lg mb-8 max-w-lg mx-auto">
            {t('newsletter.subtitle')}
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-3 py-4">
              <svg className="w-6 h-6 text-terracotta shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-ink font-semibold">
                {t('newsletter.success')}
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              noValidate
            >
              <div className="flex-1 flex flex-col gap-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
                  placeholder={t('newsletter.placeholder')}
                  className="w-full px-5 py-3 rounded-lg border border-sand-dark bg-ivory text-ink placeholder:text-stone-light text-sm focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 transition-all disabled:opacity-50"
                  disabled={status === 'sending'}
                />
                {status === 'error' && (
                  <p className="text-red-500 text-xs text-left mt-1">{t('newsletter.error')}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-6 py-3 rounded-lg bg-ink text-ivory font-semibold text-sm hover:bg-ink-light shadow-sm hover:shadow transition-all duration-300 whitespace-nowrap disabled:opacity-50 cursor-pointer"
              >
                {status === 'sending' ? t('newsletter.sending') : t('newsletter.cta')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
