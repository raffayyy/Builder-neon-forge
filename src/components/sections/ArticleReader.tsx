import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Share2,
  BookOpen,
  Eye,
  Heart,
  MessageCircle,
  Copy,
  ExternalLink,
  ChevronUp,
  User,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { blogPosts } from "@/lib/data";
import { NewsArticle } from "@/lib/news-service";

interface ArticleReaderProps {
  articleId?: number;
  article?: NewsArticle;
  onBack: () => void;
}

export default function ArticleReader({
  articleId,
  article,
  onBack,
}: ArticleReaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Find the blog post if articleId is provided
  const blogPost = articleId
    ? blogPosts.find((post) => post.id === articleId)
    : null;
  const currentArticle = blogPost || article;

  // Related articles
  const relatedArticles = blogPost
    ? blogPosts
        .filter(
          (post) =>
            post.id !== blogPost.id &&
            post.tags.some((tag) => blogPost.tags.includes(tag)),
        )
        .slice(0, 3)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setIsScrolled(scrollTop > 100);
      setReadingProgress(Math.min(scrollPercent, 100));
      setShowBackToTop(scrollTop > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shareArticle = async () => {
    if (navigator.share && currentArticle) {
      try {
        await navigator.share({
          title: currentArticle.title,
          text: blogPost?.summary || (article as NewsArticle)?.description,
          url: window.location.href,
        });
      } catch (error) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!currentArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Article Not Found
          </h2>
          <Button onClick={onBack} variant="outline" className="glass-button">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-slate-900/50 to-gray-950" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coral/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lavender/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-coral to-emerald"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Floating Header */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 lg:top-24 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="glass-card px-6 py-3 flex items-center space-x-4 max-w-lg">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="text-white font-medium truncate flex-1">
                {currentArticle.title}
              </div>
              <Button
                onClick={shareArticle}
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-emerald"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container-custom py-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Navigation */}
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white/70 hover:text-white mb-8 -ml-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>

            {/* Article Header */}
            <div className="space-y-6 mb-12">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4">
                <Badge
                  variant="outline"
                  className="border-coral/30 text-coral bg-coral/10 font-medium"
                >
                  {blogPost?.platform || (article as NewsArticle)?.source?.name}
                </Badge>

                <div className="flex items-center text-white/60 text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-lavender" />
                  <span>
                    {formatDate(
                      blogPost?.date || (article as NewsArticle)?.publishedAt,
                    )}
                  </span>
                </div>

                {blogPost?.readTime && (
                  <div className="flex items-center text-white/60 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-emerald" />
                    <span>{blogPost.readTime} min read</span>
                  </div>
                )}

                {(article as NewsArticle)?.author && (
                  <div className="flex items-center text-white/60 text-sm">
                    <User className="w-4 h-4 mr-2 text-amber" />
                    <span>{(article as NewsArticle).author}</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="heading-1 text-white leading-tight">
                {currentArticle.title}
              </h1>

              {/* Summary/Description */}
              <p className="body-large text-white/80 leading-relaxed">
                {blogPost?.summary || (article as NewsArticle)?.description}
              </p>

              {/* Tags */}
              {blogPost?.tags && (
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-white/20 text-white/70 bg-white/5 hover:border-emerald hover:text-emerald transition-colors"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-4">
                <Button
                  onClick={shareArticle}
                  variant="outline"
                  className="glass-button hover:bg-emerald/20 hover:border-emerald/50 hover:text-emerald transition-all duration-300"
                >
                  {copiedToClipboard ? (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </>
                  )}
                </Button>

                {(blogPost?.url || (article as NewsArticle)?.url) && (
                  <Button
                    asChild
                    variant="outline"
                    className="glass-button hover:bg-coral/20 hover:border-coral/50 hover:text-coral transition-all duration-300"
                  >
                    <a
                      href={blogPost?.url || (article as NewsArticle)?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Original
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <Separator className="bg-white/10 my-12" />

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              {/* Article Image */}
              {(article as NewsArticle)?.urlToImage && (
                <div className="mb-8 rounded-2xl overflow-hidden">
                  <img
                    src={(article as NewsArticle).urlToImage}
                    alt={currentArticle.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              )}

              {/* Main Content */}
              <div className="glass-card p-8 md:p-12">
                {blogPost?.content ? (
                  <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                ) : (
                  <div className="space-y-6">
                    <p className="text-white/80 leading-relaxed text-lg">
                      {(article as NewsArticle)?.description}
                    </p>
                    <div className="text-center py-8">
                      <p className="text-white/60 mb-4">
                        This is a preview. Read the full article on the original
                        platform.
                      </p>
                      <Button asChild className="btn-coral">
                        <a
                          href={(article as NewsArticle)?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Read Full Article
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-16"
              >
                <h3 className="text-white text-2xl font-bold mb-8 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-emerald" />
                  Related Articles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedPost, index) => (
                    <motion.div
                      key={relatedPost.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="cursor-pointer"
                      onClick={() => {
                        // This would navigate to the related article
                        window.scrollTo(0, 0);
                      }}
                    >
                      <Card className="glass-card hover:shadow-glass-lg transition-all duration-500 h-full group">
                        <CardHeader>
                          <Badge
                            variant="outline"
                            className="border-white/20 text-white/70 text-xs bg-white/5 w-fit"
                          >
                            {relatedPost.platform}
                          </Badge>

                          <CardTitle className="text-white text-lg leading-snug group-hover:text-emerald transition-colors duration-300 line-clamp-2">
                            {relatedPost.title}
                          </CardTitle>

                          <div className="flex items-center text-xs text-white/60">
                            <Clock className="w-3 h-3 mr-1 text-emerald" />
                            <span>{relatedPost.readTime} min read</span>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className="text-white/70 text-sm leading-relaxed line-clamp-3 mb-4">
                            {relatedPost.summary}
                          </p>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald hover:bg-emerald/20 p-0"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 glass-card hover:shadow-glass-lg transition-all duration-300 text-white hover:text-emerald z-40"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
