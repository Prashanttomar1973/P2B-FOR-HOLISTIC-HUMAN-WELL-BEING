import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { RefreshCw, Search } from 'lucide-react';
import DynamicTutorialViewer from './DynamicTutorialViewer';

const CATEGORIES = [
  "Clinical Psychology",
  "Developmental Psychology",
  "Social Psychology",
  "Physiological Psychology",
  "Abnormal Psychology",
  "Fundamentals"
];

const DynamicExplorePsychology = () => {
  const [tutorials, setTutorials] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Clinical Psychology");
  const [activeItemIdx, setActiveItemIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTutorials = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/tutorials');
      setTutorials(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch tutorials:", err);
      setError("P2B Database Connection Offline.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  // Filter tutorials by category
  const filteredTutorials = useMemo(() => {
    return tutorials.filter(t => (t.tutorial_metadata.category || "Fundamentals") === activeCategory);
  }, [tutorials, activeCategory]);

  const activeTutorial = filteredTutorials[activeItemIdx];

  return (
    <div className="pry-explorer-root min-vh-100 d-flex flex-column p-4 overflow-hidden">
      {/* --- PRY MAIN HEADER --- */}
      <header className="pry-header d-flex justify-content-center align-items-center mb-3">
        <h2 className="m-0 fw-black tracking-tight text-uppercase">Explore Psychology PRY</h2>
      </header>

      {/* --- PRY TOP TABS --- */}
      <nav className="pry-tabs d-flex justify-content-between mb-3">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat}
            className={`pry-tab-box flex-grow-1 mx-1 d-flex align-items-center justify-content-center cursor-pointer ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(cat);
              setActiveItemIdx(0);
            }}
          >
            <span className="small fw-black text-center">{cat}</span>
          </div>
        ))}
      </nav>

      {/* --- PRY WORKSPACE --- */}
      <div className="pry-workspace d-flex flex-grow-1 overflow-hidden">
        
        {/* SIDEBAR: MODULE LIST */}
        <div className="pry-sidebar d-flex flex-column me-3">
          <div className="pry-sidebar-header d-flex align-items-center justify-content-center mb-1">
            <span className="small fw-black text-uppercase">{activeCategory}</span>
          </div>
          
          <div className="pry-sidebar-scroller flex-grow-1 overflow-auto">
            {loading ? (
              <div className="p-3 text-center small text-white opacity-40">Scanning...</div>
            ) : filteredTutorials.length === 0 ? (
              <div className="p-3 text-center small text-white opacity-40">No Records Found</div>
            ) : (
              filteredTutorials.map((item, idx) => (
                <div
                  key={item.id}
                  className={`pry-module-box mb-2 p-2 d-flex align-items-center justify-content-center text-center cursor-pointer ${activeItemIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveItemIdx(idx)}
                >
                  <span className="small fw-bold text-uppercase">{item.tutorial_metadata.topic_name}</span>
                </div>
              ))
            )}
            {/* Fillers for empty look */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="pry-module-box mb-2 empty" />
            ))}
            <div className="pry-footer-end text-center mt-3">
              <span className="small opacity-20 fw-bold">End of Directory</span>
            </div>
          </div>
        </div>

        {/* CONTENT PANEL: MAIN CANVAS */}
        <main className="pry-content-panel flex-grow-1 p-4 position-relative overflow-auto">
           {loading ? (
             <div className="h-100 d-flex align-items-center justify-content-center opacity-20">
                <RefreshCw size={48} className="animate-spin" />
             </div>
           ) : error ? (
             <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center">
                <span className="fw-black text-danger mb-2">CRITICAL DATA LOSS</span>
                <p className="small opacity-50 m-0">{error}</p>
             </div>
           ) : (
             <DynamicTutorialViewer data={activeTutorial} />
           )}
        </main>
      </div>

      <style>{`
        .pry-explorer-root {
          background-color: #1a3333;
          font-family: 'Arial', sans-serif;
          color: black;
          height: 100vh;
        }

        /* HEADER */
        .pry-header {
          background-color: #f5d5b8;
          border: 3px solid black;
          height: 60px;
          min-height: 60px;
        }
        .pry-header h2 {
          letter-spacing: 2px;
          font-weight: 900;
        }

        /* TABS */
        .pry-tabs {
          height: 50px;
          min-height: 50px;
        }
        .pry-tab-box {
          background-color: #1a3333;
          color: white;
          border: 3px solid black;
          padding: 10px;
          transition: all 0.2s;
          border-left-width: 3px;
        }
        .pry-tab-box:hover {
          background-color: #2a4d4d;
        }
        .pry-tab-box.active {
          border-color: #e74c3c !important;
          background-color: #1a3333;
          position: relative;
          z-index: 2;
          border-width: 4px;
        }
        .pry-tab-box span {
          line-height: 1.1;
          font-size: 14px;
          letter-spacing: 0.5px;
        }

        /* WORKSPACE */
        .pry-sidebar {
          width: 250px;
          min-width: 250px;
        }
        .pry-sidebar-header {
          background-color: #2ecc71;
          border: 3px solid black;
          height: 40px;
          min-height: 40px;
        }
        .pry-sidebar-header span { font-weight: 900; letter-spacing: 1px; }

        .pry-module-box {
          background-color: white;
          border: 3px solid black;
          height: 50px;
          min-height: 50px;
          padding: 5px;
          transition: transform 0.1s;
        }
        .pry-module-box.empty { background-color: transparent; border-color: rgba(255,255,255,0.1); opacity: 0.5; }
        .pry-module-box:not(.empty):hover { transform: scale(1.02); }
        .pry-module-box.active {
           background-color: #2ecc71;
           box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
        }
        .pry-module-box span { font-size: 10px; line-height: 1.1; font-weight: 800; }

        .pry-content-panel {
          background-color: #f5d5b8;
          border: 4px solid black;
          box-shadow: 10px 10px 0px rgba(0,0,0,0.2);
        }

        .pry-sidebar-scroller::-webkit-scrollbar { width: 5px; }
        .pry-sidebar-scroller::-webkit-scrollbar-track { background: transparent; }
        .pry-sidebar-scroller::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.5); }

        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }
        
        .cursor-pointer { cursor: pointer; }
        .fw-black { font-weight: 900; }
      `}</style>
    </div>
  );
};

export default DynamicExplorePsychology;
