import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import Poster from '../components/Poster.jsx';
import DetailRow from '../components/DetailRow.jsx';
import useFetch from '../hooks/useFetch.js';
import { buildDetailsUrl } from '../utils/omdb.js';
import ShareButton from "../components/ShareButton.jsx";

function MovieDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: movie, loading, error } = useFetch(buildDetailsUrl(id));

    const goBack = () => {
        if (window.history.state?.idx > 0) navigate(-1);
        else navigate('/');
    };

    const backButton = (
        <button
            type="button"
            onClick={goBack}
            className="mb-6 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline dark:text-gray-300 dark:hover:text-gray-100"
        >
            &larr; Back to Search
        </button>
    );

    if (loading) return <LoadingSpinner label="Loading movie details..." />;

    if (error) {
        const message = 
            error === 'Incorrect IMDb ID.' || error === 'Error getting data.'
                ? `We could not find a movie with the ID "${id}"`
                : error;
        
        return (
            <div>
                {backButton}
                <ErrorMessage message={message} />
                <p className="mt-4 text-center">
                    <Link to="/" className="font-medium underline">Go to search</Link>
                </p>
            </div>
        );
    }

    if (!movie) return null;

    return (
        <article>
            {backButton}
            <div className="flex flex-col gap-8 md:flex-row">
                <div className="mx-auto w-full max-w-xs shrink-0 overflow-hidden rounded-lg shadow md:mx-0 md:w-80 md:max-w-none">
                    <Poster src={movie.Poster} title={movie.Title} />
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-2xl font-bold sm:text-3xl">
                            {movie.Title} <span className="font-normal text-gray-500 dark:text-gray-400">({movie.Year})</span>
                        </h1>
                        <div className="flex shrink-0 items-center gap-2">
                            <ShareButton />
                            <FavoriteButton movie={movie} className="border border-gray-200 dark:border-gray-700" />
                        </div>
                    </div>

                    {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                        <p className="mt-2 text-lg">
                            <span className="font-semibold">{movie.imdbRating}</span>
                            <span className="text-gray-500 dark:text-gray-400"> / 10 IMDb</span>
                        </p>
                    )}

                    <p className="mt-4 leading-relaxed text-gray-800 dark:text-gray-300">{movie.Plot}</p>

                    <dl className="mt-6 flex flex-col gap-3 text-sm sm:text-base">
                        <DetailRow label="Rated" value={movie.Rated} />
                        <DetailRow label="Runtime" value={movie.Runtime} />
                        <DetailRow label="Genre" value={movie.Genre} />
                        <DetailRow label="Director" value={movie.Director} />
                        <DetailRow label="Actors" value={movie.Actors} />
                    </dl>
                </div>
            </div>
        </article>
    );
}

export default MovieDetailsPage;