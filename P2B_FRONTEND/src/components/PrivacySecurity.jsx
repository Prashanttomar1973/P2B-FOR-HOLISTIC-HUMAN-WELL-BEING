import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, Zap, Eye, Globe, Info, Scale, 
  ShieldAlert, Fingerprint, Database, Cpu, ChevronRight, 
  ArrowLeft, FileText, Activity, Terminal
} from 'lucide-react';

const PrivacySecurity = () => {
  const [activeSection, setActiveSection] = useState('policy');

  // Page load par auto-scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Security Protocols | P2B Project";
  }, []);

  const sections = [
    { id: 'policy', label: 'Privacy Policy', icon: <Lock size={16} /> },
    { id: 'consent', label: 'Data Consent', icon: <Fingerprint size={16} /> },
    { id: 'marketing', label: 'Communication', icon: <Globe size={16} /> },
    { id: 'cookies', label: 'Cookie Architecture', icon: <Database size={16} /> },
    { id: 'transfers', label: 'Global Transfers', icon: <Scale size={16} /> },
    { id: 'security', label: 'Security Layer', icon: <ShieldCheck size={16} /> },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="neural-legal-wrapper position-relative overflow-hidden">
      {/* 🔮 ADVANCED AMBIENT NODES */}
      <div className="bg-glow" style={{ position: 'absolute', top: '10%', left: '5%', width: '600px', height: '600px', background: 'rgba(201, 166, 107, 0.05)', filter: 'blur(150px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="bg-glow-2" style={{ position: 'absolute', bottom: '5%', right: '10%', width: '500px', height: '500px', background: 'rgba(26, 188, 156, 0.04)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="scanline-overlay"></div>

      <Container className="py-5 position-relative z-1" style={{ maxWidth: '1200px' }}>
        
        {/* 🚀 PROTOCOL HEADER ARCHITECTURE */}
        <motion.header 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-4"
        >
          <div className="header-intel">
            <div className="d-flex align-items-center gap-2 mb-2">
               <div className="status-blip"></div>
               <span className="tiny-label text-gold uppercase tracking-widest">System Status: Encryption_Active</span>
            </div>
            <h1 className="fw-black text-white protocol-font m-0 text-uppercase tracking-tighter" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 0.9 }}>
              Privacy <span className="text-gold">&</span> Security
            </h1>
            <p className="tiny-label text-white opacity-40 uppercase tracking-widest mt-3 d-flex align-items-center gap-2">
              <Terminal size={12} /> P2B_LEGAL_CORE_V3.0 // DATA_GOVERNANCE_ACTIVE
            </p>
          </div>
          
          <div className="revision-node d-none d-md-flex flex-column align-items-end">
             <div className="d-flex gap-2 mb-2">
                {[1, 2, 3].map(i => <div key={i} className="mini-bit" style={{ opacity: i === 3 ? 1 : 0.3 }}></div>)}
             </div>
             <div className="px-4 py-2 rounded-pill border border-gold border-opacity-20 bg-gold bg-opacity-5 backdrop-blur">
                <span className="tiny-label text-gold text-uppercase tracking-wider">Last Revision Protocol: FEB 2026</span>
             </div>
          </div>
        </motion.header>

        <Row className="g-5">
          {/* ⚓ STICKY NAVIGATION SIDEBAR */}
          <Col lg={3} className="d-none d-lg-block">
             <div className="sticky-sidebar">
                <div className="sidebar-container p-4">
                   <h6 className="tiny-label text-gold uppercase tracking-widest mb-4 opacity-50">Navigation Node</h6>
                   <div className="d-flex flex-column gap-2">
                      {sections.map(section => (
                        <button 
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`nav-anchor ${activeSection === section.id ? 'active' : ''}`}
                        >
                          <span className="icon-box">{section.icon}</span>
                          <span className="label-text">{section.label}</span>
                          {activeSection === section.id && <motion.div layoutId="active-indicator" className="active-dot" />}
                        </button>
                      ))}
                   </div>

                   <div className="sidebar-footer mt-5 pt-4 border-top border-white border-opacity-5">
                      <div className="security-stat-card">
                         <div className="d-flex justify-content-between mb-2">
                            <span className="tiny-label opacity-40 uppercase">Protection Level</span>
                            <span className="tiny-label text-gold uppercase">Military Grade</span>
                         </div>
                         <div className="stat-bar"><div className="stat-fill" style={{ width: '92%' }}></div></div>
                      </div>
                   </div>
                </div>
             </div>
          </Col>

          {/* 📜 MAIN LEGAL FEED */}
          <Col lg={9}>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="legal-feed-container"
            >
              <div className="neural-card-v2">
                <div className="card-top-bar d-flex justify-content-between align-items-center px-5 py-3 border-bottom border-white border-opacity-5">
                   <div className="d-flex align-items-center gap-3">
                      <Cpu size={14} className="text-gold" />
                      <span className="tiny-label opacity-50 uppercase tracking-widest">Legal_Process_Layer_Active</span>
                   </div>
                   <div className="window-dots d-flex gap-2">
                      <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                   </div>
                </div>

                <div className="card-content p-4 p-md-5">
                  {/* 1. Privacy Policy */}
                  <section id="policy" className="legal-section mb-5 pb-5 border-bottom border-white border-opacity-5">
                    <div className="section-head mb-4">
                       <div className="category-tag mb-3">01 // IDENTITY_CORE</div>
                       <h3 className="fw-black text-white uppercase tracking-tight d-flex align-items-center gap-3">
                          <Lock className="text-gold" /> Privacy Architecture
                       </h3>
                    </div>
                    <p className="legal-para">
                      P2B ("we", "us", "our") is committed to maintaining the highest level of biological and psychological data integrity. We understand that your data is not just information—it is a digital reflection of your identity. 
                    </p>
                    <p className="legal-para">
                      Our Privacy Policy outlines how we collect, process, and safeguard your data within the P2B Intelligence Layer. We utilize advanced encryption standards (AES-256) and decentralized processing where possible to ensure your profile remains private.
                    </p>
                    <div className="highlight-box p-4 rounded-4 mt-4">
                       <h6 className="text-gold fw-bold uppercase small mb-2 d-flex align-items-center gap-2">
                          <ShieldAlert size={14} /> Zero Third-Party Sale Guarantee
                       </h6>
                       <p className="m-0 tiny-label opacity-70 leading-relaxed">
                          We will not disclose information about our customers to third parties except where it is part of providing a service to you—carrying out security checks or where we have your express permission.
                       </p>
                    </div>
                  </section>

                  {/* 2. Your Consent */}
                  <section id="consent" className="legal-section mb-5 pb-5 border-bottom border-white border-opacity-5">
                    <div className="section-head mb-4">
                       <div className="category-tag mb-3">02 // NEURAL_AUTHORIZATION</div>
                       <h3 className="fw-black text-white uppercase tracking-tight d-flex align-items-center gap-3">
                          <Fingerprint className="text-gold" /> Your Consent Protocol
                       </h3>
                    </div>
                    <p className="legal-para">
                      By engaging with the P2B platform, you authorize the synthesis of your provided biological markers for the purpose of generating personalized insights. This authorization can be revoked at any time through the 'Clear Neural Cache' option in your account settings.
                    </p>
                    <p className="legal-para">
                      We will not sell your name, address, e-mail address, or credit card information to any third party without your explicit permission. Your engagement with partners linked from our site is governed by their respective privacy architectures.
                    </p>
                  </section>

                  {/* 3. Communication & Marketing */}
                  <section id="marketing" className="legal-section mb-5 pb-5 border-bottom border-white border-opacity-5">
                    <div className="section-head mb-4">
                       <div className="category-tag mb-3">03 // FEEDBACK_LOOPS</div>
                       <h3 className="fw-black text-white uppercase tracking-tight d-flex align-items-center gap-3">
                          <Globe className="text-gold" /> Communication Protocols
                       </h3>
                    </div>
                    <p className="legal-para">
                      Occasionally, we may transmit system updates, breakthrough wellness news, and special engagement offers to your registered endpoints. These communications are designed to optimize your long-term interaction with the P2B ecosystem.
                    </p>
                    <div className="opt-out-node p-4 rounded-4 border border-white border-opacity-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                       <div>
                          <h6 className="text-white fw-bold m-0 mb-1">Opt-Out Availability</h6>
                          <p className="m-0 tiny-label opacity-40 uppercase">User-controlled marketing filters active</p>
                       </div>
                       <button className="p2b-btn-outline small">MANAGE PREFERENCES</button>
                    </div>
                  </section>

                  {/* 4. Cookies Section */}
                  <section id="cookies" className="legal-section mb-5 pb-5 border-bottom border-white border-opacity-5">
                    <div className="section-head mb-4">
                       <div className="category-tag mb-3">04 // SESSION_PERSISTENCE</div>
                       <h3 className="fw-black text-white uppercase tracking-tight d-flex align-items-center gap-3">
                          <Database className="text-gold" /> Cookie Architecture
                       </h3>
                    </div>
                    <p className="legal-para">
                      Our system utilizes 'Cookies'—small metadata packets—to recognize your neural signature across sessions. This architecture is essential for maintaining your bio-profile state and providing a seamless navigation experience.
                    </p>

                    <Row className="g-3 mt-2">
                      {[
                        { title: "Essential Protocol", desc: "Critical for session maintenance and secure login pathways." },
                        { title: "Performance Analysis", desc: "Anonymous telemetry used to optimize engine efficiency." },
                        { title: "Custom Experience", desc: "Remembers your design preferences and UI configuration." }
                      ].map((cookie, idx) => (
                        <Col md={4} key={idx}>
                          <div className="cookie-node p-3 h-100 rounded-4 border border-white border-opacity-5 bg-black bg-opacity-20">
                             <h6 className="tiny-label text-gold uppercase mb-2">{cookie.title}</h6>
                             <p className="m-0 tiny-label opacity-40 leading-relaxed">{cookie.desc}</p>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </section>

                  {/* 5. Transfers of Information */}
                  <section id="transfers" className="legal-section mb-5 pb-5 border-bottom border-white border-opacity-5">
                    <div className="section-head mb-4">
                       <div className="category-tag mb-3">05 // GLOBAL_CONNECTIVITY</div>
                       <h3 className="fw-black text-white uppercase tracking-tight d-flex align-items-center gap-3">
                          <Scale className="text-gold" /> Data Transfer Matrix
                       </h3>
                    </div>
                    <p className="legal-para">
                      Data collected may be processed through our global network of localized nodes, including regions outside the European Economic Area (EEA). Regardless of geography, all data packets remain under the protection of the P2B Global Security Protocol.
                    </p>
                    <div className="warning-callout d-flex gap-3 p-3 rounded-3 mt-4" style={{ background: 'rgba(239, 68, 68, 0.05)', borderLeft: '3px solid #ef4444' }}>
                       <ShieldAlert size={18} className="text-danger flex-shrink-0" />
                       <p className="m-0 tiny-label opacity-80" style={{ color: '#ff8a8a' }}>
                          CAUTION: While we utilize the highest encryption standards, the transmission of data via global networks is inherently at-risk. All transmissions are performed under user-acknowledged liability.
                       </p>
                    </div>
                  </section>

                  {/* 6. Security Layer */}
                  <section id="security" className="legal-section">
                    <div className="section-head mb-4">
                       <div className="category-tag mb-3">06 // FORTRESS_SHIELD</div>
                       <h3 className="fw-black text-white uppercase tracking-tight d-flex align-items-center gap-3">
                          <ShieldCheck className="text-gold" /> Security Infrastructure
                       </h3>
                    </div>
                    <p className="legal-para">
                      Our security architecture is built on a zero-trust model. Access to sensitive biological data is restricted to authorized neural sessions and encrypted via multi-factor authentication.
                    </p>
                    <div className="tech-spec-grid mt-4">
                       <div className="spec-row d-flex justify-content-between py-2 border-bottom border-white border-opacity-5">
                          <span className="tiny-label opacity-40 uppercase">Encryption Engine</span>
                          <span className="tiny-label text-white uppercase fw-bold">AES-256 BIT</span>
                       </div>
                       <div className="spec-row d-flex justify-content-between py-2 border-bottom border-white border-opacity-5">
                          <span className="tiny-label opacity-40 uppercase">SSL Architecture</span>
                          <span className="tiny-label text-white uppercase fw-bold">TLS 1.3 / ECDHE</span>
                       </div>
                       <div className="spec-row d-flex justify-content-between py-2 border-bottom border-white border-opacity-5">
                          <span className="tiny-label opacity-40 uppercase">Access Protocol</span>
                          <span className="tiny-label text-white uppercase fw-bold">NEURAL_MFA_ACTIVE</span>
                       </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* 🏁 FOOTER FINISH */}
              <footer className="mt-5 pt-4 text-center">
                 <div className="d-inline-flex align-items-center gap-3 px-4 py-2 rounded-pill bg-white bg-opacity-5 border border-white border-opacity-10 mb-4">
                    <Activity size={14} className="text-gold" />
                    <span className="tiny-label text-white opacity-40 uppercase tracking-widest">Legal Consciousness Active // Protocol V3.0.2</span>
                 </div>
                 <p className="m-0 tiny-label opacity-20 uppercase tracking-widest">© 2026 P2B PROJECT // ALL SYSTEMS SECURED</p>
              </footer>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Outfit:wght@400;700;900&display=swap');

        .neural-legal-wrapper {
          background: radial-gradient(circle at 20% 30%, #1e4d4a 0%, #0d2120 100%);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: white;
          padding-top: 80px;
          padding-bottom: 120px;
        }

        .protocol-font { font-family: 'Outfit', sans-serif; letter-spacing: -2px; }
        .fw-black { font-weight: 900; }
        .text-gold { color: #c9a66b !important; }
        .uppercase { text-transform: uppercase; }
        .tracking-widest { letter-spacing: 3px; }
        .tracking-tight { letter-spacing: -1px; }
        .tiny-label { font-size: 10px; font-weight: 900; }
        .leading-relaxed { line-height: 2.1; }

        /* HEADER DECOR */
        .status-blip {
          width: 8px; height: 8px;
          background: #1abc9c;
          border-radius: 50%;
          box-shadow: 0 0 10px #1abc9c;
          animation: pulse-blip 2s infinite;
        }
        @keyframes pulse-blip {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .mini-bit { width: 4px; height: 12px; background: #c9a66b; border-radius: 2px; }
        .backdrop-blur { backdrop-filter: blur(10px); }

        /* SIDEBAR NAVIGATION */
        .sticky-sidebar { position: sticky; top: 120px; }
        .sidebar-container {
           background: rgba(255, 255, 255, 0.02);
           border: 1px solid rgba(255, 255, 255, 0.05);
           border-radius: 30px;
           backdrop-filter: blur(20px);
        }

        .nav-anchor {
           background: transparent;
           border: none;
           width: 100%;
           display: flex;
           align-items: center;
           gap: 15px;
           padding: 12px 18px;
           border-radius: 15px;
           color: rgba(255, 255, 255, 0.4);
           transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
           position: relative;
           text-align: left;
        }

        .nav-anchor:hover { background: rgba(255, 255, 255, 0.05); color: #fff; }
        .nav-anchor.active { background: rgba(201, 166, 107, 0.1); color: #c9a66b; }

        .icon-box { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.03); border-radius: 10px; transition: 0.3s; }
        .nav-anchor.active .icon-box { background: #c9a66b; color: #1a3c3a; }
        
        .label-text { font-size: 13px; font-weight: 600; }
        .active-dot { width: 6px; height: 6px; background: #c9a66b; border-radius: 50%; margin-left: auto; }

        .stat-bar { width: 100%; height: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; overflow: hidden; }
        .stat-fill { height: 100%; background: #c9a66b; box-shadow: 0 0 10px #c9a66b; }

        /* MAIN CONTENT CARD */
        .neural-card-v2 {
          background: linear-gradient(145deg, rgba(61, 90, 90, 0.8), rgba(40, 60, 60, 0.6));
          backdrop-filter: blur(40px);
          border: 1px solid rgba(201, 166, 107, 0.15);
          border-radius: 40px;
          box-shadow: 0 50px 120px rgba(0, 0, 0, 0.6);
          overflow: hidden;
        }

        .dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); }
        
        .category-tag {
           font-size: 9px;
           font-weight: 800;
           color: #c9a66b;
           letter-spacing: 2px;
           font-family: 'Outfit', sans-serif;
        }

        .legal-para {
          font-size: 15px;
          line-height: 2.1;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 25px;
          font-weight: 400;
        }

        .highlight-box {
           background: rgba(201, 166, 107, 0.05);
           border: 1px solid rgba(201, 166, 107, 0.1);
        }

        .p2b-btn-outline {
           background: transparent;
           border: 1px solid rgba(255, 255, 255, 0.1);
           color: #fff;
           padding: 10px 24px;
           border-radius: 12px;
           font-size: 11px;
           font-weight: 700;
           letter-spacing: 1.5px;
           transition: 0.3s;
        }
        .p2b-btn-outline:hover { background: #fff; color: #1a3c3a; }

        .scanline-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.01), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.01));
          background-size: 100% 4px, 3px 100%;
          pointer-events: none;
          z-index: 100;
          opacity: 0.3;
        }

        @media (max-width: 991px) {
           .neural-legal-wrapper { padding-top: 40px; }
           .card-content { padding: 30px !important; }
        }
      `}</style>
    </div>
  );
};

export default PrivacySecurity;