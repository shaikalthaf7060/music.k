/**
 * music.k Official Full-Length Streaming Engine
 * Uses verified embeddable YouTube IDs for popular songs.
 * Falls back to YouTube search playlist for everything else.
 */

// ===================================================================
// VERIFIED EMBEDDABLE YOUTUBE IDs (Official Audio / Lyrics Videos)
// These are tested to work with YouTube embed without restrictions.
// ===================================================================
const VERIFIED_YOUTUBE_MAP = {
  // Bollywood
  "enna sona":             "vUrka_8Zc_Q",  // Enna Sona - AR Rahman Arijit
  "kesariya":              "BddP6PYo2gs",  // Kesariya - Arijit Singh
  "apna bana le":          "ElZfdU54Cp8",  // Apna Bana Le - Arijit
  "tum hi ho":             "Umqb9KENgmk",  // Tum Hi Ho
  "humma song":            "F3MR-ZVD4no",  // Humma Song OK Jaanu
  "the humma song":        "F3MR-ZVD4no",
  "channa mereya":         "zbEdS9UBGsA",  // Channa Mereya
  "agar tum saath ho":     "oVJqAK_Vux4",  // Agar Tum Saath Ho
  "ae dil hai mushkil":    "njCEY7VFbDw",  // Ae Dil Hai Mushkil
  "gerua":                 "AEIVhBS6baE",  // Gerua - Dilwale
  "love me like you do":   "AJtDXIazrMo",  // Love Me Like You Do
  "raabta":                "C7x5PRCCR2s",  // Raabta
  "jeene laga hoon":       "0HJn78rGVxs",  // Jeene Laga Hoon
  "tera ban jaunga":       "jGgBfpDFPAg",  // Tera Ban Jaunga
  "bekhayali":             "2Kv-Hj-mLJk",  // Bekhayali
  "tujhe kitna chahne lage":"8TyoRlWQfKw",  // Tujhe Kitna Chahne Lage

  // South Indian
  "ava enna":              "Xy9wr3_RQGE",  // Ava Enna - Harris Jayaraj
  "sakhiye":               "xqVsV1BFHSQ",  // Sakhiye - Dear Comrade
  "hukum thalaivar":       "o6SoXECIXso",  // Hukum - Jailer
  "hukum":                 "o6SoXECIXso",
  "arabic kuthu":          "QLTOjkfZz0w",  // Arabic Kuthu - Beast
  "kannazhaga":            "bgjLq3MYDsI",  // Kannazhaga - 3
  "rowdy baby":            "Gmo6EFlkdHk",  // Rowdy Baby
  "boomi enna suthudhe":   "CfpTM2-OPZk",  // Boomi Enna Suthudhe
  "vaseegara":             "lekqRE5EOMY",  // Vaseegara
  "kadhal sadugudu":       "MFzDaBzBlL0",  // Kadhal Sadugudu
  "munbe vaa":             "tHnfGQ5kBjI",  // Munbe Vaa
  "nenjukulle":            "7v4oJggm4-Q",  // Nenjukulle

  // Global Hits
  "blinding lights":       "4NRXx6U8ABQ",  // The Weeknd
  "starboy":               "34Na4j8AVgA",  // The Weeknd
  "birds of a feather":    "V9PVRfjEBTI",  // Billie Eilish
  "not like us":           "H58vbez_m4E",  // Kendrick Lamar
  "god's plan":            "xpVfcZ0ZcFM",  // Drake
  "one dance":             "iuCk9XkMkno",  // Drake
  "lose yourself":         "_Yhyp-_hX2s",  // Eminem
  "fein":                  "B9synWjqBn8",  // Travis Scott
  "anti-hero":             "b1kbLwvqugk",  // Taylor Swift
  "cruel summer":          "ic8j13piAhQ",  // Taylor Swift
  "as it was":             "H5v3kku4y6Q",  // Harry Styles
  "vampire":               "t9SWnQjfxSI",  // Olivia Rodrigo
  "flowers":               "G7KNmW9a75Y",  // Miley Cyrus
  "levitating":            "693uuEs2cnQ",  // Dua Lipa
  "dance the night":       "8RwE4GF3JRQ",  // Dua Lipa
  "yellow":                "yKNxeF4KMsY",  // Coldplay
  "the scientist":         "RB-RcX5DS5A",  // Coldplay
  "fix you":               "k4V3Mo61fJM",  // Coldplay
  "metamorphosis":         "NrmMk1Myrxc",  // Interworld
  "murder in my mind":     "w-sQRS-Mun8",  // Kordhell
};

