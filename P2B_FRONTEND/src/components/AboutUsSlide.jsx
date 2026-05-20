import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartPulse, Brain, Compass, ShieldCheck, 
  ArrowLeft, Cpu, BarChart3, Users, Mail, Globe,
  Zap, Sparkles, Activity, Layers
} from 'lucide-react';

const AboutUsSlide = ({ onBack, onStartSession }) => {
  const [showContactInfo, setShowContactInfo] = React.useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  // 🖼️ FIXED HERO ASSET: Using public folder relative path
  const HERO_IMAGE = "/about_hero.png";

  return (
    <div className="about-us-root min-vh-100 position-relative overflow-hidden pb-5">
      {/* ADVANCED BACKGROUND ELEMENTS */}
      <div className="bg-glow" style={{ position: 'absolute', top: '10%', left: '5%', width: '600px', height: '600px', background: 'rgba(201, 166, 107, 0.05)', filter: 'blur(150px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="bg-glow-2" style={{ position: 'absolute', bottom: '5%', right: '5%', width: '400px', height: '400px', background: 'rgba(26, 188, 156, 0.03)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>

      {/* STICKY TOP NAV */}
      <div className="sticky-top py-3 px-4 px-lg-5 d-flex justify-content-between align-items-center" style={{ background: 'rgba(13, 33, 32, 0.8)', backdropFilter: 'blur(20px)', zIndex: 1000, borderBottom: '1px solid rgba(201, 166, 107, 0.1)' }}>
        <motion.button 
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="nav-back-trigger-sync d-flex align-items-center gap-2 border-0 px-4 py-2 rounded-pill"
          onClick={onBack}
        >
          <ArrowLeft size={18} /> <span className="fw-black text-uppercase tracking-wider small">Back</span>
        </motion.button>
        <div className="branding-node-about px-3 py-1 rounded-pill border border-gold border-opacity-20 d-flex align-items-center gap-2">
           <Sparkles size={14} className="text-gold" />
           <span className="tiny-label text-gold fw-bold uppercase">P2B_PROTOCOL_V3.0</span>
        </div>
      </div>

      {/* 🏛️ 1. EPIC HERO SECTION */}
      <div className="container py-5 mt-4">
        <div className="row align-items-center g-5">
           <div className="col-lg-6">
              <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                 <div className="badge-sync px-3 py-2 rounded-pill mb-4 text-uppercase tracking-widest fw-black small">The Human Equilibrium Project</div>
                 <h1 className="display-1 fw-black mb-4 text-gold tracking-tighter leading-tight">Beyond Data, <br/>Towards Wisdom</h1>
                 <p className="lead text-white opacity-80 mb-5" style={{ lineHeight: '1.8', fontWeight: '300' }}>
                    P2B is not just a health app—it is a **Neural Synthesis Engine**. We bridge the gap between biological data, psychological frameworks, and philosophical wisdom to map your unique path toward peak human performance.
                 </p>
                 <div className="d-flex gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      onClick={onStartSession}
                      className="btn-gold-action px-5 py-3 rounded-pill fw-black uppercase tracking-widest"
                    >
                      Initialize Matrix
                    </motion.button>
                 </div>
              </motion.div>
           </div>
           <div className="col-lg-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="hero-image-wrapper p-3"
              >
                 <img src={HERO_IMAGE} alt="Neural Mapping Visualization" className="img-fluid rounded-5 shadow-2xl border border-gold border-opacity-20" />
                 <div className="image-hologram-overlay"></div>
              </motion.div>
           </div>
        </div>
      </div>

      {/* 🏛️ 2. THE THREE CORE PILLARS */}
      <section className="container py-5 my-5">
         <div className="text-center mb-5">
            <h6 className="text-gold uppercase tracking-widest fw-black mb-3">Architectural Pillars</h6>
            <h2 className="display-4 fw-black text-white tracking-tight">The P2B Universal Framework</h2>
         </div>
         <div className="row g-4">
            {[
              { 
                title: 'Biology', 
                icon: <Activity />, 
                tag: 'HARDWARE_OPTIMIZATION', 
                desc: 'Mapping your physiological substrate—from mitochondrial health and sleep architecture to glucose management and cellular resilience.',
                color: '#c9a66b'
              },
              { 
                title: 'Psychology', 
                icon: <Layers />, 
                tag: 'COGNITIVE_MAPPING', 
                desc: 'Analyzing the software of the mind. Utilizing behavioral science and neuro-plasticity frameworks to reset dopamine and focus.',
                color: '#1abc9c'
              },
              { 
                title: 'Philosophy', 
                icon: <Compass />, 
                tag: 'EXISTENTIAL_RESILIENCE', 
                desc: 'The operating core. Integrating Stoic endurance and Existential clarity to build a psychological immune system.',
                color: '#a020f0'
              }
            ].map((pillar, i) => (
              <div className="col-lg-4" key={pillar.title}>
                 <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.2 }}
                   viewport={{ once: true }}
                   className="pillar-card-v3 h-100 p-5"
                 >
                    <div className="pillar-icon-node mb-4" style={{ background: `${pillar.color}20`, color: pillar.color }}>
                       {React.cloneElement(pillar.icon, { size: 32 })}
                    </div>
                    <span className="tiny-label text-gold-dim uppercase tracking-widest d-block mb-2">{pillar.tag}</span>
                    <h3 className="fw-black text-white mb-4 uppercase">{pillar.title}</h3>
                    <p className="text-white opacity-60 fw-light leading-relaxed mb-0">{pillar.desc}</p>
                 </motion.div>
              </div>
            ))}
         </div>
      </section>

      {/* 🏛️ 3. THE UNIVERSAL ENGINE & SYNC */}
      <section className="py-5" style={{ background: 'rgba(0,0,0,0.2)' }}>
         <div className="container py-5">
            <div className="row g-5 align-items-center">
               <div className="col-lg-5">
                  <h2 className="display-5 fw-black text-gold mb-4 uppercase tracking-tighter">Neural Synthesis Engine</h2>
                  <p className="text-white opacity-80 lead mb-5">Our proprietary AI architecture doesn't just store data—it synthesizes it. Every conversation with the P2B Chatbot and every Assessment you complete feeds into your **Dynamic Neural Profile**.</p>
                  
                  <div className="d-grid gap-4">
                     <div className="engine-feature d-flex gap-4 p-4 rounded-4">
                        <Zap className="text-gold" size={24} />
                        <div>
                           <h6 className="fw-black text-white uppercase m-0">Real-Time Synthesis</h6>
                           <p className="small text-white opacity-50 m-0 mt-1">Resources and recommendations update instantly as your bio-markers evolve.</p>
                        </div>
                     </div>
                     <div className="engine-feature d-flex gap-4 p-4 rounded-4">
                        <Cpu className="text-gold" size={24} />
                        <div>
                           <h6 className="fw-black text-white uppercase m-0">Grounded Logic</h6>
                           <p className="small text-white opacity-50 m-0 mt-1">All AI responses are cross-referenced with clinical research and peer-reviewed journals.</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-7">
                  <div className="tech-stack-grid p-4 p-lg-5 rounded-5 shadow-2xl">
                     <div className="row g-4 text-center">
                        {['Neural Engine', 'Global Sync', 'Secure Vault', 'Bio-Mapping', 'AI Synthesis', 'Protocol V3'].map(tech => (
                           <div className="col-4" key={tech}>
                              <div className="tech-node py-3 rounded-3 border border-gold border-opacity-20" style={{ background: 'rgba(201, 166, 107, 0.05)' }}>
                                 <span className="tiny-label text-gold fw-bold uppercase tracking-widest">{tech}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="mt-5 p-4 rounded-4 bg-black bg-opacity-40 border border-gold border-opacity-20">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                           <span className="tiny-label text-gold fw-bold uppercase">PROTOCOL_STATUS: OPTIMIZED</span>
                           <Activity size={14} className="text-emerald" />
                        </div>
                        <code className="small text-gold-dim d-block" style={{ fontFamily: 'monospace' }}>
                           &gt;&gt; Synchronizing with Universal Intelligence...<br/>
                           &gt;&gt; Bio-Metric Alignment: COMPLETE<br/>
                           &gt;&gt; Data Integrity: VERIFIED
                        </code>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      
      {/* 🏛️ 4. FINAL CTA */}
      <section className="container py-5 my-5 text-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="cta-card-about p-5 rounded-5 border border-gold border-opacity-20 shadow-2xl position-relative"
         >
            {!showContactInfo ? (
              <>
                <h2 className="display-4 fw-black text-gold mb-4 tracking-tighter">Ready to Begin the Synthesis?</h2>
                <p className="text-white opacity-60 mb-5 mx-auto" style={{ maxWidth: '600px' }}>Join a new paradigm of human optimization where science meets wisdom.</p>
                <div className="d-flex justify-content-center gap-3 mt-2">
                   <motion.button 
                     whileHover={{ scale: 1.05, backgroundColor: 'rgba(201, 166, 107, 0.15)' }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setShowContactInfo(true)}
                     className="btn-outline-gold px-5 py-3 rounded-pill fw-black uppercase tracking-widest d-flex align-items-center justify-content-center gap-3 border-gold"
                     style={{ cursor: 'pointer', minWidth: '300px', background: 'transparent', color: '#c9a66b' }}
                   >
                     <Mail size={20} /> Contact Lead Architect
                   </motion.button>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="contact-info-reveal py-4"
              >
                <h3 className="text-gold fw-black uppercase mb-3">Contact Protocol</h3>
                <p className="text-white opacity-60 mb-4">Direct synchronization link to the lead architect:</p>
                <div className="bg-black bg-opacity-40 p-4 rounded-4 border border-gold border-opacity-20 mb-4 d-inline-block mx-auto">
                   <code className="h4 text-gold fw-bold mb-0" style={{ letterSpacing: '1px' }}>pt2401550@gmail.com</code>
                </div>
                <div className="d-flex justify-content-center gap-3">
                   <motion.a 
                     href="mailto:techoftrack@gmail.com"
                     className="btn-gold-action px-4 py-2 rounded-pill small fw-bold text-decoration-none"
                     style={{ color: '#1a3c3a' }}
                   >
                     Open Mail Client
                   </motion.a>
                   <button 
                     onClick={() => setShowContactInfo(false)}
                     className="btn btn-outline-light px-4 py-2 rounded-pill small fw-bold border-opacity-25 text-white"
                   >
                     Close
                   </button>
                </div>
              </motion.div>
            )}
         </motion.div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900&display=swap');

        .about-us-root {
          background: radial-gradient(circle at 20% 30%, #1e4d4a 0%, #0d2120 100%);
          font-family: 'Inter', sans-serif;
          color: white;
        }

        h1, h2, h3, .fw-black { font-family: 'Outfit', sans-serif; font-weight: 900; }
        .text-gold { color: #c9a66b !important; }
        .text-gold-dim { color: rgba(201, 166, 107, 0.6) !important; }
        .uppercase { text-transform: uppercase; }
        .tracking-widest { letter-spacing: 4px; }
        .tracking-wider { letter-spacing: 2px; }
        .tracking-tighter { letter-spacing: -2px; }

        .nav-back-trigger-sync {
          background: rgba(201, 166, 107, 0.1);
          border: 1px solid rgba(201, 166, 107, 0.3) !important;
          color: #c9a66b;
          transition: 0.3s;
        }
        .nav-back-trigger-sync:hover { background: #c9a66b; color: #1a3c3a; }

        .badge-sync {
          background: rgba(201, 166, 107, 0.1);
          color: #c9a66b;
          border: 1px solid rgba(201, 166, 107, 0.2);
          display: inline-block;
        }

        .hero-image-wrapper {
          position: relative;
          z-index: 10;
        }
        .image-hologram-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(201, 166, 107, 0.2) 0%, transparent 100%);
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        .btn-gold-action {
          background: #c9a66b;
          color: #1a3c3a;
          border: none;
          box-shadow: 0 15px 30px rgba(201, 166, 107, 0.3);
          transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .btn-gold-action:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(201, 166, 107, 0.4);
        }

        .pillar-card-v3 {
          background: linear-gradient(145deg, rgba(61, 90, 90, 0.6), rgba(40, 60, 60, 0.4));
          border: 1px solid rgba(201, 166, 107, 0.1);
          border-radius: 40px;
          backdrop-filter: blur(15px);
          transition: 0.4s;
        }
        .pillar-card-v3:hover {
          border-color: #c9a66b;
          transform: translateY(-15px);
          background: linear-gradient(145deg, rgba(61, 90, 90, 0.8), rgba(40, 60, 60, 0.6));
        }

        .pillar-icon-node {
          width: 70px; height: 70px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .engine-feature {
           background: rgba(255,255,255,0.03);
           border: 1px solid rgba(255,255,255,0.05);
           transition: 0.3s;
        }
        .engine-feature:hover {
           background: rgba(201, 166, 107, 0.05);
           border-color: rgba(201, 166, 107, 0.2);
        }

        .tech-stack-grid {
           background: linear-gradient(145deg, #0d2120, #1a3c3a);
           border: 1px solid rgba(201, 166, 107, 0.15);
        }

        .cta-card-about {
           background: radial-gradient(circle at center, rgba(201, 166, 107, 0.1), transparent);
           backdrop-filter: blur(10px);
        }

        .btn-outline-gold {
           border: 1px solid #c9a66b !important;
           color: #c9a66b !important;
           background: transparent;
           transition: 0.3s;
        }
        .btn-outline-gold:hover {
           background: rgba(201, 166, 107, 0.1) !important;
        }

        .tiny-label { font-size: 10px; font-weight: 800; letter-spacing: 1.5px; }
        .leading-relaxed { line-height: 1.8; }
        .text-emerald { color: #1abc9c !important; }

        @media (max-width: 991px) {
           .display-1 { font-size: 3.5rem; }
           .display-4 { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
};

export default AboutUsSlide;