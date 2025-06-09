import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Blog from "@/components/sections/Blog";

export default function BlogPage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-bg">
      <Header />
      <main className="pt-16 lg:pt-20">
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
