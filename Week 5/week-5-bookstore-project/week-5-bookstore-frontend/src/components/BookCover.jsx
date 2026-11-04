import { useState } from 'react'

// Shows the cover image, or a styled placeholder if there is none or it fails to load
export default function BookCover({ book, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (!book.coverImage || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-linear-to-br from-emerald-700 to-emerald-950 p-4 text-center font-serif text-white ${className}`}
      >
        <span className="line-clamp-4">{book.title}</span>
      </div>
    )
  }

  return (
    <img
      src={book.coverImage}
      alt={`Cover of ${book.title}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
