import { useSearchParams } from 'react-router-dom'
import searchItems from '../data/searchItems.js'

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('q') ?? '' // the URL is the single source of truth

    function handleChange(event) {
        const value = event.target.value
        // replace: true → typing doesn't add one history entry per keystroke
        setSearchParams(value ? { q: value } : {}, { replace: true })
    }

    const term = query.trim().toLowerCase()
    const results = term
        ? searchItems.filter((item) =>
              [item.title, item.category, item.description].some((text) =>
                  text.toLowerCase().includes(term),
              ),
          )
        : searchItems

    return (
        <section className="section">
            <p className="eyebrow">// SEARCH</p>
            <h1>Search the stack</h1>
            <p className="section-lede">
                The search box writes to the URL, so <code>/search?q=react</code> can be shared
                and opens with the results already filtered.
            </p>

            <label htmlFor="search" className="sr-only">Search</label>
            <input
                id="search"
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="Try “react”, “backend”, or “python”…"
                className="mt-4 w-full rounded-lg border border-slate-600 bg-slate-900 p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/2"
            />

            <p className="mt-4 text-sm text-slate-400">
                {term
                    ? `${results.length} result${results.length === 1 ? '' : 's'} for “${query}”`
                    : `Showing all ${results.length} items`}
            </p>

            {results.length > 0 ? (
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map((item) => (
                        <li key={item.id} className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                                {item.category}
                            </span>
                            <h3 className="mt-1 mb-2 text-lg font-semibold">{item.title}</h3>
                            <p className="mb-0 text-sm text-slate-400">{item.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-4 rounded-lg border border-slate-700 p-4 text-slate-400">
                    Nothing matches “{query}”. Try a different term.
                </p>
            )}
        </section>
    )
}

export default Search