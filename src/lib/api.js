// VITE_API_URL peut arriver mal formé si le domaine a été saisi avec un / final
// au moment du build : "https://site.com//api". Toutes les requêtes partent alors
// en "//api/..." et le serveur répond 404. On normalise donc la base ici :
// les // en trop sont réduits (sans toucher au "://" du protocole) et le / final retiré.
const BASE = (import.meta.env.VITE_API_URL || '/api')
  .replace(/([^:]|^)\/{2,}/g, '$1/')
  .replace(/\/+$/, '')

export async function apiFetch(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}
