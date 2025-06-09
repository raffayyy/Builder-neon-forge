import { motion } from "framer-motion";
import {
  Award,
  Trophy,
  Star,
  Calendar,
  ExternalLink,
  Medal,
  Target,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Sample achievements data
const achievements = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    type: "certification",
    description:
      "Professional level certification in cloud architecture and solutions design",
    credentialId: "AWS-CSA-2024-001",
    verifyUrl: "#",
    skills: ["AWS", "Cloud Architecture", "DevOps"],
    color: "from-orange-500 to-red-400",
  },
  {
    id: 2,
    title: "Best Innovation Award",
    issuer: "Tech Innovators Conference 2023",
    date: "2023",
    type: "award",
    description:
      "Recognized for developing an AI-powered code review assistant that improved development efficiency by 40%",
    skills: ["AI/ML", "Innovation", "Full Stack"],
    color: "from-yellow-500 to-orange-400",
  },
  {
    id: 3,
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2023",
    type: "certification",
    description:
      "Expert-level certification in Google Cloud Platform development and deployment",
    credentialId: "GCP-PD-2023-089",
    verifyUrl: "#",
    skills: ["GCP", "Cloud Development", "Kubernetes"],
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 4,
    title: "Published Research Paper",
    issuer: "Journal of AI Applications",
    date: "2023",
    type: "publication",
    description:
      "Co-authored research on improving machine learning model interpretability in production systems",
    skills: ["Machine Learning", "Research", "AI Ethics"],
    color: "from-purple-500 to-pink-400",
  },
  {
    id: 5,
    title: "Open Source Contributor",
    issuer: "GitHub",
    date: "2022-2024",
    type: "recognition",
    description:
      "Top 1% contributor with 200+ pull requests merged across major open source projects",
    skills: ["Open Source", "Community", "Collaboration"],
    color: "from-emerald-500 to-teal-400",
  },
  {
    id: 6,
    title: "Hackathon Winner",
    issuer: "Global AI Hackathon 2022",
    date: "2022",
    type: "competition",
    description:
      "First place winner for developing a real-time sentiment analysis tool for customer feedback",
    skills: ["AI/ML", "Real-time Systems", "MVP Development"],
    color: "from-indigo-500 to-purple-400",
  },
];

const getAchievementIcon = (type: string) => {
  switch (type) {
    case "certification":
      return FileCheck;
    case "award":
      return Trophy;
    case "publication":
      return Star;
    case "competition":
      return Medal;
    case "recognition":
      return Award;
    default:
      return Target;
  }
};

const AchievementCard = ({ achievement, index }) => {
  const Icon = getAchievementIcon(achievement.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Card className="bg-gray-900/50 border-gray-700/50 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm h-full flex flex-col">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${achievement.color} p-0.5`}
            >
              <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center">
                <Icon className="w-7 h-7 text-white" />
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-gray-800/50 border-gray-600 text-gray-300 capitalize"
            >
              {achievement.type}
            </Badge>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
              {achievement.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="font-medium">{achievement.issuer}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{achievement.date}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 flex-1 flex flex-col">
          <p className="text-gray-300 leading-relaxed flex-1">
            {achievement.description}
          </p>

          {/* Skills */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Related Skills</h4>
            <div className="flex flex-wrap gap-2">
              {achievement.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Credential Info */}
          {achievement.credentialId && (
            <div className="space-y-2 pt-4 border-t border-gray-700/50">
              <div className="text-sm">
                <span className="text-gray-400">Credential ID: </span>
                <span className="text-gray-300 font-mono">
                  {achievement.credentialId}
                </span>
              </div>
              {achievement.verifyUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full w-full"
                >
                  <a
                    href={achievement.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Verify Credential
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Achievements() {
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

  // Group achievements by type for stats
  const achievementStats = [
    {
      label: "Certifications",
      value: achievements.filter((a) => a.type === "certification").length,
      icon: FileCheck,
      color: "from-blue-500 to-cyan-400",
    },
    {
      label: "Awards Won",
      value: achievements.filter((a) => a.type === "award").length,
      icon: Trophy,
      color: "from-yellow-500 to-orange-400",
    },
    {
      label: "Publications",
      value: achievements.filter((a) => a.type === "publication").length,
      icon: Star,
      color: "from-purple-500 to-pink-400",
    },
    {
      label: "Competitions",
      value: achievements.filter((a) => a.type === "competition").length,
      icon: Medal,
      color: "from-emerald-500 to-teal-400",
    },
  ];

  return (
    <section
      id="achievements"
      className="py-20 bg-gray-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(245,158,11,0.1),transparent_50%)]" />
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
            className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-2 mb-6"
          >
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium">
              Achievements & Recognition
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Awards &{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Recognition for excellence in technology, innovation, and
            professional development throughout my career journey
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {achievementStats.map((stat, index) => (
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
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-gray-700/50 rounded-3xl p-12 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">
              Continuous Learning & Growth
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I believe in continuous learning and professional development.
              These achievements represent my commitment to excellence and
              staying current with industry best practices.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-full px-8 py-3 font-semibold"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                <Award className="w-5 h-5 mr-2" />
                View Full Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full px-8 py-3 font-semibold"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Let's Connect
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
