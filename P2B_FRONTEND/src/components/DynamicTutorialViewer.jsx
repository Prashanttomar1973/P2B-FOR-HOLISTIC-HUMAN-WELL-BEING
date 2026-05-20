import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Info, Zap, AlertCircle, History, Terminal, 
  ShieldCheck, Package, ListChecks, HelpCircle, BookOpen
} from 'lucide-react';

const DynamicTutorialViewer = ({ data }) => {
  if (!data) return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 opacity-30 text-center">
      <Package size={64} strokeWidth={1} className="mb-3" />
      <h3 className="fw-black tracking-widest uppercase">Select Module From Directory</h3>
      <p className="small">Neural mapping system awaiting sector selection.</p>
    </div>
  );

  const {
    tutorial_metadata: meta,
    section_1_introduction_the_what: intro,
    section_2_essentials_the_why: why,
    section_3_core_implementation_the_how: how,
    section_4_practice_and_projects_application: practice,
    footer_navigation: footer
  } = data;

  return (
    <div className="pry-viewer-root h-100">
      {/* --- HEADER --- */}
      <div className="pry-content-header border-bottom border-3 border-dark pb-3 mb-4">
        <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-dark rounded-0 px-2 py-1 small tracking-widest">{meta.topic_id || 'PRY-REF'}</span>
            <span className="small fw-black opacity-40 uppercase">Sector: {meta.category || 'Clinical'}</span>
        </div>
        <h1 className="pry-title fw-black uppercase m-0 leading-tight">{meta.topic_name}</h1>
        <div className="mt-2 d-flex gap-4 small fw-bold opacity-60">
           <span>DIFFICULTY: {meta.difficulty_level || 'STANDARD'}</span>
           <span>SYNC-TIME: {meta.estimated_reading_time || 'N/A'}</span>
        </div>
      </div>

      {/* --- PHASE 01: INTRODUCTION --- */}
      <section className="pry-section mb-5">
        <div className="pry-section-label mb-3">
          <span className="fw-black uppercase bg-dark text-white px-2 py-1">PHASE 01: SPECIFICATIONS</span>
        </div>
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="pry-card p-3 border-3 border-dark h-100">
              <h5 className="fw-black border-bottom border-dark pb-2 mb-3">THEORETICAL OVERVIEW</h5>
              <p className="small fw-bold leading-relaxed">{intro.formal_definition}</p>
              <div className="mt-3 p-2 bg-dark bg-opacity-5 border border-dark rounded-0">
                <span className="small fw-black opacity-40 uppercase block mb-1">Conceptual Analogy:</span>
                <p className="small m-0 italic">"{intro.simplified_concept_analogy}"</p>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="pry-card p-3 border-3 border-dark h-100">
              <h5 className="fw-black border-bottom border-dark pb-2 mb-3">COGNITIVE INSIGHTS</h5>
              <ul className="list-unstyled mb-0">
                {intro.key_characteristics_list?.map((item, i) => (
                  <li key={i} className="d-flex gap-2 mb-2 small fw-bold">
                    <ArrowRight size={14} className="flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Core Architecture */}
        <div className="pry-box-wide mt-4 p-4 border-3 border-dark text-center">
            <h6 className="fw-black opacity-30 tracking-widest mb-3">COGNITIVE SYSTEM VIEW</h6>
            <div className="d-flex flex-column align-items-center">
               <div className="pry-icon-ring mb-3">
                  <Zap size={32} />
               </div>
               <p className="small fw-black max-w-lg">{intro.core_architecture_diagram_description}</p>
            </div>
        </div>
      </section>

      {/* --- PHASE 02: ESSENTIALS --- */}
      <section className="pry-section mb-5">
        <div className="pry-section-label mb-3">
          <span className="fw-black uppercase bg-dark text-white px-2 py-1">PHASE 02: INDUSTRIAL DYNAMICS</span>
        </div>
        <div className="row g-4 overflow-hidden">
          <div className="col-md-6">
            <div className="pry-card p-3 border-3 border-dark h-100">
              <h6 className="fw-black mb-3">REAL-WORLD APPLICATIONS</h6>
              <div className="d-flex flex-wrap gap-2">
                {why.real_world_use_cases?.map((tag, i) => (
                  <span key={i} className="pry-tag px-2 py-1 small fw-black border border-dark">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pry-card p-3 border-3 border-dark h-100">
              <h6 className="fw-black mb-3">INDUSTRY ROLES</h6>
              <ul className="list-unstyled mb-0 small fw-bold">
                {why.industry_relevance_and_jobs?.map((job, i) => (
                  <li key={i} className="mb-1">&bull; {job}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pry-card mt-4 border-3 border-dark overflow-hidden">
           <div className="bg-dark text-white p-2 text-center small fw-black tracking-widest">COMPARATIVE ANALYSIS GRID</div>
           <div className="row g-0">
              <div className="col-md-6 border-end border-dark">
                 <div className="p-3 bg-success bg-opacity-10 h-100">
                    <h6 className="small fw-black mb-3 text-success font-monospace">[SECTION 2.1] ADVANTAGES</h6>
                    {why.pros_and_cons_comparison_table?.advantages?.map((adv, i) => (
                      <div key={i} className="small fw-bold mb-2">&plus; {adv}</div>
                    ))}
                 </div>
              </div>
              <div className="col-md-6">
                 <div className="p-3 bg-danger bg-opacity-10 h-100">
                    <h6 className="small fw-black mb-3 text-danger font-monospace">[SECTION 2.2] LIMITATIONS</h6>
                    {why.pros_and_cons_comparison_table?.limitations?.map((lim, i) => (
                      <div key={i} className="small fw-bold mb-2">&minus; {lim}</div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {why.ethical_considerations && (
          <div className="pry-card mt-3 p-3 border-3 border-dark bg-warning bg-opacity-10">
            <h6 className="small fw-black mb-2 d-flex align-items-center gap-2">
              <ShieldCheck size={16} /> [SECTION 2.3] ETHICAL CONSIDERATIONS
            </h6>
            <p className="small fw-bold m-0 italic">{why.ethical_considerations}</p>
          </div>
        )}
      </section>

      {/* --- PHASE 03: MECHANISM --- */}
      <section className="pry-section mb-5">
        <div className="pry-section-label mb-3">
          <span className="fw-black uppercase bg-dark text-white px-2 py-1">PHASE 03: EXECUTION STACK</span>
        </div>
        <div className="pry-step-list ms-2">
          {how.step_by_step_mechanism?.map((step, i) => (
            <div key={i} className="pry-step-item d-flex gap-3 mb-4">
              <div className="pry-step-num border-3 border-dark bg-dark text-white d-flex align-items-center justify-content-center flex-shrink-0">
                {step.step_number}
              </div>
              <div>
                <h6 className="fw-black mb-1">{step.process_name}</h6>
                <p className="small fw-bold m-0">{step.technical_explanation}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pry-syntax-box mt-4 border-3 border-dark">
           <div className="bg-dark text-white p-2 small fw-black d-flex align-items-center gap-2">
              <Terminal size={14} /> [SECTION 3.2] LOGIC FLOW SCHEMA
           </div>
           <div className="p-3 font-monospace text-center bg-white bg-opacity-50 border-bottom border-dark border-2">
              <code>{how.syntax_or_formulas_box?.primary_logic}</code>
           </div>
           <div className="p-3">
              {how.syntax_or_formulas_box?.line_by_line_explanation?.map((e, i) => (
                <div key={i} className="small fw-bold opacity-60 mb-1">[{i+1}] {e}</div>
              ))}
           </div>
        </div>

        {how.common_errors_and_troubleshooting?.length > 0 && (
          <div className="pry-card mt-3 p-3 border-3 border-dark bg-danger bg-opacity-5">
             <h6 className="small fw-black mb-3 d-flex align-items-center gap-2">
               <AlertCircle size={16} /> [SECTION 3.3] COMMON ERRORS & TROUBLESHOOTING
             </h6>
             <ul className="list-unstyled mb-0">
               {how.common_errors_and_troubleshooting.map((err, i) => (
                 <li key={i} className="small fw-bold mb-1 text-danger">&times; {err}</li>
               ))}
             </ul>
          </div>
        )}
      </section>

      {/* --- PHASE 04: PRACTICE --- */}
      <section className="pry-section mb-5 pb-5">
        <div className="pry-section-label mb-3">
          <span className="fw-black uppercase bg-dark text-white px-2 py-1">PHASE 04: ACTIVE CALIBRATION</span>
        </div>
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="pry-card p-3 border-3 border-dark h-100">
               <h6 className="fw-black mb-3 border-bottom border-dark pb-2">[SEC 4.1] EXERCISES</h6>
               {practice.hands_on_exercises?.map((ex, i) => (
                 <div key={i} className="mb-3">
                    <p className="small fw-black mb-1">Q: {ex.question}</p>
                    <span className="small opacity-40 italic fw-bold">Hint: {ex.hint}</span>
                 </div>
               ))}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="pry-card p-3 border-3 border-dark h-100">
               <h6 className="fw-black mb-3 border-bottom border-dark pb-2">[SEC 4.2] MINI PROJECT</h6>
               <p className="small fw-black mb-1">{practice.mini_project_guide?.project_title}</p>
               <p className="small fw-bold opacity-60 mb-2">{practice.mini_project_guide?.objective}</p>
               <ul className="list-unstyled mb-0 small fw-bold">
                 {practice.mini_project_guide?.step_wise_instructions?.map((s, i) => (
                   <li key={i} className="mb-1">{i+1}. {s}</li>
                 ))}
               </ul>
            </div>
          </div>
        </div>

        {practice.interview_preparation_questions?.length > 0 && (
          <div className="pry-card mt-4 p-3 border-3 border-dark bg-info bg-opacity-10">
            <h6 className="fw-black mb-3 d-flex align-items-center gap-2">
              <HelpCircle size={16} /> [SEC 4.3] INTERVIEW PREPARATION
            </h6>
            <ul className="list-unstyled mb-0">
               {practice.interview_preparation_questions.map((q, i) => (
                 <li key={i} className="small fw-bold mb-2">&bull; {q}</li>
               ))}
            </ul>
          </div>
        )}

        {practice.glossary_cheat_sheet && Object.keys(practice.glossary_cheat_sheet).length > 0 && (
          <div className="pry-card mt-3 p-3 border-3 border-dark">
            <h6 className="fw-black mb-3 d-flex align-items-center gap-2">
              <BookOpen size={16} /> [SEC 4.4] GLOSSARY CHEAT SHEET
            </h6>
            <div className="row g-2">
               {Object.entries(practice.glossary_cheat_sheet).map(([term, def], i) => (
                 <div key={i} className="col-md-6 mb-2">
                   <div className="p-2 border border-dark bg-white">
                      <span className="small fw-black uppercase d-block border-bottom border-dark mb-1">{term}</span>
                      <p className="small m-0 fw-bold opacity-60">{def}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </section>

      <style>{`
        .pry-viewer-root {
          color: black;
          font-family: 'Arial', sans-serif;
        }
        .pry-title { font-size: 32px; letter-spacing: -1px; }
        .pry-card { background-color: rgba(255,255,255,0.3); }
        .pry-box-wide { background-color: rgba(0,0,0,0.05); }
        
        .pry-section-label { display: inline-block; }
        .pry-section-label span { font-size: 10px; letter-spacing: 2px; }

        .pry-tag { background-color: white; white-space: nowrap; }

        .pry-icon-ring {
           width: 60px; height: 60px;
           border: 3px solid black;
           display: flex; align-items: center; justify-content: center;
           background-color: #2ecc71;
        }

        .pry-step-num {
           width: 30px; height: 30px;
           font-size: 14px;
        }

        .pry-syntax-box { background-color: rgba(255,255,255,0.5); }
        
        h5, h6 { letter-spacing: 1px; }
        .uppercase { text-transform: uppercase; }
        .fw-black { font-weight: 900; }
        .fw-bold { font-weight: 700; }
      `}</style>
    </div>
  );
};

export default DynamicTutorialViewer;
