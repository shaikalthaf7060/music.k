/**
 * YouTube IFrame API Controller & Accurate Video Resolver for music.k (Youtify Engine)
 * Controls background YouTube video playback, volume, seeking, and state sync.
 */

// Cache for resolved YouTube Video IDs
const YT_ID_CACHE = new Map([
  ["the weeknd blinding lights", "4NRXx6U8ABQ"],
  ["the weeknd ft. daft punk starboy", "dQTJ8sbm4Tg"],
  ["the weeknd starboy", "dQTJ8sbm4Tg"],
  ["billie eilish birds of a feather", "V9PVRfjEBTI"],
  ["kendrick lamar not like us", "H58vbez_m4E"],
  ["eminem lose yourself", "_Yhyp-_hX2s"],
  ["dua lipa levitating", "TUVcZfQe-Kw"],
  ["alan walker faded", "60ItHLz5WEA"],
  ["travis scott ft. playboi carti fe!n", "UceaB44wvJ4"],
  ["travis scott fein", "UceaB44wvJ4"],
  ["taylor swift cruel summer", "ic8j13piAhQ"],
  ["post malone circles", "wXhTHyIgQ_U"],
  ["drake gods plan", "uxpDa-c-4Mc"],
  ["ed sheeran shape of you", "JGwWNGJdvx8"],
  ["coldplay yellow", "yKNxeF4KMsY"],
  ["arijit singh kesariya", "BddP6PYo2gs"],
  ["bts dynamite", "gdZLi9oWNZg"],
  ["linkin park in the end", "eVTXPUF4Oz4"],
  ["imagine dragons believer", "7wtfhZwyrcc"],
  ["queen bohemian rhapsody", "fJ9rUzIMcZQ"]
]);

export async function resolveExactYouTubeId(title, artist) {
  if (!title) return "4NRXx6U8ABQ";
  const cleanKey = `${artist || ''} ${title}`.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

  // Check cache first
  for (const [key, id] of YT_ID_CACHE.entries()) {
    if (cleanKey.includes(key) || key.includes(cleanKey)) {
      return id;
    }
  }

  // Live YouTube Query via Invidious / Piped public search instances
  const searchEndpoints = [
    `https://inv.nadeko.net/api/v1/search?q=${encodeURIComponent(`${artist || ''} ${title} official audio`)}`,
    `https://invidious.nerdvpn.de/api/v1/search?q=${encodeURIComponent(`${artist || ''} ${title} audio`)}`,
    `https://vid.priv.au/api/v1/search?q=${encodeURIComponent(`${artist || ''} ${title}`)}`
  ];

  for (const endpoint of searchEndpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const video = data.find(item => item.type === 'video' || item.videoId);
          if (video && (video.videoId || video.id)) {
            const foundId = video.videoId || video.id;
            YT_ID_CACHE.set(cleanKey, foundId);
            return foundId;
          }
        }
      }
    } catch (e) {
      // Continue to next endpoint
    }
  }

  return null;
}

class YouTubePlayerController {
  constructor() {
    this.player = null;
    this.isReady = false;
    this.currentVideoId = null;
    this.listeners = new Set();
    this.pendingVideoId = null;
    this.htmlAudio = new Audio();
    this.htmlAudio.crossOrigin = "anonymous";
    this.isUsingHtmlAudio = false;
  }

  init(containerId = 'yt-player-iframe', onStateChange = null) {
    if (this.isReady && this.player) return;

    if (onStateChange) {
      this.listeners.add(onStateChange);
    }

    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        this.createPlayer(containerId);
      };
    } else {
      this.createPlayer(containerId);
    }
  }

  createPlayer(containerId) {
    if (this.player) return;

    try {
      this.player = new window.YT.Player(containerId, {
        height: '100%',
        width: '100%',
        videoId: this.pendingVideoId || '4NRXx6U8ABQ',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            this.isReady = true;
            if (this.pendingVideoId) {
              this.loadAndPlay(this.pendingVideoId);
              this.pendingVideoId = null;
            }
            this.notifyListeners('ready', event);
          },
          onStateChange: (event) => {
            this.notifyListeners('stateChange', event.data);
          },
          onError: (event) => {
            console.warn('YouTube Player Error:', event.data);
            this.notifyListeners('error', event.data);
          }
        }
      });
    } catch (e) {
      console.error('Failed to instantiate YouTube Player', e);
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(type, data) {
    this.listeners.forEach((listener) => {
      try {
        listener(type, data);
      } catch (e) {}
    });
  }

  async playTrackAccurate(track) {
    // 1. If track has direct previewUrl from search, start it immediately for 0-latency playback!
    if (track.previewUrl) {
      this.isUsingHtmlAudio = true;
      if (this.isReady && this.player && this.player.pauseVideo) {
        this.player.pauseVideo();
      }
      this.htmlAudio.src = track.previewUrl;
      try {
        await this.htmlAudio.play();
        this.notifyListeners('stateChange', 1);
      } catch (e) {}
    } else {
      this.isUsingHtmlAudio = false;
      this.htmlAudio.pause();
    }

    // 2. Resolve exact YouTube video ID
    let vId = track.youtubeId;
    if (!vId) {
      vId = await resolveExactYouTubeId(track.title, track.artist);
    }
    if (!vId) {
      vId = track.id.startsWith('yt-') ? track.youtubeId : '4NRXx6U8ABQ';
    }

    this.currentVideoId = vId;
    this.loadAndPlay(vId);
  }

  loadAndPlay(videoId) {
    this.currentVideoId = videoId;
    if (!this.isReady || !this.player || !this.player.loadVideoById) {
      this.pendingVideoId = videoId;
      return;
    }
    try {
      this.player.loadVideoById({
        videoId: videoId,
        suggestedQuality: 'small'
      });
      this.player.playVideo();
    } catch (err) {
      console.warn('Error loading video', err);
    }
  }

  play() {
    if (this.isUsingHtmlAudio && this.htmlAudio.src) {
      this.htmlAudio.play();
    }
    if (this.isReady && this.player && this.player.playVideo) {
      this.player.playVideo();
    }
  }

  pause() {
    if (this.isUsingHtmlAudio) {
      this.htmlAudio.pause();
    }
    if (this.isReady && this.player && this.player.pauseVideo) {
      this.player.pauseVideo();
    }
  }

  seekTo(seconds) {
    if (this.isUsingHtmlAudio) {
      this.htmlAudio.currentTime = seconds;
    }
    if (this.isReady && this.player && this.player.seekTo) {
      this.player.seekTo(seconds, true);
    }
  }

  setVolume(volumeFraction) {
    this.htmlAudio.volume = Math.max(0, Math.min(1, volumeFraction));
    if (this.isReady && this.player && this.player.setVolume) {
      this.player.setVolume(Math.round(volumeFraction * 100));
    }
  }

  getCurrentTime() {
    if (this.isUsingHtmlAudio && this.htmlAudio.currentTime) {
      return this.htmlAudio.currentTime;
    }
    if (this.isReady && this.player && this.player.getCurrentTime) {
      return this.player.getCurrentTime() || 0;
    }
    return 0;
  }

  getDuration() {
    if (this.isUsingHtmlAudio && this.htmlAudio.duration) {
      return this.htmlAudio.duration;
    }
    if (this.isReady && this.player && this.player.getDuration) {
      return this.player.getDuration() || 0;
    }
    return 0;
  }
}

export const ytController = new YouTubePlayerController();
