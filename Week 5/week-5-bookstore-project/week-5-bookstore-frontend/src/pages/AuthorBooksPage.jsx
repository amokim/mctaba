import { Link, useParams } from 'react-router-dom'
import { api } from '../api'
import useFetch from '../hooks/useFetch'
import BookCard from '../components/BookCard'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

export default function AuthorBooksPage() {
  const { id } = useParams()
  const { data, loading, error, reload } = useFetch((signal) => api.getAuthorBooks(id, signal), [id])

  if (loading) return <Spinner label="Loading books..." />

  if (error) {
    const notFound = error.status === 404
    return (
      <ErrorMessage
        title={notFound ? 'Author not found' : 'Could not load this author'}
        message={error.message}
        onRetry={notFound ? undefined : reload}
      />
    )
  }

  return (
    <div>
      <Link to="/authors" className="text-sm font-medium text-emerald-700 hover:underline">← All authors</Link>
      <h1 className="mt-2 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">{data.author.name}</h1>
      <p className="mt-1 mb-6 text-sm text-stone-500">
        {data.author.bookCount} {data.author.bookCount === 1 ? 'book' : 'books'} in the store
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.data.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  )
}
