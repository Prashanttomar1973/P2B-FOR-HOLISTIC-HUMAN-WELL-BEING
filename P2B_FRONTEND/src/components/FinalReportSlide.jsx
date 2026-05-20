import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button
} from "react-bootstrap";
import {
  Dna,
  Brain,
  Compass,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "bootstrap/dist/css/bootstrap.min.css";

const P2BReport = ({ data, loading, onChatOpen, onFinish }) => {
  if (loading) {
    return (
      <div className="loading-root d-flex align-items-center justify-content-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="loading-card-glass p-5 text-center"
        >
          <div className="brain-bracket mb-4">
             <Brain size={48} className="text-gold" />
          </div>
          
          <div className="loading-text-container mb-4">
            <h6 className="loading-status-text m-0">
              PLEASE WAIT WHILE YOUR REPORT IS BEING GENERATED. STAY <span className="text-emerald">HAPPY</span> AND <span className="text-emerald">HEALTHY.</span>
            </h6>
          </div>

          <div className="loading-bar-container">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="loading-bar-fill"
            />
          </div>
        </motion.div>

        <style>{`
          .loading-root {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at center, #1e4d4a 0%, #0d2120 100%);
            z-index: 9999;
            font-family: 'Outfit', sans-serif;
          }
          .loading-card-glass {
            background: rgba(40, 65, 60, 0.9);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 40px;
            width: 90%;
            max-width: 550px;
            box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
          }
          .brain-bracket {
            display: inline-block;
            padding: 20px;
            background: rgba(201, 166, 107, 0.05);
            border: 1px solid rgba(201, 166, 107, 0.1);
            border-radius: 24px;
          }
          .text-gold { color: #c9a66b; }
          .text-emerald { color: #2ecc71; font-weight: 800; }
          .loading-status-text {
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 1px;
            line-height: 1.6;
          }
          .loading-bar-container {
            height: 4px;
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            overflow: hidden;
            max-width: 300px;
            margin: 0 auto;
          }
          .loading-bar-fill {
            height: 100%;
            background: #c9a66b;
            box-shadow: 0 0 15px rgba(201, 166, 107, 0.5);
          }
        `}</style>
      </div>
    );
  }

  // Domain Sections
  const bio = data?.biology_section || {};
  const psych = data?.psychology_section || {};
  const philo = data?.philosophy_section || {};

  // Structural Sections
  const summary = data?.summary || {};
  const mainBody = data?.main_body || {};
  const backMatter = data?.back_matter || {};

  const renderValue = (val) => {
    if (!val) return "-";
    if (typeof val === 'object') {
      return Array.isArray(val) ? val.join(', ') : JSON.stringify(val);
    }
    return val;
  };

  const Field = ({ label, value }) => (
    <div className="field-line">
      <span className="field-label">{label}</span> 
      <span className="field-value">{renderValue(value)}</span>
    </div>
  );

  return (
    <div className="report-root py-5 position-relative overflow-hidden">
      {/* ADVANCED BACKGROUND ELEMENTS (From MainBody) */}
      <div className="bg-glow" style={{ position: 'absolute', top: '5%', left: '2%', width: '700px', height: '700px', background: 'rgba(201, 166, 107, 0.05)', filter: 'blur(160px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="bg-glow-2" style={{ position: 'absolute', bottom: '10%', right: '2%', width: '600px', height: '600px', background: 'rgba(26, 188, 156, 0.03)', filter: 'blur(130px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>

      <Container className="report-container p-0 overflow-hidden position-relative z-1">
        
        {/* Header Branding */}
        <div className="report-header p-4 text-white d-flex justify-content-between align-items-center">
          <div>
            <h2 className="m-0 fw-black protocol-font tracking-tight uppercase">P2B Intelligence Report</h2>
            <p className="m-0 text-gold-dim small italic uppercase tracking-widest">Universal System Analysis v3.0</p>
          </div>
          <div className="text-end">
            <Badge className="badge-confidential px-3 py-2 rounded-pill">
              <FileText size={14} className="me-1"/> CONFIDENTIAL
            </Badge>
          </div>
        </div>

        <div className="p-5">

          {/* ================= FRONT MATTER ================= */}
          <div className="section-divider mb-4">
            <span className="section-label-premium">FRONT MATTER OF THE REPORT</span>
          </div>

          <div className="front-matter-container p-4 mb-5 rounded-4">
            <Row className="g-4">
              <Col md={4}>
                <div className="report-block h-100">
                  <h6 className="block-title text-gold"><FileText size={18} className="me-2"/> Title Section Of Report</h6>
                  <div className="mt-3">
                    <Field label="TITLE:" value={bio.title || "Biological Infrastructure Analysis"} />
                    <Field label="NAME OF THE CREATOR:" value="P2B Intelligence" />
                    <Field label="DATE:" value={data?.date || new Date().toLocaleDateString()} />
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="report-block h-100">
                  <h6 className="block-title text-gold">Problem of the User</h6>
                  <p className="mt-3 text-white opacity-75 lead-sm">
                    {renderValue(bio?.somatic_feedback_loop?.input_symptom || "No primary symptom reported.")}
                  </p>
                </div>
              </Col>

              <Col md={4}>
                <div className="report-block h-100">
                  <h6 className="block-title text-gold">Executive Summary Of Report</h6>
                  <div className="mt-3 summary-text">
                    <strong>STATUS CHECK:</strong> {renderValue(summary?.status_check || summary?.status || "-")} <br /><br />
                    <strong>CORE IMBALANCE:</strong> {renderValue(summary?.core_imbalance || "Synthesis pending full system analysis.")}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* ================= MAIN BODY ================= */}
          <div className="section-divider mb-4">
            <span className="section-label-premium">THE MAIN BODY OF THE REPORT</span>
          </div>

          <div className="main-body-container p-4 mb-5 rounded-4">
            <Row className="g-4 mb-5">
              <Col md={4}>
                <div className="report-block h-100">
                  <h6 className="block-title text-gold">Introduction of Report</h6>
                  <div className="mt-3 small-text">
                    <strong>SYSTEM CONTEXT:</strong><br />
                    {renderValue(mainBody?.introduction?.system_context || mainBody?.introduction?.stem_context || "Standard system context overview.")}<br /><br />
                    <strong>OBJECTIVE:</strong><br />
                    {renderValue(mainBody?.introduction?.objective || "-")}
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="report-block h-100">
                  <h6 className="block-title text-gold">Methodology of the Report</h6>
                  <div className="mt-3 small-text">
                    <strong>AUDIT PROCESS:</strong><br />
                    {renderValue(mainBody?.methodology?.audit_process || "Cross-layer audit methodology.")}<br /><br />
                    <strong>DATA RELIABILITY:</strong><br />
                    {renderValue(mainBody?.methodology?.data_reliability || "-")}
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="report-block h-100">
                  <h6 className="block-title text-gold">Analysis of Report</h6>
                  <div className="mt-3 small-text">
                    <strong>SUGGESTED DOMAIN:</strong><br />
                    {renderValue(mainBody?.analysis?.suggested_domain || "-")}<br /><br />
                    <strong>IDENTIFIED SUB DOMAIN:</strong><br />
                    {renderValue(mainBody?.analysis?.identified_sub_domain || "-")}<br /><br />
                    <strong>LOGIC JUSTIFICATION:</strong><br />
                    {renderValue(mainBody?.analysis?.logic_justification || "System analysis synthesis.")}<br /><br />
                    <strong>CROSS LAYER IMPACT:</strong><br />
                    {renderValue(mainBody?.analysis?.cross_layer_impact || "-")}
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="g-4">
              <Col lg={4}>
                <Card className="section-card shadow-lg border-0 h-100">
                  <Card.Header className="report-card-header text-gold fw-black py-3 uppercase tracking-wider">
                    <Dna size={18} className="me-2"/> Biology Section
                  </Card.Header>
                  <Card.Body className="p-4 text-white">
                    <Field label="TITLE:" value={bio.title}/>
                    <Field label="STATUS:" value={bio.status}/>

                    <h6 className="sub-title-premium text-uppercase mt-4">System Architecture</h6>
                    <Field label="Operating Mode:" value={bio.system_architecture?.operating_mode}/>
                    <Field label="Logic Justification:" value={bio.system_architecture?.logic_justification}/>

                    <h6 className="sub-title-premium text-uppercase mt-4">Energy Efficiency</h6>
                    <Field label="Current Level:" value={bio.energy_efficiency?.current_level}/>
                    <Field label="Drain Source:" value={bio.energy_efficiency?.drain_source}/>
                    <Field label="Recovery Status:" value={bio.energy_efficiency?.recovery_status}/>

                    <h6 className="sub-title-premium text-uppercase mt-4">Autonomic Tone</h6>
                    <Field label="Vagal Status:" value={bio.autonomic_tone?.vagal_status}/>
                    <Field label="Heart Rate Variability:" value={bio.autonomic_tone?.heart_rate_variability}/>

                    <h6 className="sub-title-premium text-uppercase mt-3 text-secondary">Bio Chemical Pulse</h6>
                    <Field label="Operating Mode:" value={bio.bio_chemical_pulse?.operating_mode}/>
                    <Field label="Logic Justification:" value={bio.bio_chemical_pulse?.logic_justification}/>
                    <Field label="Serotonin:" value={bio.bio_chemical_pulse?.anabolic_neurotransmitters?.serotonin}/>
                    <Field label="Dopamine:" value={bio.bio_chemical_pulse?.anabolic_neurotransmitters?.dopamine}/>
                    <Field label="GABA:" value={bio.bio_chemical_pulse?.anabolic_neurotransmitters?.gaba}/>

                    <h6 className="sub-title-premium text-uppercase mt-3 text-secondary">Somatic Feedback Loop</h6>
                    <Field label="Input Symptom:" value={bio.somatic_feedback_loop?.input_symptom}/>
                    <Field label="Biological Bridge:" value={bio.somatic_feedback_loop?.biological_bridge}/>
                    <Field label="Mechanism:" value={bio.somatic_feedback_loop?.mechanism}/>
                    <Field label="Somatization Index:" value={bio.somatic_feedback_loop?.somatization_index}/>

                    <h6 className="sub-title-premium text-uppercase mt-3 text-secondary">Cellular Vitality</h6>
                    <Field label="Mitochondrial Health:" value={bio.cellular_vitality?.mitochondrial_health}/>
                    <Field label="Oxygenation:" value={bio.cellular_vitality?.oxygenation}/>
                    <Field label="Hydration Status:" value={bio.cellular_vitality?.hydration_status}/>

                    <h6 className="sub-title-premium text-uppercase mt-3 text-secondary">Circadian Alignment</h6>
                    <Field label="Status:" value={bio.circadian_alignment?.status}/>
                    <Field label="Root Cause:" value={bio.circadian_alignment?.root_cause}/>
                    <Field label="Sleep Architecture Risk:" value={bio.circadian_alignment?.sleep_architecture_risk}/>

                    <div className="mt-4 p-3 report-optimization-box rounded-3">
                      <h6 className="sub-title-premium m-0 mb-2 text-gold">Optimization Protocol</h6>
                      <Field label="Immediate:" value={bio.hardware_optimization_protocol?.immediate_emergency_resets}/>
                      <Field label="Maintenance:" value={bio.hardware_optimization_protocol?.long_term_maintenance}/>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="section-card shadow-lg border-0 h-100">
                  <Card.Header className="report-card-header text-gold fw-black py-3 uppercase tracking-wider">
                    <Brain size={18} className="me-2"/> Psychology Section
                  </Card.Header>
                  <Card.Body className="p-4 text-white">
                    <Field label="TITLE:" value={psych.title}/>
                    <Field label="STATUS:" value={psych.status}/>

                    <h6 className="sub-title-premium text-uppercase mt-4">Mental Operating System</h6>
                    <Field label="Current State:" value={psych.mental_operating_system?.current_state}/>
                    <Field label="Logic Justification:" value={psych.mental_operating_system?.logic_justification}/>
                    <Field label="Cognitive Load:" value={psych.mental_operating_system?.cognitive_load?.current_level}/>
                    <Field label="Bandwidth Status:" value={psych.mental_operating_system?.cognitive_load?.bandwidth_status}/>
                    <Field label="Resilience Index:" value={psych.mental_operating_system?.cognitive_load?.resilience_index}/>

                    <h6 className="sub-title-premium text-uppercase mt-4">Behavioral Architecture</h6>
                    <Field label="Root Drivers:" value={psych.behavioral_architecture?.root_drivers}/>
                    <Field label="Pattern:" value={psych.behavioral_architecture?.subconscious_loops?.pattern}/>
                    <Field label="Archetype:" value={psych.behavioral_architecture?.personality_archetype}/>
                    <Field label="Shadow Trait:" value={psych.behavioral_architecture?.shadow_trait}/>

                    <h6 className="sub-title-premium text-uppercase mt-4">Mind Body Bridge</h6>
                    <Field label="Conversion:" value={psych.mind_body_bridge?.psychosomatic_conversion}/>
                    <Field label="Bridge Status:" value={psych.mind_body_bridge?.neural_bridge_status}/>
                    <Field label="Pain Logic:" value={psych.mind_body_bridge?.pain_logic}/>

                    <div className="mt-4 p-3 report-optimization-box rounded-3">
                      <h6 className="sub-title-premium m-0 mb-2 text-gold">Software Optimization</h6>
                      <Field label="Reframing:" value={psych.software_optimization_protocol?.cognitive_reframing}/>
                      <Field label="Resets:" value={psych.software_optimization_protocol?.actionable_mental_resets}/>
                      <Field label="Hygiene:" value={psych.software_optimization_protocol?.digital_hygiene}/>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="section-card shadow-lg border-0 h-100">
                  <Card.Header className="report-card-header text-gold fw-black py-3 uppercase tracking-wider">
                    <Compass size={18} className="me-2"/> Philosophy Section
                  </Card.Header>
                  <Card.Body className="p-4 text-white">
                    <Field label="TITLE:" value={philo.title}/>
                    <Field label="STATUS:" value={philo.status}/>

                    <h6 className="sub-title-premium text-uppercase mt-4">Existential Perspective</h6>
                    <Field label="Framework:" value={philo.existential_perspective?.framework}/>
                    <Field label="Context Mapping:" value={philo.existential_perspective?.context_mapping}/>
                    <Field label="Narrative Shift:" value={philo.existential_perspective?.narrative_shift}/>
                    <Field label="Logic of Struggle:" value={philo.existential_perspective?.logic_of_struggle}/>

                    <h6 className="sub-title-premium text-uppercase mt-4">Control Matrix Analysis</h6>
                    <Field label="Within Sphere:" value={philo.control_matrix_analysis?.within_sphere_of_influence}/>
                    <Field label="Outside Sphere:" value={philo.control_matrix_analysis?.outside_sphere_of_influence}/>
                    <Field label="Recommendation:" value={philo.control_matrix_analysis?.focus_recommendation}/>

                    <h6 className="sub-title-premium text-uppercase mt-3 text-secondary">Value Reframing Logic</h6>
                    <Field label="Meaning of Pain:" value={philo.value_reframing_logic?.meaning_of_pain}/>
                    <Field label="Identity Evolution:" value={philo.value_reframing_logic?.identity_evolution}/>
                    <Field label="Dharma Protocol:" value={philo.value_reframing_logic?.dharma_protocol}/>

                    <h6 className="sub-title-premium text-uppercase mt-3 text-secondary">Curated Universal Wisdom</h6>
                    <Field label="Core Principle:" value={philo.curated_universal_wisdom?.core_principle}/>
                    <Field label="Key Quote:" value={philo.curated_universal_wisdom?.key_quote}/>
                    <Field label="Author:" value={philo.curated_universal_wisdom?.author}/>

                    <div className="mt-4 p-3 report-optimization-box rounded-3">
                      <h6 className="sub-title-premium m-0 mb-2 text-gold">Actionable Wisdom</h6>
                      <Field label="Practice:" value={philo.actionable_wisdom_protocol?.contemplative_practice}/>
                      <Field label="Mantra:" value={philo.actionable_wisdom_protocol?.daily_mantra}/>
                      <Field label="Commitment:" value={philo.actionable_wisdom_protocol?.ethical_commitment}/>
                      <Field label="Alignment:" value={philo.actionable_wisdom_protocol?.purpose_alignment}/>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          {/* ================= BACK MATTER ================= */}
          <div className="section-divider mt-5 mb-4">
            <span className="section-label-premium">BACK MATTER OF THE REPORT</span>
          </div>

          <div className="back-matter-container p-4 rounded-4 shadow-sm">
            <Row className="g-4">
              <Col md={4}>
                <div className="report-block h-100">
                  <h6 className="block-title text-gold">Conclusion of Report</h6>
                  <div className="mt-3 summary-text">
                    <strong>FINAL VERDICT :</strong><br />
                    {renderValue(backMatter?.conclusion?.final_verdict || "Final verdict pending.")}<br /><br />
                    <strong>SYSTEM STABILITY INDEX:</strong><br />
                    {renderValue(backMatter?.conclusion?.system_stability_index || "-")}
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="report-block h-100">
                  <h6 className="block-title text-gold">Recommendations of Report</h6>
                  <div className="mt-3 summary-text">
                    <strong>IMMEDIATE EMERGENCY RESET :</strong><br />
                    {renderValue(backMatter?.recommendations?.immediate_emergency_reset || backMatter?.recommendations?.immediate_emergency_resets || "-")}<br /><br />
                    <strong>LONG TERM MAINTENANCE:</strong><br />
                    {renderValue(backMatter?.recommendations?.long_term_maintenance || "-")}
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="report-block h-100">
                  <h6 className="block-title text-gold-dim">Appendices of Report</h6>
                  <div className="mt-3 small-text">
                    <strong>SOURCE CITATIONS:</strong><br />
                    {renderValue(backMatter?.appendices?.source_citations || "-")}<br /><br />
                    <strong>P2B WISDOM PROTOCOL:</strong><br />
                    {renderValue(backMatter?.appendices?.p2b_wisdom_protocol || "-")}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="report-footer p-4 text-center border-top border-white border-opacity-10 mt-4 d-flex flex-column align-items-center justify-content-center gap-3">
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            {onChatOpen && (
              <Button 
                onClick={onChatOpen} 
                className="btn-gold-shimmer px-5 py-3 fw-black text-uppercase tracking-widest shadow-lg d-flex align-items-center"
              >
                <Brain size={18} className="me-2" /> CHAT WITH P2B
              </Button>
            )}
            {onFinish && (
              <Button 
                onClick={onFinish} 
                variant="outline-light" 
                className="px-5 py-3 fw-black text-uppercase tracking-widest shadow-lg border-2"
                style={{ borderRadius: '12px' }}
              >
                EXIT REPORT
              </Button>
            )}
          </div>
          <p className="m-0 text-white opacity-30 small uppercase tracking-widest mt-3">&copy; 2026 P2B Intelligence Layer. All Rights Reserved.</p>
        </div>

      </Container>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=JetBrains+Mono:wght@400&display=swap');

        .report-root { 
          background: radial-gradient(circle at 20% 30%, #1e4d4a 0%, #0d2120 100%); 
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;          
        }

        .protocol-font { letter-spacing: -1.5px; }
        .fw-black { font-weight: 900; }
        .text-gold { color: #c9a66b !important; }
        .text-gold-dim { color: rgba(201, 166, 107, 0.6) !important; }
        .uppercase { text-transform: uppercase; }
        .tracking-widest { letter-spacing: 2px; }
        
        .report-container { 
          background: linear-gradient(145deg, rgba(80, 110, 110, 0.95), rgba(60, 80, 80, 0.85));
          backdrop-filter: blur(40px);
          border: 1px solid rgba(201, 166, 107, 0.25);
          border-radius: 40px;
          margin-top: 2rem;
          margin-bottom: 4rem;
          box-shadow: 0 50px 120px rgba(0, 0, 0, 0.6);
        }

        .report-header { 
          background: rgba(13, 33, 32, 0.5); 
          border-bottom: 1px solid rgba(201, 166, 107, 0.1);
        }

        .badge-confidential {
          background: rgba(201, 166, 107, 0.1);
          color: #c9a66b;
          border: 1px solid rgba(201, 166, 107, 0.2);
          font-weight: 800;
          font-size: 0.7rem;
        }
        
        .section-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin-top: 3rem;
          position: relative;
        }
        .section-divider::before {
          content: "";
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201, 166, 107, 0.2));
        }
        .section-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: linear-gradient(to left, transparent, rgba(201, 166, 107, 0.2));
        }
        
        .section-label-premium {
          background: rgba(201, 166, 107, 0.1);
          color: #c9a66b;
          padding: 8px 24px;
          border-radius: 50px;
          font-weight: 900;
          font-size: 0.7rem;
          letter-spacing: 2px;
          border: 1px solid rgba(201, 166, 107, 0.2);
          text-transform: uppercase;
        }

        .report-block {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 20px;
          color: white;
          transition: all 0.3s ease;
        }
        .report-block:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(201, 166, 107, 0.3);
          transform: translateY(-5px);
        }

        .block-title {
          font-weight: 900;
          margin-bottom: 1.25rem;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 0.75rem;
        }

        .field-line { margin-bottom: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.03); padding-bottom: 6px; }
        .field-label { font-weight: 900; font-size: 0.65rem; color: rgba(201, 166, 107, 0.6); text-transform: uppercase; margin-right: 10px; }
        .field-value { font-size: 0.75rem; color: white; }

        .summary-text { font-size: 0.9rem; line-height: 1.8; color: rgba(255, 255, 255, 0.8); }
        .small-text { font-size: 0.75rem; line-height: 1.6; color: rgba(255, 255, 255, 0.6); }
        
        .section-card { 
          background: rgba(40, 65, 60, 0.7); 
          backdrop-filter: blur(20px);
          border-radius: 30px; 
          border: 1px solid rgba(201, 166, 107, 0.15); 
        }
        .report-card-header {
          background: rgba(201, 166, 107, 0.05);
          border-bottom: 1px solid rgba(201, 166, 107, 0.1);
        }

        .sub-title-premium {
          font-size: 0.65rem;
          letter-spacing: 1px;
          font-weight: 900;
          color: rgba(201, 166, 107, 0.4);
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .report-optimization-box {
          background: rgba(201, 166, 107, 0.05);
          border: 1px solid rgba(201, 166, 107, 0.15);
        }

        .tracking-tight { letter-spacing: -1.5px; }
        .lead-sm { font-size: 0.95rem; font-weight: 500; line-height: 1.7; }
        
        .front-matter-container,
        .main-body-container,
        .back-matter-container {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default P2BReport;