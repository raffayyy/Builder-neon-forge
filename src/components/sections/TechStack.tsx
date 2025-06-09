import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Code,
  Database,
  Brain,
  Cpu,
  Globe,
  Terminal,
  Activity,
  Eye,
  Filter,
  BarChart3,
} from "lucide-react";
import TechGlobe from "@/components/3d/TechGlobe";
import { skills } from "@/lib/data";

const iconMap: Record<string, string> = {
  react: "⚛️",
  typescript: "🔷",
  nextjs: "▲",
  vue: "💚",
  threejs: "🎯",
  tailwind: "🎨",
  nodejs: "🟢",
  python: "🐍",
  express: "🚂",
  graphql: "📊",
  postgresql: "🐘",
  mongodb: "🍃",
  tensorflow: "🧠",
  pytorch: "🔥",
  sklearn: "📈",
  openai: "🤖",
  huggingface: "🤗",
  langchain: "🔗",
  aws: "☁️",
  docker: "🐳",
  kubernetes: "⚓",
  vercel: "▲",
  github: "🐙",
  terraform: "🏗️",
};

const categoryIcons = {
  "Frontend Development": Code,
  "Backend Development": Database,
  "AI & Machine Learning": Brain,
  "Cloud & DevOps": Globe,
};

const categoryColors = {
  "Frontend Development": "neon-cyan",
  "Backend Development": "neon-green",
  "AI & Machine Learning": "neon-purple",
  "Cloud & DevOps": "neon-pink",
};

