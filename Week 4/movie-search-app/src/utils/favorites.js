const STORAGE_KEY = 'movie-favorites';
const CHANGE_EVENT = 'favorites-changed';

export function getFavorites() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

function writeFavorites(favorites) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
        // storage full or blocked; favorites just won't persist
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function saveFavorite(movie) {
    const favorites = getFavorites();
    if (favorites.some((fav) => fav.imdbID === movie.imdbID)) return;

    // Store only fields the card grid needs to display, not the entire movie object
    const { imdbID, Title, Year, Poster, Type } = movie;
    writeFavorites([...favorites, { imdbID, Title, Year, Poster, Type }]);
}

export function removeFavorite(imdbID) {
    writeFavorites(getFavorites().filter((fav) => fav.imdbID !== imdbID));
}

export function isFavorite(imdbID) {
    return getFavorites().some((fav) => fav.imdbID === imdbID);
}

export function toggleFavorite(movie) {
    if (isFavorite(movie.imdbID)) {
        removeFavorite(movie.imdbID);
    } else {
        saveFavorite(movie);
    }
}

export { CHANGE_EVENT, STORAGE_KEY };