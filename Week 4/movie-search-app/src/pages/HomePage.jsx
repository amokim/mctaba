import { useSearchParams } from "react-router-dom";
import SearchBar from '../components/SearchBar.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import useFetch from '../hooks/useFetch.js';
import useClosestMatches from '../hooks/useClosestMatches.js';
import { buildSearchUrl, MAX_PAGES, RESULTS_PER_PAGE, TOO_MANY_RESULTS } from '../utils/omdb.js';
import TypeFilter from "../components/TypeFilter.jsx";
import YearFilter from "../components/YearFilter.jsx";
import Pagination from "../components/Pagination.jsx";
import { addToSearchHistory } from "../utils/searchHistory.js";


function HomePage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const term = searchParams.get('q') || '';
    const type = searchParams.get('type') || '';
    const year = searchParams.get('y') || '';
    const page = Number(searchParams.get('page') || 1);

    const { data, loading, error } = useFetch(
        term ? buildSearchUrl({ term, type, year, page }) : null
    );

    const closest = useClosestMatches({ term, type, year }, error === TOO_MANY_RESULTS);

    const updateParams = (changes) => {
        const next = new URLSearchParams(searchParams);
        Object.entries(changes).forEach(([key, value]) => {
            if (value) next.set(key, value);
            else next.delete(key);
        });
        setSearchParams(next);
    }

    const handleSearch = (newTerm) => {
        addToSearchHistory(newTerm);
        updateParams({ q: newTerm, page: null})
    };

    const handlePageChange = (newPage) => {
        updateParams({ page: newPage > 1 ? newPage : null });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderResults = () => {
        if (!term) {
            return <p className="py-16 text-center text-gray-500 dark:text-gray-400">
                Search for a movie to get started.
            </p>;
        }
        if (loading) return <LoadingSpinner label="Searching..." />;
        if (error === 'Movie not found!') {
            const filtered = type || year;
            return (
                <div className="py-16 text-center text-gray-600 dark:text-gray-400">
                    <p>No results for &lsquo;{term}&rsquo;{filtered && ' with these filters'}. Try a different title.</p>
                    {filtered && (
                        <button
                            type="button"
                            onClick={() => updateParams({ type: null, y: null, page: null })}
                            className="mt-3 font-medium underline"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            );
        }
        if (error === TOO_MANY_RESULTS) {
            if (closest.loading) return <LoadingSpinner label="Finding closest matches..." />;
            if (closest.matches.length === 0) {
                return (
                    <p className="py-16 text-center text-gray-600 dark:text-gray-400">
                        &lsquo;{term}&rsquo; is too broad. Try typing more of the title.
                    </p>
                );
            }
            return (
                <>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        &lsquo;{term}&rsquo; matches too many titles. Showing the closest matches &mdash; type more of the title to see full results.
                    </p>
                    <MovieGrid movies={closest.matches} />
                </>
            );
        }
        if (error) return <ErrorMessage message={error} />;
        if (data?.Search) {
            const totalResults = Number(data.totalResults);
            const totalPages = Math.min(Math.ceil(totalResults / RESULTS_PER_PAGE), MAX_PAGES)
            const first = (page - 1) * RESULTS_PER_PAGE + 1;
            const last = first + data.Search.length - 1;

            return (
                <>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Showing {first}-{last} of {totalResults.toLocaleString()} results for &lsquo;{term}&rsquo;
                    </p>
                    <MovieGrid movies={data.Search} />
                    <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col gap-8">
            <section className="mx-auto w-full max-w-2xl">
                <h1 className="mb-4 text-center text-2xl font-bold sm:text-3xl">Find a movie</h1>
                <SearchBar key={term} onSearch={handleSearch} initialValue={term} />
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <TypeFilter 
                        value={type}
                        onChange={(newType) => updateParams({ type: newType, page: null })}
                    />
                    <YearFilter
                        value={year}
                        onChange={(newYear) => updateParams({ y: newYear, page: null })}
                    />
                </div>
            </section>
            <section>{renderResults()}</section>
        </div>
    );
}

export default HomePage;