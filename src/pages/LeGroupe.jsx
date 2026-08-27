import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import PageSkeleton from '../components/ui/PageSkeleton'
import Seo from '../components/Seo'
import { useApi } from '../hooks/useApi'
import FaIcon from '../components/ui/FaIcon'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'
import { useResponsive } from '../hooks/useResponsive'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function LeGroupe() {
  const { t, pick, lang } = useLang()
  const { isMobile, isTablet } = useResponsive()
  const { data: company, loading } = useApi('/company')
  const modele = (lang === 'en' ? company?.modele_en : company?.modele) || company?.modele || t('groupe.modelDesc')
  const { data: galleryImgs = [] } = useApi('/images?section=about-gallery&actif=true')

  if (loading) return <PageSkeleton />

  const valeurs = company?.valeurs ?? []

  return (
    <>
      <Seo
        title="Le Groupe — Notre vision, notre modèle, nos valeurs"
        description="Découvrez Excellis Invest Group : société anonyme de droit burkinabè fondée en 2019, sa mission, sa vision et son modèle de création de valeur en Afrique."
        path="/le-groupe"
      />
      <PageHero
        section="about"
        label={t('groupe.label')}
        title={<>{company?.nom ?? 'Excellis Invest Group'}<br /><span>{t('groupe.heroTitleSpan')}</span></>}
        subtitle={pick(company, 'sousTitreGroupe') || pick(company, 'descriptionCourte') || t('groupe.heroSub')}
      />

      <section style={{ background: 'var(--white)' }}>
        <div className="groupe-page-grid">
          <ScrollReveal>
            <span className="section-label">{t('groupe.whoLabel')}</span>
            <h2 className="section-title">
              {t('groupe.whoTitle')} <span>{t('groupe.whoSpan')}</span> {t('groupe.whoEnd')}
            </h2>
            <div className="gold-rule" />
            <p style={{ fontSize: 17, color: 'var(--gray-mid)', lineHeight: 1.8, textAlign: 'justify' }}>
              {pick(company, 'description') || company?.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)', borderRadius: 6, padding: '40px 36px', color: 'white' }}>
                <div style={{ fontFamily: 'var(--font-num)', fontSize: 52, color: 'var(--gold-light)', lineHeight: 1 }}>2019</div>
                <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6, marginTop: 8 }}>
                  {t('groupe.constituted')}
                </div>
              </div>
              <div style={{ background: 'var(--gold-pale)', borderRadius: 6, padding: '28px 36px', border: '1px solid rgba(184,146,42,0.2)' }}>
                <div style={{ fontFamily: 'var(--font-num)', fontSize: 44, color: 'var(--gold)', lineHeight: 1 }}>+700</div>
                <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginTop: 8 }}>
                  {t('groupe.collaborateursLabel')}
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

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20, marginBottom: 60 }}>
          <ScrollReveal>
            <div style={{ background: 'var(--teal-dark)', borderRadius: 6, padding: '40px 36px', color: 'white', height: '100%' }}>
              <span className="section-label" style={{ color: 'var(--gold-light)' }}>{t('groupe.mission')}</span>
              <div style={{ width: 32, height: 2, background: 'var(--gold)', margin: '16px 0 20px' }} />
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.88)', textAlign: 'justify' }}>
                {pick(company, 'mission') || company?.mission}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div style={{ background: 'var(--white)', borderRadius: 6, padding: '40px 36px', border: '1px solid var(--gray-light)', borderLeft: '4px solid var(--gold)', height: '100%' }}>
              <span className="section-label" style={{ color: 'var(--gold)' }}>{t('groupe.modelLabel')}</span>
              <div style={{ width: 32, height: 2, background: 'var(--gold)', margin: '16px 0 20px' }} />
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--gray-mid)', textAlign: 'justify' }}>
                {modele}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {valeurs.length > 0 && (
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 40, color: 'var(--teal-dark)' }}>
              {t('groupe.valuesTitle')}
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              justifyContent: 'center',
            }}>
              {valeurs.map(v => (
                <div key={v.titre} className="valeur-item" style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  flex: isMobile ? '1 1 calc(50% - 8px)' : '1 1 calc(20% - 13px)',
                  minWidth: isMobile ? 'calc(50% - 8px)' : 180,
                  maxWidth: isMobile ? 'calc(50% - 8px)' : 260,
                }}>
                  <div className="valeur-icon"><FaIcon name={v.icone} size={20} /></div>
                  <div>
                    <div className="valeur-title">{pick(v, 'titre')}</div>
                    <div className="valeur-text">{pick(v, 'description')}</div>
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
            gridTemplateColumns: isMobile ? '1fr' : galleryImgs.length === 1 ? '1fr' : galleryImgs.length === 2 ? '1fr 1fr' : 'repeat(3, 1fr)',
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
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 160 }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ background: 'var(--white)' }}>
        <ScrollReveal>
          <div style={{ maxWidth: 760, marginBottom: 56 }}>
            <span className="section-label">{t('groupe.modelLabel')}</span>
            <h2 className="section-title"><span>{t('groupe.modelTitle')}</span></h2>
            <div className="gold-rule" />
            <p className="section-lead">{modele}</p>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20, marginBottom: 48 }}>
          <ScrollReveal delay={0.05}>
            <div style={{ background: 'var(--gold-pale)', borderRadius: 6, padding: '36px 32px', border: '1px solid rgba(184,146,42,0.2)', height: '100%' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>
                {t('sections.about.vision')}
              </div>
              <div style={{ width: 28, height: 2, background: 'var(--gold)', marginBottom: 20 }} />
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--teal-dark)', fontWeight: 500 }}>
                {pick(company, 'vision') || company?.vision}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div style={{ background: 'var(--ivory)', borderRadius: 6, padding: '36px 32px', border: '1px solid var(--gray-light)', height: '100%' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>
                {t('sections.about.ambition')}
              </div>
              <div style={{ width: 28, height: 2, background: 'var(--teal-light)', marginBottom: 20 }} />
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--gray-mid)' }}>
                {t('sections.about.ambitionText')}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/nos-metiers" className="btn-primary">{t('groupe.btnMetiers')} <FaIcon name="arrow-right" size={16} /></Link>
            <Link to="/nos-filiales" className="btn-teal">{t('groupe.btnFiliales')} <FaIcon name="arrow-right" size={16} /></Link>
            <Link to="/gouvernance" className="btn-secondary" style={{ color: 'var(--teal-dark)', borderColor: 'var(--teal-light)' }}>
              {t('groupe.btnGouvernance')} <FaIcon name="arrow-right" size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <CallToAction />
    </>
  )
}
