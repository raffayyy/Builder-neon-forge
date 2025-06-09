import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
  angle: number;
  angleVelocity: number;
  trail?: { x: number; y: number }[];
}

interface ParticleSystemProps {
  count?: number;
  type?: 'stars' | 'fireflies' | 'bubbles' | 'snow' | 'energy' | 'magic' | 'matrix' | 'neural';
  className?: string;
  interactive?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
  speed?: number;
  size?: number;
  trail?: boolean;
}

const PARTICLE_CONFIGS = {
  stars: {
    count: 50,
    colors: ['#ffffff', '#ffd700', '#87ceeb', '#ffb6c1'],
    speed: 0.2,
    size: 2,
    life: 300,
    trail: false,
  },
  fireflies: {
    count: 30,
    colors: ['#ffff99', '#ffeb3b', '#fff176', '#ffee58'],
    speed: 0.5,
    size: 3,
    life: 200,
    trail: true,
  },
  bubbles: {
    count: 25,
    colors: ['rgba(135, 206, 235, 0.6)', 'rgba(255, 255, 255, 0.4)', 'rgba(173, 216, 230, 0.5)'],
    speed: 1,
    size: 15,
    life: 180,
    trail: false,
  },
  snow: {
    count: 60,
    colors: ['#ffffff', '#f0f8ff', '#e6f3ff'],
    speed: 0.8,
    size: 4,
    life: 400,
    trail: false,
  },
  energy: {
    count: 40,
    colors: ['#00ffff', '#0080ff', '#4040ff', '#8000ff'],
    speed: 2,
    size: 2,
    life: 100,
    trail: true,
  },
  magic: {
    count: 35,
    colors: ['#ff69b4', '#dda0dd', '#9370db', '#ba55d3'],
    speed: 1.5,
    size: 3,
    life: 150,
    trail: true,
  },
  matrix: {
    count: 80,
    colors: ['#00ff00', '#39ff14', '#32cd32', '#00fa9a'],
    speed: 3,
    size: 1,
    life: 200,
    trail: true,
  },
  neural: {
    count: 45,
    colors: ['#ff6b35', '#f7931e', '#ffd23f', '#ff4081'],
    speed: 1.2,
    size: 2,
    life: 180,
    trail: true,
  },
};

class ParticleSystem {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: any;
  private mouse: { x: number; y: number; radius: number } = { x: 0, y: 0, radius: 100 };
  private interactive: boolean;
  private animationId: number | null = null;

