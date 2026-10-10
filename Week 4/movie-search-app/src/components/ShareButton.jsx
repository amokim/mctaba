import { useEffect, useState } from "react";

function ShareButton() {
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (!status) return;
        const timer = setTimeout(() => setStatus(''), 2000);
        return () => clearTimeout(timer);
    }, [status]);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setStatus('copied');
        } catch {
            setStatus('failed');
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span role="status" aria-live="polite" className="text-sm font-medium text-green-700 dark:text-green-400">
                {status === 'copied' && 'Link copied!'}
                {status === 'failed' && <span className="text-red-600 dark:text-red-400">Could not copy link</span>}
            </span>
            <button
                type="button"
                onClick={handleShare}
                className="min-h-11 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
                Share
            </button>
        </div>
    );
}

export default ShareButton;