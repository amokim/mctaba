const INTEREST_OPTIONS = ["Technology", "Business", "Design", "Science"];

const StepTwo = ({ language, interests, onLanguageChange, onInterestToggle, onNext, onBack }) => {
  return (
    <div>
      <h2>Preferences</h2>

      <div style={{ marginBottom: "16px" }}>
        <p style={{ marginBottom: "4px", fontWeight: "bold" }}>Preferred language</p>
        {["English", "Swahili", "Both"].map((option) => (
          <label key={option} style={{ display: "block", marginBottom: "4px", cursor: "pointer" }}>
            <input
              type="radio"
              name="language"
              value={option}
              checked={language === option}
              onChange={() => onLanguageChange(option)}
              style={{ marginRight: "8px" }}
            />
            {option}
          </label>
        ))}
      </div>

      <div style={{ marginBottom: "16px" }}>
        <p style={{ marginBottom: "4px", fontWeight: "bold" }}>Interests</p>
        {INTEREST_OPTIONS.map((option) => (
          <label key={option} style={{ display: "block", marginBottom: "4px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={interests.includes(option)}
              onChange={() => onInterestToggle(option)}
              style={{ marginRight: "8px" }}
            />
            {option}
          </label>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={onBack}
          style={{ padding: "10px 24px", fontSize: "16px", cursor: "pointer", border: "2px solid #ddd", borderRadius: "8px" }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          style={{ padding: "10px 24px", fontSize: "16px", cursor: "pointer", border: "2px solid #ddd", borderRadius: "8px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
