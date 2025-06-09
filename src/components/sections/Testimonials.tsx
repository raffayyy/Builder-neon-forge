import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gray-900/50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">What People Say</h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/70 max-w-2xl mx-auto">
            Testimonials and recommendations from colleagues, professors, and
            clients I've had the pleasure to work with
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div
            className="relative min-h-[400px]"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Card className="bg-white/5 border-white/10 h-full">
                  <CardContent className="p-8 h-full flex flex-col justify-between">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Quote className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <div className="flex-1 text-center space-y-6">
                      <blockquote className="text-white text-lg md:text-xl leading-relaxed italic">
                        "{testimonials[currentIndex].content}"
                      </blockquote>

                      {/* Rating */}
                      <div className="flex justify-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonials[currentIndex].rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-white/10">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                        />
                        <AvatarFallback className="bg-blue-600 text-white text-lg">
                          {testimonials[currentIndex].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="text-center sm:text-left">
                        <h4 className="text-white font-semibold text-lg">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-blue-400 font-medium">
                          {testimonials[currentIndex].role}
                        </p>
                        <p className="text-white/60 text-sm">
                          {testimonials[currentIndex].company}
                        </p>
                        <p className="text-white/40 text-xs mt-1">
                          {new Date(
                            testimonials[currentIndex].date,
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-blue-500 scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Testimonial Grid for larger screens */}
          <div className="hidden lg:grid grid-cols-4 gap-4 mt-12">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => goToTestimonial(index)}
                className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                  index === currentIndex
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3 mb-3">
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
                  <div>
                    <div className="text-white font-medium text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-white/60 text-xs">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                <p className="text-white/70 text-xs line-clamp-3">
                  {testimonial.content}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
