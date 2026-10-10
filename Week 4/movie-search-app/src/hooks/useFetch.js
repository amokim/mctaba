import { useEffect, useState } from "react";

const NETWORK_ERROR =
    'Something went wrong. Please check your internet connection and try again.';

export default function useFetch(url) {

    // remember which url each result belongs to, so a result for an old url is never shown
    const [result, setResult] = useState({ url: null, data: null, error: null });

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();
        let ignore = false;

        fetch(url, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error(`Server error (${response.status})`);
                return response.json();
            })
            .then((json) => {
                if (ignore) return;
                if (json.Response === 'False') {
                    setResult({ url, data: null, error: json.Error || 'Something went wrong.' });
                } else {
                    setResult({ url, data: json, error: null });
                }
            })
            .catch((err) => {
                if (ignore || err.name === 'AbortError') return;
                setResult({ url, data: null, error: NETWORK_ERROR });
            });

            // cleanup function to ignore late responses and abort fetch if component unmounts or url changes
            return () => {
                ignore = true;
                controller.abort();
            };
        }, [url]);

        // stale data never shows while loading new data: a result only counts if it matches the current url
        const current = url && result.url === url;

        return {
            data: current ? result.data : null,
            loading: Boolean(url) && !current,
            error: current ? result.error : null,
        };
}
