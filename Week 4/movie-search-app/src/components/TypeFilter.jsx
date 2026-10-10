const TYPES = [
    { value: '', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'Series'},
    { value: 'game', label: 'Games' },
];

function TypeFilter({ value, onChange }) {
    return (
        <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
            {TYPES.map((type) => {
                const active = value === type.value;
                return (
                    <button
                        key={type.value || 'all'}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onChange(type.value)}
                        className={`min-h-11 rounded-full px-4 text-sm font-medium ${
                              active
                                  ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                    >
                        {type.label}
                    </button>
                )
            })}
        </div>
    )
}

export default TypeFilter;
