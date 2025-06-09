import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Download,
  Github,
  Linkedin,
  Mail,
  User,
  Briefcase,
  Code,
  Award,
  MessageCircle,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";

const navigation = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Skills", href: "#skills", icon: Award },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: Code },
  { name: "Contact", href: "#contact", icon: MessageCircle },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navigation.map((item) => item.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("#home")}
            className="flex items-center space-x-3 group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AJ</span>
            </div>
            <span className="text-white font-semibold text-xl hidden sm:block group-hover:text-blue-400 transition-colors">
              Alex Johnson
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(personalInfo.resume, "_blank")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>

            <Button
              size="sm"
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Mail className="w-4 h-4 mr-2" />
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white/70 hover:text-white transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-white/10 mt-4 rounded-lg"
            >
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-blue-500/20 text-blue-400"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </motion.button>
                  );
                })}

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(personalInfo.resume, "_blank")}
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => scrollToSection("#contact")}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Get In Touch
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-6 pt-4">
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
