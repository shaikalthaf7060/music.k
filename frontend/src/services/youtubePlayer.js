/**
 * music.k Pure Audio Stream Engine
 * 100% Pure Audio Playback in the browser (Zero video frames, Zero backend storage, Zero ads).
 */

class PureAudioEngine {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.listeners = new Set();
    this.currentTrack = null;
    this.isPlaying = false;

    // Listen to native HTML5 audio lifecycle events
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify('stateChange', 1);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify('stateChange', 2);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.notify('stateChange', 0);
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Audio playback notice:', e);
    });
  }

  init() {
    // Initializer hook for compatibility
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(type, data) {
    this.listeners.forEach(cb => {
      try { cb(type, data); } catch (e) {}
    });
  }

  playTrack(track) {
    if (!track) return;
    this.currentTrack = track;

    if (track.audioUrl) {
      this.startPlayback(track.audioUrl);
    } else {
      // Dynamic audio resolver if audioUrl is missing
      const q = encodeURIComponent(`${track.artist || ''} ${track.title || ''}`.trim());
      fetch(`https://itunes.apple.com/search?term=${q}&entity=song&limit=1`)
        .then(res => res.json())
        .then(data => {
          if (data.results && data.results.length > 0 && data.results[0].previewUrl) {
            this.startPlayback(data.results[0].previewUrl);
          }
        })
        .catch(err => {
          console.warn('Audio stream resolver notice:', err);
        });
    }
  }

  startPlayback(src) {
    try {
      this.audio.pause();
      this.audio.src = src;
      this.audio.load();
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify('stateChange', 1);
          })
          .catch(err => {
            console.warn('Audio auto-play notice:', err);
          });
      }
    } catch (err) {
      console.warn('Error starting audio playback:', err);
    }
  }

  play() {
    this.audio.play().catch(() => {});
  }

  pause() {
    this.audio.pause();
  }

  seekTo(seconds) {
    if (this.audio.duration && !isNaN(this.audio.duration)) {
      this.audio.currentTime = Math.max(0, Math.min(this.audio.duration, seconds));
    }
  }

  setVolume(volumeFraction) {
    this.audio.volume = Math.max(0, Math.min(1, volumeFraction));
  }

  getCurrentTime() {
    return this.audio.currentTime || 0;
  }

  getDuration() {
    if (this.audio.duration && !isNaN(this.audio.duration) && this.audio.duration > 0) {
      return this.audio.duration;
    }
    return this.currentTrack?.duration || 200;
  }
}

export const ytController = new PureAudioEngine();
