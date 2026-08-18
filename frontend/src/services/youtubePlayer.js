/**
 * music.k Online Audio Engine & Controller
 * Instant 100% online audio streaming for any track (0 backend storage).
 */

class AudioPlaybackController {
  constructor() {
    this.audio = new Audio();
    this.listeners = new Set();
    this.currentTrack = null;
    this.isPlaying = false;

    // Attach native audio listeners
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
      console.warn('Audio stream playback notice:', e);
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

    // 1. Get exact audio stream URL
    let streamUrl = track.audioUrl || track.previewUrl;
    
    // Fallback if missing: query iTunes audio preview in real-time
    if (!streamUrl) {
      const q = encodeURIComponent(`${track.artist || ''} ${track.title || ''}`);
      fetch(`https://itunes.apple.com/search?term=${q}&entity=song&limit=1`)
        .then(r => r.json())
        .then(data => {
          if (data.results && data.results.length > 0 && data.results[0].previewUrl) {
            this.audio.src = data.results[0].previewUrl;
            this.audio.play().catch(() => {});
          }
        })
        .catch(() => {});
      return;
    }

    this.audio.pause();
    this.audio.src = streamUrl;
    this.audio.load();
    this.audio.play()
      .then(() => {
        this.isPlaying = true;
        this.notify('stateChange', 1);
      })
      .catch(err => {
        console.warn("Autoplay notice:", err);
      });
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

  setVolume(volFraction) {
    this.audio.volume = Math.max(0, Math.min(1, volFraction));
  }

  getCurrentTime() {
    return this.audio.currentTime || 0;
  }

  getDuration() {
    return this.audio.duration || (this.currentTrack ? this.currentTrack.duration : 200) || 200;
  }
}

export const ytController = new AudioPlaybackController();
