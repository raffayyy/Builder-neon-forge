import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  GitBranch,
  Star,
  Users,
  Calendar,
  Code,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";

// Mock GitHub data - in a real implementation, this would come from GitHub API
const mockGitHubData = {
  totalContributions: 1247,
  currentStreak: 23,
  longestStreak: 67,
  publicRepos: 42,
  followers: 156,
  following: 89,
  totalStars: 342,
  topLanguages: [
    { name: "TypeScript", percentage: 28, color: "#3178c6" },
    { name: "Python", percentage: 24, color: "#3776ab" },
    { name: "JavaScript", percentage: 18, color: "#f7df1e" },
    { name: "React", percentage: 15, color: "#61dafb" },
    { name: "CSS", percentage: 8, color: "#1572b6" },
    { name: "Other", percentage: 7, color: "#6b7280" },
  ],
  recentRepos: [
    {
      name: "ai-code-reviewer",
      description: "AI-powered code review assistant using machine learning",
      language: "Python",
      stars: 89,
      forks: 23,
      updatedAt: "2024-01-15",
    },
    {
      name: "3d-portfolio",
      description: "Interactive 3D portfolio built with React Three Fiber",
      language: "TypeScript",
      stars: 156,
      forks: 34,
      updatedAt: "2024-01-14",
    },
    {
      name: "smart-lms",
      description:
        "Adaptive learning management system with AI recommendations",
      language: "TypeScript",
      stars: 97,
      forks: 18,
      updatedAt: "2024-01-12",
    },
  ],
  contributionCalendar: Array.from({ length: 365 }, (_, i) => ({
    date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000),
    count: Math.floor(Math.random() * 5),
  })),
};

export default function GitHubContribution() {
  const [selectedMonth, setSelectedMonth] = useState(11); // December
  const [hoveredDay, setHoveredDay] = useState<{
    date: Date;
    count: number;
  } | null>(null);

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-800";
    if (count <= 1) return "bg-green-900";
    if (count <= 2) return "bg-green-700";
    if (count <= 3) return "bg-green-500";
    return "bg-green-400";
  };

  const getMonthData = (month: number) => {
    return mockGitHubData.contributionCalendar.filter(
      (day) => day.date.getMonth() === month,
    );
  };

  return (
    <section id="github" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 text-white mb-4">GitHub Activity</h2>
          <p className="body-large text-white/70 max-w-2xl mx-auto">
            A comprehensive view of my coding activity, contributions, and open
            source involvement
          </p>
        </motion.div>

        {/* GitHub Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            {
              icon: Calendar,
              label: "Total Contributions",
              value: mockGitHubData.totalContributions.toLocaleString(),
              color: "text-green-400",
            },
            {
              icon: TrendingUp,
              label: "Current Streak",
              value: `${mockGitHubData.currentStreak} days`,
              color: "text-blue-400",
            },
            {
              icon: Star,
              label: "Total Stars",
              value: mockGitHubData.totalStars.toLocaleString(),
              color: "text-yellow-400",
            },
            {
              icon: GitBranch,
              label: "Public Repos",
              value: mockGitHubData.publicRepos.toString(),
              color: "text-purple-400",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-portfolio-surface border-white/10 text-center">
                <CardContent className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 mb-4`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contribution Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-portfolio-surface border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Github className="w-5 h-5 mr-2" />
                  Contribution Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calendar Grid */}
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-xs text-white/60 text-center p-1"
                        >
                          {day}
                        </div>
                      ),
                    )}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {getMonthData(selectedMonth).map((day, index) => (
                      <motion.div
                        key={index}
                        className={`w-3 h-3 rounded-sm cursor-pointer ${getContributionColor(day.count)}`}
                        whileHover={{ scale: 1.2 }}
                        onHoverStart={() => setHoveredDay(day)}
                        onHoverEnd={() => setHoveredDay(null)}
                      />
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/60">Less</div>
                  <div className="flex items-center space-x-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-white/60">More</div>
                </div>

                {/* Tooltip */}
                {hoveredDay && (
                  <div className="text-xs text-white/70 p-2 bg-white/5 rounded">
                    {hoveredDay.count} contributions on{" "}
                    {hoveredDay.date.toLocaleDateString()}
                  </div>
                )}

                {/* GitHub Profile Link */}
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  asChild
                >
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View GitHub Profile
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Languages & Recent Repos */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Top Languages */}
            <Card className="bg-portfolio-surface border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Most Used Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockGitHubData.topLanguages.map((lang, index) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-white text-sm">{lang.name}</span>
                      </div>
                      <span className="text-white/70 text-sm">
                        {lang.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: lang.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Repositories */}
            <Card className="bg-portfolio-surface border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <GitBranch className="w-5 h-5 mr-2" />
                  Recent Repositories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockGitHubData.recentRepos.map((repo, index) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{repo.name}</h4>
                      <div className="flex items-center space-x-3 text-xs text-white/60">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{repo.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitBranch className="w-3 h-3" />
                          <span>{repo.forks}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-white/70 text-sm mb-3">
                      {repo.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="border-white/20 text-white/70 text-xs"
                      >
                        {repo.language}
                      </Badge>
                      <span className="text-white/60 text-xs">
                        Updated {new Date(repo.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
