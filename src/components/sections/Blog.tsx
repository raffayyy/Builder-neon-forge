import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Clock, Tag, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data";

export default function Blog() {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const allPosts = blogPosts.slice(0, visiblePosts);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section id="blog" className="section-padding bg-portfolio-surface">
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
            Latest Articles & Insights
          </h2>
          <p className="body-large text-white/70 max-w-2xl mx-auto">
            Sharing knowledge and experiences about technology, AI, and web
            development through writing
          </p>
        </motion.div>

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
              <TrendingUp className="w-5 h-5 mr-2 text-portfolio-primary" />
              Featured Articles
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-portfolio-bg border-white/10 card-hover group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Badge
                        variant="outline"
                        className="border-portfolio-primary/30 text-portfolio-primary bg-portfolio-primary/10"
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

                    <CardTitle className="text-white text-xl group-hover:text-portfolio-primary transition-colors">
                      {post.title}
                    </CardTitle>

                    <div className="flex items-center space-x-4 text-sm text-white/60 mt-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
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
                          className="border-white/20 text-white/60 hover:border-portfolio-primary hover:text-portfolio-primary transition-colors text-xs"
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
                <Card className="bg-portfolio-bg border-white/10 card-hover h-full group">
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
                          className="border-portfolio-primary/30 text-portfolio-primary bg-portfolio-primary/10 text-xs"
                        >
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardTitle className="text-white text-lg leading-snug group-hover:text-portfolio-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>

                    <div className="flex items-center space-x-3 text-xs text-white/60 mt-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime} min</span>
                      </div>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
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
                color: "text-portfolio-primary",
              },
              {
                label: "Total Read Time",
                value: `${blogPosts.reduce((acc, post) => acc + post.readTime, 0)} min`,
                color: "text-portfolio-secondary",
              },
              {
                label: "Featured Posts",
                value: featuredPosts.length,
                color: "text-yellow-400",
              },
              {
                label: "Platforms",
                value: [...new Set(blogPosts.map((post) => post.platform))]
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
                className="text-center p-6 bg-portfolio-bg rounded-lg border border-white/10"
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
      </div>
    </section>
  );
}
