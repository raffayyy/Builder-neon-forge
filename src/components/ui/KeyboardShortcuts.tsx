import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import soundManager from "@/lib/soundManager";

interface KeyboardShortcut {
  keys: string[];
  description: string;
}

interface KeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
}

export default function KeyboardShortcuts({ shortcuts }: KeyboardShortcutsProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {/* Keyboard shortcuts toggle button */}
      <motion.div
        className="fixed bottom-4 left-4 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="sm"
            variant="outline"
            className="bg-gray-900/95 backdrop-blur-md border-gray-700/50 text-white hover:bg-gray-800/95 hover:border-blue-400/50"
            onClick={() => {
              soundManager.playClick();
              setIsVisible(!isVisible);
            }}
          >
            <motion.div
              animate={{ rotate: isVisible ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Keyboard className="w-4 h-4 mr-2" />
            </motion.div>
            Shortcuts
          </Button>
        </motion.div>
      </motion.div>

      {/* Keyboard shortcuts panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-16 left-4 z-50"
          >
            <motion.div
              className="bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 shadow-2xl min-w-[280px]"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-3">
                <motion.h3 
                  className="text-white font-semibold text-sm flex items-center"
                  whileHover={{ x: 3 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Keyboard className="w-4 h-4 mr-2 text-blue-400" />
                  </motion.div>
                  Keyboard Shortcuts
                </motion.h3>
                
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    onClick={() => {
                      soundManager.playClick();
                      setIsVisible(false);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </motion.div>
              </div>
              
              <div className="space-y-2">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={shortcut.description}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
                    whileHover={{ x: 3 }}
                    onClick={() => soundManager.playHover()}
                  >
                    <span className="text-gray-300 text-xs group-hover:text-white transition-colors">
                      {shortcut.description}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <motion.div
                          key={keyIndex}
                          className="flex items-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.kbd 
                            className="bg-gray-800/80 border border-gray-600/50 rounded px-1.5 py-0.5 text-xs text-gray-300 font-mono group-hover:border-blue-400/50 group-hover:text-blue-300 transition-colors"
                            whileHover={{ 
                              backgroundColor: "rgba(59, 130, 246, 0.1)",
                              borderColor: "rgba(59, 130, 246, 0.5)"
                            }}
                          >
                            {key}
                          </motion.kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-gray-500 text-xs mx-1">+</span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 pt-3 border-t border-gray-700/50"
              >
                <div className="text-gray-500 text-xs text-center">
                  Press any shortcut to try it out!
                </div>
              </motion.div>
              
              {/* Floating indicators */}
              {Array.from({ length: 2 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                  style={{
                    right: `${10 + i * 20}%`,
                    top: `${20 + i * 30}%`,
                  }}
                  animate={{
                    y: [-5, 5],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
