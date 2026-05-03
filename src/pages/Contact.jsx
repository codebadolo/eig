import { useState } from 'react'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'

export default function Contact() {
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
        label="Contact"
        title={<>Parlons de vos <span>opportunités</span></>}
        subtitle="Investisseur, partenaire institutionnel, presse ou candidat — nous sommes à votre écoute pour explorer les opportunités ensemble."
      />

      <section style={{ background: 'var(--white)' }}>
        <div className="contact-grid">
          <ScrollReveal>
            <span className="section-label">Coordonnées</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(24px,3vw,38px)' }}>
              Nous <span>contacter</span>
            </h2>
            <div className="gold-rule" />

            <div className="contact-info-item">
              <div className="contact-icon">📍</div>
              <div>
                <div className="contact-label">Adresse</div>
                <div className="contact-value">{company?.adresse}</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon">📞</div>
              <div>
                <div className="contact-label">Téléphone</div>
                <div className="contact-value">{company?.telephone}</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon">✉️</div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">{company?.email}</div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 16 }}>
                Suivez-nous
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
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>Message envoyé !</h3>
                <p style={{ color: 'var(--gray-mid)', lineHeight: 1.7 }}>
                  Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                </p>
                <button className="btn-primary" style={{ marginTop: 24, border: 'none' }} onClick={() => setSent(false)}>
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginBottom: 28, color: 'var(--black)' }}>
                  Formulaire de contact
                </h3>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Prénom *</label>
                    <input className="form-input" name="prenom" required value={form.prenom} onChange={handleChange} placeholder="Votre prénom" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nom *</label>
                    <input className="form-input" name="nom" required value={form.nom} onChange={handleChange} placeholder="Votre nom" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" name="email" required value={form.email} onChange={handleChange} placeholder="votre@email.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone</label>
                    <input className="form-input" name="telephone" value={form.telephone} onChange={handleChange} placeholder="+226 XX XX XX XX" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Objet de la demande *</label>
                  <select className="form-select" name="objet" required value={form.objet} onChange={handleChange}>
                    <option value="information">Information générale</option>
                    <option value="investissement">Investissement / Partenariat</option>
                    <option value="presse">Relations presse</option>
                    <option value="recrutement">Recrutement / Carrières</option>
                    <option value="filiale">Contact filiale</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea className="form-textarea" name="message" required value={form.message} onChange={handleChange} placeholder="Décrivez votre demande..." rows={5} />
                </div>

                <button type="submit" disabled={sending} className="btn-primary" style={{ width: '100%', justifyContent: 'center', border: 'none' }}>
                  {sending ? 'Envoi en cours...' : 'Envoyer le message'}
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
