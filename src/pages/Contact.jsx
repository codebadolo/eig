import { useState } from 'react'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'
import FaIcon from '../components/ui/FaIcon'

export default function Contact() {
  const { t } = useLang()
  const { data: company } = useApi('/company')
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', objet: 'information', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch((import.meta.env.VITE_API_URL || '/api') + '/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: `${form.prenom} ${form.nom}`.trim(),
          email: form.email,
          telephone: form.telephone,
          sujet: form.objet,
          message: form.message,
        }),
      })
      setSent(true)
    } catch {
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHero
        section="contact"
        label={t('contact.label')}
        title={<>{t('contact.title')} <span>{t('contact.titleSpan')}</span></>}
        subtitle={t('contact.sub')}
      />

      <section style={{ background: 'var(--white)' }}>
        <div className="contact-grid">
          <ScrollReveal>
            <span className="section-label">{t('contact.coordLabel')}</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(24px,3vw,38px)' }}>
              {t('contact.coordTitle')} <span>{t('contact.coordTitleSpan')}</span>
            </h2>
            <div className="gold-rule" />

            <div className="contact-info-item">
              <div className="contact-icon"><FaIcon name="location-dot" size={20} /></div>
              <div>
                <div className="contact-label">{t('contact.adresse')}</div>
                <div className="contact-value">{company?.adresse}</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon"><FaIcon name="phone" size={20} /></div>
              <div>
                <div className="contact-label">{t('contact.telephone')}</div>
                <div className="contact-value">{company?.telephone}</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon"><FaIcon name="envelope" size={20} /></div>
              <div>
                <div className="contact-label">{t('contact.email')}</div>
                <div className="contact-value">{company?.email}</div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 16 }}>
                {t('contact.follow')}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <a href="#" className="social-btn" style={{ color: 'var(--teal)', borderColor: 'var(--teal-light)' }}>in</a>
                <a href="#" className="social-btn" style={{ color: 'var(--teal)', borderColor: 'var(--teal-light)' }}>f</a>
                <a href={`https://wa.me/${company?.whatsapp}`} target="_blank" rel="noopener noreferrer" className="social-btn" style={{ color: '#25D366', borderColor: '#25D366' }}>W</a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            {sent ? (
              <div className="contact-form" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>{t('contact.successTitle')}</h3>
                <p style={{ color: 'var(--gray-mid)', lineHeight: 1.7 }}>{t('contact.successText')}</p>
                <button className="btn-primary" style={{ marginTop: 24, border: 'none' }} onClick={() => setSent(false)}>
                  {t('contact.successBtn')}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginBottom: 28, color: 'var(--black)' }}>
                  {t('contact.formTitle')}
                </h3>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('contact.fname')} *</label>
                    <input className="form-input" name="prenom" required value={form.prenom} onChange={handleChange} placeholder={t('contact.fname')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('contact.lname')} *</label>
                    <input className="form-input" name="nom" required value={form.nom} onChange={handleChange} placeholder={t('contact.lname')} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('contact.email')} *</label>
                    <input className="form-input" type="email" name="email" required value={form.email} onChange={handleChange} placeholder="email@exemple.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('contact.phone')}</label>
                    <input className="form-input" name="telephone" value={form.telephone} onChange={handleChange} placeholder="+226 XX XX XX XX" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('contact.subject')} *</label>
                  <select className="form-select" name="objet" required value={form.objet} onChange={handleChange}>
                    {Object.entries(t('contact.subjects')).map(([v, label]) => (
                      <option key={v} value={v}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('contact.message')} *</label>
                  <textarea className="form-textarea" name="message" required value={form.message} onChange={handleChange} placeholder={t('contact.messagePlaceholder')} rows={5} />
                </div>

                <button type="submit" disabled={sending} className="btn-primary" style={{ width: '100%', justifyContent: 'center', border: 'none' }}>
                  {sending ? t('common.sending') : t('contact.submit')}
                  {!sending && <span className="btn-arrow">→</span>}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
