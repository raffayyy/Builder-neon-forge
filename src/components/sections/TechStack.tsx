import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Database,
  Brain,
  Cloud,
  Server,
  Smartphone,
  Palette,
  Shield,
  Zap,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";

// Modern tech stack data with categories
const techStackData = [
  {
    category: "Frontend Development",
    icon: Code2,
    color: "from-blue-500 to-cyan-400",
    skills: [
      { name: "React", level: 95, experience: "5 years", icon: "⚛️" },
      { name: "Next.js", level: 90, experience: "3 years", icon: "▲" },
      { name: "TypeScript", level: 88, experience: "4 years", icon: "🔷" },
      { name: "Tailwind CSS", level: 92, experience: "3 years", icon: "🎨" },
      { name: "Vue.js", level: 75, experience: "2 years", icon: "💚" },
      { name: "Three.js", level: 70, experience: "2 years", icon: "🎯" },
    ],
  },
  {
    category: "Backend Development",
    icon: Server,
    color: "from-emerald-500 to-teal-400",
    skills: [
      { name: "Node.js", level: 90, experience: "4 years", icon: "🟢" },
      { name: "Python", level: 85, experience: "5 years", icon: "🐍" },
      { name: "Express.js", level: 88, experience: "4 years", icon: "🚂" },
      { name: "FastAPI", level: 80, experience: "2 years", icon: "⚡" },
      { name: "GraphQL", level: 75, experience: "2 years", icon: "📊" },
      { name: "REST APIs", level: 92, experience: "5 years", icon: "🌐" },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: Brain,
    color: "from-purple-500 to-pink-400",
    skills: [
      { name: "TensorFlow", level: 85, experience: "3 years", icon: "🧠" },
      { name: "PyTorch", level: 80, experience: "2 years", icon: "🔥" },
      { name: "Scikit-learn", level: 88, experience: "4 years", icon: "📈" },
      { name: "OpenAI API", level: 90, experience: "2 years", icon: "🤖" },
      { name: "Hugging Face", level: 85, experience: "2 years", icon: "🤗" },
      { name: "LangChain", level: 75, experience: "1 year", icon: "🔗" },
    ],
  },
  {
    category: "Database & Cloud",
    icon: Database,
    color: "from-orange-500 to-red-400",
    skills: [
      { name: "PostgreSQL", level: 88, experience: "4 years", icon: "🐘" },
      { name: "MongoDB", level: 82, experience: "3 years", icon: "🍃" },
      { name: "AWS", level: 85, experience: "3 years", icon: "☁️" },
      { name: "Docker", level: 80, experience: "3 years", icon: "🐳" },
      { name: "Vercel", level: 90, experience: "2 years", icon: "▲" },
      { name: "Firebase", level: 75, experience: "2 years", icon: "🔥" },
    ],
  },
];

const SkillCard = ({ skill, index, categoryColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="bg-gray-900/50 border-gray-700/50 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColor} p-0.5`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center text-xl">
                  {skill.icon}
                </div>
              </motion.div>
              <div>
                <h4 className="text-white font-semibold text-lg">
                  {skill.name}
                </h4>
                <p className="text-gray-400 text-sm">{skill.experience}</p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-gray-800 text-gray-300 border-gray-700"
            >
              {skill.level}%
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Proficiency</span>
              <span className="text-white font-medium">{skill.level}%</span>
            </div>
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${categoryColor} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
              {isHovered && (
                <motion.div
                  className="absolute top-0 left-0 h-full w-full bg-white/20 rounded-full"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
          </div>

          {/* Skill Level Indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(skill.level / 20)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 text-xs ml-auto">
              {skill.level >= 90
                ? "Expert"
                : skill.level >= 80
                  ? "Advanced"
                  : skill.level >= 70
                    ? "Intermediate"
                    : "Beginner"}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CategorySection = ({ category, index }) => {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="space-y-6"
    >
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-8">
        <motion.div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} p-0.5`}
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {category.category}
          </h3>
          <p className="text-gray-400">{category.skills.length} technologies</p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.skills.map((skill, skillIndex) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={skillIndex}
            categoryColor={category.color}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const filteredData =
    selectedCategory === "all"
      ? techStackData
      : techStackData.filter((cat) => cat.category === selectedCategory);

  // Calculate overall stats
  const totalSkills = techStackData.reduce(
    (acc, cat) => acc + cat.skills.length,
    0,
  );
  const avgProficiency = Math.round(
    techStackData.reduce(
      (acc, cat) =>
        acc +
        cat.skills.reduce((skillAcc, skill) => skillAcc + skill.level, 0) /
          cat.skills.length,
      0,
    ) / techStackData.length,
  );

  return (
    <section
      id="skills"
      className="min-h-screen py-20 bg-gray-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6"
          >
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">
              Technical Expertise
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            A comprehensive overview of my technical skills and expertise across
            different domains of software development
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              {
                label: "Technologies",
                value: totalSkills,
                icon: Code2,
                color: "from-blue-500 to-cyan-400",
              },
              {
                label: "Avg Proficiency",
                value: `${avgProficiency}%`,
                icon: TrendingUp,
                color: "from-purple-500 to-pink-400",
              },
              {
                label: "Years Experience",
                value: "5+",
                icon: Award,
                color: "from-emerald-500 to-teal-400",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-0.5 mx-auto mb-4`}
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

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => setSelectedCategory("all")}
              variant={selectedCategory === "all" ? "default" : "outline"}
              className={`rounded-full ${
                selectedCategory === "all"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
              }`}
            >
              All Technologies
            </Button>
            {techStackData.map((category) => (
              <Button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                variant={
                  selectedCategory === category.category ? "default" : "outline"
                }
                className={`rounded-full ${
                  selectedCategory === category.category
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {category.category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20"
        >
          {filteredData.map((category, index) => (
            <CategorySection
              key={category.category}
              category={category}
              index={index}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-gray-700/50 rounded-3xl p-12 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to work together?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and collaborate on
              innovative projects. Let's discuss how my technical expertise can
              help bring your ideas to life.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Zap className="w-5 h-5 mr-2" />
              Let's Connect
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
