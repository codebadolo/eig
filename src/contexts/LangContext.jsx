import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { translations } from '../i18n/translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const stored = localStorage.getItem('eig_lang')
    return stored === 'en' ? 'en' : 'fr'
  })

  const setLang = useCallback((l) => {
    localStorage.setItem('eig_lang', l)
    setLangState(l)
  }, [])

  // L'attribut lang de <html> est figé à "fr" dans index.html : sans cela il reste
  // faux en version anglaise (lecteurs d'écran, moteurs de recherche, traduction auto).
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  const t = useCallback((path) => {
    const keys = path.split('.')
    let val = translations[lang]
    for (const k of keys) {
      if (val == null) return path
      val = val[k]
    }
    return val ?? path
  }, [lang])

  // Pick bilingual field: tries `field_en` when lang=en, falls back to `field`
  const pick = useCallback((obj, field) => {
    if (!obj) return ''
    if (lang === 'en' && obj[`${field}_en`]) return obj[`${field}_en`]
    return obj[field] ?? ''
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t, pick }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
