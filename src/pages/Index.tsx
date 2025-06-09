import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import GitHubContribution from "@/components/sections/GitHubContribution";
import Contact from "@/components/sections/Contact";

export default function Index() {
  useEffect(() => {
    // Force dark mode for the portfolio
    document.documentElement.classList.add("dark");

    // Add custom cyber cursor
    const cursor = document.createElement("div");
    cursor.className =
      "fixed w-4 h-4 border border-neon-cyan/50 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-200";
    cursor.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(cursor);

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const handleMouseDown = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    };

    const handleMouseUp = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-void relative overflow-x-hidden">
      {/* Global background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-void via-deep-space to-cosmic-blue" />

        {/* Neural network overlay */}
        <div className="absolute inset-0 bg-neural-network opacity-20" />

        {/* Cyber grid */}
        <div className="absolute inset-0 bg-cyber-grid bg-[size:100px_100px] opacity-10" />

        {/* Floating energy orbs */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute energy-orb"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: [
                "radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(191,0,255,0.1) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(255,0,128,0.1) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)",
              ][i % 4],
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      <Header />

      <main className="relative z-10">
        <Hero />
        <Projects />
        <TechStack />
        <Experience />
        <Achievements />
        <Testimonials />
        <Blog />
        <GitHubContribution />
        <Contact />
      </main>

      <Footer />

      {/* Global scan line effect */}
      <div className="scan-line" />
    </div>
  );
}
