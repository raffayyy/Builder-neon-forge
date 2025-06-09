import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Github,
  ExternalLink,
  Users,
  Calendar,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectModel from "@/components/3d/ProjectModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects } from "@/lib/data";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTech, setSelectedTech] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    let filtered = projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || project.status === selectedStatus;
      const matchesTech =
        selectedTech === "all" || project.technologies.includes(selectedTech);

      return matchesSearch && matchesStatus && matchesTech;
    });

    setFilteredProjects(filtered);
  }, [searchTerm, selectedStatus, selectedTech]);

  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies)),
  ).sort();

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Sophisticated background effects matching landing page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.08),transparent_50%)]" />
      </div>

      <Header />

      <main className="pt-20 lg:pt-24 relative z-10">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="heading-2 gradient-text-coral mb-6">My Projects</h1>
              <p className="body-regular text-white/70 max-w-3xl mx-auto">
                A comprehensive showcase of my work in AI, web development, and
                creative technology. Each project represents a unique challenge
                and learning experience.
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-6 mb-12"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coral/60 w-5 h-5" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-coral/50 focus:ring-coral/20"
                  />
                </div>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-48 bg-white/5 border-white/20 text-white hover:border-emerald/50">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/20">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedTech} onValueChange={setSelectedTech}>
                  <SelectTrigger className="w-full md:w-48 bg-white/5 border-white/20 text-white hover:border-lavender/50">
                    <SelectValue placeholder="Filter by tech" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/20">
                    <SelectItem value="all">All Technologies</SelectItem>
                    {allTechnologies.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <p className="text-white/70">
                Showing <span className="text-coral font-semibold">{filteredProjects.length}</span> of{" "}
                <span className="text-emerald font-semibold">{projects.length}</span> projects
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="glass-card overflow-hidden hover:shadow-glass-lg h-full group">
                    {/* 3D Model */}
                    <div className="relative">
                      <ProjectModel
                        title={project.title}
                        technologies={project.technologies}
                        color={
                          index % 4 === 0
                            ? "#ff6b6b" // coral
                            : index % 4 === 1
                              ? "#4ecdc4" // emerald
                              : index % 4 === 2
                                ? "#a55eea" // lavender
                                : "#feca57" // amber
                        }
                      />

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant={
                            project.status === "Completed"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            project.status === "Completed"
                              ? "bg-emerald/20 text-emerald border-emerald/30"
                              : "bg-amber/20 text-amber border-amber/30"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-white text-xl mb-3">
                        {project.title}
                      </CardTitle>

                      <p className="text-white/70 leading-relaxed mb-4">
                        {project.longDescription || project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-white/20 text-white/80 hover:border-coral/50 hover:text-coral transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Metrics */}
                      {project.metrics && (
                        <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                          {Object.entries(project.metrics).map(
                            ([key, value]) => (
                              <div key={key} className="text-center">
                                <div className="text-white font-semibold text-lg">
                                  {value}
                                </div>
                                <div className="text-white/60 text-xs capitalize">
                                  {key}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      )}

                      {/* Collaborators */}
                      {project.collaborators &&
                        project.collaborators.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center text-white/70 text-sm">
                              <Users className="w-4 h-4 mr-2" />
                              Collaborators
                            </div>
                            <div className="space-y-2">
                              {project.collaborators.map(
                                (collaborator, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10"
                                  >
                                    <span className="text-white font-medium">
                                      {collaborator.name}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className="border-white/20 text-white/70 text-xs"
                                    >
                                      {collaborator.role}
                                    </Badge>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3 pt-4">
                        <Button
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 hover:border-coral/50 flex-1 group"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2 group-hover:text-coral transition-colors" />
                            View Code
                          </a>
                        </Button>

                        {project.demo && (
                          <Button
                            className="btn-coral flex-1"
                            asChild
                          >
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
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 glass-card rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-coral/60" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">
                  No projects found
                </h3>
                <p className="text-white/70 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedStatus("all");
                    setSelectedTech("all");
                  }}
                  className="border-white/20 text-white hover:bg-white/10 hover:border-coral/50"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
