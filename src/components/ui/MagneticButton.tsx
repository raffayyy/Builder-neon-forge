import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export default function MagneticButton({ 
  children, 
  className = "", 
  strength = 0.2, // Reduced default strength for better performance
  onClick,
  disabled = false
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number>();

  // Throttled magnetic effect for better performance
  const handleMagneticEffect = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const rect = buttonRef.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      setPosition({ x: deltaX, y: deltaY });
    });
  }, [strength, disabled]);

  const resetPosition = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      onMouseMove={handleMagneticEffect}
      onMouseLeave={resetPosition}
      onClick={onClick}
      disabled={disabled}
      animate={{ x: position.x, y: position.y }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 40,
        mass: 0.8 // Lighter mass for snappier animations
      }}
      whileHover={disabled ? {} : { scale: 1.02 }} // Reduced scale for performance
      whileTap={disabled ? {} : { scale: 0.98 }}
      style={{ willChange: 'transform' }} // GPU optimization
    >
      {children}
    </motion.button>
  );
}
