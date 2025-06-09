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
  User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogPosts } from "@/lib/data";
import { newsService, type NewsArticle } from "@/lib/news-service";
import ArticleReader from "./ArticleReader";

export default function Blog() {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [activeTab, setActiveTab] = useState("my-articles");
  const [techNews, setTechNews] = useState<NewsArticle[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<{ type: 'blog' | 'news', id?: number, article?: NewsArticle } | null>(null);
  
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
        article =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.source.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleReadArticle = (type: 'blog' | 'news', blogId?: number, newsArticle?: NewsArticle) => {
    if (type === 'blog' && blogId) {
      setSelectedArticle({ type: 'blog', id: blogId });
    } else if (type === 'news' && newsArticle) {
      setSelectedArticle({ type: 'news', article: newsArticle });
    }
  };

  const handleBackToBlog = () => {
    setSelectedArticle(null);
  };

  // If article is selected, show ArticleReader
  if (selectedArticle) {
    return (
      <ArticleReader
        articleId={selectedArticle.type === 'blog' ? selectedArticle.id : undefined}
        article={selectedArticle.type === 'news' ? selectedArticle.article : undefined}
        onBack={handleBackToBlog}
      />
    );
  }

  return (
    <section id="blog" className="section-padding relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900/50 to-gray-950" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coral/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lavender/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-emerald/10 border border-emerald/20 rounded-full px-6 py-2 mb-6"
          >
            <Edit3 className="w-4 h-4 text-emerald" />
            <span className="text-emerald font-medium">Knowledge Sharing</span>
          </motion.div>
          
          <h2 className="heading-2 gradient-text-coral mb-6">
            Latest Articles & Insights
          </h2>
          <p className="body-regular text-white/70 max-w-2xl mx-auto">
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass-card">
              <TabsTrigger 
                value="my-articles" 
                className="flex items-center space-x-2 text-white/70 data-[state=active]:text-white data-[state=active]:bg-coral/20 data-[state=active]:shadow-glow-coral rounded-xl transition-all duration-300"
              >
                <Edit3 className="w-4 h-4" />
                <span>My Articles</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tech-news" 
                className="flex items-center space-x-2 text-white/70 data-[state=active]:text-white data-[state=active]:bg-emerald/20 data-[state=active]:shadow-glow-emerald rounded-xl transition-all duration-300"
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
                    <TrendingUp className="w-5 h-5 mr-2 text-coral" />
                    Featured Articles
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="glass-card hover:shadow-glass-lg transition-all duration-500 group hover:scale-[1.02]"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <Badge
                              variant="outline"
                              className="border-coral/30 text-coral bg-coral/10 font-medium"
                            >
                              Featured
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-white/20 text-white/70 bg-white/5"
                            >
                              {post.platform}
                            </Badge>
                          </div>

                          <CardTitle className="text-white text-xl group-hover:text-coral transition-colors duration-300">
                            {post.title}
                          </CardTitle>

                          <div className="flex items-center space-x-4 text-sm text-white/60 mt-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-emerald" />
                              <span>{post.readTime} min read</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-lavender" />
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
                                className="border-white/20 text-white/60 hover:border-coral hover:text-coral transition-colors text-xs bg-white/5"
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <Button
                            variant="outline"
                            className="w-full glass-button hover:bg-coral/20 hover:border-coral/50 hover:text-coral transition-all duration-300 mt-4"
                            onClick={() => handleReadArticle('blog', post.id)}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Read Full Article
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
                <h3 className="text-white text-xl font-semibold flex items-center">
                  <Edit3 className="w-5 h-5 mr-2 text-emerald" />
                  All Articles ({blogPosts.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="glass-card hover:shadow-glass-lg transition-all duration-500 h-full group">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-3">
                            <Badge
                              variant="outline"
                              className="border-white/20 text-white/70 text-xs bg-white/5"
                            >
                              {post.platform}
                            </Badge>
                            {post.featured && (
                              <Badge
                                variant="outline"
                                className="border-coral/30 text-coral bg-coral/10 text-xs font-medium"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>

                          <CardTitle className="text-white text-lg leading-snug group-hover:text-emerald transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </CardTitle>

                          <div className="flex items-center space-x-3 text-xs text-white/60 mt-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-emerald" />
                              <span>{post.readTime} min</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-lavender" />
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
                                className="border-white/20 text-white/60 text-xs bg-white/5 hover:border-emerald hover:text-emerald transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge
                                variant="outline"
                                className="border-white/20 text-white/60 text-xs bg-white/5"
                              >
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full glass-button hover:bg-emerald/20 hover:border-emerald/50 hover:text-emerald transition-all duration-300"
                            onClick={() => handleReadArticle('blog', post.id)}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Read Article
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
                      className="glass-button hover:bg-lavender/20 hover:border-lavender/50 hover:text-lavender transition-all duration-300 px-8 py-3"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Load More Articles ({blogPosts.length - visiblePosts} remaining)
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
                      color: "text-coral",
                    },
                    {
                      label: "Total Read Time",
                      value: `${blogPosts.reduce((acc, post) => acc + post.readTime, 0)} min`,
                      color: "text-emerald",
                    },
                    {
                      label: "Featured Posts",
                      value: featuredPosts.length,
                      color: "text-amber",
                    },
                    {
                      label: "Platforms",
                      value: [...new Set(blogPosts.map((post) => post.platform))]
                        .length,
                      color: "text-lavender",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-6 glass-card hover:shadow-glass-lg transition-all duration-300"
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search tech news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass-card border-white/20 text-white placeholder:text-white/50 focus:border-emerald focus:shadow-glow-emerald transition-all duration-300"
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
                    <div className="text-white/70 text-lg">Loading tech news...</div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-white text-xl font-semibold flex items-center">
                        <Newspaper className="w-5 h-5 mr-2 text-emerald" />
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
                        className="glass-button hover:bg-emerald/20 hover:border-emerald/50 hover:text-emerald transition-all duration-300"
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>

                    {filteredNews.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="text-white/50 text-lg mb-2">
                          {searchQuery ? 'No articles found matching your search.' : 'No tech news available.'}
                        </div>
                        {searchQuery && (
                          <Button
                            onClick={() => setSearchQuery("")}
                            variant="outline"
                            size="sm"
                            className="glass-button hover:bg-coral/20 hover:border-coral/50 hover:text-coral transition-all duration-300"
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
                              whileHover={{ y: -5, scale: 1.02 }}
                            >
                              <Card className="glass-card hover:shadow-glass-lg transition-all duration-500 h-full group">
                                {article.urlToImage && (
                                  <div className="aspect-video overflow-hidden rounded-t-2xl">
                                    <img
                                      src={article.urlToImage}
                                      alt={article.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                                <CardHeader>
                                  <div className="flex items-start justify-between mb-3">
                                    <Badge
                                      variant="outline"
                                      className="border-emerald/30 text-emerald bg-emerald/10 text-xs font-medium"
                                    >
                                      {article.source.name}
                                    </Badge>
                                    <div className="flex items-center text-xs text-white/60">
                                      <Calendar className="w-3 h-3 mr-1 text-lavender" />
                                      <span>{formatDate(article.publishedAt)}</span>
                                    </div>
                                  </div>

                                  <CardTitle className="text-white text-lg leading-snug group-hover:text-emerald transition-colors duration-300 line-clamp-2">
                                    {article.title}
                                  </CardTitle>

                                  {article.author && (
                                    <div className="flex items-center text-xs text-white/60 mt-2">
                                      <User className="w-3 h-3 mr-1 text-coral" />
                                      <span>{article.author}</span>
                                    </div>
                                  )}
                                </CardHeader>

                                <CardContent className="space-y-4">
                                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                    {article.description}
                                  </p>

                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex-1 glass-button hover:bg-emerald/20 hover:border-emerald/50 hover:text-emerald transition-all duration-300"
                                      onClick={() => handleReadArticle('news', undefined, article)}
                                    >
                                      Read Preview
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex-1 glass-button hover:bg-coral/20 hover:border-coral/50 hover:text-coral transition-all duration-300"
                                      asChild
                                    >
                                      <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Original
                                      </a>
                                    </Button>
                                  </div>
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
