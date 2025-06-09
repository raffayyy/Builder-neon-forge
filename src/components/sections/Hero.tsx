import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Coffee,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { personalInfo } from "@/lib/data";

const typewriterTexts = [
  "AI Engineer",
  "Full Stack Developer",
  "Machine Learning Expert",
  "Digital Innovator",
];

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentText = typewriterTexts[currentTextIndex];

    if (isTyping) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentTextIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative py-20"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 font-medium">
                  Available for hire
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block mb-2">Hello, I'm</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  {personalInfo?.name || "Alex Johnson"}
                </span>
              </h1>

              <div className="h-12 flex items-center justify-center lg:justify-start">
                <span className="text-xl md:text-2xl text-gray-300 font-medium">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1 text-blue-400"
                  >
                    |
                  </motion.span>
                </span>
              </div>

              <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {personalInfo?.bio ||
                  "Passionate developer specializing in AI and modern web development."}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {[
                "React",
                "TypeScript",
                "Next.js",
                "Python",
                "AI/ML",
                "Node.js",
              ].map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-gray-900/50 border-gray-700/50 text-gray-300 hover:bg-gray-800/50 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Sparkles className="w-5 h-5 mr-2" />
                View My Work
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full px-8 py-3 transition-all duration-300"
                onClick={() =>
                  window.open(
                    personalInfo?.resume?.url || "/resume.pdf",
                    "_blank",
                  )
                }
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-6"
            >
              <a
                href={personalInfo?.social?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={personalInfo?.social?.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={`mailto:${personalInfo?.email || "contact@example.com"}`}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </div>

          {/* Profile Card */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gray-900/50 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm shadow-2xl"
              >
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1"
                  >
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-4xl font-bold text-white">
                      AJ
                    </div>
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {personalInfo?.name || "Alex Johnson"}
                    </h3>
                    <p className="text-gray-400">
                      {personalInfo?.title || "AI & Web Developer"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {personalInfo?.location || "San Francisco, CA"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>GMT-8</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Coffee className="w-4 h-4" />
                      <span>Coffee Lover</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span>Available</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 pt-4 border-t border-gray-700/50">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm ml-2">
                      5.0 Rating
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => {
              const element = document.getElementById("skills");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm">Scroll Down</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
