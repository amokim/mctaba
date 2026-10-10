import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton.jsx';
import Poster from './Poster.jsx';

function MovieCard({ movie }) {

    if (!movie) return null;
    
    return (
        <Link
            to={`/movie/${movie.imdbID}`}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 transition hover:shadow-md"
        >
            <Poster src={movie.Poster} title={movie.Title} />

            <FavoriteButton movie={movie} className="absolute right-2 top-2" />

            <div className="flex flex-1 flex-col gap-1 p-4">
                <h3 className="font-semibold leading-snug group-hover:underline">{movie.Title}</h3>
                <div className="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{movie.Year}</span>
                    {movie.Type && (
                        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                            {movie.Type}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;