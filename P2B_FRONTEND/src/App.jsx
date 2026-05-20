import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layout & UI Components
import P2BLayout from './Navbar'; 
import Footer from './Footer';
import Home from './MainBody';
import AboutUs from './components/AboutUsSlide'; 
import Recommendation from './components/RecommendationSlide';
import LegalModal from './components/LegalModal';
import ExploreBiology from './components/ExploreBiology';
import ExplorePhilosophy from './components/ExplorePhilosophy';
import ExplorePsychology from './components/ExplorePsychology';
import DynamicExplorePsychology from './components/DynamicExplorePsychology';
import AccountSettingsAuth from './components/AccountSettingsAuth'; 
import PersonalInformation from './components/PersonalInformation';
import ChangePassword from './components/ChangePassword';
import PrivacySecurity from './components/PrivacySecurity';
import DeleteAccountSection from './components/DeleteAccountSection';

// Session Slides
import PersonalInfoSlide from './components/PersonalInfoSlide';
import LifestyleSlide from './components/LifestyleSlide';
import HealthBiologySlide from './components/HealthBiologySlide';
import PsychologySlide from './components/PsychologySlide';
import PhilosophySlide from './components/PhilosophySlide';
import ProblemDescriptionSlide from './components/ProblemDescriptionSlide';
import FinalReportSlide from './components/FinalReportSlide';
import P2BChatbot from './components/P2BChatbot';

