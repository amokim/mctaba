import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'
import useFetch from '../hooks/useFetch'
import { useAdmin } from '../context/AdminContext'
import BookForm from '../components/BookForm'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

// Used for both /admin/books/new and /admin/books/:id/edit
export default function AdminBookFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { adminKey, logout } = useAdmin()

  const categories = useFetch((signal) => api.getCategories(signal), [])
  const book = useFetch(
    (signal) => (isEdit ? api.getBook(id, signal) : Promise.resolve(null)),
    [id],
  )

  const handleSubmit = async (values) => {
    try {
      const result = isEdit
        ? await api.updateBook(id, values, adminKey)
        : await api.createBook(values, adminKey)
      navigate('/admin', { state: { notice: `${isEdit ? 'Updated' : 'Created'} "${result.data.title}"` } })
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        logout()
        navigate('/admin/login', { state: { message: 'Your admin key is no longer valid. Please log in again.' } })
        return
      }
      throw err // BookForm shows the messages
    }
  }

  if (categories.loading || book.loading) return <Spinner />

  if (categories.error || book.error) {
    const err = categories.error || book.error
    return <ErrorMessage title="Could not load the form" message={err.message} />
  }

  const initialValues = book.data
    ? { ...book.data.data, price: String(book.data.data.price), coverImage: book.data.data.coverImage || '' }
    : undefined

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/admin" className="text-sm font-medium text-emerald-700 hover:underline">← Back to admin panel</Link>
      <h1 className="mt-2 mb-6 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
        {isEdit ? `Edit "${book.data.data.title}"` : 'Add a new book'}
      </h1>

      <div className="rounded-lg border border-stone-200 bg-white p-5 sm:p-6">
        <BookForm
          key={id || 'new'}
          initialValues={initialValues}
          categories={categories.data.data}
          submitLabel={isEdit ? 'Save changes' : 'Create book'}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin')}
        />
      </div>
    </div>
  )
}
