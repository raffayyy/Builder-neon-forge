import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollProgress > 0.01 ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
        style={{ width: `${scrollProgress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Sparkle effect at the end */}
      <motion.div
        className="absolute top-0 w-2 h-1 bg-white rounded-full shadow-lg"
        style={{ left: `${scrollProgress * 100}%` }}
        animate={{
          boxShadow: [
            "0 0 0px rgba(255, 255, 255, 0)",
            "0 0 20px rgba(255, 255, 255, 0.8)",
            "0 0 0px rgba(255, 255, 255, 0)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
