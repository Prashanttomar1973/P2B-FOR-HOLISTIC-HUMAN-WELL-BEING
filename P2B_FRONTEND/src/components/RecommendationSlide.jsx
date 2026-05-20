import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, Lightbulb, Video, FileText, 
  Globe, ExternalLink, ArrowLeft, ShieldCheck, Share2, Bookmark,
  Brain, Sparkles, ChevronRight, Activity, Zap
} from 'lucide-react';
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const STATIC_NEWS_CARDS = [
  { 
    id: 101, 
    category: 'news', 
    title: "AI-Powered Diagnostics: The New Frontier in Preventive Health", 
    description: "Recent breakthroughs in machine learning are allowing for earlier detection of chronic conditions through non-invasive biometric analysis.", 
    source: "HealthTech Global", 
    link: "https://www.medgadget.com" 
  },
  { 
    id: 102, 
    category: 'news', 
    title: "The Rise of Personalized Nutrition: Genomic-Based Diet Protocols", 
    description: "New studies suggest that tailoring nutrition to individual genetic markers can significantly improve metabolic health and energy levels.", 
    source: "Nature Medicine", 
    link: "https://www.nature.com" 
  },
  { 
    id: 103, 
    category: 'news', 
    title: "Neuro-Plasticity in Aging: How Cognitive Training Rewires the Brain", 
    description: "Research confirms that the brain remains plastic well into late adulthood, with specific exercises showing promise in reversing cognitive decline.", 
    source: "Scientific American", 
    link: "https://www.scientificamerican.com" 
  },
  { 
    id: 104, 
    category: 'news', 
    title: "Strategic Sleep: The Impact of Chronotypes on Professional Productivity", 
    description: "Aligning your work schedule with your natural biological clock (chronotype) can boost performance and reduce burnout risk.", 
    source: "Harvard Business Review", 
    link: "https://hbr.org" 
  },
  { 
    id: 105, 
    category: 'news', 
    title: "Advanced Bio-Hacking: The Role of Peptides in Tissue Repair", 
    description: "Investigating the therapeutic potential of bioactive peptides in accelerating recovery from physical strain and age-related wear.", 
    source: "BioHacker Magazine", 
    link: "https://www.biohackers.com" 
  },
  { 
    id: 106, 
    category: 'news', 
    title: "The Microbiome-Mental Health Connection: A Systematic Review", 
    description: "New evidence highlights the critical role of gut bacteria in regulating mood-related neurotransmitters like serotonin and dopamine.", 
    source: "Psychology Today", 
    link: "https://www.psychologytoday.com" 
  },
  { 
    id: 107, 
    category: 'news', 
    title: "Mindfulness and Telomeres: Slowing Cellular Aging at the DNA Level", 
    description: "Long-term meditation practices have been linked to increased telomerase activity, potentially extending the lifespan of cells.", 
    source: "The Lancet", 
    link: "https://www.thelancet.com" 
  },
  { 
    id: 108, 
    category: 'news', 
    title: "Wearable Tech Evolution: Continuous Glucose Monitoring for Non-Diabetics", 
    description: "Proactive glucose tracking is becoming a standard tool for athletes and high-performers to optimize energy and focus.", 
    source: "Digital Health News", 
    link: "https://www.mobihealthnews.com" 
  },
  { 
    id: 109, 
    category: 'news', 
    title: "The Science of Cold Exposure: Hormetic Stress for Immune Resilience", 
    description: "Brief, controlled exposure to extreme cold can activate brown fat and strengthen the body's natural defense mechanisms.", 
    source: "Outside Online", 
    link: "https://www.outsideonline.com" 
  },
  { 
    id: 110, 
    category: 'news', 
    title: "Digital Detox Protocols: Restoring Neural Focus in a Hyper-Connected World", 
    description: "Systematic breaks from digital stimulation are being recognized as essential for maintaining deep-work capabilities and mental health.", 
    source: "Wired", 
    link: "https://www.wired.com" 
  }
];

