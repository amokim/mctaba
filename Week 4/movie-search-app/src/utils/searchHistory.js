const STORAGE_KEY = 'search-history';
const MAX_ITEMS = 10;

export function getSearchHistory() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

export function addToSearchHistory(term) {
    const cleaned = term.trim();
    if (!cleaned) return;

    // Move a repeated search to the top instead of storing it twice
    const others = getSearchHistory().filter(
        (item) => item.toLowerCase() !== cleaned.toLowerCase()
    );
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([cleaned, ...others].slice(0, MAX_ITEMS)));
    } catch {
        // storage full or blocked; history just won't be saved
    }
}