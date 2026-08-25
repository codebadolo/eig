import ScrollReveal from './ui/ScrollReveal'

export default function LegalPage({ label, title, updated, sections }) {
  return (
    <>
      <div
        className="page-hero"
        style={{
          minHeight: '38vh',
          background: 'linear-gradient(135deg, rgba(15,72,85,0.94) 0%, rgba(15,25,36,0.96) 100%)',
        }}
      >
        <div className="page-hero-content">
          {label && <span className="page-hero-label">{label}</span>}
          <h1 className="page-hero-title">{title}</h1>
          {updated && <p className="page-hero-sub">{updated}</p>}
        </div>
      </div>

      <section style={{ background: 'var(--white)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 5%' }}>
          {sections.map((s, i) => (
            <ScrollReveal key={i} delay={Math.min(i * 0.05, 0.3)}>
              <div style={{ marginBottom: 44 }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 22,
                    color: 'var(--teal-dark)',
                    marginBottom: 14,
                  }}
                >
                  {s.heading}
                </h2>
                <div className="gold-rule" style={{ margin: '0 0 18px' }} />
                {Array.isArray(s.body) ? (
                  s.body.map((p, j) => (
                    <p
                      key={j}
                      style={{ fontSize: 16, color: 'var(--gray)', lineHeight: 1.85, marginBottom: 16 }}
                    >
                      {p}
                    </p>
                  ))
                ) : (
                  <p style={{ fontSize: 16, color: 'var(--gray)', lineHeight: 1.85 }}>{s.body}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  )
}
