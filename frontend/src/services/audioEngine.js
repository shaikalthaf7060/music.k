/**
 * music.k Ultra-Reliable Native HTML5 Audio Engine
 * Synchronous, instant user-action playback across all mobile & desktop browsers.
 */

class SynchronousAudioEngine {
  constructor() {
    this.audio = typeof Audio !== 'undefined' ? new Audio() : null;
    this.currentTrack = null;
    this.listeners = new Set();
    this.isPlaying = false;
    this.volume = 0.85;

    if (this.audio) {
      this.audio.preload = 'auto';
      this.audio.volume = this.volume;

      // Handle native audio playback events
      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify('stateChange', 1);
      });

      this.audio.addEventListener('playing', () => {
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
        const cur = this.audio.currentTime || 0;
        const dur = this.audio.duration || this.currentTrack?.duration || 30;
        this.notify('timeUpdate', {
          currentTime: cur,
          duration: dur
        });
      });

      this.audio.addEventListener('error', (e) => {
        console.error('HTML5 Audio playback error details:', this.audio.error, e);
      });
    }
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

  /**
   * Synchronous Playback to strictly satisfy browser Autoplay Security Policies
   */
  playTrack(track) {
    if (!track || !this.audio) return;
    this.currentTrack = track;

    const streamUrl = track.audioUrl || track.previewUrl;

    if (streamUrl) {
      try {
        this.audio.pause();
        this.audio.src = streamUrl;
        this.audio.currentTime = 0;
        
        // Immediate play call within user-event tick
        const promise = this.audio.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              this.isPlaying = true;
              this.notify('stateChange', 1);
            })
            .catch(err => {
              console.warn('Audio play request notice (autoplay token):', err);
              // Fallback retry
              setTimeout(() => {
                if (this.audio && this.audio.paused) {
                  this.audio.play().catch(() => {});
                }
              }, 100);
            });
        }
      } catch (err) {
        console.error('Audio element execution error:', err);
      }
    } else {
      // If URL missing, fetch and load
      const q = `${track.title} ${track.artist}`.trim();
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=1`)
        .then(res => res.json())
        .then(data => {
          if (data.results && data.results.length > 0 && data.results[0].previewUrl) {
            const url = data.results[0].previewUrl;
            track.audioUrl = url;
            if (this.currentTrack?.id === track.id) {
              this.audio.src = url;
              this.audio.play().catch(() => {});
            }
          }
        })
        .catch(err => {
          console.warn('Lookup error:', err);
        });
    }
  }

  play() {
    if (this.audio) {
      const promise = this.audio.play();
      if (promise !== undefined) {
        promise.then(() => {
          this.isPlaying = true;
          this.notify('stateChange', 1);
        }).catch(() => {});
      }
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify('stateChange', 2);
    }
  }

  seekTo(seconds) {
    if (this.audio) {
      const sec = Math.max(0, parseFloat(seconds));
      if (!isNaN(sec)) {
        this.audio.currentTime = sec;
      }
    }
  }

  setVolume(fraction) {
    const vol = Math.max(0, Math.min(1, parseFloat(fraction)));
    this.volume = vol;
    if (this.audio) {
      this.audio.volume = vol;
    }
  }

  getCurrentTime() {
    return this.audio ? (this.audio.currentTime || 0) : 0;
  }

  getDuration() {
    return this.audio ? (this.audio.duration || this.currentTrack?.duration || 30) : 30;
  }

  getFrequencyData() {
    const data = new Uint8Array(64);
    for (let i = 0; i < 64; i++) {
      data[i] = this.isPlaying ? Math.floor(60 + Math.sin(Date.now() / 150 + i * 0.4) * 50) : 10;
    }
    return data;
  }

  getWaveformData() {
    const data = new Uint8Array(64);
    for (let i = 0; i < 64; i++) {
      data[i] = this.isPlaying ? Math.floor(128 + Math.sin(Date.now() / 100 + i * 0.3) * 60) : 128;
    }
    return data;
  }

  init() {
    // Initialized hook
  }
}

export const audioEngine = new SynchronousAudioEngine();
export const ytController = audioEngine;
