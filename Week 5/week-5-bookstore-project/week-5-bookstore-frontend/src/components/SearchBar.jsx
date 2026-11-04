import { useEffect, useState } from 'react'

// Searches as the user types (after a short pause) and on Enter
export default function SearchBar({ value, onSearch, placeholder = 'Search by title or author...' }) {
  const [text, setText] = useState(value)

  // keep the box in sync when the URL changes (e.g. back button, "clear filters")
  useEffect(() => setText(value), [value])

  useEffect(() => {
    if (text.trim() === value) return
    const timer = setTimeout(() => onSearch(text.trim()), 400)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(text.trim())
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="relative flex-1">
      <label htmlFor="search" className="sr-only">Search books</label>
      <svg className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
      </svg>
      <input
        id="search"
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-stone-300 bg-white py-2 pr-3 pl-10 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
      />
    </form>
  )
}
