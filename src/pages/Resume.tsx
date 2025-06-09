import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Award,
  Briefcase,
  GraduationCap,
  User,
  Code2,
  Star,
  Eye,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  personalInfo,
  experience,
  skills,
  projects,
  achievements,
} from "@/lib/data";
import soundManager from "@/lib/soundManager";
import Confetti from "@/components/ui/Confetti";
import ResumeStats from "@/components/ui/ResumeStats";
import KeyboardShortcuts from "@/components/ui/KeyboardShortcuts";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

export default function Resume() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = ['header', 'personal', 'experience', 'projects', 'skills', 'education', 'footer'];

  // Track section view function
  const trackSectionView = (sectionName: string) => {
    if (!viewedSections.has(sectionName)) {
      setViewedSections(prev => new Set([...prev, sectionName]));
      soundManager.playSuccess();
      
      // Show celebration after viewing 5 sections
      if (viewedSections.size >= 4) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  };

  // Download handler - moved before first usage
  const handleDownload = async () => {
    setIsDownloading(true);
    soundManager.playClick();
    
    // Simulate download delay with progress
    setTimeout(() => {
      setIsDownloading(false);
      soundManager.playSuccess();
      window.open(personalInfo.resume.url, "_blank");
      trackSectionView("download");
    }, 1000);
  };

  // Keyboard navigation
  const { shortcuts } = useKeyboardNavigation({
    onDownload: handleDownload,
    onContact: () => window.open(`mailto:${personalInfo.email}`, "_blank"),
    onLinkedIn: () => window.open(personalInfo.social.linkedin, "_blank"),
    onSectionNext: () => {
      const nextSection = Math.min(currentSection + 1, sections.length - 1);
      setCurrentSection(nextSection);
      document.getElementById(sections[nextSection])?.scrollIntoView({ behavior: 'smooth' });
    },
    onSectionPrev: () => {
      const prevSection = Math.max(currentSection - 1, 0);
      setCurrentSection(prevSection);
      document.getElementById(sections[prevSection])?.scrollIntoView({ behavior: 'smooth' });
    },
    onToggleStats: () => soundManager.playSuccess()
  });

  // Calculate estimated reading time
  useEffect(() => {
    const words = document.body.innerText?.split(' ').length || 0;
    const wpm = 200; // Average words per minute
    setReadingTime(Math.ceil(words / wpm));
  }, []);

  const handleSkillHover = (skillName) => {
    setHoveredSkill(skillName);
    soundManager.playHover();
  };

  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Celebration Effect */}
      <AnimatePresence>
        {showCelebration && (
          <Confetti 
            active={showCelebration}
            onComplete={() => setShowCelebration(false)}
            particleCount={100}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)]" />
        
        {/* Floating Resume Icons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-500/10 text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              rotate: [-10, 10],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {['📄', '💼', '🎓', '⭐', '🏆', '💻', '🚀', '✨'][i]}
          </motion.div>
        ))}
      </div>

      <Header />

      <main className="pt-20 lg:pt-24 relative z-10">
        <div className="container mx-auto max-w-5xl px-4 py-12">{/* 
          Progress Bar 
          <motion.div
            className="fixed top-20 left-0 right-0 h-1 bg-gray-800 z-50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: viewedSections.size / 6 }}
            style={{ transformOrigin: "left" }}
          >
            <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </motion.div> */}

          {/* Reading Stats */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 right-4 bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-lg p-3 z-40"
          >
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{readingTime} min read</span>
              <Separator orientation="vertical" className="h-3" />
              <Eye className="w-3 h-3" />
              <span>{viewedSections.size}/6 sections</span>
            </div>
          </motion.div>
          {/* Enhanced Header Section */}
          <motion.div
            id="header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            onViewportEnter={() => trackSectionView("header")}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <User className="w-5 h-5 text-blue-400" />
              </motion.div>
              <span className="text-blue-400 font-medium">Professional Profile</span>
            </motion.div>

            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Professional{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Resume
              </span>
            </motion.h1>
            
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              A comprehensive overview of my professional journey, skills, and
              achievements that showcase my expertise in technology and innovation
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold overflow-hidden group"
                size="lg"
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <AnimatePresence mode="wait">
                  {isDownloading ? (
                    <motion.div
                      key="downloading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Download className="w-5 h-5" />
                      </motion.div>
                      Downloading...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="download"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 relative z-10"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF Resume
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Personal Information Card */}
          <motion.div
            id="personal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
            onViewportEnter={() => trackSectionView("personal")}
          >
            <Card className="bg-white/5 border-white/10 overflow-hidden group">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />
              
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 relative">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white relative"
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Sparkle effects */}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${10 + Math.random() * 80}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                    {personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </motion.div>
                  
                  <div className="text-center lg:text-left flex-1">
                    <motion.h2 
                      className="text-3xl font-bold text-white mb-2"
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      {personalInfo.name}
                    </motion.h2>
                    <motion.p 
                      className="text-xl text-blue-400 mb-4"
                      whileHover={{ color: "#60a5fa" }}
                    >
                      {personalInfo.title}
                    </motion.p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-white/70">
                      {[
                        { icon: Mail, text: personalInfo.email },
                        { icon: Phone, text: personalInfo.phone },
                        { icon: MapPin, text: personalInfo.location }
                      ].map(({ icon: Icon, text }, i) => (
                        <motion.div 
                          key={i}
                          className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          onClick={() => soundManager.playClick()}
                        >
                          <Icon className="w-4 h-4" />
                          {text}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    {[
                      { icon: Github, href: personalInfo.social.github },
                      { icon: Linkedin, href: personalInfo.social.linkedin }
                    ].map(({ icon: Icon, href }, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10 hover:border-blue-400/50 relative group"
                          onClick={() => {
                            soundManager.playClick();
                            window.open(href, "_blank");
                            trackSectionView("social");
                          }}
                        >
                          {/* Ripple effect */}
                          <motion.div
                            className="absolute inset-0 bg-blue-400/20 rounded-md"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <Icon className="w-4 h-4 relative z-10" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-8 relative">
                <motion.blockquote 
                  className="text-lg text-white/80 italic text-center mb-6 relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.span
                    className="absolute -left-4 -top-2 text-4xl text-blue-400/30"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    "
                  </motion.span>
                  {personalInfo.quote}
                  <motion.span
                    className="absolute -right-4 -bottom-2 text-4xl text-blue-400/30"
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    "
                  </motion.span>
                </motion.blockquote>
                <motion.p 
                  className="text-white/70 leading-relaxed"
                  whileHover={{ color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  {personalInfo.bio}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Enhanced Experience Section */}
              <motion.div
                id="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onViewportEnter={() => trackSectionView("experience")}
              >
                <Card className="bg-white/5 border-white/10 overflow-hidden group">
                  <CardHeader className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />
                    <CardTitle className="text-white text-xl flex items-center relative z-10">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Briefcase className="w-5 h-5 mr-3 text-blue-400" />
                      </motion.div>
                      Professional Experience
                      <motion.div
                        className="ml-2 w-2 h-2 bg-emerald-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 relative">
                    {experience.map((exp, index) => (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative group/exp"
                        onMouseEnter={() => soundManager.playHover()}
                      >
                        {/* Enhanced Timeline */}
                        <div className="absolute left-0 top-0 bottom-6 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500" />
                        <motion.div
                          className="absolute left-[-4px] top-2 w-2 h-2 bg-blue-400 rounded-full shadow-lg"
                          whileHover={{ 
                            scale: 1.5, 
                            boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)" 
                          }}
                          animate={{ 
                            boxShadow: [
                              "0 0 0px rgba(59, 130, 246, 0.5)",
                              "0 0 15px rgba(59, 130, 246, 0.8)",
                              "0 0 0px rgba(59, 130, 246, 0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        <div className="border-l-2 border-blue-400/30 pl-6 pb-6 last:pb-0 relative">
                          {/* Hover Background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg -m-4 p-4 opacity-0 group-hover/exp:opacity-100"
                            transition={{ duration: 0.3 }}
                          />
                          
                          <motion.div 
                            className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 relative z-10"
                            whileHover={{ x: 5 }}
                          >
                            <div>
                              <motion.h3 
                                className="text-lg font-semibold text-white group-hover/exp:text-blue-300 transition-colors"
                                whileHover={{ scale: 1.02 }}
                              >
                                {exp.position}
                              </motion.h3>
                              <motion.p 
                                className="text-blue-400 font-medium group-hover/exp:text-blue-300 transition-colors"
                                whileHover={{ x: 3 }}
                              >
                                {exp.company}
                              </motion.p>
                              <p className="text-white/60 text-sm">
                                {exp.location}
                              </p>
                            </div>
                            <motion.div 
                              className="text-sm text-white/60 mt-1 sm:mt-0 flex items-center"
                              whileHover={{ scale: 1.05 }}
                            >
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              >
                                <Calendar className="w-4 h-4 inline mr-1" />
                              </motion.div>
                              {exp.duration}
                            </motion.div>
                          </motion.div>
                          
                          <motion.p 
                            className="text-white/70 mb-3 relative z-10"
                            whileHover={{ color: "#ffffff" }}
                          >
                            {exp.description}
                          </motion.p>
                          
                          <div className="space-y-2 relative z-10">
                            <motion.h4 
                              className="text-white font-medium text-sm flex items-center"
                              whileHover={{ x: 3 }}
                            >
                              <motion.div
                                className="w-1 h-1 bg-emerald-400 rounded-full mr-2"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                              Key Achievements:
                            </motion.h4>
                            <ul className="space-y-1">
                              {exp.achievements
                                .slice(0, 3)
                                .map((achievement, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="text-white/70 text-sm flex items-start group/achievement hover:text-white transition-colors cursor-pointer"
                                    whileHover={{ x: 5 }}
                                    onClick={() => soundManager.playClick()}
                                  >
                                    <motion.span 
                                      className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"
                                      whileHover={{ 
                                        scale: 1.5, 
                                        backgroundColor: "#60a5fa" 
                                      }}
                                    />
                                    {achievement}
                                    <motion.div
                                      className="ml-2 opacity-0 group-hover/achievement:opacity-100"
                                      initial={{ scale: 0 }}
                                      whileHover={{ scale: 1 }}
                                    >
                                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                    </motion.div>
                                  </motion.li>
                                ))}
                            </ul>
                          </div>
                          
                          <div className="mt-3 relative z-10">
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.slice(0, 6).map((tech, techIdx) => (
                                <motion.div
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: techIdx * 0.05 }}
                                  whileHover={{ 
                                    scale: 1.1, 
                                    y: -2,
                                    boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)"
                                  }}
                                  onClick={() => soundManager.playClick()}
                                >
                                  <Badge
                                    variant="outline"
                                    className="border-blue-400/30 text-blue-300 bg-blue-400/10 text-xs hover:bg-blue-400/20 hover:border-blue-400/50 transition-all cursor-pointer relative overflow-hidden"
                                  >
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                      initial={{ x: "-100%" }}
                                      whileHover={{ x: "100%" }}
                                      transition={{ duration: 0.5 }}
                                    />
                                    <span className="relative z-10">{tech}</span>
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Enhanced Projects Section */}
              <motion.div
                id="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onViewportEnter={() => trackSectionView("projects")}
              >
                <Card className="bg-white/5 border-white/10 overflow-hidden group">
                  <CardHeader className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />
                    <CardTitle className="text-white text-xl flex items-center relative z-10">
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Code2 className="w-5 h-5 mr-3 text-blue-400" />
                      </motion.div>
                      Featured Projects
                      <motion.div
                        className="ml-2 flex gap-1"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-1 bg-emerald-400 rounded-full"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </motion.div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 relative">
                    {projects
                      .filter((p) => p.featured)
                      .slice(0, 3)
                      .map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="border border-white/10 rounded-lg p-4 hover:border-blue-500/30 transition-all group/project relative overflow-hidden"
                          whileHover={{ 
                            scale: 1.02,
                            y: -5,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                          }}
                          onMouseEnter={() => soundManager.playHover()}
                        >
                          {/* Animated Background Gradient */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 opacity-0 group-hover/project:opacity-100"
                            transition={{ duration: 0.5 }}
                          />
                          
                          {/* Floating Particles */}
                          {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-blue-400/30 rounded-full opacity-0 group-hover/project:opacity-100"
                              style={{
                                left: `${20 + i * 30}%`,
                                top: `${10 + i * 20}%`,
                              }}
                              animate={{
                                y: [-10, 10],
                                scale: [0.5, 1, 0.5],
                                opacity: [0, 0.7, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.5,
                              }}
                            />
                          ))}
                          
                          <div className="flex items-start justify-between mb-3 relative z-10">
                            <motion.h3 
                              className="text-lg font-semibold text-white group-hover/project:text-blue-300 transition-colors"
                              whileHover={{ scale: 1.05, x: 5 }}
                            >
                              {project.title}
                            </motion.h3>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Badge
                                variant={
                                  project.status === "Completed"
                                    ? "default"
                                    : "outline"
                                }
                                className={`${
                                  project.status === "Completed"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "border-orange-500/30 text-orange-400"
                                } relative overflow-hidden cursor-pointer`}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                  initial={{ x: "-100%" }}
                                  whileHover={{ x: "100%" }}
                                  transition={{ duration: 0.5 }}
                                />
                                <span className="relative z-10 flex items-center gap-1">
                                  {project.status === "Completed" && (
                                    <motion.div
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 1, repeat: Infinity }}
                                    >
                                      <CheckCircle2 className="w-3 h-3" />
                                    </motion.div>
                                  )}
                                  {project.status}
                                </span>
                              </Badge>
                            </motion.div>
                          </div>
                          
                          <motion.p 
                            className="text-white/70 mb-3 text-sm relative z-10"
                            whileHover={{ color: "#ffffff" }}
                          >
                            {project.description}
                          </motion.p>
                          
                          <div className="flex flex-wrap gap-2 mb-3 relative z-10">
                            {project.technologies.slice(0, 4).map((tech, techIdx) => (
                              <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: techIdx * 0.05 }}
                                whileHover={{ 
                                  scale: 1.1,
                                  y: -3,
                                  boxShadow: "0 5px 15px rgba(139, 92, 246, 0.3)"
                                }}
                              >
                                <Badge
                                  variant="outline"
                                  className="border-white/20 text-white/70 text-xs hover:border-purple-400/50 hover:text-purple-300 transition-all cursor-pointer relative overflow-hidden"
                                  onClick={() => soundManager.playClick()}
                                >
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.5 }}
                                  />
                                  <span className="relative z-10">{tech}</span>
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2 relative z-10">
                            <motion.div
                              whileHover={{ scale: 1.05, x: 3 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10 hover:border-blue-400/50 relative overflow-hidden group/btn"
                                onClick={() => {
                                  soundManager.playClick();
                                  window.open(project.github, "_blank");
                                }}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover/btn:opacity-100"
                                  transition={{ duration: 0.3 }}
                                />
                                <motion.div
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                >
                                  <Github className="w-3 h-3 mr-1" />
                                </motion.div>
                                Code
                              </Button>
                            </motion.div>
                            
                            <motion.div
                              whileHover={{ scale: 1.05, x: 3 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden group/btn"
                                onClick={() => {
                                  soundManager.playClick();
                                  window.open(project.demo, "_blank");
                                }}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                  initial={{ x: "-100%" }}
                                  whileHover={{ x: "100%" }}
                                  transition={{ duration: 0.6 }}
                                />
                                <motion.div
                                  animate={{ 
                                    x: [0, 2, 0],
                                    y: [0, -1, 0]
                                  }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                </motion.div>
                                <span className="relative z-10">Demo</span>
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Enhanced Skills Section */}
              <motion.div
                id="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onViewportEnter={() => trackSectionView("skills")}
              >
                <Card className="bg-white/5 border-white/10 overflow-hidden group">
                  <CardHeader className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />
                    <CardTitle className="text-white text-xl flex items-center relative z-10">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Code2 className="w-5 h-5 mr-3 text-blue-400" />
                      </motion.div>
                      Technical Skills
                      <motion.div
                        className="ml-2 flex gap-1"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Zap className="w-4 h-4 text-yellow-400" />
                      </motion.div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 relative">
                    {skills.map((category, categoryIndex) => (
                      <motion.div 
                        key={category.category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                        className="group/category"
                      >
                        <motion.h3 
                          className="text-white font-semibold mb-3 flex items-center cursor-pointer"
                          whileHover={{ x: 5, scale: 1.02 }}
                          onClick={() => soundManager.playHover()}
                        >
                          <motion.div 
                            className="w-2 h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded mr-2"
                            whileHover={{ 
                              scale: 1.2,
                              boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)"
                            }}
                            animate={{
                              backgroundPosition: ["0% 0%", "100% 100%"],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          {category.category}
                          <motion.div
                            className="ml-2 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover/category:opacity-100"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        </motion.h3>
                        
                        <div className="space-y-2">
                          {category.items.map((skill, skillIndex) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.3, 
                                delay: categoryIndex * 0.1 + skillIndex * 0.05 
                              }}
                              className="flex items-center justify-between group/skill cursor-pointer"
                              whileHover={{ 
                                x: 5,
                                backgroundColor: "rgba(59, 130, 246, 0.05)",
                                borderRadius: "6px"
                              }}
                              onMouseEnter={() => handleSkillHover(skill.name)}
                              onClick={() => soundManager.playClick()}
                            >
                              <motion.span 
                                className="text-white/80 text-sm group-hover/skill:text-white transition-colors flex items-center"
                                whileHover={{ fontWeight: 600 }}
                              >
                                <motion.div
                                  className="w-2 h-2 bg-blue-400 rounded-full mr-2 opacity-0 group-hover/skill:opacity-100"
                                  animate={{ 
                                    scale: hoveredSkill === skill.name ? [1, 1.5, 1] : 1,
                                    backgroundColor: hoveredSkill === skill.name ? "#60a5fa" : "#3b82f6"
                                  }}
                                  transition={{ duration: 0.5 }}
                                />
                                {skill.name}
                                
                                {/* Skill proficiency indicator */}
                                {skill.level >= 90 && (
                                  <motion.div
                                    className="ml-2 opacity-0 group-hover/skill:opacity-100"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  >
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  </motion.div>
                                )}
                              </motion.span>
                              
                              <div className="flex items-center">
                                <motion.div 
                                  className="w-16 h-1.5 bg-white/10 rounded-full mr-2 overflow-hidden relative"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {/* Background glow effect */}
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 opacity-0 group-hover/skill:opacity-100"
                                    transition={{ duration: 0.3 }}
                                  />
                                  
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full relative overflow-hidden"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ 
                                      duration: 1.5, 
                                      delay: categoryIndex * 0.1 + skillIndex * 0.1,
                                      ease: "easeOut"
                                    }}
                                    whileHover={{ 
                                      boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)"
                                    }}
                                  >
                                    {/* Animated shimmer effect */}
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                      animate={{ x: ["-100%", "100%"] }}
                                      transition={{ 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        repeatDelay: 3 
                                      }}
                                    />
                                    
                                    {/* Floating particles for high-level skills */}
                                    {skill.level >= 85 && Array.from({ length: 2 }).map((_, i) => (
                                      <motion.div
                                        key={i}
                                        className="absolute w-0.5 h-0.5 bg-white rounded-full"
                                        style={{
                                          left: `${30 + i * 20}%`,
                                          top: "25%",
                                        }}
                                        animate={{
                                          y: [-2, 2],
                                          opacity: [0.5, 1, 0.5],
                                          scale: [0.8, 1.2, 0.8],
                                        }}
                                        transition={{
                                          duration: 1.5,
                                          repeat: Infinity,
                                          delay: i * 0.3,
                                        }}
                                      />
                                    ))}
                                  </motion.div>
                                </motion.div>
                                
                                <motion.span 
                                  className="text-white/60 text-xs w-8 group-hover/skill:text-white transition-colors font-mono"
                                  whileHover={{ 
                                    scale: 1.1,
                                    fontWeight: 700,
                                    color: skill.level >= 90 ? "#fbbf24" : "#ffffff"
                                  }}
                                >
                                  {skill.level}%
                                </motion.span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Category separator with animation */}
                        {categoryIndex < skills.length - 1 && (
                          <motion.div
                            className="w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent mt-4"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ 
                              duration: 1, 
                              delay: categoryIndex * 0.2 + 0.5 
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                    
                    {/* Floating skill icons */}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-blue-400/10 text-lg pointer-events-none"
                        style={{
                          right: `${10 + i * 15}%`,
                          top: `${20 + i * 20}%`,
                        }}
                        animate={{
                          y: [-10, 10],
                          rotate: [-5, 5],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      >
                        {['⚡', '🚀', '💡', '🎯'][i]}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Enhanced Education & Certifications */}
              <motion.div
                id="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                onViewportEnter={() => trackSectionView("education")}
              >
                <Card className="bg-white/5 border-white/10 overflow-hidden group">
                  <CardHeader className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />
                    <CardTitle className="text-white text-xl flex items-center relative z-10">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <GraduationCap className="w-5 h-5 mr-3 text-blue-400" />
                      </motion.div>
                      Education & Certifications
                      <motion.div
                        className="ml-2"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Award className="w-4 h-4 text-yellow-400" />
                      </motion.div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 relative">
                    {/* Floating Achievement Icons */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-yellow-400/10 text-xl pointer-events-none"
                        style={{
                          right: `${5 + i * 20}%`,
                          top: `${10 + i * 25}%`,
                        }}
                        animate={{
                          y: [-15, 15],
                          rotate: [-10, 10],
                          opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                          duration: 4 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.7,
                        }}
                      >
                        {['🏆', '🎓', '⭐'][i]}
                      </motion.div>
                    ))}
                    
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border border-white/10 rounded-lg p-4 group/achievement relative overflow-hidden cursor-pointer"
                        whileHover={{ 
                          scale: 1.02,
                          y: -3,
                          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                          borderColor: "rgba(59, 130, 246, 0.3)"
                        }}
                        onMouseEnter={() => soundManager.playHover()}
                        onClick={() => soundManager.playClick()}
                      >
                        {/* Animated background on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover/achievement:opacity-100"
                          transition={{ duration: 0.5 }}
                        />
                        
                        {/* Sparkle effects */}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover/achievement:opacity-100"
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${15 + Math.random() * 70}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                              rotate: [0, 180, 360],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                        
                        <div className="flex items-start justify-between mb-2 relative z-10">
                          <motion.h3 
                            className="text-white font-semibold text-sm flex items-center group-hover/achievement:text-yellow-300 transition-colors"
                            whileHover={{ x: 3 }}
                          >
                            <motion.div
                              animate={{ 
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              whileHover={{ scale: 1.3 }}
                            >
                              <Award className="w-4 h-4 mr-2 text-yellow-400" />
                            </motion.div>
                            {achievement.title}
                            
                            {/* Verification Badge */}
                            <motion.div
                              className="ml-2 opacity-0 group-hover/achievement:opacity-100"
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            </motion.div>
                          </motion.h3>
                        </div>
                        
                        <motion.p 
                          className="text-blue-400 text-sm font-medium group-hover/achievement:text-blue-300 transition-colors"
                          whileHover={{ x: 2, fontWeight: 600 }}
                        >
                          {achievement.issuer}
                        </motion.p>
                        
                        {achievement.date && (
                          <motion.p 
                            className="text-white/60 text-xs mt-1 flex items-center"
                            whileHover={{ color: "#ffffff" }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                            </motion.div>
                            {new Date(achievement.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                              },
                            )}
                          </motion.p>
                        )}
                        
                        {achievement.grade && (
                          <motion.p 
                            className="text-white/70 text-xs mt-1 flex items-center"
                            whileHover={{ 
                              color: "#ffffff",
                              scale: 1.05
                            }}
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <TrendingUp className="w-3 h-3 mr-1 text-emerald-400" />
                            </motion.div>
                            Grade: {achievement.grade}
                          </motion.p>
                        )}
                        
                        {/* Achievement progress indicator */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-blue-400 opacity-0 group-hover/achievement:opacity-100"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Footer Section */}
          <motion.div
            id="footer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center pt-12 mt-12 border-t border-white/10 relative"
            onViewportEnter={() => trackSectionView("footer")}
          >
            {/* Floating Action Particles */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [-20, 20],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
            
            <motion.p 
              className="text-white/60 text-sm mb-4 flex items-center justify-center"
              whileHover={{ color: "#ffffff" }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="w-4 h-4 mr-2" />
              </motion.div>
              Last updated:{" "}
              {new Date(personalInfo.resume.lastUpdated).toLocaleDateString()}
            </motion.p>
            
            <motion.p 
              className="text-white/70 mb-6"
              whileHover={{ 
                scale: 1.02,
                color: "#ffffff" 
              }}
            >
              Thank you for reviewing my resume. I'm always open to new
              opportunities!
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden group"
                  onClick={() => {
                    soundManager.playClick();
                    window.open(`mailto:${personalInfo.email}`, "_blank");
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                  </motion.div>
                  <span className="relative z-10">Get In Touch</span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:border-blue-400/50 relative overflow-hidden group"
                  onClick={() => {
                    soundManager.playClick();
                    window.open(personalInfo.social.linkedin, "_blank");
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                  </motion.div>
                  <span className="relative z-10">Connect on LinkedIn</span>
                </Button>
              </motion.div>
            </div>
            
            {/* Achievement Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8 flex justify-center items-center gap-6 text-xs text-white/60"
            >
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1, color: "#ffffff" }}
              >
                <Target className="w-3 h-3" />
                <span>{viewedSections.size}/6 sections viewed</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1, color: "#ffffff" }}
              >
                <Sparkles className="w-3 h-3" />
                <span>{experience.length} years experience</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1, color: "#ffffff" }}
              >
                <Award className="w-3 h-3" />
                <span>{achievements.length} achievements</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Resume Statistics Component */}
      <ResumeStats
        viewedSections={viewedSections}
        readingTime={readingTime}
        experienceYears={experience.length}
        achievements={achievements.length}
        projects={projects.filter(p => p.featured).length}
        skills={skills.reduce((total, category) => total + category.items.length, 0)}
      />

      {/* Keyboard Shortcuts Component */}
      <KeyboardShortcuts shortcuts={shortcuts} />

      <Footer />
    </div>
  );
}
