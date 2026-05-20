import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Zap, Activity, History, Check, Save, X, Edit3, Camera, Info, AlertCircle, Calendar, ArrowLeft, Trash2, RotateCw } from 'lucide-react';
import axios from 'axios';
import P2BReport from './FinalReportSlide';

const PersonalInformation = ({ onChatWithReport }) => {
  // 1. STATE & REFS
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'anonymous@p2b.ai', // Standardized fallback for Guest
    phone: '+1 888-NEURAL-0',
    dob: '1992-04-12',
    location: 'Silicon Valley, CA',
    language: 'English (US)'
  });

  const [initialData, setInitialData] = useState({ ...formData });
  const [profileImage, setProfileImage] = useState(null);
  const profileLogoPath = "/user.png";
  const [vaultReports, setVaultReports] = useState([]);
  const [activityGrid, setActivityGrid] = useState({});
  const [totalInvocations, setTotalInvocations] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  // NEW: Report Viewing State
  const [selectedReportData, setSelectedReportData] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    // 1. Load Profile Data
    const savedUser = localStorage.getItem('p2b_user');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      const data = { 
        ...formData, 
        fullName: u.name || u.fullName || formData.fullName,
        email: u.email || formData.email,
        phone: u.phone || formData.phone,
        dob: u.dob || formData.dob,
        location: u.location || formData.location,
        language: u.language || formData.language
      };
      setFormData(data);
      setInitialData(data);
      fetchUserStats(u.email || formData.email);
    } else {
      fetchUserStats(formData.email);
    }

    // 2. Load Profile Photo
    const savedPhoto = localStorage.getItem('p2b_profile_photo');
    // Sanitize to prevent "null" or "undefined" strings from breaking the image src
    setProfileImage(savedPhoto && savedPhoto !== 'null' && savedPhoto !== 'undefined' ? savedPhoto : null);
  }, []);

  const fetchUserStats = async (email) => {
    try {
      console.log("P2B FETCH: Identity Context ->", email);
      const response = await axios.get(`http://localhost:8080/api/p2b-report/user-stats?email=${email}`);
      console.log("P2B FETCH: Server Response ->", response.data);
      setVaultReports(response.data.recentReports || []);
      setActivityGrid(response.data.activityGrid || {});
      setTotalInvocations(response.data.totalInvocations || 0);
    } catch (error) {
      console.error("Error fetching P2B stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleOpenReport = async (id) => {
    setLoadingReport(true);
    setIsReportOpen(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/p2b-report/details/${id}`);
      // Parse reportData if it's a string, or use directly if it's already an object
      let parsedData = response.data.reportData;
      if (typeof parsedData === 'string') {
        try {
          const cleanString = parsedData.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
          parsedData = JSON.parse(cleanString);
        } catch (e) {
          console.error("Failed to parse report data string:", e);
        }
      }
      setSelectedReportData(parsedData);
    } catch (error) {
      console.error("Error fetching report details:", error);
      setIsReportOpen(false);
    } finally {
      setLoadingReport(false);
    }
  };

  const handleDeleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this intelligence report? This action cannot be undone.")) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/p2b-report/${id}`);
      // Refresh the list
      fetchUserStats(formData.email);
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Failed to delete report. System synchronization error.");
    }
  };

  // 2. PROFILE HANDLERS
  const handlePhotoClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Neural profile photo must be less than 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfileImage(base64String);
      localStorage.setItem('p2b_profile_photo', base64String);
    };
    reader.readAsDataURL(file);
  };

  const handlePurgeCache = () => {
    if (window.confirm("WARNING: Purging cache will reset all local identity parameters. Your vaulted reports will remain safe in the neural cloud. Proceed?")) {
      localStorage.removeItem('p2b_user');
      localStorage.removeItem('p2b_profile_photo');
      window.location.reload();
    }
  };

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' or null

  const validateField = (name, value) => {
    // ... validation logic
    let error = '';
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = 'Invalid neural signature format';
    }
    if (name === 'phone') {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(value)) error = 'Communication node invalid';
    }
    if (!value.trim()) error = 'Parameter cannot be null';
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every(key => validateField(key, formData[key]));
    if (!isValid) return;

    setIsSaving(true);
    setSaveStatus(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const userToSave = { ...formData, name: formData.fullName };
      localStorage.setItem('p2b_user', JSON.stringify(userToSave));
      setInitialData({ ...formData });
      setIsSaving(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error("Save failure:", error);
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    setFormData({ ...initialData });
    setErrors({});
    setSaveStatus(null);
  };

  // Generate heatmap cells for last 150 days
  const getHeatmapCells = () => {
    const cells = [];
    const today = new Date();
    for (let i = 149; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      const count = activityGrid[dateStr] || 0;
      // Intensity logic: 0=none, 1-2=low, 3-4=med, 5-10=high, 10+=max
      let intensity = 0;
      if (count > 0) intensity = 1;
      if (count > 2) intensity = 2;
      if (count > 5) intensity = 3;
      if (count > 10) intensity = 4;
      cells.push({ val: intensity, count, date: dateStr });
    }
    return cells;
  };

  const heatmapCells = getHeatmapCells();

  return (
    <div className="neural-identity-wrapper position-relative overflow-hidden">
      {/* ADVANCED BACKGROUND ELEMENTS (From MainBody) */}
      <div className="bg-glow" style={{ position: 'absolute', top: '10%', left: '5%', width: '500px', height: '500px', background: 'rgba(201, 166, 107, 0.08)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="bg-glow-2" style={{ position: 'absolute', bottom: '5%', right: '5%', width: '400px', height: '400px', background: 'rgba(26, 188, 156, 0.05)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>

      <Container className="position-relative z-1">
        {/* 1. PERSONAL INFORMATION CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="neural-card profile-main-card p-4 p-md-5 mb-5"
        >
          {/* Status Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-4 mb-5">
            <div className="d-flex align-items-center gap-4">
              <div className="identity-badge p-3 rounded-4 shadow-emerald">
                <Shield size={32} className="text-gold" />
              </div>
              <div>
                <h3 className="m-0 fw-black text-white protocol-font">Neural Identity Center</h3>
                <p className="small text-gold-dim m-0 text-uppercase tracking-widest fw-bold">Management Protocol v4.2</p>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {saveStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="verification-status d-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-success bg-opacity-20 border border-success"
                >
                  <Check size={16} className="text-success" />
                  <span className="tiny-label text-success fw-bold text-uppercase">Data Synchronized</span>
                </motion.div>
              ) : (
                <div className="verification-status d-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-emerald-bright bg-opacity-10 border border-emerald">
                  <div className="pulse-dot"></div>
                  <span className="tiny-label text-emerald fw-bold text-uppercase tracking-wider">Identity Verified</span>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Header */}
          <div className="profile-header-zone d-flex flex-column flex-md-row align-items-center gap-5 mb-5 pb-5 border-bottom border-white border-opacity-10">
            <div className="position-relative">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <div className="profile-avatar-container">
                <div className="avatar-glow"></div>
                <div className="avatar-inner">
                   <img 
                     src={profileImage || profileLogoPath} 
                     alt="Neural Profile" 
                     className="w-100 h-100 object-fit-cover rounded-circle transition-all shadow-lg"
                     onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = profileLogoPath; }}
                   />
                </div>
              </div>
              <button 
                className="avatar-edit-btn"
                onClick={handlePhotoClick}
                title="Modify Neural Profile Photo"
              >
                <Camera size={16} />
              </button>
            </div>

            <div className="d-flex flex-column gap-2 text-center text-md-start">
               <h4 className="m-0 text-white fw-black text-uppercase tracking-wider">Neural Architect Profile</h4>
               <p className="text-white opacity-50 small mb-3 leading-relaxed">Update your core identity parameters and communication channels.</p>
               <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                  <Button 
                    className="btn-gold-shimmer px-4 py-2 small fw-black tracking-widest text-uppercase"
                    onClick={handlePhotoClick}
                  >
                    UPDATE PHOTO
                  </Button>
                  <Button 
                    variant="link" 
                    className="text-danger text-uppercase fw-black tracking-widest small text-decoration-none opacity-80 hover-opacity-100 d-flex align-items-center gap-2"
                    onClick={handlePurgeCache}
                  >
                    <RotateCw size={14} /> PURGE CACHE
                  </Button>
               </div>
            </div>
          </div>

          <Form onSubmit={handleSave}>
            <Row className="g-4">
              {[
                { name: 'fullName', label: 'Registered Identity', icon: <User size={14} /> },
                { name: 'email', label: 'Neural Signature (Email)', icon: <Zap size={14} />, type: 'email' },
                { name: 'phone', label: 'Communication Node', icon: <Edit3 size={14} /> },
                { name: 'dob', label: 'Chronological Birth', icon: <Calendar size={14} />, type: 'date' },
                { name: 'location', label: 'Geo-Location Node', icon: <Edit3 size={14} /> },
                { name: 'language', label: 'Interface Language', icon: <Zap size={14} /> }
              ].map((field, idx) => (
                <Col lg={4} md={6} key={idx}>
                  <Form.Group className="neural-form-group">
                    <Form.Label className="neural-label">
                       {field.icon}
                       <span>{field.label}</span>
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control 
                        type={field.type || 'text'} 
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        onBlur={() => validateField(field.name, formData[field.name])}
                        className={`neural-input ${errors[field.name] ? 'is-invalid-neural' : ''}`} 
                      />
                      {errors[field.name] && (
                        <div className="neural-error-feedback">
                           <AlertCircle size={10} className="me-1" />
                           {errors[field.name]}
                        </div>
                      )}
                    </div>
                  </Form.Group>
                </Col>
              ))}
              
              <Col lg={12} className="mt-4">
                  <div className="p-4 rounded-4 bg-gold bg-opacity-5 border border-gold border-opacity-10 d-flex align-items-center gap-3">
                     <Info size={18} className="text-gold" />
                     <p className="m-0 small text-white opacity-60 italic leading-relaxed">
                        Real-time encryption is active. Your data is processed through the P2B Privacy Layer.
                     </p>
                  </div>
              </Col>
            </Row>

            <div className="d-flex justify-content-center justify-content-md-end gap-3 mt-5 pt-3">
               <Button 
                variant="link" 
                onClick={handleDiscard}
                className="text-white text-decoration-none fw-black text-uppercase tracking-widest small opacity-40 hover-gold transition-all"
               >
                  <X size={18} className="me-2" /> DISCARD CHANGES
               </Button>
               <Button 
                type="submit"
                disabled={isSaving}
                className="btn-gold-shimmer px-5 py-3 d-flex align-items-center fw-black text-uppercase tracking-widest shadow-lg"
               >
                  {isSaving ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2 text-dark" style={{ borderWidth: '2px' }} />
                      ENCRYPTING...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="me-2" /> AUTHORIZE IDENTITY UPDATE
                    </>
                  )}
               </Button>
            </div>
          </Form>
        </motion.div>

        {/* METRICS ROW */}
        <Row className="g-4 mb-5">
           <Col lg={8}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="neural-card p-4 p-md-5 h-100 position-relative"
              >
                <div className="d-flex justify-content-between align-items-center mb-5">
                   <div className="d-flex align-items-center gap-3">
                      <Activity size={20} className="text-gold" />
                      <h5 className="m-0 text-white fw-black text-uppercase tracking-wider">Neural Insights Tracker</h5>
                   </div>
                   <div className="d-flex gap-2">
                      <span className="heatmap-control active tracking-widest">ANNUAL</span>
                      <span className="heatmap-control tracking-widest">MONTHLY</span>
                   </div>
                </div>

                <div className="heatmap-wrapper mb-4">
                  <div className="heatmap-grid-core">
                    {heatmapCells.map((cell, i) => (
                      <div key={i} className={`neural-cell intensity-${cell.val}`} title={`${cell.date}: ${cell.count} Invocations`}></div>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-auto pt-4 border-top border-white border-opacity-5">
                   <span className="text-white opacity-40 small fw-bold tracking-widest">{totalInvocations} INVOCATIONS IN <span className="text-gold">CYBER_YEAR 2025</span></span>
                   <div className="d-flex align-items-center gap-2">
                      <span className="tiny-label opacity-30 text-uppercase tracking-tighter">LESS</span>
                      <div className="d-flex gap-1">
                         <div className="neural-cell intensity-0 small-cell"></div>
                         <div className="neural-cell intensity-1 small-cell"></div>
                         <div className="neural-cell intensity-2 small-cell"></div>
                         <div className="neural-cell intensity-3 small-cell"></div>
                         <div className="neural-cell intensity-4 small-cell"></div>
                      </div>
                      <span className="tiny-label opacity-30 text-uppercase tracking-tighter">MORE</span>
                   </div>
                </div>
              </motion.div>
           </Col>

           <Col lg={4}>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="neural-card p-4 p-md-5 h-100"
              >
                <div className="d-flex align-items-center gap-3 mb-5">
                  <History size={20} className="text-gold" />
                  <h5 className="m-0 text-white fw-black text-uppercase tracking-wider">Insight Vault</h5>
                </div>

                <div className="vault-list d-flex flex-column gap-3 mb-5">
                  {vaultReports.length > 0 ? vaultReports.map((item, i) => (
                    <div key={i} className="vault-item d-flex align-items-center justify-content-between">
                       <div className="ps-3 border-start border-gold border-2">
                          <div className="text-white small fw-black tracking-wide mb-1 uppercase">{item.title}</div>
                          <div className="text-white opacity-40 tiny-label tracking-widest uppercase">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()} • COMPLETED</div>
                       </div>
                        <div className="d-flex align-items-center gap-2">
                           <Button 
                             className="vault-btn font-black"
                             onClick={() => handleOpenReport(item.id)}
                           >
                             OPEN
                           </Button>
                           <Button 
                             variant="link"
                             className="text-danger p-2 opacity-50 hover-opacity-100 transition-all"
                             onClick={() => handleDeleteReport(item.id)}
                             title="Delete Report"
                           >
                             <Trash2 size={16} />
                           </Button>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-4 opacity-30 small italic uppercase tracking-widest">No Insights Vaulted Yet</div>
                    )}
                  </div>

                  <Button variant="outline-gold" className="w-100 py-3 rounded-4 fw-black text-uppercase tracking-widest small">
                    ACCESS COMPLETE HISTORY
                  </Button>
                </motion.div>
             </Col>
          </Row>
        </Container>

        {/* REPORT VIEWING OVERLAY */}
        <AnimatePresence>
          {isReportOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="report-overlay"
            >
              <div className="report-overlay-header p-4 d-flex justify-content-between align-items-center">
                <Button 
                  variant="link" 
                  onClick={() => setIsReportOpen(false)}
                  className="text-gold text-decoration-none fw-black tracking-widest d-flex align-items-center gap-2"
                >
                  <ArrowLeft size={20} /> EXIT REPORT VAULT
                </Button>
                <div className="pulse-dot"></div>
              </div>
              
              <div className="report-content-scroll">
                <P2BReport 
                  data={selectedReportData} 
                  loading={loadingReport} 
                  onChatOpen={onChatWithReport ? () => onChatWithReport(selectedReportData) : null}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');

        .neural-identity-wrapper {
          background: radial-gradient(circle at 20% 30%, #1e4d4a 0%, #0d2120 100%);
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
          color: white;
          padding-top: 60px;
          padding-bottom: 100px;
        }

        .protocol-font { letter-spacing: -1px; }
        .fw-black { font-weight: 900; }
        .text-gold { color: #c9a66b !important; }
        .uppercase { text-transform: uppercase; }
        .tracking-wider { letter-spacing: 2px; }
        .tracking-widest { letter-spacing: 3px; }
        .tracking-tighter { letter-spacing: -2px; }

        .neural-card {
          background: linear-gradient(145deg, rgba(61, 90, 90, 0.8), rgba(40, 60, 60, 0.6));
          backdrop-filter: blur(25px);
          border: 1px solid rgba(201, 166, 107, 0.15);
          border-radius: 45px;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4);
        }

        .identity-badge {
          background: rgba(201, 166, 107, 0.1);
          border: 1px solid rgba(201, 166, 107, 0.3);
          box-shadow: 0 0 25px rgba(201, 166, 107, 0.1);
        }

        .profile-avatar-container {
          width: 140px; height: 140px;
          border-radius: 50%;
          border: 1px solid rgba(201, 166, 107, 0.4);
          padding: 10px;
          position: relative;
          background: rgba(201, 166, 107, 0.05);
        }

        .avatar-inner {
          width: 100%; height: 100%;
          background: #0d2120;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 30px rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .avatar-glow {
          position: absolute; top: -10px; left: -10px; right: -10px; bottom: -10px;
          background: radial-gradient(circle, rgba(201, 166, 107, 0.15) 0%, transparent 75%);
          border-radius: 50%;
        }

        .avatar-edit-btn {
          position: absolute; bottom: 8px; right: 8px;
          width: 38px; height: 38px;
          background: #c9a66b;
          border: none; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #0d2120;
          box-shadow: 0 5px 15px rgba(0,0,0,0.4);
          transition: 0.3s;
          z-index: 5;
        }
        .avatar-edit-btn:hover { background: #fff; transform: scale(1.15) rotate(15deg); }

        .btn-gold-shimmer {
          background: #c9a66b !important;
          border: none !important;
          border-radius: 12px !important;
          color: #1a3c3a !important;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          box-shadow: 0 8px 15px rgba(201, 166, 107, 0.2);
        }
        .btn-gold-shimmer:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 15px 30px rgba(201, 166, 107, 0.4);
          background: #fff !important;
        }

        .neural-label { 
          font-size: 10px; font-weight: 900; color: #c9a66b;
          margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px;
          display: flex; align-items: center; gap: 10px;
          opacity: 0.8;
        }

        .neural-input {
          background: rgba(0, 0, 0, 0.3) !important;
          border: 1px solid rgba(201, 166, 107, 0.15) !important;
          border-radius: 16px !important;
          color: #fff !important;
          padding: 16px 20px !important;
          font-size: 15px !important;
          font-weight: 500 !important;
          transition: 0.3s !important;
        }
        .neural-input:focus {
          background: rgba(201, 166, 107, 0.08) !important;
          border-color: #c9a66b !important;
          box-shadow: 0 0 20px rgba(201, 166, 107, 0.15) !important;
        }

        .is-invalid-neural {
          border-color: rgba(239, 68, 68, 0.6) !important;
          background: rgba(239, 68, 68, 0.05) !important;
        }

        .neural-error-feedback {
          position: absolute; bottom: -20px; left: 4px;
          color: #ef4444; font-size: 10px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1px;
        }

        .heatmap-grid-core {
          display: grid;
          grid-template-columns: repeat(30, 1fr);
          gap: 6px;
        }
        .neural-cell {
          aspect-ratio: 1/1;
          background: rgba(201, 166, 107, 0.05);
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.02);
        }
        .small-cell { width: 14px; border-radius: 3px; }
        .intensity-1 { background: rgba(201, 166, 107, 0.2); }
        .intensity-2 { background: rgba(201, 166, 107, 0.4); }
        .intensity-3 { background: rgba(201, 166, 107, 0.7); }
        .intensity-4 { background: #c9a66b; box-shadow: 0 0 10px rgba(201, 166, 107, 0.3); }

        .heatmap-control {
          font-size: 10px; font-weight: 900; padding: 6px 16px;
          border-radius: 30px; cursor: pointer; opacity: 0.3; transition: 0.3s;
          border: 1px solid rgba(201, 166, 107, 0.3);
          color: white;
        }
        .heatmap-control.active {
          opacity: 1; background: #c9a66b; color: #1a3c3a; border-color: #c9a66b;
        }

        .vault-item {
          background: rgba(201, 166, 107, 0.03);
          padding: 22px;
          border-radius: 25px;
          border: 1px solid rgba(201, 166, 107, 0.1);
        }
        .vault-item:hover { border-color: #c9a66b; background: rgba(201, 166, 107, 0.08); transform: scale(1.02); }

        .vault-btn {
          background: transparent !important; border: 1.5px solid rgba(201, 166, 107, 0.4) !important;
          color: #c9a66b !important; font-size: 10px !important; font-weight: 900 !important;
          padding: 8px 20px !important; border-radius: 12px !important; transition: 0.3s !important;
        }
        .vault-btn:hover { background: #c9a66b !important; color: #1a3c3a !important; border-color: #c9a66b !important; }

        .btn-outline-gold {
          border: 1.5px solid rgba(201, 166, 107, 0.4) !important;
          color: #c9a66b !important;
          transition: 0.3s;
          border-radius: 16px !important;
        }
        .btn-outline-gold:hover { background: rgba(201, 166, 107, 0.1) !important; border-color: #c9a66b !important; }

        .pulse-dot {
          width: 8px; height: 8px; background: #c9a66b; border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

        .leading-relaxed { line-height: 1.8; }
        .tiny-label { font-size: 10px; font-weight: 900; }
        .transition-all { transition: all 0.3s; }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.6) sepia(1) saturate(5) hue-rotate(20deg);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .heatmap-grid-core { grid-template-columns: repeat(15, 1fr); }
          .neural-card { border-radius: 35px; }
        }

        .report-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(13, 33, 32, 0.95);
          backdrop-filter: blur(20px);
          z-index: 9999;
          display: flex;
          flex-direction: column;
        }

        .report-overlay-header {
          background: rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(201, 166, 107, 0.1);
        }

        .report-content-scroll {
          flex: 1;
          overflow-y: auto;
          padding-bottom: 100px;
        }

        .report-content-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .report-content-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .report-content-scroll::-webkit-scrollbar-thumb {
          background: #c9a66b;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default PersonalInformation;