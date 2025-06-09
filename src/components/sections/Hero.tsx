import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { personalInfo } from "@/lib/data";

const typewriterTexts = [
  "AI Engineer",
  "Full Stack Developer",
  "Machine Learning Expert",
  "Digital Innovator",
  "Problem Solver",
];

const FloatingCard = ({ children, delay = 0, direction = "up" }) => (
  <motion.div
    initial={{
      opacity: 0,
      y: direction === "up" ? 20 : -20,
      scale: 0.9,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      duration: 0.8,
      delay,
      ease: "easeOut",
    }}
    className="floating-element"
  >
    {children}
  </motion.div>
);

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
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
    { label: "Projects", value: "25+" },
    { label: "Experience", value: "5+" },
    { label: "Technologies", value: "20+" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-electric-blue/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-violet/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-teal/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen py-20">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Status Badge */}
            <FloatingCard delay={0.2}>
              <motion.div
                className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="status-online" />
                <span className="text-sm font-medium text-white">
                  Available for opportunities
                </span>
              </motion.div>
            </FloatingCard>

            {/* Greeting */}
            <FloatingCard delay={0.4}>
              <div className="space-y-4">
                <motion.p
                  className="text-light-slate text-lg font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Hello, I'm
                </motion.p>

                <h1 className="heading-1 text-white leading-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    {personalInfo.name.split(" ")[0]}
                  </motion.span>
                  <br />
                  <motion.span
                    className="accent-gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    {personalInfo.name.split(" ")[1]}
                  </motion.span>
                </h1>
              </div>
            </FloatingCard>

            {/* Typewriter Effect */}
            <FloatingCard delay={0.6}>
              <div className="h-16 flex items-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90">
                  I'm a{" "}
                  <span className="accent-gradient-text font-display">
                    {displayText}
                  </span>
                  <motion.span
                    className="inline-block w-1 h-8 bg-electric-blue ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </h2>
              </div>
            </FloatingCard>

            {/* Description */}
            <FloatingCard delay={0.8}>
              <p className="body-large text-light-slate max-w-2xl leading-relaxed">
                {personalInfo.bio}
              </p>
            </FloatingCard>

            {/* Action Buttons */}
            <FloatingCard delay={1}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button
                  onClick={scrollToProjects}
                  className="btn-primary text-lg px-8 py-4 shimmer-effect"
                  size="lg"
                >
                  View My Work
                  <ArrowDown className="ml-2 w-5 h-5" />
                </Button>

                <Button
                  variant="outline"
                  className="btn-secondary text-lg px-8 py-4"
                  size="lg"
                >
                  <Download className="mr-2 w-5 h-5" />
                  Download Resume
                </Button>
              </div>
            </FloatingCard>

            {/* Social Links */}
            <FloatingCard delay={1.2}>
              <div className="flex items-center space-x-4 pt-4">
                <span className="text-light-slate text-sm font-medium">
                  Connect with me:
                </span>
                {[
                  {
                    icon: Github,
                    href: personalInfo.social.github,
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: personalInfo.social.linkedin,
                    label: "LinkedIn",
                  },
                  {
                    icon: Mail,
                    href: `mailto:${personalInfo.email}`,
                    label: "Email",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-card flex items-center justify-center text-white/70 hover:text-electric-blue transition-all duration-300 micro-scale"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </FloatingCard>

            {/* Stats */}
            <FloatingCard delay={1.4}>
              <div className="flex items-center space-x-8 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold accent-gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-light-slate text-sm font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </FloatingCard>
          </div>

          {/* Sidebar Cards */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <FloatingCard delay={0.8} direction="down">
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 glass-card flex items-center justify-center">
                    <span className="text-electric-blue font-bold text-xl font-display">
                      AJ
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Alex Johnson</h3>
                    <p className="text-light-slate text-sm">Senior Developer</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2 text-sm text-light-slate">
                    <MapPin className="w-4 h-4" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-light-slate">
                    <Clock className="w-4 h-4" />
                    <span>
                      {currentTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      PST
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-light-slate">
                    <Coffee className="w-4 h-4" />
                    <span>Fueled by coffee</span>
                  </div>
                </div>
              </div>
            </FloatingCard>

            {/* Quote Card */}
            <FloatingCard delay={1} direction="down">
              <div className="glass-card p-6">
                <blockquote className="text-white/90 italic leading-relaxed">
                  "{personalInfo.quote}"
                </blockquote>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-light-slate text-sm">Personal Motto</div>
                </div>
              </div>
            </FloatingCard>

            {/* Current Status */}
            <FloatingCard delay={1.2} direction="down">
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-white font-semibold">Current Focus</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-light-slate text-sm">
                      Learning AI/ML
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs border-green-500/30 text-green-400"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-light-slate text-sm">
                      Building Projects
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs border-blue-500/30 text-blue-400"
                    >
                      In Progress
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-light-slate text-sm">
                      Open to Work
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs border-green-500/30 text-green-400"
                    >
                      Available
                    </Badge>
                  </div>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          className="flex flex-col items-center space-y-2 text-light-slate"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="w-6 h-10 glass-card rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-3 bg-electric-blue rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
