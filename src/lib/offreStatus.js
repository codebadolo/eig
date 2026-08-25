const MONTHS_FR = {
  janvier: 0, février: 1, fevrier: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, août: 7, aout: 7, septembre: 8, octobre: 9, novembre: 10,
  décembre: 11, decembre: 11,
}

// Parses free-text French deadlines like "07 Décembre 2025" or "Avril 2026".
// Returns null when the text doesn't match a recognizable date.
export function parseFrenchDate(text) {
  if (!text) return null
  const normalized = text.toLowerCase().trim()
  const m = normalized.match(/(?:(\d{1,2})\s+)?([a-zéûô]+)\s+(\d{4})/)
  if (!m) return null
  const [, day, monthName, year] = m
  const month = MONTHS_FR[monthName]
  if (month === undefined) return null
  return day
    ? new Date(Number(year), month, Number(day), 23, 59, 59)
    : new Date(Number(year), month + 1, 0, 23, 59, 59) // no day given -> end of month
}

// An offer with an unrecognizable/missing deadline is treated as open.
export function isOffreClosed(dateExpirationText) {
  const d = parseFrenchDate(dateExpirationText)
  return d ? d.getTime() < Date.now() : false
}

const MONTHS_FR_DISPLAY = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]
const MONTHS_EN_DISPLAY = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Several date fields (offer deadlines, article publish dates) are stored as
// free-text French (e.g. "19 Avril 2026") with no separate English column, so
// switching language never translated the month name. This reformats them
// for display without needing a schema change.
export function formatDeadline(text, lang) {
  const d = parseFrenchDate(text)
  if (!d) return text
  const hasDay = /^\s*\d{1,2}\s/.test(text)
  const year = d.getFullYear()
  if (lang === 'en') {
    const month = MONTHS_EN_DISPLAY[d.getMonth()]
    return hasDay ? `${month} ${d.getDate()}, ${year}` : `${month} ${year}`
  }
  const month = MONTHS_FR_DISPLAY[d.getMonth()]
  return hasDay ? `${d.getDate()} ${month} ${year}` : `${month} ${year}`
}

// Generic alias — same logic, used for article publish dates.
export const formatFrenchDate = formatDeadline
