import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import FaIcon from '../components/ui/FaIcon'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'

export default function Carrieres() {
  const { t, pick } = useLang()
  const { data: offres = [], loading } = useApi('/carrieres?actif=true')

  const atouts = t('atouts')

  return (
    <>
      <PageHero
        section="careers"
        label={t('careers.label')}
        title={<>{t('careers.title1')}<br /><span>{t('careers.title2')}</span></>}
        subtitle={t('careers.sub')}
      />

      <section style={{ background: 'var(--white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <ScrollReveal>
            <span className="section-label">{t('careers.why')}</span>
            <h2 className="section-title">
              {t('careers.whyTitle1')} <span>{t('careers.whyTitle2')}</span> {t('careers.whyTitle3')}
            </h2>
            <div className="gold-rule" />
            <p className="section-lead">{t('careers.whyText')}</p>
            <Link to="/contact" className="btn-primary">{t('careers.spontaneous')}</Link>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {atouts.map(a => (
                <div key={a.titre} className="pillar" style={{ padding: 24 }}>
                  <div style={{ marginBottom: 12, color: 'var(--gold)' }}><FaIcon name="globe" size={28} /></div>
                  <div className="pillar-title">{a.titre}</div>
                  <div className="pillar-text">{a.texte}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ background: 'var(--ivory)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span className="section-label">{t('careers.postsLabel')}</span>
            <h2 className="section-title">{t('careers.postsTitle1')} <span>{t('careers.postsTitle2')}</span></h2>
          </div>
          {offres.length > 0 && (
            <span style={{ fontSize: 13, color: 'var(--gray-mid)' }}>{offres.length} offre{offres.length > 1 ? 's' : ''}</span>
          )}
        </div>

        {loading && <div style={{ textAlign: 'center', color: 'var(--gray-mid)', padding: '40px 0' }}>{t('common.loading')}</div>}

        {!loading && offres.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-mid)' }}>
            <p style={{ fontSize: 17 }}>{t('careers.noOffers')}</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>{t('careers.noOffersText')}</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {offres.map((o, i) => (
            <ScrollReveal key={o.id} delay={i * 0.06}>
              <Link to={`/carrieres/${o.id}`} style={{ textDecoration: 'none' }}>
                <div className="offre-card">
                  <div>
                    <div className="offre-title">{pick(o, 'titre')}</div>
                    <div className="offre-meta">
                      <span className="offre-tag">{pick(o, 'departement')}</span>
                      <span className="offre-tag gold">{o.type}</span>
                      <span style={{ fontSize: 12, color: 'var(--gray-mid)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        📍 {o.lieu}
                      </span>
                      {o.dateExpiration && (
                        <span style={{ fontSize: 12, color: 'var(--gray-mid)' }}>📅 {o.dateExpiration}</span>
                      )}
                    </div>
                  </div>
                  <span style={{ fontSize: 22, color: 'var(--gray-light)', flexShrink: 0 }}>→</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div style={{ marginTop: 48, padding: 40, background: 'var(--teal-dark)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'white', marginBottom: 8 }}>
                {t('careers.noPostTitle')}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>
                {t('careers.noPostText')}
              </p>
            </div>
            <Link to="/contact" className="btn-primary">{t('careers.spontaneous')}</Link>
          </div>
        </ScrollReveal>
      </section>

      <CallToAction />
    </>
  )
}
