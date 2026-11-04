export default function ErrorMessage({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="mx-auto my-10 max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center" role="alert">
      <p className="font-semibold text-red-800">{title}</p>
      {message && <p className="mt-1 text-sm text-red-700">{message}</p>}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
        >
          Try again
        </button>
      )}
    </div>
  )
}
