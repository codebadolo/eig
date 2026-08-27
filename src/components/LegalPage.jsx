import ScrollReveal from './ui/ScrollReveal'

const pStyle = { fontSize: 16, color: 'var(--gray)', lineHeight: 1.85, marginBottom: 16 }

/**
 * Rend une section de page juridique.
 * Une section accepte, dans l'ordre d'affichage : body (texte), bullets (liste),
 * table (tableau), note (encadré de mise en garde).
 */
function SectionBody({ s }) {
  return (
    <>
      {s.body && (
        Array.isArray(s.body)
          ? s.body.map((p, j) => <p key={j} style={pStyle}>{p}</p>)
          : <p style={{ ...pStyle, marginBottom: 0 }}>{s.body}</p>
      )}

      {s.bullets && (
        <ul style={{ margin: '4px 0 16px', paddingLeft: 22 }}>
          {s.bullets.map((b, j) => (
            <li key={j} style={{ ...pStyle, marginBottom: 8 }}>{b}</li>
          ))}
        </ul>
      )}

      {s.table && (
        // Les tableaux juridiques sont larges : ils défilent dans leur propre
        // conteneur pour que la page ne parte jamais en scroll horizontal.
        <div style={{ overflowX: 'auto', margin: '4px 0 16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, minWidth: 480 }}>
            <thead>
              <tr>
                {s.table.head.map((h, j) => (
                  <th
                    key={j}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      background: 'var(--gold-pale)',
                      color: 'var(--teal-dark)',
                      fontFamily: 'var(--font-display)',
                      fontSize: 12,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      borderBottom: '2px solid rgba(184,146,42,0.35)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table.rows.map((row, j) => (
                <tr key={j}>
                  {row.map((cell, k) => (
                    <td
                      key={k}
                      style={{
                        padding: '11px 14px',
                        color: 'var(--gray)',
                        lineHeight: 1.6,
                        borderBottom: '1px solid var(--gray-light)',
                        verticalAlign: 'top',
                        fontWeight: k === 0 ? 600 : 400,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {s.note && (
        <div
          style={{
            background: 'var(--gold-pale)',
            borderLeft: '3px solid var(--gold)',
            borderRadius: 4,
            padding: '14px 18px',
            margin: '4px 0 16px',
          }}
        >
          <p style={{ ...pStyle, marginBottom: 0, fontSize: 15 }}>{s.note}</p>
        </div>
      )}
    </>
  )
}

export default function LegalPage({ label, title, updated, intro, sections }) {
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
          {intro && (
            <ScrollReveal>
              <p style={{ ...pStyle, fontSize: 17, marginBottom: 40 }}>{intro}</p>
            </ScrollReveal>
          )}

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
                <SectionBody s={s} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  )
}
