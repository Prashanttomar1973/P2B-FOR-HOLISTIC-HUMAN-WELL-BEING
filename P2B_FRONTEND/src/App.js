import React, { useState } from 'react';
import { generateP2BReport } from './api/p2bService'; // Import the service

function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [aiAnalysis, setAiAnalysis] = useState(""); // AI result store karne ke liye
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleStartSession = () => setStep(1);
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const updateData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🔥 CRITICAL SYNC LOGIC: Backend Integration
  const handleFinalSubmit = async () => {
    setIsLoading(true); // Spinner start karo
    setStep(7); // Final Report slide par le jao (jo ab loading dikhayegi)
    
    try {
      const result = await generateP2BReport(formData);
      setAiAnalysis(result); // Backend se aaya report state mein save karo
    } catch (error) {
      setAiAnalysis("Error: System is overwhelmed. Please check if your Spring Boot server is running on port 8080.");
    } finally {
      setIsLoading(false); // Spinner stop karo
    }
  };

  return (
    <div className="App">
      {/* ... Navbar remains same ... */}
      <main style={{ minHeight: '80vh', paddingTop: '100px' }}>
        {/* Step 0 to 5 remain same as your previous code */}
        
        {/* Step 6: Problem Description trigger the backend call */}
        {step === 6 && (
          <ProblemDescriptionSlide 
            formData={formData} 
            handleChange={updateData} 
            onBack={handleBack} 
            onSubmit={handleFinalSubmit} // <-- Changed from handleNext to handleFinalSubmit
          />
        )}

        {/* Step 7: Final Report Slide (Updated with dynamic data) */}
        {step === 7 && (
          <FinalReportSlide 
            reportData={formData} // User inputs
            aiResponse={aiAnalysis} // Actual AI Output from Backend
            loading={isLoading}     // Loading status
            onChatOpen={() => setStep(8)} 
            onFinish={() => setStep(0)} 
          />
        )}

        {/* Step 8: Chatbot */}
        {step === 8 && <P2BChatbot reportContext={formData} aiContent={aiAnalysis} onBack={() => setStep(7)} />}
      </main>
      {/* ... Footer ... */}
    </div>
  );
}