import { useState, useEffect, useRef } from "react";
import useFetch from "./UseFetch";

const API_URL =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd";

// CoinGecko does not support KES, so the shilling rate comes from a separate FX feed
const FX_URL = "https://open.er-api.com/v6/latest/USD";

const COINS = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "solana", name: "Solana", symbol: "SOL" },
];

const REFRESH_INTERVAL = 30000; // 30 seconds

const CryptoTracker = () => {
    const { data: prices, loading, error, refetch } = useFetch(API_URL);
    const { data: fx } = useFetch(FX_URL);
    const usdToKes = fx?.rates?.KES;

    const [paused, setPaused] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [secondsAgo, setSecondsAgo] = useState(0);
    const [changes, setChanges] = useState({}); // { bitcoin: "up" | "down" | "same" }

    // Holds the previous fetch result so we can compare without re-rendering
    const prevPrices = useRef(null);

    // When new prices arrive: compute up/down vs previous fetch, stamp the time
    useEffect(() => {
        if (!prices) return;

        if (prevPrices.current) {
            const next = {};
            COINS.forEach(({ id }) => {
                const before = prevPrices.current[id]?.usd;
                const after = prices[id]?.usd;
                if (after > before) next[id] = "up";
                else if (after < before) next[id] = "down";
                else next[id] = "same";
            });
            setChanges(next);
        }

        prevPrices.current = prices;
        setLastUpdated(Date.now());
        setSecondsAgo(0);
    }, [prices]);

    // Auto-refresh every 30s unless paused. Cleanup clears the interval.
    useEffect(() => {
        if (paused) return;

        const intervalId = setInterval(() => {
            refetch();
        }, REFRESH_INTERVAL);

        return () => clearInterval(intervalId);
    }, [paused, refetch]);

    // Ticks once a second to drive the "X seconds ago" label
    useEffect(() => {
        if (!lastUpdated) return;

        const tickId = setInterval(() => {
            setSecondsAgo(Math.floor((Date.now() - lastUpdated) / 1000));
        }, 1000);

        return () => clearInterval(tickId);
    }, [lastUpdated]);

    const renderIndicator = (direction) => {
        if (direction === "up") return <span className="up">↑</span>;
        if (direction === "down") return <span className="down">↓</span>;
        return <span className="same">–</span>;
    };

    if (loading && !prices) return <p className="loading">Loading prices...</p>;

    if (error && !prices) {
        return (
            <div>
                <p className="error">Couldn't load prices. Try again.</p>
                <button onClick={refetch}>Retry</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Crypto Tracker</h2>

            <div className="controls">
                <button onClick={() => setPaused((p) => !p)}>
                    {paused ? "Resume Updates" : "Pause Updates"}
                </button>
                <button onClick={refetch} disabled={loading}>
                    Refresh Now
                </button>
                <span>Last updated: {secondsAgo} seconds ago</span>
                {loading && <span>(updating...)</span>}
                {paused && <span className="paused">Paused</span>}
            </div>

            {error && <p className="error">Update failed. Showing last known prices.</p>}

            <div className="grid">
                {COINS.map(({ id, name, symbol }) => (
                    <div key={id} className="card">
                        <h3>
                            {name} ({symbol}) {renderIndicator(changes[id])}
                        </h3>
                        <p>USD: ${prices[id]?.usd?.toLocaleString() ?? "N/A"}</p>
                        <p>KES: KSh {usdToKes && prices[id]?.usd ? Math.round(prices[id].usd * usdToKes).toLocaleString() : "N/A"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CryptoTracker;
