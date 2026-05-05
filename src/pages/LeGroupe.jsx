import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import FaIcon from '../components/ui/FaIcon'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function LeGroupe() {
  const { t, pick } = useLang()
  const { data: company, loading } = useApi('/company')
  const { data: galleryImgs = [] } = useApi('/images?section=about-gallery&actif=true')

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>

  const valeurs = company?.valeurs ?? []

  return (
    <>
      <PageHero
        section="about"
        label={t('groupe.label')}
        title={<>{company?.nom ?? 'Excellis Invest Group'} —<br /><span>{t('groupe.heroTitleSpan')}</span></>}
        subtitle={pick(company, 'descriptionCourte') || t('groupe.heroSub')}
      />

      <section style={{ background: 'var(--white)' }}>
        <div className="groupe-page-grid">
          <ScrollReveal>
            <span className="section-label">{t('groupe.whoLabel')}</span>
            <h2 className="section-title">
              {t('groupe.whoTitle')} <span>{t('groupe.whoSpan')}</span> {t('groupe.whoEnd')}
            </h2>
            <div className="gold-rule" />
            <p style={{ fontSize: 17, color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: 24 }}>
              {pick(company, 'description') || company?.description}
            </p>
            <p style={{ fontSize: 15, color: 'var(--gray-mid)', lineHeight: 1.8 }}>
              {t('groupe.whoText')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)', borderRadius: 6, padding: '40px 36px', color: 'white' }}>
                <div style={{ fontFamily: 'var(--font-num)', fontSize: 52, color: 'var(--gold-light)', lineHeight: 1 }}>2025</div>
                <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6, marginTop: 8 }}>
                  {t('groupe.constituted')}
                </div>
              </div>
              <div style={{ background: 'var(--gold-pale)', borderRadius: 6, padding: '28px 36px', border: '1px solid rgba(184,146,42,0.2)' }}>
                <div style={{ fontFamily: 'var(--font-num)', fontSize: 44, color: 'var(--gold)', lineHeight: 1 }}>BBB</div>
                <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginTop: 8 }}>
                  {t('groupe.rating')}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ background: 'var(--ivory)' }}>
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 60px' }}>
          <span className="section-label">{t('groupe.purposeLabel')}</span>
          <h2 className="section-title">{t('groupe.purposeTitle')}</h2>
          <div className="gold-rule" style={{ margin: '24px auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 60 }}>
          <ScrollReveal>
            <div style={{ background: 'var(--teal-dark)', borderRadius: 6, padding: '48px 40px', color: 'white' }}>
              <span className="section-label" style={{ color: 'var(--gold-light)' }}>{t('groupe.mission')}</span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
                "{pick(company, 'mission') || company?.mission}"
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div style={{ background: 'var(--white)', borderRadius: 6, padding: '48px 40px', border: '1px solid var(--gray-light)' }}>
              <span className="section-label">{t('groupe.vision')}</span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.6, color: 'var(--black)', fontStyle: 'italic' }}>
                "{pick(company, 'vision') || company?.vision}"
              </p>
            </div>
          </ScrollReveal>
        </div>

        {valeurs.length > 0 && (
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 36, color: 'var(--black)' }}>
              {t('groupe.valuesTitle')}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {valeurs.map(v => (
                <div key={v.titre} className="valeur-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div className="valeur-icon"><FaIcon name={v.icone} size={20} /></div>
                  <div>
                    <div className="valeur-title">{v.titre}</div>
                    <div className="valeur-text">{v.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}
      </section>

      {galleryImgs.length > 0 && (
        <section style={{ background: 'var(--white)', paddingTop: 0, paddingBottom: 0 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: galleryImgs.length === 1 ? '1fr' : galleryImgs.length === 2 ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: 4,
            maxHeight: 340,
            overflow: 'hidden',
          }}>
            {galleryImgs.slice(0, 6).map((img, i) => (
              <div key={img.id} style={{
                overflow: 'hidden',
                gridColumn: galleryImgs.length >= 3 && i === 0 ? 'span 2' : 'span 1',
              }}>
                <img
                  src={`${API_URL}${img.url}`}
                  alt={img.alt || img.titre || 'Excellis Invest Group'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 160 }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ background: 'var(--white)' }}>
        <div style={{ maxWidth: 640, marginBottom: 60 }}>
          <span className="section-label">{t('groupe.modelLabel')}</span>
          <h2 className="section-title">
            <span>{t('groupe.modelTitle')}</span>
          </h2>
          <div className="gold-rule" />
          <p className="section-lead">{t('groupe.modelDesc')}</p>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link to="/nos-metiers" className="btn-primary">{t('groupe.btnMetiers')}</Link>
          <Link to="/nos-filiales" className="btn-teal">{t('groupe.btnFiliales')}</Link>
          <Link to="/gouvernance" className="btn-secondary" style={{ color: 'var(--teal-dark)', borderColor: 'var(--teal-light)' }}>
            {t('groupe.btnGouvernance')}
          </Link>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
