import { motion } from "framer-motion";
import {
  ExternalLink,
  Award,
  GraduationCap,
  Trophy,
  Users,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { achievements } from "@/lib/data";

const getAchievementIcon = (type: string) => {
  switch (type) {
    case "certification":
      return <Award className="w-8 h-8 text-portfolio-primary" />;
    case "degree":
      return <GraduationCap className="w-8 h-8 text-portfolio-secondary" />;
    case "achievement":
      return <Trophy className="w-8 h-8 text-yellow-500" />;
    case "leadership":
      return <Users className="w-8 h-8 text-green-500" />;
    default:
      return <Award className="w-8 h-8 text-portfolio-primary" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "certification":
      return "border-portfolio-primary/30 text-portfolio-primary bg-portfolio-primary/10";
    case "degree":
      return "border-portfolio-secondary/30 text-portfolio-secondary bg-portfolio-secondary/10";
    case "achievement":
      return "border-yellow-500/30 text-yellow-400 bg-yellow-500/10";
    case "leadership":
      return "border-green-500/30 text-green-400 bg-green-500/10";
    default:
      return "border-portfolio-primary/30 text-portfolio-primary bg-portfolio-primary/10";
  }
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
    <section id="achievements" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 text-white mb-4">
            Achievements & Recognition
          </h2>
          <p className="body-large text-white/70 max-w-2xl mx-auto">
            A collection of certifications, achievements, and recognition that
            showcase my commitment to continuous learning and excellence
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-portfolio-surface border-white/10 card-hover h-full group">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-portfolio-bg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {getAchievementIcon(achievement.type)}
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <CardTitle className="text-white text-lg text-center">
                      {achievement.title}
                    </CardTitle>
                    {achievement.verified && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified credential</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Badge
                      variant="outline"
                      className={`${getTypeColor(achievement.type)} capitalize`}
                    >
                      {achievement.type}
                    </Badge>

                    <p className="text-white/70 text-sm">
                      {achievement.issuer}
                    </p>

                    {achievement.date && (
                      <p className="text-white/50 text-xs">
                        {new Date(achievement.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Achievement Details */}
                  <div className="space-y-2">
                    {achievement.description && (
                      <p className="text-white/70 text-sm">
                        {achievement.description}
                      </p>
                    )}

                    {achievement.grade && (
                      <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <span className="text-white/60 text-sm">Grade:</span>
                        <span className="text-white font-medium">
                          {achievement.grade}
                        </span>
                      </div>
                    )}

                    {achievement.rank && (
                      <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <span className="text-white/60 text-sm">Rank:</span>
                        <span className="text-white font-medium">
                          {achievement.rank}
                        </span>
                      </div>
                    )}

                    {achievement.rating && (
                      <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <span className="text-white/60 text-sm">Rating:</span>
                        <span className="text-white font-medium">
                          {achievement.rating}
                        </span>
                      </div>
                    )}

                    {achievement.organization && (
                      <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <span className="text-white/60 text-sm">
                          Organization:
                        </span>
                        <span className="text-white font-medium text-sm">
                          {achievement.organization}
                        </span>
                      </div>
                    )}

                    {achievement.duration && (
                      <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <span className="text-white/60 text-sm">Duration:</span>
                        <span className="text-white font-medium text-sm">
                          {achievement.duration}
                        </span>
                      </div>
                    )}

                    {achievement.credentialId && (
                      <div className="p-2 bg-white/5 rounded">
                        <div className="text-white/60 text-xs mb-1">
                          Credential ID:
                        </div>
                        <div className="text-white font-mono text-xs break-all">
                          {achievement.credentialId}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Credential
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "Certifications",
                value: achievements.filter((a) => a.type === "certification")
                  .length,
                color: "text-portfolio-primary",
              },
              {
                label: "Degrees",
                value: achievements.filter((a) => a.type === "degree").length,
                color: "text-portfolio-secondary",
              },
              {
                label: "Achievements",
                value: achievements.filter((a) => a.type === "achievement")
                  .length,
                color: "text-yellow-400",
              },
              {
                label: "Leadership Roles",
                value: achievements.filter((a) => a.type === "leadership")
                  .length,
                color: "text-green-400",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-portfolio-surface rounded-lg border border-white/10"
              >
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
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
