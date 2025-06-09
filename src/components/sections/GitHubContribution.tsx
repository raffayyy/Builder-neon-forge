import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  Calendar,
  Code2,
  Activity,
  TrendingUp,
  ExternalLink,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GitHubCalendar from "react-github-calendar";

// Types for GitHub API responses
interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

interface GitHubUser {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

interface LanguageStats {
  [key: string]: number;
}

// GitHub username - replace with actual username
const GITHUB_USERNAME = "alexjohnson"; // Replace with actual GitHub username

export default function GitHubContribution() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<LanguageStats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);

      // Fetch user data
      const userResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}`,
      );
      if (!userResponse.ok) throw new Error("Failed to fetch user data");
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
      );
      if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
      const reposData = await reposResponse.json();
      setRepos(reposData);

      // Calculate language statistics
      const langStats: LanguageStats = {};
      reposData.forEach((repo: GitHubRepo) => {
        if (repo.language) {
          langStats[repo.language] = (langStats[repo.language] || 0) + 1;
        }
      });
      setLanguages(langStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      JavaScript: "from-yellow-500 to-orange-400",
      TypeScript: "from-blue-500 to-blue-600",
      Python: "from-green-500 to-blue-500",
      React: "from-cyan-500 to-blue-500",
      "C++": "from-blue-600 to-purple-600",
      Java: "from-red-500 to-orange-500",
      Go: "from-cyan-400 to-blue-500",
      Rust: "from-orange-600 to-red-600",
      Swift: "from-orange-500 to-red-500",
      PHP: "from-purple-500 to-indigo-500",
    };
    return colors[language] || "from-gray-500 to-gray-600";
  };

  if (loading) {
    return (
      <section
        id="github"
        className="py-20 bg-gray-950 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gray-800/50 rounded-full px-6 py-3">
              <Github className="w-5 h-5 animate-spin" />
              <span className="text-white">Loading GitHub data...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="github"
        className="py-20 bg-gray-950 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-6 py-3">
              <Github className="w-5 h-5 text-red-400" />
              <span className="text-red-400">Failed to load GitHub data</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Get top languages (limited to top 5)
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <section id="github" className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 via-blue-500/5 to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(107,114,128,0.1),transparent_50%)]" />
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
            className="inline-flex items-center gap-2 bg-gray-500/10 border border-gray-500/20 rounded-full px-6 py-2 mb-6"
          >
            <Github className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400 font-medium">Open Source</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            GitHub{" "}
            <span className="bg-gradient-to-r from-gray-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Activity
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My open source contributions, recent commits, and programming
            languages used across projects
          </p>
        </motion.div>

        {/* GitHub Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              label: "Public Repos",
              value: user?.public_repos || 0,
              icon: Code2,
              color: "from-blue-500 to-cyan-400",
            },
            {
              label: "Followers",
              value: user?.followers || 0,
              icon: Users,
              color: "from-emerald-500 to-teal-400",
            },
            {
              label: "Total Stars",
              value: repos.reduce(
                (sum, repo) => sum + repo.stargazers_count,
                0,
              ),
              icon: Star,
              color: "from-yellow-500 to-orange-400",
            },
            {
              label: "Languages",
              value: topLanguages.length,
              icon: Activity,
              color: "from-purple-500 to-pink-400",
            },
          ].map((stat, index) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contribution Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-emerald-400" />
                  Contribution Graph
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="contribution-calendar">
                  <GitHubCalendar
                    username={GITHUB_USERNAME}
                    theme={{
                      light: [
                        "#161b22",
                        "#0e4429",
                        "#006d32",
                        "#26a641",
                        "#39d353",
                      ],
                      dark: [
                        "#161b22",
                        "#0e4429",
                        "#006d32",
                        "#26a641",
                        "#39d353",
                      ],
                    }}
                    colorScheme="dark"
                    fontSize={12}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Top Languages */}
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-purple-400" />
                  Top Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topLanguages.map(([language, count], index) => (
                  <motion.div
                    key={language}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full bg-gradient-to-r ${getLanguageColor(language)}`}
                      />
                      <span className="text-white font-medium">{language}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-gray-800/50 border-gray-600 text-gray-300"
                    >
                      {count} {count === 1 ? "repo" : "repos"}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity & Top Repos */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Languages Breakdown */}
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-purple-400" />
                  Languages Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Total repositories count */}
                <div className="text-center p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl">
                  <div className="text-3xl font-bold text-white mb-2">
                    {repos.length}
                  </div>
                  <div className="text-gray-400">Total Repositories</div>
                </div>

                {/* Language statistics with progress bars */}
                <div className="space-y-4">
                  {topLanguages.map(([language, count], index) => {
                    const percentage = Math.round((count / repos.length) * 100);
                    return (
                      <motion.div
                        key={language}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full bg-gradient-to-r ${getLanguageColor(language)}`}
                            />
                            <span className="text-white font-medium">
                              {language}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-gray-800/50 border-gray-600 text-gray-300"
                            >
                              {count} {count === 1 ? "repo" : "repos"}
                            </Badge>
                            <span className="text-sm text-gray-400 font-mono">
                              {percentage}%
                            </span>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${getLanguageColor(language)} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Language insights */}
                <div className="pt-4 border-t border-gray-700/50 space-y-3">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    Language Insights
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <span className="text-gray-400">Most Used</span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${getLanguageColor(topLanguages[0]?.[0] || "")}`}
                        />
                        <span className="text-white font-medium">
                          {topLanguages[0]?.[0] || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <span className="text-gray-400">Total Languages</span>
                      <span className="text-white font-medium">
                        {Object.keys(languages).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <span className="text-gray-400">Active Projects</span>
                      <span className="text-white font-medium">
                        {
                          repos.filter((repo) => {
                            const updatedDate = new Date(repo.updated_at);
                            const sixMonthsAgo = new Date();
                            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                            return updatedDate > sixMonthsAgo;
                          }).length
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Repositories */}
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                  Top Repositories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {repos.slice(0, 3).map((repo, index) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="block p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:border-gray-600 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold group-hover:text-emerald-400 transition-colors">
                          {repo.name}
                        </h4>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                          {repo.description || "No description available"}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          {repo.language && (
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full bg-gradient-to-r ${getLanguageColor(repo.language)}`}
                              />
                              <span className="text-gray-400 text-sm">
                                {repo.language}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Star className="w-3 h-3" />
                            <span>{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <GitFork className="w-3 h-3" />
                            <span>{repo.forks_count}</span>
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.a>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-500/10 via-blue-500/10 to-purple-500/10 border border-gray-700/50 rounded-3xl p-12 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">
              Explore My Code
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Check out my open source contributions and projects. I'm always
              working on something new and exciting.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white rounded-full px-8 py-3 text-lg font-semibold"
            >
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 mr-2" />
                View GitHub Profile
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
