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
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-bg">
      <Header />
      <main className="pt-16 lg:pt-20">
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
    </div>
  );
}
