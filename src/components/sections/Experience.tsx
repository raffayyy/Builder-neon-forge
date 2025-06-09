import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  Star,
  Award,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/data";
import soundManager from "@/lib/soundManager";

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
    <section
      id="experience"
      className="py-20 bg-gray-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.1),transparent_50%)]" />
        
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
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
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-2 mb-6"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Briefcase className="w-5 h-5 text-emerald-400" />
            </motion.div>
            <span className="text-emerald-400 font-medium">
              Work Experience
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Professional{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My career journey through various roles and projects that have
            shaped my expertise in technology and innovation
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
          {/* Enhanced Timeline line with gradient and pulse */}
          <motion.div 
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-blue-400 to-purple-400 hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "top" }}
          />
          
          {/* Moving glow along timeline */}
          <motion.div
            className="absolute left-7 w-1 h-8 bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent rounded-full hidden md:block"
            animate={{ y: [0, 200, 400, 600] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <div className="space-y-12">
            {experience?.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
                onMouseEnter={() => soundManager.playHover()}
              >
                {/* Enhanced Timeline dot with ripple effect */}
                <motion.div 
                  className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full border-4 border-gray-950 hidden md:block z-10"
                  whileHover={{ scale: 1.5 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(16, 185, 129, 0.4)",
                      "0 0 0 10px rgba(16, 185, 129, 0)",
                      "0 0 0 0 rgba(16, 185, 129, 0)"
                    ]
                  }}
                  transition={{ 
                    boxShadow: { duration: 2, repeat: Infinity },
                    scale: { duration: 0.2 }
                  }}
                />

                <div className="md:ml-20">
                  <motion.div
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      rotateY: 2 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="relative bg-gray-900/50 border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm group overflow-hidden">
                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      
                      {/* Animated corner accents */}
                      <motion.div
                        className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: -45 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: 45 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />

                      <CardHeader className="space-y-4 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="space-y-2">
                            <motion.div
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CardTitle className="text-2xl text-white group-hover:text-emerald-400 transition-colors">
                                {exp.position}
                              </CardTitle>
                            </motion.div>
                            <motion.div 
                              className="flex items-center gap-3 text-emerald-400 font-semibold"
                              whileHover={{ scale: 1.05 }}
                            >
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                <Briefcase className="w-5 h-5" />
                              </motion.div>
                              <span>{exp.company}</span>
                            </motion.div>
                          </div>

                          <div className="flex flex-col md:items-end gap-2">
                            <motion.div 
                              className="flex items-center gap-2 text-gray-400"
                              whileHover={{ scale: 1.05, color: "#ffffff" }}
                            >
                              <Calendar className="w-4 h-4" />
                              <span className="font-medium">{exp.duration}</span>
                            </motion.div>
                            <motion.div 
                              className="flex items-center gap-2 text-gray-400"
                              whileHover={{ scale: 1.05, color: "#ffffff" }}
                            >
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </motion.div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6 relative z-10">
                        <motion.p 
                          className="text-gray-300 leading-relaxed"
                          whileHover={{ color: "#ffffff" }}
                          transition={{ duration: 0.2 }}
                        >
                          {exp.description}
                        </motion.p>

                        {/* Key Achievements with enhanced animations */}
                        {exp.achievements && (
                          <div className="space-y-3">
                            <h4 className="text-white font-semibold flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              >
                                <Award className="w-4 h-4 text-yellow-400" />
                              </motion.div>
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  whileHover={{ x: 5, scale: 1.02 }}
                                  transition={{ duration: 0.5, delay: i * 0.1 }}
                                  viewport={{ once: true }}
                                  className="flex items-start gap-3 text-gray-300 group/item cursor-pointer"
                                  onClick={() => soundManager.playClick()}
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.3, rotate: 360 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5 group-hover/item:fill-current" />
                                  </motion.div>
                                  <span className="group-hover/item:text-white transition-colors">{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technologies with stagger animation */}
                        {exp.technologies && (
                          <div className="space-y-3">
                            <h4 className="text-white font-semibold flex items-center gap-2">
                              <motion.div
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Zap className="w-4 h-4 text-blue-400" />
                              </motion.div>
                              Technologies Used
                            </h4>
                            <motion.div 
                              className="flex flex-wrap gap-2"
                              variants={{
                                visible: {
                                  transition: {
                                    staggerChildren: 0.05
                                  }
                                }
                              }}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                            >
                              {exp.technologies.map((tech, i) => (
                                <motion.div
                                  key={tech}
                                  variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    visible: { opacity: 1, scale: 1 }
                                  }}
                                  whileHover={{ 
                                    scale: 1.1, 
                                    y: -2,
                                    boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)"
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => soundManager.playClick()}
                                >
                                  <Badge
                                    variant="outline"
                                    className="bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-200 cursor-pointer"
                                  >
                                    {tech}
                                  </Badge>
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        )}

                        {/* Impact Metrics with counter animation */}
                        {exp.metrics && (
                          <div className="space-y-3">
                            <h4 className="text-white font-semibold flex items-center gap-2">
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 180, 360]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                              >
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                              </motion.div>
                              Impact & Results
                            </h4>
                            <motion.div 
                              className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700/50"
                              variants={{
                                visible: {
                                  transition: {
                                    staggerChildren: 0.1
                                  }
                                }
                              }}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                            >
                              {exp.metrics.map((metric, i) => (
                                <motion.div 
                                  key={i} 
                                  className="text-center group/metric"
                                  variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                  }}
                                  whileHover={{ 
                                    scale: 1.05,
                                    y: -5
                                  }}
                                >
                                  <motion.div 
                                    className="text-2xl font-bold text-emerald-400 mb-1"
                                    whileHover={{ scale: 1.1 }}
                                  >
                                    {metric.value}
                                  </motion.div>
                                  <div className="text-sm text-gray-400 group-hover/metric:text-white transition-colors">
                                    {metric.label}
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div 
            className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border border-gray-700/50 rounded-3xl p-12 backdrop-blur-sm relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-purple-500/5"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(139, 92, 246, 0.05))",
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))",
                  "linear-gradient(225deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05))",
                  "linear-gradient(315deg, rgba(16, 185, 129, 0.05), rgba(139, 92, 246, 0.05))"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <motion.h3 
              className="text-3xl font-bold text-white mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Ready for the next challenge?
            </motion.h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm always excited to take on new roles and challenges that allow
              me to grow and make a meaningful impact. Let's discuss
              opportunities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-full px-8 py-3 font-semibold transition-all duration-300 overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => soundManager.playClick()}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <Award className="w-5 h-5 relative z-10" />
                <span className="relative z-10">View Full Resume</span>
              </motion.a>
              <motion.button
                onClick={() => {
                  soundManager.playClick();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-emerald-500/50 rounded-full px-8 py-3 font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Briefcase className="w-5 h-5" />
                Let's Connect
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
