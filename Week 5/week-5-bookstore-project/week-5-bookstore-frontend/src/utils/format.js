export const formatKES = (amount) => `KES ${Number(amount).toLocaleString('en-KE')}`

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })

// must match slugify in the API: "Ngugi wa Thiong'o" -> "ngugi-wa-thiongo"
export const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
