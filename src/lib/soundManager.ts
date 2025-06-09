// Sound manager for portfolio interactions
import hapticManager from './hapticManager';

class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();

  constructor() {
    // Initialize audio context on first user interaction
    this.initializeAudioContext();
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  private async createSound(frequency: number, duration: number, type: OscillatorType = 'sine'): Promise<AudioBuffer> {
    if (!this.audioContext) return null as any;

    const sampleRate = this.audioContext.sampleRate;
    const frames = Math.floor(sampleRate * duration);
    const buffer = this.audioContext.createBuffer(1, frames, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < frames; i++) {
      const t = i / sampleRate;
      let sample = 0;

      switch (type) {
        case 'sine':
          sample = Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'square':
          sample = Math.sign(Math.sin(2 * Math.PI * frequency * t));
          break;
        case 'sawtooth':
          sample = 2 * (t * frequency - Math.floor(t * frequency + 0.5));
          break;
      }

      // Apply envelope (fade in/out)
      const envelope = Math.sin(Math.PI * i / frames);
      data[i] = sample * envelope * 0.1; // Low volume
    }

    return buffer;
  }

  async preloadSounds() {
    if (!this.audioContext) return;

    const soundDefinitions = {
      hover: { frequency: 800, duration: 0.1, type: 'sine' as OscillatorType },
      click: { frequency: 600, duration: 0.15, type: 'square' as OscillatorType },
      success: { frequency: 523.25, duration: 0.3, type: 'sine' as OscillatorType }, // C5
      achievement: { frequency: 659.25, duration: 0.5, type: 'sine' as OscillatorType }, // E5
      notification: { frequency: 440, duration: 0.2, type: 'sine' as OscillatorType }, // A4
    };

    for (const [name, config] of Object.entries(soundDefinitions)) {
      try {
        const buffer = await this.createSound(config.frequency, config.duration, config.type);
        this.sounds.set(name, buffer);
      } catch (error) {
        console.warn(`Failed to create sound ${name}:`, error);
      }
    }
  }

  async playSound(soundName: string, volume: number = 0.3) {
    if (!this.audioContext || !this.sounds.has(soundName)) return;

    try {
      // Resume audio context if suspended
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const buffer = this.sounds.get(soundName);
      if (!buffer) return;

      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = buffer;
      gainNode.gain.value = volume;

      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      source.start();
    } catch (error) {
      console.warn(`Failed to play sound ${soundName}:`, error);
    }
  }

  // Specialized methods for common interactions with haptic feedback
  async playHover() {
    hapticManager.light();
    await this.playSound('hover', 0.1);
  }

  async playClick() {
    hapticManager.medium();
    await this.playSound('click', 0.2);
  }

  async playSuccess() {
    hapticManager.success();
    await this.playSound('success', 0.3);
  }

  async playAchievement() {
    hapticManager.achievement();
    await this.playSound('achievement', 0.4);
  }

  async playNotification() {
    hapticManager.notification();
    await this.playSound('notification', 0.2);
  }
}

// Create global sound manager instance
const soundManager = new SoundManager();

// Initialize sounds on first user interaction
let initialized = false;
const initializeSounds = () => {
  if (!initialized) {
    soundManager.preloadSounds();
    initialized = true;
    document.removeEventListener('click', initializeSounds);
    document.removeEventListener('keydown', initializeSounds);
  }
};

document.addEventListener('click', initializeSounds);
document.addEventListener('keydown', initializeSounds);

export default soundManager;
