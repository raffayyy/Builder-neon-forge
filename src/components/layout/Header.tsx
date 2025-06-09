import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Download,
  Github,
  Linkedin,
  Mail,
  Zap,
  Terminal,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";

const navigation = [
  { name: "Home", href: "#home", icon: "🏠" },
  { name: "About", href: "#about", icon: "👨‍💻" },
  { name: "Projects", href: "#projects", icon: "🚀" },
  { name: "Skills", href: "#skills", icon: "⚡" },
  { name: "Experience", href: "#experience", icon: "💼" },
  { name: "Contact", href: "#contact", icon: "📡" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 15000);

    return () => clearInterval(glitchInterval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Scan line effect */}
      <div className="scan-line" />

      {/* Matrix rain background */}
      <div className="matrix-rain" />

      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-neon-cyan/30 shadow-neon-cyan"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {/* Energy orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="energy-orb"
              style={{
                width: "20px",
                height: "20px",
                left: `${20 + i * 30}%`,
                top: "50%",
              }}
              animate={{
                x: [0, 50, -50, 0],
                y: [0, -20, 20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <nav className="container-custom">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo with holographic effect */}
            <motion.div
              className="flex items-center space-x-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("#home")}
            >
              <motion.div
                className={`relative w-14 h-14 cyber-border rounded-lg flex items-center justify-center overflow-hidden ${
                  isGlitching ? "animate-glitch" : ""
                }`}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
              >
                {/* Holographic background */}
                <div className="absolute inset-0 bg-hologram opacity-30 animate-hologram-shift" />

                {/* Circuit pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 56 56" className="w-full h-full">
                    <path
                      d="M8 8h40v40H8z M16 16h24v24H16z M28 8v48 M8 28h48"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      className="text-neon-cyan"
                    />
                  </svg>
                </div>

                <motion.span
                  className="text-2xl font-black text-neon-cyan z-10 font-cyber"
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
                  transition={{ duration: 0.2 }}
                >
                  AJ
                </motion.span>

                {/* Floating particles */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-neon-cyan rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + i * 15}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>

              <div className="hidden sm:block">
                <motion.h1
                  className="text-2xl font-bold font-cyber neon-text-cyan tracking-wider"
                  whileHover={{
                    textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
                    scale: 1.05,
                  }}
                >
                  Alex Johnson
                </motion.h1>
                <motion.p
                  className="text-sm text-neon-purple/80 font-matrix"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  &gt; AI_Developer.exe
                </motion.p>
              </div>
            </motion.div>

            {/* Desktop Navigation with enhanced effects */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative group py-2 px-4 font-cyber text-sm tracking-wider"
                  onHoverStart={() => setHoveredNav(item.name)}
                  onHoverEnd={() => setHoveredNav(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 bg-neon-cyan/10 rounded-lg blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Circuit traces */}
                  <motion.div
                    className="absolute inset-0 border border-neon-cyan/30 rounded-lg"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon and text */}
                  <div className="relative flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <motion.span
                      className={`font-medium transition-all duration-300 ${
                        hoveredNav === item.name
                          ? "text-neon-cyan neon-glow"
                          : "text-white/70 group-hover:text-neon-cyan"
                      }`}
                    >
                      {item.name}
                    </motion.span>
                  </div>

                  {/* Underline effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Data stream effect */}
                  <AnimatePresence>
                    {hoveredNav === item.name && (
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            {/* Enhanced Social Links */}
            <div className="hidden lg:flex items-center space-x-4">
              {[
                {
                  icon: Github,
                  href: personalInfo.social.github,
                  color: "neon-cyan",
                },
                {
                  icon: Linkedin,
                  href: personalInfo.social.linkedin,
                  color: "neon-purple",
                },
                {
                  icon: Mail,
                  href: `mailto:${personalInfo.email}`,
                  color: "neon-pink",
                },
              ].map(({ icon: Icon, href, color }, index) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg cyber-border flex items-center justify-center group relative overflow-hidden`}
                  whileHover={{ scale: 1.1, rotateY: 360 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  {/* Background effect */}
                  <motion.div
                    className={`absolute inset-0 bg-${color}/20 rounded-lg`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <Icon
                    className={`w-5 h-5 text-white/70 group-hover:text-${color} transition-all duration-300 relative z-10`}
                  />

                  {/* Energy pulse on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-lg border-2 border-${color}/0 group-hover:border-${color}/50`}
                    whileHover={{
                      boxShadow: `0 0 20px rgba(0, 255, 255, 0.5)`,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.a>
              ))}

              {/* Enhanced Resume Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <Button className="holo-button neon-button ml-4 px-6 py-3 font-cyber tracking-wider">
                  <Terminal className="w-4 h-4 mr-2" />
                  <span className="relative">
                    RESUME.exe
                    {/* Glitch effect on text */}
                    <motion.span
                      className="absolute inset-0 text-neon-pink"
                      animate={
                        isGlitching
                          ? {
                              x: [0, -2, 2, 0],
                              opacity: [0, 1, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.1, repeat: 2 }}
                    >
                      RESUME.exe
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.div
              className="lg:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="cyber-border w-12 h-12 relative group"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-neon-cyan" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6 text-neon-cyan" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Circuit animation on mobile button */}
                <motion.div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Cpu className="w-full h-full text-neon-cyan/30" />
                </motion.div>
              </Button>
            </motion.div>
          </div>

          {/* Enhanced Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="lg:hidden border-t border-neon-cyan/30 mt-4 relative overflow-hidden"
              >
                {/* Mobile menu background */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

                <div className="relative py-6 space-y-4">
                  {navigation.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left p-4 cyber-border rounded-lg group relative overflow-hidden"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Background glow */}
                      <motion.div
                        className="absolute inset-0 bg-neon-cyan/5 rounded-lg"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="flex items-center space-x-3 relative z-10">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-white/80 group-hover:text-neon-cyan font-cyber tracking-wider transition-colors duration-300">
                          {item.name}
                        </span>
                        <motion.div
                          className="ml-auto w-2 h-2 bg-neon-cyan rounded-full opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      </div>

                      {/* Data stream on hover */}
                      <motion.div
                        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.button>
                  ))}

                  {/* Mobile social links */}
                  <div className="flex items-center justify-center space-x-6 pt-6 border-t border-neon-cyan/20">
                    {[
                      { icon: Github, href: personalInfo.social.github },
                      { icon: Linkedin, href: personalInfo.social.linkedin },
                      { icon: Mail, href: `mailto:${personalInfo.email}` },
                    ].map(({ icon: Icon, href }, index) => (
                      <motion.a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 cyber-border rounded-lg flex items-center justify-center group"
                        whileHover={{ scale: 1.2, rotateY: 180 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      >
                        <Icon className="w-5 h-5 text-white/70 group-hover:text-neon-cyan transition-colors duration-300" />
                      </motion.a>
                    ))}
                  </div>

                  {/* Mobile resume button */}
                  <motion.div
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  >
                    <Button className="w-full holo-button neon-button py-3 font-cyber tracking-wider">
                      <Download className="w-4 h-4 mr-2" />
                      DOWNLOAD_RESUME.exe
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Mouse follower effect */}
        <motion.div
          className="fixed w-6 h-6 border border-neon-cyan/30 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
          }}
          animate={{
            scale: hoveredNav ? 1.5 : 1,
            opacity: hoveredNav ? 0.8 : 0.3,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.header>
    </>
  );
}
