import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
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
  Code,
  Brain,
  Zap,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Float, Box } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { personalInfo } from "@/lib/data";
import ErrorBoundary from "@/components/ErrorBoundary";

const typewriterTexts = [
  "AI Engineer",
  "Full Stack Developer",
  "Machine Learning Expert",
  "Digital Innovator",
  "Problem Solver",
  "Creative Technologist",
];

// 3D Floating Orb Component
function FloatingOrb({ position, color, scale = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.3;
      meshRef.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() * 0.8) * 0.5;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// 3D Tech Icons (simplified without font dependencies)
function TechIcon3D({ position, rotation, color }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.getElapsedTime() + rotation) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Box args={[0.4, 0.4, 0.4]}>
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
        </Box>
      </Float>
    </group>
  );
}

// 3D Scene Component
function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6b" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />

      {/* Floating orbs */}
      <FloatingOrb position={[-2, 1, 0]} color="#ff6b6b" scale={0.8} />
      <FloatingOrb position={[2, -1, -1]} color="#4ecdc4" scale={1.2} />
      <FloatingOrb position={[0, 2, -2]} color="#a55eea" scale={0.6} />
      <FloatingOrb position={[-1, -2, 1]} color="#feca57" scale={0.9} />

      {/* Tech icons */}
      <TechIcon3D position={[-1.5, 0.5, 0.5]} rotation={0} color="#ff6b6b" />
      <TechIcon3D position={[1.5, -0.5, 0.3]} rotation={1} color="#4ecdc4" />
      <TechIcon3D position={[0, 1.5, -0.5]} rotation={2} color="#a55eea" />
      <TechIcon3D position={[0, -1.5, 0.8]} rotation={3} color="#feca57" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
