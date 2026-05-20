import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { User, LogOut, Shield, Key, Trash2, ChevronRight, LayoutGrid, Sparkles, UserCircle } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const P2BLayout = ({ onStartSession, onAboutClick, onHomeClick, onRecommendationClick, onPersonalInfoClick, onChangePasswordClick, onPrivacySecurityClick, onDeleteAccountClick, onAuthClick }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Profile Sync State
  const [userName, setUserName] = useState('Prashant Tomar');
  const [userEmail, setUserEmail] = useState('techoftrack@gmail.com');
  const [userPhoto, setUserPhoto] = useState(null);

  const syncProfile = () => {
    const savedUser = localStorage.getItem('p2b_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        setUserName(u.name || u.fullName || 'Prashant Tomar');
        setUserEmail(u.email || 'techoftrack@gmail.com');
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
    const savedPhoto = localStorage.getItem('p2b_profile_photo');
    // Sanitize to prevent "null" or "undefined" strings from breaking the image src
    setUserPhoto(savedPhoto && savedPhoto !== 'null' && savedPhoto !== 'undefined' ? savedPhoto : null);
  };

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    syncProfile();
    window.addEventListener('scroll', controlNavbar);
    window.addEventListener('storage', syncProfile);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
      window.removeEventListener('storage', syncProfile);
    };
  }, [lastScrollY]);

  const websiteLogoPath = "/Logo_for_P2B_ (1).JPG"; 
  const profileLogoPath = "/user.png";

  return (
    <div style={{ position: 'relative' }}>
      {/* Modern Typography & Animation Reset */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap');

        body, html {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
        }

        .navbar-ultimate {
          background: rgba(229, 213, 184, 0.7) !important;
          backdrop-filter: blur(24px) saturate(180%) !important;
          WebkitBackdropFilter: blur(24px) saturate(180%) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .nav-link-ultimate {
          font-family: 'Outfit', sans-serif;
          color: #1a3c3a !important;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.8px;
          padding: 8px 20px !important;
          position: relative;
          transition: all 0.3s ease;
          border-radius: 10px;
          margin: 0 4px;
        }

        .nav-link-ultimate:hover {
          background: rgba(26, 60, 58, 0.05);
          color: #000 !important;
          transform: translateY(-1px);
        }

        .nav-link-ultimate::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          width: 0;
          height: 2px;
          background: #c9a66b;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .nav-link-ultimate:hover::after {
          width: 24px;
        }

        .start-session-btn {
          background: linear-gradient(135deg, #1a3c3a 0%, #2a5a58 100%) !important;
          border: none !important;
          border-radius: 50px !important;
          font-family: 'Outfit', sans-serif !important;
          font-weight: 800 !important;
          font-size: 12px !important;
          padding: 10px 24px !important;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(26, 60, 58, 0.3);
          transition: all 0.4s ease !important;
          letter-spacing: 0.5px;
        }

        .start-session-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          30% { left: 150%; }
          100% { left: 150%; }
        }

        .start-session-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 25px rgba(26, 60, 58, 0.4);
        }

        .logo-ultimate-container {
          transition: all 0.4s ease;
        }

        .logo-ultimate-container:hover {
          transform: scale(1.05) rotate(-2deg);
        }

        .dropdown-ultimate {
          animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(0,0,0,0.05) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15) !important;
          border-radius: 24px !important;
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .menu-option-ultimate {
          border-radius: 14px;
          transition: all 0.2s ease;
        }

        .menu-option-ultimate:hover {
          background: #f8fafc;
          transform: translateX(5px);
        }

        .menu-option-danger:hover {
          background: #fff1f2;
          color: #e11d48 !important;
        }
      `}</style>

      <Navbar 
        expand="lg" 
        className={`py-0 px-0 navbar-ultimate ${visible ? '' : 'hide-nav'}`}
        style={{ 
          height: '64px',
          zIndex: 1000,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <Container fluid className="px-lg-5">
          <Navbar.Brand 
            className="p-0 m-0 d-flex align-items-center" 
            onClick={onHomeClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex align-items-center gap-3 logo-ultimate-container">
              <div style={{ 
                width: '42px', height: '42px', 
                background: '#fff', 
                borderRadius: '14px', 
                overflow: 'hidden', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <img
                  src={websiteLogoPath}
                  alt="P2B Logo"
                  style={{ width: '85%', height: '85%', objectFit: 'contain' }}
                />
              </div>
              <div className="d-none d-sm-block">
                <h1 style={{ 
                  fontFamily: 'Outfit',
                  color: '#1a3c3a', 
                  fontSize: '24px', 
                  fontWeight: '900',
                  margin: 0,
                  lineHeight: 1,
                  fontStyle: 'italic'
                }}>P2B</h1>
                <p style={{ 
                  margin: 0, 
                  fontSize: '9px', 
                  fontWeight: '700', 
                  color: '#c9a66b', 
                  letterSpacing: '1.5px', 
                  textTransform: 'uppercase',
                  opacity: 0.9
                }}>Platform of Balance</p>
              </div>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            className="border-0 shadow-none p-2"
          >
            <LayoutGrid size={24} color="#1a3c3a" />
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center gap-1 py-4 py-lg-0">
              <Nav.Link onClick={onHomeClick} className="nav-link-ultimate">HOME</Nav.Link>
              <Nav.Link onClick={onAboutClick} className="nav-link-ultimate">ABOUT US</Nav.Link>
              <Nav.Link onClick={onRecommendationClick} className="nav-link-ultimate">RESOURCES</Nav.Link>
              
              <Button 
                onClick={onStartSession}
                className="ms-lg-4 start-session-btn d-flex align-items-center gap-2"
              >
                <Sparkles size={16} />
                START SESSION
              </Button>

              <div className="ms-lg-4 mt-3 mt-lg-0">
                <div 
                  onClick={() => setShowSettings(!showSettings)}
                  style={{ 
                    width: '38px', height: '38px', 
                    borderRadius: '50%', 
                    border: '2px solid rgba(26, 60, 58, 0.1)', 
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', 
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    background: '#fff'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1a3c3a'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(26, 60, 58, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <img 
                    src={userPhoto || profileLogoPath} 
                    alt="User" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = profileLogoPath; }}
                  />
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Account Hub Dropdown */}
      {showSettings && (
        <div className="dropdown-ultimate" style={{
          position: 'fixed', 
          top: '72px', 
          right: '40px', 
          zIndex: 2000, 
          width: '320px', 
          padding: '28px', 
        }}>
          <div className="text-center mb-4">
            <div style={{ 
              width: '72px', height: '72px', 
              borderRadius: '24px', 
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              overflow: 'hidden', 
              margin: '0 auto 16px',
              padding: '4px'
            }}>
              <img 
                src={userPhoto || profileLogoPath} 
                alt="User" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '18px' }} 
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = profileLogoPath; }}
              />
            </div>
            <h5 className="mb-1 fw-bold" style={{ color: '#1a3c3a', fontFamily: 'Outfit' }}>{userName}</h5>
            <p className="text-muted small mb-0" style={{ fontSize: '13px' }}>{userEmail}</p>
          </div>
          
          <div className="d-flex flex-column gap-1">
            <MenuOption icon={<UserCircle size={18}/>} text="Profile Dashboard" onClick={() => { onPersonalInfoClick(); setShowSettings(false); }} />
            <MenuOption icon={<Key size={18}/>} text="Security Access" onClick={() => { onChangePasswordClick(); setShowSettings(false); }} />
            <MenuOption icon={<Shield size={18}/>} text="Privacy & Data" onClick={() => { onPrivacySecurityClick(); setShowSettings(false); }} />
            <div style={{ height: '1px', background: '#f1f5f9', margin: '12px 0' }} />
            <MenuOption icon={<LogOut size={18}/>} text="Sign Out" isDanger onClick={() => { onAuthClick(); setShowSettings(false); }} />
            <MenuOption icon={<Trash2 size={18}/>} text="Delete Account" isDanger onClick={() => { onDeleteAccountClick(); setShowSettings(false); }} />
          </div>
        </div>
      )}
    </div>
  );
};

const MenuOption = ({ icon, text, onClick, isDanger = false }) => (
  <div 
    className={`d-flex align-items-center justify-content-between py-2 px-3 menu-option-ultimate ${isDanger ? 'menu-option-danger' : ''}`}
    onClick={onClick}
    style={{ 
      cursor: 'pointer', 
      color: isDanger ? '#e11d48' : '#334155'
    }}
  >
    <div className="d-flex align-items-center gap-3">
      <div style={{ color: isDanger ? 'inherit' : '#64748b' }}>{icon}</div>
      <span className="fw-semibold" style={{ fontSize: '14px' }}>{text}</span>
    </div>
    <ChevronRight size={14} opacity={0.3} />
  </div>
);

export default P2BLayout;