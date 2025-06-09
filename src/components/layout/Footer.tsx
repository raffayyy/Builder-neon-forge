import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Heart,
  ArrowUp,
  Code,
  Coffee,
  MapPin,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";

const socialLinks = [
  {
    icon: Github,
    href: personalInfo?.social?.github || "#",
    label: "GitHub",
    color: "hover:text-gray-400",
  },
  {
    icon: Linkedin,
    href: personalInfo?.social?.linkedin || "#",
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    icon: Twitter,
    href: personalInfo?.social?.twitter || "#",
    label: "Twitter",
    color: "hover:text-cyan-400",
  },
  {
    icon: Mail,
    href: `mailto:${personalInfo?.email || "contact@example.com"}`,
    label: "Email",
    color: "hover:text-emerald-400",
  },
];

const quickLinks = [
  { name: "Home", href: "#home", type: "hash" },
  { name: "Skills", href: "#skills", type: "hash" },
  { name: "Experience", href: "#experience", type: "hash" },
  { name: "Projects", href: "/projects", type: "route" },
  { name: "Achievements", href: "#achievements", type: "hash" },
  { name: "Blog", href: "/blog", type: "route" },
  { name: "Resume", href: "/resume", type: "route" },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (item: (typeof quickLinks)[0]) => {
    if (item.type === "hash") {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    } else {
      // Route navigation
      navigate(item.href);
    }
  };

  return (
    <footer className="bg-gray-950 border-t border-gray-800/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">AJ</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl">
                  {personalInfo?.name || "Alex Johnson"}
                </span>
                <p className="text-gray-400 text-sm">
                  {personalInfo?.title || "AI & Web Developer"}
                </p>
              </div>
            </div>

            <blockquote className="text-gray-300 italic leading-relaxed border-l-4 border-blue-500/50 pl-4">
              "
              {personalInfo?.quote ||
                "Code is poetry written in logic, and AI is the future we're building today."}
              "
            </blockquote>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo?.location || "San Francisco, CA"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavigation(link)}
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Services/Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-white font-bold text-lg">Services</h3>
            <div className="space-y-3">
              {[
                "Web Development",
                "AI/ML Solutions",
                "Full Stack Apps",
                "Cloud Architecture",
                "Technical Consulting",
                "Code Reviews",
              ].map((service) => (
                <div
                  key={service}
                  className="text-gray-400 hover:text-white transition-colors duration-200 cursor-default"
                >
                  {service}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-white font-bold text-lg">Connect</h3>

            <div className="space-y-3">
              <p className="text-gray-400">
                Let's build something amazing together
              </p>
              <a
                href={`mailto:${personalInfo?.email || "contact@example.com"}`}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
              >
                {personalInfo?.email || "contact@example.com"}
              </a>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Follow Me</h4>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800/50 border border-gray-700/50 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300 ${color} hover:border-gray-600 hover:scale-110`}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="bg-gray-900/30 border border-gray-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 font-medium text-sm">
                  Available for new projects
                </span>
              </div>
              <p className="text-gray-400 text-xs">
                Currently accepting freelance and full-time opportunities
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between pt-12 mt-12 border-t border-gray-800/50"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>and</span>
              <Coffee className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>React • TypeScript • Tailwind CSS • Framer Motion</span>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()}{" "}
              {personalInfo?.name || "Alex Johnson"}. All rights reserved.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        {/* Floating particles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
}
