// All calls to the Express API go through here
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, status, messages = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.messages = messages
  }
}

async function request(path, { method = 'GET', body, adminKey, signal } = {}) {
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  if (adminKey) headers['x-admin-key'] = adminKey

  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      signal,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new ApiError('Could not reach the server. Check that the API is running.', 0)
  }

  const payload = await res.json().catch(() => null)

  // the API sends { error, message } or { error, messages: [...] }
  if (!res.ok) {
    const messages = payload?.messages || []
    const message = payload?.message || messages.join(', ') || `Request failed with status ${res.status}`
    throw new ApiError(message, res.status, messages)
  }

  return payload
}

// drop empty values so the URL stays clean
const toQuery = (params) => {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, value)
  })
  return query.toString()
}

export const api = {
  getBooks: (params, signal) => request(`/api/books?${toQuery(params)}`, { signal }),
  getBook: (id, signal) => request(`/api/books/${id}`, { signal }),
  getCategories: (signal) => request('/api/categories', { signal }),
  getAuthors: (signal) => request('/api/authors', { signal }),
  getAuthorBooks: (id, signal) => request(`/api/authors/${id}/books`, { signal }),

  createBook: (book, adminKey) => request('/api/books', { method: 'POST', body: book, adminKey }),
  updateBook: (id, book, adminKey) => request(`/api/books/${id}`, { method: 'PUT', body: book, adminKey }),
  deleteBook: (id, adminKey) => request(`/api/books/${id}`, { method: 'DELETE', adminKey }),
  verifyAdmin: (adminKey) => request('/api/admin/verify', { method: 'POST', adminKey }),
}
