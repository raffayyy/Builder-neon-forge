import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Modern, warm and appealing color scheme
        coral: "#ff6b6b",
        "coral-light": "#ff8e8e",
        "coral-dark": "#ff4757",
        emerald: "#4ecdc4",
        "emerald-light": "#6bccc4",
        "emerald-dark": "#45b7b8",
        lavender: "#a55eea",
        "lavender-light": "#b575ed",
        "lavender-dark": "#8854d0",
        amber: "#feca57",
        "amber-light": "#fed976",
        "amber-dark": "#ff9ff3",
        "slate-900": "#0f172a",
        "slate-800": "#1e293b",
        "slate-700": "#334155",
        "slate-600": "#475569",
        "slate-500": "#64748b",
        "slate-400": "#94a3b8",
        "slate-300": "#cbd5e1",
        "glass-white": "rgba(255, 255, 255, 0.1)",
        "glass-coral": "rgba(255, 107, 107, 0.1)",
        "glass-emerald": "rgba(78, 205, 196, 0.1)",
        "glass-lavender": "rgba(165, 94, 234, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
        "coral-gradient": "linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)",
        "emerald-gradient": "linear-gradient(135deg, #4ecdc4 0%, #45b7b8 100%)",
        "lavender-gradient":
          "linear-gradient(135deg, #a55eea 0%, #8854d0 100%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        "mesh-gradient":
          "radial-gradient(at 40% 20%, rgba(255, 107, 107, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(78, 205, 196, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(165, 94, 234, 0.3) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(254, 202, 87, 0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(255, 107, 107, 0.2) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(78, 205, 196, 0.2) 0px, transparent 50%), radial-gradient(at 0% 0%, rgba(165, 94, 234, 0.2) 0px, transparent 50%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(5px) rotate(-1deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 107, 107, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 107, 107, 0.8)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        "float-simple": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-10px) scale(1.05)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(10deg)" },
          "75%": { transform: "rotate(-10deg)" },
        },
        "text-glow": {
          "0%, 100%": { textShadow: "0 0 10px rgba(255, 107, 107, 0.5)" },
          "50%": {
            textShadow:
              "0 0 20px rgba(255, 107, 107, 0.8), 0 0 30px rgba(78, 205, 196, 0.4)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "fade-in-down": "fade-in-down 0.6s ease-out",
        "fade-in-left": "fade-in-left 0.6s ease-out",
        "fade-in-right": "fade-in-right 0.6s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "float-gentle": "float-gentle 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        morph: "morph 8s ease-in-out infinite",
        "float-simple": "float-simple 4s ease-in-out infinite",
        "spin-slow": "spin-slow 15s linear infinite",
        wave: "wave 2s ease-in-out infinite",
        "text-glow": "text-glow 3s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glass:
          "0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        "glass-lg":
          "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        "glass-xl":
          "0 35px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        "glow-coral": "0 0 30px rgba(255, 107, 107, 0.4)",
        "glow-emerald": "0 0 30px rgba(78, 205, 196, 0.4)",
        "glow-lavender": "0 0 30px rgba(165, 94, 234, 0.4)",
        "glow-amber": "0 0 30px rgba(254, 202, 87, 0.4)",
        "3d": "0 20px 40px rgba(0, 0, 0, 0.1), 0 15px 12px rgba(0, 0, 0, 0.08)",
        "3d-lg":
          "0 35px 60px rgba(0, 0, 0, 0.15), 0 25px 20px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
      perspective: {
        "1000": "1000px",
        "1500": "1500px",
        "2000": "2000px",
      },
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".perspective-1500": {
          perspective: "1500px",
        },
        ".preserve-3d": {
          "transform-style": "preserve-3d",
        },
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
      });
    },
  ],
} satisfies Config;
