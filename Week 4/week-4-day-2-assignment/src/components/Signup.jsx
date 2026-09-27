import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    language: "English",
    interests: [],
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    console.log(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: "420px", margin: "40px auto", fontFamily: "sans-serif", textAlign: "center" }}>
        <h2>You're all set, {formData.name}!</h2>
        <p style={{ color: "#555" }}>Your signup was submitted successfully.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "420px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <p style={{ color: "#888", fontWeight: "bold", marginBottom: "16px" }}>Step {step} of 3</p>

      {step === 1 && (
        <StepOne
          name={formData.name}
          email={formData.email}
          phone={formData.phone}
          onChange={updateField}
          onNext={goNext}
        />
      )}

      {step === 2 && (
        <StepTwo
          language={formData.language}
          interests={formData.interests}
          onLanguageChange={(value) => updateField("language", value)}
          onInterestToggle={toggleInterest}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {step === 3 && (
        <StepThree formData={formData} onBack={goBack} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default SignupForm;
