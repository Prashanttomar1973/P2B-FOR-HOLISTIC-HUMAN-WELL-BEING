import React from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Compass, Eye, Brain, PenTool, Scale, HelpCircle, ShieldCheck, Zap, ChevronRight, ChevronLeft, Target } from 'lucide-react';

const PhilosophySlide = ({ formData, handleChange, onNext, onBack }) => {

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
              <Compass size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="m-0 protocol-title">Existential Matrix Mapping</h4>
              <p className="tiny-label text-gold-dim m-0">STEP 05 // PHILOSOPHICAL_METRICS_SYNC</p>
            </div>
          </div>
          <div className="status-indicator d-flex align-items-center gap-2 px-3 py-1 rounded-pill">
            <div className="pulse-emerald"></div>
            <span className="tiny-label text-gold">MAPPING ARCHETYPES...</span>
          </div>
        </div>

        <Card.Body className="p-0">
          <Form onSubmit={(e) => { e.preventDefault(); if(formData.lifeView) onNext(); }}>
            <Row className="g-0">
              
              {/* LEFT COLUMN: PERSPECTIVE & VALUE ARCHETYPES */}
              <Col lg={5} className="identity-pane p-4 p-md-5">
                <motion.div variants={itemVariants} className="mb-5">
                  <SectionHeader icon={Eye} title="PERSPECTIVE & WORLDVIEW" />
                  
                  <Row className="g-4 mb-4">
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Universal Life Perspective</Form.Label>
                        <div className="input-with-icon">
                          <Eye size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.lifeView || ''} onChange={(e) => handleChange('lifeView', e.target.value)}>
                            <option value="">Select Archetype...</option>
                            <option value="Stoic">Stoic (Internal Resilience)</option>
                            <option value="Growth">Growth-Oriented (Evolutionary)</option>
                            <option value="Pragmatic">Pragmatic (Action-Based)</option>
                            <option value="Nihilistic">Nihilistic (Null Baseline)</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Futuristic Temporal Outlook</Form.Label>
                        <div className="input-with-icon">
                          <Compass size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.futureOutlook || ''} onChange={(e) => handleChange('futureOutlook', e.target.value)}>
                            <option value="">Select Outlook...</option>
                            <option value="Optimistic">Optimistic Amplitude</option>
                            <option value="Cautious">Cautious Stability</option>
                            <option value="Uncertain">Uncertain / Fluctuating</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <SectionHeader icon={Target} title="MEANING & VALUES" />
                  <Row className="g-4 mb-4">
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Purpose Localization</Form.Label>
                        <div className="input-with-icon">
                          <Target size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.hasPurpose || ''} onChange={(e) => handleChange('hasPurpose', e.target.value)}>
                            <option value="">Select State...</option>
                            <option value="Yes">Identified & Clear</option>
                            <option value="In Progress">Neural Evolution / In Progress</option>
                            <option value="Searching">Searching / Vague</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Core Ethical Value</Form.Label>
                        <div className="input-with-icon">
                          <Scale size={16} className="input-icon" />
                          <Form.Control 
                            className="neural-input-v2" 
                            placeholder="Primary Value (e.g., Integrity)" 
                            value={formData.values || ''} 
                            onChange={(e) => handleChange('values', e.target.value)} 
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </motion.div>
              </Col>

              {/* RIGHT COLUMN: COGNITIVE INTEGRITY & CONCERNS */}
              <Col lg={7} className="context-pane p-4 p-md-5">
                <motion.div variants={itemVariants} className="mb-5">
                  <SectionHeader icon={Zap} title="RESPONSIBILITY & CONTROL" />
                  
                  <Row className="g-4">
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Locus of Control</Form.Label>
                        <div className="input-with-icon">
                          <Zap size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.controlBelief || ''} onChange={(e) => handleChange('controlBelief', e.target.value)}>
                            <option value="">Select Locus...</option>
                            <option value="Internal">Internal (Agency)</option>
                            <option value="External">External (Luck/Fate)</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Decision Synthesis Style</Form.Label>
                        <div className="input-with-icon">
                          <Brain size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.decisionStyle || ''} onChange={(e) => handleChange('decisionStyle', e.target.value)}>
                            <option value="">Select Style...</option>
                            <option value="Intuitive">Intuitive / Fluid</option>
                            <option value="Logical">Logical / Analytical</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-5">
                  <SectionHeader icon={HelpCircle} title="EXISTENTIAL CONCERNS SCAN" />
                  <div className="d-flex flex-wrap gap-2">
                    {['Meaninglessness', 'Fear of failure', 'Uncertainty', 'Identity confusion'].map((concern) => (
                      <div 
                        key={concern}
                        className={`neural-node-selector ${formData.existentialConcern === concern ? 'active' : ''}`}
                        onClick={() => handleChange('existentialConcern', concern)}
                      >
                        <div className="dot-dim me-2"></div>
                        {concern}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-5">
                   <SectionHeader icon={PenTool} title="INTEGRATION SYNTHESIS" />
                   <p className="tiny-label text-gold-dim mb-3">SELECT AREA OF MAXIMUM COGNITIVE DISSONANCE:</p>
                   <div className="d-flex flex-wrap gap-2">
                      {['Lifedirection', 'Emotions', 'Health', 'Decisions'].map(area => (
                        <Button 
                          key={area}
                          variant="none" 
                          className={`protocol-btn px-4 py-2 ${formData.confusionArea === area ? 'btn-gold-shimmer' : 'btn-neural-locked'}`}
                          style={{ fontSize: '12px' }}
                          onClick={() => handleChange('confusionArea', area)}
                        >
                          {area.toUpperCase()}
                        </Button>
                      ))}
                   </div>
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
                    className={`flex-grow-1 py-3 protocol-btn ${formData.lifeView ? 'btn-gold-shimmer' : 'btn-neural-locked'}`}
                    onClick={onNext}
                    disabled={!formData.lifeView}
                  >
                    {formData.lifeView ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                         REVIEW & MAP MY BIOLOGY <ChevronRight size={18} />
                      </span>
                    ) : (
                      <span className="opacity-50">AWAITING EXISTENTIAL_IDENTITY...</span>
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

        .neural-node-selector {
           background: rgba(255, 255, 255, 0.03);
           border: 1px solid rgba(255, 255, 255, 0.08);
           padding: 12px 20px;
           border-radius: 14px;
           font-size: 12px;
           font-weight: 600;
           color: rgba(255, 255, 255, 0.6);
           cursor: pointer;
           display: flex;
           align-items: center;
           transition: all 0.3s ease;
        }

        .neural-node-selector:hover {
           background: rgba(255, 255, 255, 0.06);
           border-color: rgba(255, 255, 255, 0.15);
           color: #fff;
        }

        .neural-node-selector.active {
           background: rgba(201, 166, 107, 0.15);
           border-color: rgba(201, 166, 107, 0.4);
           color: #fff;
           box-shadow: 0 0 20px rgba(201, 166, 107, 0.1);
        }

        .dot-dim { width: 6px; height: 6px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; }

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

export default PhilosophySlide;