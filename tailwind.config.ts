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
        // Modern vibrant color scheme
        "neon-cyan": "#00ffff",
        "neon-purple": "#bf00ff",
        "neon-pink": "#ff0080",
        "neon-green": "#00ff88",
        "neon-orange": "#ff8800",
        "neon-blue": "#0088ff",
        "electric-blue": "#007cf0",
        "cyber-purple": "#7928ca",
        "matrix-green": "#00d8ff",
        "plasma-pink": "#ff0080",
        "dark-void": "#000000",
        "deep-space": "#0a0a0f",
        "cosmic-blue": "#1a1a2e",
        "void-purple": "#16213e",
        "shadow-gray": "#0f1419",
        "glass-white": "rgba(255, 255, 255, 0.1)",
        "glass-blue": "rgba(0, 123, 255, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid": `
          linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
        `,
        "matrix-rain": `
          linear-gradient(transparent 0%, rgba(0, 255, 136, 0.05) 50%, transparent 100%)
        `,
        hologram: `
          linear-gradient(45deg, 
            rgba(0, 255, 255, 0.1) 0%, 
            rgba(191, 0, 255, 0.1) 25%, 
            rgba(255, 0, 128, 0.1) 50%, 
            rgba(0, 255, 136, 0.1) 75%, 
            rgba(0, 136, 255, 0.1) 100%
          )
        `,
        "neural-network": `
          radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(191, 0, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 0, 128, 0.1) 0%, transparent 50%)
        `,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "cyber-pulse": {
          "0%, 100%": {
            opacity: "1",
            boxShadow:
              "0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)",
          },
          "50%": {
            opacity: "0.8",
            boxShadow:
              "0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.2)",
          },
        },
        "neon-glow": {
          "0%, 100%": {
            textShadow:
              "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor",
          },
          "50%": {
            textShadow:
              "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor",
          },
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        "hologram-shift": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
            transform: "translateX(0px)",
          },
          "25%": {
            backgroundPosition: "100% 50%",
            transform: "translateX(2px)",
          },
          "50%": {
            backgroundPosition: "0% 100%",
            transform: "translateX(0px)",
          },
          "75%": {
            backgroundPosition: "100% 0%",
            transform: "translateX(-2px)",
          },
        },
        "data-stream": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "float-3d": {
          "0%, 100%": { transform: "translateY(0px) rotateY(0deg)" },
          "33%": { transform: "translateY(-10px) rotateY(120deg)" },
          "66%": { transform: "translateY(5px) rotateY(240deg)" },
        },
        "energy-pulse": {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
            boxShadow: "0 0 0 0 rgba(0, 255, 255, 0.7)",
          },
          "70%": {
            transform: "scale(1.1)",
            opacity: "0.8",
            boxShadow: "0 0 0 20px rgba(0, 255, 255, 0)",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
            boxShadow: "0 0 0 0 rgba(0, 255, 255, 0)",
          },
        },
        "particle-float": {
          "0%, 100%": {
            transform: "translate(0px, 0px) rotate(0deg)",
            opacity: "0.3",
          },
          "33%": {
            transform: "translate(30px, -30px) rotate(120deg)",
            opacity: "0.8",
          },
          "66%": {
            transform: "translate(-20px, 20px) rotate(240deg)",
            opacity: "0.5",
          },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "cyber-pulse": "cyber-pulse 2s ease-in-out infinite",
        "neon-glow": "neon-glow 2s ease-in-out infinite alternate",
        "matrix-rain": "matrix-rain 3s linear infinite",
        "hologram-shift": "hologram-shift 4s ease-in-out infinite",
        "data-stream": "data-stream 2s linear infinite",
        "scan-line": "scan-line 3s linear infinite",
        glitch: "glitch 0.3s ease-in-out infinite",
        "float-3d": "float-3d 4s ease-in-out infinite",
        "energy-pulse": "energy-pulse 2s ease-in-out infinite",
        "particle-float": "particle-float 6s ease-in-out infinite",
        "text-shimmer": "text-shimmer 2.5s ease-in-out infinite",
        "border-spin": "border-spin 3s linear infinite",
      },
      fontFamily: {
        cyber: ["Orbitron", "monospace"],
        matrix: ["Share Tech Mono", "monospace"],
        futuristic: ["Exo 2", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan":
          "0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.1)",
        "neon-purple":
          "0 0 20px rgba(191, 0, 255, 0.5), 0 0 40px rgba(191, 0, 255, 0.3), 0 0 60px rgba(191, 0, 255, 0.1)",
        "neon-pink":
          "0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(255, 0, 128, 0.3), 0 0 60px rgba(255, 0, 128, 0.1)",
        "neon-green":
          "0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3), 0 0 60px rgba(0, 255, 136, 0.1)",
        "cyber-glow":
          "0 0 30px rgba(0, 255, 255, 0.4), inset 0 0 30px rgba(0, 255, 255, 0.1)",
        holographic:
          "0 8px 32px rgba(0, 255, 255, 0.15), 0 4px 16px rgba(191, 0, 255, 0.15), 0 2px 8px rgba(255, 0, 128, 0.15)",
      },
      backdropBlur: {
        cyber: "20px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
