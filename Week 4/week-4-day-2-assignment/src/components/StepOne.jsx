const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StepOne = ({ name, email, phone, onChange, onNext }) => {
    const emailValid = EMAIL_PATTERN.test(email.trim());
    const canProceed = name.trim() && emailValid && phone.trim();
  
    return (
      <div>
        <h2>Personal Info</h2>
  
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="signup-name" style={{ display: "block", marginBottom: "4px" }}>Name</label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px", border: "2px solid #ddd", borderRadius: "8px", boxSizing: "border-box" }}
          />
        </div>
  
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="signup-email" style={{ display: "block", marginBottom: "4px" }}>Email</label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px", border: "2px solid #ddd", borderRadius: "8px", boxSizing: "border-box" }}
          />
          {email.trim() && !emailValid && (
            <p style={{ margin: "4px 0 0", fontSize: "14px", color: "red" }}>Please enter a valid email address.</p>
          )}
        </div>
  
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="signup-phone" style={{ display: "block", marginBottom: "4px" }}>Phone</label>
          <input
            id="signup-phone"
            type="tel"
            value={phone}
            onChange={(e) => onChange("phone", e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px", border: "2px solid #ddd", borderRadius: "8px", boxSizing: "border-box" }}
          />
        </div>
  
        <button
          onClick={onNext}
          disabled={!canProceed}
          style={{
            padding: "10px 24px",
            fontSize: "16px",
            cursor: canProceed ? "pointer" : "not-allowed",
            opacity: canProceed ? 1 : 0.5,
            border: "2px solid #ddd",
            borderRadius: "8px",
          }}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default StepOne;
  