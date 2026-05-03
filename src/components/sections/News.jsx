import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

export default function News({ articles = [] }) {
  const topArticles = articles.slice(0, 3)

  if (!topArticles.length) return null

  return (
    <section className="section-news">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
        <div>
          <span className="section-label">Actualités &amp; Médias</span>
          <h2 className="section-title">EIG dans <span>le monde qui se construit</span></h2>
        </div>
        <Link to="/actualites" className="btn-primary" style={{ flexShrink: 0 }}>
          Toutes les actualités
          <span className="btn-arrow">→</span>
        </Link>
      </div>

      <ScrollReveal className="news-grid">
        {topArticles.map((article) => (
          <Link key={article.slug || article.id} to={`/actualites/${article.slug}`} className="news-card">
            <div className="news-card-img" style={{ background: article.couleur }}>
              {article.image
                ? <img src={`${API_URL}${article.image}`} alt={article.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span className="news-card-img-text">EIG</span>
              }
              <span className="news-cat">{article.categorie}</span>
            </div>
            <div className="news-content">
              <div className="news-date">{article.date}</div>
              <h3 className="news-title">{article.titre}</h3>
              {article.featured && (
                <p className="news-excerpt">{article.extrait}</p>
              )}
            </div>
          </Link>
        ))}
      </ScrollReveal>
    </section>
  )
}