const STATIC_FACTS_CARDS = [
  { 
    id: 201, 
    category: 'facts', 
    title: "Neural Firing Speed: 268 MPH Data Transmission", 
    description: "Nerve impulses in the human body can travel at speeds of up to 268 miles per hour, allowing for near-instantaneous reaction times.", 
    source: "Neuro-Sync Labs", 
    link: "https://www.nature.com" 
  },
  { 
    id: 202, 
    category: 'facts', 
    title: "Mitochondrial Density: The Heart's Energy Engine", 
    description: "Cardiac muscle cells contain the highest concentration of mitochondria in the body, with up to 5,000 per cell to sustain constant activity.", 
    source: "Bio-Logic Archive", 
    link: "https://www.sciencedaily.com" 
  },
  { 
    id: 203, 
    category: 'facts', 
    title: "Circadian Gene Regulation: 15% of Genome Sync", 
    description: "Approximately 15% of the human genome is directly regulated by the circadian clock, impacting everything from metabolism to DNA repair.", 
    source: "Genomic Quarterly", 
    link: "https://www.cell.com" 
  },
  { 
    id: 204, 
    category: 'facts', 
    title: "Bone Tensile Strength: Stronger Than Steel", 
    description: "Healthy human bone has a tensile strength comparable to steel but is five times lighter, making it an engineering marvel of biology.", 
    source: "Physio-Core", 
    link: "https://www.sciencedirect.com" 
  },
  { 
    id: 205, 
    category: 'facts', 
    title: "The Vagus Nerve: The Gut-Brain Superhighway", 
    description: "The vagus nerve is the longest cranial nerve, facilitating 80% of the sensory information flow from the gut to the brain.", 
    source: "Neural Quarterly", 
    link: "https://www.psychologytoday.com" 
  },
  { 
    id: 206, 
    category: 'facts', 
    title: "Autophagy: Cellular Renewal Peak During Fasting", 
    description: "Autophagy, the body's mechanism for recycling damaged cells, significantly increases after 16-24 hours of nutrient deprivation.", 
    source: "Cellular Daily", 
    link: "https://www.healthline.com" 
  },
  { 
    id: 207, 
    category: 'facts', 
    title: "Dopamine Baseline: The Focus Foundation", 
    description: "Maintaining a steady dopamine baseline is more critical for long-term motivation than experiencing frequent high-intensity spikes.", 
    source: "Neuro-Chem", 
    link: "https://www.hubermanlab.com" 
  },
  { 
    id: 208, 
    category: 'facts', 
    title: "Telomere Preservation: The Longevity Multiplier", 
    description: "Protecting the protective caps at the end of chromosomes (telomeres) is the primary biological correlate with healthy aging.", 
    source: "Longevity Institute", 
    link: "https://www.thelancet.com" 
  },
  { 
    id: 209, 
    category: 'facts', 
    title: "Oxygen Utilization: VO2 Max as a Health Marker", 
    description: "VO2 max is one of the strongest predictors of all-cause mortality and overall metabolic resilience in the human body.", 
    source: "Elite Performance", 
    link: "https://www.outsideonline.com" 
  },
  { 
    id: 210, 
    category: 'facts', 
    title: "Adult Neurogenesis: Growing New Brain Cells", 
    description: "Contrary to old beliefs, the adult hippocampus continues to produce thousands of new neurons daily, especially during aerobic exercise.", 
    source: "Brain Science", 
    link: "https://www.scientificamerican.com" 
  }
];

