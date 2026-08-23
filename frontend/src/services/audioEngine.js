/**
 * music.k Pure Native Audio Streaming Engine
 * 100% Pure Audio Interface (Zero Video / Zero Iframes / Instant Playback).
 */

class PureNativeAudioEngine {
  constructor() {
    this.audio = typeof Audio !== 'undefined' ? new Audio() : null;
    this.currentTrack = null;
    this.listeners = new Set();
    this.isPlaying = false;
    this.volume = 0.85;
    this.currentTime = 0;
    this.duration = 200;

    if (this.audio) {
      this.audio.preload = 'auto';
      this.audio.volume = this.volume;

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
        this.currentTime = this.audio.currentTime || 0;
        this.duration = this.audio.duration || this.currentTrack?.duration || 200;
        this.notify('timeUpdate', {
          currentTime: this.currentTime,
          duration: this.duration
        });
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio streaming notice:', e);
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

  playTrack(track) {
    if (!track || !this.audio) return;
    this.currentTrack = track;
    this.currentTime = 0;
    this.duration = track.duration || 200;

    const streamUrl = track.audioUrl || track.previewUrl;

    if (streamUrl) {
      try {
        this.audio.pause();
        this.audio.src = streamUrl;
        this.audio.currentTime = 0;
        const p = this.audio.play();
        if (p !== undefined) {
          p.then(() => {
            this.isPlaying = true;
            this.notify('stateChange', 1);
          }).catch(err => {
            console.warn('Audio play request notice:', err);
          });
        }
      } catch (e) {
        console.warn('Stream setup error:', e);
      }
    } else {
      // Lookup stream URL
      const q = `${track.title} ${track.artist}`.trim();
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=1`)
        .then(r => r.json())
        .then(d => {
          if (d.results && d.results.length > 0 && d.results[0].previewUrl) {
            const url = d.results[0].previewUrl;
            track.audioUrl = url;
            if (this.currentTrack?.id === track.id) {
              this.audio.src = url;
              this.audio.play().catch(() => {});
            }
          }
        })
        .catch(() => {});
    }
  }

  play() {
    if (this.audio) {
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.notify('stateChange', 1);
      }).catch(() => {});
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
      const s = Math.max(0, parseFloat(seconds));
      if (!isNaN(s)) {
        this.audio.currentTime = s;
        this.currentTime = s;
      }
    }
  }

  setVolume(fraction) {
    const v = Math.max(0, Math.min(1, parseFloat(fraction)));
    this.volume = v;
    if (this.audio) {
      this.audio.volume = v;
    }
  }

  getCurrentTime() {
    return this.audio ? (this.audio.currentTime || 0) : 0;
  }

  getDuration() {
    return this.audio ? (this.audio.duration || this.currentTrack?.duration || 200) : 200;
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

export const audioEngine = new PureNativeAudioEngine();
export const ytController = audioEngine;
