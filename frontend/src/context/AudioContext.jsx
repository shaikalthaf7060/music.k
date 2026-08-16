import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { audioEngine } from '../services/synthAudio';
import { LOCAL_TRACKS, LOCAL_PLAYLISTS, fetchLyrics } from '../services/api';
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
  const [tracks, setTracks] = useState(LOCAL_TRACKS);
  const [currentTrack, setCurrentTrack] = useState(LOCAL_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(LOCAL_TRACKS[0].duration || 184);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.85);
  const [queue, setQueue] = useState(LOCAL_TRACKS.slice(1));
  const [history, setHistory] = useState([]);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'all', 'one'
  const [likedTrackIds, setLikedTrackIds] = useState(['red-01', 'red-03', 'red-05']);
  
  // Custom user playlists
  const [customPlaylists, setCustomPlaylists] = useState(() => {
    const saved = localStorage.getItem('musick_playlists');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: "custom-01",
        title: "Crimson Night Drive",
        description: "Late night synthesizer and heavy beats",
        coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80",
        tracks: ["red-01", "red-03", "red-05"]
      }
    ];
  });

  // Views & Modals state
  const [currentView, setCurrentView] = useState('home'); // 'home', 'search', 'library', 'playlist', 'artist'
  const [viewParam, setViewParam] = useState(null); // e.g. playlist ID or artist ID
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);

  // Lyrics state
  const [activeLyrics, setActiveLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

  // Equalizer state
  const [activeEqPreset, setActiveEqPreset] = useState("EDM Crimson");
  const [eqBands, setEqBands] = useState(EQ_PRESETS["EDM Crimson"]);

  const audioRef = useRef(audioEngine.htmlAudio);
  const audioInitializedRef = useRef(false);

  // Save custom playlists to localStorage
  useEffect(() => {
    localStorage.setItem('musick_playlists', JSON.stringify(customPlaylists));
  }, [customPlaylists]);

  // Handle audio time updates
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      handleTrackEnd();
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [repeatMode, queue, currentTrack, isShuffle]);

  // Update lyrics index on time update
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
      if (currentTrack.lyrics) {
        setActiveLyrics(currentTrack.lyrics);
      } else {
        fetchLyrics(currentTrack.id).then(res => {
          setActiveLyrics(res.lyrics || []);
        });
      }
    }
  }, [currentTrack]);

  // Play a specific track
  const playTrack = async (track, playlistContext = null) => {
    try {
      if (!audioInitializedRef.current) {
        audioEngine.init();
        audioInitializedRef.current = true;
      }

      if (playlistContext) {
        const nextInList = playlistContext.filter(t => t.id !== track.id);
        setQueue(nextInList);
      }

      if (currentTrack && currentTrack.id !== track.id) {
        setHistory(prev => [currentTrack, ...prev.slice(0, 19)]);
      }

      setCurrentTrack(track);
      setCurrentTime(0);
      setDuration(track.duration || 184);

      const audio = audioRef.current;
      audio.src = track.audioUrl;
      audioEngine.isPlaying = true;

      try {
        await audio.play();
        setIsPlaying(true);
        audioEngine.stopSyntheticTrack();
      } catch (err) {
        console.warn("Direct HTML5 audio playback deferred or failed, running synthetic engine", err);
        audioEngine.playSyntheticTrack(track);
        setIsPlaying(true);
      }
    } catch (e) {
      console.error("Error playing track", e);
    }
  };

  const togglePlay = async () => {
    if (!audioInitializedRef.current) {
      audioEngine.init();
      audioInitializedRef.current = true;
    }

    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      audioEngine.isPlaying = false;
      audioEngine.stopSyntheticTrack();
      setIsPlaying(false);
    } else {
      if (!audio.src && currentTrack) {
        audio.src = currentTrack.audioUrl;
      }
      try {
        audioEngine.isPlaying = true;
        await audio.play();
        setIsPlaying(true);
        audioEngine.stopSyntheticTrack();
      } catch (err) {
        audioEngine.playSyntheticTrack(currentTrack);
        setIsPlaying(true);
      }
    }
  };

  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      const audio = audioRef.current;
      audio.currentTime = 0;
      audio.play();
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
      // Loop back to all tracks
      const allTracks = tracks.filter(t => t.id !== currentTrack.id);
      if (allTracks.length > 0) {
        setQueue(allTracks.slice(1));
        playTrack(allTracks[0]);
      }
    } else {
      setIsPlaying(false);
      audioEngine.isPlaying = false;
    }
  };

  const prevTrack = () => {
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
  };

  const seek = (timeInSeconds) => {
    const audio = audioRef.current;
    audio.currentTime = timeInSeconds;
    setCurrentTime(timeInSeconds);
  };

  const setVolume = (val) => {
    const v = parseFloat(val);
    setVolumeState(v);
    setIsMuted(v === 0);
    audioEngine.setGain(v);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolumeState(prevVolume || 0.85);
      audioEngine.setGain(prevVolume || 0.85);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      setVolumeState(0);
      audioEngine.setGain(0);
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
        // Trigger crimson confetti burst
        try {
          confetti({
            particleCount: 40,
            spread: 60,
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
      description: description || "Custom curated playlist in music.k",
      coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
      tracks: [currentTrack ? currentTrack.id : 'red-01']
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
    audioEngine.setEqualizerBand(index, valueDb);
  };

  const applyEqPreset = (presetName) => {
    if (EQ_PRESETS[presetName]) {
      setActiveEqPreset(presetName);
      const bands = EQ_PRESETS[presetName];
      setEqBands(bands);
      bands.forEach((db, idx) => {
        audioEngine.setEqualizerBand(idx, db);
      });
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
