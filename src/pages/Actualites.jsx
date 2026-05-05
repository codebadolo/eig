import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

function readingTime(text = '', lang = 'fr') {
  const words = text.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return lang === 'en' ? `${mins} min read` : `${mins} min de lecture`
}

export default function Actualites() {
  const { t, pick, lang } = useLang()
  const { data: articles = [], loading } = useApi('/articles?publie=true')
  const [catActive, setCatActive] = useState(t('news.all'))

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>

  const allLabel = t('news.all')
  const categories = [allLabel, ...new Set(articles.map(a => a.categorie))]
  const filtered = catActive === allLabel ? articles : articles.filter(a => a.categorie === catActive)

  const featured = filtered.filter(a => a.featured)
  const rest = filtered.filter(a => !a.featured)
  const displayOrder = [...featured, ...rest]

  return (
    <>
      <PageHero
        section="actualites"
        label={t('news.label')}
        title={<>{t('news.heroTitle1')} <span>{t('news.heroTitleSpan')}</span></>}
        subtitle={t('news.heroSub')}
      />

      <section style={{ background: 'var(--ivory)' }}>
        {/* Filtres */}
        <div className="filiale-filter-bar" style={{ marginBottom: 40 }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn${catActive === cat ? ' active' : ''}`}
              onClick={() => setCatActive(cat)}
            >
              {cat}
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
                    ? <img src={`${API_URL}${article.image}`} alt={pick(article, 'titre')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span className="news-card-img-text">EIG</span>
                  }
                  <span className="news-cat">{article.categorie}</span>
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
                    <span className="news-date">{article.date}</span>
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
                    <span className="news-read-link">
                      {t('news.readMore')} <span>→</span>
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
