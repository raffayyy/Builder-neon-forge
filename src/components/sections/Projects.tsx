import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  ExternalLink,
  Github,
  Users,
  Star,
  TrendingUp,
  Eye,
  Zap,
  Code,
  Cpu,
  Activity,
  Globe,
  Terminal,
  ChevronRight,
  Play,
  Pause,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProjectModel from "@/components/3d/ProjectModel";
import { projects } from "@/lib/data";

const HolographicCard = ({ children, index, isHovered, onHover }) => (
  <motion.div
    className="relative group perspective-1000"
    onHoverStart={() => onHover(index)}
    onHoverEnd={() => onHover(null)}
    whileHover={{
      rotateY: 5,
      rotateX: 5,
      z: 50,
    }}
    transition={{ duration: 0.3 }}
  >
    {/* Holographic border effect */}
    <motion.div
      className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 blur-sm"
      animate={{
        background: isHovered
          ? [
              "linear-gradient(0deg, #00ffff, #bf00ff, #ff0080)",
              "linear-gradient(120deg, #00ffff, #bf00ff, #ff0080)",
              "linear-gradient(240deg, #00ffff, #bf00ff, #ff0080)",
              "linear-gradient(360deg, #00ffff, #bf00ff, #ff0080)",
            ]
          : "linear-gradient(0deg, #00ffff, #bf00ff, #ff0080)",
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* Main card content */}
    <motion.div
      className="relative cyber-card overflow-hidden"
      animate={
        isHovered
          ? {
              boxShadow: [
                "0 0 30px rgba(0,255,255,0.3)",
                "0 0 50px rgba(191,0,255,0.4)",
                "0 0 30px rgba(0,255,255,0.3)",
              ],
            }
          : {}
      }
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <defs>
            <pattern
              id={`circuit-${index}`}
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20h40M20 0v40M10 10h20v20H10z"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                className="text-neon-cyan"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#circuit-${index})`}
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Scanning line effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100"
        animate={
          isHovered
            ? {
                y: [0, 300, 0],
              }
            : {}
        }
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Floating data particles */}
      {isHovered &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}

      {children}
    </motion.div>
  </motion.div>
);

