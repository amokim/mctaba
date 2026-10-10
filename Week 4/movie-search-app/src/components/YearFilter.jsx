const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1900 + 1}, (_, i) => CURRENT_YEAR - i);

function YearFilter ({ value, onChange }) {
    return (
        <div className="flex items-center gap-2">
            <label htmlFor="year-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Year
            </label>
            <select
                id="year-filter"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="min-h-11 rounded-md border border-gray-300 bg-white px-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-100 dark:focus:ring-gray-100"
            >
                <option value="">Any Year</option>
                {YEARS.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
}

export default YearFilter;