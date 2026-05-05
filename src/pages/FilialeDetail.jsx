import { useParams, Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import FilialeLogo from '../components/ui/FilialeLogo'
import { logos } from '../assets/logos'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'

export default function FilialeDetail() {
  const { id } = useParams()
  const { t, pick } = useLang()
  const { data: filiale, loading } = useApi(`/filiales/${id}`)
  const { data: allFiliales = [] } = useApi('/filiales?actif=true')
  const { data: metiers = [] } = useApi('/metiers')

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>

  if (!filiale) {
    return (
      <div style={{ padding: '180px 5% 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48 }}>{t('filiales.notFound')}</h1>
        <Link to="/nos-filiales" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>
          {t('filiales.backBtn')}
        </Link>
      </div>
    )
  }

  const metier = metiers.find(m => m.slug === filiale.secteurSlug)
  const autresFiliales = allFiliales.filter(f => f.secteurSlug === filiale.secteurSlug && f.id !== id).slice(0, 3)
  const hasLogo = Boolean(logos[id])

  return (
    <>
      <PageHero section={`filiale-${id}`} label={t('filiales.label')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}>
          {hasLogo ? (
            <div style={{
              width: 100, height: 100, background: 'white', borderRadius: 12, overflow: 'hidden',
              flexShrink: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src={logos[id]} alt={filiale.nom} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 10 }} />
            </div>
          ) : (
            <div style={{
              width: 80, height: 80, background: 'rgba(255,255,255,0.12)', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-num)', fontSize: 22, color: 'white', fontWeight: 700,
            }}>
              {filiale.sigle}
            </div>
          )}
          <div>
            <h1 className="page-hero-title" style={{ marginBottom: 8 }}>{filiale.nom}</h1>
            <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>
              {filiale.secteur} · {filiale.pays}
            </div>
          </div>
        </div>
      </PageHero>

      <section style={{ background: 'var(--white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 60, alignItems: 'start' }}>
          <ScrollReveal>
            <span className="section-label">{t('filiales.aboutLabel')}</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(24px,3vw,38px)' }}>{filiale.nom}</h2>
            <div className="gold-rule" />
            <p style={{ fontSize: 17, color: 'var(--gray-mid)', lineHeight: 1.8 }}>
              {pick(filiale, 'description')}
            </p>
            <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
              <Link to="/contact" className="btn-primary">{t('filiales.contactBtn')}</Link>
              <Link to="/nos-filiales" className="btn-teal">{t('filiales.allFiliales')}</Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {hasLogo && (
                <div style={{
                  background: 'var(--ivory)', padding: 32, borderRadius: 8,
                  border: '1px solid var(--gray-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={logos[id]} alt={filiale.nom} style={{ maxWidth: '100%', maxHeight: 120, objectFit: 'contain' }} />
                </div>
              )}
              <div style={{ background: 'var(--ivory)', padding: 24, borderRadius: 6, border: '1px solid var(--gray-light)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 8 }}>{t('filiales.sectorLabel')}</div>
                <div style={{ fontWeight: 600, color: 'var(--teal)' }}>{filiale.secteur}</div>
              </div>
              <div style={{ background: 'var(--ivory)', padding: 24, borderRadius: 6, border: '1px solid var(--gray-light)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 8 }}>{t('filiales.paysLabel')}</div>
                <div style={{ fontWeight: 600, color: 'var(--black)' }}>📍 {filiale.pays}</div>
              </div>
              {metier && (
                <div style={{ background: 'var(--gold-pale)', padding: 24, borderRadius: 6, border: '1px solid rgba(184,146,42,0.2)' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
                    {t('filiales.metierLabel')}
                  </div>
                  <Link to={`/nos-metiers/${metier.slug}`} style={{ fontWeight: 600, color: 'var(--teal-dark)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    {metier.icone} {pick(metier, 'titre')} →
                  </Link>
                </div>
              )}
              <div style={{ background: 'var(--white)', padding: 24, borderRadius: 6, border: '1px solid var(--gray-light)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)', marginBottom: 8 }}>{t('filiales.groupLabel')}</div>
                <div style={{ fontWeight: 600, color: 'var(--black)' }}>Excellis Invest Group</div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {autresFiliales.length > 0 && (
          <ScrollReveal>
            <div style={{ marginTop: 80, paddingTop: 60, borderTop: '1px solid var(--gray-light)' }}>
              <span className="section-label">{t('filiales.sameSector')}</span>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
                {autresFiliales.map(f => (
                  <Link key={f.id} to={`/nos-filiales/${f.id}`} className="filiale-card" style={{ flex: '1 1 200px', maxWidth: 280 }}>
                    <FilialeLogo id={f.id} sigle={f.sigle} size={56} />
                    <div className="filiale-name">{f.nom}</div>
                    <div className="filiale-sector">{f.secteur}</div>
                    <div className="filiale-country">📍 {f.pays}</div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>

      <CallToAction />
    </>
  )
}
