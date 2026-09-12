const Colors = {
    success: "rgba(44, 182, 125, 0.12)",
    warning: "rgba(245, 197, 24, 0.12)",
    error: "rgba(255, 84, 112, 0.12)",
};


const AlertBox = ({ type, message, children }) => {
    return (
        <div style={{ backgroundColor: Colors[type], padding: "12px 16px", borderRadius: "6px" }}>
            <p>{message}</p>
            {children}
        </div>
    );
};

export default AlertBox;