function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [view, setView] = useState('home'); 
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({});
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  
  // Chat Session State (Persists across navigation)
  const [currentSessionId, setCurrentSessionId] = useState(() => `sess-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [chatMessages, setChatMessages] = useState([
    { 
      sender: 'P2B', 
      text: `Welcome to the Intelligence Center. Systems operational. How can I assist you today?`, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);

  useEffect(() => {
    const status = localStorage.getItem('p2b_legal_accepted');
    if (status === 'true') setIsAccepted(true);
    
    const savedUser = localStorage.getItem('p2b_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    setCheckingAuth(false);
  }, []);

  const handleLegalAcceptance = () => {
    localStorage.setItem('p2b_legal_accepted', 'true');
    setIsAccepted(true);
  };

  const checkAuth = () => {
    if (!user) {
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const startNewSession = () => {
    if (!checkAuth()) return;
    setFormData({});
    setAiAnalysis(null);
    setStep(1); 
    setView('session'); 
    window.scrollTo(0, 0);
  };

  const openChatbot = () => {
    if (!checkAuth()) return;
    setStep(8); 
    setView('session');
    window.scrollTo(0, 0);
  };

  const updateData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const generateReport = async () => {
    setIsLoading(true);
    setStep(7); 

    try {
      const payload = {
        ...formData,
        email: user?.email || "anonymous@p2b.ai",
        primaryDomain: formData.targetDomain || "Universal_P2B_Analysis",
        userPrompt: formData.problemDescription || "No description provided",
        tone: "Analytical & Empathetic"
      };

      const response = await axios.post('http://localhost:8080/api/generate/report', payload);
      
      console.log("Raw Backend Data:", response.data);

      // DATA GUARD: Agar response array hai toh first item lo, warna direct object
      const cleanData = Array.isArray(response.data) ? response.data[0] : response.data;
      
      setAiAnalysis(cleanData);
    } catch (error) {
      console.error("P2B Sync Failed:", error);
      alert("System Busy: P2B Engine is currently synchronizing. Please check if your Spring Boot server is running.");
      setStep(6);
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAuth) return null;

  return (
    <>
      <div 
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          background: 'url("BackgroundForStarting.png") center/cover no-repeat fixed',
          filter: !isAccepted ? 'blur(8px)' : 'none',
          zIndex: -2,
          transition: 'filter 0.6s ease',
        }}
      />

      {!isAccepted && <LegalModal onAccept={handleLegalAcceptance} />}

      {isAccepted && (
        <div className="bg-black text-white min-vh-100 d-flex flex-column animate__animated animate__fadeIn">
          <P2BLayout 
            onHomeClick={() => setView('home')} 
            onAboutClick={() => setView('about')} 
            onRecommendationClick={() => checkAuth() && setView('recommendation')}
            onPersonalInfoClick={() => setView('profile')} 
            onChangePasswordClick={() => setView('security')}
            onPrivacySecurityClick={() => setView('privacy')}
            onDeleteAccountClick={() => setView('delete-account')}
            onAuthClick={() => {
              // Sign Out logic
              if (user) {
                localStorage.removeItem('p2b_user');
                setUser(null);
                setView('home');
                window.location.reload();
              } else {
                setShowAuthModal(true);
              }
            }} 
            onStartSession={startNewSession} 
          />

          <main className="flex-grow-1" style={{ marginTop: '70px' }}>
            {view === 'home' && (
               <Home 
                 onStartSession={startNewSession} 
                 onChatWithP2B={openChatbot} 
                 onExploreBiology={() => checkAuth() && setView('biology')} 
                 onExplorePhilosophy={() => checkAuth() && setView('philosophy')} 
                 onExplorePsychology={() => checkAuth() && setView('psychology')} 
               />
            )}

            {view === 'biology' && <ExploreBiology onBack={() => setView('home')} />}
            {view === 'philosophy' && <ExplorePhilosophy onBack={() => setView('home')} />}
            {view === 'psychology' && <ExplorePsychology onBack={() => setView('home')} />}
             {view === 'about' && (
               <AboutUs onBack={() => setView('home')} onStartSession={startNewSession} />
             )}
            {view === 'recommendation' && <Recommendation />}
            {view === 'profile' && <PersonalInformation onChatWithReport={(reportData) => {
              setAiAnalysis(reportData);
              setFormData({}); 
              setStep(8);
              setView('session');
              window.scrollTo(0, 0);
            }} />}
            {view === 'security' && <ChangePassword />}
            {view === 'privacy' && <PrivacySecurity />}
            {view === 'delete-account' && <DeleteAccountSection />}

            {view === 'session' && (
              <div className={step === 8 ? "h-100" : "container py-4"}>
                {step === 1 && <PersonalInfoSlide formData={formData} handleChange={updateData} onNext={nextStep} />}
                {step === 2 && <LifestyleSlide formData={formData} handleChange={updateData} onNext={nextStep} onBack={prevStep} />}
                {step === 3 && <HealthBiologySlide formData={formData} handleChange={updateData} onNext={nextStep} onBack={prevStep} />}
                {step === 4 && <PsychologySlide formData={formData} handleChange={updateData} onNext={nextStep} onBack={prevStep} />}
                {step === 5 && <PhilosophySlide formData={formData} handleChange={updateData} onNext={nextStep} onBack={prevStep} />}
                {step === 6 && <ProblemDescriptionSlide formData={formData} handleChange={updateData} onSubmit={generateReport} onBack={prevStep} />}
                
                {step === 7 && (
                  <FinalReportSlide 
                    data={aiAnalysis} 
                    loading={isLoading}
                    onChatOpen={openChatbot} 
                    onFinish={() => setView('home')} 
                  />
                )}

                {step === 8 && (
                  <div style={{ height: 'calc(100vh - 70px)' }}>
                    <P2BChatbot 
                      reportContext={formData} 
                      aiContent={aiAnalysis} 
                      onBack={() => setView('home')}
                      sessionId={currentSessionId}
                      setSessionId={setCurrentSessionId}
                      messages={chatMessages}
                      setMessages={setChatMessages}
                    />
                  </div>
                )}
              </div>
            )}
          </main>
          
          {view === 'home' && (
            <Footer 
              onAboutClick={() => setView('about')}
              onBiologyClick={() => checkAuth() && setView('biology')}
              onPhilosophyClick={() => checkAuth() && setView('philosophy')}
              onPsychologyClick={() => checkAuth() && setView('psychology')}
              onRecommendationClick={() => checkAuth() && setView('recommendation')}
              onStartSession={startNewSession}
            />
          )}
          <AccountSettingsAuth 
            externalControl={true}
            show={showAuthModal} 
            onHide={() => setShowAuthModal(false)}
            isLoggedIn={!!user}
          />
        </div>
      )}
    </>
  );
}

export default App;