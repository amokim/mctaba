import useFavorites from '../hooks/useFavorites';
import { toggleFavorite } from '../utils/favorites';

function FavoriteButton({ movie, className = '' }) {
    const favorites = useFavorites();
    const saved = favorites.some((fav) => fav.imdbID === movie.imdbID);

    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(movie);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${movie.Title} from favorites` : `Add ${movie.Title} to favorites`}
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 ${className}`}
        >
            <svg
                viewBox="0 0 24 24"
                className={`h-6 w-6 ${saved ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-900 dark:stroke-gray-100'} `}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
        </button>
    );
}

export default FavoriteButton;