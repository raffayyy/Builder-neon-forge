import { useEffect, useCallback } from "react";
import soundManager from "@/lib/soundManager";

interface KeyboardNavigationOptions {
  onDownload?: () => void;
  onContact?: () => void;
  onLinkedIn?: () => void;
  onSectionNext?: () => void;
  onSectionPrev?: () => void;
  onToggleStats?: () => void;
}

export function useKeyboardNavigation(options: KeyboardNavigationOptions) {
  const {
    onDownload,
    onContact,
    onLinkedIn,
    onSectionNext,
    onSectionPrev,
    onToggleStats
  } = options;

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Ignore if user is typing in an input field
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      return;
    }

    // Check for key combinations
    const { key, ctrlKey, altKey, shiftKey } = event;
    
    switch (key.toLowerCase()) {
      case 'd':
        if (ctrlKey && !altKey && !shiftKey) {
          event.preventDefault();
          soundManager.playClick();
          onDownload?.();
        }
        break;
        
      case 'c':
        if (ctrlKey && altKey && !shiftKey) {
          event.preventDefault();
          soundManager.playClick();
          onContact?.();
        }
        break;
        
      case 'l':
        if (ctrlKey && altKey && !shiftKey) {
          event.preventDefault();
          soundManager.playClick();
          onLinkedIn?.();
        }
        break;
        
      case 'arrowdown':
      case 'j':
        if (!ctrlKey && !altKey && !shiftKey) {
          event.preventDefault();
          soundManager.playHover();
          onSectionNext?.();
        }
        break;
        
      case 'arrowup':
      case 'k':
        if (!ctrlKey && !altKey && !shiftKey) {
          event.preventDefault();
          soundManager.playHover();
          onSectionPrev?.();
        }
        break;
        
      case 's':
        if (ctrlKey && altKey && !shiftKey) {
          event.preventDefault();
          soundManager.playSuccess();
          onToggleStats?.();
        }
        break;
        
      default:
        break;
    }
  }, [onDownload, onContact, onLinkedIn, onSectionNext, onSectionPrev, onToggleStats]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Return keyboard shortcuts info
  return {
    shortcuts: [
      { keys: ['Ctrl', 'D'], description: 'Download Resume' },
      { keys: ['Ctrl', 'Alt', 'C'], description: 'Contact Me' },
      { keys: ['Ctrl', 'Alt', 'L'], description: 'LinkedIn Profile' },
      { keys: ['↓', 'J'], description: 'Next Section' },
      { keys: ['↑', 'K'], description: 'Previous Section' },
      { keys: ['Ctrl', 'Alt', 'S'], description: 'Toggle Stats' },
    ]
  };
}
