import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const MainBody = ({ onExploreBiology, onExplorePsychology, onExplorePhilosophy, onStartSession, onChatWithP2B }) => {
  const mainVennDiagramPath = "/Heroimage.png"; 
  const biologyLogoPath = "/BiologyCardimage.png"; 
  const psychologyLogoPath = "/PsychologyCardimage.png"; 
  const philosophyLogoPath = "/PhilosophyCardimage.png"; 

  return (
    <div style={{
      background: 'radial-gradient(circle at 20% 30%, #1e4d4a 0%, #0d2120 100%)', 
      /* Optimized for single-view visibility */
      height: 'calc(100vh - 68px)',
      minHeight: '600px', // Fallback for very short screens
      display: 'flex',
      alignItems: 'center',
      padding: '40px 0px', 
      overflow: 'hidden',
      color: '#fff',
      position: 'relative',
      marginBottom: '0px',
      zIndex: 1
    }}>
      {/* ADVANCED BACKGROUND ELEMENTS */}
      <div className="bg-glow" style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'rgba(201, 166, 107, 0.08)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }}></div>
      <div className="bg-glow-2" style={{ position: 'absolute', bottom: '5%', right: '5%', width: '300px', height: '300px', background: 'rgba(26, 188, 156, 0.05)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }}></div>

      <Container fluid="lg">
        <Row className="align-items-center g-0"> {/* FIX 4: g-0 added to prevent horizontal scroll gaps */}
          
          {/* LEFT SECTION: Speech Bubble & CTA */}
          <Col lg={5} className="d-flex flex-column align-items-start mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <div className="speech-bubble-container"
              style={{
                background: "linear-gradient(145deg, rgba(61, 90, 90, 0.8), rgba(40, 60, 60, 0.6))",
                backdropFilter: "blur(15px)",
                border: "2px solid rgba(201, 166, 107, 0.5)",
                borderRadius: "28px",
                padding: "35px",
                position: "relative",
                marginBottom: "40px",
                maxWidth: "480px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                animation: "fadeInLeft 1s ease-out"
              }}
            >
              <h2 style={{ color: "#c9a66b", fontSize: "1.4rem", fontWeight: "800", marginBottom: "15px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                P2B for holistic human well being
              </h2>
              <p style={{ color: "rgba(255,255,255,0.95)", fontSize: "1.05rem", lineHeight: "1.8", margin: 0, fontWeight: "300" }}>
                A personalized approach to understanding <span style={{ color: "#c9a66b", fontWeight: "600" }}>Mind, Body & Spirit</span>. 
                United biology, psychology, and philosophy.
              </p>
              
              <div style={{
                  position: "absolute", bottom: "-14px", left: "45px", width: 0, height: 0,
                  borderLeft: "15px solid transparent", borderRight: "15px solid transparent",
                  borderTop: "15px solid rgba(201, 166, 107, 0.8)",
              }} />
            </div>

            <Button 
              className="rounded-pill border-0 chat-btn-advance" 
              onClick={onChatWithP2B}
              style={{ 
                fontSize: '14px', 
                backgroundColor: '#c9a66b', 
                color: '#1a3c3a',
                padding: '14px 40px',
                fontWeight: '900',
                boxShadow: '0 8px 15px rgba(201, 166, 107, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                letterSpacing: '2px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              CHAT WITH P2B
            </Button>
          </Col>

          {/* RIGHT SECTION: Venn Diagram & Staggered Cards */}
          <Col lg={7} className="position-relative">
            <div style={{ position: 'relative', width: '100%', animation: 'float 6s ease-in-out infinite' }}>
              <div style={{ position: 'relative', width: '90%', marginLeft: 'auto' }} className="hero-img-wrapper">
                <div style={{ position: 'absolute', right: '-25px', top: '25px', width: '100%', height: '100%', backgroundColor: 'rgba(243, 156, 18, 0.15)', borderRadius: '45px', zIndex: 0, filter: 'blur(2px)' }}></div>
                <div style={{ position: 'absolute', right: '-12px', top: '12px', width: '100%', height: '100%', backgroundColor: 'rgba(26, 188, 156, 0.15)', borderRadius: '45px', zIndex: 0 }}></div>
                
                <div style={{
                  borderRadius: '45px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.15)',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 40px 80px #724F80',
                  background: 'linear-gradient(145deg, #083d60, #6e6710c7)'
                }}>
                  <img 
                    src={mainVennDiagramPath} 
                    alt="P2B Concept" 
                    style={{ width: '100%', height: 'auto', maxHeight: '440px', objectFit: 'contain', display: 'block', padding: '10px' }}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/800x500/1a3c3a/ffffff?text=Venn+Diagram"; }}
                  />
                </div>
              </div>

              <div className="cards-stack-container">
                <CategoryCard 
  title="BIOLOGY PRY" 
  logo={biologyLogoPath} 
  yPos="60px" 
  delay="0.2s" 
  onClick={onExploreBiology} // Yeh function App.jsx se view change karega
/>
                <CategoryCard 
                  title="PSYCHOLOGY PRY" 
                  logo={psychologyLogoPath} 
                  yPos="20px" 
                  delay="0.4s" 
                  onClick={onExplorePsychology} // 🧠 Handler linked
                />
                <CategoryCard 
                  title="PHILOSOPHY PRY" 
                  logo={philosophyLogoPath} 
                  yPos="-10px" 
                  delay="0.6s" 
                  onClick={onExplorePhilosophy} // 🧭 Handler linked
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        /* Global Reset to kill white edges */
        body, html { margin: 0; padding: 0; overflow-x: hidden; }

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        @keyframes cardEntrance {
          from { opacity: 0; transform: scale(0.8) translateY(50px); }
          to { opacity: 1; transform: scale(1) translateY(var(--y-pos)); }
        }

        .chat-btn-advance:hover { 
          transform: translateY(-5px) scale(1.02); 
          box-shadow: 0 20px 40px rgba(201, 166, 107, 0.3);
          filter: brightness(1.1);
        }

        .cards-stack-container {
          display: flex;
          justify-content: flex-end;
          gap: 30px;
          margin-top: 50px;
          padding-right: 15px;
        }

        .card-unit {
          animation: cardEntrance 0.8s ease-out backwards;
        }

        @media (max-width: 991px) {
          .cards-stack-container { 
            flex-direction: column; 
            align-items: center; 
            margin-top: 40px;
            gap: 20px;
          }
          .card-unit { transform: translateY(0) !important; width: 100% !important; max-width: 260px; }
          .hero-img-wrapper { width: 100% !important; }
        }

        .card-unit:hover {
          transform: translateY(calc(var(--y-pos) - 15px)) scale(1.08) !important;
          border-color: #c9a66b !important;
          background: #f7e9d3 !important;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5) !important;
        }
      `}</style>
    </div>
  );
};

const CategoryCard = ({ title, logo, yPos, delay, onClick }) => (
  <div 
    className="card-unit"
    onClick={onClick}
    style={{
      '--y-pos': yPos,
      animationDelay: delay,
      backgroundColor: '#e5d5b8',
      color: '#1a3c3a',
      padding: '18px 24px',
      borderRadius: '24px',
      width: '230px',
      border: '2px solid rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      boxShadow: '8px 8px 0px rgba(0,0,0,0.2)',
      transform: `translateY(${yPos})`,
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'pointer',
      zIndex: 5
    }}
  >
    <div style={{ 
      width: '44px', height: '44px', backgroundColor: '#fff',
      borderRadius: '14px', border: '1px solid rgba(0,0,0,0.05)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }}>
      <img src={logo} alt="icon" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
    </div>
    <div style={{ fontWeight: '900', fontSize: '13.5px', lineHeight: '1.2' }}>
      <span style={{ fontSize: '9px', fontWeight: '700', display: 'block', opacity: 0.5, letterSpacing: '1px' }}>EXPLORE</span>
      {title}
    </div>
  </div>
);

export default MainBody;