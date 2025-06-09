import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "react-router-dom";
import { useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    scale: 1.05,
    y: -20,
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6
};

const loadingVariants = {
  initial: {
    scaleX: 0,
  },
  animate: {
    scaleX: 1,
  },
  exit: {
    scaleX: 0,
    transition: {
      delay: 0.3,
      duration: 0.3
    }
  }
};

export default function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      const newPath = window.location.pathname;
      if (newPath !== currentPath) {
        setIsLoading(true);
        setTimeout(() => {
          setCurrentPath(newPath);
          setTimeout(() => setIsLoading(false), 300);
        }, 300);
      }
    };

    // Listen for route changes
    window.addEventListener('popstate', handleLocationChange);
    
    // Override pushState and replaceState
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };
    
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [currentPath]);

  return (
    <>
      {/* Loading Bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 z-50 origin-left"
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        )}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen"
        >
          {/* Subtle particles during transition */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20],
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
          
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
