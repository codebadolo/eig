import { useEffect, useState } from 'react'
import { useLang } from '../contexts/LangContext'
import FaIcon from '../components/ui/FaIcon'
import logoSombre from '../assets/LOGOsombrenew.png'

function getTimeLeft(launchAt) {
  const diff = Math.max(0, launchAt.getTime() - Date.now())
  return {
    total:   diff,
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export default function ComingSoon({ launchAt, onDone, contactEmail }) {
  const { t } = useLang()
  const [left, setLeft] = useState(() => getTimeLeft(launchAt))

  useEffect(() => {
    const id = setInterval(() => {
      const next = getTimeLeft(launchAt)
      setLeft(next)
      if (next.total <= 0) {
        clearInterval(id)
        onDone?.()
      }
    }, 1000)
    return () => clearInterval(id)
  }, [launchAt, onDone])

  const units = [
    { value: left.days,    label: t('comingSoon.days') },
    { value: left.hours,   label: t('comingSoon.hours') },
    { value: left.minutes, label: t('comingSoon.minutes') },
    { value: left.seconds, label: t('comingSoon.seconds') },
  ]

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '40px 5%',
      background: 'linear-gradient(160deg, var(--teal-dark), var(--black))',
      color: 'var(--white)',
    }}>
      <img src={logoSombre} alt="Excellis Invest Group" style={{ height: 76, marginBottom: 40 }} />

      <span style={{
        fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
        color: 'var(--gold-light)', border: '1px solid rgba(212,170,74,0.4)',
        borderRadius: 999, padding: '8px 20px', marginBottom: 24,
      }}>
        {t('comingSoon.badge')}
      </span>

      <h1 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.1, marginBottom: 20,
      }}>
        {t('comingSoon.title1')}{' '}
        <span style={{ color: 'var(--gold-light)' }}>{t('comingSoon.titleSpan')}</span>
      </h1>

      <p style={{ fontSize: 18, color: 'rgba(253,252,249,0.75)', maxWidth: 560, marginBottom: 48, lineHeight: 1.7 }}>
        {t('comingSoon.subtitle')}
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
        {units.map((u) => (
          <div key={u.label} style={{
            width: 88, padding: '20px 0',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
          }}>
            <div style={{ fontFamily: 'var(--font-num)', fontSize: 36, fontWeight: 700 }}>
              {String(u.value).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(253,252,249,0.6)', marginTop: 4 }}>
              {u.label}
            </div>
          </div>
        ))}
      </div>

      {contactEmail && (
        <a href={`mailto:${contactEmail}`} className="btn-teal" style={{ background: 'transparent', borderColor: 'var(--gold-light)', color: 'var(--gold-light)' }}>
          {t('comingSoon.contact')}
          <FaIcon name="arrow-right" size={16} />
        </a>
      )}
    </div>
  )
}
