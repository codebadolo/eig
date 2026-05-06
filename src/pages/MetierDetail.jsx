import { useParams, Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import FilialeLogo from '../components/ui/FilialeLogo'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import FaIcon from '../components/ui/FaIcon'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'

export default function MetierDetail() {
  const { slug } = useParams()
  const { t, pick } = useLang()
  const { data: metier, loading: loadingMetier } = useApi(`/metiers/${slug}`)
  const { data: allFiliales = [] } = useApi('/filiales?actif=true')

  if (loadingMetier) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>

  if (!metier) {
    return (
      <div style={{ padding: '180px 5% 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48 }}>{t('metiers.notFound')}</h1>
        <Link to="/nos-metiers" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>
          {t('metiers.backBtn')}
        </Link>
      </div>
    )
  }

  const filialesIds = Array.isArray(metier.filialesIds) ? metier.filialesIds : []
  const filialesMetier = allFiliales.filter(f => filialesIds.includes(f.id))

  return (
    <>
      <PageHero
        section={`metier-${metier.slug}`}
        fallbackStyle={{ background: metier.couleur }}
        bgImage={metier.image || null}
        label={t('metiers.label')}
      >
        <h1 className="page-hero-title">
          <span style={{ display: 'block', marginBottom: 8, color: 'var(--gold-light)' }}><FaIcon name={metier.icone} size={36} /></span>
          {pick(metier, 'titre')}
        </h1>
        <p className="page-hero-sub">{pick(metier, 'description')}</p>
      </PageHero>

      <section style={{ background: 'var(--white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <ScrollReveal>
            <span className="section-label">{t('metiers.enjeuxLabel')}</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(24px,3vw,38px)' }}>
              {t('metiers.enjeuxTitle1')} <span>{t('metiers.enjeuxTitleSpan')}</span> {t('metiers.enjeuxTitle2')}
            </h2>
            <div className="gold-rule" />
            <p style={{ fontSize: 17, color: 'var(--gray-mid)', lineHeight: 1.8, marginBottom: 28 }}>
              {pick(metier, 'enjeux')}
            </p>
            <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 20, background: 'var(--gold-pale)', padding: '20px 20px 20px 24px', borderRadius: '0 4px 4px 0' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
                {t('metiers.contributionLabel')}
              </div>
              <p style={{ fontSize: 15, color: 'var(--gray)', lineHeight: 1.7 }}>{pick(metier, 'contribution')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <span className="section-label">
              {filialesMetier.length} {filialesMetier.length > 1 ? t('metiers.filiales') : t('metiers.filiale')} {t('metiers.ofSector')}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              {filialesMetier.map(f => (
                <Link key={f.id} to={`/nos-filiales/${f.id}`} className="filiale-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FilialeLogo id={f.id} sigle={f.sigle} size={56} logo={f.logo} />
                  <div style={{ flex: 1 }}>
                    <div className="filiale-name">{f.nom}</div>
                    <div className="filiale-sector">{f.secteur}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 2 }}>
                      <div className="filiale-country">📍 {f.pays}</div>
                      {f.website && (
                        <a
                          href={f.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{ fontSize: 11, color: 'var(--teal)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 3 }}
                        >
                          🌐 {t('filiales.website')}
                        </a>
                      )}
                    </div>
                  </div>
                  <span style={{ color: 'var(--gray-light)', fontSize: 18 }}>→</span>
                </Link>
              ))}
            </div>
            <Link to="/nos-filiales" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, color: 'var(--teal)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase' }}>
              {t('metiers.seeAllFiliales')}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ background: 'var(--ivory)', padding: '60px 5%', textAlign: 'center' }}>
        <Link to="/nos-metiers" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--teal)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase' }}>
          {t('metiers.backAll')}
        </Link>
      </section>

      <CallToAction />
    </>
  )
}
