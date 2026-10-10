function LoadingSpinner({ label = 'Loading...' })  {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16" role="status">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-gray-100" />
            <p className="text-gray-600 dark:text-gray-400">{label}</p>
        </div>
    )
}

export default LoadingSpinner;