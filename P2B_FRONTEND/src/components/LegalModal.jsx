import React, { useState } from 'react';
import { Shield, AlertTriangle, Scale, Check, Zap, Info } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LegalModal = ({ onAccept }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div
      className="position-fixed top-50 start-50 translate-middle"
      style={{ 
        zIndex: 2000,
        maxWidth: '95%',
        width: '760px',
        animation: 'modalEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800;900&display=swap');

        .legal-modal-glass {
          background: rgba(13, 33, 32, 0.85) !important;
          backdrop-filter: blur(32px) saturate(120%) !important;
          WebkitBackdropFilter: blur(32px) saturate(120%) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          border-radius: 32px;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          color: #e5d5b8;
        }

        .legal-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px 40px 18px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);
        }

        .protocol-tag {
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #c9a66b;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .legal-content-area {
          max-height: 40vh;
          overflow-y: auto;
          padding: 0 40px;
          scrollbar-width: thin;
          scrollbar-color: rgba(201, 166, 107, 0.2) transparent;
        }

        .legal-content-area::-webkit-scrollbar { width: 4px; }
        .legal-content-area::-webkit-scrollbar-thumb { background: rgba(201, 166, 107, 0.2); border-radius: 10px; }

        .legal-section-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 18px 24px;
          margin-bottom: 12px;
          transition: all 0.3s ease;
        }

        .legal-section-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(201, 166, 107, 0.3);
        }

        .authorize-btn {
          height: 64px;
          background: linear-gradient(135deg, #c9a66b 0%, #a6854d 100%) !important;
          border: none !important;
          border-radius: 18px !important;
          font-family: 'Outfit', sans-serif !important;
          font-weight: 800 !important;
          letter-spacing: 1px;
          color: #0d2120 !important;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          box-shadow: 0 10px 30px rgba(201, 166, 107, 0.2);
        }

        .authorize-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 3s infinite;
        }

        .authorize-btn:disabled {
          background: #1a3c3a !important;
          color: rgba(229, 213, 184, 0.3) !important;
          opacity: 0.6;
          box-shadow: none;
        }

        .authorize-btn:not(:disabled):hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 15px 40px rgba(201, 166, 107, 0.4);
        }

        .acceptance-check {
          background: rgba(0,0,0,0.2);
          border: 2px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 16px 24px;
          margin-top: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .acceptance-check.active {
          border-color: rgba(201, 166, 107, 0.5);
          background: rgba(201, 166, 107, 0.05);
        }

        @keyframes shimmer { 0% { left: -100%; } 30% { left: 150%; } 100% { left: 150%; } }
        @keyframes modalEntrance { from { opacity: 0; transform: translate(-50%, -45%) scale(0.95); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>

      <div className="legal-modal-glass">
        {/* HEADER */}
        <div className="legal-header">
          <div className="protocol-tag">
            <Shield size={14} className="text-warning" />
            Neural Access Protocol v3.0
          </div>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: '900', color: '#fff', fontSize: '1.9rem', marginBottom: '8px' }}>
            Legal Intelligence Disclaimer
          </h2>
          <p style={{ margin: 0, opacity: 0.5, fontSize: '12px', fontWeight: '600' }}>IDENTITY VERIFICATION & TERMS OF ENGAGEMENT</p>
        </div>

        {/* CONTENT */}
        <div className="legal-content-area mt-4">
          <div className="legal-section-card">
            <div className="d-flex align-items-center gap-3 mb-3">
               <Zap size={20} className="text-warning" />
               <h6 className="mb-0 fw-bold text-white text-uppercase small" style={{ letterSpacing: '1px' }}>AI-Generated Intelligence</h6>
            </div>
            <p className="mb-0 fs-14 opacity-75" style={{ fontSize: '14.5px', lineHeight: '1.7' }}>
              All information provided by the P2B platform is synthesized by advanced Artificial Intelligence. While highly sophisticated, AI may occasionally produce misinformation or technical inaccuracies.
            </p>
          </div>

          <div className="legal-section-card" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.1)' }}>
            <div className="d-flex align-items-center gap-3 mb-3">
               <AlertTriangle size={20} className="text-danger" />
               <h6 className="mb-0 fw-bold text-danger text-uppercase small" style={{ letterSpacing: '1px' }}>Medical Warning</h6>
            </div>
            <p className="mb-0 fw-medium text-white" style={{ fontSize: '14.5px', lineHeight: '1.7' }}>
              This platform does NOT provide medical, psychological, or psychiatric advice. 
            </p>
          </div>

          <div className="legal-section-card">
            <div className="d-flex align-items-center gap-3 mb-4">
               <Scale size={20} className="text-warning" />
               <h6 className="mb-0 fw-bold text-white text-uppercase small" style={{ letterSpacing: '1px' }}>User Accountability</h6>
            </div>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
               <li className="d-flex gap-3 align-items-start">
                  <div className="p-1 rounded-circle bg-warning bg-opacity-10 mt-1"><Check size={10} className="text-warning" /></div>
                  <span style={{ fontSize: '14px', lineHeight: '1.5' }}><strong>Absolute Verification:</strong> You must cross-reference all insights with licensed professionals.</span>
               </li>
               <li className="d-flex gap-3 align-items-start">
                  <div className="p-1 rounded-circle bg-warning bg-opacity-10 mt-1"><Check size={10} className="text-warning" /></div>
                  <span style={{ fontSize: '14px', lineHeight: '1.5' }}><strong>Zero Guarantee:</strong> P2B assumes no liability for decisions made based on AI output.</span>
               </li>
            </ul>
          </div>
        </div>

        {/* FOOTER & BUTTON */}
        <div className="p-4 p-md-5 pt-0 pb-4">
          <div 
            className={`acceptance-check ${agreed ? 'active' : ''}`}
            onClick={() => setAgreed(!agreed)}
          >
            <div className="d-flex align-items-start gap-3">
               <div style={{
                 width: '24px', height: '24px',
                 borderRadius: '8px',
                 border: `2px solid ${agreed ? '#c9a66b' : 'rgba(255,255,255,0.1)'}`,
                 background: agreed ? '#c9a66b' : 'transparent',
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 transition: 'all 0.2s ease',
                 flexShrink: 0
               }}>
                 {agreed && <Check size={16} color="#0d2120" strokeWidth={4} />}
               </div>
               <p className="mb-0 small" style={{ color: agreed ? '#fff' : 'rgba(229, 213, 184, 0.6)', fontWeight: agreed ? '600' : '400', lineHeight: '1.6' }}>
                 I have fully deciphered the Legal Disclaimer and acknowledge that all insights are AI-generated. I accept full responsibility for any actions taken and agree to the <span className="text-white border-bottom border-secondary">Terms of Service</span>.
               </p>
            </div>
          </div>

          <button
            className="authorize-btn w-100 mt-4 d-flex align-items-center justify-content-center gap-3"
            disabled={!agreed}
            onClick={onAccept}
          >
            {agreed ? <Zap size={20} /> : <Info size={20} />}
            {agreed ? 'AUTHORIZE NEURAL ACCESS' : 'LOGIN PROTOCOL LOCKED'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;