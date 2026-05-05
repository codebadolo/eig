import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import PageHero from '../components/ui/PageHero'
import { useLang } from '../contexts/LangContext'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function Actualites() {
  const { t, pick } = useLang()
  const { data: articles = [], loading } = useApi('/articles?publie=true')
  const [catActive, setCatActive] = useState('Toutes')

  if (loading) return <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>{t('common.loading')}</div>

  const categories = [t('news.all'), ...new Set(articles.map(a => a.categorie))]
  const filtered = catActive === t('news.all') ? articles : articles.filter(a => a.categorie === catActive)

  return (
    <>
      <PageHero
        section="actualites"
        label={t('news.label')}
        title={<>{t('news.heroTitle1')} <span>{t('news.heroTitleSpan')}</span></>}
        subtitle={t('news.heroSub')}
      />

      <section style={{ background: 'var(--ivory)' }}>
        <div className="filiale-filter-bar" style={{ marginBottom: 48 }}>
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

        <div className="news-grid">
          {filtered.map((article, i) => (
            <ScrollReveal key={article.slug || article.id} delay={i * 0.08}>
              <Link to={`/actualites/${article.slug}`} className="news-card">
                <div className="news-card-img" style={{ background: article.couleur }}>
                  {article.image
                    ? <img src={`${API_URL}${article.image}`} alt={pick(article, 'titre')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span className="news-card-img-text">EIG</span>
                  }
                  <span className="news-cat">{article.categorie}</span>
                  {article.featured && (
                    <span style={{
                      position: 'absolute', top: 12, left: 12,
                      background: 'var(--gold)', color: 'white',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                      textTransform: 'uppercase', padding: '3px 10px', borderRadius: 2,
                    }}>{t('news.featured')}</span>
                  )}
                </div>
                <div className="news-content">
                  <div className="news-date">{article.date}</div>
                  <h3 className="news-title">{pick(article, 'titre')}</h3>
                  <p className="news-excerpt" style={{ display: 'block' }}>{pick(article, 'extrait')}</p>
                  <div style={{ marginTop: 16 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: 'var(--teal)',
                    }}>
                      {t('news.readMore')}
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-mid)' }}>
            {t('news.empty')}
          </div>
        )}
      </section>

      <CallToAction />
    </>
  )
}
