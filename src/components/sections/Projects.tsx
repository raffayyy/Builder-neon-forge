import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Users,
  Star,
  TrendingUp,
  Calendar,
  Grid3X3,
  List,
  Filter,
  Sparkles,
  Zap,
  Eye,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Box, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { projects } from "@/lib/data";

// 3D Project Showcase Component
function Project3DModel({ title, technologies, color, isActive }) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = isActive
        ? state.clock.getElapsedTime() * 0.5
        : Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[0.8, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Orbiting tech nodes */}
      {technologies.slice(0, 4).map((tech, index) => {
        const angle = (index / 4) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <Float
            key={tech}
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.5}
          >
            <Box
              position={[x, 0, z]}
              args={[0.3, 0.3, 0.3]}
              rotation={[0, angle, 0]}
            >
              <meshStandardMaterial
                color={["#ff6b6b", "#4ecdc4", "#a55eea", "#feca57"][index % 4]}
                transparent
                opacity={0.9}
                roughness={0.1}
                metalness={0.9}
              />
            </Box>
          </Float>
        );
      })}

      {/* Connecting lines */}
      {technologies.slice(0, 4).map((_, index) => {
        const angle = (index / 4) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(x, 0, z),
        ]);

        return (
          <line key={`line-${index}`} geometry={geometry}>
            <lineBasicMaterial color={color} transparent opacity={0.6} />
          </line>
        );
      })}
    </group>
  );
}

