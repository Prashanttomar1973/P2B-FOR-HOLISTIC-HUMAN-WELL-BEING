import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Badge, Nav } from 'react-bootstrap';
import { 
  Send, Plus, Brain, Activity, 
  Compass, Menu, Trash2, Settings, Share2, ChevronLeft,
  Sparkles, Zap, MessageSquare, Terminal, Shield
} from 'lucide-react';
import axios from 'axios';

const P2BChatbot = ({ reportContext, aiContent, onBack, sessionId, setSessionId, messages, setMessages }) => {
  const [activeDomain, setActiveDomain] = useState('Psychology');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState('');
  const [sessions, setSessions] = useState([]);
  // Track if this sessionId has already been added to the sidebar list
  // We use sessionId itself as the key so navigating away and back doesn't add a duplicate
  const sessionStarted = useRef(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('p2b_user') || '{}');
      const userId = savedUser.id || 'Guest_User';
      const response = await axios.get(`http://localhost:8080/api/chat?userId=${userId}`);
      const loaded = response.data.map(log => {
        // Clean up titles that look like JSON form data
        let displayTitle = 'Neural Link';
        if (log.userQuery) {
          if (log.userQuery.startsWith('{') && log.userQuery.includes('fullName')) {
            displayTitle = "Neural Matrix Analysis";
          } else {
            displayTitle = log.userQuery.substring(0, 25) + (log.userQuery.length > 25 ? '...' : '');
          }
        }

        return {
          id: log.id,
          sessionId: log.sessionId,
          title: displayTitle,
          date: new Date(log.sessionTimestamp || Date.now()).toLocaleDateString(),
          userQuery: log.userQuery || 'No Query',
          aiResponse: log.aiResponse || 'No Response',
          messages: log.messages || [],
          timestamp: new Date(log.sessionTimestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      });
      setSessions(loaded.reverse());
    } catch (e) {
      console.error("Failed to load chat sessions", e);
    }
  };
  // messages state lifted to App.jsx
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, isTyping]);

  const handlePlusClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileMessage = {
        sender: 'USER',
        text: `📎 Uploading intelligence file: ${file.name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fileMessage]);
      console.log("File ready for processing:", file.name);
    }
  };

  const startNewChat = () => {
    const newId = `sess-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStarted.current = false;  // allow next message to add a new sidebar entry
    setSessionId(newId);
    setMessages([{ 
      sender: 'P2B', 
      text: `Neural link established for ${activeDomain}. Systems operational.`, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    fetchSessions();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'USER',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);

    // Only add ONE sidebar entry per unique sessionId (first message of a NEW session)
    if (!sessionStarted.current) {
      sessionStarted.current = true;
      const newEntry = {
        id: sessionId,           // use stable sessionId as key — prevents duplicates
        sessionId: sessionId,
        title: input.substring(0, 25) + (input.length > 25 ? '...' : ''),
        date: new Date().toLocaleDateString(),
        userQuery: input,
        aiResponse: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messages: []
      };
      // Only prepend if not already present (guard against strict-mode double-invoke)
      setSessions(prev => prev.some(s => s.sessionId === sessionId) ? prev : [newEntry, ...prev]);
    }

    setInput('');
    setIsTyping(true);

    try {
      const savedUser = JSON.parse(localStorage.getItem('p2b_user') || '{}');
      const userId = savedUser.id ? String(savedUser.id) : 'Guest_User';
      const payload = { 
        context: {
          userAnswers: reportContext,
          generatedReport: aiContent
        }, 
        history: messages.filter(m => m.sender !== 'P2B' || messages.indexOf(m) !== 0), // skip welcome msg
        userQuery: input, 
        activeDomain,
        sessionId,   // ties all messages in this conversation to one backend document
        userId
      };
      const response = await axios.post("http://localhost:8080/api/chat", payload);

      // Backend returns { reply: "..." } — handle both shapes defensively
      const replyText = response.data?.reply 
        || response.data?.aiResponse 
        || response.data?.message 
        || (typeof response.data === 'string' ? response.data : 'Neural signal received.');
      
      setMessages(prev => [...prev, {
        sender: 'P2B',
        text: replyText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      // Do NOT call fetchSessions() here — that was creating a new entry per message
    } catch (error) {
      setMessages(prev => [...prev, { 
        sender: 'P2B', 
        text: "Neural signal interrupted. Re-synchronize and try again.", 
        time: 'Error' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatNeuralText = (text) => {
    if (!text) return text;
    const trimmed = text.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const data = JSON.parse(trimmed);
        if (data.summary) {
          return (
            <div className="neural-formatted-msg">
              <h6 style={{ color: 'var(--gold-accent)', fontWeight: '800', marginBottom: '15px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Intelligence Summary</h6>
              <p className="mb-2" style={{ fontSize: '14px' }}><strong style={{ color: 'rgba(255,255,255,0.6)' }}>STATUS:</strong> {data.summary.status_check}</p>
              <p className="mb-3" style={{ fontSize: '14px' }}><strong style={{ color: 'rgba(255,255,255,0.6)' }}>IMBALANCE:</strong> {data.summary.core_imbalance}</p>
              {data.main_body?.analysis && (
                <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="mb-1" style={{ fontSize: '13px' }}><strong style={{ color: 'var(--gold-accent)' }}>DOMAIN:</strong> {data.main_body.analysis.suggested_domain}</p>
                  <p className="mb-0 opacity-75" style={{ fontSize: '12px', fontStyle: 'italic' }}>{data.main_body.analysis.logic_justification}</p>
                </div>
              )}
            </div>
          );
        }
        return <pre style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>;
      } catch (e) {
        return text;
      }
    }
    return text;
  };

  const deleteSession = async (id, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:8080/api/chat/${id}`);
      setSessions(sessions.filter(s => s.id !== id));
    } catch (err) {
      console.error("Failed to delete session", err);
    }
  };

  const handleSessionClick = (session) => {
    // Helper: detect if a message content is raw JSON form-data (not real chat)
    const isRawJson = (text) => text && typeof text === 'string' && text.trim().startsWith('{') && text.includes('=');

    // Restore full conversation history from the messages array stored in the session
    if (session.messages && session.messages.length > 0) {
      const history = session.messages
        .filter(m => m.role && m.role !== 'system')          // strip system prompts
        .filter(m => !isRawJson(m.content))                  // strip raw JSON form data entries
        .map(m => ({
          sender: m.role === 'user' ? 'USER' : 'P2B',
          text: m.content || '',
          time: session.timestamp || ''
        }));

      if (history.length > 0) {
        setMessages(history);
      } else {
        // All messages were system/JSON — fall back to top-level fields
        const fallback = [];
        if (session.userQuery && !isRawJson(session.userQuery)) {
          fallback.push({ sender: 'USER', text: session.userQuery, time: session.timestamp || '' });
        }
        if (session.aiResponse) {
          fallback.push({ sender: 'P2B', text: session.aiResponse, time: session.timestamp || '' });
        }
        setMessages(fallback.length > 0 ? fallback : [
          { sender: 'P2B', text: 'Neural link restored. No readable history found. Start a new query.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      }
    } else {
      // No messages array — use top-level query/response fields directly
      const fallback = [];
      if (session.userQuery && !isRawJson(session.userQuery)) {
        fallback.push({ sender: 'USER', text: session.userQuery, time: session.timestamp || '' });
      }
      if (session.aiResponse) {
        fallback.push({ sender: 'P2B', text: session.aiResponse, time: session.timestamp || '' });
      }
      setMessages(fallback.length > 0 ? fallback : [
        { sender: 'P2B', text: 'Neural link restored. Continue your query.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }
    // Resume sending future messages in this same session
    if (session.sessionId) setSessionId(session.sessionId);
    sessionStarted.current = true; // don't add a new sidebar entry on next send
  };

  return (
    <div className="p2b-dashboard-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&display=swap');

        :root {
          --deep-emerald: #0d2120;
          --vibrant-green: #1a3c3a;
          --gold-accent: #c9a66b;
          --soft-sand: #e5d5b8;
          --glass-bg: rgba(13, 33, 32, 0.7);
        }

        .p2b-dashboard-container {
          height: 100%;
          background: radial-gradient(circle at 20% 30%, #1e4d4a 0%, #0d2120 100%);
          font-family: 'Outfit', sans-serif;
          color: var(--soft-sand);
          overflow: hidden;
          display: flex;
        }

        /* SIDEBAR STYLES */
        .ultimate-sidebar {
          background: rgba(13, 33, 32, 0.85);
          backdrop-filter: blur(40px) saturate(150%);
          border-right: 1px solid rgba(201, 166, 107, 0.1);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          z-index: 100;
        }
        .ultimate-sidebar.open { width: 300px; }
        .ultimate-sidebar.collapsed { width: 88px; }

        .sidebar-brand {
          height: 80px;
          padding: 0 24px;
          border-bottom: 1px solid rgba(201, 166, 107, 0.1);
        }

        .domain-nav { padding: 20px 12px; }
        .domain-pill {
          color: rgba(229, 213, 184, 0.6);
          padding: 14px 18px;
          border-radius: 18px;
          margin-bottom: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          text-decoration: none !important;
          border: 1px solid transparent;
        }
        .domain-pill:hover {
          background: rgba(255,255,255,0.03);
          color: #fff;
        }
        .domain-pill.active {
          background: rgba(201, 166, 107, 0.1);
          color: var(--gold-accent) !important;
          border: 1px solid rgba(201, 166, 107, 0.2);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .history-section {
          padding: 20px 20px;
          overflow-y: auto;
          flex-grow: 1;
        }
        .history-item {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 12px 16px;
          margin-bottom: 12px;
          transition: 0.3s;
          cursor: pointer;
        }
        .history-item:hover {
          background: rgba(255,255,255,0.05);
          transform: translateX(4px);
          border-color: var(--gold-accent);
        }

        /* MAIN CHAT AREA */
        .ultimate-main {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .ultimate-header {
          height: 80px;
          background: rgba(13, 33, 32, 0.6);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(201, 166, 107, 0.1);
          padding: 0 40px;
        }

        .chat-container {
          flex-grow: 1;
          padding: 40px;
          overflow-y: auto;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(201, 166, 107, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(26, 188, 156, 0.03) 0%, transparent 40%);
        }

        .msg-reveal {
          animation: revealMsg 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes revealMsg {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .bubble-ai {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(201, 166, 107, 0.15);
          border-radius: 24px 24px 24px 4px;
          padding: 20px;
          max-width: 80%;
          color: #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          position: relative;
        }
        
        .bubble-user {
          background: linear-gradient(135deg, #1e4d4a 0%, #0d2120 100%);
          border-radius: 24px 24px 4px 24px;
          padding: 20px;
          max-width: 80%;
          color: var(--soft-sand);
          font-weight: 500;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid rgba(201, 166, 107, 0.1);
        }

        /* INPUT AREA */
        .ultimate-input-container {
          padding: 30px 40px;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
        }

        .crystalline-input {
          background: rgba(13, 33, 32, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(201, 166, 107, 0.15);
          border-radius: 24px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        .crystalline-input:focus-within {
          border-color: var(--gold-accent);
          background: rgba(13, 33, 32, 0.8);
          box-shadow: 0 10px 50px rgba(201, 166, 107, 0.15);
        }

        .input-text {
          background: transparent !important;
          border: none !important;
          color: #fff !important;
          font-size: 15px;
          font-weight: 400;
          padding: 12px 10px !important;
          font-family: 'Outfit', sans-serif;
        }
        .input-text::placeholder { color: rgba(229, 213, 184, 0.4); }

        .shimmer-send {
          background: var(--gold-accent);
          width: 44px;
          height: 44px;
          border-radius: 16px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(201, 166, 107, 0.3);
        }
        .shimmer-send::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 3s infinite;
        }
        .shimmer-send:hover {
          transform: translateY(-2px) scale(1.05);
          filter: brightness(1.15);
        }

        /* SCROLLBAR */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(201, 166, 107, 0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(201, 166, 107, 0.2); }
      `}</style>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileUpload}
      />

      {/* 1. SIDEBAR */}
      <aside className={`ultimate-sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header d-flex align-items-center justify-content-between sidebar-brand">
          <div className="d-flex align-items-center gap-2 overflow-hidden">
             <div style={{ minWidth: '32px', height: '32px', background: 'var(--gold-accent)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={18} color="#0d2120" strokeWidth={3} />
             </div>
             {isSidebarOpen && <span style={{ fontFamily: 'Outfit', fontWeight: '800', fontSize: '1.2rem', color: '#fff' }}>P2B CORE</span>}
          </div>
          <button className="bg-transparent border-0 text-muted p-0" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="mt-4 px-3">
          <Button onClick={startNewChat} style={{ 
            background: isSidebarOpen ? 'linear-gradient(90deg, #1a3c3a, #2a5a58)' : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            height: '54px'
          }} className="w-100 d-flex align-items-center justify-content-center gap-2 text-white fw-bold">
            <Plus size={20} /> {isSidebarOpen && "Initialize Matrix"}
          </Button>
        </div>

        <Nav className="flex-column domain-nav gap-2">
          {[
            { id: 'Biology', icon: Activity },
            { id: 'Psychology', icon: Brain },
            { id: 'Philosophy', icon: Compass }
          ].map(domain => (
            <Nav.Link 
              key={domain.id}
              onClick={() => setActiveDomain(domain.id)}
              className={`domain-pill ${activeDomain === domain.id ? 'active' : ''}`}
            >
              <domain.icon size={22} />
              {isSidebarOpen && <span className="ms-3 fw-bold" style={{ fontSize: '14px' }}>{domain.id}</span>}
            </Nav.Link>
          ))}
        </Nav>

        {isSidebarOpen && (
          <div className="history-section">
            <p style={{ fontSize: '10px', fontWeight: '800', color: 'var(--gold-accent)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', opacity: 0.7 }}>Recent Neural Links</p>
            {sessions.map(s => (
              <div key={s.id} className="history-item d-flex align-items-center justify-content-between" onClick={() => handleSessionClick(s)}>
                <div className="overflow-hidden">
                  <p className="m-0 text-truncate fw-bold" style={{ fontSize: '13px', color: '#fff' }}>{s.title}</p>
                  <p className="m-0 opacity-50 fw-medium" style={{ fontSize: '10px' }}>{s.date}</p>
                </div>
                <Trash2 size={14} className="text-muted" onClick={(e) => deleteSession(s.id, e)} />
              </div>
            ))}
          </div>
        )}

        <div className="p-4 d-flex align-items-center justify-content-between border-top border-secondary border-opacity-10">
          <Settings size={20} className="text-muted cursor-pointer" />
          {isSidebarOpen && <span className="fw-bold opacity-30" style={{ fontSize: '9px', letterSpacing: '2px' }}>CORE V3.0</span>}
          <Shield size={20} className="text-muted cursor-pointer" />
        </div>
      </aside>

      {/* 2. MAIN CHAT INTERFACE */}
      <main className="ultimate-main">
        
        <header className="ultimate-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-4">
             <div className="d-flex flex-column">
                <h4 style={{ fontFamily: 'Outfit', fontWeight: '800', margin: 0, color: '#fff', fontSize: '1.4rem' }}>Neural Interface</h4>
                <div className="d-flex align-items-center gap-2">
                  <Terminal size={12} className="text-muted" />
                  <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--gold-accent)' }}>{activeDomain} Domain Sync</span>
                </div>
             </div>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <div className="d-none d-md-flex align-items-center gap-2 px-3 py-1.5 rounded-pill" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ffa2', boxShadow: '0 0 10px #00ffa2' }}></div>
               <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '1px' }}>SYSTEM OPTIMAL</span>
            </div>
            <Button variant="outline-light" style={{ borderRadius: '12px', padding: '8px 20px', fontWeight: '800', fontSize: '12px' }} onClick={onBack}>TERMINAL EXIT</Button>
          </div>
        </header>

        <div className="chat-container">
          {messages.map((msg, i) => (
            <div key={i} className={`d-flex mb-5 msg-reveal ${msg.sender === 'USER' ? 'justify-content-end' : 'justify-content-start'}`}>
              <div className={msg.sender === 'USER' ? 'bubble-user' : 'bubble-ai'}>
                <div className="d-flex justify-content-between align-items-center mb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', marginBottom: '12px' }}>
                  <div className="d-flex align-items-center gap-2">
                    {msg.sender === 'P2B' ? <Brain size={14} color="var(--gold-accent)" /> : <MessageSquare size={14} color="#fff" />}
                    <span style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px', color: msg.sender === 'P2B' ? 'var(--gold-accent)' : '#fff' }}>{msg.sender} UNIT</span>
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: '700', opacity: 0.5 }}>{msg.time}</span>
                </div>
                <div style={{ margin: 0, lineHeight: '1.7', fontSize: '15px' }}>
                  {formatNeuralText(msg.text)}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="d-flex align-items-center gap-3 ms-2 mb-5 opacity-75">
               <div className="d-flex gap-1">
                  <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--gold-accent)', borderRadius: '50%', animation: 'bounce 1.4s infinite' }}></div>
                  <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--gold-accent)', borderRadius: '50%', animation: 'bounce 1.4s infinite 0.2s' }}></div>
                  <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--gold-accent)', borderRadius: '50%', animation: 'bounce 1.4s infinite 0.4s' }}></div>
               </div>
               <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold-accent)' }}>AI Synthesizing Intelligence...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="ultimate-input-container">
          <div className="crystalline-input">
            <button className="bg-transparent border-0 text-muted p-2 me-2" onClick={handlePlusClick}>
              <Plus size={24} />
            </button>
            <Form.Control 
              className="input-text shadow-none"
              placeholder={`Query the P2B ${activeDomain} intelligence...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="shimmer-send ms-3" onClick={handleSend} disabled={!input.trim()}>
              <Send size={20} color="#0d2120" strokeWidth={3} />
            </button>
          </div>
          <p style={{ margin: '15px 0 0 0', textAlign: 'center', fontSize: '9px', fontWeight: '800', letterSpacing: '2px', opacity: 0.3, textTransform: 'uppercase' }}>
            Neural Link Secured • Personal Biological & Psychological Interface
          </p>
        </div>
      </main>

      <style>{`
        @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-8px); } }
        @keyframes shimmer { 0% { left: -100%; } 30% { left: 150%; } 100% { left: 150%; } }
      `}</style>
    </div>
  );
};

export default P2BChatbot;