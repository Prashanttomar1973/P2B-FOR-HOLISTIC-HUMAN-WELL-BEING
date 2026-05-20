import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, AlertTriangle, ShieldAlert, X, 
  Zap, Info, Skull, ShieldX, Terminal, 
  Activity, Database, Power, Loader2
} from 'lucide-react';

const DeleteAccountSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDelete = () => {
    if (confirmText === 'CONFIRM_PURGE') {
      setIsDeleting(true);
    }
  };

  useEffect(() => {
    if (isDeleting && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + Math.floor(Math.random() * 15) + 5, 100));
      }, 400);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      setTimeout(() => {
        alert("CRITICAL: Neural identity purged. System logout sequence initiated.");
        setShowModal(false);
        setIsDeleting(false);
        setProgress(0);
        setConfirmText('');
      }, 1000);
    }
  }, [isDeleting, progress]);

  return (
    <div className="neural-termination-wrapper position-relative overflow-hidden">
      {/* 🔮 AMBIENT DANGER NODES */}
      <div className="bg-glow-red" style={{ position: 'absolute', top: '10%', right: '5%', width: '500px', height: '500px', background: 'rgba(239, 68, 68, 0.05)', filter: 'blur(150px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="bg-glow-teal" style={{ position: 'absolute', bottom: '5%', left: '5%', width: '400px', height: '400px', background: 'rgba(26, 188, 156, 0.03)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="hazard-overlay"></div>

      <Container className="py-5 position-relative z-1" style={{ maxWidth: '1000px' }}>
        
        {/* 🚀 HEADER ARCHITECTURE */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="d-flex align-items-center gap-4 mb-5"
        >
          <div className="protocol-icon-box shadow-red">
            <Skull size={28} className="text-danger" />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
               <div className="danger-blip"></div>
               <span className="tiny-label text-danger uppercase tracking-widest fw-bold">Critical_Termination_Protocol</span>
            </div>
            <h1 className="fw-black text-white protocol-font m-0 text-uppercase tracking-tighter" style={{ fontSize: '3rem' }}>
              Purge <span className="text-danger">Account</span>
            </h1>
          </div>
        </motion.div>

        {/* 📜 MAIN TERMINATION INTERFACE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="termination-schematic-card p-4 p-md-5"
        >
          <Row className="g-5 align-items-center">
            <Col lg={7}>
              <div className="schematic-header mb-4 d-flex align-items-center gap-3">
                 <ShieldX size={24} className="text-danger" />
                 <h4 className="fw-black text-white uppercase m-0 tracking-wider">Identity Decoupling Sequence</h4>
              </div>
              
              <div className="warning-technical-block p-4 rounded-4 mb-4 border border-danger border-opacity-20">
                 <div className="d-flex align-items-center gap-2 mb-3">
                    <Activity size={14} className="text-danger" />
                    <span className="tiny-label text-danger uppercase tracking-widest fw-bold">Data Scrambling Parameters</span>
                 </div>
                 <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                    {[
                      { label: "Neural Profile Purge", status: "IRREVERSIBLE" },
                      { label: "Subscription Termination", status: "NO_REFUND" },
                      { label: "Identity Hash Deletion", status: "PERMANENT" },
                      { label: "Legal Compliance Log", status: "30_DAY_HOLD" }
                    ].map((item, i) => (
                      <li key={i} className="d-flex justify-content-between align-items-center border-bottom border-white border-opacity-5 pb-2">
                         <span className="tiny-label text-white opacity-50 uppercase">{item.label}</span>
                         <span className="tiny-label text-danger fw-bold uppercase tracking-wider">{item.status}</span>
                      </li>
                    ))}
                 </ul>
              </div>

              <p className="legal-para-sm mb-5 opacity-50">
                Warning: Initiating this protocol will permanently decouple your biological and psychological data from the P2B Intelligence Layer. All synthesized reports, neural history, and custom configurations will be destroyed.
              </p>

              <button 
                className="init-purge-btn w-100 w-md-auto px-5 py-3 rounded-pill fw-black text-uppercase tracking-widest"
                onClick={() => setShowModal(true)}
              >
                Initialize Termination Protocol
              </button>
            </Col>

            <Col lg={5} className="d-none d-lg-block">
              <div className="status-terminal-v2 p-4 rounded-5 text-center">
                 <div className="pulse-circle mx-auto mb-4">
                    <Power size={48} className="text-danger opacity-40" />
                 </div>
                 <div className="tiny-label text-danger opacity-50 uppercase tracking-widest mb-2">Security Level 5 Clearance</div>
                 <div className="terminal-metadata d-flex flex-column gap-1">
                    <span className="tiny-label opacity-30">ENCRYPTION: AES_256_ACTIVE</span>
                    <span className="tiny-label opacity-30">AUTH_MODE: NEURAL_MFA</span>
                    <span className="tiny-label opacity-30">SYNC_STATUS: AWAITING_CMD</span>
                 </div>
              </div>
            </Col>
          </Row>
        </motion.div>

        {/* 🏁 FOOTER METADATA */}
        <footer className="mt-5 pt-5 text-center">
           <p className="tiny-label opacity-20 uppercase tracking-widest">© 2026 P2B PROJECT // TERMINATION_LAYER_ACTIVE</p>
        </footer>
      </Container>

      {/* --- HIGH-STAKES AUTH MODAL --- */}
      <Modal 
        show={showModal} 
        onHide={() => !isDeleting && setShowModal(false)} 
        centered
        contentClassName="termination-modal-content overflow-hidden"
        backdrop="static"
      >
        <div className="modal-hazard-stripe"></div>
        <Modal.Body className="p-4 p-md-5 text-center position-relative z-1">
          {!isDeleting ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button className="protocol-close-btn" onClick={() => setShowModal(false)}><X size={20}/></button>
              
              <div className="mb-5">
                <div className="hex-danger-icon mx-auto mb-4">
                  <AlertTriangle size={32} className="text-danger" />
                </div>
                <h3 className="fw-black text-white text-uppercase tracking-tighter mb-2">Final Authorization</h3>
                <div className="danger-accent-line mx-auto mb-4"></div>
                <p className="text-danger small fw-bold uppercase tracking-widest opacity-80">Extreme Data Risk Detected</p>
              </div>

              <div className="purge-auth-form mb-5">
                <div className="d-flex justify-content-between mb-2 px-2">
                   <label className="tiny-label opacity-50 uppercase text-white">Override Code</label>
                   <span className="tiny-label text-danger fw-bold uppercase">Type "CONFIRM_PURGE"</span>
                </div>
                <Form.Control 
                  type="text" 
                  placeholder="CODE_INPUT_AWAITING..."
                  className="schematic-input text-center fw-black tracking-widest"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                />
              </div>

              <div className="d-flex flex-column gap-3">
                <button 
                  className="purge-execute-btn py-3 fw-black text-uppercase tracking-widest"
                  disabled={confirmText !== 'CONFIRM_PURGE'}
                  onClick={handleDelete}
                >
                  Authorize Identity Purge
                </button>
                <button 
                  className="abort-btn small fw-black text-uppercase tracking-widest opacity-40 hover-opacity-1"
                  onClick={() => setShowModal(false)}
                >
                  Abort Protocol
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="py-5"
            >
              <Loader2 size={64} className="text-danger spin-slow mb-4 mx-auto" />
              <h4 className="fw-black text-white text-uppercase tracking-wider mb-2">System Purge in Progress</h4>
              <div className="progress-container mx-auto mb-4">
                 <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="terminal-output text-start p-3 rounded-3 bg-black bg-opacity-40">
                 <p className="tiny-label text-danger mb-1">&gt; [DECRYPTING_IDENTITY_LAYERS]</p>
                 <p className="tiny-label text-danger mb-1">&gt; [SCRAMBLING_NEURAL_HASHES]</p>
                 <p className="tiny-label text-danger mb-0">&gt; [PURGING_DATA_CACHES... {progress}%]</p>
              </div>
            </motion.div>
          )}
        </Modal.Body>
      </Modal>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');

        .neural-termination-wrapper {
          background: radial-gradient(circle at 20% 30%, #1e4d4a 0%, #0d2120 100%);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: white;
          padding-top: 80px;
        }

        .protocol-font { font-family: 'Outfit', sans-serif; letter-spacing: -2px; }
        .fw-black { font-weight: 900; }
        .text-danger { color: #ef4444 !important; }
        .uppercase { text-transform: uppercase; }
        .tracking-widest { letter-spacing: 3px; }
        .tracking-wider { letter-spacing: 2px; }
        .tracking-tighter { letter-spacing: -3px; }
        .tiny-label { font-size: 10px; font-weight: 900; }

        .protocol-icon-box {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 16px;
          border-radius: 20px;
        }
        .shadow-red { box-shadow: 0 0 30px rgba(239, 68, 68, 0.1); }

        .danger-blip {
          width: 8px; height: 8px;
          background: #ef4444;
          border-radius: 50%;
          animation: pulse-danger 1.5s infinite;
        }
        @keyframes pulse-danger {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.4; }
          100% { transform: scale(1); opacity: 1; }
        }

        .termination-schematic-card {
          background: linear-gradient(145deg, rgba(61, 90, 90, 0.8), rgba(40, 60, 60, 0.6));
          backdrop-filter: blur(40px);
          border: 1px solid rgba(239, 68, 68, 0.15);
          border-radius: 40px;
          box-shadow: 0 50px 120px rgba(0, 0, 0, 0.6);
          position: relative;
        }

        .legal-para-sm { font-size: 13px; line-height: 1.8; font-weight: 400; }

        .init-purge-btn {
          background: #ef4444;
          color: #fff;
          border: none;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 15px 40px rgba(239, 68, 68, 0.3);
        }
        .init-purge-btn:hover {
          transform: translateY(-5px);
          background: #ff5f5f;
          box-shadow: 0 25px 60px rgba(239, 68, 68, 0.5);
        }

        .status-terminal-v2 {
           background: rgba(0, 0, 0, 0.2);
           border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .pulse-circle {
           width: 100px; height: 100px;
           border: 2px solid rgba(239, 68, 68, 0.1);
           border-radius: 50%;
           display: flex; align-items: center; justify-content: center;
           animation: pulse-ring 3s infinite;
        }
        @keyframes pulse-ring {
           0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.1); }
           70% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
           100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        /* MODAL STYLING */
        .termination-modal-content {
          background: radial-gradient(circle at top right, #1a0a0a, #0d2120) !important;
          border-radius: 40px !important;
          border: 1px solid rgba(239, 68, 68, 0.3) !important;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
        }

        .modal-hazard-stripe {
          height: 8px;
          background: repeating-linear-gradient(
            -45deg,
            #ef4444,
            #ef4444 10px,
            #000 10px,
            #000 20px
          );
        }

        .protocol-close-btn {
          position: absolute; top: 25px; right: 25px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: 0.3s;
        }
        .protocol-close-btn:hover { background: #ef4444; color: #fff; }

        .hex-danger-icon {
          width: 80px; height: 80px;
          background: rgba(239, 68, 68, 0.05);
          border: 2px solid rgba(239, 68, 68, 0.2);
          border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
        }

        .danger-accent-line {
          width: 60px; height: 3px; background: #ef4444; border-radius: 10px;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
        }

        .schematic-input {
          background: rgba(0,0,0,0.4) !important;
          border: 1px solid rgba(239, 68, 68, 0.3) !important;
          color: #ef4444 !important;
          border-radius: 20px !important;
          padding: 18px !important;
          font-size: 1.1rem !important;
        }

        .purge-execute-btn {
          background: #ef4444; color: #fff; border: none; border-radius: 20px;
          transition: 0.3s;
        }
        .purge-execute-btn:hover:not(:disabled) {
           background: #ff5f5f; transform: translateY(-2px);
           box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4);
        }
        .purge-execute-btn:disabled { opacity: 0.3; filter: grayscale(1); }

        .abort-btn { background: none; border: none; color: #fff; transition: 0.3s; cursor: pointer; }
        .hover-opacity-1:hover { opacity: 1; }

        .progress-container { width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden; }
        .progress-fill { height: 100%; background: #ef4444; box-shadow: 0 0 15px #ef4444; transition: width 0.4s ease; }

        .spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .hazard-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(rgba(239, 68, 68, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0; pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default DeleteAccountSection;