function DetailRow({ label, value }) {
    if (!value || value === 'N/A') return null;

    return (
        <div className="grid grid-cols-[6rem_1fr] gap-2 sm:grid-cols-[7rem_1fr]">
            <dt className="font-medium text-gray-500 dark:text-gray-400">{label}</dt>
            <dd className="text-gray-900 dark:text-gray-100">{value}</dd>
        </div>
    );
}

export default DetailRow;