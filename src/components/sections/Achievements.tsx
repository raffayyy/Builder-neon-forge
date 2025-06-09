import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  Star,
  Medal,
  Crown,
  Zap,
  Calendar,
  ExternalLink,
  Sparkles,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { achievements } from "@/lib/data";
import soundManager from "@/lib/soundManager";

const AchievementCard = ({ achievement, index }) => {
  const getIcon = (category) => {
    const icons = {
      certification: Medal,
      award: Trophy,
      recognition: Crown,
      achievement: Star,
    };
    return icons[category] || Award;
  };

  const Icon = getIcon(achievement.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -10,
        scale: 1.03,
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        hover: { duration: 0.3 },
      }}
      viewport={{ once: true }}
      className="group h-full"
      onMouseEnter={() => soundManager.playHover()}
    >
      <Card className="relative bg-gray-900/50 border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm h-full overflow-hidden">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-red-500/10 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.5 }}
        />

        {/* Sparkle effects */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        <CardHeader className="space-y-4 relative z-10">
          <div className="flex items-start justify-between">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-3 shadow-lg group-hover:shadow-xl"
              whileHover={{
                scale: 1.1,
                rotate: 360,
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
              }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-full h-full text-white" />
              </motion.div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Badge
                variant="outline"
                className={`${
                  achievement.category === "certification"
                    ? "border-blue-500/50 text-blue-400"
                    : achievement.category === "award"
                    ? "border-yellow-500/50 text-yellow-400"
                    : achievement.category === "recognition"
                    ? "border-purple-500/50 text-purple-400"
                    : "border-emerald-500/50 text-emerald-400"
                } bg-transparent group-hover:scale-110 transition-transform`}
              >
                {achievement.category}
              </Badge>
            </motion.div>
          </div>

          <motion.div
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <CardTitle className="text-xl text-white group-hover:text-yellow-400 transition-colors">
              {achievement.title}
            </CardTitle>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 text-gray-400"
            whileHover={{ scale: 1.05, color: "#ffffff" }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Calendar className="w-4 h-4" />
            </motion.div>
            <span className="text-sm">{achievement.date}</span>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          <motion.p
            className="text-gray-300 leading-relaxed"
            whileHover={{ color: "#ffffff" }}
            transition={{ duration: 0.2 }}
          >
            {achievement.description}
          </motion.p>

          <motion.div
            className="flex items-center gap-2 text-yellow-400 font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Trophy className="w-4 h-4" />
            </motion.div>
            <span className="text-sm">{achievement.issuer}</span>
            {achievement.credentialUrl && (
              <motion.a
                href={achievement.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors ml-auto"
                whileHover={{ scale: 1.2, rotate: 45 }}
                onClick={() => soundManager.playClick()}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </motion.div>

          {achievement.skills && (
            <div className="space-y-2">
              <h5 className="text-white font-medium text-sm flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Target className="w-3 h-3 text-emerald-400" />
                </motion.div>
                Related Skills
              </h5>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {achievement.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      boxShadow: "0 5px 15px rgba(16, 185, 129, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-gray-800/50 text-gray-300 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-200 cursor-pointer"
                      onClick={() => soundManager.playClick()}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Verification status with animation */}
          {achievement.verified && (
            <motion.div
              className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(16, 185, 129, 0.15)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity },
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <span className="text-sm font-medium">Verified Achievement</span>
            </motion.div>
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
      },
    },
  };

  const achievementStats = [
    {
      label: "Certifications",
      value: "12+",
      icon: Medal,
      color: "from-blue-500 to-cyan-400",
    },
    {
      label: "Awards Won",
      value: "8",
      icon: Trophy,
      color: "from-yellow-500 to-orange-400",
    },
    {
      label: "Recognition",
      value: "15+",
      icon: Crown,
      color: "from-purple-500 to-pink-400",
    },
    {
      label: "Years Active",
      value: "5+",
      icon: Calendar,
      color: "from-emerald-500 to-green-400",
    },
  ];

  return (
    <section
      id="achievements"
      className="py-20 bg-gray-950 relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_70%)]" />

        {/* Floating trophy icons */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-500/10 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              rotate: [-10, 10],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            🏆
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
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
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity },
              }}
            >
              <Trophy className="w-5 h-5 text-yellow-400" />
            </motion.div>
            <span className="text-yellow-400 font-medium">
              Achievements & Recognition
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Awards &{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </motion.h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Recognition for excellence in technology, innovation, and
            professional development throughout my career journey
          </p>
        </motion.div>

        {/* Enhanced Stats */}
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
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-yellow-500/30 transition-all duration-300 group"
              onMouseEnter={() => soundManager.playHover()}
            >
              <motion.div
                className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-0.5`}
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                  boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)",
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </div>
              </motion.div>
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Achievements Grid */}
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

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-gray-700/50 rounded-3xl p-12 backdrop-blur-sm relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-red-500/5"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(245, 158, 11, 0.05), rgba(239, 68, 68, 0.05))",
                  "linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(245, 158, 11, 0.05))",
                  "linear-gradient(225deg, rgba(245, 158, 11, 0.05), rgba(239, 68, 68, 0.05))",
                  "linear-gradient(315deg, rgba(239, 68, 68, 0.05), rgba(245, 158, 11, 0.05))",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            <motion.h3
              className="text-3xl font-bold text-white mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Continuous Learning & Growth
            </motion.h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm always seeking new challenges and opportunities to expand my
              expertise. Let's discuss how we can create something amazing
              together.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-full px-8 py-3 text-lg font-semibold overflow-hidden group"
                onClick={() => {
                  soundManager.playClick();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <Zap className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Let's Collaborate</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
