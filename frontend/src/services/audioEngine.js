/**
 * music.k Full-Length Audio Engine (Powered by YouTube Player)
 * Plays 100% full-length songs with 0 video visible to the user.
 */

class FullAudioStreamingEngine {
  constructor() {
    this.ytPlayer = null;
    this.isReady = false;
    this.pendingTrack = null;
    this.listeners = new Set();
    this.currentTrack = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 200;
    this.volume = 0.85;
    this.pollTimer = null;

    this.initPlayer();
  }

  initPlayer() {
    if (typeof window === 'undefined') return;

    // Ensure on-screen mount slot exists
    let dock = document.getElementById('musick-yt-dock');
    if (!dock) {
      dock = document.createElement('div');
      dock.id = 'musick-yt-dock';
      dock.style.cssText = 'position:fixed;bottom:0;right:0;width:200px;height:200px;opacity:0.01;z-index:-1;pointer-events:none;overflow:hidden;';
      const slot = document.createElement('div');
      slot.id = 'musick-yt-iframe-slot';
      dock.appendChild(slot);
      document.body.appendChild(dock);
    }

    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstTag = document.getElementsByTagName('script')[0];
      if (firstTag && firstTag.parentNode) {
        firstTag.parentNode.insertBefore(tag, firstTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const onReady = () => {
      try {
        this.ytPlayer = new window.YT.Player('musick-yt-iframe-slot', {
          height: '200',
          width: '200',
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            playsinline: 1,
            origin: window.location.origin
          },
          events: {
            onReady: () => {
              this.isReady = true;
              if (this.ytPlayer && this.ytPlayer.setVolume) {
                this.ytPlayer.setVolume(this.volume * 100);
              }
              if (this.pendingTrack) {
                const trk = this.pendingTrack;
                this.pendingTrack = null;
                this.playTrack(trk);
              }
            },
            onStateChange: (event) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
              if (event.data === 1) {
                this.isPlaying = true;
                this.startTimer();
                this.notify('stateChange', 1);
              } else if (event.data === 2) {
                this.isPlaying = false;
                this.stopTimer();
                this.notify('stateChange', 2);
              } else if (event.data === 0) {
                this.isPlaying = false;
                this.stopTimer();
                this.notify('stateChange', 0);
              }
            },
            onError: (err) => {
              console.warn('YouTube Player Notice:', err);
            }
          }
        });
      } catch (e) {
        console.warn('YT Player init error:', e);
      }
    };

    if (window.YT && window.YT.Player) {
      onReady();
    } else {
      window.onYouTubeIframeAPIReady = onReady;
    }
  }

  startTimer() {
    this.stopTimer();
    this.pollTimer = setInterval(() => {
      if (this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function') {
        try {
          const t = this.ytPlayer.getCurrentTime();
          const d = this.ytPlayer.getDuration() || this.currentTrack?.duration || 200;
          if (t !== undefined && !isNaN(t)) {
            this.currentTime = t;
            this.duration = d;
            this.notify('timeUpdate', { currentTime: t, duration: d });
          }
        } catch (e) {}
      }
    }, 350);
  }

  stopTimer() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
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

  async playTrack(track) {
    if (!track) return;
    this.currentTrack = track;
    this.currentTime = 0;
    this.duration = track.duration || 200;

    if (!this.isReady || !this.ytPlayer) {
      this.pendingTrack = track;
      return;
    }

    // 1. If track has youtubeId
    if (track.youtubeId) {
      this.loadVideo(track.youtubeId);
      return;
    }

    // 2. Fetch YouTube videoId via fast public resolver
    const q = `${track.title} ${track.artist}`.trim();
    try {
      const vid = await this.resolveVideoId(q);
      if (vid) {
        track.youtubeId = vid;
        this.loadVideo(vid);
        return;
      }
    } catch (e) {}

    // 3. Built-in YouTube Search Playlist
    try {
      if (this.ytPlayer && typeof this.ytPlayer.loadPlaylist === 'function') {
        this.ytPlayer.loadPlaylist({
          list: q,
          listType: 'search',
          index: 0,
          startSeconds: 0
        });
        this.isPlaying = true;
        this.notify('stateChange', 1);
      }
    } catch (e) {
      console.warn('YT search playlist error:', e);
    }
  }

  loadVideo(videoId) {
    if (!this.ytPlayer) return;
    try {
      if (typeof this.ytPlayer.loadVideoById === 'function') {
        this.ytPlayer.loadVideoById({
          videoId: videoId,
          startSeconds: 0
        });
        if (typeof this.ytPlayer.playVideo === 'function') {
          this.ytPlayer.playVideo();
        }
        this.isPlaying = true;
        this.notify('stateChange', 1);
      }
    } catch (e) {
      console.warn('loadVideoById notice:', e);
    }
  }

  async resolveVideoId(query) {
    const urls = [
      `https://invidious.nerdvpn.de/api/v1/search?q=${encodeURIComponent(query + ' audio')}&type=video`,
      `https://inv.nadeko.net/api/v1/search?q=${encodeURIComponent(query + ' audio')}&type=video`,
      `https://pipedapi.kavin.rocks/search?q=${encodeURIComponent(query + ' audio')}&filter=videos`
    ];

    for (const url of urls) {
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0 && data[0].videoId) {
            return data[0].videoId;
          }
          if (data.items && data.items.length > 0 && data.items[0].url) {
            const m = data.items[0].url.match(/v=([a-zA-Z0-9_-]{11})/);
            if (m) return m[1];
          }
        }
      } catch (e) {}
    }
    return null;
  }

  play() {
    if (this.ytPlayer && typeof this.ytPlayer.playVideo === 'function') {
      try { this.ytPlayer.playVideo(); } catch (e) {}
    }
    this.isPlaying = true;
    this.notify('stateChange', 1);
  }

  pause() {
    if (this.ytPlayer && typeof this.ytPlayer.pauseVideo === 'function') {
      try { this.ytPlayer.pauseVideo(); } catch (e) {}
    }
    this.isPlaying = false;
    this.notify('stateChange', 2);
  }

  seekTo(seconds) {
    const sec = Math.max(0, parseFloat(seconds));
    this.currentTime = sec;
    if (this.ytPlayer && typeof this.ytPlayer.seekTo === 'function') {
      try { this.ytPlayer.seekTo(sec, true); } catch (e) {}
    }
  }

  setVolume(fraction) {
    const vol = Math.max(0, Math.min(1, parseFloat(fraction)));
    this.volume = vol;
    if (this.ytPlayer && typeof this.ytPlayer.setVolume === 'function') {
      try { this.ytPlayer.setVolume(vol * 100); } catch (e) {}
    }
  }

  getCurrentTime() {
    if (this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function') {
      try { return this.ytPlayer.getCurrentTime() || this.currentTime; } catch (e) {}
    }
    return this.currentTime;
  }

  getDuration() {
    if (this.ytPlayer && typeof this.ytPlayer.getDuration === 'function') {
      try {
        const d = this.ytPlayer.getDuration();
        if (d && d > 0) return d;
      } catch (e) {}
    }
    return this.currentTrack?.duration || 200;
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

export const audioEngine = new FullAudioStreamingEngine();
export const ytController = audioEngine;
