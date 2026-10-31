function SearchBar({ value, onChange }) {
    return (
        <input 
            type="search"
            className="search-input"
            placeholder="Search by title or author..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default SearchBar;