import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { LogIn, LogOut, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

// Google Client ID is now loaded from .env file
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "761502021813-2eic56n8vrf1k57cd26u3ghura3sm7qk.apps.googleusercontent.com";

const AccountSettingsAuth = ({ externalControl = false, show = false, onHide = () => {}, isLoggedIn: externalLoggedIn = false }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(externalLoggedIn);
  const [showModalInternal, setShowModalInternal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setFullName('');
    setConfirmPassword('');
  };

  const modalOpen = externalControl ? show : showModalInternal;
  const setModalOpen = (val) => externalControl ? onHide(val) : setShowModalInternal(val);

  // Sync with external state if needed
  useEffect(() => {
    if (externalControl) {
      setIsLoggedIn(externalLoggedIn);
    }
  }, [externalLoggedIn, externalControl]);

  const handleGoogleResponse = async (response) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:8080/api/auth/google', {
        idToken: response.credential
      }, { withCredentials: true });

      localStorage.setItem('p2b_user', JSON.stringify(res.data));
      setIsLoggedIn(true);
      setModalOpen(false);
      window.location.reload();
    } catch (err) {
      setError("Google Login verification failed on backend. " + (err.response?.data || ""));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /* global google */
    const initGoogle = () => {
      if (typeof google !== 'undefined' && GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes("REPLACE_WITH_YOUR_ACTUAL")) {
        try {
          google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            use_fedcm_for_prompt: true
          });
          
          // Render the actual Google button for better reliability
          const googleBtnContainer = document.getElementById('google-button-div');
          if (googleBtnContainer) {
            google.accounts.id.renderButton(
              googleBtnContainer,
              { theme: "outline", size: "large", width: "100%", text: "continue_with" }
            );
          }
        } catch (err) {
          console.error("Google Init Error:", err);
          setError("Google Login Origin Mismatch: Ensure you are using http://localhost:5173 and it is authorized in your Google Cloud Console.");
        }
      }
    };

    // Retry once if script hasn't loaded yet
    initGoogle();
    const timer = setTimeout(initGoogle, 2000);
    return () => clearTimeout(timer);
  }, [modalOpen]);

  const handleGoogleSignInFallback = () => {
    if (typeof google !== 'undefined') {
      if (GOOGLE_CLIENT_ID.includes("REPLACE_WITH_YOUR_ACTUAL")) {
        setError("Configuration Required: Please add your Google Client ID to the .env file.");
        return;
      }
      google.accounts.id.prompt();
    } else {
      setError("Google script not loaded. Check your internet connection or index.html.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const loginData = { email, password };
    
    // JSON Payload Guard: Ensure it's a plain object (Fixes JsonToken.START_ARRAY errors)
    if (typeof loginData !== 'object' || Array.isArray(loginData)) {
      setError("Internal Error: Invalid login data format.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', loginData, { withCredentials: true });

      localStorage.setItem('p2b_user', JSON.stringify(response.data));
      setIsLoggedIn(true);
      setModalOpen(false);
      window.location.reload(); // Reload to sync state across App.jsx
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please check your credentials or create a new account.");
      } else {
        setError(err.response?.data || "Login failed. Please check if your Spring Boot server is running on port 8080.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/auth/signup',
        { email, password, fullName },
        { withCredentials: true }
      );
      // Auto-login after successful signup
      const loginRes = await axios.post('http://localhost:8080/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem('p2b_user', JSON.stringify(loginRes.data));
      setIsLoggedIn(true);
      setModalOpen(false);
      window.location.reload();
    } catch (err) {
      setError(err.response?.data || 'Signup failed. Email may already be registered.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="account-settings-container">
      {/* 1. Toggle Button (Sidebar/Menu Item) */}
      {!externalControl && (
        <div className="p-2">
          <div 
            className={`auth-sidebar-item d-flex align-items-center gap-3 p-3 rounded-4 cursor-pointer transition-all ${isLoggedIn ? 'logout-mode' : 'login-mode'}`}
            onClick={() => isLoggedIn ? setIsLoggedIn(false) : setModalOpen(true)}
          >
            <div className="icon-box shadow-sm">
              {isLoggedIn ? <LogOut size={18} color="#ff4d4d" /> : <LogIn size={18} color="#a020f0" />}
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold small m-0 text-white">{isLoggedIn ? 'Logout' : 'Sign In'}</div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Exactly Matched Modal from Screenshot (333) */}
      <Modal 
        show={modalOpen} 
        onHide={() => setModalOpen(false)} 
        centered 
        contentClassName="custom-dark-modal border-0"
      >
        <Modal.Body className="p-5 position-relative">
          {/* Close Button */}
          <button className="btn-close-custom" onClick={() => setModalOpen(false)}>&times;</button>

          <div className="text-center mb-4">
            <h2 className="modal-title-auth fw-bold">{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
          </div>

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <Form onSubmit={handleLoginSubmit}>
              {error && <Alert variant="danger" className="py-2 small text-center">{error}</Alert>}

              <Form.Group className="mb-3">
                <InputGroup className="auth-input-group">
                  <InputGroup.Text className="bg-transparent border-0 text-muted ps-3">
                    <span style={{ fontSize: '1.2rem' }}>@</span>
                  </InputGroup.Text>
                  <Form.Control type="email" placeholder="Email Address" className="auth-field py-2"
                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-2">
                <InputGroup className="auth-input-group">
                  <InputGroup.Text className="bg-transparent border-0 text-muted ps-3">
                    <Lock size={18} />
                  </InputGroup.Text>
                  <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" className="auth-field py-2"
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <Button variant="link" className="text-muted pe-3 border-0" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <div className="text-end mb-4">
                <a href="#" className="forgot-link small text-decoration-none">Forgot Password?</a>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="btn-auth-gradient w-100 py-2 rounded-3 fw-bold mb-3" type="submit" disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In'}
              </motion.button>

              <div className="text-center mb-4">
                <span className="create-account-link small" style={{ cursor: 'pointer' }}
                  onClick={() => switchMode('signup')}>
                  New user? <span className="text-purple fw-semibold">Create account</span>
                </span>
              </div>

              <div className="or-divider mb-4"><span>or</span></div>
              <div id="google-button-div" className="w-100 mb-3" style={{ minHeight: '40px' }}></div>
              <p className="terms-text text-center mt-4 text-muted mx-auto">
                By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </p>
            </Form>
          )}

          {/* SIGNUP FORM */}
          {mode === 'signup' && (
            <Form onSubmit={handleSignupSubmit}>
              {error && <Alert variant="danger" className="py-2 small text-center">{error}</Alert>}
              {success && <Alert variant="success" className="py-2 small text-center">{success}</Alert>}

              {/* Full Name */}
              <Form.Group className="mb-3">
                <InputGroup className="auth-input-group">
                  <InputGroup.Text className="bg-transparent border-0 text-muted ps-3">
                    <span style={{ fontSize: '1rem' }}>👤</span>
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Full Name" className="auth-field py-2"
                    value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </InputGroup>
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <InputGroup className="auth-input-group">
                  <InputGroup.Text className="bg-transparent border-0 text-muted ps-3">
                    <span style={{ fontSize: '1.2rem' }}>@</span>
                  </InputGroup.Text>
                  <Form.Control type="email" placeholder="Email Address" className="auth-field py-2"
                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                </InputGroup>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <InputGroup className="auth-input-group">
                  <InputGroup.Text className="bg-transparent border-0 text-muted ps-3">
                    <Lock size={18} />
                  </InputGroup.Text>
                  <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" className="auth-field py-2"
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <Button variant="link" className="text-muted pe-3 border-0" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </InputGroup>
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-4">
                <InputGroup className="auth-input-group">
                  <InputGroup.Text className="bg-transparent border-0 text-muted ps-3">
                    <Lock size={18} />
                  </InputGroup.Text>
                  <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" className="auth-field py-2"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </InputGroup>
              </Form.Group>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="btn-auth-gradient w-100 py-2 rounded-3 fw-bold mb-3" type="submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </motion.button>

              <div className="text-center mb-2">
                <span className="create-account-link small" style={{ cursor: 'pointer' }}
                  onClick={() => switchMode('login')}>
                  Already have an account? <span className="text-purple fw-semibold">Sign in</span>
                </span>
              </div>
              <p className="terms-text text-center mt-3 text-muted mx-auto">
                By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </p>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <style>{`
        /* Sidebar Item */
        .auth-sidebar-item { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); }
        .auth-sidebar-item:hover { background: rgba(160, 32, 240, 0.1); }
        .icon-box { background: rgba(0,0,0,0.3); padding: 8px; border-radius: 10px; }

        /* Modal Core Styling (Based on Screenshot 333) */
        .custom-dark-modal {
          background: #111111 !important;
          border-radius: 20px !important;
          color: white;
        }

        .modal-title-auth {
          background: linear-gradient(to right, #a020f0, #00d2ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn-close-custom {
          position: absolute; top: 15px; right: 20px;
          background: none; border: none; color: #555; font-size: 1.5rem;
        }

        /* Input Fields */
        .auth-input-group {
          background: #1a1a1a;
          border-radius: 12px;
          border: 1px solid #333;
          overflow: hidden;
        }
        .auth-field {
          background: transparent !important;
          border: none !important;
          color: white !important;
          font-size: 0.9rem;
        }
        .auth-field::placeholder { color: #666; }

        /* Links & Buttons */
        .forgot-link, .create-account-link { color: #a020f0; transition: 0.3s; }
        .text-purple { color: #a020f0; font-weight: 600; }
        
        .btn-auth-gradient {
          background: linear-gradient(90deg, #a020f0 0%, #0066ff 100%);
          border: none; color: white;
        }

        .or-divider {
          display: flex; align-items: center; text-align: center; color: #555;
        }
        .or-divider::before, .or-divider::after {
          content: ''; flex: 1; border-bottom: 1px solid #333;
        }
        .or-divider span { padding: 0 10px; font-size: 0.8rem; }

        .google-btn { background: transparent; border-radius: 10px; color: #ccc; }
        
        .terms-text { font-size: 0.65rem; max-width: 80%; }
        .terms-text a { color: #a020f0; text-decoration: none; }
      `}</style>
    </div>
  );
};

export default AccountSettingsAuth;