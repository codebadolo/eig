import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import FilialeLogo from '../components/ui/FilialeLogo'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'

export default function NosFiliales() {
  const { data: filiales = [], loading } = useApi('/filiales?actif=true')
  const [secteurFilter, setSecteurFilter] = useState('Tous')
  const [paysFilter, setPaysFilter] = useState('Tous')

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>Chargement...</div>

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
        label="Nos Filiales"
        title={<>Un portefeuille de <span>{filiales.length} entités</span> opérationnelles</>}
        subtitle="De Ouagadougou à Abidjan, nos filiales opèrent dans 9 secteurs stratégiques pour contribuer au développement économique de l'Afrique de l'Ouest."
      />

      <section style={{ background: 'var(--ivory)' }}>
        <ScrollReveal>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)' }}>
              Filtrer par secteur
            </span>
          </div>
          <div className="filiale-filter-bar" style={{ marginBottom: 20 }}>
            <button
              className={`filter-btn${secteurFilter === 'Tous' ? ' active' : ''}`}
              onClick={() => setSecteurFilter('Tous')}
            >
              Tous les secteurs
            </button>
            {secteurs.map(s => (
              <button
                key={s}
                className={`filter-btn${secteurFilter === s ? ' active' : ''}`}
                onClick={() => setSecteurFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-mid)' }}>
              Filtrer par pays
            </span>
          </div>
          <div className="filiale-filter-bar">
            <button
              className={`filter-btn${paysFilter === 'Tous' ? ' active' : ''}`}
              onClick={() => setPaysFilter('Tous')}
            >
              Tous les pays
            </button>
            {pays.map(p => (
              <button
                key={p}
                className={`filter-btn${paysFilter === p ? ' active' : ''}`}
                onClick={() => setPaysFilter(p)}
              >
                📍 {p}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div style={{ marginTop: 12, marginBottom: 32, fontSize: 13, color: 'var(--gray-mid)' }}>
          {filtered.length} filiale{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}
        </div>

        <div className="filiales-page-grid">
          {filtered.map((f, i) => (
            <ScrollReveal key={f.id} delay={(i % 3) * 0.06}>
              <Link to={`/nos-filiales/${f.id}`} className="filiale-full-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <FilialeLogo id={f.id} sigle={f.sigle} size={64} />
                  <div>
                    <div className="filiale-name">{f.nom}</div>
                    <div className="filiale-sector">{f.secteur}</div>
                  </div>
                </div>
                <p className="filiale-desc">{f.description}</p>
                <div className="filiale-country">📍 {f.pays}</div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CallToAction />
    </>
  )
}
