import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  animationFrame: number;
  loadTime: number;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = false,
  position = 'bottom-left'
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    animationFrame: 0,
    loadTime: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    // Measure initial load time
    const loadTime = performance.now();
    
    const measurePerformance = () => {
      const currentTime = performance.now();
      frameCountRef.current++;

      // Calculate FPS every second
      if (currentTime - lastTimeRef.current >= 1000) {
        const fps = frameCountRef.current;
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;

        // Get memory usage (if available)
        const memoryInfo = (performance as any).memory;
        const memoryUsage = memoryInfo ? 
          Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024) : 0;

        setMetrics({
          fps,
          memoryUsage,
          animationFrame: currentTime,
          loadTime: loadTime
        });
      }

      animationIdRef.current = requestAnimationFrame(measurePerformance);
    };

    animationIdRef.current = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [enabled]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle visibility with Ctrl+Shift+P
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!enabled && !isVisible) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  const getFpsColor = (fps: number) => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMemoryColor = (memory: number) => {
    if (memory <= 50) return 'text-green-400';
    if (memory <= 100) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <AnimatePresence>
      {(enabled || isVisible) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`fixed ${positionClasses[position]} z-50 bg-black/80 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 font-mono text-xs text-white min-w-[200px]`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 font-semibold">Performance</span>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">FPS:</span>
              <span className={getFpsColor(metrics.fps)}>
                {metrics.fps.toFixed(0)}
              </span>
            </div>
            
            {metrics.memoryUsage > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">Memory:</span>
                <span className={getMemoryColor(metrics.memoryUsage)}>
                  {metrics.memoryUsage}MB
                </span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-400">Load:</span>
              <span className="text-blue-400">
                {(metrics.loadTime / 1000).toFixed(2)}s
              </span>
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-700/50 text-xs text-gray-500">
            Ctrl+Shift+P to toggle
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for tracking animation performance
export const useAnimationPerformance = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const lowFpsCountRef = useRef(0);

  useEffect(() => {
    let animationId: number;

    const measureFPS = () => {
      const currentTime = performance.now();
      frameCountRef.current++;

      if (currentTime - lastTimeRef.current >= 1000) {
        const fps = frameCountRef.current;
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;

        // Track low FPS occurrences
        if (fps < 30) {
          lowFpsCountRef.current++;
          if (lowFpsCountRef.current >= 3) {
            setIsLowPerformance(true);
          }
        } else {
          lowFpsCountRef.current = Math.max(0, lowFpsCountRef.current - 1);
          if (lowFpsCountRef.current === 0) {
            setIsLowPerformance(false);
          }
        }
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return { isLowPerformance };
};

// Default export for the component
export default PerformanceMonitor;
