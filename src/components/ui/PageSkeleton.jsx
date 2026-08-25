/**
 * Placeholder shown while a page's data is loading, shaped like a real page
 * (hero + card grid) instead of a lone "Chargement…" on a blank screen —
 * avoids the empty-page impression flagged in the editorial audit.
 */
export default function PageSkeleton({ cards = 6 }) {
  return (
    <>
      <div className="page-skeleton-hero">
        <div className="skeleton-block" style={{ width: 140, height: 14 }} />
        <div className="skeleton-block" style={{ width: 'min(560px, 70%)', height: 40 }} />
        <div className="skeleton-block" style={{ width: 'min(420px, 55%)', height: 16 }} />
      </div>
      <div className="page-skeleton-body">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="skeleton-block on-light" style={{ width: '100%', height: 160 }} />
            <div className="skeleton-block on-light" style={{ width: '70%', height: 16 }} />
            <div className="skeleton-block on-light" style={{ width: '90%', height: 12 }} />
          </div>
        ))}
      </div>
    </>
  )
}
