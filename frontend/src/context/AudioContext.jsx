import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { ONLINE_CHARTS, fetchOnlineLyrics } from '../services/api';
import confetti from 'canvas-confetti';

const AudioContext = createContext();

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
  const [likedTrackIds, setLikedTrackIds] = useState(() => {
    const saved = localStorage.getItem('musick_liked_tracks');
    return saved ? JSON.parse(saved) : ['track-01', 'track-02', 'track-04'];
  });
  
  const [customPlaylists, setCustomPlaylists] = useState(() => {
    const saved = localStorage.getItem('musick_custom_playlists');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: "custom-01",
        title: "Crimson Adrenaline Mix 🔴",
        description: "Pure energy hits streamed live online with zero ads",
        coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
        tracks: ["track-01", "track-02", "track-05"]
      }
    ];
  });

  const [currentView, setCurrentView] = useState('home');
  const [viewParam, setViewParam] = useState(null);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);

  const [activeLyrics, setActiveLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

  const [activeEqPreset, setActiveEqPreset] = useState("EDM Crimson");
  const [eqBands, setEqBands] = useState(EQ_PRESETS["EDM Crimson"]);

  // Bulletproof HTML5 Audio instance
  const audioRef = useRef(new Audio());
  const audioInitializedRef = useRef(false);

  useEffect(() => {
    localStorage.setItem('musick_liked_tracks', JSON.stringify(likedTrackIds));
  }, [likedTrackIds]);

  useEffect(() => {
    localStorage.setItem('musick_custom_playlists', JSON.stringify(customPlaylists));
  }, [customPlaylists]);

  // Setup Audio element event listeners
  useEffect(() => {
    const audio = audioRef.current;
    audio.crossOrigin = "anonymous";
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

    const handleError = (e) => {
      console.warn("Audio source fallback triggered", e);
      // Fallback from local file to remote CDN or vice versa
      if (currentTrack && currentTrack.audioUrl && audio.src !== currentTrack.audioUrl) {
        audio.src = currentTrack.audioUrl;
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
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

  // Play a specific track (Instant, Guaranteed Audio Playback)
  const playTrack = useCallback((track, playlistContext = null) => {
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
    // Prefer local audio if downloaded, fallback to remote streaming URL
    audio.src = track.localAudio || track.audioUrl;
    audio.load();

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.warn("Primary source playback failed, trying remote url", err);
          if (track.audioUrl && audio.src !== track.audioUrl) {
            audio.src = track.audioUrl;
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    }
  }, [currentTrack]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio.src && currentTrack) {
        audio.src = currentTrack.localAudio || currentTrack.audioUrl;
      }
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying, currentTrack]);

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

  const createPlaylist = useCallback((title, description = "") => {
    const newId = `custom-${Date.now()}`;
    const newPl = {
      id: newId,
      title: title || "My Red Playlist",
      description: description || "Curated in music.k",
      coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
      tracks: [currentTrack ? currentTrack.id : 'track-01']
    };
    setCustomPlaylists(prev => [newPl, ...prev]);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF2A3A', '#E50914', '#FFD700']
      });
    } catch (e) {}
    return newPl;
  }, [currentTrack]);

  const addTrackToPlaylist = useCallback((playlistId, trackId) => {
    setCustomPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId) {
        if (!pl.tracks.includes(trackId)) {
          return { ...pl, tracks: [...pl.tracks, trackId] };
        }
      }
      return pl;
    }));
  }, []);

  const removeTrackFromPlaylist = useCallback((playlistId, trackId) => {
    setCustomPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId) {
        return { ...pl, tracks: pl.tracks.filter(id => id !== trackId) };
      }
      return pl;
    }));
  }, []);

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
        customPlaylists,
        currentView,
        viewParam,
        isLyricsOpen,
        isVisualizerOpen,
        isEqualizerOpen,
        isQueueOpen,
        isCreatePlaylistOpen,
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
        createPlaylist,
        addTrackToPlaylist,
        removeTrackFromPlaylist,
        setEqualizerBand,
        applyEqPreset,
        navigateTo,
        setIsLyricsOpen,
        setIsVisualizerOpen,
        setIsEqualizerOpen,
        setIsQueueOpen,
        setIsCreatePlaylistOpen,
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
