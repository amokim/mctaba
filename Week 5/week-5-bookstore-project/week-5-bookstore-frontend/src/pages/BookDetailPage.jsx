import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'
import useFetch from '../hooks/useFetch'
import { useCart } from '../context/CartContext'
import BookCover from '../components/BookCover'
import StockBadge from '../components/StockBadge'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import { formatDate, formatKES, slugify } from '../utils/format'

export default function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, MAX_QUANTITY } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const { data, loading, error, reload } = useFetch((signal) => api.getBook(id, signal), [id])

  if (loading) return <Spinner label="Loading book..." />

  if (error) {
    const notFound = error.status === 404 || error.status === 400
    return (
      <ErrorMessage
        title={notFound ? 'Book not found' : 'Could not load this book'}
        message={error.message}
        onRetry={notFound ? undefined : reload}
      />
    )
  }

  const book = data.data

  const handleAdd = () => {
    addToCart(book, quantity)
    setAdded(true)
  }

  return (
    <div>
      <button type="button" onClick={() => navigate(-1)} className="mb-4 text-sm font-medium text-emerald-700 hover:underline">
        ← Back
      </button>

      <div className="grid gap-8 md:grid-cols-[minmax(0,320px)_1fr]">
        <div className="mx-auto w-full max-w-xs overflow-hidden rounded-lg shadow-md md:max-w-none">
          <BookCover book={book} className="aspect-2/3 w-full" />
        </div>

        <div>
          <Link to={`/?category=${slugify(book.category)}`} className="text-sm font-medium tracking-wide text-emerald-700 uppercase hover:underline">
            {book.category}
          </Link>
          <h1 className="mt-1 font-serif text-3xl font-bold text-stone-900 sm:text-4xl">{book.title}</h1>
          <p className="mt-2 text-lg text-stone-600">
            by{' '}
            <Link to={`/authors/${slugify(book.author)}`} className="font-medium text-emerald-800 hover:underline">
              {book.author}
            </Link>
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-stone-900">{formatKES(book.price)}</span>
            <StockBadge inStock={book.inStock} />
          </div>

          {book.description && <p className="mt-6 leading-relaxed text-stone-700">{book.description}</p>}

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 rounded-lg border border-stone-200 bg-white p-4 text-sm sm:max-w-md">
            <dt className="text-stone-500">ISBN</dt>
            <dd className="font-mono text-stone-800">{book.isbn}</dd>
            <dt className="text-stone-500">Category</dt>
            <dd className="text-stone-800">{book.category}</dd>
            <dt className="text-stone-500">Added</dt>
            <dd className="text-stone-800">{formatDate(book.createdAt)}</dd>
          </dl>

          {book.inStock ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-stone-600">
                Qty
                <select
                  value={quantity}
                  onChange={(e) => { setQuantity(Number(e.target.value)); setAdded(false) }}
                  className="rounded-md border border-stone-300 bg-white px-2 py-2"
                >
                  {Array.from({ length: Math.min(10, MAX_QUANTITY) }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={handleAdd}
                className="rounded-md bg-emerald-700 px-6 py-2.5 font-medium text-white hover:bg-emerald-800"
              >
                Add to cart
              </button>
              {added && (
                <span className="text-sm text-emerald-700" role="status">
                  Added! <Link to="/cart" className="font-medium underline">View cart</Link>
                </span>
              )}
            </div>
          ) : (
            <p className="mt-6 text-sm text-stone-500">This book is currently out of stock.</p>
          )}
        </div>
      </div>
    </div>
  )
}
