import { useState } from 'react'

const emptyBook = {
  title: '',
  author: '',
  isbn: '',
  price: '',
  category: '',
  description: '',
  coverImage: '',
  inStock: true,
}

// same rules as the API's validate middleware, so most mistakes are caught before sending
const validate = (values) => {
  const errors = {}
  const isbnDigits = values.isbn.replace(/-/g, '')

  if (!values.title.trim()) errors.title = 'Title is required'
  else if (values.title.trim().length > 200) errors.title = 'Title must be 200 characters or fewer'

  if (!values.author.trim()) errors.author = 'Author is required'

  if (!values.isbn.trim()) errors.isbn = 'ISBN is required'
  else if (!/^[\d-]+X?$/i.test(values.isbn.trim()) || (isbnDigits.length !== 10 && isbnDigits.length !== 13)) {
    errors.isbn = 'ISBN must be 10 or 13 digits (dashes allowed)'
  }

  if (values.price === '') errors.price = 'Price is required'
  else if (!(Number(values.price) > 0)) errors.price = 'Price must be a positive number'

  if (!values.category) errors.category = 'Choose a category'

  if (values.description.length > 2000) errors.description = 'Description must be 2000 characters or fewer'

  if (values.coverImage && !/^https?:\/\/\S+$/.test(values.coverImage.trim())) {
    errors.coverImage = 'Cover image must be a URL starting with http:// or https://'
  }

  return errors
}

const inputClass = (hasError) =>
  `w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
      : 'border-stone-300 focus:border-emerald-600 focus:ring-emerald-600/20'
  }`

function Field({ label, name, error, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-stone-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export default function BookForm({ initialValues, categories, submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState({ ...emptyBook, ...initialValues })
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    setServerErrors([])
    if (Object.keys(found).length > 0) return

    setSubmitting(true)
    try {
      await onSubmit({
        title: values.title.trim(),
        author: values.author.trim(),
        isbn: values.isbn.trim(),
        price: Number(values.price),
        category: values.category,
        description: values.description.trim(),
        coverImage: values.coverImage.trim() || null,
        inStock: values.inStock,
      })
    } catch (err) {
      setServerErrors(err.messages?.length ? err.messages : [err.message])
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {serverErrors.length > 0 && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          <p className="font-medium">The server rejected this book:</p>
          <ul className="mt-1 list-inside list-disc">
            {serverErrors.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title *" name="title" error={errors.title}>
          <input id="title" name="title" value={values.title} onChange={handleChange} className={inputClass(errors.title)} />
        </Field>
        <Field label="Author *" name="author" error={errors.author}>
          <input id="author" name="author" value={values.author} onChange={handleChange} className={inputClass(errors.author)} />
        </Field>
        <Field label="ISBN *" name="isbn" error={errors.isbn}>
          <input id="isbn" name="isbn" value={values.isbn} onChange={handleChange} placeholder="978-0-14-018650-2" className={inputClass(errors.isbn)} />
        </Field>
        <Field label="Price (KES) *" name="price" error={errors.price}>
          <input id="price" name="price" type="number" min="1" step="any" value={values.price} onChange={handleChange} className={inputClass(errors.price)} />
        </Field>
        <Field label="Category *" name="category" error={errors.category}>
          <select id="category" name="category" value={values.category} onChange={handleChange} className={inputClass(errors.category)}>
            <option value="">Choose a category</option>
            {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Cover image URL" name="coverImage" error={errors.coverImage}>
          <input id="coverImage" name="coverImage" type="url" value={values.coverImage} onChange={handleChange} placeholder="https://..." className={inputClass(errors.coverImage)} />
        </Field>
      </div>

      <Field label="Description" name="description" error={errors.description}>
        <textarea id="description" name="description" rows="4" value={values.description} onChange={handleChange} className={inputClass(errors.description)} />
      </Field>

      <label className="flex items-center gap-2 text-sm text-stone-700">
        <input type="checkbox" name="inStock" checked={values.inStock} onChange={handleChange} className="h-4 w-4 accent-emerald-700" />
        In stock
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-emerald-700 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60"
        >
          {submitting ? 'Saving...' : submitLabel}
        </button>
        <button type="button" onClick={onCancel} className="rounded-md border border-stone-300 bg-white px-5 py-2 text-sm font-medium hover:bg-stone-100">
          Cancel
        </button>
      </div>
    </form>
  )
}