const SkillCard = ({ skill, categoryColor, index, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, z: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(skill.name)}
    >
      <div
        className={`relative p-4 cyber-border rounded-lg transition-all duration-300 ${
          isSelected
            ? `bg-${categoryColor}/20 border-${categoryColor}/50`
            : "hover:border-white/30"
        }`}
      >
        {/* Holographic background */}
        <motion.div
          className="absolute inset-0 bg-hologram opacity-0 group-hover:opacity-30 rounded-lg"
          animate={{
            backgroundPosition: isHovered
              ? ["0% 0%", "100% 100%", "0% 0%"]
              : "0% 0%",
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Circuit pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M10 10h80v80H10z M25 25h50v50H25z M50 10v80 M10 50h80"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className={`text-${categoryColor}`}
            />
          </svg>
        </div>

        {/* Scanning line */}
        <motion.div
          className={`absolute top-0 left-0 w-full h-0.5 bg-${categoryColor} opacity-0 group-hover:opacity-100`}
          animate={
            isHovered
              ? {
                  y: [0, 80, 0],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative z-10 space-y-3">
          {/* Icon and name */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                className={`w-10 h-10 rounded-lg bg-${categoryColor}/20 flex items-center justify-center font-bold text-lg`}
                animate={
                  isHovered
                    ? {
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1],
                      }
                    : {}
                }
                transition={{ duration: 1 }}
              >
                {iconMap[skill.icon] || "⚡"}
              </motion.div>
              <div>
                <h4
                  className={`font-medium font-cyber ${
                    isSelected ? `text-${categoryColor}` : "text-white"
                  }`}
                >
                  {skill.name}
                </h4>
                <div className="text-xs text-white/60 font-matrix">
                  {skill.level}% Proficiency
                </div>
              </div>
            </div>

            {/* Level indicator */}
            <motion.div
              className={`w-8 h-8 rounded-full border-2 border-${categoryColor}/30 flex items-center justify-center text-xs font-cyber`}
              animate={
                isHovered
                  ? {
                      borderColor: `rgba(0,255,255,0.8)`,
                      scale: [1, 1.2, 1],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              {Math.round(skill.level / 10)}
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70">Skill Level</span>
              <span className={`text-${categoryColor} font-cyber`}>
                {skill.level}%
              </span>
            </div>
            <div className="relative">
              <Progress
                value={skill.level}
                className="h-2 bg-white/10 rounded-full overflow-hidden"
              />
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"
                style={{ width: `${skill.level}%` }}
                animate={
                  isHovered
                    ? {
                        opacity: [0.5, 1, 0.5],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Experience years */}
          <motion.div
            className="flex items-center justify-between pt-2 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <Activity className="w-3 h-3 text-white/50" />
              <span className="text-xs text-white/50 font-matrix">
                {Math.floor(skill.level / 20) + 1}+ years
              </span>
            </div>
            <Badge
              variant="outline"
              className={`border-${categoryColor}/30 text-${categoryColor} text-xs`}
            >
              Active
            </Badge>
          </motion.div>

          {/* Floating particles */}
          {isHovered &&
            Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 bg-${categoryColor} rounded-full`}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 15}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, Math.random() * 20 - 10],
                  y: [0, Math.random() * 20 - 10],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

const CategoryCard = ({ category, isExpanded, onToggle, selectedSkill }) => {
  const Icon = categoryIcons[category.category];
  const color = categoryColors[category.category];

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Category header */}
      <motion.button
        onClick={onToggle}
        className="w-full cyber-border rounded-lg p-6 group relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-${color}/10 to-transparent opacity-0 group-hover:opacity-100`}
          transition={{ duration: 0.3 }}
        />

        {/* Data stream effect */}
        <motion.div
          className={`absolute top-0 left-0 w-full h-0.5 bg-${color} opacity-0 group-hover:opacity-100`}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              className={`w-12 h-12 rounded-lg bg-${color}/20 flex items-center justify-center`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className={`w-6 h-6 text-${color}`} />
            </motion.div>
            <div className="text-left">
              <h3 className="text-white text-lg font-cyber">
                {category.category}
              </h3>
              <p className="text-white/60 text-sm font-matrix">
                {category.items.length} Technologies
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div
              className={`text-${color} font-cyber`}
              animate={{
                textShadow: [
                  "0 0 10px rgba(0,255,255,0.5)",
                  "0 0 20px rgba(0,255,255,0.8)",
                  "0 0 10px rgba(0,255,255,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.round(
                category.items.reduce((acc, item) => acc + item.level, 0) /
                  category.items.length,
              )}
              %
            </motion.div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <BarChart3 className="w-5 h-5 text-white/70" />
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Skills grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {category.items.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                categoryColor={color}
                index={index}
                isSelected={selectedSkill === skill.name}
                onSelect={() => {}}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterLevel, setFilterLevel] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const filteredSkills = skills.filter((category) =>
    category.items.some((skill) => skill.level >= filterLevel),
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-neural-network opacity-20" />

      {/* Mouse follower */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-neon-purple/10 blur-2xl pointer-events-none"
        style={{
          left: mousePosition.x - 80,
          top: mousePosition.y - 80,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Terminal header */}
          <motion.div
            className="inline-block p-4 cyber-border rounded-lg font-matrix text-sm text-neon-green mb-8"
            animate={{
              borderColor: [
                "rgba(139,92,246,0.3)",
                "rgba(139,92,246,0.8)",
                "rgba(139,92,246,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Terminal className="w-4 h-4" />
              <span>skills@portfolio:~$</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                _
              </motion.span>
            </div>
            <div className="mt-2">
              <span className="text-neon-cyan">
                Analyzing skills matrix...{" "}
              </span>
              <span className="text-neon-green">ANALYSIS_COMPLETE ✓</span>
            </div>
          </motion.div>

          <motion.h2
            className="heading-2 mb-6 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-shimmer bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent">
              Technical Expertise
            </span>

            {/* Floating tech icons */}
            {[Cpu, Brain, Code, Database].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${110 + i * 8}%`,
                  top: `${-10 + i * 5}%`,
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
                <Icon className="w-6 h-6 text-neon-purple" />
              </motion.div>
            ))}
          </motion.h2>

          <motion.p
            className="body-large text-white/70 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-neon-purple font-cyber">&gt; </span>
            Comprehensive technical proficiency across multiple domains and
            cutting-edge technologies
            <motion.span
              className="inline-block w-2 h-6 bg-neon-purple ml-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.p>

          {/* Control panel */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <Button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="neon-button font-cyber text-sm"
                variant="outline"
              >
                <Eye className="w-4 h-4 mr-2" />
                {viewMode === "grid" ? "LIST_VIEW" : "GRID_VIEW"}
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-3 cyber-border rounded-lg px-4 py-2">
                      <Filter className="w-4 h-4 text-neon-purple" />
                      <span className="text-sm font-matrix text-white/70">
                        Min Level: {filterLevel}%
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={filterLevel}
                        onChange={(e) => setFilterLevel(Number(e.target.value))}
                        className="w-20"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filter skills by proficiency level</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* 3D Tech Globe */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <TechGlobe />

              {/* Globe info panel */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 cyber-border rounded-lg p-4 bg-black/80 backdrop-blur-xl mx-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <h4 className="text-neon-cyan font-cyber text-sm mb-2">
                  INTERACTIVE_TECH_GLOBE
                </h4>
                <p className="text-white/70 text-xs font-matrix">
                  3D visualization of technical expertise. Hover and rotate to
                  explore technologies.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills Categories */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            {filteredSkills.map((category, index) => (
              <motion.div key={category.category} variants={itemVariants}>
                <CategoryCard
                  category={category}
                  isExpanded={selectedCategory === category.category}
                  onToggle={() =>
                    setSelectedCategory(
                      selectedCategory === category.category
                        ? null
                        : category.category,
                    )
                  }
                  selectedSkill={selectedSkill}
                />
              </motion.div>
            ))}

            {/* Quick expand all button */}
            <motion.div className="text-center pt-8" variants={itemVariants}>
              <Button
                onClick={() =>
                  setSelectedCategory(selectedCategory ? null : "all")
                }
                className="holo-button font-cyber tracking-wider"
                size="lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                {selectedCategory ? "COLLAPSE_ALL" : "EXPAND_ALL"}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "Programming Languages",
                value: "12+",
                color: "neon-cyan",
                icon: Code,
              },
              {
                label: "Frameworks & Libraries",
                value: "25+",
                color: "neon-purple",
                icon: Database,
              },
              {
                label: "Years Experience",
                value: "5+",
                color: "neon-pink",
                icon: Activity,
              },
              {
                label: "Active Projects",
                value: "15+",
                color: "neon-green",
                icon: Zap,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center cyber-border rounded-lg p-6 group relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {/* Background pulse */}
                <motion.div
                  className={`absolute inset-0 bg-${stat.color}/10 rounded-lg opacity-0 group-hover:opacity-100`}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-${stat.color}/20 flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </motion.div>

                {/* Value */}
                <motion.div
                  className={`text-3xl font-bold mb-2 text-${stat.color} font-cyber`}
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(0,255,255,0.5)",
                      "0 0 20px rgba(0,255,255,0.8)",
                      "0 0 10px rgba(0,255,255,0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <div className="text-white/70 text-sm font-matrix">
                  {stat.label}
                </div>

                {/* Floating particles */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 bg-${stat.color} rounded-full opacity-0 group-hover:opacity-100`}
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${30 + i * 10}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
