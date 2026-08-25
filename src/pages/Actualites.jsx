import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import Seo from '../components/Seo'
import PageSkeleton from '../components/ui/PageSkeleton'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'
import FaIcon from '../components/ui/FaIcon'
import { useLang } from '../contexts/LangContext'
import { formatFrenchDate, parseFrenchDate } from '../lib/offreStatus'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

function readingTime(text = '', lang = 'fr') {
  const words = text.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return lang === 'en' ? `${mins} min read` : `${mins} min de lecture`
}

export default function Actualites() {
  const { t, pick, lang } = useLang()
  const { data: articles = [], loading } = useApi('/articles?publie=true')
  const [catActive, setCatActive] = useState(null)

  if (loading) return <PageSkeleton />

  const allLabel = t('news.all')
  const tCat = (cat) => t(`news.categories.${cat}`) !== `news.categories.${cat}` ? t(`news.categories.${cat}`) : cat
  const categories = [...new Set(articles.map(a => a.categorie))]
  const filtered = catActive === null ? articles : articles.filter(a => a.categorie === catActive)

  const byRecentDate = (a, b) => (parseFrenchDate(b.date)?.getTime() ?? 0) - (parseFrenchDate(a.date)?.getTime() ?? 0)
  const featured = filtered.filter(a => a.featured).sort(byRecentDate)
  const rest = filtered.filter(a => !a.featured).sort(byRecentDate)
  const displayOrder = [...featured, ...rest]

  return (
    <>
      <Seo
        title="Actualités & Médias"
        description="Suivez les actualités du groupe Excellis Invest Group : expansion, notation financière, événements et vie de ses filiales en Afrique de l'Ouest."
        path="/actualites"
      />
      <PageHero
        section="actualites"
        label={t('news.label')}
        title={<>{t('news.heroTitle1')} <span>{t('news.heroTitleSpan')}</span></>}
        subtitle={t('news.heroSub')}
      />

      <section style={{ background: 'var(--ivory)' }}>
        {/* Filtres */}
        <div className="filiale-filter-bar" style={{ marginBottom: 40 }}>
          <button
            key="__all__"
            className={`filter-btn${catActive === null ? ' active' : ''}`}
            onClick={() => setCatActive(null)}
          >
            {allLabel}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn${catActive === cat ? ' active' : ''}`}
              onClick={() => setCatActive(cat)}
            >
              {tCat(cat)}
            </button>
          ))}
        </div>

        {/* Compteur */}
        <div style={{ marginBottom: 24, fontSize: 13, color: 'var(--gray-mid)' }}>
          {displayOrder.length} {displayOrder.length > 1
            ? (lang === 'en' ? 'articles' : 'articles')
            : (lang === 'en' ? 'article' : 'article')}
        </div>

        {/* Grille */}
        <div className="news-grid">
          {displayOrder.map((article, i) => (
            <ScrollReveal key={article.slug || article.id} delay={i * 0.06}>
              <Link to={`/actualites/${article.slug}`} className="news-card">
                <div className="news-card-img" style={{ background: article.couleur || 'linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)' }}>
                  {article.image
                    ? <img src={`${API_URL}${article.image}`} alt={pick(article, 'titre')} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span className="news-card-img-text">Excellis Invest Group</span>
                  }
                  <span className="news-cat">{tCat(article.categorie)}</span>
                  {article.featured && (
                    <span style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'var(--gold)', color: 'white',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                      textTransform: 'uppercase', padding: '3px 10px', borderRadius: 2,
                    }}>{t('news.featured')}</span>
                  )}
                </div>

                <div className="news-content">
                  <div className="news-meta">
                    <span className="news-date">{formatFrenchDate(article.date, lang)}</span>
                    {(pick(article, 'extrait') || article.extrait) && (
                      <span className="news-read-time">
                        ⏱ {readingTime(pick(article, 'contenu') || article.contenu || pick(article, 'extrait') || '', lang)}
                      </span>
                    )}
                  </div>

                  <h3 className="news-title">{pick(article, 'titre')}</h3>
                  <p className="news-excerpt">{pick(article, 'extrait')}</p>

                  <div className="news-card-footer">
                    <span style={{ fontSize: 11, color: 'var(--gray-mid)' }}>
                      Excellis Invest Group
                    </span>
                    <span className="news-read-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {t('news.readMore')}
                      <FaIcon name="arrow-right" size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {displayOrder.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-mid)' }}>
            {t('news.empty')}
          </div>
        )}
      </section>

      <CallToAction />
    </>
  )
}
