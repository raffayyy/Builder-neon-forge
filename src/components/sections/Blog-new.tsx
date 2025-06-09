import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Clock,
  Tag,
  TrendingUp,
  Newspaper,
  Edit3,
  Search,
  Filter,
  Calendar,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogPosts } from "@/lib/data";
import { newsService, type NewsArticle } from "@/lib/news-service";

export default function Blog() {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [activeTab, setActiveTab] = useState("my-articles");
  const [techNews, setTechNews] = useState<NewsArticle[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const allPosts = blogPosts.slice(0, visiblePosts);

  // Fetch tech news when component mounts or tab changes
  useEffect(() => {
    if (activeTab === "tech-news") {
      fetchTechNews();
    }
  }, [activeTab]);

  // Filter news based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNews(techNews);
    } else {
      const filtered = techNews.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          article.source.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredNews(filtered);
    }
  }, [searchQuery, techNews]);

  const fetchTechNews = async () => {
    setIsLoadingNews(true);
    try {
      const response = await newsService.fetchTechNews();
      setTechNews(response.articles);
      setFilteredNews(response.articles);
    } catch (error) {
      console.error("Failed to fetch tech news:", error);
    } finally {
      setIsLoadingNews(false);
    }
  };

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

  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, blogPosts.length));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="blog" className="py-20 lg:py-28 bg-gray-900/50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest Articles & Insights
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Sharing knowledge and experiences about technology, AI, and web
            development through writing
          </p>
        </motion.div>

        {/* Tabbed Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-gray-800/50 border border-white/10">
              <TabsTrigger
                value="my-articles"
                className="flex items-center space-x-2 text-white/70 data-[state=active]:text-white data-[state=active]:bg-blue-600"
              >
                <Edit3 className="w-4 h-4" />
                <span>My Articles</span>
              </TabsTrigger>
              <TabsTrigger
                value="tech-news"
                className="flex items-center space-x-2 text-white/70 data-[state=active]:text-white data-[state=active]:bg-blue-600"
              >
                <Newspaper className="w-4 h-4" />
                <span>Tech News</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-articles" className="mt-8">
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mb-16"
                >
                  <h3 className="text-white text-xl font-semibold mb-8 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                    Featured Articles
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="bg-gray-800/50 border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <Badge
                              variant="outline"
                              className="border-blue-500/30 text-blue-400 bg-blue-500/10"
                            >
                              Featured
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-white/20 text-white/70"
                            >
                              {post.platform}
                            </Badge>
                          </div>

                          <CardTitle className="text-white text-xl group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </CardTitle>

                          <div className="flex items-center space-x-4 text-sm text-white/60 mt-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime} min read</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(post.date)}</span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-white/70 leading-relaxed">
                            {post.summary}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="border-white/20 text-white/60 hover:border-blue-500 hover:text-blue-400 transition-colors text-xs"
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <Button
                            variant="outline"
                            className="w-full border-white/20 text-white hover:bg-white/10 mt-4"
                            asChild
                          >
                            <a
                              href={post.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Read Full Article
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* All Posts Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h3 className="text-white text-xl font-semibold">
                  All Articles ({blogPosts.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-gray-800/50 border-white/10 hover:border-blue-500/50 transition-all duration-300 h-full group">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-3">
                            <Badge
                              variant="outline"
                              className="border-white/20 text-white/70 text-xs"
                            >
                              {post.platform}
                            </Badge>
                            {post.featured && (
                              <Badge
                                variant="outline"
                                className="border-blue-500/30 text-blue-400 bg-blue-500/10 text-xs"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>

                          <CardTitle className="text-white text-lg leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>

                          <div className="flex items-center space-x-3 text-xs text-white/60 mt-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime} min</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(post.date)}</span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                            {post.summary}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="border-white/20 text-white/60 text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge
                                variant="outline"
                                className="border-white/20 text-white/60 text-xs"
                              >
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-white/20 text-white hover:bg-white/10"
                            asChild
                          >
                            <a
                              href={post.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Read Article
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Load More Button */}
                {visiblePosts < blogPosts.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center pt-8"
                  >
                    <Button
                      onClick={loadMorePosts}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 px-8"
                    >
                      Load More Articles ({blogPosts.length - visiblePosts}{" "}
                      remaining)
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {/* Writing Stats */}
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
                      label: "Articles Published",
                      value: blogPosts.length,
                      color: "text-blue-400",
                    },
                    {
                      label: "Total Read Time",
                      value: `${blogPosts.reduce((acc, post) => acc + post.readTime, 0)} min`,
                      color: "text-purple-400",
                    },
                    {
                      label: "Featured Posts",
                      value: featuredPosts.length,
                      color: "text-yellow-400",
                    },
                    {
                      label: "Platforms",
                      value: [
                        ...new Set(blogPosts.map((post) => post.platform)),
                      ].length,
                      color: "text-green-400",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-6 bg-gray-800/50 rounded-lg border border-white/10"
                    >
                      <div
                        className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-white/70 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="tech-news" className="mt-8">
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search tech news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-white/20 text-white placeholder:text-white/50 focus:border-blue-500"
                  />
                </div>
              </motion.div>

              {/* Tech News Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {isLoadingNews ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-white/70 text-lg">
                      Loading tech news...
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-white text-xl font-semibold flex items-center">
                        <Newspaper className="w-5 h-5 mr-2 text-blue-500" />
                        Latest Tech News
                        {searchQuery && (
                          <span className="ml-2 text-sm text-white/60">
                            ({filteredNews.length} results)
                          </span>
                        )}
                      </h3>
                      <Button
                        onClick={fetchTechNews}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>

                    {filteredNews.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="text-white/50 text-lg mb-2">
                          {searchQuery
                            ? "No articles found matching your search."
                            : "No tech news available."}
                        </div>
                        {searchQuery && (
                          <Button
                            onClick={() => setSearchQuery("")}
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            Clear Search
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                          {filteredNews.map((article, index) => (
                            <motion.div
                              key={article.url}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -30 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                              whileHover={{ y: -5 }}
                            >
                              <Card className="bg-gray-800/50 border-white/10 hover:border-blue-500/50 transition-all duration-300 h-full group">
                                {article.urlToImage && (
                                  <div className="aspect-video overflow-hidden rounded-t-lg">
                                    <img
                                      src={article.urlToImage}
                                      alt={article.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      onError={(e) => {
                                        const target =
                                          e.target as HTMLImageElement;
                                        target.style.display = "none";
                                      }}
                                    />
                                  </div>
                                )}
                                <CardHeader>
                                  <div className="flex items-start justify-between mb-3">
                                    <Badge
                                      variant="outline"
                                      className="border-blue-500/30 text-blue-400 bg-blue-500/10 text-xs"
                                    >
                                      {article.source.name}
                                    </Badge>
                                    <div className="flex items-center text-xs text-white/60">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      <span>
                                        {formatDate(article.publishedAt)}
                                      </span>
                                    </div>
                                  </div>

                                  <CardTitle className="text-white text-lg leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {article.title}
                                  </CardTitle>

                                  {article.author && (
                                    <div className="flex items-center text-xs text-white/60 mt-2">
                                      <User className="w-3 h-3 mr-1" />
                                      <span>{article.author}</span>
                                    </div>
                                  )}
                                </CardHeader>

                                <CardContent className="space-y-4">
                                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                    {article.description}
                                  </p>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-white/20 text-white hover:bg-white/10"
                                    asChild
                                  >
                                    <a
                                      href={article.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Read Full Article
                                    </a>
                                  </Button>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
