import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dna, Brain, Users, Activity, AlertCircle, 
  Sparkles, Shield, Zap, Info, ArrowRight,
  Terminal, HelpCircle, ShieldCheck,
  Menu, X, ChevronRight, Globe
} from 'lucide-react';

const PSYCHOLOGY_DATA = {
  "Clinical Psychology": { "icon": <AlertCircle size={20} />, "color": "#ff4d4d", "items": [] },
  "Developmental Psychology": { "icon": <Activity size={20} />, "color": "#e67e22", "items": [] },
  "Social Psychology": { "icon": <Users size={20} />, "color": "#3498db", "items": [] },
  "Physiological Psychology": { "icon": <Zap size={20} />, "color": "#9b59b6", "items": [] },
  "Abnormal Psychology": { "icon": <Brain size={20} />, "color": "#f1c40f", "items": [] },
  "Fundamentals": { "icon": <Globe size={20} />, "color": "#2ecc71", "items": [] }
};

const PsychologySchematic = ({ detail }) => {
  if (!detail) return null;

  return (
    <div className="schematic-canvas-pry">
      {/* TOP HEADER BOX */}
      <div className="schematic-header-box-pry border-pry mb-3">
        <div className="header-cell-pry">
          <span className="label-tag-pry">TOPIC_NAME</span>
          <span className="label-value-pry">{detail.tutorial_metadata.topic_name}</span>
        </div>
        <div className="header-cell-pry">
          <span className="label-tag-pry">DIFFICULTY_LEVEL</span>
          <span className="label-value-pry">{detail.tutorial_metadata.difficulty_level}</span>
        </div>
        <div className="header-cell-pry">
          <span className="label-tag-pry">ESTIMATED_READING_TIME</span>
          <span className="label-value-pry">{detail.tutorial_metadata.estimated_reading_time}</span>
        </div>
        <div className="header-cell-pry">
          <span className="label-tag-pry">LAST_UPDATED</span>
          <span className="label-value-pry">{detail.tutorial_metadata.last_updated}</span>
        </div>
      </div>

      {/* SECTION 1: SPECIFICATIONS */}
      <div className="schematic-section-pry p-3 mb-3">
        <h6 className="section-label-pry mb-3">SECTION_1_INTRODUCTION_THE_WHAT</h6>
        <div className="nested-box-pry border-pry p-3">
          <div className="data-field-pry mb-2">
            <span className="data-key-pry">FORMAL_DEFINITION</span>
            <p className="data-content-pry">{detail.section_1_introduction_the_what.formal_definition}</p>
          </div>
          <div className="data-field-pry mb-2">
            <span className="data-key-pry">SIMPLIFIED_CONCEPT_ANALOGY</span>
            <p className="data-content-pry italic">"{detail.section_1_introduction_the_what.simplified_concept_analogy}"</p>
          </div>
          <div className="data-field-pry mb-2">
            <span className="data-key-pry">HISTORICAL_TIMELINE</span>
            <div className="d-flex gap-2 flex-wrap mt-1">
              {detail.section_1_introduction_the_what.historical_timeline?.map((event, i) => (
                <span key={i} className="tech-badge-pry">{event}</span>
              ))}
            </div>
          </div>
          <div className="data-field-pry mb-2">
            <span className="data-key-pry">CORE_ARCHITECTURE_DIAGRAM_DESCRIPTION</span>
            <p className="data-content-pry">{detail.section_1_introduction_the_what.core_architecture_diagram_description}</p>
          </div>
          <div className="data-field-pry">
            <span className="data-key-pry">KEY_CHARACTERISTICS</span>
            <ul className="data-list-pry mt-1">
              {detail.section_1_introduction_the_what.key_characteristics_list?.map((char, i) => (
                <li key={i}>{char}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 2: INDUSTRIAL DYNAMICS */}
      <div className="schematic-section-pry p-3 mb-3">
        <h6 className="section-label-pry mb-3">SECTION_2_ESSENTIALS_THE_WHY</h6>
        <div className="nested-box-pry border-pry p-3">
          <div className="row g-3">
            <div className="col-md-6 border-end border-dark">
              <div className="data-field-pry mb-3">
                <span className="data-key-pry">REAL_WORLD_USE_CASES</span>
                <div className="d-flex gap-2 flex-wrap mt-1">
                  {detail.section_2_essentials_the_why.real_world_use_cases?.map((use, i) => (
                    <span key={i} className="tech-badge-pry">{use}</span>
                  ))}
                </div>
              </div>
              <div className="data-field-pry">
                <span className="data-key-pry">INDUSTRY_RELEVANCE_AND_JOBS</span>
                <ul className="data-list-pry mt-1">
                  {detail.section_2_essentials_the_why.industry_relevance_and_jobs?.map((job, i) => (
                    <li key={i}>{job}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="data-field-pry mb-3">
                <span className="data-key-pry">PROS_AND_CONS_COMPARISON_TABLE</span>
                <div className="comparison-grid-pry mt-2 border-pry">
                  <div className="grid-header-pry p-1 border-bottom bg-dark text-white text-center small">COMPARATIVE ANALYSIS</div>
                  <div className="row g-0">
                    <div className="col-12 col-sm-6 border-end p-2">
                      <span className="grid-sublabel-pry d-block mb-1">ADVANTAGES</span>
                      {detail.section_2_essentials_the_why.pros_and_cons_comparison_table.advantages?.map((adv, i) => (
                        <div key={i} className="grid-item-pry mb-1">+ {adv}</div>
                      ))}
                    </div>
                    <div className="col-12 col-sm-6 p-2">
                      <span className="grid-sublabel-pry d-block mb-1 text-danger">LIMITATIONS</span>
                      {detail.section_2_essentials_the_why.pros_and_cons_comparison_table.limitations?.map((lim, i) => (
                        <div key={i} className="grid-item-pry mb-1">- {lim}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="data-field-pry">
                <span className="data-key-pry">ETHICAL_CONSIDERATIONS</span>
                <p className="data-content-pry caution-text-pry mt-1">{detail.section_2_essentials_the_why.ethical_considerations}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: CORE IMPLEMENTATION */}
      <div className="schematic-section-pry p-3 mb-3">
        <h6 className="section-label-pry mb-3">SECTION_3_CORE_IMPLEMENTATION_THE_HOW</h6>
        <div className="nested-box-pry border-pry p-3">
          <div className="row mb-3">
            <div className="col-md-6 border-end border-dark">
              <span className="data-key-pry">PREREQUISITES_KNOWLEDGE</span>
              <ul className="data-list-pry mt-1">
                {detail.section_3_core_implementation_the_how.prerequisites_knowledge?.map((pre, i) => (
                  <li key={i}>{pre}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-6 px-3">
              <span className="data-key-pry">ENVIRONMENT_SETUP_OR_TOOLS_REQUIRED</span>
              <ul className="data-list-pry mt-1">
                {detail.section_3_core_implementation_the_how.environment_setup_or_tools_required?.map((tool, i) => (
                  <li key={i}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="data-field-pry mb-3">
            <span className="data-key-pry">STEP_BY_STEP_MECHANISM</span>
            <div className="sequence-box-pry border-pry mt-2">
              {detail.section_3_core_implementation_the_how.step_by_step_mechanism?.map((step, i) => (
                <div key={i} className="sequence-item-pry p-2 border-bottom">
                  <div className="d-flex gap-2">
                    <span className="step-num-pry">{step.step_number}</span>
                    <span className="process-name-pry">{step.process_name}</span>
                  </div>
                  <p className="step-desc-pry p-1 m-0">{step.technical_explanation}</p>
                  {step.visual_reference_link && (
                    <span className="link-tag-pry">LINK: {step.visual_reference_link}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="data-field-pry mb-3">
            <span className="data-key-pry">SYNTAX_OR_FORMULAS_BOX</span>
            <div className="logic-box-pry border-pry mt-2 p-2">
              <div className="logic-header-pry p-1 bg-dark text-white mb-2 font-monospace uppercase" style={{fontSize: '10px'}}>PRIMARY_LOGIC</div>
              <code className="logic-code-pry d-block p-2 mb-2 text-center">{detail.section_3_core_implementation_the_how.syntax_or_formulas_box.primary_logic}</code>
              <div className="logic-explanation-pry">
                <span className="grid-sublabel-pry d-block mb-1">LINE_BY_LINE_EXPLANATION</span>
                {detail.section_3_core_implementation_the_how.syntax_or_formulas_box.line_by_line_explanation?.map((exp, i) => (
                  <div key={i} className="grid-item-pry mb-1">[{i + 1}] {exp}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="data-field-pry">
            <span className="data-key-pry">COMMON_ERRORS_AND_TROUBLESHOOTING</span>
            <ul className="data-list-pry mt-1 troubleshooting-list-pry">
              {detail.section_3_core_implementation_the_how.common_errors_and_troubleshooting?.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 4: PRACTICE AND PROJECTS */}
      <div className="schematic-section-pry p-3">
        <h6 className="section-label-pry mb-3">SECTION_4_PRACTICE_AND_PROJECTS_APPLICATION</h6>
        <div className="nested-box-pry border-pry p-3">
          <div className="row g-3">
            <div className="col-md-7 border-end border-dark">
              <div className="data-field-pry mb-4">
                <span className="data-key-pry">HANDS_ON_EXERCISES</span>
                {detail.section_4_practice_and_projects_application.hands_on_exercises?.map((ex, i) => (
                  <div key={i} className="exercise-card-pry border-pry p-2 mt-2">
                    <p className="data-content-pry fw-bold mb-1">Q: {ex.question}</p>
                    <div className="d-flex justify-content-between align-items-center opacity-50 italic">
                      <span>Hint: {ex.hint}</span>
                      {ex.solution_link && <span className="small">SOL: {ex.solution_link}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="data-field-pry">
                <span className="data-key-pry">MINI_PROJECT_GUIDE</span>
                <div className="project-box-pry border-pry mt-2">
                  <div className="project-title-box-pry p-1 bg-dark text-gold text-center fw-black uppercase" style={{fontSize: '11px'}}>
                    {detail.section_4_practice_and_projects_application.mini_project_guide.project_title}
                  </div>
                  <div className="p-2">
                    <p className="data-content-pry small italic mb-2">OBJECTIVE: {detail.section_4_practice_and_projects_application.mini_project_guide.objective}</p>
                    <ul className="data-list-pry">
                      {detail.section_4_practice_and_projects_application.mini_project_guide.step_wise_instructions?.map((inst, i) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 px-3">
              <div className="data-field-pry mb-4">
                <span className="data-key-pry">INTERVIEW_PREPARATION_QUESTIONS</span>
                <ul className="data-list-pry mt-1">
                  {detail.section_4_practice_and_projects_application.interview_preparation_questions?.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
              <div className="data-field-pry">
                <span className="data-key-pry">GLOSSARY_CHEAT_SHEET</span>
                <div className="glossary-grid-pry border-pry mt-2">
                  {Object.entries(detail.section_4_practice_and_projects_application.glossary_cheat_sheet || {}).map(([term, def], i) => (
                    <div key={i} className="glossary-item-pry p-1 border-bottom">
                      <span className="fw-black small d-block uppercase">{term}</span>
                      <span className="small opacity-60 font-monospace" style={{ fontSize: '10px' }}>{def}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER NAVIGATION */}
      <div className="schematic-footer-pry border-pry p-2 mt-3 d-flex justify-content-between align-items-center bg-dark text-white opacity-90">
        <div className="label-field-pry text-start">
          <span className="label-tag-pry opacity-40">PREVIOUS_TOPIC_LINK</span>
          <span className="label-value-pry small">{detail.footer_navigation?.previous_topic_link || "NIL"}</span>
        </div>
        <div className="label-field-pry text-center">
          <span className="label-tag-pry opacity-40">SUGGESTED_READING</span>
          <div className="d-flex gap-2">
            {detail.footer_navigation?.suggested_reading?.map((book, i) => (
              <span key={i} className="label-value-pry small border-bottom border-secondary">{book}</span>
            ))}
          </div>
        </div>
        <div className="label-field-pry text-end">
          <span className="label-tag-pry opacity-40">NEXT_TOPIC_LINK</span>
          <span className="label-value-pry small">{detail.footer_navigation?.next_topic_link || "NIL"}</span>
        </div>
      </div>
    </div>
  );
};

const ExplorePsychology = () => {
    const [tutorials, setTutorials] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Clinical Psychology");
    const [activeItemIdx, setActiveItemIdx] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTutorials = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/tutorials');
                setTutorials(response.data);
            } catch (error) {
                console.error("P2B Sync Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTutorials();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
            if (window.innerWidth < 992) setSidebarOpen(false);
            else setSidebarOpen(true);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredItems = tutorials.filter(t => {
        const meta = t.tutorial_metadata || {};
        const dbCat = (meta.category || t.category || meta.sub_category || t.sub_category || "").trim().toLowerCase();
        const topicName = (meta.topic_name || "").trim().toLowerCase();
        const topicId = (meta.topic_id || "").trim().toLowerCase();
        const active = activeCategory.trim().toLowerCase();
        
        // Define other specific categories for Psychology
        const otherSpecificCats = ["clinical psychology", "developmental psychology", "social psychology", "physiological psychology", "abnormal psychology"];
        
        const normalizedDb = dbCat.replace(/&/g, 'and').replace(/[^a-z0-9]/g, '');
        const normalizedActive = active.replace(/&/g, 'and').replace(/[^a-z0-9]/g, '');
        
        // 1. Direct match for the active category (Checking Category, Topic Name, and Topic ID prefix)
        const isDirectMatch = 
          normalizedDb.includes(normalizedActive) || 
          normalizedActive.includes(normalizedDb) || 
          topicName.includes(active) ||
          topicId.startsWith(active.substring(0, 3)) ||
          (active.includes("abnormal") && (topicId.startsWith("abn") || topicName.includes("disorder") || topicName.includes("mental") || topicName.includes("therapy"))) ||
          (active.includes("physiological") && (topicId.startsWith("phy") || topicId.startsWith("neu") || topicName.includes("brain") || topicName.includes("nervous") || topicName.includes("biological"))) ||
          (active.includes("social") && (topicId.startsWith("soc") || topicName.includes("group") || topicName.includes("behavior") || topicName.includes("interaction"))) ||
          (active.includes("clinical") && (topicId.startsWith("cli") || topicName.includes("counseling") || topicName.includes("treatment") || topicName.includes("diagnos"))) ||
          (active.includes("developmental") && (
            topicId.startsWith("dev") || topicId.startsWith("dep") || 
            topicId.startsWith("dvp") || topicId.startsWith("dvl") || 
            topicId.startsWith("chi") || topicId.startsWith("psy-dev") ||
            topicName.includes("child") || topicName.includes("growth") || 
            topicName.includes("lifespan") || topicName.includes("piaget") || 
            topicName.includes("erikson") || topicName.includes("kohlberg") || 
            topicName.includes("attachment") || topicName.includes("infan") ||
            topicName.includes("adolescen") || topicName.includes("vygotsky") ||
            topicName.includes("moral") || topicName.includes("cognitive stages")
          )); 

        if (isDirectMatch) return true;

        // 2. FUNDAMENTALS CATCH-ALL
        if (active === "fundamentals") {
            const matchesOther = otherSpecificCats.some(other => {
                const normOther = other.replace(/[^a-z0-9]/g, '');
                const otherShort = other.toLowerCase().substring(0, 3);
                return normalizedDb.includes(normOther) || normOther.includes(normalizedDb) || topicName.includes(other.toLowerCase()) || topicId.startsWith(otherShort);
            });
            return !matchesOther;
        }
        
        return false;
    });

    const displayItems = filteredItems.slice(0, 10);
    const activeDetail = displayItems[activeItemIdx];

  return (
    <div className="psych-pry-root min-vh-100 d-flex flex-column overflow-hidden position-relative">

      {/* PRY HEADER */}
      <header className="pry-header d-flex align-items-center justify-content-between px-4">
        <div className="d-flex align-items-center gap-3">
          <div className="pry-logo-box">
            <div className="pulse-indicator"></div>
            <Brain color="white" size={22} />
          </div>
          <div className="d-flex flex-column">
            <h5 className="m-0 fw-black text-white text-uppercase" style={{ letterSpacing: '-1px' }}>Explore Psychology</h5>
            <span className="opacity-30 fw-bold font-monospace" style={{ fontSize: '9px' }}>PROTOCOL_SEQUENCE_MGR_v4.2</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 d-none d-md-flex">
          <div className="pry-status-box px-3 py-1">
            <span className="small text-white opacity-50 fw-bold">NETWORK STATUS: <span className="text-active-pry">ONLINE</span></span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="pry-avatar-box">P2B</div>
            <div>
              <span className="d-block opacity-30 fw-black font-monospace" style={{ fontSize: '8px' }}>IDENTITY_SIG</span>
              <span className="small text-white fw-bold">PSYCHOLOGY_CORE_ENGINE</span>
            </div>
          </div>
        </div>

        {isMobile && (
          <button className="pry-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </header>

      {/* PRY TOP NAV */}
      <nav className="pry-top-nav px-4 d-flex align-items-center overflow-auto">
        <div className="d-flex gap-1 py-2">
          {Object.keys(PSYCHOLOGY_DATA).map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`cat-tab-btn-pry d-flex align-items-center gap-2 px-3 py-2 ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => { setActiveCategory(cat); setActiveItemIdx(0); if (isMobile) setSidebarOpen(false); }}
            >
              <span style={{ opacity: activeCategory === cat ? 1 : 0.4 }}>
                {React.cloneElement(PSYCHOLOGY_DATA[cat].icon, { size: 14 })}
              </span>
              <span className="cat-label-pry">{cat}</span>
              {activeCategory === cat && (
                <motion.div layoutId="pry-nav-active" className="pry-nav-indicator" />
              )}
            </motion.button>
          ))}
        </div>
      </nav>

      <div className="pry-divider"></div>

      {/* MAIN WORKSPACE */}
      <div className="explorer-main-pry flex-grow-1 d-flex position-relative overflow-hidden">

        {/* SIDEBAR */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -330, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -330, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pry-sidebar h-100 flex-shrink-0 d-flex flex-column"
            >
              <div className="pry-sidebar-inner-header p-3 d-flex align-items-center justify-content-between">
                <span className="small fw-black text-uppercase opacity-40 font-monospace" style={{ fontSize: '10px', letterSpacing: '2px' }}>Content Index</span>
                <ShieldCheck size={14} className="opacity-20" />
              </div>

              <div className="pry-sidebar-scroll flex-grow-1 overflow-auto p-2">
                {loading ? (
                  <div className="p-4 text-center opacity-40 font-monospace small">SYNCING_DATA...</div>
                ) : displayItems.length === 0 ? (
                  <div className="p-4 text-center opacity-40 font-monospace small">NO_RECORDS_FOUND</div>
                ) : (
                  displayItems.map((item, idx) => (
                    <motion.div
                      key={item.tutorial_metadata.topic_name || idx}
                      whileHover={{ scale: 1.01 }}
                      className={`module-card-pry mb-2 p-3 position-relative cursor-pointer ${activeItemIdx === idx ? 'active' : ''}`}
                      onClick={() => { setActiveItemIdx(idx); if (isMobile) setSidebarOpen(false); }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <span className="opacity-20 fw-black font-monospace" style={{ fontSize: '9px' }}>#{String(idx + 1).padStart(2, '0')}</span>
                        {activeItemIdx === idx && <div className="pry-active-dot" />}
                      </div>
                      <div className="pry-card-title fw-black text-white mb-1">{item.tutorial_metadata.topic_name}</div>
                      <div className="pry-card-desc opacity-40 text-truncate">{item.section_1_introduction_the_what.formal_definition}</div>
                      {activeItemIdx === idx && (
                        <motion.div layoutId="pry-side-glow" className="pry-sidebar-glow-indicator" />
                      )}
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-3 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="opacity-20 fw-black font-monospace" style={{ fontSize: '9px' }}>END_OF_CATALOGUE</span>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* SCHEMATIC CANVAS */}
        <main className="content-area-pry flex-grow-1 overflow-auto p-3 p-md-4 position-relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="spinner-border text-active-pry" role="status"></div>
              </div>
            ) : activeDetail ? (
              <motion.div
                key={`${activeCategory}-${activeItemIdx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <PsychologySchematic detail={activeDetail} />
              </motion.div>
            ) : (
              <div className="h-100 d-flex align-items-center justify-content-center opacity-30">
                <span className="fw-black tracking-widest text-white">DATA_VACUUM_DETECTED</span>
              </div>
            )}
          </AnimatePresence>

          <div className="pry-anchor anchor-tr">ACTIVE_CELL</div>
          <div className="pry-anchor anchor-br">SYNC_LOCK_88</div>
        </main>
      </div>

      <style>{`
        .psych-pry-root {
          background: #061817;
          font-family: Arial, sans-serif;
          color: white;
          font-size: 16px;
        }

        /* Responsive Font Sizes & Overlap Prevention */
        :root {
          --fs-tag: clamp(0.65rem, 0.6vw, 0.75rem);
          --fs-value: clamp(0.85rem, 0.9vw, 1rem);
          --fs-content: clamp(0.88rem, 1vw, 1.05rem);
          --fs-header: clamp(0.75rem, 0.7vw, 0.85rem);
          --fs-code: clamp(0.9rem, 1.1vw, 1.2rem);
        }

        /* HEADER */
        .pry-header {
          height: auto;
          min-height: 68px;
          padding: 10px 20px;
          background: #040f0e;
          border-bottom: 1px solid rgba(0, 139, 139, 0.2);
          flex-shrink: 0;
          z-index: 110;
        }
        .pry-logo-box {
          position: relative;
          width: 40px; height: 40px;
          background: #004d4d;
          border: 1px solid rgba(0, 139, 139, 0.3);
          display: flex; align-items: center; justify-content: center;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .pulse-indicator {
          position: absolute; top: -4px; right: -4px;
          width: 8px; height: 8px;
          background: #00ffff;
          border-radius: 50%;
          border: 2px solid #040f0e;
          animation: pry-blink 2s infinite;
        }
        @keyframes pry-blink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .text-active-pry { color: #00aaaa; font-weight: 900; }
        .pry-status-box {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(0, 139, 139, 0.1);
          border-radius: 3px;
        }
        .pry-avatar-box {
          width: 34px; height: 34px;
          background: #008b8b; color: #fff;
          font-weight: 900; font-size: 0.7rem;
          display: flex; align-items: center; justify-content: center;
          border-radius: 3px;
          flex-shrink: 0;
        }
        .pry-mobile-toggle {
          background: #004d4d; color: white;
          border: none; padding: 8px; border-radius: 4px;
        }

        /* TOP NAV */
        .pry-top-nav {
          height: auto;
          min-height: 54px;
          background: #081d1d;
          border-bottom: 1px solid rgba(0, 139, 139, 0.1);
          flex-shrink: 0;
          scrollbar-width: none;
        }
        .pry-top-nav::-webkit-scrollbar { display: none; }
        .cat-tab-btn-pry {
          position: relative;
          background: transparent; border: none;
          color: rgba(255,255,255,0.35);
          font-weight: 700; font-size: 0.75rem;
          text-transform: uppercase; letter-spacing: 1px;
          white-space: nowrap;
          padding: 12px 15px;
        }
        .cat-tab-btn-pry.active { color: white; }
        .cat-label-pry { position: relative; z-index: 1; }
        .pry-nav-indicator {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: #00ffff;
        }
        .pry-divider { height: 3px; background: rgba(0,0,0,0.6); flex-shrink: 0; }

        /* SIDEBAR */
        .pry-sidebar {
          width: 300px;
          background: #051413;
          border-right: 1px solid rgba(0, 139, 139, 0.1);
        }
        @media (max-width: 991px) {
          .pry-sidebar { position: absolute; left: 0; z-index: 100; height: 100%; box-shadow: 30px 0 60px rgba(0,0,0,0.6); }
        }
        .pry-sidebar-inner-header { border-bottom: 1px solid rgba(0, 139, 139, 0.1); flex-shrink: 0; }
        .module-card-pry {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(0, 139, 139, 0.05);
          border-radius: 3px; cursor: pointer;
          transition: border-color 0.2s;
          min-height: 80px;
        }
        .module-card-pry:hover { border-color: rgba(0, 139, 139, 0.3); }
        .module-card-pry.active { background: rgba(0, 139, 139, 0.1); border-color: rgba(0, 139, 139, 0.4); }
        .pry-card-title { font-size: 0.8rem; letter-spacing: 0.5px; line-height: 1.3; font-weight: 800; }
        .pry-card-desc { font-size: 0.7rem; font-family: Arial, sans-serif; line-height: 1.4; opacity: 0.5; }
        .pry-sidebar-glow-indicator {
          position: absolute; left: 0; top: 0; height: 100%; width: 3px;
          background: #00ffff; border-radius: 0 2px 2px 0;
        }
        .pry-active-dot { width: 6px; height: 6px; background: #00ffff; border-radius: 50%; }
        .pry-sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .pry-sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(0, 139, 139, 0.2); }

        /* CANVAS */
        .explorer-main-pry { overflow: hidden; width: 100%; }
        .content-area-pry { background: #030a0a; padding-bottom: 60px !important; overflow-x: hidden; }

        /* SCHEMATIC DESIGN (DARK CYAN CANVAS) */
        .schematic-canvas-pry {
          width: 100%;
          max-width: 980px;
          margin: 0 auto 40px auto;
          background: #004d4d;
          border: 2px solid #000;
          padding: clamp(15px, 2vw, 25px);
          color: white;
          font-family: Arial, sans-serif;
          box-shadow: 16px 16px 0 rgba(0,0,0,0.55);
          height: auto;
          overflow: visible;
        }
        .schematic-header-box-pry {
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.2) !important;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .header-cell-pry {
            border-right: 1px solid rgba(255,255,255,0.1);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding: 10px 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 65px;
            overflow: hidden;
        }
        .header-cell-pry:nth-child(even) { border-right: none; background: rgba(255,255,255,0.02); }
        .label-tag-pry { display: block; font-size: 10px; font-weight: 900; opacity: 0.6; letter-spacing: 1px; margin-bottom: 2px; }
        .label-value-pry { 
          display: block; 
          font-size: clamp(0.75rem, 1vw, 0.85rem); 
          font-weight: 900; 
          text-transform: uppercase; 
          letter-spacing: 0.5px; 
          word-break: break-all;
          overflow-wrap: anywhere; 
          white-space: normal;
          line-height: 1.2;
        }
        @media (max-width: 576px) {
          .schematic-header-box-pry { grid-template-columns: 1fr; }
          .header-cell-pry { border-right: none; }
        }
        
        .section-label-pry { font-weight: 900; font-size: var(--fs-header); color: rgba(255,255,255,0.45); letter-spacing: 1px; margin-bottom: 15px; }
        .nested-box-pry { background: #082121; border: 2px solid #000; height: auto; overflow: visible; }
        .border-pry { border: 2px solid #000 !important; }
        
        .data-key-pry {
          display: block; font-weight: 900; font-size: var(--fs-tag);
          background: rgba(0,0,0,0.3); padding: 4px 10px;
          border-left: 4px solid #00ffff; margin-bottom: 8px; letter-spacing: 0.5px;
          overflow-wrap: break-word;
        }
        .data-content-pry { 
          font-size: var(--fs-content); line-height: 1.6; font-weight: 500; color: #e0f2f2; 
          margin-bottom: 12px; overflow-wrap: break-word; word-wrap: break-word; 
        }
        .data-list-pry { 
          list-style: square; padding-left: 22px; font-size: var(--fs-content); 
          font-weight: 600; color: #e0f2f2; overflow-wrap: break-word;
        }
        .data-list-pry li { margin-bottom: 6px; }
        .tech-badge-pry {
          background: #00ffff; color: #000;
          padding: 3px 10px; font-size: 0.7rem; font-weight: 900;
          border-radius: 2px; letter-spacing: 0.5px; display: inline-block; margin: 2px;
          white-space: normal; text-align: center;
        }
        .comparison-grid-pry { background: #0a2626; border: 2px solid #000; overflow: visible; }
        .grid-header-pry { background: #000; color: #00ffff; font-size: 0.7rem; font-weight: 900; letter-spacing: 1px; padding: 6px; overflow-wrap: break-word; }
        .grid-sublabel-pry { font-size: 0.65rem; font-weight: 900; opacity: 0.6; margin-bottom: 4px; display: block; overflow-wrap: break-word; }
        .grid-item-pry { font-size: 0.8rem; font-weight: 600; line-height: 1.4; margin-bottom: 5px; overflow-wrap: break-word; }
        .caution-text-pry { color: #ff6b6b; font-weight: 800; font-size: 0.85rem; font-style: italic; overflow-wrap: break-word; }
        
        .sequence-box-pry { background: #092a2a; border: 2px solid #000; height: auto; }
        .sequence-item-pry { border-bottom: 1px solid rgba(255,255,255,0.1); padding: 12px; height: auto; }
        .step-num-pry { font-weight: 900; background: #00ffff; color: #000; padding: 2px 8px; font-size: 0.8rem; border-radius: 2px; flex-shrink: 0; }
        .process-name-pry { font-weight: 900; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.5px; overflow-wrap: break-word; }
        .step-desc-pry { font-size: 0.82rem; font-weight: 500; opacity: 0.8; margin-top: 6px; line-height: 1.5; overflow-wrap: break-word; }
        .link-tag-pry { font-size: 0.65rem; font-weight: 900; background: rgba(255,255,255,0.1); padding: 3px 8px; margin-top: 8px; display: inline-block; overflow-wrap: break-word; }
        
        .logic-box-pry { background: #000; border: 2px solid #00ffff; padding: 15px; height: auto; }
        .logic-code-pry { font-weight: 900; font-size: var(--fs-code); color: #00ffff; letter-spacing: 0.5px; overflow-x: auto; white-space: pre-wrap; word-break: break-word; overflow-wrap: break-word; }
        
        .exercise-card-pry { background: #082121; border: 2px solid #000; border-radius: 2px; padding: 12px; height: auto; }
        .project-box-pry { background: #082121; border: 2px solid #000; height: auto; }
        .glossary-grid-pry { background: #092a2a; border: 2px solid #000; border-radius: 2px; height: auto; }
        .glossary-item-pry { padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); height: auto; }
        .schematic-footer-pry { background: #000; color: white; border: 2px solid #000 !important; padding: 10px; height: auto; }

        .pry-anchor {
          position: fixed; background: rgba(0, 139, 139, 0.3); color: rgba(255,255,255,0.6);
          padding: 4px 12px; font-size: 0.65rem; font-weight: 900;
          letter-spacing: 1px; z-index: 5;
          border-radius: 2px; pointer-events: none;
        }
        .anchor-tr { top: 148px; right: 20px; }
        .anchor-br { bottom: 20px; right: 20px; }

        .uppercase { text-transform: uppercase; }
        .text-gold { color: #00ffff; }
        .text-success { color: #00aaaa; }
        .fw-black { font-weight: 900; }
        .fw-bold { font-weight: 700; }
        .small { font-size: 0.8rem; }

        .pry-anchor {
          position: fixed; background: rgba(0, 139, 139, 0.2); color: rgba(255,255,255,0.4);
          padding: 2px 10px; font-size: 0.55rem; font-weight: 900;
          font-family: Arial, sans-serif; letter-spacing: 1px; z-index: 5;
          border-radius: 2px; pointer-events: none;
        }
        .anchor-tr { top: 148px; right: 20px; }
        .anchor-br { bottom: 20px; right: 20px; }

        .uppercase { text-transform: uppercase; }
        .text-gold { color: #00ffff; }
        .text-success { color: #00aaaa; }
        .fw-black { font-weight: 900; }
      `}</style>
    </div>
  );
};

export default ExplorePsychology;
