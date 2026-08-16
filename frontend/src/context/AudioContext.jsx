import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { ONLINE_CHARTS, fetchOnlineLyrics } from '../services/api';
import confetti from 'canvas-confetti';

const AudioContext = createContext();

const API_BASE = "http://localhost:8000";

export const EQ_PRESETS = {
  "Bass Boost": [8, 5, 1, -1, -2],
  "EDM Crimson": [6, 4, 0, 3, 5],
  "Pop Vocal": [-2, 1, 5, 3, 1],
  "Lo-Fi Mellow": [4, 2, -2, -4, -6],
  "Flat": [0, 0, 0, 0, 0]
};

export function AudioProvider({ children }) {
  const [tracks, setTracks] = useState(ONLINE_CHARTS);
  const [currentTrack, setCurrentTrack] = useState(ONLINE_CHARTS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(ONLINE_CHARTS[0].duration || 200);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.85);
  const [queue, setQueue] = useState(ONLINE_CHARTS.slice(1));
  const [history, setHistory] = useState([]);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  
  // Auth state
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('musick_auth_token') || '');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('musick_user_profile');
    return saved ? JSON.parse(saved) : {
      id: "guest_01",
      name: "VIP Red Member",
      email: "listener@musick.stream",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=musickvip",
      tier: "VIP Red Premium"
    };
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [likedTrackIds, setLikedTrackIds] = useState(() => {
    const saved = localStorage.getItem('musick_liked_tracks');
    return saved ? JSON.parse(saved) : ['chart-01', 'chart-02', 'chart-04'];
  });
  
  const [currentView, setCurrentView] = useState('home');
  const [viewParam, setViewParam] = useState(null);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  const [activeLyrics, setActiveLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

  const [activeEqPreset, setActiveEqPreset] = useState("EDM Crimson");
  const [eqBands, setEqBands] = useState(EQ_PRESETS["EDM Crimson"]);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    localStorage.setItem('musick_liked_tracks', JSON.stringify(likedTrackIds));
    if (authToken) {
      fetch(`${API_BASE}/api/user/sync-likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(likedTrackIds)
      }).catch(() => {});
    }
  }, [likedTrackIds, authToken]);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('musick_auth_token', authToken);
    } else {
      localStorage.removeItem('musick_auth_token');
    }
  }, [authToken]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('musick_user_profile', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Setup Audio element event listeners
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeatMode, currentTrack, volume]);

  // Sync active lyric line
  useEffect(() => {
    if (!activeLyrics || activeLyrics.length === 0) {
      setCurrentLyricIndex(-1);
      return;
    }
    let matchedIndex = -1;
    for (let i = 0; i < activeLyrics.length; i++) {
      if (currentTime >= activeLyrics[i].time) {
        matchedIndex = i;
      } else {
        break;
      }
    }
    setCurrentLyricIndex(matchedIndex);
  }, [currentTime, activeLyrics]);

  // Load lyrics when currentTrack changes
  useEffect(() => {
    if (currentTrack) {
      fetchOnlineLyrics(currentTrack).then(res => {
        setActiveLyrics(res.lyrics || []);
      });
    }
  }, [currentTrack]);

  // 100% Ad-Free YouTube Music Full Song Playback
  const playTrack = useCallback(async (track, playlistContext = null) => {
    if (playlistContext) {
      const nextInList = playlistContext.filter(t => t.id !== track.id);
      setQueue(nextInList);
    }

    if (currentTrack && currentTrack.id !== track.id) {
      setHistory(prev => [currentTrack, ...prev.slice(0, 19)]);
    }

    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(track.duration || 200);

    const audio = audioRef.current;
    audio.pause();

    // 1. Fetch full-length ad-free stream from YouTube Music backend
    try {
      const q = `${track.artist} ${track.title}`;
      const res = await fetch(`${API_BASE}/api/stream?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const streamData = await res.json();
        if (streamData.streamUrl) {
          audio.src = streamData.streamUrl;
          if (streamData.duration) {
            setDuration(streamData.duration);
          }
          await audio.play();
          setIsPlaying(true);
          return;
        }
      }
    } catch (err) {
      console.warn("Backend stream fetch fallback:", err);
    }

    // 2. Fallback to direct audioUrl
    if (track.audioUrl) {
      audio.src = track.audioUrl;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [currentTrack]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio.src && currentTrack) {
        playTrack(currentTrack);
        return;
      }
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying, currentTrack, playTrack]);

  const nextTrack = useCallback(() => {
    if (queue.length > 0) {
      let nextIndex = 0;
      if (isShuffle) {
        nextIndex = Math.floor(Math.random() * queue.length);
      }
      const nextSong = queue[nextIndex];
      const remaining = queue.filter((_, i) => i !== nextIndex);
      setQueue(remaining);
      playTrack(nextSong);
    } else if (repeatMode === 'all') {
      const allTracks = tracks.filter(t => t.id !== currentTrack.id);
      if (allTracks.length > 0) {
        setQueue(allTracks.slice(1));
        playTrack(allTracks[0]);
      }
    } else {
      setIsPlaying(false);
    }
  }, [queue, isShuffle, repeatMode, tracks, currentTrack, playTrack]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    if (history.length > 0) {
      const prevSong = history[0];
      setHistory(prev => prev.slice(1));
      setQueue(prev => [currentTrack, ...prev]);
      playTrack(prevSong);
    } else {
      audio.currentTime = 0;
      setCurrentTime(0);
    }
  }, [history, currentTrack, playTrack]);

  const seek = useCallback((timeInSeconds) => {
    const audio = audioRef.current;
    audio.currentTime = timeInSeconds;
    setCurrentTime(timeInSeconds);
  }, []);

  const setVolume = useCallback((val) => {
    const v = parseFloat(val);
    setVolumeState(v);
    setIsMuted(v === 0);
    audioRef.current.volume = Math.max(0, Math.min(1, v));
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (isMuted) {
      setIsMuted(false);
      const restored = prevVolume || 0.85;
      setVolumeState(restored);
      audio.volume = restored;
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      setVolumeState(0);
      audio.volume = 0;
    }
  }, [isMuted, prevVolume, volume]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  const toggleLike = useCallback((trackId) => {
    setLikedTrackIds(prev => {
      const exists = prev.includes(trackId);
      if (!exists) {
        try {
          confetti({
            particleCount: 45,
            spread: 65,
            origin: { y: 0.9, x: 0.15 },
            colors: ['#FF2A3A', '#E50914', '#ffffff', '#990000']
          });
        } catch (e) {}
        return [...prev, trackId];
      } else {
        return prev.filter(id => id !== trackId);
      }
    });
  }, []);

  // Authentication Handlers
  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Login failed');
    }
    const data = await res.json();
    setAuthToken(data.token);
    setCurrentUser(data.user);
    if (data.user.likedTracks && data.user.likedTracks.length > 0) {
      setLikedTrackIds(data.user.likedTracks);
    }
    return data.user;
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Registration failed');
    }
    const data = await res.json();
    setAuthToken(data.token);
    setCurrentUser(data.user);
    return data.user;
  };

  const logout = () => {
    setAuthToken('');
    setCurrentUser({
      id: "guest_01",
      name: "Guest Listener",
      email: "guest@musick.stream",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=guest",
      tier: "Free Listener"
    });
  };

  const setEqualizerBand = useCallback((index, valueDb) => {
    setEqBands(prev => {
      const updated = [...prev];
      updated[index] = valueDb;
      return updated;
    });
    setActiveEqPreset("Custom");
  }, []);

  const applyEqPreset = useCallback((presetName) => {
    if (EQ_PRESETS[presetName]) {
      setActiveEqPreset(presetName);
      setEqBands(EQ_PRESETS[presetName]);
    }
  }, []);

  const navigateTo = useCallback((view, param = null) => {
    setCurrentView(view);
    setViewParam(param);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        tracks,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        queue,
        history,
        isShuffle,
        repeatMode,
        likedTrackIds,
        currentUser,
        authToken,
        isAuthModalOpen,
        currentView,
        viewParam,
        isLyricsOpen,
        isVisualizerOpen,
        isEqualizerOpen,
        isQueueOpen,
        activeLyrics,
        currentLyricIndex,
        activeEqPreset,
        eqBands,
        playTrack,
        togglePlay,
        seek,
        setVolume,
        toggleMute,
        nextTrack,
        prevTrack,
        toggleShuffle,
        toggleRepeat,
        toggleLike,
        login,
        register,
        logout,
        setIsAuthModalOpen,
        setEqualizerBand,
        applyEqPreset,
        navigateTo,
        setIsLyricsOpen,
        setIsVisualizerOpen,
        setIsEqualizerOpen,
        setIsQueueOpen,
        setQueue
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
