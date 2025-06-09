import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
// import TechStack from "@/components/sections/TechStack";
// import Experience from "@/components/sections/Experience";
// import Achievements from "@/components/sections/Achievements";
// import Testimonials from "@/components/sections/Testimonials";
// import Blog from "@/components/sections/Blog";
// import GitHubContribution from "@/components/sections/GitHubContribution";
// import Contact from "@/components/sections/Contact";

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
      {/* Global background with improved gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-3xl animate-float opacity-60" />
        <div
          className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-electric-violet/10 rounded-full blur-3xl animate-float opacity-40"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-gradient-teal/10 rounded-full blur-3xl animate-float opacity-50"
          style={{ animationDelay: "6s" }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <Header />

      <main className="relative z-10">
        <Hero />
        <Projects />
        {/* 
        <TechStack />
        <Experience />
        <Achievements />
        <Testimonials />
        <Blog />
        <GitHubContribution />
        <Contact />
        */}
      </main>

      <Footer />

      {/* Floating action button for quick contact */}
      <div className="fixed bottom-8 right-8 z-40">
        <a
          href="mailto:alex.johnson@email.com"
          className="w-14 h-14 glass-card flex items-center justify-center text-white hover:text-electric-blue transition-all duration-300 micro-scale"
        >
          <svg
            className="w-6 h-6"
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
        </a>
      </div>
    </div>
  );
}