const ProjectMetrics = ({ metrics, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.8 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-3 gap-4 p-4 bg-black/50 rounded-lg border border-neon-cyan/30 backdrop-blur-xl"
      >
        {Object.entries(metrics).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="text-center group"
          >
            <motion.div
              className="text-neon-cyan font-bold text-lg font-cyber"
              whileHover={{ scale: 1.2, glow: true }}
              animate={{
                textShadow: [
                  "0 0 10px rgba(0,255,255,0.5)",
                  "0 0 20px rgba(0,255,255,0.8)",
                  "0 0 10px rgba(0,255,255,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {value}
            </motion.div>
            <div className="text-white/60 text-xs capitalize font-matrix">
              {key}
            </div>
            {/* Metric visualization */}
            <motion.div
              className="w-full h-1 bg-neon-cyan/20 rounded-full mt-1 overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

const TechBadgeCloud = ({ technologies, isHovered }) => (
  <div className="flex flex-wrap gap-2">
    {technologies.map((tech, index) => (
      <motion.div
        key={tech}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 15px rgba(0,255,255,0.6)",
        }}
      >
        <Badge
          variant="outline"
          className="cyber-border text-white/80 hover:text-neon-cyan transition-all duration-300 cursor-pointer font-matrix relative overflow-hidden"
        >
          {/* Tech icon effect */}
          <motion.div
            className="absolute inset-0 bg-neon-cyan/10 rounded"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
          <span className="relative z-10">{tech}</span>
          {isHovered && (
            <motion.div
              className="absolute top-0 left-0 w-full h-0.5 bg-neon-cyan"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </Badge>
      </motion.div>
    ))}
  </div>
);

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const controls = useAnimation();

  const featuredProjects = projects.filter((project) => project.featured);

  const filters = [
    { id: "all", name: "ALL_PROJECTS", icon: Globe },
    { id: "ai", name: "AI_SYSTEMS", icon: Brain },
    { id: "web", name: "WEB_APPS", icon: Code },
    { id: "3d", name: "3D_EXPERIENCES", icon: Cpu },
  ];

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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding bg-deep-space relative overflow-hidden"
    >
      {/* Neural network background */}
      <div className="absolute inset-0 bg-neural-network opacity-30" />

      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 text-neon-green/20 font-matrix text-xs"
            style={{ left: `${i * 6.67}%` }}
            animate={{
              y: ["-100%", "100vh"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            01001010011100110110
          </motion.div>
        ))}
      </div>

      {/* Mouse follower */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-neon-cyan/5 blur-xl pointer-events-none"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
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
          {/* Terminal-style header */}
          <motion.div
            className="inline-block p-4 cyber-border rounded-lg font-matrix text-sm text-neon-green mb-8"
            animate={{
              borderColor: [
                "rgba(0,255,255,0.3)",
                "rgba(0,255,136,0.8)",
                "rgba(0,255,255,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Terminal className="w-4 h-4" />
              <span>projects@portfolio:~$</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                _
              </motion.span>
            </div>
            <div className="mt-2">
              <span className="text-neon-cyan">Fetching projects... </span>
              <span className="text-neon-green">COMPLETE ✓</span>
            </div>
          </motion.div>

          <motion.h2
            className="heading-2 mb-6 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-shimmer bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Featured Projects
            </span>

            {/* Floating project icons */}
            {[Code, Cpu, Activity, Zap].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${110 + i * 8}%`,
                  top: `${-10 + i * 5}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
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
            <span className="text-neon-cyan font-cyber">&gt; </span>
            Cutting-edge projects showcasing the intersection of AI, web development,
            and creative technology
            <motion.span
              className="inline-block w-2 h-6 bg-neon-cyan ml-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.p>

          {/* Enhanced Control Panel */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Filter buttons */}
            <div className="flex items-center space-x-2">
              {filters.map(({ id, name, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => setSelectedFilter(id)}
                  className={`px-6 py-3 cyber-border rounded-lg font-cyber text-sm tracking-wider transition-all duration-300 ${
                    selectedFilter === id
                      ? "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50"
                      : "text-white/70 hover:text-neon-cyan"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{name}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="px-4 py-2 cyber-border rounded-lg text-white/70 hover:text-neon-cyan font-matrix"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {viewMode === "grid" ? "LIST_VIEW" : "GRID_VIEW"}
              </motion.button>

              <motion.button
                onClick={() => setAutoRotate(!autoRotate)}
                className="px-4 py-2 cyber-border rounded-lg text-white/70 hover:text-neon-cyan font-matrix flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{autoRotate ? "PAUSE" : "PLAY"}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid gap-12 ${
            viewMode === "grid"
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
        >
          {featuredProjects.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants}>
              <HolographicCard
                index={index}
                isHovered={hoveredProject === project.id}
                onHover={setHoveredProject}
              >
                <Card className="bg-transparent border-none h-full">
                  {/* 3D Model Section */}
                  <div className="relative mb-6">
                    <ProjectModel
                      title={project.title}
                      technologies={project.technologies}
                      color={
                        index % 3 === 0
                          ? "#00ffff"
                          : index % 3 === 1
                          ? "#bf00ff"
                          : "#ff0080"
                      }
                    />

                    {/* Status and metrics overlay */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <motion.div
                        className={`px-3 py-1 rounded-full text-xs font-cyber ${
                          project.status === "Completed"
                            ? "bg-neon-green/20 text-neon-green border border-neon-green/30"
                            : "bg-neon-orange/20 text-neon-orange border border-neon-orange/30"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          boxShadow: [
                            "0 0 10px rgba(0,255,136,0.3)",
                            "0 0 20px rgba(0,255,136,0.6)",
                            "0 0 10px rgba(0,255,136,0.3)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {project.status}
                      </motion.div>

                      {/* Live status indicator */}
                      <motion.div
                        className="flex items-center space-x-2 px-3 py-1 bg-black/50 rounded-full border border-neon-cyan/30"
                        animate={{
                          borderColor: [
                            "rgba(0,255,255,0.3)",
                            "rgba(0,255,255,0.8)",
                            "rgba(0,255,255,0.3)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-neon-green rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-neon-green text-xs font-matrix">
                          LIVE
                        </span>
                      </motion.div>
                    </div>

                    {/* Hover tooltip */}
                    <AnimatePresence>
                      {hoveredProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 20 }}
                          className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-xl rounded-lg p-4 border border-neon-cyan/30"
                        >
                          <h4 className="text-neon-cyan font-cyber text-sm mb-2">
                            README.md
                          </h4>
                          <p className="text-white/80 text-sm font-matrix">
                            {project.longDescription || project.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-white text-2xl mb-3 font-cyber">
                      <motion.span
                        className="hover:text-neon-cyan transition-colors duration-300"
                        whileHover={{ textShadow: "0 0 20px #00ffff" }}
                      >
                        {project.title}
                      </motion.span>
                    </CardTitle>

                    <motion.p
                      className="text-white/70 leading-relaxed mb-6 font-futuristic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Tech stack with enhanced styling */}
                    <TechBadgeCloud
                      technologies={project.technologies.slice(0, 6)}
                      isHovered={hoveredProject === project.id}
                    />
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Project metrics */}
                    {project.metrics && (
                      <ProjectMetrics
                        metrics={project.metrics}
                        isVisible={hoveredProject === project.id}
                      />
                    )}

                    {/* Collaborators section */}
                    {project.collaborators && project.collaborators.length > 0 && (
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <div className="flex items-center text-neon-purple text-sm font-cyber">
                          <Users className="w-4 h-4 mr-2" />
                          COLLABORATORS
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {project.collaborators.map((collaborator, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center justify-between p-3 cyber-border rounded-lg hover:bg-neon-purple/10 transition-all duration-300 group"
                              whileHover={{ x: 5, scale: 1.02 }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: idx * 0.1 }}
                            >
                              <span className="text-white font-medium font-futuristic">
                                {collaborator.name}
                              </span>
                              <Badge
                                variant="outline"
                                className="border-neon-purple/30 text-neon-purple text-xs font-matrix group-hover:border-neon-purple group-hover:text-neon-purple"
                              >
                                {collaborator.role}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Enhanced action buttons */}
                    <motion.div
                      className="flex items-center space-x-4 pt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
                        <Button
                          variant="outline"
                          className="w-full neon-button font-cyber tracking-wider group"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                            SOURCE_CODE
                          </a>
                        </Button>
                      </motion.div>

                      {project.demo && (
                        <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
                          <Button
                            className="w-full holo-button font-cyber tracking-wider group relative overflow-hidden"
                            asChild
                          >
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <div className="relative flex items-center justify-center">
                                <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                                LIVE_DEMO
                              </div>
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  </CardContent>
                </Card>
              </HolographicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced view all projects button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotateX: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="neon-button px-12 py-4 text-xl font-cyber tracking-wider group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>EXPLORE_ALL_PROJECTS ({projects.length})</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}