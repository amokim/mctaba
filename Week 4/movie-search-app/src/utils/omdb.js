const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const RESULTS_PER_PAGE = 10;
export const MAX_PAGES = 100;
export const TOO_MANY_RESULTS = 'Too many results.';

export function buildSearchUrl( { term , type, year, page = 1}) {
    const params = new URLSearchParams({
        apikey: API_KEY,
        s: term,
        page: String(page),
    });
    if (type) params.set('type', type);
    if (year) params.set('y', year);
    return `${BASE_URL}?${params}`;
}

// Title lookup returns the single closest match, even when a search is too broad
export function buildTitleUrl({ term, type, year }) {
    const params = new URLSearchParams({
        apikey: API_KEY,
        t: term,
    });
    if (type) params.set('type', type);
    if (year) params.set('y', year);
    return `${BASE_URL}?${params}`;
}

export function buildDetailsUrl(imdbID) {
    const params = new URLSearchParams({
        apikey: API_KEY,
        i: imdbID,
        plot: 'full',
    });
    return `${BASE_URL}?${params}`;
}

export function hasPoster(poster) {
    return Boolean(poster && poster !== 'N/A');
}