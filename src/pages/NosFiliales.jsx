import { useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/sections/CallToAction'
import FilialeLogo from '../components/ui/FilialeLogo'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useLang } from '../contexts/LangContext'
import { useApi } from '../hooks/useApi'
import FaIcon from '../components/ui/FaIcon'

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function NosFiliales() {
  const { t, pick } = useLang()
  const { data: filiales = [], loading } = useApi('/filiales?actif=true')
  const [secteurFilter, setSecteurFilter] = useState('Tous')
  const [paysFilter, setPaysFilter] = useState('Tous')

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>

  const secteurs = [...new Set(filiales.map(f => f.secteur))]
  const pays = [...new Set(filiales.map(f => f.pays))]

  const filtered = filiales.filter(f => {
    const matchSecteur = secteurFilter === 'Tous' || f.secteur === secteurFilter
    const matchPays = paysFilter === 'Tous' || f.pays === paysFilter
    return matchSecteur && matchPays
  })

  return (
    <>
      <PageHero
        section="nos-filiales"
        label={t('filiales.label')}
        title={<>{t('filiales.heroTitle1')} <span>{filiales.length} {t('filiales.heroTitleSpan')}</span> {t('filiales.heroTitle2')}</>}
        subtitle={t('filiales.heroSub')}
      />

      <section style={{ background: 'var(--ivory)' }}>
        <ScrollReveal>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)' }}>
              {t('filiales.filterSecteur')}
            </span>
          </div>
          <div className="filiale-filter-bar" style={{ marginBottom: 20 }}>
            <button className={`filter-btn${secteurFilter === 'Tous' ? ' active' : ''}`} onClick={() => setSecteurFilter('Tous')}>
              {t('filiales.allSecteurs')}
            </button>
            {secteurs.map(s => (
              <button key={s} className={`filter-btn${secteurFilter === s ? ' active' : ''}`} onClick={() => setSecteurFilter(s)}>
                {s}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)' }}>
              {t('filiales.filterPays')}
            </span>
          </div>
          <div className="filiale-filter-bar">
            <button className={`filter-btn${paysFilter === 'Tous' ? ' active' : ''}`} onClick={() => setPaysFilter('Tous')}>
              {t('filiales.allPays')}
            </button>
            {pays.map(p => (
              <button key={p} className={`filter-btn${paysFilter === p ? ' active' : ''}`} onClick={() => setPaysFilter(p)}>
                <FaIcon name="location-dot" size={12} /> {p}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div style={{ marginTop: 12, marginBottom: 32, fontSize: 13, color: 'var(--gray-mid)' }}>
          {filtered.length} {filtered.length > 1 ? t('filiales.foundPlural') : t('filiales.foundSingular')}
        </div>

        <div className="filiales-page-grid">
          {filtered.map((f, i) => (
            <ScrollReveal key={f.id} delay={(i % 3) * 0.06}>
              <Link to={`/nos-filiales/${f.id}`} className="filiale-full-card">
                {f.image && (
                  <div style={{
                    margin: '-32px -28px 6px -28px',
                    height: 148,
                    backgroundImage: `url(${API}${f.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '6px 6px 0 0',
                    flexShrink: 0,
                  }} />
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <FilialeLogo id={f.id} sigle={f.sigle} size={64} />
                  <div>
                    <div className="filiale-name">{f.nom}</div>
                    <div className="filiale-sector">{f.secteur}</div>
                  </div>
                </div>
                <p className="filiale-desc">{pick(f, 'description')}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div className="filiale-country"><FaIcon name="location-dot" size={12} /> {f.pays}{f.ville ? `, ${f.ville}` : ''}</div>
                  {f.website && (
                    <a
                      href={f.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ fontSize: 11, fontWeight: 600, color: 'var(--teal)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, letterSpacing: '0.05em' }}
                    >
                      <FaIcon name="globe" size={12} /> {t('filiales.website')}
                    </a>
                  )}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CallToAction />
    </>
  )
}
