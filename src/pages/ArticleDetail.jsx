import { useParams, Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import CallToAction from '../components/sections/CallToAction'
import { useApi } from '../hooks/useApi'
import { useLang } from '../contexts/LangContext'

const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || ''

function ArticleBlock({ block }) {
  if (block.type === 'paragraph') return (
    <p style={{ fontSize: 17, color: 'var(--gray)', lineHeight: 1.85, marginBottom: 24 }}>
      {block.content}
    </p>
  )
  if (block.type === 'heading') {
    const Tag = `h${block.level || 2}`
    return (
      <Tag style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--black)',
        fontSize: block.level === 2 ? 28 : 22, margin: '40px 0 16px', lineHeight: 1.3,
      }}>
        {block.content}
      </Tag>
    )
  }
  if (block.type === 'image') return (
    <figure style={{ margin: '32px 0' }}>
      <img src={`${API_URL}${block.url}`} alt={block.caption || ''}
        style={{ width: '100%', borderRadius: 8, display: 'block' }} />
      {block.caption && (
        <figcaption style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-mid)', marginTop: 10, fontStyle: 'italic' }}>
          {block.caption}
        </figcaption>
      )}
    </figure>
  )
  if (block.type === 'video') {
    const yt = block.url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    const vm = block.url?.match(/vimeo\.com\/(\d+)/)
    return (
      <figure style={{ margin: '32px 0' }}>
        {yt && (
          <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 8, overflow: 'hidden' }}>
            <iframe src={`https://www.youtube.com/embed/${yt[1]}`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen title={block.caption || 'Vidéo'} />
          </div>
        )}
        {vm && (
          <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 8, overflow: 'hidden' }}>
            <iframe src={`https://player.vimeo.com/video/${vm[1]}`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen title={block.caption || 'Vidéo'} />
          </div>
        )}
        {!yt && !vm && block.url && (
          <video controls style={{ width: '100%', borderRadius: 8 }}>
            <source src={`${API_URL}${block.url}`} />
          </video>
        )}
        {block.caption && (
          <figcaption style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-mid)', marginTop: 10, fontStyle: 'italic' }}>
            {block.caption}
          </figcaption>
        )}
      </figure>
    )
  }
  if (block.type === 'quote') return (
    <blockquote style={{
      borderLeft: '4px solid var(--gold)', paddingLeft: 24, margin: '32px 0',
      background: 'var(--gold-pale)', padding: '20px 24px',
      borderRadius: '0 6px 6px 0',
    }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--black)', marginBottom: block.author ? 12 : 0, lineHeight: 1.6 }}>
        "{block.content}"
      </p>
      {block.author && (
        <cite style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 700, fontStyle: 'normal', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          — {block.author}
        </cite>
      )}
    </blockquote>
  )
  return null
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const { t, pick } = useLang()
  const { data: article, loading, error } = useApi(`/articles/${slug}`)
  const { data: allArticles = [] } = useApi('/articles?publie=true')

  if (loading) return (
    <div style={{ padding: '200px 5%', textAlign: 'center', color: 'var(--gray-mid)' }}>
      {t('common.loading')}
    </div>
  )

  if (error || !article) return (
    <div style={{ padding: '180px 5% 80px', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, marginBottom: 16 }}>
        {t('news.notFound')}
      </h1>
      <Link to="/actualites" className="btn-primary" style={{ display: 'inline-flex' }}>
        {t('news.backFromArticle')}
      </Link>
    </div>
  )

  const autresArticles = allArticles
    .filter(a => a.slug !== slug && a.id !== article.id)
    .slice(0, 3)

  let blocks = null
  if (article.contenu) {
    try {
      const parsed = JSON.parse(article.contenu)
      if (Array.isArray(parsed)) blocks = parsed
    } catch {}
  }
  const legacyParagraphs = !blocks && article.contenu
    ? article.contenu.split('\n').filter(p => p.trim())
    : []

  return (
    <>
      <div className="page-hero" style={{ minHeight: '50vh' }}>
        {article.image && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${API_URL}${article.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.18,
          }} />
        )}
        {!article.image && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: article.couleur, opacity: 0.35,
          }} />
        )}
        <div className="page-hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <Link
              to="/actualites"
              style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'var(--gold-light)',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              {t('news.backToNews')}
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
            <span style={{
              display: 'inline-block', padding: '3px 12px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 20, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-light)',
            }}>
              {article.categorie}
            </span>
          </div>

          <h1 className="page-hero-title" style={{ maxWidth: 800 }}>
            {pick(article, 'titre')}
          </h1>

          <p className="page-hero-sub" style={{ maxWidth: 640 }}>
            {pick(article, 'extrait')}
          </p>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 20, marginTop: 28,
            fontSize: 13, color: 'rgba(255,255,255,0.5)',
          }}>
            <span>📅 {article.date}</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
            <span>Excellis Invest Group</span>
          </div>
        </div>
      </div>

      <section style={{ background: 'var(--white)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {article.image && (
            <ScrollReveal>
              <div style={{
                width: '100%', height: 420, borderRadius: 8, overflow: 'hidden',
                marginBottom: 56, boxShadow: 'var(--shadow-md)',
              }}>
                <img
                  src={`${API_URL}${article.image}`}
                  alt={pick(article, 'titre')}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className="article-body">
              {blocks ? (
                blocks.map((block, i) => <ArticleBlock key={block.id || i} block={block} />)
              ) : (
                legacyParagraphs.map((para, i) => <p key={i}>{para}</p>)
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div style={{
              marginTop: 60, paddingTop: 40,
              borderTop: '1px solid var(--gray-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 16,
            }}>
              <Link
                to="/actualites"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: 'var(--teal)', fontSize: 13, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                }}
              >
                {t('news.allNews')}
              </Link>
              <div style={{ display: 'flex', gap: 12 }}>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', border: '1px solid var(--gray-light)',
                    borderRadius: 4, fontSize: 12, fontWeight: 700, color: 'var(--gray-mid)',
                    textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase',
                    transition: 'all 0.2s',
                  }}
                >
                  {t('news.share')}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {autresArticles.length > 0 && (
        <section style={{ background: 'var(--ivory)' }}>
          <ScrollReveal>
            <div style={{ marginBottom: 40 }}>
              <span className="section-label">{t('news.relatedLabel')}</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(24px,3vw,36px)' }}>
                {t('news.relatedTitle1')} <span>{t('news.relatedTitleSpan')}</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="news-grid">
            {autresArticles.map((a, i) => (
              <ScrollReveal key={a.slug || a.id} delay={i * 0.08}>
                <Link to={`/actualites/${a.slug}`} className="news-card">
                  <div className="news-card-img" style={{ background: a.couleur }}>
                    {a.image
                      ? <img src={`${API_URL}${a.image}`} alt={pick(a, 'titre')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span className="news-card-img-text">EIG</span>
                    }
                    <span className="news-cat">{a.categorie}</span>
                  </div>
                  <div className="news-content">
                    <div className="news-date">{a.date}</div>
                    <h3 className="news-title">{pick(a, 'titre')}</h3>
                    <p className="news-excerpt">{pick(a, 'extrait')}</p>
                    <div style={{ marginTop: 16 }}>
                      <span style={{
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
        </section>
      )}

      <CallToAction />
    </>
  )
}
