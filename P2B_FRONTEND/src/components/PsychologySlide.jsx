import React from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Heart, Brain, Zap, Target, Users, History, ShieldCheck, Smile, ChevronRight, ChevronLeft, Activity, MessageCircle } from 'lucide-react';

const PsychologySlide = ({ formData, handleChange, onNext, onBack }) => {

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="section-divider mb-4">
      <Icon size={18} className="text-gold me-2" />
      <span>{title}</span>
    </div>
  );

  return (
    <Container className="neural-slide-container py-3">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="neural-slide-card"
      >
        {/* TOP PROTOCOL HEADER */}
        <div className="protocol-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="protocol-icon-shimmer">
              <Brain size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="m-0 protocol-title">Cognitive & Emotional Mapping</h4>
              <p className="tiny-label text-gold-dim m-0">STEP 04 // PSYCHOLOGICAL_STATE_SYNC</p>
            </div>
          </div>
          <div className="status-indicator d-flex align-items-center gap-2 px-3 py-1 rounded-pill">
            <div className="pulse-emerald"></div>
            <span className="tiny-label text-gold">ANALYZING PSYCHE...</span>
          </div>
        </div>

        <Card.Body className="p-0">
          <Form onSubmit={(e) => { e.preventDefault(); if(formData.recentFeeling) onNext(); }}>
            <Row className="g-0">
              
              {/* LEFT COLUMN: EMOTIONAL STATE SCAN */}
              <Col lg={5} className="identity-pane p-4 p-md-5">
                <motion.div variants={itemVariants} className="mb-5">
                  <SectionHeader icon={Smile} title="EMOTIONAL CORE SCAN" />
                  
                  <Row className="g-4 mb-4">
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Universal Recent Feeling</Form.Label>
                        <div className="input-with-icon">
                          <Smile size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.recentFeeling || ''} onChange={(e) => handleChange('recentFeeling', e.target.value)}>
                            <option value="">Select Primary Feeling...</option>
                            <option value="Calm">Calm (Baseline Homeostasis)</option>
                            <option value="Anxious">Anxious (Hyper-Neural Activity)</option>
                            <option value="Overwhelmed">Overwhelmed (Systemic Saturation)</option>
                            <option value="Neutral">Neutral Balance</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Emotional Intensity Profile</Form.Label>
                        <div className="input-with-icon">
                          <Activity size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.emotionalIntensity || ''} onChange={(e) => handleChange('emotionalIntensity', e.target.value)}>
                            <option value="">Select Level...</option>
                            <option value="Low">Low Gradient</option>
                            <option value="Moderate">Moderate Spectrum</option>
                            <option value="High">High Amplitude</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <SectionHeader icon={Zap} title="STRESS & STABILITY" />
                  <Row className="g-4 mb-4">
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Daily Stress Amplitude</Form.Label>
                        <div className="input-with-icon">
                          <Zap size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.dailyStress || ''} onChange={(e) => handleChange('dailyStress', e.target.value)}>
                            <option value="">Scale Impact...</option>
                            <option value="Low">Low (1-3 Units)</option>
                            <option value="Med">Moderate (4-7 Units)</option>
                            <option value="High">Maximum (8-10 Units)</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Structural Mood Stability</Form.Label>
                        <div className="input-with-icon">
                          <Heart size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.moodStability || ''} onChange={(e) => handleChange('moodStability', e.target.value)}>
                            <option value="">Select Stability...</option>
                            <option value="Stable">Linear / Predictable</option>
                            <option value="Volatile">Non-Linear / Fluctuating</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </motion.div>
              </Col>

              {/* RIGHT COLUMN: PSYCHOLOGICAL ARCHITECTURE */}
              <Col lg={7} className="context-pane p-4 p-md-5">
                <motion.div variants={itemVariants} className="mb-5">
                  <SectionHeader icon={ShieldCheck} title="BEHAVIORAL & COPING ARCHITECTURE" />
                  
                  <Row className="g-4">
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Primary Coping Protocol</Form.Label>
                        <div className="input-with-icon">
                          <Target size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.copingMech || ''} onChange={(e) => handleChange('copingMech', e.target.value)}>
                            <option value="">Select Strategy...</option>
                            <option value="Isolation">Isolation (Reflective)</option>
                            <option value="Socializing">Socialization (Interactive)</option>
                            <option value="Action">Action-Oriented Solve</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Acute Pressure Reaction</Form.Label>
                        <div className="input-with-icon">
                          <Zap size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.pressureReaction || ''} onChange={(e) => handleChange('pressureReaction', e.target.value)}>
                            <option value="">Select Reaction...</option>
                            <option value="Freeze">System Inhibition (Freeze)</option>
                            <option value="Fight">Defensive Action (Fight)</option>
                            <option value="Analyze">Over-Analysis Loop</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Motivation Amplitude</Form.Label>
                        <div className="input-with-icon">
                          <Target size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.motivation || ''} onChange={(e) => handleChange('motivation', e.target.value)}>
                            <option value="">Select Drive...</option>
                            <option value="High">Optimal Amplitude</option>
                            <option value="Low">Low / Saturation Burnout</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Sense of Existential Purpose</Form.Label>
                        <div className="input-with-icon">
                          <Brain size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.purpose || ''} onChange={(e) => handleChange('purpose', e.target.value)}>
                            <option value="">Select Purpose State...</option>
                            <option value="Strong">Strong / Identified</option>
                            <option value="Searching">Seeking / Evolutionary</option>
                            <option value="Vague">Unidentified / Null</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-5">
                   <SectionHeader icon={Users} title="SOCIAL RESONANCE & SUPPORT" />
                   <Row className="g-4">
                      <Col md={6}>
                        <Form.Group className="node-group">
                          <Form.Label className="node-label">Emotional Support Status</Form.Label>
                          <div className="input-with-icon">
                            <Users size={16} className="input-icon" />
                            <Form.Select className="neural-select-v2" value={formData.supported || ''} onChange={(e) => handleChange('supported', e.target.value)}>
                              <option value="">Select Status...</option>
                              <option value="Yes">Supported (Active)</option>
                              <option value="No">Isolated (Null)</option>
                            </Form.Select>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="node-group">
                          <Form.Label className="node-label">Consultation History</Form.Label>
                          <div className="input-with-icon">
                            <History size={16} className="input-icon" />
                            <Form.Select className="neural-select-v2" value={formData.pastConsultation || ''} onChange={(e) => handleChange('pastConsultation', e.target.value)}>
                              <option value="">Select Archive...</option>
                              <option value="Never">Never (Baseline)</option>
                              <option value="Previously">Previous Cycles</option>
                              <option value="Currently">Active Cycle</option>
                            </Form.Select>
                          </div>
                        </Form.Group>
                      </Col>
                   </Row>
                </motion.div>

                {/* NAVIGATION ACTIONS */}
                <motion.div variants={itemVariants} className="d-flex gap-4">
                  <Button 
                    variant="none" 
                    className="flex-shrink-0 px-4 py-3 protocol-btn btn-neural-locked"
                    onClick={onBack}
                  >
                    <ChevronLeft size={18} className="me-2" /> BACK
                  </Button>
                  <Button 
                    variant="none" 
                    className={`flex-grow-1 py-3 protocol-btn ${formData.recentFeeling ? 'btn-gold-shimmer' : 'btn-neural-locked'}`}
                    onClick={onNext}
                    disabled={!formData.recentFeeling}
                  >
                    {formData.recentFeeling ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                         CONTINUE TO PHILOSOPHICAL CONTEXT <ChevronRight size={18} />
                      </span>
                    ) : (
                      <span className="opacity-50">AWAITING COGNITIVE_IDENTITY...</span>
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

        .pulse-emerald {
          width: 8px; height: 8px; background: #1abc9c; border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

        @media (max-width: 991px) {
          .identity-pane { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        }
      `}</style>
    </Container>
  );
};

export default PsychologySlide;