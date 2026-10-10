import { Link, NavLink } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites.js';
import useTheme from '../hooks/useTheme.js';

const linkClass = ({ isActive }) => 
    `rounded-md px-3 py-2 text-sm font-medium ${
        isActive
            ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    }`;

function Header() {
    const favorites = useFavorites();
    const {theme, toggleTheme} = useTheme();

    return (
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
                <Link to="/" className="text-lg font-semibold tracking-tight sm:text-xl">
                    Movie Search
                </Link>

                <div className="flex items-center gap-1 sm:gap-2">
                    <NavLink to="/" end className={linkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/favorites" className={linkClass}>
                        <span className="flex items-center gap-2">
                            Favorites
                            <span
                                className="min-w-6 rounded-full bg-red-500 px-2 py-0.5 text-center text-xs font-semibold text-white"
                                aria-label={`${favorites.length} favorites saved`}
                            >
                                {favorites.length}
                            </span>
                        </span>
                    </NavLink>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        className="flex h-11 w-11 items-center justify-center rounded-md text-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header;