import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const ChangePassword = () => {
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  const toggleVisibility = (field) => {
    setShowPass(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="change-password-wrapper d-flex justify-content-center align-items-center p-4 position-relative overflow-hidden"
    >
      {/* ADVANCED BACKGROUND ELEMENTS (From MainBody) */}
      <div className="bg-glow" style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'rgba(201, 166, 107, 0.08)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="bg-glow-2" style={{ position: 'absolute', bottom: '5%', right: '5%', width: '300px', height: '300px', background: 'rgba(26, 188, 156, 0.05)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>

      <div className="password-card shadow-2xl p-4 p-md-5 rounded-5 position-relative z-1">
        <div className="mb-5 border-bottom border-white border-opacity-10 pb-4 text-center text-md-start">
          <h2 className="fw-black fs-2 m-0 text-gold d-flex align-items-center justify-content-center justify-content-md-start gap-3 text-uppercase tracking-tighter">
            <ShieldCheck size={32} /> Security Protocol
          </h2>
          <p className="tiny-label text-white opacity-40 uppercase tracking-widest mt-2 m-0">Authentication & Credential Management</p>
        </div>

        <div className="form-inner-container mx-auto" style={{ maxWidth: '450px' }}>
          <div className="text-center mb-5">
            <h4 className="fw-black text-white text-uppercase tracking-wider small mb-2">Protect Your Core Identity</h4>
            <p className="text-white opacity-50 small leading-relaxed px-4">Update your neural access key to maintain maximum security integrity.</p>
          </div>

          <Form>
            {/* Current Password */}
            <Form.Group className="mb-4">
              <Form.Label className="neural-label-sync">
                <Lock size={14} /> <span>Current Password</span>
              </Form.Label>
              <InputGroup className="modern-input-group-sync">
                <InputGroup.Text className="bg-transparent border-0 pe-0">
                  <Lock size={18} className="text-gold opacity-50" />
                </InputGroup.Text>
                <Form.Control 
                  type={showPass.current ? "text" : "password"} 
                  className="bg-transparent border-0 text-white ps-3"
                  placeholder="••••••••"
                />
                <Button variant="link" className="text-gold opacity-40 hover-opacity-100 border-0" onClick={() => toggleVisibility('current')}>
                  {showPass.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-4">
              <Form.Label className="neural-label-sync">
                <Lock size={14} /> <span>New Security Key</span>
              </Form.Label>
              <InputGroup className="modern-input-group-sync">
                <InputGroup.Text className="bg-transparent border-0 pe-0">
                  <Lock size={18} className="text-gold opacity-50" />
                </InputGroup.Text>
                <Form.Control 
                  type={showPass.new ? "text" : "password"} 
                  className="bg-transparent border-0 text-white ps-3"
                  placeholder="New strong password"
                />
                <Button variant="link" className="text-gold opacity-40 hover-opacity-100 border-0" onClick={() => toggleVisibility('new')}>
                  {showPass.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-5">
              <Form.Label className="neural-label-sync">
                <Lock size={14} /> <span>Verify Key Integrity</span>
              </Form.Label>
              <InputGroup className="modern-input-group-sync">
                <InputGroup.Text className="bg-transparent border-0 pe-0">
                  <Lock size={18} className="text-gold opacity-50" />
                </InputGroup.Text>
                <Form.Control 
                  type={showPass.confirm ? "text" : "password"} 
                  className="bg-transparent border-0 text-white ps-3"
                  placeholder="Repeat new password"
                />
                <Button variant="link" className="text-gold opacity-40 hover-opacity-100 border-0" onClick={() => toggleVisibility('confirm')}>
                  {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </InputGroup>
            </Form.Group>

            <div className="d-flex gap-3 mt-4">
              <Button variant="link" className="btn-cancel-sync w-50 py-3 fw-black text-uppercase tracking-widest small text-decoration-none">
                Abort
              </Button>
              <Button className="btn-update-sync w-50 py-3 fw-black text-uppercase tracking-widest shadow-lg">
                Update Now
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');

        .change-password-wrapper { 
          min-height: 100vh; 
          background: radial-gradient(circle at 20% 30%, #1e4d4a 0%, #0d2120 100%); 
          font-family: 'Outfit', sans-serif;
        }

        .password-card { 
          width: 100%; 
          max-width: 600px; 
          background: linear-gradient(145deg, rgba(61, 90, 90, 0.8), rgba(40, 60, 60, 0.6));
          backdrop-filter: blur(25px);
          border: 1px solid rgba(201, 166, 107, 0.15);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
        }
        
        .modern-input-group-sync {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(201, 166, 107, 0.15);
          border-radius: 16px;
          overflow: hidden;
          transition: 0.3s;
        }
        
        .modern-input-group-sync:focus-within {
          border-color: #c9a66b;
          background: rgba(201, 166, 107, 0.05);
          box-shadow: 0 0 20px rgba(201, 166, 107, 0.2);
        }

        .neural-label-sync {
          font-size: 10px; font-weight: 900; color: #c9a66b;
          margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px;
          display: flex; align-items: center; gap: 10px;
          opacity: 0.8;
        }

        .btn-update-sync { 
           background: #c9a66b !important; 
           border: none !important; 
           color: #1a3c3a !important;
           border-radius: 14px !important;
           transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .btn-update-sync:hover { background: #fff !important; transform: translateY(-5px); box-shadow: 0 15px 30px rgba(201, 166, 107, 0.4); }

        .btn-cancel-sync {
          color: rgba(255, 255, 255, 0.4) !important;
          transition: 0.3s;
        }
        .btn-cancel-sync:hover { color: #c9a66b !important; opacity: 1; }

        .text-gold { color: #c9a66b !important; }
        .fw-black { font-weight: 900; }
        .uppercase { text-transform: uppercase; }
        .tracking-widest { letter-spacing: 3px; }
        .tracking-tighter { letter-spacing: -2px; }
        .tiny-label { font-size: 10px; font-weight: 900; }
        .leading-relaxed { line-height: 1.8; }
        
        @media (max-width: 576px) {
          .btn-cancel-sync, .btn-update-sync { width: 100% !important; }
        }
      `}</style>
    </motion.div>
  );
};

export default ChangePassword;