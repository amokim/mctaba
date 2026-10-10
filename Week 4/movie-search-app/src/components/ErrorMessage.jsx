function ErrorMessage({ message }) {
    return (
        <div
            role="alert"
            className="mx-auto max-w-xl rounded-md border border-red-200 bg-red-50 px-4 py-3 text-center text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
            {message}
        </div>
    );
}

export default ErrorMessage;