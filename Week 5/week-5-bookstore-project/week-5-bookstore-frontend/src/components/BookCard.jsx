import { Link } from 'react-router-dom'
import BookCover from './BookCover'
import StockBadge from './StockBadge'
import { useCart } from '../context/CartContext'
import { formatKES, slugify } from '../utils/format'

export default function BookCard({ book }) {
  const { addToCart } = useCart()

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      <Link to={`/books/${book.id}`} className="block aspect-2/3 overflow-hidden bg-stone-100">
        <BookCover book={book} className="h-full w-full transition duration-300 group-hover:scale-105" />
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="text-xs font-medium tracking-wide text-emerald-700 uppercase">{book.category}</span>
        <Link to={`/books/${book.id}`} className="line-clamp-2 font-serif font-semibold text-stone-900 hover:text-emerald-800">
          {book.title}
        </Link>
        <Link to={`/authors/${slugify(book.author)}`} className="truncate text-sm text-stone-500 hover:text-emerald-700 hover:underline">
          {book.author}
        </Link>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-semibold text-stone-900">{formatKES(book.price)}</span>
          <StockBadge inStock={book.inStock} />
        </div>

        <button
          type="button"
          onClick={() => addToCart(book)}
          disabled={!book.inStock}
          className="mt-2 rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
        >
          {book.inStock ? 'Add to cart' : 'Unavailable'}
        </button>
      </div>
    </article>
  )
}

export function BookCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border border-stone-200 bg-white">
      <div className="aspect-2/3 bg-stone-200" />
      <div className="space-y-2 p-3">
        <div className="h-3 w-1/3 rounded bg-stone-200" />
        <div className="h-4 w-4/5 rounded bg-stone-200" />
        <div className="h-3 w-1/2 rounded bg-stone-200" />
        <div className="h-8 rounded bg-stone-200" />
      </div>
    </div>
  )
}
