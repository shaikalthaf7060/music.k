import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ytController } from '../services/youtubePlayer';
import { audioEngine } from '../services/synthAudio';
import { ONLINE_CHARTS, ONLINE_PLAYLISTS, fetchOnlineLyrics } from '../services/api';
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
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'all', 'one'
  const [likedTrackIds, setLikedTrackIds] = useState(() => {
    const saved = localStorage.getItem('musick_liked_tracks');
    return saved ? JSON.parse(saved) : ['yt-01', 'yt-02', 'yt-04'];
  });
  
  // Custom user playlists (saved in localStorage)
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
        tracks: ["yt-01", "yt-02", "yt-05"]
      }
    ];
  });

  // Views & Modals state
  const [currentView, setCurrentView] = useState('home'); // 'home', 'search', 'library', 'playlist', 'liked'
  const [viewParam, setViewParam] = useState(null);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Lyrics state
  const [activeLyrics, setActiveLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

  // Equalizer state
  const [activeEqPreset, setActiveEqPreset] = useState("EDM Crimson");
  const [eqBands, setEqBands] = useState(EQ_PRESETS["EDM Crimson"]);

  const pollTimerRef = useRef(null);

  // Save liked tracks & playlists to localStorage
  useEffect(() => {
    localStorage.setItem('musick_liked_tracks', JSON.stringify(likedTrackIds));
  }, [likedTrackIds]);

  useEffect(() => {
    localStorage.setItem('musick_custom_playlists', JSON.stringify(customPlaylists));
  }, [customPlaylists]);

  // Subscribe to YouTube Player events
  useEffect(() => {
    const unsubscribe = ytController.subscribe((type, data) => {
      if (type === 'stateChange') {
        // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
        if (data === 1) {
          setIsPlaying(true);
          const dur = ytController.getDuration();
          if (dur > 0) setDuration(dur);
        } else if (data === 2) {
          setIsPlaying(false);
        } else if (data === 0) {
          handleTrackEnd();
        }
      }
    });

    return () => unsubscribe();
  }, [repeatMode, queue, currentTrack, isShuffle]);

  // Time tracker loop when playing
  useEffect(() => {
    if (isPlaying) {
      pollTimerRef.current = setInterval(() => {
        const time = ytController.getCurrentTime();
        if (time !== undefined && !isNaN(time)) {
          setCurrentTime(time);
        }
        const dur = ytController.getDuration();
        if (dur && !isNaN(dur) && dur > 0) {
          setDuration(dur);
        }
      }, 500);
    } else {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    }

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [isPlaying]);

  // Sync lyrics index
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

  // Load lyrics when track changes
  useEffect(() => {
    if (currentTrack) {
      fetchOnlineLyrics(currentTrack).then(res => {
        setActiveLyrics(res.lyrics || []);
      });
    }
  }, [currentTrack]);

  // Play a specific track
  const playTrack = (track, playlistContext = null) => {
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

    // If track has a direct YouTube video ID
    const yId = track.youtubeId || (track.id.startsWith('yt-') ? track.youtubeId : '4NRXx6U8ABQ');
    ytController.loadAndPlay(yId);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      ytController.pause();
      setIsPlaying(false);
    } else {
      ytController.play();
      setIsPlaying(true);
    }
  };

  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      ytController.seekTo(0);
      ytController.play();
    } else {
      nextTrack();
    }
  };

  const nextTrack = () => {
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
  };

  const prevTrack = () => {
    if (currentTime > 3) {
      ytController.seekTo(0);
      setCurrentTime(0);
      return;
    }

    if (history.length > 0) {
      const prevSong = history[0];
      setHistory(prev => prev.slice(1));
      setQueue(prev => [currentTrack, ...prev]);
      playTrack(prevSong);
    } else {
      ytController.seekTo(0);
      setCurrentTime(0);
    }
  };

  const seek = (timeInSeconds) => {
    ytController.seekTo(timeInSeconds);
    setCurrentTime(timeInSeconds);
  };

  const setVolume = (val) => {
    const v = parseFloat(val);
    setVolumeState(v);
    setIsMuted(v === 0);
    ytController.setVolume(v);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolumeState(prevVolume || 0.85);
      ytController.setVolume(prevVolume || 0.85);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      setVolumeState(0);
      ytController.setVolume(0);
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(prev => !prev);
  };

  const toggleRepeat = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };

  const toggleLike = (trackId) => {
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
  };

  const createPlaylist = (title, description = "") => {
    const newId = `custom-${Date.now()}`;
    const newPl = {
      id: newId,
      title: title || "My Red Playlist",
      description: description || "Curated in music.k",
      coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
      tracks: [currentTrack ? currentTrack.id : 'yt-01']
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
  };

  const addTrackToPlaylist = (playlistId, trackId) => {
    setCustomPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId) {
        if (!pl.tracks.includes(trackId)) {
          return { ...pl, tracks: [...pl.tracks, trackId] };
        }
      }
      return pl;
    }));
  };

  const removeTrackFromPlaylist = (playlistId, trackId) => {
    setCustomPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId) {
        return { ...pl, tracks: pl.tracks.filter(id => id !== trackId) };
      }
      return pl;
    }));
  };

  const setEqualizerBand = (index, valueDb) => {
    const updated = [...eqBands];
    updated[index] = valueDb;
    setEqBands(updated);
    setActiveEqPreset("Custom");
  };

  const applyEqPreset = (presetName) => {
    if (EQ_PRESETS[presetName]) {
      setActiveEqPreset(presetName);
      setEqBands(EQ_PRESETS[presetName]);
    }
  };

  const navigateTo = (view, param = null) => {
    setCurrentView(view);
    setViewParam(param);
  };

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
        isVideoModalOpen,
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
        setIsVideoModalOpen,
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
