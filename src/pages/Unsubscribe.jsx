import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import logoLight from '../assets/excellis-invest-group-font-blanc.png'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export default function Unsubscribe() {
  const { t } = useLang()
  const [params] = useSearchParams()
  const token = params.get('token')
  const [state, setState] = useState('loading') // loading | success | error

  useEffect(() => {
    if (!token) { setState('error'); return }
    fetch(`${API_BASE}/newsletter/unsubscribe/${token}`)
      .then(r => setState(r.ok ? 'success' : 'error'))
      .catch(() => setState('error'))
  }, [token])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F4855 0%, #0F1924 100%)',
      padding: '40px 20px',
    }}>
      <img src={logoLight} alt="Excellis Invest Group" style={{ width: 180, marginBottom: 48 }} />

      <div style={{
        background: 'white', borderRadius: 12, padding: '48px 56px',
        maxWidth: 480, width: '100%', textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {state === 'loading' && (
          <div style={{ color: '#6B7280', fontSize: 15 }}>...</div>
        )}
        {state === 'success' && (
          <>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, color: '#0F1924', marginBottom: 12 }}>
              {t('unsubscribe.title')}
            </h1>
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
              {t('unsubscribe.success')}
            </p>
            <Link to="/" style={{
              display: 'inline-block', padding: '12px 28px', borderRadius: 6,
              background: '#0F4855', color: 'white', textDecoration: 'none',
              fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
            }}>
              {t('unsubscribe.home')}
            </Link>
          </>
        )}
        {state === 'error' && (
          <>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✕</div>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, color: '#0F1924', marginBottom: 12 }}>
              {t('unsubscribe.title')}
            </h1>
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
              {t('unsubscribe.error')}
            </p>
            <Link to="/" style={{
              display: 'inline-block', padding: '12px 28px', borderRadius: 6,
              background: '#0F4855', color: 'white', textDecoration: 'none',
              fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
            }}>
              {t('unsubscribe.home')}
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
