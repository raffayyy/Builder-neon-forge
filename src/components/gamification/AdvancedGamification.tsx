import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Crown, 
  Flame,
  Share2,
  Download,
  Users,
  Timer,
  Award,
  Code,
  Eye,
  Heart,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import soundManager from '@/lib/soundManager';
import hapticManager from '@/lib/hapticManager';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  condition: (stats: UserStats) => boolean;
  reward: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface UserStats {
  sectionsVisited: number;
  timeSpent: number;
  projectsViewed: number;
  skillsHovered: number;
  interactionsCount: number;
  achievementsUnlocked: number;
  streak: number;
  lastVisit: Date;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'exploration' | 'interaction' | 'time' | 'social';
  target: number;
  current: number;
  reward: number;
  deadline?: Date;
  active: boolean;
}

const achievements: Achievement[] = [
  {
    id: 'first_visit',
    name: 'Welcome Explorer',
    description: 'Visit the portfolio for the first time',
    icon: Star,
    rarity: 'common',
    condition: (stats) => stats.sectionsVisited >= 1,
    reward: 10,
    unlocked: false
  },
  {
    id: 'section_master',
    name: 'Section Master',
    description: 'Visit all main sections',
    icon: Target,
    rarity: 'uncommon',
    condition: (stats) => stats.sectionsVisited >= 7,
    reward: 25,
    unlocked: false
  },
  {
    id: 'deep_diver',
    name: 'Deep Diver',
    description: 'Spend over 10 minutes exploring',
    icon: Timer,
    rarity: 'rare',
    condition: (stats) => stats.timeSpent >= 600,
    reward: 50,
    unlocked: false
  },
  {
    id: 'project_enthusiast',
    name: 'Project Enthusiast',
    description: 'View all featured projects',
    icon: Code,
    rarity: 'uncommon',
    condition: (stats) => stats.projectsViewed >= 5,
    reward: 30,
    unlocked: false
  },
  {
    id: 'skill_scout',
    name: 'Skill Scout',
    description: 'Hover over 20 different skills',
    icon: Zap,
    rarity: 'rare',
    condition: (stats) => stats.skillsHovered >= 20,
    reward: 40,
    unlocked: false
  },
  {
    id: 'interaction_king',
    name: 'Interaction King',
    description: 'Perform 100 interactions',
    icon: Crown,
    rarity: 'epic',
    condition: (stats) => stats.interactionsCount >= 100,
    reward: 75,
    unlocked: false
  },
  {
    id: 'streak_warrior',
    name: 'Streak Warrior',
    description: 'Visit 5 days in a row',
    icon: Flame,
    rarity: 'legendary',
    condition: (stats) => stats.streak >= 5,
    reward: 100,
    unlocked: false
  }
];

const dailyChallenges: Challenge[] = [
  {
    id: 'daily_explorer',
    name: 'Daily Explorer',
    description: 'Visit 3 different sections today',
    type: 'exploration',
    target: 3,
    current: 0,
    reward: 20,
    active: true
  },
  {
    id: 'interaction_challenge',
    name: 'Interaction Champion',
    description: 'Perform 25 interactions today',
    type: 'interaction',
    target: 25,
    current: 0,
    reward: 15,
    active: true
  },
  {
    id: 'time_challenge',
    name: 'Time Well Spent',
    description: 'Spend 5 minutes exploring today',
    type: 'time',
    target: 300,
    current: 0,
    reward: 25,
    active: true
  }
];

