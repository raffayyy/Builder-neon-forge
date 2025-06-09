import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  Zap,
  Terminal,
  Code,
  Brain,
  Cpu,
  Wifi,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";

const typewriterTexts = [
  "AI Engineer",
  "Full Stack Developer",
  "Machine Learning Expert",
  "Digital Innovator",
  "Code Architect",
  "Data Scientist",
  "Tech Visionary",
];

const matrixChars =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";

const FloatingParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 bg-neon-cyan rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 200 - 100],
      y: [0, Math.random() * 200 - 100],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const CircuitLine = ({ from, to, delay = 0 }) => (
  <motion.div
    className="absolute"
    style={{
      left: from.x,
      top: from.y,
      width: Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2),
      height: "2px",
      transformOrigin: "left center",
      transform: `rotate(${Math.atan2(to.y - from.y, to.x - from.x)}rad)`,
    }}
  >
    <motion.div
      className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 2, delay, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-0 left-0 w-4 h-full bg-white"
      initial={{ x: 0 }}
      animate={{ x: "100%" }}
      transition={{
        duration: 3,
        delay: delay + 2,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ filter: "blur(2px)" }}
    />
  </motion.div>
);

const NeuralNode = ({ x, y, delay = 0, size = "small" }) => {
  const nodeSize = size === "large" ? "w-6 h-6" : "w-4 h-4";
  return (
    <motion.div
      className={`absolute ${nodeSize} rounded-full border-2 border-neon-cyan bg-neon-cyan/20 backdrop-blur-sm`}
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay }}
    >
      <motion.div
        className="w-full h-full rounded-full bg-neon-cyan"
        animate={{
          scale: [0.3, 1, 0.3],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          delay: delay + 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  const [matrixCode, setMatrixCode] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const controls = useAnimation();

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

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, 8000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Matrix code generation
  useEffect(() => {
    const generateMatrixCode = () => {
      let code = "";
      for (let i = 0; i < 50; i++) {
        code += matrixChars.charAt(
          Math.floor(Math.random() * matrixChars.length),
        );
      }
      setMatrixCode(code);
    };

    generateMatrixCode();
    const matrixInterval = setInterval(generateMatrixCode, 100);
    return () => clearInterval(matrixInterval);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const neuralNetworkNodes = [
    { x: "10%", y: "20%", delay: 0, size: "small" },
    { x: "20%", y: "40%", delay: 0.2, size: "large" },
    { x: "30%", y: "60%", delay: 0.4, size: "small" },
    { x: "70%", y: "25%", delay: 0.6, size: "small" },
    { x: "80%", y: "45%", delay: 0.8, size: "large" },
    { x: "90%", y: "65%", delay: 1.0, size: "small" },
  ];

  const circuitConnections = [
    { from: { x: "10%", y: "20%" }, to: { x: "20%", y: "40%" }, delay: 1.2 },
    { from: { x: "20%", y: "40%" }, to: { x: "30%", y: "60%" }, delay: 1.4 },
    { from: { x: "70%", y: "25%" }, to: { x: "80%", y: "45%" }, delay: 1.6 },
    { from: { x: "80%", y: "45%" }, to: { x: "90%", y: "65%" }, delay: 1.8 },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Multi-layered animated background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-void via-deep-space to-cosmic-blue" />

        {/* Neural network background */}
        <div className="absolute inset-0 bg-neural-network opacity-30" />

        {/* Animated cyber grid */}
        <div className="absolute inset-0 bg-cyber-grid bg-[size:100px_100px] animate-pulse opacity-20" />

        {/* Matrix rain effect */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 text-neon-green/30 font-matrix text-xs whitespace-nowrap"
              style={{ left: `${i * 5}%` }}
              animate={{
                y: ["-100%", "100vh"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 5,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {matrixCode.slice(i * 10, (i + 1) * 10)}
            </motion.div>
          ))}
        </div>

        {/* Floating energy orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-sm"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: [
                "radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(191,0,255,0.3) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(255,0,128,0.3) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(0,255,136,0.3) 0%, transparent 70%)",
              ][i % 4],
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.1} />
        ))}

        {/* Neural network visualization */}
        {neuralNetworkNodes.map((node, i) => (
          <NeuralNode
            key={i}
            x={node.x}
            y={node.y}
            delay={node.delay}
            size={node.size}
          />
        ))}

        {/* Circuit connections */}
        {circuitConnections.map((connection, i) => (
          <CircuitLine
            key={i}
            from={connection.from}
            to={connection.to}
            delay={connection.delay}
          />
        ))}

        {/* Mouse-following energy trail */}
        <motion.div
          className="absolute w-1 h-1 bg-neon-cyan rounded-full shadow-neon-cyan"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
          animate={{
            scale: [1, 3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center space-y-12">
          {/* Terminal-style greeting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-4"
          >
            <motion.div
              className="inline-block p-4 cyber-border rounded-lg font-matrix text-sm text-neon-green mb-8"
              animate={{
                borderColor: [
                  "rgba(0,255,255,0.3)",
                  "rgba(0,255,136,0.8)",
                  "rgba(0,255,255,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4" />
                <span>alex@portfolio:~$</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  _
                </motion.span>
              </div>
              <div className="mt-2">
                <span className="text-neon-cyan">Hello, World! </span>
                <span className="text-white">Initializing portfolio...</span>
              </div>
              <div className="mt-1 text-neon-purple">
                Status: <span className="text-neon-green">ONLINE</span> ✓
              </div>
            </motion.div>

            {/* Main name with massive effects */}
            <motion.h1
              className={`heading-1 relative ${
                isGlitching ? "animate-glitch" : ""
              }`}
              data-text={personalInfo.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              <span className="text-shimmer bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                {personalInfo.name}
              </span>

              {/* Holographic overlay */}
              <motion.div
                className="absolute inset-0 bg-hologram opacity-20 rounded-lg"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Energy rings around name */}
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-neon-cyan/30 rounded-lg"
                  animate={{
                    scale: [1, 1.2 + i * 0.1, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.h1>
          </motion.div>

          {/* Enhanced typewriter effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="h-24 flex items-center justify-center"
          >
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
              <span className="text-white/90">I'm a </span>
              <div className="inline-block relative">
                <motion.span
                  className="neon-text-cyan font-cyber"
                  animate={
                    isGlitching
                      ? {
                          textShadow: [
                            "0 0 10px #00ffff",
                            "2px 0 0 #ff0080, -2px 0 0 #00ffff",
                            "0 0 10px #00ffff",
                          ],
                        }
                      : {}
                  }
                >
                  {displayText}
                </motion.span>
                <motion.span
                  className="inline-block w-1 h-12 bg-neon-cyan ml-2"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />

                {/* Tech icons floating around the text */}
                {[Brain, Code, Cpu, Zap].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${100 + i * 30}%`,
                      top: `${-20 + i * 10}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 360],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="w-8 h-8 text-neon-purple" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bio with enhanced styling */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="body-large text-white/80 max-w-4xl mx-auto leading-relaxed cyber-border p-8 rounded-lg backdrop-blur-xl"
          >
            <span className="text-neon-cyan font-cyber">&gt; </span>
            {personalInfo.bio}
            <motion.span
              className="inline-block w-2 h-6 bg-neon-cyan ml-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.p>

          {/* Enhanced action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={scrollToProjects}
                className="holo-button px-12 py-4 text-xl font-cyber tracking-wider group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative flex items-center space-x-3">
                  <Zap className="w-6 h-6" />
                  <span>EXPLORE_PROJECTS.exe</span>
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotateX: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="neon-button px-12 py-4 text-xl font-cyber tracking-wider"
              >
                <Download className="w-6 h-6 mr-3" />
                DOWNLOAD_CV.zip
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced social links with 3D effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="flex items-center justify-center space-x-8 pt-12"
          >
            {[
              {
                icon: Github,
                href: personalInfo.social.github,
                label: "GitHub",
                color: "neon-cyan",
              },
              {
                icon: Linkedin,
                href: personalInfo.social.linkedin,
                label: "LinkedIn",
                color: "neon-purple",
              },
              {
                icon: Mail,
                href: `mailto:${personalInfo.email}`,
                label: "Email",
                color: "neon-pink",
              },
            ].map(({ icon: Icon, href, label, color }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-16 h-16 cyber-border rounded-lg flex items-center justify-center group relative overflow-hidden`}
                whileHover={{
                  scale: 1.2,
                  rotateY: 360,
                  z: 50,
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 50, rotateY: -180 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{
                  duration: 1,
                  delay: 3.5 + index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {/* Background pulse */}
                <motion.div
                  className={`absolute inset-0 bg-${color}/20 rounded-lg`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Circuit traces */}
                <div className="absolute inset-0 opacity-30">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <path
                      d="M8 8h48v48H8z M16 16h32v32H16z M32 8v48 M8 32h48"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      className={`text-${color}`}
                    />
                  </svg>
                </div>

                <Icon
                  className={`w-8 h-8 text-white/70 group-hover:text-${color} transition-all duration-500 relative z-10`}
                />

                {/* Floating particles around icons */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-current rounded-full"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${20 + i * 10}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                ))}

                {/* Tooltip */}
                <motion.div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded text-sm font-cyber opacity-0 group-hover:opacity-100 pointer-events-none"
                  whileHover={{ scale: 1.1 }}
                >
                  {label}
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          {/* System status indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
            className="fixed bottom-8 right-8 cyber-border rounded-lg p-4 font-matrix text-sm"
          >
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-2 h-2 bg-neon-green rounded-full"
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 1.5, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-neon-green">SYSTEM_ONLINE</span>
            </div>
            <div className="text-neon-cyan text-xs mt-1">
              <Wifi className="w-3 h-3 inline mr-1" />
              CONNECTION_STABLE
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 4.5 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          className="w-8 h-16 cyber-border rounded-full flex flex-col items-center justify-center relative overflow-hidden"
          whileHover={{ scale: 1.1 }}
        >
          {/* Scrolling indicator */}
          <motion.div
            className="w-1 h-4 bg-neon-cyan rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Data stream in scroll indicator */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Tooltip */}
          <motion.div
            className="absolute -right-20 top-1/2 transform -translate-y-1/2 text-neon-cyan text-sm font-cyber opacity-0 hover:opacity-100 transition-opacity"
            whileHover={{ x: 5 }}
          >
            SCROLL_DOWN
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
