import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'

export default function AdminLoginPage() {
  const { isAdmin, login } = useAdmin()
  const navigate = useNavigate()
  const location = useLocation()
  const [key, setKey] = useState('')
  const [error, setError] = useState(location.state?.message || '')
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from || '/admin'

  if (isAdmin) return <Navigate to={from} replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!key.trim()) return setError('Enter the admin key')

    setSubmitting(true)
    setError('')
    try {
      await login(key.trim())
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-sm py-10">
      <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Admin login</h1>
        <p className="mt-1 text-sm text-stone-500">Enter the admin key to manage books.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="adminKey" className="mb-1 block text-sm font-medium text-stone-700">Admin key</label>
            <input
              id="adminKey"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-emerald-700 py-2 font-medium text-white hover:bg-emerald-800 disabled:opacity-60"
          >
            {submitting ? 'Checking...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}