export default function AdvancedGamification() {
  const [userStats, setUserStats] = useState<UserStats>({
    sectionsVisited: 0,
    timeSpent: 0,
    projectsViewed: 0,
    skillsHovered: 0,
    interactionsCount: 0,
    achievementsUnlocked: 0,
    streak: 0,
    lastVisit: new Date()
  });

  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [challenges, setChallenges] = useState<Challenge[]>(dailyChallenges);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [experiencePoints, setExperiencePoints] = useState(0);

  useEffect(() => {
    loadUserData();
    const interval = setInterval(checkAchievements, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newLevel = Math.floor(experiencePoints / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      soundManager.playSuccess();
      hapticManager.impact('heavy');
    }
  }, [experiencePoints, level]);

  const loadUserData = () => {
    const savedStats = localStorage.getItem('portfolioGameStats');
    const savedAchievements = localStorage.getItem('portfolioAchievements');
    
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
    
    if (savedAchievements) {
      setUserAchievements(JSON.parse(savedAchievements));
    }
  };

  const saveUserData = () => {
    localStorage.setItem('portfolioGameStats', JSON.stringify(userStats));
    localStorage.setItem('portfolioAchievements', JSON.stringify(userAchievements));
  };

  const checkAchievements = () => {
    const unlocked: Achievement[] = [];
    
    const updatedAchievements = userAchievements.map(achievement => {
      if (!achievement.unlocked && achievement.condition(userStats)) {
        const unlockedAchievement = {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date()
        };
        unlocked.push(unlockedAchievement);
        return unlockedAchievement;
      }
      return achievement;
    });

    if (unlocked.length > 0) {
      setUserAchievements(updatedAchievements);
      setNewAchievements(unlocked);
      
      const points = unlocked.reduce((sum, achievement) => sum + achievement.reward, 0);
      setExperiencePoints(prev => prev + points);
      setTotalScore(prev => prev + points);
      
      setTimeout(() => setNewAchievements([]), 5000);
      soundManager.playSuccess();
      hapticManager.impact('medium');
    }
  };

  const updateStats = (statType: keyof UserStats, value: number) => {
    setUserStats(prev => {
      const updated = { ...prev, [statType]: prev[statType] + value };
      localStorage.setItem('portfolioGameStats', JSON.stringify(updated));
      return updated;
    });
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    const colors = {
      common: 'from-gray-400 to-gray-600',
      uncommon: 'from-green-400 to-green-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-orange-500'
    };
    return colors[rarity];
  };

  const shareAchievement = (achievement: Achievement) => {
    if (navigator.share) {
      navigator.share({
        title: `I unlocked "${achievement.name}"!`,
        text: `Check out this cool portfolio and see if you can unlock this achievement too!`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `I unlocked "${achievement.name}" on this amazing portfolio! ${window.location.href}`
      );
    }
    soundManager.playClick();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Achievement Notifications */}
      <AnimatePresence>
        {newAchievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className="mb-4"
          >
            <Card className={`w-80 bg-gradient-to-r ${getRarityColor(achievement.rarity)} p-0.5`}>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1 }}
                    className="text-yellow-400"
                  >
                    <achievement.icon className="w-8 h-8" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold">Achievement Unlocked!</h3>
                    <p className="text-yellow-400 font-semibold">{achievement.name}</p>
                    <p className="text-gray-300 text-sm">{achievement.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => shareAchievement(achievement)}
                    className="text-white hover:text-yellow-400"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Mini Progress Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900/90 backdrop-blur-lg rounded-lg p-4 border border-gray-700/50 mb-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="w-5 h-5 text-yellow-400" />
            </motion.div>
            <span className="text-white font-bold">Level {level}</span>
          </div>
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            {totalScore} XP
          </Badge>
        </div>
        
        <Progress 
          value={(experiencePoints % 100)} 
          className="mb-2"
        />
        
        <div className="flex justify-between text-xs text-gray-400">
          <span>{experiencePoints % 100}/100 XP</span>
          <span>Next Level</span>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <Card className="bg-gray-900/90 backdrop-blur-lg border-gray-700/50">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="text-blue-400 font-bold text-lg">{userStats.sectionsVisited}</div>
              <div className="text-xs text-gray-400">Sections</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="text-green-400 font-bold text-lg">{userAchievements.filter(a => a.unlocked).length}</div>
              <div className="text-xs text-gray-400">Achievements</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="text-purple-400 font-bold text-lg">{Math.floor(userStats.timeSpent / 60)}m</div>
              <div className="text-xs text-gray-400">Time Spent</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="text-orange-400 font-bold text-lg">{userStats.interactionsCount}</div>
              <div className="text-xs text-gray-400">Interactions</div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper hook to integrate with existing components
export const useGamification = () => {
  const trackAction = (action: keyof UserStats, value: number = 1) => {
    const event = new CustomEvent('gamification-action', {
      detail: { action, value }
    });
    window.dispatchEvent(event);
  };

  return { trackAction };
};
