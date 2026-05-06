import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

function BulletList({ text, color = 'var(--teal)' }) {
  if (!text) return null
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {text.split('\n').filter(Boolean).map((line, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'var(--gray-mid)', lineHeight: 1.6 }}>
          <span style={{ color, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>→</span>
          {line}
        </li>
      ))}
    </ul>
  )
}

function InfoBadge({ label, value, accent }) {
  return (
    <div style={{ background: accent ? 'var(--gold-pale)' : 'var(--ivory)', padding: '16px 20px', borderRadius: 6, border: `1px solid ${accent ? 'rgba(184,146,42,0.25)' : 'var(--gray-light)'}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent ? 'var(--gold)' : 'var(--gray-mid)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 600, color: accent ? 'var(--teal-dark)' : 'var(--black)', fontSize: 14 }}>{value}</div>
    </div>
  )
}

function CandidatureForm({ offre, t }) {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', lettre: '' })
  const [cv, setCv] = useState(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const MAX_CV_MB = 5
  const MAX_CV_BYTES = MAX_CV_MB * 1024 * 1024

  const handleCvChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > MAX_CV_BYTES) {
      setError(`Le fichier est trop lourd (${(file.size / 1024 / 1024).toFixed(1)} Mo). Maximum : ${MAX_CV_MB} Mo.`)
      e.target.value = ''
      return
    }
    setError('')
    setCv(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nom || !form.prenom || !form.email) return setError('Veuillez remplir les champs obligatoires.')
    if (cv && cv.size > MAX_CV_BYTES) return setError(`CV trop lourd. Maximum : ${MAX_CV_MB} Mo.`)
    setSending(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('carriere_id', offre.id)
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (cv) fd.append('cv', cv)
      const res = await fetch(`${API_BASE}/candidatures`, { method: 'POST', body: fd })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        const firstError = data.errors
          ? Object.values(data.errors).flat()[0]
          : null
        throw new Error(firstError || data.message || 'Une erreur est survenue. Veuillez réessayer.')
      }
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 6,
    border: '1px solid var(--gray-light)', background: 'white',
    fontSize: 14, color: 'var(--dark)', outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  }
  const labelStyle = {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 6, display: 'block',
  }

  if (sent) return (
    <div style={{ background: 'var(--ivory)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, padding: '40px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--teal-dark)', marginBottom: 10 }}>
        {t('careers.sentTitle')}
      </div>
      <p style={{ fontSize: 15, color: 'var(--gray-mid)', lineHeight: 1.7 }}>
        {t('careers.sentText').replace('{name}', form.prenom).replace('{poste}', offre.titre)}
      </p>
    </div>
  )

  return (
    <div style={{ background: 'var(--ivory)', borderRadius: 8, padding: '40px 32px', border: '1px solid var(--gray-light)' }}>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>{t('careers.applyLabel')}</span>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--dark)', margin: '8px 0 4px' }}>{t('careers.applyTitle')}</h2>
      <div style={{ width: 32, height: 2, background: 'var(--gold)', marginBottom: 28 }} />

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t('contact.fname')} <span style={{ color: 'var(--gold)' }}>*</span></label>
            <input style={inputStyle} value={form.prenom} onChange={set('prenom')} placeholder={t('contact.fname')}
              onFocus={e => e.target.style.borderColor = 'var(--teal)'}
              onBlur={e => e.target.style.borderColor = 'var(--gray-light)'} />
          </div>
          <div>
            <label style={labelStyle}>{t('contact.lname')} <span style={{ color: 'var(--gold)' }}>*</span></label>
            <input style={inputStyle} value={form.nom} onChange={set('nom')} placeholder={t('contact.lname')}
              onFocus={e => e.target.style.borderColor = 'var(--teal)'}
              onBlur={e => e.target.style.borderColor = 'var(--gray-light)'} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t('contact.email')} <span style={{ color: 'var(--gold)' }}>*</span></label>
            <input type="email" style={inputStyle} value={form.email} onChange={set('email')} placeholder="votre@email.com"
              onFocus={e => e.target.style.borderColor = 'var(--teal)'}
              onBlur={e => e.target.style.borderColor = 'var(--gray-light)'} />
          </div>
          <div>
            <label style={labelStyle}>{t('contact.phone')}</label>
            <input style={inputStyle} value={form.telephone} onChange={set('telephone')} placeholder="+226 XX XX XX XX"
              onFocus={e => e.target.style.borderColor = 'var(--teal)'}
              onBlur={e => e.target.style.borderColor = 'var(--gray-light)'} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>{t('careers.cvLabel')}</label>
          <label style={{ display: 'block', cursor: 'pointer' }}>
            <div style={{
              border: `2px dashed ${cv ? 'var(--teal)' : 'var(--gray-light)'}`,
              borderRadius: 6, padding: '20px 16px', textAlign: 'center',
              background: cv ? 'rgba(26,107,122,0.04)' : 'white', transition: 'all 0.2s',
            }}>
              {cv ? (
                <span style={{ fontSize: 13, color: 'var(--teal)', fontWeight: 600 }}>
                  📎 {cv.name}
                  <span style={{ color: 'var(--gray-mid)', fontWeight: 400, marginLeft: 8 }}>
                    ({(cv.size / 1024 / 1024).toFixed(1)} Mo) — cliquer pour changer
                  </span>
                </span>
              ) : (
                <span style={{ fontSize: 13, color: 'var(--gray-mid)' }}>
                  {t('careers.cvHint')} <span style={{ color: 'var(--teal)', textDecoration: 'underline' }}>{t('careers.cvBrowse')}</span>
                  <span style={{ display: 'block', fontSize: 11, marginTop: 4, color: '#D1D5DB' }}>.pdf · .doc · .docx</span>
                </span>
              )}
            </div>
            <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleCvChange} style={{ display: 'none' }} />
          </label>
        </div>

        <div>
          <label style={labelStyle}>{t('careers.motivation')}</label>
          <textarea style={{ ...inputStyle, height: 140, resize: 'vertical' }} value={form.lettre} onChange={set('lettre')}
            placeholder={t('careers.motivationPlaceholder')}
            onFocus={e => e.target.style.borderColor = 'var(--teal)'}
            onBlur={e => e.target.style.borderColor = 'var(--gray-light)'} />
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, padding: '12px 16px', fontSize: 14, color: '#DC2626' }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={sending} style={{
          background: sending ? '#9CA3AF' : 'var(--teal-dark)', color: 'white',
          border: 'none', borderRadius: 6, padding: '14px 32px',
          fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          cursor: sending ? 'not-allowed' : 'pointer', alignSelf: 'flex-start',
          transition: 'opacity 0.2s',
        }}>
          {sending ? t('common.sending') : t('careers.applyBtn')}
        </button>

        <div style={{
          marginTop: 8, paddingTop: 20, borderTop: '1px solid var(--gray-light)',
          fontSize: 13, color: 'var(--gray-mid)', lineHeight: 1.6,
        }}>
          Vous pouvez également envoyer votre candidature directement par e-mail à{' '}
          <a href="mailto:carrieres@excellis-invest-group.com" style={{ color: 'var(--teal)', fontWeight: 600 }}>
            carrieres@excellis-invest-group.com
          </a>
          {' '}en précisant le poste visé.
        </div>
      </form>
    </div>
  )
}

export default function CarriereDetail() {
  const { id } = useParams()
  const { t } = useLang()
  const { data: offre, loading } = useApi(`/carrieres/${id}`)

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>

  if (!offre) {
    return (
      <div style={{ padding: '180px 5% 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48 }}>{t('careers.notFound')}</h1>
        <Link to="/carrieres" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>
          {t('careers.backBtn')}
        </Link>
      </div>
    )
  }

  return (
    <>
      <PageHero section="careers">
        <Link to="/carrieres" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
          {t('careers.allOffers')}
        </Link>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--gold)', color: 'var(--teal-dark)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 3 }}>{offre.type}</span>
          <span style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 3 }}>{offre.departement}</span>
        </div>
        <h1 className="page-hero-title">{offre.titre}</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>📍 {offre.lieu}</span>
          {offre.salaire && <><span style={{ opacity: 0.3 }}>·</span><span>💼 {offre.salaire}</span></>}
          {offre.dateExpiration && <><span style={{ opacity: 0.3 }}>·</span><span>📅 {t('careers.expires')} {offre.dateExpiration}</span></>}
        </p>
      </PageHero>

      <section style={{ background: 'var(--white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 64, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            <ScrollReveal>
              <span className="section-label">{t('careers.post')}</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(22px,2.8vw,34px)' }}>{t('careers.descTitle')}</h2>
              <div className="gold-rule" />
              <p style={{ fontSize: 16, color: 'var(--gray-mid)', lineHeight: 1.85 }}>{offre.description}</p>
            </ScrollReveal>

            {offre.missions && (
              <ScrollReveal delay={0.08}>
                <div style={{ borderLeft: '3px solid var(--teal)', paddingLeft: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--dark)', marginBottom: 20 }}>{t('careers.missions')}</h3>
                  <BulletList text={offre.missions} color="var(--teal)" />
                </div>
              </ScrollReveal>
            )}

            {offre.profil && (
              <ScrollReveal delay={0.12}>
                <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--dark)', marginBottom: 20 }}>{t('careers.profile')}</h3>
                  <BulletList text={offre.profil} color="var(--gold)" />
                </div>
              </ScrollReveal>
            )}

            {offre.avantages && (
              <ScrollReveal delay={0.16}>
                <div style={{ background: 'var(--ivory)', borderRadius: 8, padding: '28px 32px', border: '1px solid var(--gray-light)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--dark)', marginBottom: 20 }}>{t('careers.benefits')}</h3>
                  <BulletList text={offre.avantages} color="var(--teal)" />
                </div>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 100 }}>
              <InfoBadge label={t('careers.contract')} value={offre.type} />
              <InfoBadge label={t('careers.department')} value={offre.departement} />
              <InfoBadge label={t('careers.location')} value={`📍 ${offre.lieu}`} />
              {offre.salaire && <InfoBadge label={t('careers.salary')} value={offre.salaire} accent />}
              {offre.dateExpiration && <InfoBadge label={t('careers.deadline')} value={`📅 ${offre.dateExpiration}`} />}

              <div style={{ marginTop: 8, padding: '16px 0', borderTop: '1px solid var(--gray-light)' }}>
                <Link to="/carrieres" style={{ fontSize: 13, color: 'var(--teal)', textDecoration: 'none' }}>
                  {t('careers.allOffers')}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ background: 'var(--white)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <ScrollReveal>
            <CandidatureForm offre={offre} t={t} />
          </ScrollReveal>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
