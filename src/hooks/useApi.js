import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'

// Shared across all useApi() call sites for the lifetime of the SPA session,
// so multiple components requesting the same path (e.g. every page fetching
// '/company') share one network request instead of firing one each.
const cache = new Map()
const inflight = new Map()

// Exported for the rare call site that needs the shared cache outside a component
// (e.g. App.jsx's coming-soon gate, which runs before the router mounts).
export function loadApi(path) {
  return load(path)
}

function load(path) {
  if (cache.has(path)) return Promise.resolve(cache.get(path))
  if (inflight.has(path)) return inflight.get(path)

  const promise = apiFetch(path)
    .then(data => { cache.set(path, data); return data })
    .finally(() => inflight.delete(path))
  inflight.set(path, promise)
  return promise
}

export function useApi(path, fallback = undefined) {
  const [data, setData] = useState(() => (path && cache.has(path)) ? cache.get(path) : fallback)
  const [loading, setLoading] = useState(!(path && cache.has(path)))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!path) return
    if (cache.has(path)) {
      setData(cache.get(path))
      setLoading(false)
      return
    }
    setLoading(true)
    load(path)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [path])

  return { data, loading, error }
}
