import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FloatingTooltipProps {
  content: string;
  children: React.ReactNode;
  delay?: number;
}

export default function FloatingTooltip({ 
  content, 
  children, 
  delay = 0.5 
}: FloatingTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        {children}
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, delay }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: position.x,
              top: position.y,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg border border-gray-700">
              {content}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
