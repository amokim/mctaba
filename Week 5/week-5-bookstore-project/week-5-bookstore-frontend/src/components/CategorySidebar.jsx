// Vertical list on desktop, horizontal scrolling chips on mobile
export default function CategorySidebar({ categories, active, onSelect }) {
  const total = categories.reduce((sum, c) => sum + c.bookCount, 0)
  const options = [{ id: '', name: 'All books', bookCount: total }, ...categories]

  return (
    <aside className="lg:w-56 lg:shrink-0">
      <h2 className="mb-2 hidden text-xs font-semibold tracking-wider text-stone-500 uppercase lg:block">
        Categories
      </h2>
      <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
        {options.map((c) => {
          const isActive = c.id === active
          return (
            <button
              key={c.id || 'all'}
              type="button"
              onClick={() => onSelect(c.id)}
              aria-pressed={isActive}
              className={`flex shrink-0 items-center justify-between gap-3 rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition lg:rounded-md lg:border-transparent lg:px-3 lg:py-2 ${
                isActive
                  ? 'border-emerald-700 bg-emerald-700 text-white lg:bg-emerald-700'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-emerald-50 lg:bg-transparent'
              }`}
            >
              <span>{c.name}</span>
              <span className={`text-xs ${isActive ? 'text-emerald-100' : 'text-stone-400'}`}>{c.bookCount}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
