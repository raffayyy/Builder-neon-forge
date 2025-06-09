import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/data";

export default function Experience() {
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 text-white mb-4">Professional Experience</h2>
          <p className="body-large text-white/70 max-w-2xl mx-auto">
            My journey through various roles and projects that have shaped my
            expertise in technology and innovation
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-portfolio-primary/30 transform md:-translate-x-0.5" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:justify-center`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-portfolio-primary rounded-full border-4 border-portfolio-bg transform md:-translate-x-1/2 z-10" />

                {/* Content Card */}
                <div
                  className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <Card className="bg-portfolio-surface border-white/10 card-hover">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-portfolio-primary/20 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-portfolio-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">
                              {exp.position}
                            </CardTitle>
                            <p className="text-portfolio-primary font-medium">
                              {exp.company}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/60">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-white/70 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="space-y-3">
                        <h4 className="text-white font-medium text-sm">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2 text-white/70 text-sm"
                            >
                              <span className="w-1.5 h-1.5 bg-portfolio-primary rounded-full mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="space-y-3">
                        <h4 className="text-white font-medium text-sm">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="border-white/20 text-white/80 hover:border-portfolio-primary hover:text-portfolio-primary transition-colors text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Date Badge for larger screens */}
                <div
                  className={`hidden md:block absolute ${
                    index % 2 === 0 ? "right-4" : "left-4"
                  } top-8`}
                >
                  <Badge
                    variant="outline"
                    className="border-portfolio-primary/30 text-portfolio-primary bg-portfolio-primary/10"
                  >
                    {exp.duration.split(" - ")[0]}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-portfolio-surface border-white/10 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-white text-xl font-semibold mb-4">
                Looking for New Opportunities
              </h3>
              <p className="text-white/70 mb-6">
                I'm currently seeking full-time opportunities where I can
                contribute my skills in AI, web development, and innovative
                technology solutions. Open to remote, hybrid, or on-site
                positions with forward-thinking companies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge
                  variant="outline"
                  className="border-green-500/30 text-green-400 bg-green-500/10 px-4 py-2"
                >
                  Available for Full-time Positions
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-2"
                >
                  Open to Contract Work
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
