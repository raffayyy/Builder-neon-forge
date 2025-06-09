import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Zap, Target, Award } from "lucide-react";
import Confetti from "@/components/ui/Confetti";
import soundManager from "@/lib/soundManager";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    id: "explorer",
    name: "Portfolio Explorer",
    description: "Visited all main sections",
    icon: <Target className="w-4 h-4" />,
    points: 50,
    unlocked: false,
  },
  {
    id: "socializer",
    name: "Social Connector",
    description: "Clicked on social links",
    icon: <Star className="w-4 h-4" />,
    points: 25,
    unlocked: false,
  },
  {
    id: "tech_curious",
    name: "Tech Enthusiast",
    description: "Explored technology stack",
    icon: <Zap className="w-4 h-4" />,
    points: 30,
    unlocked: false,
  },
  {
    id: "project_viewer",
    name: "Project Inspector",
    description: "Viewed project details",
    icon: <Award className="w-4 h-4" />,
    points: 40,
    unlocked: false,
  },
];

export default function PortfolioScore() {
  const [score, setScore] = useState(0);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [level, setLevel] = useState(1);

  // Load progress from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem('portfolioScore');
    const savedSections = localStorage.getItem('visitedSections');
    const savedAchievements = localStorage.getItem('unlockedAchievements');

    if (savedScore) setScore(parseInt(savedScore));
    if (savedSections) setVisitedSections(new Set(JSON.parse(savedSections)));
    if (savedAchievements) setUnlockedAchievements(new Set(JSON.parse(savedAchievements)));
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('portfolioScore', score.toString());
    localStorage.setItem('visitedSections', JSON.stringify([...visitedSections]));
    localStorage.setItem('unlockedAchievements', JSON.stringify([...unlockedAchievements]));
    
    // Calculate level based on score
    const newLevel = Math.floor(score / 100) + 1;
    setLevel(newLevel);
  }, [score, visitedSections, unlockedAchievements]);

  // Track section visits
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'skills', 'projects', 'github', 'achievements', 'testimonials', 'contact'];
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible && !visitedSections.has(sectionId)) {
            setVisitedSections(prev => new Set([...prev, sectionId]));
            addScore(10, `Visited ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} section`);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visitedSections]);

  // Check achievements
  useEffect(() => {
    achievements.forEach(achievement => {
      if (!unlockedAchievements.has(achievement.id)) {
        let shouldUnlock = false;

        switch (achievement.id) {
          case 'explorer':
            shouldUnlock = visitedSections.size >= 6;
            break;
          case 'socializer':
            shouldUnlock = localStorage.getItem('socialClicked') === 'true';
            break;
          case 'tech_curious':
            shouldUnlock = visitedSections.has('skills');
            break;
          case 'project_viewer':
            shouldUnlock = localStorage.getItem('projectViewed') === 'true';
            break;
        }

        if (shouldUnlock) {
          unlockAchievement(achievement);
        }
      }
    });
  }, [visitedSections, unlockedAchievements]);

  const addScore = (points: number, reason?: string) => {
    setScore(prev => prev + points);
    soundManager.playNotification();
  };

  const unlockAchievement = (achievement: Achievement) => {
    setUnlockedAchievements(prev => new Set([...prev, achievement.id]));
    setScore(prev => prev + achievement.points);
    setShowAchievement(achievement);
    setShowConfetti(true);
    soundManager.playAchievement();
    
    setTimeout(() => {
      setShowAchievement(null);
      setShowConfetti(false);
    }, 4000);
  };

  // Global functions for tracking interactions
  useEffect(() => {
    (window as any).portfolioTracker = {
      trackSocialClick: () => {
        localStorage.setItem('socialClicked', 'true');
        addScore(15, 'Social interaction');
      },
      trackProjectView: () => {
        localStorage.setItem('projectViewed', 'true');
        addScore(20, 'Project exploration');
      },
      trackDownload: () => {
        addScore(25, 'Downloaded resume');
      },
      trackContact: () => {
        addScore(30, 'Contact initiated');
      }
    };
  }, []);

  return (
    <>
      <Confetti active={showConfetti} />
      
      {/* Score Display */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-20 right-4 z-50 bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 shadow-lg"
      >
        <div className="flex items-center gap-2 text-white">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <div className="text-sm">
            <div className="font-bold">Level {level}</div>
            <div className="text-xs text-gray-400">{score} XP</div>
          </div>
        </div>
        
        {/* Progress bar to next level */}
        <div className="mt-2 w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${(score % 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg shadow-xl border-2 border-yellow-400"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1 }}
                className="p-2 bg-white/20 rounded-full"
              >
                {showAchievement.icon}
              </motion.div>
              <div>
                <div className="font-bold text-sm">Achievement Unlocked!</div>
                <div className="text-xs">{showAchievement.name}</div>
                <div className="text-xs opacity-80">{showAchievement.description}</div>
                <div className="text-xs font-bold">+{showAchievement.points} XP</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Panel Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        onClick={() => {
          const panel = document.getElementById('achievements-panel');
          if (panel) {
            panel.classList.toggle('hidden');
          }
        }}
      >
        <Award className="w-5 h-5" />
      </motion.button>

      {/* Achievements Panel */}
      <div
        id="achievements-panel"
        className="hidden fixed bottom-16 right-4 z-50 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 shadow-xl w-72"
      >
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" />
          Achievements
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center gap-3 p-2 rounded ${
                unlockedAchievements.has(achievement.id)
                  ? 'bg-green-500/20 border border-green-500/30'
                  : 'bg-gray-800/50 border border-gray-700/50'
              }`}
            >
              <div className={`p-1 rounded ${
                unlockedAchievements.has(achievement.id)
                  ? 'text-green-400'
                  : 'text-gray-500'
              }`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  unlockedAchievements.has(achievement.id)
                    ? 'text-green-400'
                    : 'text-gray-400'
                }`}>
                  {achievement.name}
                </div>
                <div className="text-xs text-gray-500">{achievement.description}</div>
              </div>
              <div className={`text-xs font-bold ${
                unlockedAchievements.has(achievement.id)
                  ? 'text-green-400'
                  : 'text-gray-500'
              }`}>
                {achievement.points}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
