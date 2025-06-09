// Haptic feedback utilities for mobile devices
class HapticManager {
  private isSupported: boolean;

  constructor() {
    this.isSupported = 'vibrate' in navigator && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  }

  // Light haptic feedback for hover effects
  light() {
    if (this.isSupported) {
      navigator.vibrate(10);
    }
  }

  // Medium haptic feedback for button clicks
  medium() {
    if (this.isSupported) {
      navigator.vibrate(25);
    }
  }

  // Strong haptic feedback for success/achievement actions
  heavy() {
    if (this.isSupported) {
      navigator.vibrate(50);
    }
  }

  // Success pattern (multiple vibrations)
  success() {
    if (this.isSupported) {
      navigator.vibrate([30, 50, 30]);
    }
  }

  // Error pattern
  error() {
    if (this.isSupported) {
      navigator.vibrate([100, 50, 100]);
    }
  }

  // Achievement celebration pattern
  achievement() {
    if (this.isSupported) {
      navigator.vibrate([50, 30, 50, 30, 100]);
    }
  }

  // Notification pattern
  notification() {
    if (this.isSupported) {
      navigator.vibrate([20, 20, 20]);
    }
  }

  // Selection pattern for navigation
  selection() {
    if (this.isSupported) {
      navigator.vibrate(15);
    }
  }

  // Check if haptic feedback is supported
  get supported(): boolean {
    return this.isSupported;
  }
}

const hapticManager = new HapticManager();

export default hapticManager;
