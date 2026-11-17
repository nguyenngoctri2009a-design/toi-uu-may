// Ultra-lightweight Web Audio API synthesizer for tactile 3D clicks
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export const toggleSound = (): boolean => {
  soundEnabled = !soundEnabled;
  return soundEnabled;
};

export const isSoundEnabled = (): boolean => soundEnabled;

export const playTactileClick = (type: 'up' | 'down' | 'subtle' = 'down') => {
  if (!soundEnabled || typeof window === 'undefined') return;

  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';

    const now = audioCtx.currentTime;
    if (type === 'down') {
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'up') {
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.03);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } else {
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.025);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    }
  } catch {
    // Ignore audio playback errors if user hasn't interacted with page
  }
};