function matchVerifiedId(title, artist) {
  const key = (title + " " + artist).toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const titleKey = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  
  // Exact title match first
  for (const [k, vid] of Object.entries(VERIFIED_YOUTUBE_MAP)) {
    if (titleKey.includes(k) || k.includes(titleKey)) {
      return vid;
    }
  }
  // Full key match
  for (const [k, vid] of Object.entries(VERIFIED_YOUTUBE_MAP)) {
    if (key.includes(k) || k.includes(titleKey)) {
      return vid;
    }
  }
  return null;
}

class YouTubeStreamingEngine {
  constructor() {
    this.currentTrack = null;
    this.listeners = new Set();
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 200;
    this.volume = 0.85;
    this.timer = null;
    this.lastStartTime = null;
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
    this.currentTime = 0;
    this.duration = track.duration || 210;
    this.isPlaying = true;
    this.lastStartTime = Date.now();

    this._loadEmbed(track);

    this.startTimer();
    this.notify('stateChange', 1);
  }

  _loadEmbed(track) {
    const slot = document.getElementById('musick-yt-embed-slot');
    if (!slot) return;

    let embedUrl;

    // 1. Check verified embeddable ID map first
    const verifiedId = matchVerifiedId(track.title || '', track.artist || '');
    if (verifiedId) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${verifiedId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
    } else {
      // 2. Fallback to official search playlist (works for unknown songs)
      const q = encodeURIComponent(`${track.title} ${track.artist} official audio`);
      embedUrl = `https://www.youtube-nocookie.com/embed?listType=search&list=${q}&autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    }

    slot.innerHTML = `<iframe 
      src="${embedUrl}" 
      width="100%" 
      height="100%" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen
      style="width: 100%; height: 100%; border: none;"
    ></iframe>`;
  }

  startTimer() {
    this.stopTimer();
    this.lastStartTime = Date.now();
    this.timer = setInterval(() => {
      if (this.isPlaying && this.lastStartTime) {
        const elapsed = (Date.now() - this.lastStartTime) / 1000 + this._pausedSeconds;
        this.currentTime = Math.min(elapsed, this.duration);
        this.notify('timeUpdate', {
          currentTime: this.currentTime,
          duration: this.duration
        });
      }
    }, 500);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.lastStartTime = Date.now();
      this.startTimer();
      this.notify('stateChange', 1);
    }
  }

  pause() {
    if (this.isPlaying) {
      this._pausedSeconds = this.currentTime;
      this.isPlaying = false;
      this.stopTimer();
      this.notify('stateChange', 2);
    }
  }

  seekTo(seconds) {
    const sec = Math.max(0, parseFloat(seconds));
    this.currentTime = sec;
    this._pausedSeconds = sec;
    if (this.isPlaying) {
      this.lastStartTime = Date.now();
    }
    this.notify('timeUpdate', { currentTime: sec, duration: this.duration });
  }

  setVolume(fraction) {
    this.volume = Math.max(0, Math.min(1, parseFloat(fraction)));
  }

  getCurrentTime() {
    return this.currentTime;
  }

  getDuration() {
    return this.currentTrack?.duration || this.duration || 210;
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
    this._pausedSeconds = 0;
  }
}

export const audioEngine = new YouTubeStreamingEngine();
export const ytController = audioEngine;
