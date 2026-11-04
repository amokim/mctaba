import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../api'
import useFetch from '../hooks/useFetch'
import { useAdmin } from '../context/AdminContext'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import StockBadge from '../components/StockBadge'
import { formatKES } from '../utils/format'

const PAGE_SIZE = 10

export default function AdminDashboardPage() {
  const { adminKey, logout } = useAdmin()
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [confirmId, setConfirmId] = useState(null)
  const [notice, setNotice] = useState(location.state?.notice || '')
  const [actionError, setActionError] = useState('')

  const { data, loading, error, reload } = useFetch(
    (signal) => api.getBooks({ search, page, limit: PAGE_SIZE, sort: 'createdAt', order: 'desc' }, signal),
    [search, page],
  )

  const handleDelete = async (book) => {
    setActionError('')
    try {
      await api.deleteBook(book.id, adminKey)
      setConfirmId(null)
      setNotice(`Deleted "${book.title}"`)
      // stepping back a page if we just removed the last book on this one
      if (data.data.length === 1 && page > 1) setPage(page - 1)
      else reload()
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        logout()
        navigate('/admin/login', { state: { message: 'Your admin key is no longer valid. Please log in again.' } })
        return
      }
      setActionError(err.message)
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">Admin panel</h1>
          <p className="text-sm text-stone-500">Add, edit and delete books in the store.</p>
        </div>
        <Link to="/admin/books/new" className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
          + Add book
        </Link>
      </div>

      {notice && (
        <div className="mb-4 flex items-center justify-between rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800" role="status">
          {notice}
          <button type="button" onClick={() => setNotice('')} aria-label="Dismiss" className="ml-4 text-lg leading-none">×</button>
        </div>
      )}
      {actionError && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800" role="alert">{actionError}</div>
      )}

      <div className="mb-4 max-w-md">
        <SearchBar value={search} onSearch={(text) => { setSearch(text); setPage(1) }} />
      </div>

      {error ? (
        <ErrorMessage title="Could not load books" message={error.message} onRetry={reload} />
      ) : loading && !data ? (
        <Spinner />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-stone-200 bg-stone-50 text-xs tracking-wider text-stone-500 uppercase">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-stone-100 ${loading ? 'opacity-50' : ''}`}>
                {data.data.length === 0 && (
                  <tr><td colSpan="5" className="px-4 py-8 text-center text-stone-500">No books found</td></tr>
                )}
                {data.data.map((book) => (
                  <tr key={book.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <Link to={`/books/${book.id}`} className="font-medium text-stone-900 hover:text-emerald-800">{book.title}</Link>
                      <div className="text-xs text-stone-500">{book.author}</div>
                    </td>
                    <td className="px-4 py-3 text-stone-600">{book.category}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">{formatKES(book.price)}</td>
                    <td className="px-4 py-3"><StockBadge inStock={book.inStock} /></td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {confirmId === book.id ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="text-xs text-stone-500">Delete?</span>
                          <button type="button" onClick={() => handleDelete(book)} className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700">
                            Yes
                          </button>
                          <button type="button" onClick={() => setConfirmId(null)} className="rounded border border-stone-300 px-2 py-1 text-xs hover:bg-stone-100">
                            No
                          </button>
                        </span>
                      ) : (
                        <span className="inline-flex gap-3">
                          <Link to={`/admin/books/${book.id}/edit`} className="font-medium text-emerald-700 hover:underline">Edit</Link>
                          <button type="button" onClick={() => setConfirmId(book.id)} className="font-medium text-red-600 hover:underline">
                            Delete
                          </button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={data.pagination.page} totalPages={data.pagination.totalPages} onChange={setPage} />
        </>
      )}
    </div>
  )
}
