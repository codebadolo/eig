const BASE = import.meta.env.VITE_API_URL || '/api'

function getToken() {
  return localStorage.getItem('eig_token')
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })

  if (res.status === 401) {
    localStorage.removeItem('eig_token')
    window.location.href = '/admin/login'
    return
  }

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Erreur serveur')
  return data
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),

  upload: async (file) => {
    const token = getToken()
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`${BASE}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Erreur upload')
    return data
  },
}
