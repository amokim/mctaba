// page numbers to show, with '...' gaps: 1 ... 4 5 6 ... 10
const getPages = (page, totalPages) => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

  const pages = [1]
  const start = Math.max(2, page - 1)
  const end = Math.min(totalPages - 1, page + 1)

  if (start > 2) pages.push('...')
  for (let p = start; p <= end; p++) pages.push(p)
  if (end < totalPages - 1) pages.push('...')
  pages.push(totalPages)
  return pages
}

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const button = 'min-w-9 rounded-md border px-3 py-1.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-1" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={`${button} border-stone-300 bg-white hover:bg-stone-100`}
      >
        ← Prev
      </button>

      {getPages(page, totalPages).map((p, i) =>
        p === '...' ? (
          <span key={`gap-${i}`} className="px-2 text-stone-400">…</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`${button} ${
              p === page ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-stone-300 bg-white hover:bg-stone-100'
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={`${button} border-stone-300 bg-white hover:bg-stone-100`}
      >
        Next →
      </button>
    </nav>
  )
}
