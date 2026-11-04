import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'
import useFetch from '../hooks/useFetch'
import BookCard, { BookCardSkeleton } from '../components/BookCard'
import CategorySidebar from '../components/CategorySidebar'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import ErrorMessage from '../components/ErrorMessage'

const PAGE_SIZE = 12

const SORT_OPTIONS = [
  { value: '', label: 'Featured' },
  { value: 'createdAt-desc', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'title-asc', label: 'Title: A to Z' },
  { value: 'title-desc', label: 'Title: Z to A' },
]

export default function CataloguePage() {
  // filters live in the URL so they survive refresh and can be shared
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || ''
  const search = params.get('search') || ''
  const sort = params.get('sort') || ''
  const page = Math.max(1, Number(params.get('page')) || 1)

  const updateParams = (changes) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)))
    if (!('page' in changes)) next.delete('page') // new filter -> back to page 1
    setParams(next)
  }

  const categoriesState = useFetch((signal) => api.getCategories(signal), [])
  const categories = categoriesState.data?.data || []

  const [sortField, sortOrder] = sort.split('-')
  const { data, loading, error, reload } = useFetch(
    (signal) => api.getBooks({ category, search, sort: sortField, order: sortOrder, page, limit: PAGE_SIZE }, signal),
    [category, search, sort, page],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const books = data?.data || []
  const pagination = data?.pagination
  const activeCategory = categories.find((c) => c.id === category)
  const hasFilters = Boolean(category || search || sort)

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      {!categoriesState.error && (
        <CategorySidebar categories={categories} active={category} onSelect={(id) => updateParams({ category: id })} />
      )}

      <section className="min-w-0 flex-1">
        <div className="mb-4">
          <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
            {activeCategory ? activeCategory.name : 'All books'}
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            African literature, technology, business and self-help, delivered across Kenya.
          </p>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <SearchBar value={search} onSearch={(text) => updateParams({ search: text })} />
          <label className="flex items-center gap-2 text-sm text-stone-600">
            <span className="shrink-0">Sort by</span>
            <select
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600 sm:w-auto"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
        </div>

        {pagination && !loading && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-stone-500">
            <span>
              {pagination.total === 0
                ? 'No books found'
                : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, pagination.total)} of ${pagination.total} books`}
              {search && <> for &ldquo;<strong className="text-stone-700">{search}</strong>&rdquo;</>}
            </span>
            {hasFilters && (
              <button type="button" onClick={() => setParams({})} className="font-medium text-emerald-700 hover:underline">
                Clear filters
              </button>
            )}
          </div>
        )}

        {error ? (
          <ErrorMessage title="Could not load books" message={error.message} onRetry={reload} />
        ) : loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => <BookCardSkeleton key={i} />)}
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-lg border border-dashed border-stone-300 bg-white py-16 text-center">
            <p className="text-4xl" aria-hidden="true">📭</p>
            <p className="mt-2 font-medium text-stone-700">No books match your search</p>
            <p className="text-sm text-stone-500">Try a different title, author or category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onChange={(p) => updateParams({ page: p > 1 ? String(p) : '' })}
            />
          </>
        )}
      </section>
    </div>
  )
}
