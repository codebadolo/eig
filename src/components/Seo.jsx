import { useEffect } from 'react'

const SITE = 'https://excellis-invest-group.jofedigital.com'
const DEFAULT_IMAGE = `${SITE}/og-image.png`
const SITE_NAME = 'Excellis Invest Group'

function setMetaByName(name, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaByProperty(property, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Met à jour title/description/canonical/Open Graph par page (SPA côté client).
 * Chaque route doit fournir un title et une description distincts (cf. audit SEO).
 */
export default function Seo({ title, description, path = '/', image, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Investir autrement`

    document.title = fullTitle

    setMetaByName('description', description)
    setMetaByProperty('og:title', fullTitle)
    setMetaByProperty('og:description', description)
    setMetaByProperty('og:url', `${SITE}${path}`)
    setMetaByProperty('og:image', image || DEFAULT_IMAGE)
    setMetaByName('twitter:title', fullTitle)
    setMetaByName('twitter:description', description)
    setMetaByName('twitter:image', image || DEFAULT_IMAGE)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE}${path}`)

    setMetaByName('robots', noindex ? 'noindex, nofollow' : 'index, follow')
  }, [title, description, path, image, noindex])

  return null
}
