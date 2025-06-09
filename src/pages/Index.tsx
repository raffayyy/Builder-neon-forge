import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";

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
      </main>
      <Footer />
    </div>
  );
}
