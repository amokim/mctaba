import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    // Keep the raw text so partial input like "-" or "0." can be typed
    const [stepText, setStepText] = useState("1");
    const [history, setHistory] = useState([0]);

    const parsedStep = parseFloat(stepText);
    const step = Number.isNaN(parsedStep) ? 0 : parsedStep;

    const updateCount = (nextCount) => {
        // Skip no-op changes so history doesn't fill with duplicates
        if (nextCount === count) return;
        setCount(nextCount);
        setHistory((prev) => [...prev, nextCount])
    };

    const undo = () => {
        if (history.length < 2) return;
        const nextHistory = history.slice(0, -1);
        setHistory(nextHistory);
        setCount(nextHistory[nextHistory.length - 1])
    };

    const canUndo = history.length > 1;

    return (
        <div style={{ maxWidth: "400px", margin: "40px auto", textAlign: "center", fontFamily: "sans-serif" }}>
            <h1>Counter</h1>
            <p style={{ margin: "0 0 24px", fontSize: "48px", fontWeight: "bold", color: count >= 1 ? "green" : count < 0 ? "red" : "grey" }}>{count}</p>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <p style={{ margin: 0, whiteSpace: "nowrap" }}>Enter custom step...</p>
                <input
                    type="text"
                    value={stepText}
                    onChange={(e) => setStepText(e.target.value)}
                    placeholder="Enter custom step number..."
                    style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontSize: "16px",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                        boxSizing: "border-box",
                      }}
                />
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", margin: "24px 0" }}>
                <button
                    onClick={() => updateCount(count + step)}
                    style={{ padding: "10px 24px", fontSize: "18px", cursor: "pointer", border: "2px solid #ddd", borderRadius: "8px"}}
                >
                    +{step}
                </button>
                <button
                    onClick={() => updateCount(count - step)}
                    style={{ padding: "10px 24px", fontSize: "18px", cursor: "pointer", border: "2px solid #ddd", borderRadius: "8px" }}
                >
                    -{step}
                </button>
                <button
                onClick={() => {
                    updateCount(0);
                    setStepText("1");
                }}
                style={{ padding: "10px 24px", fontSize: "18px", cursor: "pointer", border: "2px solid #ddd", borderRadius: "8px" }}
            >
                Reset
            </button>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: "16px", color: "#555" }}>
                History: {history.slice(-5).join("->")}
            </p>
            <button
                onClick={undo}
                disabled={!canUndo}
                style={{
                    padding: "10px 24px",
                    fontSize: "18px",
                    cursor: canUndo ? "pointer" : "not-allowed",
                    opacity: canUndo ? 1 : 0.5,
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                }}
            >
                Undo
            </button>
            
        </div>
    );
};

export default Counter;
