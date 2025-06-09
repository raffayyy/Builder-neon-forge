import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";

const socialLinks = [
  { icon: Github, href: personalInfo.social.github, label: "GitHub" },
  { icon: Linkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: personalInfo.social.twitter, label: "Twitter" },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-portfolio-surface border-t border-white/10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Quote */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-portfolio-primary to-portfolio-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AJ</span>
              </div>
              <span className="text-white font-semibold text-xl">
                Alex Johnson
              </span>
            </div>
            <p className="text-white/70 italic">"{personalInfo.quote}"</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {["Home", "About", "Projects", "Skills", "Contact"].map(
                (link) => (
                  <motion.button
                    key={link}
                    onClick={() => {
                      const element = document.querySelector(
                        `#${link.toLowerCase()}`,
                      );
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-white/70 hover:text-white transition-colors duration-200 text-left"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link}
                  </motion.button>
                ),
              )}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Connect</h3>
            <div className="space-y-2">
              <p className="text-white/70">{personalInfo.location}</p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-portfolio-primary hover:text-portfolio-primary/80 transition-colors duration-200"
              >
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-white/10">
          <div className="flex items-center space-x-1 text-white/70 text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
            <span>using React, TypeScript & Three.js</span>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} Alex Johnson. All rights reserved.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-white/70 hover:text-white"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
