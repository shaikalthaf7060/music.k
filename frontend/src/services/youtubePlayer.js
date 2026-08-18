/**
 * YouTube IFrame Online Music Engine for music.k
 * Streams 100% online audio directly from YouTube with 0 backend storage.
 */

// Instant verified YouTube Video IDs for top hits worldwide
const YT_CATALOG = new Map([
  // Global Hits
  ["blinding lights", "4NRXx6U8ABQ"],
  ["starboy", "dQTJ8sbm4Tg"],
  ["birds of a feather", "V9PVRfjEBTI"],
  ["not like us", "H58vbez_m4E"],
  ["lose yourself", "_Yhyp-_hX2s"],
  ["without me", "YVkUvmDQ3HY"],
  ["rap god", "XbGs_qK2PQA"],
  ["levitating", "TUVcZfQe-Kw"],
  ["faded", "60ItHLz5WEA"],
  ["fein", "UceaB44wvJ4"],
  ["fe!n", "UceaB44wvJ4"],
  ["cruel summer", "ic8j13piAhQ"],
  ["circles", "wXhTHyIgQ_U"],
  ["gods plan", "uxpDa-c-4Mc"],
  ["god's plan", "uxpDa-c-4Mc"],
  ["shape of you", "JGwWNGJdvx8"],
  ["yellow", "yKNxeF4KMsY"],
  ["viva la vida", "dvgZkm1xWPE"],
  ["the scientist", "RB-RcX5DS5A"],
  ["a sky full of stars", "VPRjCeoBqrI"],
  ["kesariya", "BddP6PYo2gs"],
  ["enna sona", "of3gZ_N-_a8"],
  ["apna bana le", "ElZfdU54Cp8"],
  ["tum hi ho", "IJq0yyWug1k"],
  ["believer", "7wtfhZwyrcc"],
  ["dynamite", "gdZLi9oWNZg"],
  ["in the end", "eVTXPUF4Oz4"],
  ["bohemian rhapsody", "fJ9rUzIMcZQ"],
  ["as it was", "H5v3kku4y6Q"],
  ["stay", "kTJczUoc26U"],
  ["bad guy", "DyDfgMOUjCI"],
  ["industry baby", "UTHLKHL_whs"],
  ["save your tears", "XXYlFuWEuKI"],
  ["heat waves", "mRD0-GxqHVo"],
  ["someone you loved", "zABLecsR5UE"],
  ["sunflower", "ApXoWvfEYVU"],
  ["lovely", "V1Pl8CzNzCw"],
  ["mockingbird", "S9bCLPwzSC0"]
]);

export function findOnlineYouTubeId(title, artist) {
  if (!title) return "4NRXx6U8ABQ";
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const cleanArtist = (artist || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const fullKey = `${cleanArtist} ${cleanTitle}`.trim();

  // 1. Direct match on full key or title
  for (const [key, id] of YT_CATALOG.entries()) {
    if (fullKey.includes(key) || cleanTitle.includes(key) || key.includes(cleanTitle)) {
      return id;
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
  }

  init(containerId = 'yt-music-iframe') {
    if (this.isReady && this.player) return;

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

    const el = document.getElementById(containerId);
    if (!el) return;

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
            console.warn('YouTube playback notice:', event.data);
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

  playTrack(track) {
    const vId = track.youtubeId || findOnlineYouTubeId(track.title, track.artist) || "4NRXx6U8ABQ";
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
    if (this.isReady && this.player && this.player.playVideo) {
      this.player.playVideo();
    }
  }

  pause() {
    if (this.isReady && this.player && this.player.pauseVideo) {
      this.player.pauseVideo();
    }
  }

  seekTo(seconds) {
    if (this.isReady && this.player && this.player.seekTo) {
      this.player.seekTo(seconds, true);
    }
  }

  setVolume(volumeFraction) {
    if (this.isReady && this.player && this.player.setVolume) {
      this.player.setVolume(Math.round(volumeFraction * 100));
    }
  }

  getCurrentTime() {
    if (this.isReady && this.player && this.player.getCurrentTime) {
      return this.player.getCurrentTime() || 0;
    }
    return 0;
  }

  getDuration() {
    if (this.isReady && this.player && this.player.getDuration) {
      return this.player.getDuration() || 0;
    }
    return 0;
  }
}

export const ytController = new YouTubePlayerController();
