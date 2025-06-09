import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Testimonials from "@/components/sections/Testimonials";
import GitHubContribution from "@/components/sections/GitHubContribution";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import PortfolioScore from "@/components/gamification/PortfolioScore";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Index() {
  useEffect(() => {
    // Force dark mode for the portfolio
    document.documentElement.classList.add("dark");

    // Smooth scrolling enhancement
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Sophisticated background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.08),transparent_50%)]" />
      </div>

      <Header />
      <PortfolioScore />

      <main className="relative z-10">
        <Hero />
        <Experience />
        <TechStack />
        <Projects />
        <GitHubContribution />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
