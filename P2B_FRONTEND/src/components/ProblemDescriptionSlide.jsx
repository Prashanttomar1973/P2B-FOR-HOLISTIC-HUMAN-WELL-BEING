import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { MessageCircle, ChevronLeft, Send, PenTool, Brain, Activity, Sparkles, ShieldCheck } from 'lucide-react';

const ProblemDescriptionSlide = ({ formData, handleChange, onBack, onSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);
  const textLength = formData.userProblem?.length || 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <Container className="neural-slide-container py-3">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="neural-slide-card manifestation-protocol-card"
      >
        {/* TOP PROTOCOL HEADER */}
        <div className="protocol-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="protocol-icon-shimmer">
              <PenTool size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="m-0 protocol-title">Problem Manifestation Protocol</h4>
              <p className="tiny-label text-gold-dim m-0">STEP 06 // NEURAL_TRANSCRIPT_INGESTION</p>
            </div>
          </div>
          <div className="status-indicator d-flex align-items-center gap-2 px-3 py-1 rounded-pill">
            <div className="pulse-emerald"></div>
            <span className="tiny-label text-gold">AWAITING INPUT...</span>
          </div>
        </div>

        <Card.Body className="p-4 p-md-5">
          <Form onSubmit={(e) => { e.preventDefault(); if(textLength >= 15) onSubmit(); }}>
            <Row className="justify-content-center">
              <Col lg={10}>
                
                {/* INSTRUCTIONAL BLOCK */}
                <motion.div variants={itemVariants} className="text-center mb-5">
                  <h1 className="manifestation-title mb-3">
                    Transmit Your <span className="text-gold">Neural Resonance</span>
                  </h1>
                  <p className="text-gold-dim mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '15px', lineHeight: '1.6' }}>
                    Describe your physiological and psychological manifestations with maximum precision. 
                    Our AI core will synchronize this transcript with your biological metrics for the final mapping.
                  </p>
                </motion.div>

                {/* NEURAL TRANSCRIPT VIEWPORT */}
                <motion.div variants={itemVariants} className={`transcript-viewport ${isFocused ? 'focused' : ''}`}>
                  <div className="viewport-glow"></div>
                  
                  <InputGroup className="h-100">
                    <InputGroup.Text className="bg-transparent border-0 align-items-start pt-4 ps-4">
                      <MessageCircle size={24} className={isFocused ? 'text-gold' : 'text-gold-dim'} />
                    </InputGroup.Text>
                    <Form.Control 
                      as="textarea"
                      placeholder="e.g., Systemic exhaustion detected after 08:00 sleep cycles. Focus amplitude is diminishing during high-load professional tasks..."
                      className="neural-transcript-area ps-2"
                      value={formData.userProblem || ''}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={(e) => handleChange('userProblem', e.target.value)}
                    />
                  </InputGroup>

                  {/* PROTOCOL METRICS BAR */}
                  <div className="protocol-metrics-bar d-flex justify-content-between align-items-center px-4 py-3 border-top border-white border-opacity-5">
                    <div className="d-flex align-items-center gap-2">
                       <Activity size={14} className={textLength < 15 ? 'text-danger' : 'text-emerald'} />
                       <span className={`tiny-label ${textLength < 15 ? 'text-danger' : 'text-emerald'}`}>
                         {textLength < 15 ? 'INSUFFICIENT_INPUT_DENSITY' : 'DATA_DENSITY_OPTIMAL'}
                       </span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                       <div className="metric-tag d-flex align-items-center gap-2">
                          <span className="tiny-label text-gold-dim">RESOLUTION:</span>
                          <span className="tiny-label text-gold fw-bold">{Math.min(100, Math.floor((textLength/50) * 100))}%</span>
                       </div>
                       <div className="metric-tag d-flex align-items-center gap-2">
                          <span className="tiny-label text-gold-dim">LENGTH:</span>
                          <span className="tiny-label text-gold fw-bold">{textLength} CHARS</span>
                       </div>
                    </div>
                  </div>
                </motion.div>

                {/* AI COMPLIANCE INDICATOR */}
                <motion.div variants={itemVariants} className="compliance-box d-flex align-items-center gap-3 p-3 mt-5">
                   <ShieldCheck className="text-emerald" size={20} />
                   <p className="m-0 tiny-label text-gold-dim fw-bold">
                     DECRYPTION_NOTICE: THIS IS AN <span className="text-gold">AI-BASED AWARENESS SYSTEM</span>. DATA TRANSMISSION DOES NOT CONSTITUTE MEDICAL OR PSYCHOLOGICAL TREATMENT.
                   </p>
                </motion.div>

                {/* ACTION TRIGGER BARS */}
                <motion.div variants={itemVariants} className="d-flex gap-4 mt-5">
                  <Button 
                    variant="none" 
                    className="px-4 py-3 protocol-btn btn-neural-locked flex-shrink-0"
                    onClick={onBack}
                  >
                    <ChevronLeft size={18} className="me-2" /> DISCARD & BACK
                  </Button>
                  <Button 
                    variant="none" 
                    className={`flex-grow-1 py-3 protocol-btn ${textLength >= 15 ? 'btn-gold-shimmer' : 'btn-neural-locked'}`}
                    onClick={onSubmit}
                    disabled={!formData.userProblem || textLength < 15}
                  >
                    {textLength >= 15 ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        TRANSMIT TO NEURAL CORE <Send size={18} />
                      </span>
                    ) : (
                      <span className="opacity-50">AWAITING SUFFICIENT_DETAIL...</span>
                    )}
                  </Button>
                </motion.div>

              </Col>
            </Row>
          </Form>
        </Card.Body>
      </motion.div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@800;900&display=swap');

        .neural-slide-container {
          font-family: 'Inter', sans-serif;
          max-width: 1150px;
        }

        .neural-slide-card {
          background: rgba(40, 65, 60, 0.85);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
        }

        .protocol-header {
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 2px solid rgba(255, 255, 255, 0.05);
          padding: 24px 40px;
        }

        .protocol-title {
          font-family: 'Outfit', sans-serif;
          color: #fff;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .protocol-icon-shimmer {
          background: rgba(201, 166, 107, 0.1);
          padding: 12px;
          border-radius: 12px;
          border: 1px solid rgba(201, 166, 107, 0.2);
          animation: glow 3s infinite;
        }

        @keyframes glow { 0%, 100% { box-shadow: 0 0 10px rgba(201, 166, 107, 0.1); } 50% { box-shadow: 0 0 25px rgba(201, 166, 107, 0.3); } }

        .manifestation-title {
          font-family: 'Outfit', sans-serif;
          color: #fff;
          font-weight: 900;
          font-size: 2.8rem;
          letter-spacing: -1px;
        }

        .transcript-viewport {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          min-height: 300px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.1);
        }

        .transcript-viewport.focused {
          border-color: #c9a66b;
          box-shadow: 0 0 40px rgba(201, 166, 107, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.2);
          transform: translateY(-5px);
        }

        .viewport-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(201, 166, 107, 0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .neural-transcript-area {
          background: transparent !important;
          border: none !important;
          color: #fff !important;
          font-size: 1.1rem !important;
          line-height: 1.6 !important;
          font-weight: 500 !important;
          padding: 24px !important;
          min-height: 220px !important;
          resize: none !important;
          box-shadow: none !important;
        }

        .neural-transcript-area::placeholder {
          color: rgba(255, 255, 255, 0.2) !important;
        }

        .protocol-metrics-bar {
          background: rgba(255, 255, 255, 0.02);
        }

        .metric-tag {
          background: rgba(255, 255, 255, 0.03);
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .compliance-box {
          background: rgba(13, 33, 32, 0.5);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .protocol-btn {
          border-radius: 18px !important;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          letter-spacing: 1px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .btn-gold-shimmer {
          background: linear-gradient(135deg, #c9a66b 0%, #a6854d 100%) !important;
          color: #0d2120 !important;
          box-shadow: 0 15px 35px rgba(201, 166, 107, 0.2) !important;
        }

        .btn-neural-locked {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: rgba(255, 255, 255, 0.4) !important;
        }

        .tiny-label { font-size: 10px; font-weight: 800; letter-spacing: 1px; }
        .text-gold { color: #c9a66b !important; }
        .text-gold-dim { color: rgba(201, 166, 107, 0.6) !important; }
        .text-emerald { color: #1abc9c !important; }

        .pulse-emerald {
          width: 8px; height: 8px; background: #1abc9c; border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

        @media (max-width: 991px) {
          .manifestation-title { font-size: 2rem; }
        }
      `}</style>
    </Container>
  );
};

export default ProblemDescriptionSlide;