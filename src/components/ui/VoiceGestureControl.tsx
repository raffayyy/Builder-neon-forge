import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Gesture,
  Eye,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import soundManager from '@/lib/soundManager';
import hapticManager from '@/lib/hapticManager';

interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
  variants: string[];
}

interface GestureConfig {
  enabled: boolean;
  sensitivity: number;
  gestures: {
    swipeLeft: () => void;
    swipeRight: () => void;
    swipeUp: () => void;
    swipeDown: () => void;
    pinch: () => void;
    spread: () => void;
  };
}

export default function VoiceGestureControl() {
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [gestureEnabled, setGestureEnabled] = useState(false);
  const [eyeTrackingEnabled, setEyeTrackingEnabled] = useState(false);
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const [showHelp, setShowHelp] = useState(false);
  const [lastGesture, setLastGesture] = useState<string>('');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const gestureStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const voiceCommands: VoiceCommand[] = [
    {
      command: 'go to projects',
      action: () => navigateToSection('projects'),
      description: 'Navigate to the projects section',
      variants: ['show projects', 'projects section', 'view projects']
    },
    {
      command: 'go to resume',
      action: () => navigateToSection('resume'),
      description: 'Navigate to the resume section',
      variants: ['show resume', 'resume section', 'view resume', 'cv']
    },
    {
      command: 'go to about',
      action: () => navigateToSection('about'),
      description: 'Navigate to the about section',
      variants: ['about me', 'about section', 'show about']
    },
    {
      command: 'go to contact',
      action: () => navigateToSection('contact'),
      description: 'Navigate to the contact section',
      variants: ['contact me', 'contact section', 'get in touch']
    },
    {
      command: 'go to blog',
      action: () => navigateToSection('blog'),
      description: 'Navigate to the blog section',
      variants: ['show blog', 'blog section', 'articles']
    },
    {
      command: 'scroll up',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      description: 'Scroll to the top of the page',
      variants: ['top', 'go up', 'scroll to top']
    },
    {
      command: 'scroll down',
      action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
      description: 'Scroll to the bottom of the page',
      variants: ['bottom', 'go down', 'scroll to bottom']
    },
    {
      command: 'play sound',
      action: () => {
        soundManager.playSuccess();
        speak('Sound effects enabled');
      },
      description: 'Test sound effects',
      variants: ['test sound', 'sound test', 'audio test']
    },
    {
      command: 'read this',
      action: () => readCurrentSection(),
      description: 'Read the current section content',
      variants: ['read aloud', 'speak this', 'audio description']
    },
    {
      command: 'help',
      action: () => setShowHelp(true),
      description: 'Show voice commands help',
      variants: ['show help', 'commands', 'what can you do']
    },
    {
      command: 'stop',
      action: () => {
        setIsListening(false);
        speechSynthesis.cancel();
      },
      description: 'Stop voice control and reading',
      variants: ['stop listening', 'quiet', 'silence', 'stop reading']
    }
  ];

  useEffect(() => {
    initializeVoiceRecognition();
    initializeGestureControl();
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (voiceEnabled && !isListening) {
      startListening();
    } else if (!voiceEnabled && isListening) {
      stopListening();
    }
  }, [voiceEnabled]);

  const initializeVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase().trim();
        
        setCurrentCommand(command);
        
        if (event.results[last].isFinal) {
          processVoiceCommand(command);
          setCurrentCommand('');
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (voiceEnabled) {
          // Restart recognition if it's supposed to be enabled
          setTimeout(() => {
            if (recognitionRef.current && voiceEnabled) {
              recognitionRef.current.start();
            }
          }, 1000);
        }
      };
    }
  };

  const initializeGestureControl = () => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (!gestureEnabled) return;
      
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!gestureEnabled) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const deltaTime = touchEndTime - touchStartTime;
      
      // Ignore short touches (likely taps)
      if (deltaTime < 200) return;
      
      const minSwipeDistance = 50;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            // Swipe right
            handleGesture('swipe-right');
          } else {
            // Swipe left
            handleGesture('swipe-left');
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            // Swipe down
            handleGesture('swipe-down');
          } else {
            // Swipe up
            handleGesture('swipe-up');
          }
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  };

  const processVoiceCommand = (command: string) => {
    const matchedCommand = voiceCommands.find(cmd => 
      cmd.command === command || 
      cmd.variants.some(variant => command.includes(variant))
    );

    if (matchedCommand) {
      soundManager.playClick();
      hapticManager.impact('light');
      matchedCommand.action();
      speak(`Executing: ${matchedCommand.description}`);
    } else {
      speak("Command not recognized. Say 'help' for available commands.");
    }
  };

  const handleGesture = (gesture: string) => {
    setLastGesture(gesture);
    soundManager.playHover();
    hapticManager.impact('light');

    switch (gesture) {
      case 'swipe-left':
        navigateToNextSection();
        break;
      case 'swipe-right':
        navigateToPreviousSection();
        break;
      case 'swipe-up':
        window.scrollBy({ top: -300, behavior: 'smooth' });
        break;
      case 'swipe-down':
        window.scrollBy({ top: 300, behavior: 'smooth' });
        break;
    }

    setTimeout(() => setLastGesture(''), 2000);
  };

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // For page navigation
      window.location.href = `/${sectionId}`;
    }
  };

  const navigateToNextSection = () => {
    const sections = ['hero', 'projects', 'techstack', 'experience', 'achievements', 'contact'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    navigateToSection(sections[nextIndex]);
  };

  const navigateToPreviousSection = () => {
    const sections = ['hero', 'projects', 'techstack', 'experience', 'achievements', 'contact'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
    navigateToSection(sections[prevIndex]);
  };

  const getCurrentSection = (): string => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + window.innerHeight / 2;
    
    for (const section of sections) {
      const element = section as HTMLElement;
      const offsetTop = element.offsetTop;
      const offsetBottom = offsetTop + element.offsetHeight;
      
      if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
        return element.id;
      }
    }
    
    return 'hero';
  };

  const readCurrentSection = () => {
    const currentSection = getCurrentSection();
    const element = document.getElementById(currentSection);
    
    if (element) {
      const textContent = element.textContent || '';
      const cleanText = textContent
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 500) + '...'; // Limit length
      
      speak(cleanText);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
      speak('Voice control activated');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
      speechSynthesis.cancel();
    }
  };

  return (
    <>
      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
      >
        <Card className="bg-gray-900/90 backdrop-blur-lg border-gray-700/50 p-4">
          <div className="space-y-4">
            {/* Voice Control */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Button
                  size="sm"
                  variant={voiceEnabled ? "default" : "outline"}
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className="p-2"
                >
                  {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </Button>
              </motion.div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={voiceEnabled} 
                  onCheckedChange={setVoiceEnabled}
                  id="voice-control"
                />
                <label htmlFor="voice-control" className="text-xs text-white">Voice</label>
              </div>
            </div>

            {/* Gesture Control */}
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant={gestureEnabled ? "default" : "outline"}
                onClick={() => setGestureEnabled(!gestureEnabled)}
                className="p-2"
              >
                <Gesture className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={gestureEnabled} 
                  onCheckedChange={setGestureEnabled}
                  id="gesture-control"
                />
                <label htmlFor="gesture-control" className="text-xs text-white">Gestures</label>
              </div>
            </div>

            {/* Help Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowHelp(true)}
              className="p-2 w-full"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">Help</span>
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Current Command Display */}
      <AnimatePresence>
        {isListening && currentCommand && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Card className="bg-blue-600/90 backdrop-blur-lg border-blue-500/50">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Mic className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-white text-sm">"{currentCommand}"</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gesture Feedback */}
      <AnimatePresence>
        {lastGesture && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Badge variant="outline" className="bg-purple-600/90 text-white border-purple-500">
              {lastGesture.replace('-', ' ').toUpperCase()}
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto"
            >
              <h3 className="text-white text-lg font-bold mb-4">Voice & Gesture Commands</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-blue-400 font-semibold mb-2">Voice Commands:</h4>
                  <div className="space-y-1 text-sm">
                    {voiceCommands.slice(0, 8).map((cmd, index) => (
                      <div key={index} className="text-gray-300">
                        <span className="text-white font-medium">"{cmd.command}"</span> - {cmd.description}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-purple-400 font-semibold mb-2">Gesture Controls:</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div><span className="text-white">Swipe Left:</span> Next section</div>
                    <div><span className="text-white">Swipe Right:</span> Previous section</div>
                    <div><span className="text-white">Swipe Up:</span> Scroll up</div>
                    <div><span className="text-white">Swipe Down:</span> Scroll down</div>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => setShowHelp(false)}
                className="w-full mt-4"
              >
                Got it!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