  constructor(canvas: HTMLCanvasElement, type: string, interactive: boolean = false) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.config = PARTICLE_CONFIGS[type] || PARTICLE_CONFIGS.stars;
    this.interactive = interactive;
    this.initParticles();
    this.setupEventListeners();
  }

  private initParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.count; i++) {
      this.particles.push(this.createParticle(i));
    }
  }

  private createParticle(id: number): Particle {
    const maxLife = this.config.life + Math.random() * 100;
    return {
      id,
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * this.config.speed,
      vy: (Math.random() - 0.5) * this.config.speed,
      life: maxLife,
      maxLife,
      size: this.config.size + Math.random() * 2,
      color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
      opacity: 0.5 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      angleVelocity: (Math.random() - 0.5) * 0.02,
      trail: this.config.trail ? [] : undefined,
    };
  }

  private setupEventListeners() {
    if (!this.interactive) return;

    const updateMouse = (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    };

    this.canvas.addEventListener('mousemove', updateMouse);
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = touch.clientX - rect.left;
      this.mouse.y = touch.clientY - rect.top;
    });
  }

  private updateParticle(particle: Particle) {
    // Interactive effects
    if (this.interactive) {
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.mouse.radius) {
        const force = (this.mouse.radius - distance) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * 0.2;
        particle.vy -= Math.sin(angle) * force * 0.2;
      }
    }

    // Update trail
    if (particle.trail) {
      particle.trail.push({ x: particle.x, y: particle.y });
      if (particle.trail.length > 10) {
        particle.trail.shift();
      }
    }

    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.angle += particle.angleVelocity;

    // Update life
    particle.life--;
    particle.opacity = (particle.life / particle.maxLife) * 0.8;

    // Boundary conditions
    if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -0.5;
    if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -0.5;

    // Respawn if life is over
    if (particle.life <= 0) {
      Object.assign(particle, this.createParticle(particle.id));
    }
  }

  private drawParticle(particle: Particle) {
    this.ctx.save();
    this.ctx.globalAlpha = particle.opacity;

    // Draw trail
    if (particle.trail && particle.trail.length > 1) {
      this.ctx.strokeStyle = particle.color;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
      
      for (let i = 1; i < particle.trail.length; i++) {
        this.ctx.globalAlpha = (i / particle.trail.length) * particle.opacity * 0.5;
        this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
      }
      this.ctx.stroke();
    }

    // Draw particle
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.translate(particle.x, particle.y);
    this.ctx.rotate(particle.angle);

    if (particle.color.includes('rgba')) {
      this.ctx.fillStyle = particle.color;
    } else {
      this.ctx.fillStyle = particle.color;
      this.ctx.shadowColor = particle.color;
      this.ctx.shadowBlur = particle.size * 2;
    }

    this.ctx.beginPath();
    this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }

  public animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const particle of this.particles) {
      this.updateParticle(particle);
      this.drawParticle(particle);
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  public resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

export default function AdvancedParticleSystem({
  count = 50,
  type = 'stars',
  className = '',
  interactive = false,
  intensity = 'medium',
  color,
  speed,
  size,
  trail,
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Adjust particle count based on intensity and performance
  const adjustedCount = useMemo(() => {
    const baseCount = count || PARTICLE_CONFIGS[type]?.count || 50;
    const multiplier = {
      low: 0.5,
      medium: 1,
      high: 1.5,
    }[intensity];
    
    // Reduce count on mobile devices
    const isMobile = window.innerWidth < 768;
    return Math.floor(baseCount * multiplier * (isMobile ? 0.6 : 1));
  }, [count, type, intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      if (particleSystemRef.current) {
        particleSystemRef.current.resize(rect.width, rect.height);
      }
    };

    // Initialize particle system
    updateCanvasSize();
    particleSystemRef.current = new ParticleSystem(canvas, type, interactive);
    
    // Override config if custom props provided
    if (particleSystemRef.current) {
      const config = (particleSystemRef.current as any).config;
      if (color) config.colors = [color];
      if (speed !== undefined) config.speed = speed;
      if (size !== undefined) config.size = size;
      if (trail !== undefined) config.trail = trail;
      config.count = adjustedCount;
      
      // Reinitialize particles with new config
      (particleSystemRef.current as any).initParticles();
      particleSystemRef.current.animate();
    }

    // Handle resize
    window.addEventListener('resize', updateCanvasSize);

    // Handle visibility change for performance
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.destroy();
      }
      window.removeEventListener('resize', updateCanvasSize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [type, interactive, adjustedCount, color, speed, size, trail]);

  // Pause/resume animation based on visibility
  useEffect(() => {
    if (particleSystemRef.current) {
      if (isVisible) {
        particleSystemRef.current.animate();
      } else {
        particleSystemRef.current.destroy();
      }
    }
  }, [isVisible]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0.5 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
}

// Preset particle effect components for easy usage
export const StarField = (props: Omit<ParticleSystemProps, 'type'>) => (
  <AdvancedParticleSystem {...props} type="stars" />
);

export const Fireflies = (props: Omit<ParticleSystemProps, 'type'>) => (
  <AdvancedParticleSystem {...props} type="fireflies" />
);

export const FloatingBubbles = (props: Omit<ParticleSystemProps, 'type'>) => (
  <AdvancedParticleSystem {...props} type="bubbles" />
);

export const SnowEffect = (props: Omit<ParticleSystemProps, 'type'>) => (
  <AdvancedParticleSystem {...props} type="snow" />
);

export const EnergyField = (props: Omit<ParticleSystemProps, 'type'>) => (
  <AdvancedParticleSystem {...props} type="energy" />
);

export const MagicSparkles = (props: Omit<ParticleSystemProps, 'type'>) => (
  <AdvancedParticleSystem {...props} type="magic" />
);

export const MatrixRain = (props: Omit<ParticleSystemProps, 'type'>) => (
  <AdvancedParticleSystem {...props} type="matrix" />
);

export const NeuralNetwork = (props: Omit<ParticleSystemProps, 'type'>) => (
  <AdvancedParticleSystem {...props} type="neural" />
);

// Performance monitoring hook
export const useParticlePerformance = () => {
  const [fps, setFps] = useState(60);
  const [shouldReduceParticles, setShouldReduceParticles] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFps = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(currentFps);
        setShouldReduceParticles(currentFps < 30);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFps);
    };

    const rafId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return { fps, shouldReduceParticles };
};
