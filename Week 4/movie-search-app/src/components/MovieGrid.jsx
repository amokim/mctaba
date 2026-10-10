import MovieCard from "./MovieCard.jsx";

function MovieGrid({ movies }) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} /> 
            ))}
        </div>
    );
}

export default MovieGrid;