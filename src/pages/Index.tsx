import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";

export default function Index() {
  useEffect(() => {
    // Force dark mode for the portfolio
    document.documentElement.classList.add("dark");

    // Initialize scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale",
    );

    animatedElements.forEach((el) => observer.observe(el));

    // Smooth scrolling enhancement
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-deep-navy relative overflow-x-hidden">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-hero-gradient" />

        {/* Morphing gradient orbs with better colors */}
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-r from-coral/15 to-coral-light/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-r from-emerald/15 to-emerald-light/10 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-gradient-to-r from-lavender/15 to-lavender-light/10 rounded-full blur-3xl"
          animate={{
            x: [0, 200, 0],
            y: [0, -75, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
        />

        {/* Subtle animated grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 107, 107, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(78, 205, 196, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <Header />

      <main className="relative z-10">
        <Hero />
        <Projects />
      </main>

      {/* Simple Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-deep-navy/50 backdrop-blur-xl">
        <div className="container-custom py-12">
          <div className="text-center">
            <p className="text-light-slate text-sm">
              © 2024 Alex Johnson. Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced floating action button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 2, type: "spring", stiffness: 200 }}
      >
        <motion.a
          href="mailto:alex.johnson@email.com"
          className="w-16 h-16 btn-coral rounded-full flex items-center justify-center text-white shadow-glow-coral"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(255, 107, 107, 0.4)",
              "0 0 30px rgba(255, 107, 107, 0.6)",
              "0 0 20px rgba(255, 107, 107, 0.4)",
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity },
            hover: { duration: 0.2 },
          }}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </motion.a>
      </motion.div>
    </div>
  );
}
