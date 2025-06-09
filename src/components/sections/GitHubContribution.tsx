import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  Calendar,
  Code2,
  Activity,
  ExternalLink,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GitHubCalendar from "react-github-calendar";

// Types for GitHub data
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

// Dummy data that displays immediately
const dummyUser: GitHubUser = {
  login: "alexjohnson",
  name: "Alex Johnson",
  public_repos: 47,
  followers: 234,
  following: 156,
  avatar_url: "https://github.com/alexjohnson.png",
};

const dummyRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "ai-code-reviewer",
    description:
      "Intelligent code review assistant powered by GPT-4 and machine learning algorithms for automated bug detection and code optimization.",
    stargazers_count: 1247,
    forks_count: 186,
    language: "TypeScript",
    html_url: "https://github.com/alexjohnson/ai-code-reviewer",
    updated_at: "2024-01-18T14:30:00Z",
  },
  {
    id: 2,
    name: "nextjs-portfolio-3d",
    description:
      "Modern 3D portfolio website built with Next.js, Three.js, and Framer Motion featuring interactive animations and dark theme.",
    stargazers_count: 892,
    forks_count: 145,
    language: "TypeScript",
    html_url: "https://github.com/alexjohnson/nextjs-portfolio-3d",
    updated_at: "2024-01-17T09:15:00Z",
  },
  {
    id: 3,
    name: "ml-data-pipeline",
    description:
      "Scalable machine learning data pipeline with Apache Airflow, Docker, and MLflow for model training and deployment automation.",
    stargazers_count: 634,
    forks_count: 98,
    language: "Python",
    html_url: "https://github.com/alexjohnson/ml-data-pipeline",
    updated_at: "2024-01-16T16:45:00Z",
  },
  {
    id: 4,
    name: "react-dashboard-analytics",
    description:
      "Real-time analytics dashboard with React, D3.js, and WebSocket connections for live data visualization and business intelligence.",
    stargazers_count: 567,
    forks_count: 89,
    language: "JavaScript",
    html_url: "https://github.com/alexjohnson/react-dashboard-analytics",
    updated_at: "2024-01-15T11:20:00Z",
  },
  {
    id: 5,
    name: "microservices-k8s-deployment",
    description:
      "Production-ready microservices architecture with Kubernetes, Istio service mesh, and CI/CD pipelines using GitHub Actions.",
    stargazers_count: 423,
    forks_count: 67,
    language: "Go",
    html_url: "https://github.com/alexjohnson/microservices-k8s-deployment",
    updated_at: "2024-01-14T13:30:00Z",
  },
  {
    id: 6,
    name: "blockchain-voting-system",
    description:
      "Secure blockchain-based voting system using Ethereum smart contracts, Web3.js, and IPFS for decentralized governance.",
    stargazers_count: 789,
    forks_count: 124,
    language: "Solidity",
    html_url: "https://github.com/alexjohnson/blockchain-voting-system",
    updated_at: "2024-01-13T10:45:00Z",
  },
];

const dummyLanguageStats: LanguageStats = {
  TypeScript: 15,
  JavaScript: 12,
  Python: 8,
  Go: 6,
  Java: 4,
  Solidity: 2,
  Rust: 1,
};

// GitHub username for the calendar (can be any valid GitHub user)
const GITHUB_USERNAME = "torvalds"; // Using Linus Torvalds as example since he has public contributions

export default function GitHubContribution() {
  const [user] = useState<GitHubUser>(dummyUser);
  const [repos] = useState<GitHubRepo[]>(dummyRepos);
  const [languages] = useState<LanguageStats>(dummyLanguageStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for realistic effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
      Solidity: "from-gray-600 to-gray-700",
      HTML: "from-orange-500 to-red-500",
      CSS: "from-blue-400 to-blue-600",
      Vue: "from-emerald-500 to-green-500",
      Svelte: "from-orange-600 to-red-600",
      Dart: "from-blue-600 to-blue-700",
      Kotlin: "from-purple-600 to-violet-600",
      Ruby: "from-red-600 to-pink-600",
      "C#": "from-purple-500 to-purple-700",
      Shell: "from-gray-600 to-gray-700",
      Dockerfile: "from-blue-700 to-blue-800",
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

  // Get top languages (limited to top 6)
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  // Calculate total stars
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0,
  );

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
              value: user.public_repos,
              icon: Code2,
              color: "from-blue-500 to-cyan-400",
            },
            {
              label: "Total Stars",
              value: totalStars.toLocaleString(),
              icon: Star,
              color: "from-yellow-500 to-orange-400",
            },
            {
              label: "Followers",
              value: user.followers,
              icon: Users,
              color: "from-emerald-500 to-teal-400",
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
                        "#1f2937",
                        "#065f46",
                        "#047857",
                        "#10b981",
                        "#34d399",
                      ],
                      dark: [
                        "#1f2937",
                        "#065f46",
                        "#047857",
                        "#10b981",
                        "#34d399",
                      ],
                    }}
                    colorScheme="dark"
                    fontSize={12}
                    blockMargin={4}
                    blockRadius={3}
                    blockSize={12}
                    showWeekdayLabels={true}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Languages Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
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
                    {repos.length}+
                  </div>
                  <div className="text-gray-400">Active Repositories</div>
                </div>

                {/* Language statistics with progress bars */}
                <div className="space-y-4">
                  {topLanguages.map(([language, count], index) => {
                    const percentage = Math.round(
                      (count / user.public_repos) * 100,
                    );
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
                              {count} repos
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
                    Quick Stats
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
                      <span className="text-gray-400">Recent Updates</span>
                      <span className="text-white font-medium">This Week</span>
                    </div>
                  </div>
                </div>
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
              working on something new and exciting in the world of technology.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white rounded-full px-8 py-3 text-lg font-semibold"
            >
              <a
                href="https://github.com/alexjohnson"
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
