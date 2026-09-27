import {useState, useEffect} from "react";

const JokeDisplay = () => {

    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPunchline, setShowPunchline] = useState(false);

    const fetchJoke = () => {
        setLoading(true);
        setError(false);
        setShowPunchline(false);
        fetch("https://official-joke-api.appspot.com/random_joke")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not fetch joke. Please try again later.");
                }
                return response.json();
            })
            .then((data) => {
                setJoke(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    // Reveal punchline after 2 seconds 
    useEffect(() => {
        if (!joke) return;
        const timer = setTimeout(() => setShowPunchline(true), 2000);
        return () => clearTimeout(timer);
    }, [joke]);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }
    if (error) {
        return (
            <div>
                <p className="error">Could not fetch joke. Please try again later.</p>
                <button onClick={fetchJoke}>Try Again</button>
            </div>
        );
    }
    return (
        <div>
            <h2>Random Joke</h2>
            <p className="setup">{joke.setup}</p>
            {showPunchline ? (
                <p className="punchline">{joke.punchline}</p>
            ) : (
                <button onClick={() => setShowPunchline(true)}>Show Punchline</button>
            )}
            <button onClick={fetchJoke}>Get New Joke</button>
        </div>
    )
};

export default JokeDisplay;