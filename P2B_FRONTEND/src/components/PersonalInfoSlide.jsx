import React from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { User, GraduationCap, MapPin, Globe, MessageSquare, Target, Zap, Shield, Sparkles, ChevronRight, Calendar, UserCheck, Activity } from 'lucide-react';

const PersonalInfoSlide = ({ formData, handleChange, onNext }) => {
  
  // Logical Truth: UI should only proceed if core identity is filled
  const isFormValid = formData.fullName && formData.ageRange && formData.consent;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <Container className="neural-slide-container py-3">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="neural-slide-card"
      >
        {/* TOP PROTOCOL HEADER */}
        <div className="protocol-header d-flex justify-content-between align-items-center mb-1">
          <div className="d-flex align-items-center gap-3">
            <div className="protocol-icon-shimmer">
              <Zap size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="m-0 protocol-title">Neural Ingestion Protocol</h4>
              <p className="tiny-label text-gold-dim m-0">STEP 01 // IDENTITY_MATRIX_INITIALIZATION</p>
            </div>
          </div>
          <div className="status-indicator d-flex align-items-center gap-2 px-3 py-1 rounded-pill">
            <div className="pulse-emerald"></div>
            <span className="tiny-label text-gold">UPLOADING...</span>
          </div>
        </div>

        <Card.Body className="p-0">
          <Form onSubmit={(e) => { e.preventDefault(); if(isFormValid) onNext(); }}>
            <Row className="g-0">
              
              {/* LEFT COLUMN: CORE IDENTITY SCAN */}
              <Col lg={4} className="identity-pane p-4 p-md-5">
                <motion.div variants={itemVariants} className="mb-5">
                  <div className="section-divider mb-4">
                     <User size={18} className="text-gold me-2" />
                     <span>CORE IDENTITY</span>
                  </div>
                  
                  <Form.Group className="mb-4 node-group">
                    <Form.Label className="node-label">Registered Identity</Form.Label>
                    <div className="input-with-icon">
                      <UserCheck size={16} className="input-icon" />
                      <Form.Control 
                        type="text"
                        placeholder="Name / Nickname"
                        className="neural-input-v2"
                        value={formData.fullName || ''} 
                        onChange={(e) => handleChange('fullName', e.target.value)}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4 node-group">
                    <Form.Label className="node-label">Age Range Profile</Form.Label>
                    <div className="input-with-icon">
                      <Calendar size={16} className="input-icon" />
                      <Form.Select 
                        className="neural-select-v2" 
                        value={formData.ageRange || ''} 
                        onChange={(e) => handleChange('ageRange', e.target.value)}
                      >
                        <option value="">Select threshold...</option>
                        <option value="18-25">18-25 Years</option>
                        <option value="26-35">26-35 Years</option>
                        <option value="36-50">36-50 Years</option>
                        <option value="50+">50+ Years</option>
                      </Form.Select>
                    </div>
                  </Form.Group>

                  <Form.Group className="node-group">
                    <Form.Label className="node-label">Interface Language</Form.Label>
                    <div className="input-with-icon">
                      <Globe size={16} className="input-icon" />
                      <Form.Select 
                        className="neural-select-v2" 
                        value={formData.language || ''} 
                        onChange={(e) => handleChange('language', e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="English">English (Global)</option>
                        <option value="Hinglish">Hinglish (Hybrid)</option>
                        <option value="Hindi">Hindi (Vernacular)</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                </motion.div>

                <motion.div variants={itemVariants} className="identity-sync-status">
                   <div className="p-3 rounded-4 bg-gold bg-opacity-5 border border-gold border-opacity-10">
                      <p className="m-0 tiny-label text-gold-dim italic line-height-base">
                        Your core parameters establish the architectural foundation for subsequent lifestyle and psychology mapping.
                      </p>
                   </div>
                </motion.div>
              </Col>

              {/* RIGHT COLUMN: ENVIRONMENTAL CONTEXT */}
              <Col lg={8} className="context-pane p-4 p-md-5">
                <motion.div variants={itemVariants} className="mb-4">
                  <div className="section-divider mb-4">
                     <Target size={18} className="text-gold me-2" />
                     <span>CONTEXTUAL MAPPING</span>
                  </div>
                  
                  <Row className="g-4">
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Professional Status</Form.Label>
                        <div className="input-with-icon">
                          <GraduationCap size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.role || ''} onChange={(e) => handleChange('role', e.target.value)}>
                            <option value="">Select Role...</option>
                            <option value="Student">Academic Path</option>
                            <option value="Professional">Corporate/Specialist</option>
                            <option value="Entrepreneur">Strategic Owner</option>
                            <option value="Other">Custom Path</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Operational Domain</Form.Label>
                        <div className="input-with-icon">
                          <Target size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.domain || ''} onChange={(e) => handleChange('domain', e.target.value)}>
                            <option value="">Select Domain...</option>
                            <option value="Tech">Technology & Code</option>
                            <option value="Arts">Arts & Creative</option>
                            <option value="Science">Science & Bio</option>
                            <option value="Business">Business & Finance</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Living Environment</Form.Label>
                        <div className="input-with-icon">
                          <MapPin size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.livingSetup || ''} onChange={(e) => handleChange('livingSetup', e.target.value)}>
                            <option value="">Select Environment...</option>
                            <option value="Urban">Urban Hyper-Density</option>
                            <option value="Suburban">Balanced Suburban</option>
                            <option value="Rural">Rural/Nature-Centric</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Routine Delta</Form.Label>
                        <div className="input-with-icon">
                          <Activity size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.routineType || ''} onChange={(e) => handleChange('routineType', e.target.value)}>
                            <option value="">Select Type...</option>
                            <option value="Fixed">Rigid/Fixed</option>
                            <option value="Flexible">Dynamic/Fluid</option>
                            <option value="Chaos">Unstructured</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </motion.div>

                <Row className="g-4 mb-5">
                   <Col md={6}>
                      <motion.div variants={itemVariants} className="node-group">
                        <Form.Label className="node-label">Regional Resonance</Form.Label>
                        <div className="input-with-icon">
                          <Globe size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.region || ''} onChange={(e) => handleChange('region', e.target.value)}>
                            <option value="">Select Region...</option>
                            <option value="Asia">Asia Pacific</option>
                            <option value="Europe">European Hubs</option>
                            <option value="Americas">Pan-Americas</option>
                            <option value="Other">Global Other</option>
                          </Form.Select>
                        </div>
                      </motion.div>
                   </Col>
                   <Col md={6}>
                      <motion.div variants={itemVariants} className="node-group">
                        <Form.Label className="node-label">Session Expectation</Form.Label>
                        <div className="input-with-icon">
                          <MessageSquare size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.expectation || ''} onChange={(e) => handleChange('expectation', e.target.value)}>
                            <option value="">Primary Goal...</option>
                            <option value="Clarity">Absoute Clarity</option>
                            <option value="Growth">Exponential Growth</option>
                            <option value="Healing">Systemic Healing</option>
                            <option value="Perspective">Fresh Perspective</option>
                          </Form.Select>
                        </div>
                      </motion.div>
                   </Col>
                </Row>

                {/* CONSENT SHIELD */}
                <motion.div variants={itemVariants} className="consent-shield-pane p-4 rounded-4 mb-4">
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center justify-content-center p2b-custom-check-container">
                      <Form.Check 
                        type="checkbox" 
                        id="consent-check"
                        checked={formData.consent || false}
                        onChange={(e) => handleChange('consent', e.target.checked)}
                        className="p2b-neural-check"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <label htmlFor="consent-check" className="m-0 small text-white fw-bold cursor-pointer">
                        AUTHORIZE NEURAL INGESTION
                      </label>
                      <p className="tiny-label text-gold-dim m-0 opacity-75">I acknowledge P2B as an awareness diagnostic, not a clinical treatment proxy.</p>
                    </div>
                    <Shield size={24} className={`text-gold ${formData.consent ? 'opacity-100' : 'opacity-20'} transition-all`} />
                  </div>
                </motion.div>

                {/* TRIGGER ACTION */}
                <motion.div variants={itemVariants}>
                  <Button 
                    variant="none" 
                    className={`w-100 py-3 protocol-btn ${isFormValid ? 'btn-gold-shimmer' : 'btn-neural-locked'}`}
                    onClick={onNext}
                    disabled={!isFormValid}
                  >
                    {isFormValid ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        INITIALIZE FULL ANALYSIS <ChevronRight size={18} />
                      </span>
                    ) : (
                      <span className="opacity-50">AWAITING IDENTITY_VALIDATION...</span>
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
          max-width: 1100px;
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

        .identity-pane {
          background: rgba(0, 0, 0, 0.2);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .section-divider {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.4);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .node-label {
          font-size: 10px;
          font-weight: 800;
          color: #c9a66b;
          text-transform: uppercase;
          margin-bottom: 12px;
          letter-spacing: 1px;
          display: block;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(201, 166, 107, 0.4);
          z-index: 5;
        }

        .neural-input-v2, .neural-select-v2 {
          background: rgba(13, 33, 32, 0.8) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 16px !important;
          color: #fff !important;
          padding: 16px 20px 16px 48px !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          transition: all 0.3s ease !important;
        }

        .neural-input-v2:focus, .neural-select-v2:focus {
          border-color: #c9a66b !important;
          box-shadow: 0 0 20px rgba(201, 166, 107, 0.1) !important;
          transform: translateY(-2px);
        }

        .consent-shield-pane {
          background: rgba(201, 166, 107, 0.05);
          border: 1px solid rgba(201, 166, 107, 0.1);
        }

        .p2b-neural-check {
          transform: scale(1.6);
          cursor: pointer;
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
          color: rgba(255, 255, 255, 0.2) !important;
        }

        .tiny-label { font-size: 10px; font-weight: 800; letter-spacing: 1px; }
        .text-gold { color: #c9a66b !important; }
        .text-gold-dim { color: rgba(201, 166, 107, 0.6) !important; }

        .line-height-base { line-height: 1.6; }

        .pulse-emerald {
          width: 8px; height: 8px; background: #1abc9c; border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

        .transition-all { transition: all 0.3s ease; }
        .cursor-pointer { cursor: pointer; }

        @media (max-width: 991px) {
          .identity-pane { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        }
      `}</style>
    </Container>
  );
};

export default PersonalInfoSlide;