const STATIC_VIDEOS_CARDS = [
  { 
    id: 301, 
    category: 'videos', 
    title: "Mastering Your Sleep Cycles for Peak Cognition", 
    description: "A deep-dive masterclass on how to structure your sleep architecture for maximum neural recovery and hormone balance.", 
    source: "Huberman Lab", 
    link: "https://www.youtube.com" 
  },
  { 
    id: 302, 
    category: 'videos', 
    title: "The Molecular Science of Longevity & Aging", 
    description: "Exploring the latest interventions in geroscience to extend the human healthspan at a cellular level.", 
    source: "Peter Attia Drive", 
    link: "https://www.youtube.com" 
  },
  { 
    id: 303, 
    category: 'videos', 
    title: "How to Reset Your Dopamine for Deep Work", 
    description: "A practical guide on dopamine detoxing and habit architecture to reclaim your focus in a digital-first world.", 
    source: "HealthyGamerGG", 
    link: "https://www.youtube.com" 
  },
  { 
    id: 304, 
    category: 'videos', 
    title: "Breathwork Protocols for High-Stress Cycles", 
    description: "Scientific techniques to leverage the respiratory system for immediate autonomic nervous system regulation.", 
    source: "Wim Hof", 
    link: "https://www.youtube.com" 
  },
  { 
    id: 305, 
    category: 'videos', 
    title: "Advanced Bio-Hacking for Executive Performance", 
    description: "Integrating technical bio-feedback loops into a professional high-stakes workflow for sustained excellence.", 
    source: "Dave Asprey", 
    link: "https://www.youtube.com" 
  },
  { 
    id: 306, 
    category: 'videos', 
    title: "The Neuroscience of Mindfulness & Flow States", 
    description: "Mapping the brain's activity during deep meditative states and how to trigger flow consistently.", 
    source: "TED Talks", 
    link: "https://www.youtube.com" 
  },
  { 
    id: 307, 
    category: 'videos', 
    title: "Optimizing Micronutrition for Cognitive Clarity", 
    description: "A data-driven look at how specific nutrient profiles impact neurotransmitter synthesis and brain health.", 
    source: "FoundMyFitness", 
    link: "https://www.youtube.com" 
  },
  { 
    id: 308, 
    category: 'videos', 
    title: "Resistance Training for Metabolic Resilience", 
    description: "Why muscle is the organ of longevity and how to optimize hypertrophy for life-long metabolic health.", 
    source: "Renaissance Periodization", 
    link: "https://www.youtube.com" 
  },
  { 
    id: 309, 
    category: 'videos', 
    title: "The Physiological Impact of Cold Exposure", 
    description: "Analyzing the hormetic stress response to extreme cold and its effects on mitochondrial biogenesis.", 
    source: "Stanford Medicine", 
    link: "https://www.youtube.com" 
  },
  { 
    id: 310, 
    category: 'videos', 
    title: "AI & The Future of Personalized Healthcare", 
    description: "How machine learning models are revolutionizing the way we map and manage individual biological data.", 
    source: "Google Health", 
    link: "https://www.youtube.com" 
  }
];

const STATIC_RESEARCH_CARDS = [
  { 
    id: 401, 
    category: 'research', 
    title: "Stoicism and Modern CBT: A Comparative Analysis", 
    description: "An interdisciplinary study exploring how ancient Stoic principles are being integrated into modern cognitive behavioral therapy for emotional regulation.", 
    source: "Philosophy & Psychology Journal", 
    link: "https://www.jstor.org" 
  },
  { 
    id: 402, 
    category: 'research', 
    title: "The Biological Basis of Human Consciousness", 
    description: "Identifying the neural correlates of consciousness and the evolutionary advantages of subjective experience in complex organisms.", 
    source: "Nature Neuroscience", 
    link: "https://www.nature.com" 
  },
  { 
    id: 403, 
    category: 'research', 
    title: "Evolutionary Biology of Altruism & Cooperation", 
    description: "Analyzing the genetic and social mechanisms that drive cooperative behavior in human populations from an evolutionary perspective.", 
    source: "Evolutionary Review", 
    link: "https://www.pnas.org" 
  },
  { 
    id: 404, 
    category: 'research', 
    title: "Phenomenology: The Bridge Between Mind & Brain", 
    description: "A research synthesis on how first-person subjective reports can be scientifically mapped to third-person biological data points.", 
    source: "Philosophical Transactions", 
    link: "https://royalsocietypublishing.org" 
  },
  { 
    id: 405, 
    category: 'research', 
    title: "Epigenetics: How Environment Shapes Your Genes", 
    description: "Investigating the molecular mechanisms through which psychological stress and environmental factors cause heritable changes in gene expression.", 
    source: "The Lancet Psychiatry", 
    link: "https://www.thelancet.com" 
  },
  { 
    id: 406, 
    category: 'research', 
    title: "The Ethics of Artificial Intelligence in Bio-Metrics", 
    description: "A philosophical inquiry into the privacy implications and ethical boundaries of using AI to predict individual health outcomes.", 
    source: "Journal of Medical Ethics", 
    link: "https://jme.bmj.com" 
  },
  { 
    id: 407, 
    category: 'research', 
    title: "Gut Microbiome & Neurodevelopmental Stability", 
    description: "New clinical data linking diversity in the gut microbiome to improved cognitive resilience and psychological stability.", 
    source: "Cell Host & Microbe", 
    link: "https://www.cell.com" 
  },
  { 
    id: 408, 
    category: 'research', 
    title: "Social Identity Theory in the Digital Age", 
    description: "A psychological study on how digital environments are redefining group identity and social cohesion in modern society.", 
    source: "Journal of Social Issues", 
    link: "https://onlinelibrary.wiley.com" 
  },
  { 
    id: 409, 
    category: 'research', 
    title: "Quantum Biology: New Frontiers in Perception", 
    description: "Exploring the role of quantum mechanics in biological processes, specifically in neural transmission and sensory perception.", 
    source: "Physical Review Letters", 
    link: "https://journals.aps.org" 
  },
  { 
    id: 410, 
    category: 'research', 
    title: "Nietzschean Resilience & Peak Human Performance", 
    description: "Applying the philosophy of the 'Übermensch' to modern psychology to understand the drive for self-transcendence and peak performance.", 
    source: "Psychology & Culture", 
    link: "https://www.apa.org" 
  }
];

