/**
 * YouTube IFrame API Controller for music.k (Youtify Engine)
 * Controls background YouTube video playback, volume, seeking, and state sync.
 */

class YouTubePlayerController {
  constructor() {
    this.player = null;
    this.isReady = false;
    this.currentVideoId = null;
    this.listeners = new Set();
    this.pollInterval = null;
    this.pendingVideoId = null;
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
        videoId: this.pendingVideoId || '4NRXx6U8ABQ', // Default: The Weeknd - Blinding Lights
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
            // YT.PlayerState: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
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
      // YouTube volume is 0-100
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
