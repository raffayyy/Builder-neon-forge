import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/lib/data";
import soundManager from "@/lib/soundManager";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [likedTestimonials, setLikedTestimonials] = useState(new Set());

  useEffect(() => {
    if (!isAutoPlaying || !testimonials.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    if (!testimonials.length) return;
    soundManager.playClick();
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (!testimonials.length) return;
    soundManager.playClick();
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToTestimonial = (index: number) => {
    if (!testimonials.length) return;
    soundManager.playClick();
    setCurrentIndex(index);
  };

  const toggleLike = (testimonialId: string) => {
    soundManager.playClick();
    setLikedTestimonials(prev => {
      const newSet = new Set(prev);
      if (newSet.has(testimonialId)) {
        newSet.delete(testimonialId);
      } else {
        newSet.add(testimonialId);
      }
      return newSet;
    });
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gray-900/50 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.1),transparent_50%)]" />
        
        {/* Floating quote symbols */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-500/10 text-4xl font-serif"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [-10, 10],
              rotate: [-5, 5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            "
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
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
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6"
          >
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">Client Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
          >
            What Clients Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Real feedback from amazing clients who trusted me with their projects
          </motion.p>
        </motion.div>

        {/* Empty State */}
        {!testimonials || testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <Quote className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-400 mb-4">No testimonials yet</h3>
            <p className="text-gray-500">Client testimonials will appear here once they're added.</p>
          </motion.div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            {/* Main Testimonial Card */}
            <motion.div
              className="relative min-h-[400px]"
              onMouseEnter={() => {
                setIsAutoPlaying(false);
                soundManager.playHover();
              }}
              onMouseLeave={() => setIsAutoPlaying(true)}
              whileHover={{ scale: 1.02 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100, rotateY: 10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, rotateY: -10 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Card className="relative bg-white/5 border-white/10 h-full overflow-hidden group">
                    <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
                      {/* Quote Icon */}
                      <div className="flex justify-center mb-6">
                        <motion.div 
                          className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center relative"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Quote className="w-8 h-8 text-blue-400 relative z-10" />
                        </motion.div>
                      </div>

                      {/* Testimonial Content */}
                      <div className="flex-1 text-center space-y-6">
                        <motion.blockquote 
                          className="text-white text-lg md:text-xl leading-relaxed italic relative"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          >
                            "{testimonials[currentIndex].content}"
                          </motion.span>
                        </motion.blockquote>

                        {/* Star Rating */}
                        <motion.div 
                          className="flex justify-center space-x-1"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.1
                              }
                            }
                          }}
                          initial="hidden"
                          animate="visible"
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.div
                              key={star}
                              variants={{
                                hidden: { opacity: 0, scale: 0 },
                                visible: { opacity: 1, scale: 1 }
                              }}
                              whileHover={{ 
                                scale: 1.3, 
                                rotate: 360,
                                y: -2
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= testimonials[currentIndex].rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>

                      {/* Author Info */}
                      <motion.div 
                        className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Avatar className="w-16 h-16 border-2 border-blue-400/30">
                            <AvatarImage
                              src={testimonials[currentIndex].image}
                              alt={testimonials[currentIndex].name}
                            />
                            <AvatarFallback className="bg-blue-600 text-white">
                              {testimonials[currentIndex].name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>

                        <div className="text-center sm:text-left flex-1">
                          <motion.h4 
                            className="text-white font-semibold text-lg"
                            whileHover={{ scale: 1.05, color: "#60a5fa" }}
                          >
                            {testimonials[currentIndex].name}
                          </motion.h4>
                          <motion.p 
                            className="text-blue-400 font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            {testimonials[currentIndex].role}
                          </motion.p>
                          <motion.p 
                            className="text-white/60 text-sm"
                            whileHover={{ color: "#ffffff" }}
                          >
                            {testimonials[currentIndex].company}
                          </motion.p>
                        </div>

                        {/* Like Button */}
                        <motion.button
                          onClick={() => toggleLike(testimonials[currentIndex].id)}
                          className={`p-2 rounded-full transition-colors ${
                            likedTestimonials.has(testimonials[currentIndex].id)
                              ? "bg-red-500/20 text-red-400"
                              : "bg-gray-700/50 text-gray-400 hover:text-red-400"
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <Heart 
                            className={`w-5 h-5 ${
                              likedTestimonials.has(testimonials[currentIndex].id) 
                                ? "fill-current" 
                                : ""
                            }`} 
                          />
                        </motion.button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={prevTestimonial}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-blue-500/50 rounded-full px-6"
                  onMouseEnter={() => soundManager.playHover()}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>
              </motion.div>

              {/* Pagination Dots */}
              <div className="flex space-x-3">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-blue-500 scale-125"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                    onMouseEnter={() => soundManager.playHover()}
                  />
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={nextTestimonial}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-blue-500/50 rounded-full px-6"
                  onMouseEnter={() => soundManager.playHover()}
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Auto-play indicator */}
            <motion.div 
              className="flex items-center justify-center mt-8 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-gray-400'}`}
                animate={isAutoPlaying ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-xs text-gray-400">
                {isAutoPlaying ? 'Auto-playing' : 'Paused'}
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