// 3D Canvas Component
function ProjectCanvas({ project, isActive }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6b" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
      <Project3DModel
        title={project.title}
        technologies={project.technologies}
        color="#ff6b6b"
        isActive={isActive}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={isActive}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

// Enhanced Project Card Component
const ProjectCard = ({ project, index, isHovered, onHover }) => {
  const [is3DActive, setIs3DActive] = useState(false);

  return (
    <motion.div
      className="group relative"
      onHoverStart={() => {
        onHover(project.id);
        setIs3DActive(true);
      }}
      onHoverEnd={() => {
        onHover(null);
        setIs3DActive(false);
      }}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
      }}
    >
      <Card className="card-3d h-full overflow-hidden">
        {/* 3D Project Preview */}
        <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute inset-0">
            <ProjectCanvas project={project} isActive={is3DActive} />
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Project Status */}
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
            >
              <Badge
                className={`glass-card ${
                  project.status === "Completed"
                    ? "border-emerald/30 text-emerald"
                    : "border-amber/30 text-amber"
                } backdrop-blur-xl`}
              >
                {project.status}
              </Badge>
            </motion.div>
          </div>

          {/* Project Type */}
          <div className="absolute top-4 left-4 z-10">
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
            >
              <Badge className="glass-card border-coral/30 text-coral backdrop-blur-xl">
                <Sparkles className="w-3 h-3 mr-1" />
                {project.technologies[0]}
              </Badge>
            </motion.div>
          </div>

          {/* Hover Action Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20"
              >
                <div className="flex space-x-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Button size="sm" className="btn-coral" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </motion.div>
                  {project.demo && (
                    <motion.div
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Button size="sm" className="btn-emerald" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  i % 3 === 0
                    ? "bg-coral"
                    : i % 3 === 1
                      ? "bg-emerald"
                      : "bg-lavender"
                }`}
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <CardTitle className="text-white text-xl font-display group-hover:text-coral transition-colors duration-300">
              {project.title}
            </CardTitle>
            {project.featured && (
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-5 h-5 text-amber fill-current" />
              </motion.div>
            )}
          </div>

          <p className="text-slate-400 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies with animations */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge
                  variant="outline"
                  className="border-white/20 text-white/80 hover:border-coral hover:text-coral transition-all duration-300 text-xs hover-glow"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
            {project.technologies.length > 4 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className="border-white/20 text-white/80 text-xs"
                    >
                      +{project.technologies.length - 4}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {project.technologies.slice(4).map((tech) => (
                        <span key={tech} className="text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Animated Metrics */}
          {project.metrics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.8 }}
              className="grid grid-cols-3 gap-4 p-4 glass-card rounded-xl"
            >
              {Object.entries(project.metrics).map(([key, value], i) => (
                <motion.div
                  key={key}
                  className="text-center group"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-coral font-semibold text-lg"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255, 107, 107, 0.3)",
                        "0 0 20px rgba(255, 107, 107, 0.6)",
                        "0 0 10px rgba(255, 107, 107, 0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {value}
                  </motion.div>
                  <div className="text-slate-400 text-xs capitalize">{key}</div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Collaborators */}
          {project.collaborators && project.collaborators.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 1 }}
              className="space-y-3"
            >
              <div className="flex items-center text-slate-400 text-sm">
                <Users className="w-4 h-4 mr-2 text-emerald" />
                Collaborators
              </div>
              <div className="space-y-2">
                {project.collaborators.map((collaborator, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center justify-between p-3 glass-card rounded-lg hover-lift group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 1.2 + idx * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-white text-sm font-medium group-hover:text-emerald transition-colors">
                      {collaborator.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-emerald/30 text-emerald text-xs"
                    >
                      {collaborator.role}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 1.4 }}
            className="flex items-center space-x-3 pt-4"
          >
            <Button
              variant="outline"
              size="sm"
              className="glass-button border-white/20 hover:border-coral hover:text-coral flex-1 transition-all duration-300"
              asChild
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                View Code
              </a>
            </Button>

            {project.demo && (
              <Button size="sm" className="btn-coral flex-1" asChild>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(6);

  const featuredProjects = projects.filter((project) => project.featured);
  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "featured") return project.featured;
    if (filter === "completed") return project.status === "Completed";
    if (filter === "progress") return project.status === "In Progress";
    return true;
  });

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const filters = [
    { id: "all", label: "All Projects", count: projects.length, icon: Eye },
    {
      id: "featured",
      label: "Featured",
      count: featuredProjects.length,
      icon: Star,
    },
    {
      id: "completed",
      label: "Completed",
      count: projects.filter((p) => p.status === "Completed").length,
      icon: TrendingUp,
    },
    {
      id: "progress",
      label: "In Progress",
      count: projects.filter((p) => p.status === "In Progress").length,
      icon: Zap,
    },
  ];

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0
                ? "particle-coral"
                : i % 3 === 1
                  ? "particle-emerald"
                  : "particle-lavender"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-3 glass-card px-6 py-3 mb-8 hover-glow"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-coral" />
            </motion.div>
            <span className="text-sm font-medium text-white">
              Recent Projects & Innovations
            </span>
          </motion.div>

          <motion.h2
            className="heading-2 text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured{" "}
            <span className="gradient-text-coral animate-text-glow">
              Projects
            </span>
          </motion.h2>

          <motion.p
            className="body-large text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A showcase of my recent work in AI, web development, and creative
            technology. Each project represents a unique challenge and learning
            experience with cutting-edge solutions.
          </motion.p>
        </motion.div>

        {/* Enhanced Filter & View Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-16"
        >
          {/* Filters */}
          <div className="flex items-center space-x-3 glass-card p-3 rounded-2xl">
            {filters.map((filterOption, index) => {
              const Icon = filterOption.icon;
              return (
                <motion.button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    filter === filterOption.id
                      ? "btn-coral shadow-glow-coral"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{filterOption.label}</span>
                  <Badge className="glass-card border-white/20 text-xs">
                    {filterOption.count}
                  </Badge>
                </motion.button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-3"
          >
            <div className="glass-card p-2 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-coral text-white shadow-glow-coral"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-coral text-white shadow-glow-coral"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
        >
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredProject === project.id}
              onHover={setHoveredProject}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="btn-emerald px-10 py-4 text-lg"
              size="lg"
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              Load More Projects ({filteredProjects.length - visibleCount}{" "}
              remaining)
            </Button>
          </motion.div>
        )}

        {/* Enhanced Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "Total Projects",
                value: projects.length,
                color: "coral",
                icon: Eye,
              },
              {
                label: "Completed",
                value: projects.filter((p) => p.status === "Completed").length,
                color: "emerald",
                icon: TrendingUp,
              },
              {
                label: "Technologies",
                value: [...new Set(projects.flatMap((p) => p.technologies))]
                  .length,
                color: "lavender",
                icon: Zap,
              },
              {
                label: "Collaborators",
                value: [
                  ...new Set(
                    projects.flatMap(
                      (p) => p.collaborators?.map((c) => c.name) || [],
                    ),
                  ),
                ].length,
                color: "amber",
                icon: Users,
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  className="text-center glass-card p-8 rounded-2xl hover-lift group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-${stat.color}/20 flex items-center justify-center group-hover:bg-${stat.color}/30 transition-colors duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className={`w-8 h-8 text-${stat.color}`} />
                  </motion.div>
                  <motion.div
                    className={`text-4xl font-bold gradient-text-${stat.color} mb-2`}
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255, 107, 107, 0.3)",
                        "0 0 20px rgba(255, 107, 107, 0.6)",
                        "0 0 10px rgba(255, 107, 107, 0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-slate-400 text-sm font-medium group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