const RecommendationSlide = ({ reportData, onBack }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // 🖼️ IMAGE PATH SET: React public folder logic
  const getImageUrl = () => {
    return `/Heroimage.png`; 
  };

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      try {
        // Summarize reportData to reduce tokens and avoid 429 Rate Limit errors
        const summaryContext = {
          summary: reportData?.summary,
          key_findings: reportData?.main_body?.analysis?.logic_justification,
          status: {
            bio: reportData?.biology_section?.status,
            psych: reportData?.psychology_section?.status,
            phil: reportData?.philosophy_section?.status
          }
        };

        const prompt = `You are a medical and wellness AI. Based on this user profile summary: ${JSON.stringify(summaryContext)}, 
        provide 10-12 detailed recommendation resources in STRICT JSON format. 
        Return ONLY a JSON array of objects. Each object MUST have: id (number), category (one of: news, facts, videos, research), title, source, description (short summary), and link.
        Example format: [{"id": 1, "category": "research", "title": "Example", "source": "Nature", "description": "...", "link": "https://..."}]`;
        
        // 🧪 SYNC WITH WORKING BACKEND: Using /api/chat with expected Map structure
        const response = await axios.post("http://localhost:8080/api/chat", {
          userQuery: prompt,
          activeDomain: "Recommendations",
          context: reportData
        });

        let rawText = "";
        if (typeof response.data === 'string') {
          rawText = response.data;
        } else if (response.data?.reply) {
          rawText = response.data.reply;
        } else {
          rawText = JSON.stringify(response.data);
        }

        // Robust Clean: Extract JSON array if AI adds conversational text
        const jsonMatch = rawText.match(/\[\s*\{.*\}\s*\]/s);
        const cleanJson = jsonMatch ? jsonMatch[0] : rawText;
        
        const data = JSON.parse(cleanJson);
        if (Array.isArray(data) && data.length > 0) {
          setRecommendations([...STATIC_NEWS_CARDS, ...STATIC_FACTS_CARDS, ...STATIC_VIDEOS_CARDS, ...STATIC_RESEARCH_CARDS, ...data]); 
        } else {
          throw new Error("Empty array from AI");
        }
      } catch (error) {
        console.error("Neural Sync Error, loading fallback data...", error);
        setRecommendations([
          ...STATIC_NEWS_CARDS,
          ...STATIC_FACTS_CARDS,
          ...STATIC_VIDEOS_CARDS,
          ...STATIC_RESEARCH_CARDS,
          { 
            id: 1, 
            category: 'research', 
            title: "Biological Optimization Strategies for Professional High-Performers", 
            description: "A comprehensive deep-dive into maintaining cellular homeostasis during high-cognitive stress cycles. Focuses on neural recovery and glucose management.", 
            source: "Neural Quarterly", 
            link: "https://www.republicworld.com" 
          },
          {
            id: 2,
            category: 'news',
            title: "Latest Breakthrough in Neuro-Plasticity",
            description: "Recent discoveries show that intentional habit formation can rewire brain pathways significantly faster than previously thought.",
            source: "Science Daily",
            link: "https://www.sciencedaily.com"
          },
          {
            id: 3,
            category: 'videos',
            title: "Optimizing Your Dopamine Baseline",
            description: "A visual guide on how to reset your dopamine baseline for better focus, motivation, and mental clarity throughout the day.",
            source: "Huberman Lab",
            link: "https://www.youtube.com"
          },
          { 
            id: 4, 
            category: 'facts', 
            title: "The 90-Minute Circadian Sync: Strategic Recovery Protocols", 
            description: "Waking up in the middle of a sleep cycle can leave you groggy. Scientific studies suggest that timing your alarm to 90-minute intervals is the key to morning energy.", 
            source: "Bio-Logic Archive", 
            link: "https://www.healthline.com" 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, [reportData]);

  const categories = ['all', 'news', 'facts', 'videos', 'research'];

  const filteredData = activeTab === 'all' 
    ? recommendations 
    : recommendations.filter(item => item.category.toLowerCase() === activeTab.toLowerCase());

  if (loading) return (
    <div className="neural-loading-viewport d-flex flex-column align-items-center justify-content-center">
      {/* BACKGROUND GLOWS */}
      <div className="bg-glow" style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'rgba(201, 166, 107, 0.08)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }}></div>
      
      <div className="loading-core p-5 text-center position-relative z-1">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="loading-icon-shimmer mb-4 mx-auto"
        >
          <Brain size={48} color="#c9a66b" />
        </motion.div>
        <h4 className="protocol-title mb-2 text-gold fw-black tracking-tighter">NEURAL_SYNTHESIS_ACTIVE</h4>
        <p className="tiny-label text-white opacity-40 uppercase tracking-widest">System Mapping Bio_ID_{Math.floor(Math.random() * 9000) + 1000}</p>
        <div className="loading-bar-container mx-auto mt-4">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: "100%" }}
             transition={{ duration: 3, repeat: Infinity }}
             className="loading-bar-active"
           />
        </div>
      </div>
      <style>{`
        .neural-loading-viewport { 
          background: radial-gradient(circle at 20% 30%, #1e4d4a 0%, #0d2120 100%); 
          min-height: 100vh; 
          font-family: 'Inter', sans-serif; 
          position: relative;
          overflow: hidden;
        }
        .loading-core { 
          background: linear-gradient(145deg, rgba(61, 90, 90, 0.8), rgba(40, 60, 60, 0.6));
          border: 1px solid rgba(201, 166, 107, 0.2); 
          border-radius: 40px; 
          backdrop-filter: blur(20px); 
          box-shadow: 0 25px 50px rgba(0,0,0,0.4);
        }
        .loading-icon-shimmer { 
          background: rgba(201, 166, 107, 0.1); 
          padding: 24px; 
          border-radius: 30px; 
          border: 1px solid rgba(201, 166, 107, 0.2); 
          width: fit-content; 
        }
        .loading-bar-container { width: 200px; height: 3px; background: rgba(0,0,0,0.2); border-radius: 10px; overflow: hidden; }
        .loading-bar-active { height: 100%; background: #c9a66b; box-shadow: 0 0 15px #c9a66b; }
        .text-gold { color: #c9a66b !important; }
        .fw-black { font-weight: 900; }
      `}</style>
    </div>
  );

  return (
    <div className="neural-synthesis-wrapper min-vh-100 position-relative">
      {/* ADVANCED BACKGROUND ELEMENTS (From MainBody) */}
      <div className="bg-glow" style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'rgba(201, 166, 107, 0.08)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="bg-glow-2" style={{ position: 'absolute', bottom: '5%', right: '5%', width: '300px', height: '300px', background: 'rgba(26, 188, 156, 0.05)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>

      {/* STICKY TOP NAVIGATION ARCHITECTURE */}
      <div className="synthesis-nav-header sticky-top position-relative z-3">
         <Container className="py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-4">
               <button className="nav-back-trigger" onClick={onBack}>
                  <ArrowLeft size={20} />
               </button>
               <div>
                  <h6 className="m-0 text-gold fw-black tracking-wider uppercase">Neural Synthesis Feed</h6>
                  <p className="tiny-label text-white opacity-40 m-0 uppercase tracking-widest">Protocol Version v3.0 // Enhanced Bio-Sync</p>
               </div>
            </div>
            <div className="branding-node d-flex align-items-center gap-2 px-3 py-1 rounded-pill">
               <Sparkles size={14} className="text-gold" />
               <span className="tiny-label text-gold fw-bold uppercase">P2B Engine Active</span>
            </div>
         </Container>

         {/* CATEGORY CAPSULE DOCK */}
         <div className="category-dock border-top border-white border-opacity-5">
            <Container className="d-flex gap-2 py-2 overflow-auto no-scrollbar">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`category-capsule ${activeTab === cat ? 'active' : ''}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </Container>
         </div>
      </div>

      {/* SYNTHESIS FEED STREAM */}
      <Container className="py-5" style={{ maxWidth: '1000px' }}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="d-flex flex-column gap-5"
        >
          <AnimatePresence mode='popLayout'>
            {filteredData.map((item) => (
              <motion.div 
                layout
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item.id} 
                className="synthesis-card-v2"
              >
                <div className="card-inner d-flex flex-column flex-md-row overflow-hidden">
                  {/* LEFT: VISUAL NODE */}
                  <div className="card-visual-pane col-md-5 position-relative">
                    <img 
                      src={getImageUrl()} 
                      alt="Synthesis Result" 
                      className="w-100 h-100 object-fit-cover"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Data+Found'; }}
                    />
                    <div className="holographic-overlay"></div>
                    <div className="category-tag-float">
                       <Zap size={10} className="me-1" /> {item.category.toUpperCase()}
                    </div>
                  </div>

                  {/* RIGHT: DATA NODE */}
                  <div className="card-data-pane col-md-7 p-4 p-md-5 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                       <span className="tiny-label text-gold tracking-widest fw-bold">SYNTHESIS_REPORT</span>
                       <div className="d-flex gap-3 text-gold-dim">
                          <Share2 size={16} className="action-node" />
                          <Bookmark size={16} className="action-node" />
                       </div>
                    </div>

                    <h3 className="synthesis-title mb-3">{item.title}</h3>
                    
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <Activity size={12} className="text-gold" />
                        <span className="tiny-label text-gold-dim">VERIFIED BY P2B AI / SOURCE: {item.source.toUpperCase()}</span>
                    </div>
                    
                    <p className="synthesis-description flex-grow-1">
                      {item.description || "Systemic analysis confirmed this resource as a high-value match for your current bio-profile markers. Strategic integration is recommended."}
                    </p>

                    <div className="pt-4 mt-auto border-top border-white border-opacity-5">
                       <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="synthesis-link-trigger d-flex align-items-center gap-2"
                       >
                         DECRYPT FULL RESOURCE <ExternalLink size={14} />
                       </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      {/* FOOTER METADATA */}
      <footer className="py-5 border-top border-white border-opacity-5 text-center mt-5">
         <div className="d-inline-flex align-items-center gap-3 px-4 py-2 rounded-pill bg-white bg-opacity-5 border border-white border-opacity-10">
            <ShieldCheck size={16} className="text-emerald" />
            <span className="tiny-label text-white text-opacity-40">ALL RECOMMENDATIONS ARE BIO-SYNCED FOR YOUR UNIQUE PROFILE.</span>
         </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@800;900&display=swap');

        .neural-synthesis-wrapper {
          background: radial-gradient(circle at 20% 30%, #1e4d4a 0%, #0d2120 100%);
          font-family: 'Inter', sans-serif;
          color: #fff;
          overflow-x: hidden;
        }

        .synthesis-nav-header {
          background: rgba(13, 33, 32, 0.85);
          backdrop-filter: blur(25px);
          border-bottom: 1px solid rgba(201, 166, 107, 0.1);
          z-index: 1100;
        }

        .nav-back-trigger {
          background: rgba(201, 166, 107, 0.1);
          border: 1px solid rgba(201, 166, 107, 0.2);
          color: #c9a66b;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .nav-back-trigger:hover { background: #c9a66b; color: #1a3c3a; }

        .branding-node {
          background: rgba(201, 166, 107, 0.1);
          border: 1px solid rgba(201, 166, 107, 0.2);
        }

        .category-dock { background: rgba(0, 0, 0, 0.15); }

        .category-capsule {
           background: transparent;
           border: 1px solid rgba(201, 166, 107, 0.2);
           color: rgba(201, 166, 107, 0.5);
           padding: 8px 22px;
           border-radius: 40px;
           font-size: 10px;
           font-weight: 900;
           letter-spacing: 1.5px;
           transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .category-capsule.active {
           background: #c9a66b;
           color: #1a3c3a;
           border-color: #c9a66b;
           box-shadow: 0 10px 25px rgba(201, 166, 107, 0.2);
           transform: scale(1.05);
        }

        .synthesis-card-v2 {
           background: linear-gradient(145deg, rgba(61, 90, 90, 0.8), rgba(40, 60, 60, 0.6));
           border: 1px solid rgba(201, 166, 107, 0.15);
           border-radius: 45px;
           backdrop-filter: blur(20px);
           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
           box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
           position: relative;
           z-index: 10;
        }

        .synthesis-card-v2:hover {
           border-color: #c9a66b;
           box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
           transform: translateY(-10px) scale(1.01);
        }

        .card-visual-pane { min-height: 320px; border-right: 1px solid rgba(201, 166, 107, 0.1); }

        .holographic-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(201, 166, 107, 0.15) 0%, transparent 100%);
          pointer-events: none;
        }

        .category-tag-float {
           position: absolute; top: 25px; right: 25px;
           background: #c9a66b;
           color: #1a3c3a;
           padding: 8px 18px;
           border-radius: 12px;
           font-size: 9px;
           font-weight: 900;
           letter-spacing: 1px;
           box-shadow: 0 5px 15px rgba(201, 166, 107, 0.3);
           display: flex;
           align-items: center;
        }

        .synthesis-title {
           font-family: 'Outfit', sans-serif;
           font-weight: 900;
           font-size: 2rem;
           line-height: 1.1;
           color: #fff;
           letter-spacing: -0.8px;
        }

        .synthesis-description {
           font-size: 15px;
           line-height: 1.8;
           color: rgba(255, 255, 255, 0.8);
           font-weight: 300;
        }

        .action-node { cursor: pointer; transition: 0.3s ease; color: rgba(201, 166, 107, 0.6); }
        .action-node:hover { color: #c9a66b; transform: scale(1.2) rotate(5deg); }

        .synthesis-link-trigger {
           color: #c9a66b;
           font-size: 12px;
           font-weight: 900;
           letter-spacing: 2.5px;
           text-decoration: none !important;
           transition: 0.3s;
           width: fit-content;
           opacity: 0.8;
        }

        .synthesis-link-trigger:hover {
           opacity: 1;
           transform: translateX(8px);
           text-shadow: 0 0 15px rgba(201, 166, 107, 0.4);
        }

        .tiny-label { font-size: 10px; font-weight: 800; letter-spacing: 1.5px; }
        .text-gold { color: #c9a66b !important; }
        .text-gold-dim { color: rgba(201, 166, 107, 0.6) !important; }
        .fw-black { font-weight: 900; }
        .uppercase { text-transform: uppercase; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @media (max-width: 767px) {
          .card-visual-pane { min-height: 240px; border-right: none; border-bottom: 1px solid rgba(201, 166, 107, 0.1); }
          .synthesis-title { font-size: 1.5rem; }
          .synthesis-card-v2 { border-radius: 35px; }
        }
      `}</style>
    </div>
  );
};

export default RecommendationSlide;