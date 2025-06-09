import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { personalInfo, experience, achievements, skills } from "@/lib/data";

export default function Resume() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-bg">
      <Header />

      <main className="pt-20 lg:pt-24">
        {/* Header */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="heading-1 text-white mb-6">Resume</h1>
              <p className="body-large text-white/70 max-w-2xl mx-auto mb-8">
                A comprehensive overview of my professional experience, skills,
                and achievements
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-portfolio-primary hover:bg-portfolio-primary/80 text-white px-8 py-3"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF Resume
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
                  size="lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View LinkedIn Profile
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Resume Content */}
        <section className="pb-20">
          <div className="container-custom max-w-4xl">
            <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
              {/* Header Section */}
              <div className="bg-portfolio-surface p-8 border-b border-white/10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {personalInfo.name}
                  </h2>
                  <p className="text-xl text-portfolio-primary mb-4">
                    {personalInfo.title}
                  </p>

                  <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
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

                <div className="text-center">
                  <p className="text-white/80 leading-relaxed max-w-2xl mx-auto">
                    {personalInfo.bio}
                  </p>
                </div>
              </div>

              {/* Content Sections */}
              <div className="p-8 space-y-12">
                {/* Experience */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <div className="w-2 h-6 bg-portfolio-primary rounded mr-3" />
                    Professional Experience
                  </h3>

                  <div className="space-y-6">
                    {experience.map((exp) => (
                      <Card key={exp.id} className="bg-white/5 border-white/10">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <CardTitle className="text-white text-lg">
                                {exp.position}
                              </CardTitle>
                              <p className="text-portfolio-primary font-medium">
                                {exp.company}
                              </p>
                            </div>
                            <div className="flex items-center text-sm text-white/60 mt-2 md:mt-0">
                              <Calendar className="w-4 h-4 mr-1" />
                              {exp.duration}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 mb-4">
                            {exp.description}
                          </p>
                          <ul className="space-y-2 mb-4">
                            {exp.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-white/70 text-sm"
                              >
                                <span className="w-1.5 h-1.5 bg-portfolio-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="border-white/20 text-white/70 text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <div className="w-2 h-6 bg-portfolio-primary rounded mr-3" />
                    Technical Skills
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((category) => (
                      <Card
                        key={category.category}
                        className="bg-white/5 border-white/10"
                      >
                        <CardHeader>
                          <CardTitle className="text-white text-lg">
                            {category.category}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {category.items.map((skill) => (
                              <Badge
                                key={skill.name}
                                variant="outline"
                                className="border-white/20 text-white/70"
                              >
                                {skill.name}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Education & Certifications */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <div className="w-2 h-6 bg-portfolio-primary rounded mr-3" />
                    Education & Certifications
                  </h3>

                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <Card
                        key={achievement.id}
                        className="bg-white/5 border-white/10"
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h4 className="text-white font-semibold text-lg">
                                {achievement.title}
                              </h4>
                              <p className="text-portfolio-primary">
                                {achievement.issuer}
                              </p>
                              {achievement.grade && (
                                <p className="text-white/70 text-sm">
                                  Grade: {achievement.grade}
                                </p>
                              )}
                            </div>
                            {achievement.date && (
                              <div className="text-white/60 text-sm mt-2 md:mt-0">
                                {new Date(achievement.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                  },
                                )}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center pt-8 border-t border-white/10"
                >
                  <p className="text-white/60 text-sm mb-4">
                    Last updated:{" "}
                    {new Date(
                      personalInfo.resume.lastUpdated,
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-white/70">
                    For the most current version and references, please visit my
                    LinkedIn profile or contact me directly.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
