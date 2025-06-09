import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import { personalInfo } from "@/lib/data";

export default function About() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Sophisticated background effects matching landing page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.08),transparent_50%)]" />
      </div>

      <Header />

      <main className="pt-20 lg:pt-24 relative z-10">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="heading-2 gradient-text-coral mb-6">
                    About Me
                  </h1>
                  <p className="body-regular text-white/70 leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="heading-3 gradient-text-emerald">
                    My Journey
                  </h2>
                  <div className="space-y-4 text-white/70">
                    <p>
                      I graduated with a First Class Honours degree in Computer
                      Science from the University of London, where I specialized
                      in artificial intelligence and machine learning. My
                      passion for technology started early, and I've been coding
                      for over 5 years, constantly evolving and learning new
                      technologies.
                    </p>
                    <p>
                      Throughout my academic and professional journey, I've
                      worked on diverse projects ranging from AI-powered
                      applications to immersive 3D web experiences. I believe in
                      the power of technology to solve real-world problems and
                      create meaningful user experiences.
                    </p>
                    <p>
                      When I'm not coding, you can find me contributing to
                      open-source projects, writing technical articles, or
                      exploring the latest developments in AI and web
                      technologies. I'm always eager to collaborate on
                      innovative projects and share knowledge with the tech
                      community.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white text-xl font-semibold">
                    What Drives Me
                  </h3>
                  <blockquote className="text-coral text-lg italic border-l-4 border-coral pl-4">
                    "{personalInfo.quote}"
                  </blockquote>
                </div>
              </motion.div>

              {/* Image/Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square glass-card p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-coral to-emerald rounded-full flex items-center justify-center mx-auto">
                      <span className="text-4xl font-bold text-white">AJ</span>
                    </div>
                    <div className="text-white">
                      <h3 className="text-2xl font-bold">
                        {personalInfo.name}
                      </h3>
                      <p className="text-white/80">{personalInfo.title}</p>
                      <p className="text-white/60 text-sm mt-2">
                        {personalInfo.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-lavender/20 rounded-lg animate-float-gentle" />
                <div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald/20 rounded-lg animate-float-gentle"
                  style={{ animationDelay: "1s" }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Overview */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-2 gradient-text-coral mb-4">
                Core Competencies
              </h2>
              <p className="body-regular text-white/70 max-w-2xl mx-auto">
                A breakdown of my key skills and areas of expertise
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Frontend Development",
                  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
                  icon: "🎨",
                  color: "from-coral to-coral-light",
                },
                {
                  title: "Backend Development",
                  skills: ["Node.js", "Python", "PostgreSQL", "GraphQL"],
                  icon: "⚙️",
                  color: "from-emerald to-emerald-light",
                },
                {
                  title: "AI & Machine Learning",
                  skills: ["TensorFlow", "PyTorch", "OpenAI API", "LangChain"],
                  icon: "🧠",
                  color: "from-lavender to-lavender-light",
                },
                {
                  title: "3D & Creative Tech",
                  skills: [
                    "Three.js",
                    "React Three Fiber",
                    "WebGL",
                    "Framer Motion",
                  ],
                  icon: "🎯",
                  color: "from-amber to-amber-light",
                },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="glass-card p-6 hover:shadow-glass-lg h-full">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-2xl">{category.icon}</span>
                    </div>

                    <h3 className="text-white font-semibold text-lg mb-4">
                      {category.title}
                    </h3>

                    <ul className="space-y-2">
                      {category.skills.map((skill) => (
                        <li
                          key={skill}
                          className="text-white/70 text-sm flex items-center"
                        >
                          <span className="w-1.5 h-1.5 bg-coral rounded-full mr-2" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <Experience />

        {/* Achievements Section */}
        <Achievements />

        {/* Personal Values */}
        <section className="section-padding bg-portfolio-surface">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-2 text-white mb-4">
                My Values & Approach
              </h2>
              <p className="body-large text-white/70 max-w-2xl mx-auto">
                The principles that guide my work and collaboration
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation First",
                  description:
                    "I believe in pushing boundaries and exploring new technologies to create cutting-edge solutions.",
                  icon: "💡",
                },
                {
                  title: "Quality Code",
                  description:
                    "Clean, maintainable, and well-documented code is the foundation of any successful project.",
                  icon: "⚡",
                },
                {
                  title: "Continuous Learning",
                  description:
                    "Technology evolves rapidly, and I'm committed to staying current with the latest developments.",
                  icon: "📚",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-portfolio-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">{value.icon}</span>
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-4">
                    {value.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
