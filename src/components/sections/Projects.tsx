import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Users,
  Star,
  TrendingUp,
  Eye,
  Calendar,
  Filter,
  Grid3X3,
  List,
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
import { projects } from "@/lib/data";

const ProjectCard = ({ project, index, isHovered, onHover }) => {
  return (
    <motion.div
      className="group"
      onHoverStart={() => onHover(project.id)}
      onHoverEnd={() => onHover(null)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="interactive-card h-full overflow-hidden">
        {/* Project Image/Preview */}
        <div className="relative aspect-video bg-gradient-to-br from-electric-blue/20 to-electric-violet/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Project Status */}
          <div className="absolute top-4 right-4">
            <Badge
              className={`${
                project.status === "Completed"
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
              } glass-card border`}
            >
              {project.status}
            </Badge>
          </div>

          {/* Project Type Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="glass-card border border-white/20 text-white">
              {project.technologies[0]}
            </Badge>
          </div>

          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="flex space-x-4">
                  <Button size="sm" className="btn-primary" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  {project.demo && (
                    <Button size="sm" className="btn-secondary" asChild>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-electric-blue/50 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </div>

        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <CardTitle className="text-white text-xl font-display group-hover:text-electric-blue transition-colors duration-300">
              {project.title}
            </CardTitle>
            {project.featured && (
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            )}
          </div>

          <p className="text-light-slate leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-white/20 text-white/80 hover:border-electric-blue hover:text-electric-blue transition-colors text-xs"
              >
                {tech}
              </Badge>
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

        <CardContent className="space-y-4">
          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-4 p-4 glass-card rounded-xl">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-white font-semibold text-lg">
                    {value}
                  </div>
                  <div className="text-light-slate text-xs capitalize">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Collaborators */}
          {project.collaborators && project.collaborators.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center text-light-slate text-sm">
                <Users className="w-4 h-4 mr-2" />
                Collaborators
              </div>
              <div className="space-y-2">
                {project.collaborators.map((collaborator, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 glass-card rounded-lg"
                  >
                    <span className="text-white text-sm font-medium">
                      {collaborator.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-white/20 text-white/70 text-xs"
                    >
                      {collaborator.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <Button
              variant="outline"
              size="sm"
              className="btn-secondary flex-1"
              asChild
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>

            {project.demo && (
              <Button size="sm" className="btn-primary flex-1" asChild>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
                </a>
              </Button>
            )}
          </div>
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
    { id: "all", label: "All Projects", count: projects.length },
    { id: "featured", label: "Featured", count: featuredProjects.length },
    {
      id: "completed",
      label: "Completed",
      count: projects.filter((p) => p.status === "Completed").length,
    },
    {
      id: "progress",
      label: "In Progress",
      count: projects.filter((p) => p.status === "In Progress").length,
    },
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-6"
          >
            <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse-soft" />
            <span className="text-sm font-medium text-white">Recent Work</span>
          </motion.div>

          <h2 className="heading-2 text-white mb-6">
            Featured <span className="accent-gradient-text">Projects</span>
          </h2>

          <p className="body-large text-light-slate max-w-3xl mx-auto">
            A showcase of my recent work in AI, web development, and creative
            technology. Each project represents a unique challenge and learning
            experience.
          </p>
        </motion.div>

        {/* Filter & View Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12"
        >
          {/* Filters */}
          <div className="flex items-center space-x-2 glass-card p-2 rounded-2xl">
            {filters.map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === filterOption.id
                    ? "bg-electric-blue text-white shadow-glow-blue"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {filterOption.label}
                <span className="ml-2 text-xs opacity-70">
                  ({filterOption.count})
                </span>
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <div className="glass-card p-2 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === "grid"
                    ? "bg-electric-blue text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === "list"
                    ? "bg-electric-blue text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="btn-secondary px-8 py-3"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Load More Projects ({filteredProjects.length - visibleCount}{" "}
              remaining)
            </Button>
          </motion.div>
        )}

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Projects", value: projects.length },
              {
                label: "Completed",
                value: projects.filter((p) => p.status === "Completed").length,
              },
              {
                label: "Technologies",
                value: [...new Set(projects.flatMap((p) => p.technologies))]
                  .length,
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
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center glass-card p-6 rounded-2xl micro-scale"
              >
                <div className="text-3xl font-bold accent-gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-light-slate text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
