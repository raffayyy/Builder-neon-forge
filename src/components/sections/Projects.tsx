import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  Users,
  Calendar,
  Code,
  Zap,
  Eye,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";

const ProjectCard = ({ project, index, isSelected, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Card className="bg-gray-900/50 border-gray-700/50 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm h-full flex flex-col">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <Badge
                  variant="outline"
                  className={`${
                    project.status === "Completed"
                      ? "border-emerald-500/50 text-emerald-400"
                      : "border-yellow-500/50 text-yellow-400"
                  } bg-transparent`}
                >
                  {project.status}
                </Badge>
              </div>
              <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                {project.title}
              </CardTitle>
            </div>
            {project.featured && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-3 py-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-yellow-400 text-xs font-medium">
                  Featured
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-400 leading-relaxed">{project.description}</p>
        </CardHeader>

        <CardContent className="space-y-6 flex-1 flex flex-col">
          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Built with</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.slice(0, 4).map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies?.length > 4 && (
                <Badge
                  variant="outline"
                  className="bg-gray-800/50 border-gray-600 text-gray-300"
                >
                  +{project.technologies.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-700/50">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">
                  {project.metrics.users}
                </div>
                <div className="text-xs text-gray-500">Users</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-400">
                  {project.metrics.stars}
                </div>
                <div className="text-xs text-gray-500">Stars</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">
                  {project.metrics.accuracy || "95%"}
                </div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>
          )}

          {/* Collaborators */}
          {project.collaborators && (
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team
              </h4>
              <div className="space-y-1">
                {project.collaborators.map((collab, i) => (
                  <div key={i} className="text-sm text-gray-400">
                    <span className="text-gray-300">{collab.name}</span> -{" "}
                    {collab.role}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 mt-auto pt-4">
            {project.demo && (
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full flex-1"
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.github && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full flex-1"
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
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    ...Array.from(
      new Set(projects?.map((p) => p.category).filter(Boolean) || []),
    ),
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects?.filter((p) => p.category === selectedCategory) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-20 bg-gray-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-2 mb-6"
          >
            <Code className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-medium">Featured Work</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            A showcase of my recent work, featuring innovative solutions across
            web development, AI/ML, and full-stack applications
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full capitalize ${
                  selectedCategory === category
                    ? "bg-purple-500 hover:bg-purple-600 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {category === "all" ? "All Projects" : category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects?.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isSelected={false}
                onSelect={() => {}}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                label: "Projects Completed",
                value: projects?.length || "15+",
                icon: Code,
                color: "from-blue-500 to-cyan-400",
              },
              {
                label: "Technologies Used",
                value: "25+",
                icon: Zap,
                color: "from-purple-500 to-pink-400",
              },
              {
                label: "Client Satisfaction",
                value: "100%",
                icon: TrendingUp,
                color: "from-emerald-500 to-teal-400",
              },
              {
                label: "Years Experience",
                value: "5+",
                icon: Calendar,
                color: "from-orange-500 to-red-400",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-600 transition-colors"
              >
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-0.5`}
                >
                  <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 border border-gray-700/50 rounded-3xl p-12 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">
              Have a project in mind?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm always excited to work on new projects and bring innovative
              ideas to life. Let's collaborate and create something amazing
              together.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-full px-8 py-3 text-lg font-semibold"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Zap className="w-5 h-5 mr-2" />
              Start a Project
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
