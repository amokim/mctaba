import { Link } from "react-router-dom";
import MovieGrid from '../components/MovieGrid.jsx';
import useFavorites from '../hooks/useFavorites.js';

function FavoritesPage() {
    const favorites = useFavorites();

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Your Favorites</h1>

            {favorites.length === 0 ? (
                <div className="py-16 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        You have not saved any favorites yet. Search for movies and click the heart icon to add them to your favorites.
                    </p>
                    <Link
                        to="/"
                        className="mt-6 inline-flex min-h-11 items-center rounded-md bg-gray-900 px-6 py-2 font-medium text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
                    >
                        Start searching
                    </Link>
                </div>
            ) : (
                <MovieGrid movies={favorites} />
            )}
        </div>
    );
}

export default FavoritesPage;