import React from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Activity, Thermometer, Zap, Users, AlertTriangle, ShieldCheck, ChevronRight, ChevronLeft, Droplets, Heart, User, Wind } from 'lucide-react';

const HealthBiologySlide = ({ formData, handleChange, onNext, onBack }) => {

  // Helper to handle checkbox arrays
  const handleCheckboxChange = (field, value) => {
    const currentList = formData[field] || [];
    const newList = currentList.includes(value)
      ? currentList.filter(item => item !== value)
      : [...currentList, value];
    handleChange(field, newList);
  };

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
              <Thermometer size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="m-0 protocol-title">Biological Signal Analysis</h4>
              <p className="tiny-label text-gold-dim m-0">STEP 03 // SOMATIC_PROFILE_SCAN</p>
            </div>
          </div>
          <div className="status-indicator d-flex align-items-center gap-2 px-3 py-1 rounded-pill">
            <div className="pulse-emerald"></div>
            <span className="tiny-label text-gold">SCANNING BIOMETRICS...</span>
          </div>
        </div>

        <Card.Body className="p-0">
          <Form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            <Row className="g-0">
              
              {/* LEFT COLUMN: BIOLOGICAL CONSTANTS */}
              <Col lg={5} className="identity-pane p-4 p-md-5">
                <motion.div variants={itemVariants} className="mb-5">
                  <SectionHeader icon={User} title="BIOLOGICAL CONSTANTS" />
                  
                  <Row className="g-4 mb-4">
                    <Col xs={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Gender Profile</Form.Label>
                        <div className="input-with-icon">
                          <User size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.gender || ''} onChange={(e) => handleChange('gender', e.target.value)}>
                            <option value="">Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Custom/Other</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Age Threshold</Form.Label>
                        <div className="input-with-icon">
                          <Activity size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.ageGroup || ''} onChange={(e) => handleChange('ageGroup', e.target.value)}>
                            <option value="">Select...</option>
                            <option value="18-25">18-25</option>
                            <option value="26-40">26-40</option>
                            <option value="41-60">41-60</option>
                            <option value="60+">60+</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Height (v-scan)</Form.Label>
                        <div className="input-with-icon">
                          <Activity size={16} className="input-icon" />
                          <Form.Control 
                            className="neural-input-v2" 
                            placeholder="e.g. 175cm" 
                            value={formData.heightRange || ''} 
                            onChange={(e) => handleChange('heightRange', e.target.value)} 
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Weight (m-scan)</Form.Label>
                        <div className="input-with-icon">
                          <Activity size={16} className="input-icon" />
                          <Form.Control 
                            className="neural-input-v2" 
                            placeholder="e.g. 75kg" 
                            value={formData.weightRange || ''} 
                            onChange={(e) => handleChange('weightRange', e.target.value)} 
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <SectionHeader icon={Thermometer} title="CHRONIC LOAD & TREATMENT" />
                  <Row className="g-4 mb-4">
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Long-Term Condition Status</Form.Label>
                        <div className="input-with-icon">
                          <AlertTriangle size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.hasCondition || ''} onChange={(e) => handleChange('hasCondition', e.target.value)}>
                            <option value="">Select Status...</option>
                            <option value="None">Zero Chronic Load</option>
                            <option value="Yes">Condition Active</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Medication Dependency</Form.Label>
                        <div className="input-with-icon">
                          <Zap size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.onMedication || ''} onChange={(e) => handleChange('onMedication', e.target.value)}>
                            <option value="">Select Status...</option>
                            <option value="No">No Regular Medication</option>
                            <option value="Yes">Medication Active</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </motion.div>
              </Col>

              {/* RIGHT COLUMN: VITALITY & SYMPTOMATIC SCAN */}
              <Col lg={7} className="context-pane p-4 p-md-5">
                <motion.div variants={itemVariants} className="mb-5">
                  <SectionHeader icon={AlertTriangle} title="SYMPTOMATIC SIGNAL RADIUS" />
                  <div className="d-flex flex-wrap gap-3">
                    {['Frequent fatigue', 'Headaches', 'Digestive discomfort', 'Muscle pain', 'Low immunity'].map((symp) => (
                      <div 
                        key={symp} 
                        onClick={() => handleCheckboxChange('symptoms', symp)}
                        className={`neural-node-selector ${(formData.symptoms || []).includes(symp) ? 'active' : ''}`}
                      >
                         <span>{symp}</span>
                         {(formData.symptoms || []).includes(symp) ? <Zap size={10} className="ms-2" /> : <div className="ms-2 dot-dim"></div>}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-5">
                  <SectionHeader icon={Zap} title="VITALITY & ENERGY MATRIX" />
                  <Row className="g-4">
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Daily Vitality Level</Form.Label>
                        <div className="input-with-icon">
                          <Zap size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.energyLevel || ''} onChange={(e) => handleChange('energyLevel', e.target.value)}>
                            <option value="">Select Level...</option>
                            <option value="High">Maximum (High Flux)</option>
                            <option value="Moderate">Stable (Moderate)</option>
                            <option value="Low">Critical (Low Energy)</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="node-group">
                        <Form.Label className="node-label">Energy Stability</Form.Label>
                        <div className="input-with-icon">
                          <Activity size={16} className="input-icon" />
                          <Form.Select className="neural-select-v2" value={formData.energyConsistency || ''} onChange={(e) => handleChange('energyConsistency', e.target.value)}>
                            <option value="">Select Stability...</option>
                            <option value="Steady">Linear / Steady</option>
                            <option value="Fluctuating">Non-Linear / Fluctuating</option>
                          </Form.Select>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-5">
                   <SectionHeader icon={Users} title="GENETIC & FAMILY ARCHIVE" />
                   <div className="d-flex flex-wrap gap-3">
                      {['Heart disease', 'Mental health issues', 'Diabetes', 'Autoimmune', 'None / Not sure'].map((hist) => (
                        <div 
                          key={hist} 
                          onClick={() => handleChange('familyHistory', hist)}
                          className={`neural-node-selector ${formData.familyHistory === hist ? 'active' : ''}`}
                        >
                           <span>{hist}</span>
                           {formData.familyHistory === hist ? <Heart size={10} className="ms-2" /> : <div className="ms-2 dot-dim"></div>}
                        </div>
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
                    className="flex-grow-1 py-3 protocol-btn btn-gold-shimmer"
                    onClick={onNext}
                  >
                    CONTINUE TO PSYCHOLOGICAL CONTEXT <ChevronRight size={18} className="ms-2" />
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
          padding: 14px 20px 14px 48px !important;
          font-size: 13px !important;
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

export default HealthBiologySlide;