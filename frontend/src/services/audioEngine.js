/**
 * music.k Native HTML5 Pure Audio Streaming Engine
 * 100% Direct Audio Streaming in the browser (Zero video, Zero iframes, Zero backend storage).
 */

class AudioStreamEngine {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.crossOrigin = 'anonymous';
    this.listeners = new Set();
    this.currentTrack = null;
    this.isPlaying = false;

    // Attach native HTML5 audio events
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

    this.audio.addEventListener('timeupdate', () => {
      this.notify('timeUpdate', {
        currentTime: this.audio.currentTime,
        duration: this.currentTrack?.duration || this.audio.duration || 200
      });
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Audio playback event:', e);
    });
  }

  init() {
    // Initialized hook
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

    // 1. If track already has direct audio URL
    const streamUrl = track.audioUrl || track.previewUrl;
    if (streamUrl) {
      this.startAudio(streamUrl);
      return;
    }

    // 2. Fallback real-time online query for missing audioUrl
    const query = encodeURIComponent(`${track.artist || ''} ${track.title || ''}`.trim());
    fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0 && data.results[0].previewUrl) {
          this.startAudio(data.results[0].previewUrl);
        }
      })
      .catch(err => {
        console.warn('Audio lookup notice:', err);
      });
  }

  startAudio(url) {
    try {
      this.audio.pause();
      this.audio.src = url;
      this.audio.load();
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify('stateChange', 1);
          })
          .catch(err => {
            console.warn('Audio play request notice:', err);
          });
      }
    } catch (err) {
      console.warn('Audio element error:', err);
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

  setVolume(fraction) {
    this.audio.volume = Math.max(0, Math.min(1, parseFloat(fraction)));
  }

  getCurrentTime() {
    return this.audio.currentTime || 0;
  }

  getDuration() {
    return this.currentTrack?.duration || this.audio.duration || 200;
  }
}

export const audioEngine = new AudioStreamEngine();
export const ytController = audioEngine;
