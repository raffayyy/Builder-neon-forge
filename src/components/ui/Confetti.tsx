import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
  duration?: number;
  onComplete?: () => void;
  particleCount?: number;
}

export default function Confetti({ 
  active, 
  duration = 3000, 
  onComplete,
  particleCount = 50 
}: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    rotation: number;
    velocity: { x: number; y: number };
  }>>([]);

  const colors = [
    "#ff6b6b", // coral
    "#4ecdc4", // emerald
    "#a55eea", // lavender
    "#feca57", // amber
    "#48cae4", // blue
    "#f72585", // pink
  ];

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        velocity: {
          x: (Math.random() - 0.5) * 4,
          y: -(Math.random() * 8 + 8),
        },
      }));

      setParticles(newParticles);

      const timeout = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [active, duration, particleCount, onComplete]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
            opacity: 1,
          }}
          animate={{
            x: particle.x + particle.velocity.x * 100,
            y: particle.y + particle.velocity.y * 50,
            rotate: particle.rotation + 720,
            opacity: 0,
          }}
          transition={{
            duration: 3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
