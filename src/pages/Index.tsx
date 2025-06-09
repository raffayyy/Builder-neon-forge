import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Index() {
  useEffect(() => {
    // Force dark mode for the portfolio
    document.documentElement.classList.add("dark");

    // Smooth scrolling enhancement
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Simple background pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Header />

      <main className="relative z-10">
        <Hero />
        <TechStack />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
