function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const buttonClass = 'min-h-11 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800';

    return (
        <nav aria-label="Search results pages" className="mt-8 flex items-center justify-center gap-4">
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className={buttonClass}
            >
                &larr; Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} of {totalPages}
            </span>
            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className={buttonClass}
            >
                Next &rarr;
            </button>
        </nav>
    );
}

export default Pagination;