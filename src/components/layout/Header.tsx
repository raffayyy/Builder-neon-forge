import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

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
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.nav
        className={`relative transition-all duration-500 ease-out pointer-events-auto ${
          isScrolled ? "mx-auto mt-4 max-w-md" : "w-full"
        }`}
        layout
      >
        <motion.div
          className={`transition-all duration-500 ease-out ${
            isScrolled
              ? "bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-full shadow-2xl shadow-black/25"
              : "bg-transparent backdrop-blur-sm"
          }`}
          layout
        >
          <div
            className={`flex items-center transition-all duration-500 ease-out ${
              isScrolled
                ? "justify-center px-6 py-3"
                : "justify-center px-6 py-6 max-w-7xl mx-auto"
            }`}
          >
            <div
              className={`flex items-center gap-1 ${isScrolled ? "gap-1" : "gap-8"}`}
            >
              {navigation.map((item) => {
                const isActive = activeSection === item.href.substring(1);

                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      isActive ? "text-white" : "text-gray-400 hover:text-white"
                    } ${isScrolled ? "text-sm" : "text-base"}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    layout
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-blue-500/20 border border-blue-500/30 rounded-full"
                        layoutId="activeTab"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Text */}
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Floating glow effect when scrolled */}
        {isScrolled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-full blur-xl opacity-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ zIndex: -1 }}
          />
        )}
      </motion.nav>
    </motion.header>
  );
}
