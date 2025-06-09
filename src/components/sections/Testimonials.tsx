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
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    soundManager.playClick();
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToTestimonial = (index: number) => {
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
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" }
              }}
            >
              <MessageCircle className="w-5 h-5 text-blue-400" />
            </motion.div>
            <span className="text-blue-400 font-medium">
              Client Testimonials
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            whileHover={{ scale: 1.02 }}
          >
            What People{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Say
            </span>
          </motion.h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/70 max-w-2xl mx-auto">
            Testimonials and recommendations from colleagues, professors, and
            clients I've had the pleasure to work with
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card with enhanced interactions */}
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
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Floating particles around card */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                      style={{
                        left: `${10 + i * 15}%`,
                        top: `${10 + Math.random() * 80}%`,
                      }}
                      animate={{
                        y: [-5, 5],
                        x: [-3, 3],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}

                  <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
                    {/* Enhanced Quote Icon */}
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center relative"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-blue-500/10 rounded-full"
                        />
                        <Quote className="w-8 h-8 text-blue-400 relative z-10" />
                      </motion.div>
                    </div>

                    {/* Testimonial Content with enhanced typography */}
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

                      {/* Enhanced Star Rating */}
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

                    {/* Enhanced Author Info */}
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
                        <p className="text-white/40 text-xs mt-1">
                          {new Date(
                            testimonials[currentIndex].date,
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </p>
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
                        <motion.div
                          animate={likedTestimonials.has(testimonials[currentIndex].id) ? {
                            scale: [1, 1.3, 1],
                            rotate: [0, 360]
                          } : {}}
                          transition={{ duration: 0.6 }}
                        >
                          <Heart 
                            className={`w-5 h-5 ${
                              likedTestimonials.has(testimonials[currentIndex].id) 
                                ? "fill-current" 
                                : ""
                            }`} 
                          />
                        </motion.div>
                      </motion.button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Enhanced Navigation Buttons */}
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
                <motion.div
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.div>
                Previous
              </Button>
            </motion.div>

            {/* Enhanced Pagination Dots */}
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
                >
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-blue-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
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
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
          </div>

          {/* Enhanced Thumbnail Grid */}
          <motion.div 
            className="hidden lg:grid grid-cols-4 gap-4 mt-12"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => goToTestimonial(index)}
                className={`p-4 rounded-lg border transition-all duration-300 text-left overflow-hidden group ${
                  index === currentIndex
                    ? "border-blue-500 bg-blue-500/10 scale-105"
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30"
                }`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  scale: index === currentIndex ? 1.05 : 1.02, 
                  y: -2 
                }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => soundManager.playHover()}
              >
                {/* Glow effect for active thumbnail */}
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg"
                    animate={{
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div className="flex items-center space-x-3 mb-3 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-blue-600 text-white text-sm">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <motion.h5 
                      className="font-semibold text-white text-sm truncate group-hover:text-blue-400 transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      {testimonial.name}
                    </motion.h5>
                    <p className="text-white/60 text-xs truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <motion.p 
                  className="text-white/70 text-xs line-clamp-2 group-hover:text-white transition-colors"
                  whileHover={{ x: 2 }}
                >
                  "{testimonial.content.substring(0, 80)}..."
                </motion.p>
              </motion.button>
            ))}
          </motion.div>

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
      </div>
    </section>
  );
}
