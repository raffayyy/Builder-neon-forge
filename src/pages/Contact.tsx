import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";

export default function ContactPage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-bg">
      <Header />
      <main className="pt-16 lg:pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
