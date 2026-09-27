const StepThree = ({ formData, onBack, onSubmit }) => {
    const { name, email, phone, language, interests } = formData;
  
    return (
      <div>
        <h2>Confirmation</h2>
  
        <div style={{ marginBottom: "16px", lineHeight: "1.8" }}>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Preferred language:</strong> {language}</p>
          <p><strong>Interests:</strong> {interests.length ? interests.join(", ") : "None selected"}</p>
        </div>
  
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={onBack}
            style={{ padding: "10px 24px", fontSize: "16px", cursor: "pointer", border: "2px solid #ddd", borderRadius: "8px" }}
          >
            Back
          </button>
          <button
            onClick={onSubmit}
            style={{ padding: "10px 24px", fontSize: "16px", cursor: "pointer", border: "2px solid #ddd", borderRadius: "8px" }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  };
  
  export default StepThree;
  