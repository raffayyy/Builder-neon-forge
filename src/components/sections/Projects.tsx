import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Users, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProjectModel from "@/components/3d/ProjectModel";
import { projects } from "@/lib/data";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const featuredProjects = projects.filter((project) => project.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="projects" className="section-padding bg-portfolio-surface">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 text-white mb-4">Featured Projects</h2>
          <p className="body-large text-white/70 max-w-2xl mx-auto">
            A showcase of my recent work in AI, web development, and creative
            technology
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group"
            >
              <Card className="bg-portfolio-bg border-white/10 overflow-hidden card-hover h-full">
                {/* 3D Model */}
                <div className="relative">
                  <ProjectModel
                    title={project.title}
                    technologies={project.technologies}
                    color={index % 2 === 0 ? "#6366f1" : "#8b5cf6"}
                  />

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={
                        project.status === "Completed" ? "default" : "secondary"
                      }
                      className={
                        project.status === "Completed"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-xl mb-2">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-white/20 text-white/80 hover:border-portfolio-primary hover:text-portfolio-primary transition-colors"
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
                              className="border-white/20 text-white/80"
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
                    <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-white font-semibold text-lg">
                            {value}
                          </div>
                          <div className="text-white/60 text-xs capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Collaborators */}
                  {project.collaborators &&
                    project.collaborators.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center text-white/70 text-sm">
                          <Users className="w-4 h-4 mr-2" />
                          Collaborators
                        </div>
                        <div className="space-y-1">
                          {project.collaborators.map((collaborator, idx) => (
                            <div key={idx} className="text-white/60 text-sm">
                              {collaborator.name} - {collaborator.role}
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
                      className="border-white/20 text-white hover:bg-white/10 flex-1"
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
                      <Button
                        size="sm"
                        className="bg-portfolio-primary hover:bg-portfolio-primary/80 text-white flex-1"
                        asChild
                      >
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
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            View All Projects ({projects.length})
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
