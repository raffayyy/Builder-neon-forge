import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  TrendingUp,
  Clock,
  Award,
  Target,
  Zap,
  Users,
  Calendar,
  Code2,
  Star,
} from "lucide-react";
import soundManager from "@/lib/soundManager";

interface ResumeStatsProps {
  viewedSections: Set<string>;
  readingTime: number;
  experienceYears: number;
  achievements: number;
  projects: number;
  skills: number;
}

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  animation?: any;
}

export default function ResumeStats({
  viewedSections,
  readingTime,
  experienceYears,
  achievements,
  projects,
  skills,
}: ResumeStatsProps) {
  const [showStats, setShowStats] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    viewedSections: 0,
    readingTime: 0,
    experienceYears: 0,
    achievements: 0,
    projects: 0,
    skills: 0,
  });

  // Performance optimization: Detect reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  // Memoize animation variants for better performance
  const animationVariants = useMemo(
    () => ({
      container: {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: shouldReduceMotion ? 0.1 : 0.5,
            type: "spring",
            stiffness: 400,
            damping: 25,
          },
        },
        exit: {
          opacity: 0,
          scale: 0.8,
          y: 20,
          transition: { duration: shouldReduceMotion ? 0.1 : 0.3 },
        },
      },
      item: {
        hidden: { opacity: 0, x: 20 },
        visible: (i: number) => ({
          opacity: 1,
          x: 0,
          transition: {
            duration: shouldReduceMotion ? 0.1 : 0.3,
            delay: shouldReduceMotion ? 0 : i * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 25,
          },
        }),
      },
    }),
    [shouldReduceMotion]
  );

  // Optimize number counting with useCallback
  const animateValue = useCallback(
    (key: string, target: number, index: number) => {
      if (shouldReduceMotion) {
        setAnimatedValues((prev) => ({ ...prev, [key]: target }));
        return;
      }

      const startTime = performance.now();
      const duration = 1000;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easeOutCubic for smooth deceleration
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOutCubic);

        setAnimatedValues((prev) => ({ ...prev, [key]: current }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      setTimeout(() => requestAnimationFrame(animate), index * 200);
    },
    [shouldReduceMotion]
  );

  // Animate number counting
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStats(true);
      // Animate each value with different delays
      const targets = {
        viewedSections: viewedSections.size,
        readingTime,
        experienceYears,
        achievements,
        projects,
        skills,
      };

      Object.entries(targets).forEach(([key, target], index) => {
        animateValue(key, target, index);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [
    viewedSections.size,
    readingTime,
    experienceYears,
    achievements,
    projects,
    skills,
    animateValue,
  ]);

  const stats: StatItem[] = [
    {
      icon: Target,
      label: "Sections Viewed",
      value: `${animatedValues.viewedSections}/6`,
      color: "text-emerald-400",
      animation: shouldReduceMotion ? {} : { rotate: [0, 360] },
    },
    {
      icon: Clock,
      label: "Reading Time", 
      value: `${animatedValues.readingTime} min`,
      color: "text-blue-400",
      animation: shouldReduceMotion ? {} : { scale: [1, 1.1, 1] },
    },
    {
      icon: Calendar,
      label: "Experience",
      value: `${animatedValues.experienceYears}+ years`,
      color: "text-purple-400",
      animation: shouldReduceMotion ? {} : { y: [-1, 1] },
    },
    {
      icon: Award,
      label: "Achievements",
      value: animatedValues.achievements,
      color: "text-yellow-400",
      animation: shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] },
    },
    {
      icon: Code2,
      label: "Projects",
      value: animatedValues.projects,
      color: "text-cyan-400",
      animation: shouldReduceMotion ? {} : { rotate: [0, 360] },
    },
    {
      icon: Zap,
      label: "Skills",
      value: animatedValues.skills,
      color: "text-orange-400",
      animation: shouldReduceMotion ? {} : { scale: [1, 1.2, 1] },
    },
  ];

  return (
    <AnimatePresence>
      {showStats && (
        <motion.div
          variants={animationVariants.container}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-4 right-4 z-50"
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 shadow-2xl"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.h3
              className="text-white font-semibold text-sm mb-3 flex items-center"
              whileHover={{ x: 3 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <TrendingUp className="w-4 h-4 mr-2 text-emerald-400" />
              </motion.div>
              Resume Analytics
            </motion.h3>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={animationVariants.item}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  className="group cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderRadius: "8px",
                  }}
                  onClick={() => soundManager.playClick()}
                  onMouseEnter={() => soundManager.playHover()}
                >
                  <div className="flex items-center gap-2 p-2">
                    <motion.div
                      animate={stat.animation}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 3,
                        repeat: shouldReduceMotion ? 0 : Infinity,
                        ease: "easeInOut",
                        repeatType: "reverse"
                      }}
                      className={stat.color}
                    >
                      <stat.icon className="w-4 h-4" />
                    </motion.div>

                    <div className="flex flex-col">
                      <motion.span
                        className="text-white text-sm font-semibold"
                        whileHover={{ scale: 1.05 }}
                      >
                        {stat.value}
                      </motion.span>
                      <span className="text-gray-400 text-xs">
                        {stat.label}
                      </span>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <motion.div
                    className="h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Achievement celebration */}
            {viewedSections.size === 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 p-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg border border-emerald-500/30"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs">
                  <motion.div
                    animate={shouldReduceMotion ? {} : { rotate: [0, 360] }}
                    transition={{ 
                      duration: shouldReduceMotion ? 0 : 3, 
                      repeat: shouldReduceMotion ? 0 : Infinity,
                      ease: "linear"
                    }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                  </motion.div>
                  <span className="font-semibold">Perfect Score!</span>
                </div>
                <p className="text-emerald-300 text-xs mt-1">
                  You've viewed all sections! 🎉
                </p>
              </motion.div>
            )}

            {/* Floating particles - only show if motion is not reduced */}
            {!shouldReduceMotion && Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                }}
                animate={{
                  y: [-10, 10],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
