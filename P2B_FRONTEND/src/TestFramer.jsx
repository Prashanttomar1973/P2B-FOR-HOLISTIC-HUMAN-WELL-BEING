import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
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

  const items = [{id: 1, title: "Test 1"}, {id: 2, title: "Test 2"}];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <AnimatePresence>
        {items.map(item => (
          <motion.div key={item.id} variants={itemVariants} className="test-item">
            {item.title}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
