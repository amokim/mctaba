import { useEffect, useState } from "react";
import { buildTitleUrl } from "../utils/omdb.js";

const ALL_TYPES = ['movie', 'series', 'game'];

// OMDb refuses broad searches ("Too many results."), but its title lookup
// still finds the closest match, so ask once per type to get a few results.
export default function useClosestMatches({ term, type, year }, enabled) {
    const key = enabled ? `${term}|${type}|${year}` : null;
    const [result, setResult] = useState({ key: null, matches: [] });

    useEffect(() => {
        if (!key) return;

        const controller = new AbortController();
        const types = type ? [type] : ALL_TYPES;

        Promise.all(
            types.map((t) =>
                fetch(buildTitleUrl({ term, type: t, year }), { signal: controller.signal })
                    .then((response) => (response.ok ? response.json() : null))
                    .catch(() => null)
            )
        ).then((responses) => {
            if (controller.signal.aborted) return;
            const matches = responses.filter((json) => json?.Response === 'True');
            setResult({ key, matches });
        });

        // abort if the search changes before the lookups finish
        return () => controller.abort();
    }, [key, term, type, year]);

    return {
        matches: result.key === key ? result.matches : [],
        loading: Boolean(key) && result.key !== key,
    };
}
