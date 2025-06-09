import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TechGlobe from "@/components/3d/TechGlobe";
import { skills } from "@/lib/data";

const iconMap: Record<string, string> = {
  react: "⚛️",
  typescript: "🔷",
  nextjs: "▲",
  vue: "💚",
  threejs: "🎯",
  tailwind: "🎨",
  nodejs: "🟢",
  python: "🐍",
  express: "🚂",
  graphql: "📊",
  postgresql: "🐘",
  mongodb: "🍃",
  tensorflow: "🧠",
  pytorch: "🔥",
  sklearn: "📈",
  openai: "🤖",
  huggingface: "🤗",
  langchain: "🔗",
  aws: "☁️",
  docker: "🐳",
  kubernetes: "⚓",
  vercel: "▲",
  github: "🐙",
  terraform: "🏗️",
};

export default function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 text-white mb-4">Technical Expertise</h2>
          <p className="body-large text-white/70 max-w-2xl mx-auto">
            A comprehensive view of my technical skills and proficiency across
            various technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Tech Globe */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <TechGlobe />
              <div className="absolute inset-0 bg-gradient-to-t from-portfolio-bg via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Skills Categories */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 order-1 lg:order-2"
          >
            {skills.map((category, categoryIndex) => (
              <motion.div key={category.category} variants={itemVariants}>
                <Card className="bg-portfolio-surface border-white/10 card-hover">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center">
                      <span className="w-2 h-2 bg-portfolio-primary rounded-full mr-3" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.items.map((skill, skillIndex) => (
                      <TooltipProvider key={skill.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">
                                    {iconMap[skill.icon] || "⚡"}
                                  </span>
                                  <span className="text-white font-medium">
                                    {skill.name}
                                  </span>
                                </div>
                                <span className="text-white/70 text-sm">
                                  {skill.level}%
                                </span>
                              </div>
                              <Progress
                                value={skill.level}
                                className="h-2 bg-white/10"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Proficiency: {skill.level}%</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Programming Languages", value: "8+" },
              { label: "Frameworks & Libraries", value: "15+" },
              { label: "Years of Experience", value: "3+" },
              { label: "Projects Completed", value: "25+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-portfolio-surface rounded-lg border border-white/10"
              >
                <div className="text-3xl font-bold text-portfolio-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
