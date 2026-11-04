import { Link } from 'react-router-dom'
import { api } from '../api'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

const initials = (name) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('')

export default function AuthorsPage() {
  const { data, loading, error, reload } = useFetch((signal) => api.getAuthors(signal), [])

  if (loading) return <Spinner label="Loading authors..." />
  if (error) return <ErrorMessage title="Could not load authors" message={error.message} onRetry={reload} />

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">Authors</h1>
      <p className="mt-1 mb-6 text-sm text-stone-500">{data.data.length} authors in the store</p>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((author) => (
          <li key={author.id}>
            <Link
              to={`/authors/${author.id}`}
              className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800">
                {initials(author.name)}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-medium text-stone-900">{author.name}</span>
                <span className="text-sm text-stone-500">
                  {author.bookCount} {author.bookCount === 1 ? 'book' : 'books'}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
