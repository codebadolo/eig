import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'

export function useApi(path, fallback = undefined) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!path) return
    setLoading(true)
    apiFetch(path)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [path])

  return { data, loading, error }
}
