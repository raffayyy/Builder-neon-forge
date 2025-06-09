import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Coffee,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { personalInfo } from "@/lib/data";
import soundManager from "@/lib/soundManager";

const typewriterTexts = [
  "AI Engineer",
  "Full Stack Developer",
  "Machine Learning Expert",
  "Digital Innovator",
];

// High-Performance Canvas-Based Particle System
const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isReduced, setIsReduced] = useState(false);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    phase: number;
  }>>([]);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mediaQuery.matches);

    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Initialize particles
    const particleCount = 15; // Further reduced for better performance
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    let lastTime = 0;
    const targetFPS = 30; // Cap at 30fps for better performance
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.phase += 0.02;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Pulsing effect
        const pulseOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.phase));

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = pulseOpacity;
        
        // Glow effect
        ctx.shadowColor = '#4fd1c5';
        ctx.shadowBlur = particle.size * 3;
        
        ctx.fillStyle = '#4fd1c5';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      lastTime = currentTime;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isReduced]);

  if (isReduced) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'auto' }}
      />
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/2 to-emerald-500/3" />
    </div>
  );
};

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentText = typewriterTexts[currentTextIndex];

    if (isTyping) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentTextIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative py-20"
    >
      <ParticlesBackground />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 font-medium">
                  Available for hire
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block mb-2">Hello, I'm</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  {personalInfo?.name || "Alex Johnson"}
                </span>
              </h1>

              <div className="h-12 flex items-center justify-center lg:justify-start">
                <span className="text-xl md:text-2xl text-gray-300 font-medium">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1 text-blue-400"
                  >
                    |
                  </motion.span>
                </span>
              </div>

              <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {personalInfo?.bio ||
                  "Passionate developer specializing in AI and modern web development."}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {[
                "React",
                "TypeScript",
                "Next.js",
                "Python",
                "AI/ML",
                "Node.js",
              ].map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-gray-900/50 border-gray-700/50 text-gray-300 hover:bg-gray-800/50 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  onClick={() => {
                    soundManager.playClick();
                    // Fixed analytics tracking
                    if (typeof window !== 'undefined' && (window as any).portfolioTracker) {
                      (window as any).portfolioTracker.trackProjectView();
                    }
                    // Smooth scroll with error handling
                    const projectsElement = document.getElementById("projects");
                    if (projectsElement) {
                      projectsElement.scrollIntoView({ 
                        behavior: "smooth",
                        block: "start"
                      });
                    }
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <Sparkles className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">View My Work</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="relative border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full px-8 py-3 transition-all duration-300 group overflow-hidden"
                  onClick={() => {
                    soundManager.playClick();
                    // Fixed analytics tracking
                    if (typeof window !== 'undefined' && (window as any).portfolioTracker) {
                      (window as any).portfolioTracker.trackDownload();
                    }
                    // Safe window open
                    const resumeUrl = personalInfo?.resume?.url || "/resume.pdf";
                    window.open(resumeUrl, "_blank", "noopener,noreferrer");
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <Download className="w-5 h-5 mr-2" />
                  </motion.div>
                  <span className="relative z-10">Download CV</span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-6"
            >
              <motion.a
                href={personalInfo?.social?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-gray-400 hover:text-white transition-colors duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).portfolioTracker) {
                    (window as any).portfolioTracker.trackSocialClick('github');
                  }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gray-700 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                <Github className="w-6 h-6 relative z-10" />
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  GitHub
                </motion.div>
              </motion.a>
              
              <motion.a
                href={personalInfo?.social?.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-gray-400 hover:text-white transition-colors duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).portfolioTracker) {
                    (window as any).portfolioTracker.trackSocialClick('linkedin');
                  }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-blue-600 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                <Linkedin className="w-6 h-6 relative z-10" />
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  LinkedIn
                </motion.div>
              </motion.a>
              
              <motion.a
                href={`mailto:${personalInfo?.email || "contact@example.com"}`}
                className="relative text-gray-400 hover:text-white transition-colors duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).portfolioTracker) {
                    (window as any).portfolioTracker.trackContact();
                  }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-emerald-600 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                <Mail className="w-6 h-6 relative z-10" />
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  Email
                </motion.div>
              </motion.a>
            </motion.div>
          </div>

          {/* Profile Card */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative bg-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm shadow-2xl group"
              >
                {/* Floating elements around the card */}
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.8, 0.3] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
                
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-4xl font-bold text-white"
                      whileHover={{ scale: 1.1 }}
                    >
                      AJ
                    </motion.div>
                    
                    {/* Orbit animation */}
                    <motion.div
                      className="absolute inset-0 border-2 border-dashed border-emerald-400/30 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>

                  <div className="space-y-2">
                    <motion.h3 
                      className="text-xl font-semibold text-white"
                      whileHover={{ scale: 1.05 }}
                    >
                      {personalInfo?.name || "Alex Johnson"}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-400"
                      whileHover={{ color: "#ffffff" }}
                    >
                      {personalInfo?.title || "AI & Web Developer"}
                    </motion.p>
                  </div>

                  <motion.div 
                    className="grid grid-cols-2 gap-4 text-sm"
                    variants={{
                      hover: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                    whileHover="hover"
                  >
                    <motion.div 
                      className="flex items-center gap-2 text-gray-400"
                      variants={{
                        hover: { scale: 1.05, x: 5 }
                      }}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>
                        {personalInfo?.location || "San Francisco, CA"}
                      </span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 text-gray-400"
                      variants={{
                        hover: { scale: 1.05, x: -5 }
                      }}
                    >
                      <Clock className="w-4 h-4" />
                      <span>GMT-8</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 text-gray-400"
                      variants={{
                        hover: { scale: 1.05, x: 5 }
                      }}
                    >
                      <Coffee className="w-4 h-4" />
                      <span>Coffee Lover</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 text-emerald-400"
                      variants={{
                        hover: { scale: 1.05, x: -5 }
                      }}
                    >
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span>Available</span>
                    </motion.div>
                  </motion.div>

                  {/* Rating */}
                  <motion.div 
                    className="flex items-center justify-center gap-1 pt-4 border-t border-gray-700/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <Star
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm ml-2">
                      5.0 Rating
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => {
              const element = document.getElementById("skills");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm">Scroll Down</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
