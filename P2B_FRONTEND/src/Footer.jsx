import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { 
  Mail, ArrowRight, ShieldCheck, Heart, Sparkles, 
  Cpu, Zap, Activity, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = ({ 
  onAboutClick, 
  onBiologyClick, 
  onPhilosophyClick, 
  onPsychologyClick, 
  onRecommendationClick, 
  onStartSession 
}) => {
  const currentYear = new Date().getFullYear();
  const websiteLogoPath = "/Logo_for_P2B_ (1).JPG";
  const [feedback, setFeedback] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  return (
    <footer className="footer-root-sync overflow-hidden position-relative pt-5 pb-4">
      {/* 🌌 AMBIENT BACKGROUND ELEMENTS */}
      <div className="footer-glow-1"></div>
      <div className="footer-glow-2"></div>

      <Container className="position-relative z-1">
        <Row className="gy-5">
          {/* 🏛️ SECTION 1: BRAND & ARCHITECTURE */}
          <Col lg={4} md={12}>
            <div className="pe-lg-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="footer-logo-node">
                  <img src={websiteLogoPath} alt="P2B" className="img-fluid p-1" />
                </div>
                <div>
                  <h3 className="fw-black text-gold m-0 tracking-tighter">P2B_PROTOCOL</h3>
                  <div className="d-flex align-items-center gap-2">
                    <Sparkles size={14} className="text-gold" />
                    <span className="tiny-label-sync" style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em' }}>UNIVERSAL_HEALTH_SYNTHESIS</span>
                  </div>
                </div>
              </div>
              <p className="text-white opacity-90 leading-relaxed mb-4" style={{ fontSize: '15.5px', fontWeight: '400' }}>
                Architecting human equilibrium through the intersection of biological mapping, 
                behavioral psychology, and existential philosophy. Powered by advanced neural synthesis.
              </p>
            </div>
          </Col>

          {/* 🧠 SECTION 2: NEURAL DOMAINS */}
          <Col lg={2} md={4} sm={6}>
            <FooterHeading text="Domains" />
            <ul className="list-unstyled">
              <FooterLink text="Biology Substrate" onClick={onBiologyClick} />
              <FooterLink text="Cognitive Mapping" onClick={onPsychologyClick} />
              <FooterLink text="Existential Core" onClick={onPhilosophyClick} />
              <FooterLink text="Bio-Sync Tech" onClick={onStartSession} />
              <FooterLink text="Synthesis Feed" onClick={onRecommendationClick} />
            </ul>
          </Col>

          {/* ⚡ SECTION 3: ECOSYSTEM */}
          <Col lg={2} md={4} sm={6}>
            <FooterHeading text="Ecosystem" />
            <ul className="list-unstyled">
              <FooterLink text="About Project" onClick={onAboutClick} />
              <FooterLink text="Initialize Matrix" onClick={onStartSession} />
              <FooterLink text="Neural Analysis" onClick={onStartSession} />
              <FooterLink text="Resources" onClick={onRecommendationClick} />
              <FooterLink text="Privacy Protocol" onClick={() => {}} />
            </ul>
          </Col>

          {/* 📬 SECTION 4: NEURAL FEEDBACK PORTAL */}
          <Col lg={4} md={4}>
            <FooterHeading text="Neural Sync & Feedback" />
            <div className="newsletter-node p-4 rounded-4 border border-gold border-opacity-10 mb-4 position-relative overflow-hidden">
              {!isSubmitted ? (
                <>
                  <p className="tiny-label-sync text-gold mb-3 d-block">TRANSMIT_FEEDBACK_OR_IDEAS</p>
                  <div className="d-flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Neural Thought / Feedback..." 
                      className="newsletter-input-sync flex-grow-1"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    <motion.button 
                      whileHover={{ scale: 1.1, backgroundColor: '#dcb980' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={async () => {
                        if (feedback.trim()) {
                          try {
                            // SYNC WITH BACKEND (MongoDB)
                            const response = await axios.post('http://localhost:8080/api/feedback/sync', {
                              text: feedback
                            });
                            console.log("Feedback Synced to MongoDB:", response.data);

                            // FALLBACK: Also save locally just in case
                            const existingFeedback = JSON.parse(localStorage.getItem('p2b_feedback') || '[]');
                            localStorage.setItem('p2b_feedback', JSON.stringify([...existingFeedback, response.data]));

                            setIsSubmitted(true);
                            setTimeout(() => {
                              setIsSubmitted(false);
                              setFeedback("");
                            }, 3000);
                          } catch (error) {
                            console.error("Feedback Sync Failed:", error);
                            alert("System Error: Could not sync feedback with the neural core.");
                          }
                        }
                      }}
                      className="btn-gold-sync p-2 border-0"
                    >
                      <ArrowRight size={20} strokeWidth={3} />
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-2"
                >
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                    <Activity size={16} className="text-emerald" />
                    <span className="tiny-label-sync text-emerald">TRANSMISSION_SUCCESSFUL</span>
                  </div>
                  <p className="small text-white opacity-50 m-0">Your neural data has been synced with the lead architect.</p>
                </motion.div>
              )}
            </div>
            
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3 text-gold-dim hover-gold transition-sync cursor-pointer">
                <Mail size={16} />
                <span className="small fw-bold">pt2401550@gmail.com</span>
              </div>
              <div className="d-flex align-items-center gap-3 text-gold-dim hover-gold transition-sync cursor-pointer">
                <ShieldCheck size={16} />
                <span className="small fw-bold">SECURE_AES_256_ENCRYPTED</span>
              </div>
            </div>
          </Col>
        </Row>

        <div className="footer-divider-sync my-5"></div>

        {/* 🏛️ BOTTOM BAR: CREDITS & LEGAL */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-4">
          <div className="d-flex align-items-center gap-3">
             <div className="built-badge-sync px-3 py-1 rounded-pill">
                <Heart size={12} className="text-danger me-2" fill="currentColor" />
                <span className="tiny-label-sync text-white">Designed & Built by Prashant Tomar</span>
             </div>
             <p className="m-0 text-white opacity-30 small">© {currentYear} P2B_PROTOCOL</p>
          </div>
        </div>
      </Container>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Outfit:wght@100..900&display=swap');

        .footer-root-sync {
          background-color: #0d2120;
          border-top: 1px solid rgba(201, 166, 107, 0.1);
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #e5d5b8;
        }

        .footer-glow-1 {
          position: absolute; top: -100px; right: -100px; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(201, 166, 107, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-glow-2 {
          position: absolute; bottom: -50px; left: -50px; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(26, 188, 156, 0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .fw-black { font-family: 'Outfit', sans-serif; font-weight: 700; }
        .text-gold { color: #c9a66b !important; }
        .text-gold-dim { color: rgba(201, 166, 107, 0.9); }
        .hover-gold:hover { color: #c9a66b !important; }
        .tracking-tighter { letter-spacing: 0.02em; }
        .tiny-label-sync { font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; }

        .footer-logo-node {
          width: 50px; height: 50px;
          background: white;
          border-radius: 12px;
          padding: 2px;
          border: 2px solid #c9a66b;
          box-shadow: 0 0 20px rgba(201, 166, 107, 0.2);
        }

        .footer-link-sync {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.85);
          font-size: 15px;
          font-weight: 500;
          transition: 0.3s;
          display: inline-block;
          margin-bottom: 14px;
          border: none;
          background: none;
          padding: 0;
          text-align: left;
        }
        .footer-link-sync:hover {
          color: #c9a66b;
          transform: translateX(5px);
        }

        .newsletter-node {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
        }

        .newsletter-input-sync {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 12px 18px;
          color: white;
          font-size: 15px;
          outline: none;
        }
        .newsletter-input-sync:focus {
          border-color: #c9a66b;
        }

        .btn-gold-sync {
          background: #c9a66b;
          border: none;
          border-radius: 12px;
          color: #0d2120;
          display: flex; align-items: center; justify-content: center;
        }

        .social-icon-sync {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255, 255, 255, 0.4);
          transition: 0.3s;
          text-decoration: none;
        }
        .social-icon-sync:hover {
          background: #c9a66b;
          color: #0d2120;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(201, 166, 107, 0.2);
        }

        .footer-divider-sync {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201, 166, 107, 0.15), transparent);
        }

        .built-badge-sync {
          background: rgba(201, 166, 107, 0.05);
          border: 1px solid rgba(201, 166, 107, 0.1);
          display: flex; align-items: center;
        }

        .transition-sync { transition: 0.3s; }
        .leading-relaxed { line-height: 1.8; }
        .text-emerald { color: #1abc9c !important; }
      `}</style>
    </footer>
  );
};

const FooterHeading = ({ text }) => (
  <h6 className="fw-black text-white text-uppercase tracking-wider mb-4 pb-2 position-relative" style={{ fontSize: '15px', letterSpacing: '0.05em' }}>
    {text}
    <div className="position-absolute bottom-0 start-0" style={{ width: '40px', height: '2px', background: '#c9a66b' }}></div>
  </h6>
);

const FooterLink = ({ text, onClick }) => (
  <li>
    <button onClick={onClick} className="footer-link-sync">
      {text}
    </button>
  </li>
);

const BottomLink = ({ text }) => (
  <a href="#" className="tiny-label-sync text-decoration-none transition-sync" style={{ color: 'rgba(255,255,255,0.2)' }}
     onMouseEnter={(e) => e.currentTarget.style.color = '#c9a66b'}
     onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}>
    {text}
  </a>
);

export default Footer;