import React from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Activity, Moon, Monitor, Utensils, Briefcase, Coffee, Sun, ShieldCheck, Zap, ChevronRight, ChevronLeft, Clock, ZapOff } from 'lucide-react';

const LifestyleSlide = ({ formData, handleChange, onNext, onBack }) => {

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
              <Zap size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="m-0 protocol-title">Lifestyle Matrix Mapping</h4>
              <p className="tiny-label text-gold-dim m-0">STEP 02 // HABITUAL_SYSTEM_ANALYSIS</p>
            </div>
          </div>
          <div className="status-indicator d-flex align-items-center gap-2 px-3 py-1 rounded-pill">
            <div className="pulse-emerald"></div>
            <span className="tiny-label text-gold">MAPPING...</span>
          </div>
        </div>

        <Card.Body className="p-0">
          <Form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            <Row className="g-0">
              
              {/* LEFT COLUMN: PHYSICAL & REST METRICS */}
              <Col lg={5} className="identity-pane p-4 p-md-5">
                <motion.div variants={itemVariants} className="mb-5">
                  <SectionHeader icon={Activity} title="PHYSICAL & REST PARAMETERS" />
                  
                  <Row className="g-4 mb-4">
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Daily Physical Activity</Form.Label>
                        <div className="input-with-icon">
                          <Activity size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.activityLevel || ''} onChange={(e) => handleChange('activityLevel', e.target.value)}>
                            <option value="">Select Activity Level...</option>
                            <option value="Sedentary">Sedentary (Low Flux)</option>
                            <option value="Light">Light Movement</option>
                            <option value="Active">Active (High Flux)</option>
                            <option value="Athlete">Maximum Velocity</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Restoration Frequency (Exercise)</Form.Label>
                        <div className="input-with-icon">
                          <Zap size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.exerciseFreq || ''} onChange={(e) => handleChange('exerciseFreq', e.target.value)}>
                            <option value="">Select Frequency...</option>
                            <option value="Rare">Rarely (Idle)</option>
                            <option value="1-2days">1-2 units/week</option>
                            <option value="3-4days">3-4 units/week</option>
                            <option value="Daily">Daily Calibration</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="g-4">
                    <Col md={12}>
                       <Form.Group className="node-group">
                        <Form.Label className="node-label">Avg Sleep Duration</Form.Label>
                        <div className="input-with-icon">
                          <Moon size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.sleepHours || ''} onChange={(e) => handleChange('sleepHours', e.target.value)}>
                            <option value="">Select Duration...</option>
                            <option value="<6">Under 6 Hours</option>
                            <option value="6-7">6-7 Hours</option>
                            <option value="7-8">7-8 Hours</option>
                            <option value="9+">9+ Hours</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                       <Form.Group className="node-group">
                        <Form.Label className="node-label">Sleep Quality Rating</Form.Label>
                        <div className="input-with-icon">
                          <ShieldCheck size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.sleepQuality || ''} onChange={(e) => handleChange('sleepQuality', e.target.value)}>
                            <option value="">Select Quality...</option>
                            <option value="Restful">Optimal Restoration</option>
                            <option value="Interrupted">Interrupted Pulse</option>
                            <option value="Poor">Fragmented / Low-Quality</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-4">
                  <Form.Group className="node-group">
                    <Form.Label className="node-label">Digital Exposure (Screen Time)</Form.Label>
                    <div className="input-with-icon">
                      <Monitor size={16} className="input-icon" />
                      <Form.Control 
                        type="number"
                        placeholder="Avg Hours/Day"
                        className="neural-input-v2"
                        value={formData.screenTime || ''} 
                        onChange={(e) => handleChange('screenTime', e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </motion.div>
              </Col>

              {/* RIGHT COLUMN: ROUTINE & CONSUMPTION */}
              <Col lg={7} className="context-pane p-4 p-md-5">
                <motion.div variants={itemVariants} className="mb-5">
                  <SectionHeader icon={Utensils} title="ROUTINE & CONSUMPTION NODES" />
                  
                  <Row className="g-4">
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Nutritional Regularity</Form.Label>
                        <div className="input-with-icon">
                          <Clock size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.mealTiming || ''} onChange={(e) => handleChange('mealTiming', e.target.value)}>
                            <option value="">Select Timing...</option>
                            <option value="Fixed">Rigid / Periodic</option>
                            <option value="Random">Stochastic / Random</option>
                            <option value="IF">Intermittent Fasting</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Dietary Composition</Form.Label>
                        <div className="input-with-icon">
                          <Utensils size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.dietType || ''} onChange={(e) => handleChange('dietType', e.target.value)}>
                            <option value="">Select Diet...</option>
                            <option value="Veg">Pure Vegetarian</option>
                            <option value="Vegan">Vegan (Zero-Animal)</option>
                            <option value="Mixed">Mixed / Omnivorous</option>
                            <option value="Keto">Ketogenic / High-Fat</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Professional Load</Form.Label>
                        <div className="input-with-icon">
                          <Briefcase size={16} className="input-icon" />
                          <Form.Control 
                            type="number"
                            placeholder="Work Hours/Day"
                            className="neural-input-v2"
                            value={formData.workHours || ''} 
                            onChange={(e) => handleChange('workHours', e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Neural Stimulants (Caffeine)</Form.Label>
                        <div className="input-with-icon">
                          <Coffee size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.caffeine || ''} onChange={(e) => handleChange('caffeine', e.target.value)}>
                            <option value="">Select Consumption...</option>
                            <option value="None">Zero Consumption</option>
                            <option value="Low">1-2 Servings/Day</option>
                            <option value="High">3+ Servings/Day</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-5">
                   <SectionHeader icon={Sun} title="RECOVERY & SOCIAL RESONANCE" />
                   <Row className="g-4">
                      <Col md={6}>
                        <Form.Group className="node-group">
                          <Form.Label className="node-label">Social Frequency</Form.Label>
                          <div className="input-with-icon">
                            <Sun size={16} className="input-icon" />
                            <Form.Select className="neural-select-v2" value={formData.socialLife || ''} onChange={(e) => handleChange('socialLife', e.target.value)}>
                              <option value="">Select Frequency...</option>
                              <option value="High">Hyper-Social</option>
                              <option value="Moderate">Balanced Social</option>
                              <option value="Low">Selective / Low-Frequency</option>
                            </Form.Select>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="node-group">
                          <Form.Label className="node-label">Recovery Preference</Form.Label>
                          <div className="input-with-icon">
                            <Moon size={16} className="input-icon" />
                            <Form.Select className="neural-select-v2" value={formData.aloneTime || ''} onChange={(e) => handleChange('aloneTime', e.target.value)}>
                              <option value="">Select Preference...</option>
                              <option value="NeedMore">Requires More Isolation</option>
                              <option value="Satisfied">Satisfied / Optimal</option>
                              <option value="Interactive">Requires Interaction</option>
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
                    className="flex-grow-1 py-3 protocol-btn btn-gold-shimmer"
                    onClick={onNext}
                  >
                    CONTINUE TO BIOLOGICAL MAPPING <ChevronRight size={18} className="ms-2" />
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

export default LifestyleSlide;