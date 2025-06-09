import { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import {
  personalInfo,
  experience,
  skills,
  projects,
  achievements,
} from "@/lib/data";

export default function Resume() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false);
      window.open(personalInfo.resume.url, "_blank");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Subtle background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)]" />
      </div>

      <Header />

      <main className="pt-20 lg:pt-24 relative z-10">
        <div className="container mx-auto max-w-5xl px-4 py-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Professional Resume
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              A comprehensive overview of my professional journey, skills, and
              achievements
            </p>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              size="lg"
            >
              {isDownloading ? (
                <>Downloading...</>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF Resume
                </>
              )}
            </Button>
          </motion.div>

          {/* Personal Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="bg-white/5 border-white/10 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="text-center lg:text-left flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {personalInfo.name}
                    </h2>
                    <p className="text-xl text-blue-400 mb-4">
                      {personalInfo.title}
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-white/70">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {personalInfo.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {personalInfo.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {personalInfo.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() =>
                        window.open(personalInfo.social.github, "_blank")
                      }
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() =>
                        window.open(personalInfo.social.linkedin, "_blank")
                      }
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <blockquote className="text-lg text-white/80 italic text-center mb-6">
                  "{personalInfo.quote}"
                </blockquote>
                <p className="text-white/70 leading-relaxed">
                  {personalInfo.bio}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Experience Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <Briefcase className="w-5 h-5 mr-3 text-blue-400" />
                      Professional Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experience.map((exp, index) => (
                      <div
                        key={exp.id}
                        className="border-l-2 border-blue-400/30 pl-6 pb-6 last:pb-0"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {exp.position}
                            </h3>
                            <p className="text-blue-400 font-medium">
                              {exp.company}
                            </p>
                            <p className="text-white/60 text-sm">
                              {exp.location}
                            </p>
                          </div>
                          <div className="text-sm text-white/60 mt-1 sm:mt-0">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {exp.duration}
                          </div>
                        </div>
                        <p className="text-white/70 mb-3">{exp.description}</p>
                        <div className="space-y-2">
                          <h4 className="text-white font-medium text-sm">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-1">
                            {exp.achievements
                              .slice(0, 3)
                              .map((achievement, idx) => (
                                <li
                                  key={idx}
                                  className="text-white/70 text-sm flex items-start"
                                >
                                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                                  {achievement}
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.slice(0, 6).map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="border-blue-400/30 text-blue-300 bg-blue-400/10 text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Projects Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <Code2 className="w-5 h-5 mr-3 text-blue-400" />
                      Featured Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {projects
                      .filter((p) => p.featured)
                      .slice(0, 3)
                      .map((project) => (
                        <div
                          key={project.id}
                          className="border border-white/10 rounded-lg p-4 hover:border-blue-500/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-white">
                              {project.title}
                            </h3>
                            <Badge
                              variant={
                                project.status === "Completed"
                                  ? "default"
                                  : "outline"
                              }
                              className={
                                project.status === "Completed"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "border-orange-500/30 text-orange-400"
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-white/70 mb-3 text-sm">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="border-white/20 text-white/70 text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                              onClick={() =>
                                window.open(project.github, "_blank")
                              }
                            >
                              <Github className="w-3 h-3 mr-1" />
                              Code
                            </Button>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() =>
                                window.open(project.demo, "_blank")
                              }
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Demo
                            </Button>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Skills Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <Code2 className="w-5 h-5 mr-3 text-blue-400" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {skills.map((category) => (
                      <div key={category.category}>
                        <h3 className="text-white font-semibold mb-3 flex items-center">
                          <div className="w-2 h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded mr-2" />
                          {category.category}
                        </h3>
                        <div className="space-y-2">
                          {category.items.map((skill) => (
                            <div
                              key={skill.name}
                              className="flex items-center justify-between"
                            >
                              <span className="text-white/80 text-sm">
                                {skill.name}
                              </span>
                              <div className="flex items-center">
                                <div className="w-16 h-1.5 bg-white/10 rounded-full mr-2 overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${skill.level}%` }}
                                  />
                                </div>
                                <span className="text-white/60 text-xs w-8">
                                  {skill.level}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Education & Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <GraduationCap className="w-5 h-5 mr-3 text-blue-400" />
                      Education & Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="border border-white/10 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-white font-semibold text-sm flex items-center">
                            <Award className="w-4 h-4 mr-2 text-yellow-400" />
                            {achievement.title}
                          </h3>
                        </div>
                        <p className="text-blue-400 text-sm font-medium">
                          {achievement.issuer}
                        </p>
                        {achievement.date && (
                          <p className="text-white/60 text-xs mt-1">
                            {new Date(achievement.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                              },
                            )}
                          </p>
                        )}
                        {achievement.grade && (
                          <p className="text-white/70 text-xs mt-1">
                            Grade: {achievement.grade}
                          </p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Footer Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center pt-12 mt-12 border-t border-white/10"
          >
            <p className="text-white/60 text-sm mb-4">
              Last updated:{" "}
              {new Date(personalInfo.resume.lastUpdated).toLocaleDateString()}
            </p>
            <p className="text-white/70 mb-6">
              Thank you for reviewing my resume. I'm always open to new
              opportunities!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() =>
                  window.open(`mailto:${personalInfo.email}`, "_blank")
                }
              >
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() =>
                  window.open(personalInfo.social.linkedin, "_blank")
                }
              >
                <Linkedin className="w-4 h-4 mr-2" />
                Connect on LinkedIn
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