// Animated Background Particles
const AnimatedParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            i % 4 === 0
              ? "particle-coral"
              : i % 4 === 1
                ? "particle-emerald"
                : i % 4 === 2
                  ? "particle-lavender"
                  : "bg-amber"
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Floating Action Card
const FloatingCard = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: -15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{
      duration: 0.8,
      delay,
      type: "spring",
      stiffness: 100,
    }}
    className={`card-3d ${className}`}
  >
    {children}
  </motion.div>
);

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const text = typewriterTexts[currentTextIndex];
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setIsTyping(false);
          setTimeout(() => {
            setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
            setIsTyping(true);
          }, 1000);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentTextIndex, isTyping]);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { label: "Projects", value: "25+", icon: Code, color: "coral" },
    { label: "Experience", value: "5+", icon: Brain, color: "emerald" },
    { label: "Technologies", value: "20+", icon: Zap, color: "lavender" },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <AnimatedParticles />

      {/* 3D Background Scene */}
      <div className="absolute inset-0 opacity-60">
        <ErrorBoundary>
          <Hero3DScene />
        </ErrorBoundary>
      </div>

      {/* Interactive mouse follower */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-coral/20 to-emerald/20 blur-3xl pointer-events-none"
        style={{
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen py-20">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Status Badge with Animation */}
            <FloatingCard delay={0.2}>
              <motion.div
                className="inline-flex items-center space-x-3 glass-card px-6 py-3 mb-6 hover-glow"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="status-online" />
                <Sparkles className="w-4 h-4 text-emerald animate-pulse" />
                <span className="text-sm font-medium text-white">
                  Available for exciting opportunities
                </span>
              </motion.div>
            </FloatingCard>

            {/* Greeting with 3D Effect */}
            <FloatingCard delay={0.4}>
              <div className="space-y-6">
                <motion.p
                  className="text-slate-400 text-xl font-medium"
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 10 - 5}deg) rotateY(${mousePosition.x * 10 - 5}deg)`,
                  }}
                >
                  Hello, I'm
                </motion.p>

                <motion.h1
                  className="heading-1 text-white leading-tight"
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 5 - 2.5}deg) rotateY(${mousePosition.x * 5 - 2.5}deg)`,
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="block"
                  >
                    {personalInfo.name.split(" ")[0]}
                  </motion.span>
                  <motion.span
                    className="gradient-text-coral block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    {personalInfo.name.split(" ")[1]}
                  </motion.span>
                </motion.h1>
              </div>
            </FloatingCard>

            {/* Enhanced Typewriter Effect */}
            <FloatingCard delay={0.6}>
              <div className="h-20 flex items-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white/90">
                  I'm a{" "}
                  <span className="gradient-text-emerald font-display">
                    {displayText}
                  </span>
                  <motion.span
                    className="inline-block w-1 h-12 bg-coral ml-2"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </h2>

                {/* Floating tech icons around typewriter */}
                <div className="relative">
                  {[Code, Brain, Zap, Sparkles].map((Icon, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${100 + i * 40}px`,
                        top: `${-20 + i * 10}px`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 360],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          i % 3 === 0
                            ? "text-coral"
                            : i % 3 === 1
                              ? "text-emerald"
                              : "text-lavender"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </FloatingCard>

            {/* Enhanced Description */}
            <FloatingCard delay={0.8}>
              <motion.p
                className="body-large text-slate-300 max-w-2xl leading-relaxed"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {personalInfo.bio}
              </motion.p>
            </FloatingCard>

            {/* Enhanced Action Buttons */}
            <FloatingCard delay={1}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotateX: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={scrollToProjects}
                    className="btn-coral text-lg px-10 py-5 relative overflow-hidden group"
                    size="lg"
                  >
                    <span className="relative z-10 flex items-center">
                      View My Work
                      <ArrowDown className="ml-3 w-5 h-5 group-hover:animate-bounce-gentle" />
                    </span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, rotateX: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="btn-emerald text-lg px-10 py-5" size="lg">
                    <Download className="mr-3 w-5 h-5" />
                    Download Resume
                  </Button>
                </motion.div>
              </div>
            </FloatingCard>

            {/* Enhanced Social Links */}
            <FloatingCard delay={1.2}>
              <div className="flex items-center space-x-6 pt-4">
                <span className="text-slate-400 text-sm font-medium">
                  Connect with me:
                </span>
                {[
                  {
                    icon: Github,
                    href: personalInfo.social.github,
                    label: "GitHub",
                    color: "coral",
                  },
                  {
                    icon: Linkedin,
                    href: personalInfo.social.linkedin,
                    label: "LinkedIn",
                    color: "emerald",
                  },
                  {
                    icon: Mail,
                    href: `mailto:${personalInfo.email}`,
                    label: "Email",
                    color: "lavender",
                  },
                ].map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-14 h-14 glass-card flex items-center justify-center text-white/70 hover:text-${color} transition-all duration-300 hover-lift`}
                    whileHover={{
                      scale: 1.15,
                      rotateY: 15,
                      rotateX: 15,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </FloatingCard>

            {/* Enhanced Stats */}
            <FloatingCard delay={1.4}>
              <div className="flex items-center space-x-12 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className="text-center group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Icon
                          className={`w-8 h-8 text-${stat.color} group-hover:animate-bounce-gentle`}
                        />
                        <div
                          className={`text-3xl md:text-4xl font-bold gradient-text-${stat.color}`}
                        >
                          {stat.value}
                        </div>
                        <div className="text-slate-400 text-sm font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </FloatingCard>
          </div>

          {/* Enhanced Sidebar Cards */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Card with 3D Effect */}
            <FloatingCard delay={0.8} className="floating-3d">
              <div className="glass-card p-6 space-y-4 hover-glow">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-16 h-16 glass-card flex items-center justify-center relative overflow-hidden"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-coral font-bold text-2xl font-display">
                      AJ
                    </span>
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 animated-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="animated-border-inner" />
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      Alex Johnson
                    </h3>
                    <p className="text-slate-400">Senior Developer</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-3 text-sm text-slate-400">
                    <MapPin className="w-4 h-4 text-emerald" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-400">
                    <Clock className="w-4 h-4 text-coral" />
                    <span>
                      {currentTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      PST
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-400">
                    <Coffee className="w-4 h-4 text-amber animate-wave" />
                    <span>Fueled by coffee & curiosity</span>
                  </div>
                </div>
              </div>
            </FloatingCard>

            {/* Quote Card with Morphing Background */}
            <FloatingCard delay={1} className="floating-3d">
              <div className="glass-card p-6 relative overflow-hidden hover-glow">
                <div className="absolute inset-0 morph-shape opacity-10" />
                <blockquote className="text-white/90 italic leading-relaxed relative z-10">
                  "{personalInfo.quote}"
                </blockquote>
                <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
                  <div className="text-slate-400 text-sm">Personal Motto</div>
                </div>
              </div>
            </FloatingCard>

            {/* Status Card with Animated Indicators */}
            <FloatingCard delay={1.2} className="floating-3d">
              <div className="glass-card p-6 space-y-4 hover-glow">
                <h3 className="text-white font-semibold flex items-center">
                  <Zap className="w-5 h-5 text-amber mr-2" />
                  Current Focus
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Learning AI/ML",
                      status: "Active",
                      color: "emerald",
                    },
                    {
                      label: "Building Projects",
                      status: "In Progress",
                      color: "coral",
                    },
                    {
                      label: "Open to Work",
                      status: "Available",
                      color: "emerald",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center justify-between group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-slate-400 text-sm group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                      <Badge
                        className={`glass-card border-${item.color}/30 text-${item.color} text-xs hover-glow`}
                      >
                        {item.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          className="flex flex-col items-center space-y-3 text-slate-400 group cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToProjects}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs font-medium group-hover:text-coral transition-colors">
            Scroll to explore
          </span>
          <div className="w-6 h-12 glass-card rounded-full flex justify-center pt-2 group-hover:glow-coral">
            <motion.div
              className="w-1 h-4 bg-coral rounded-full"
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
