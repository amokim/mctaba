import { useState } from 'react';
import { getSearchHistory } from '../utils/searchHistory';

function SearchBar( { onSearch, initialValue = ''}) {
    const [query, setQuery] = useState(initialValue);
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestions = history.filter((item) => 
        item.toLowerCase().includes(query.trim().toLowerCase())
    );

    const runSearch = (term) => {
        setQuery(term);
        setShowSuggestions(false);
        setMessage('');
        onSearch(term);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const term = query.trim();

        if (!term) {
            setMessage('Please enter a movie title to search.');
            return;
        }

        runSearch(term);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full" role="search">
            <div className="flex w-full flex-col gap-2 sm:flex-row">
                <label htmlFor="movie-search" className="sr-only">
                    Search for a movie
                </label>
                <div className='relative flex-1'>
                    <input
                        id="movie-search"
                        type="text"
                        autoComplete="off"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => {
                            setHistory(getSearchHistory());
                            setShowSuggestions(true);
                        }}
                        onBlur={() => setShowSuggestions(false)}
                        onKeyDown={(event) => event.key === 'Escape' && setShowSuggestions(false)}
                        placeholder="Search for a movie title..."
                        className="min-h-11 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-100 dark:focus:ring-gray-100"
                    />

                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
                            {suggestions.map((item) => (
                                <li key={item}>
                                    <button
                                        type="button"
                                        // mousedown fires before the input's blur, so the list is still there to click
                                        onMouseDown={(event) => {
                                            event.preventDefault();
                                            runSearch(item);
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    type="submit"
                    className="min-h-11 rounded-md bg-gray-900 px-6 py-2 font-medium text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
                >
                    Search
                </button>
            </div>
            {message && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{message}</p>}
        </form>
    );
}

export default SearchBar;