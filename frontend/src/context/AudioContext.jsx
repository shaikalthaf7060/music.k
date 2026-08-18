import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { ONLINE_CHARTS, fetchOnlineLyrics } from '../services/api';
import { ytController } from '../services/youtubePlayer';
import { 
  auth, 
  signInWithGoogle, 
  registerWithEmail as fbRegister, 
  loginWithEmail as fbLogin, 
  logoutFirebase,
  onAuthStateChanged,
  isFirebaseConfigured
} from '../services/firebase';
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
  
  // Auth state
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('musick_auth_token') || '');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('musick_user_profile');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [likedTrackIds, setLikedTrackIds] = useState(() => {
    const saved = localStorage.getItem('musick_liked_tracks');
    return saved ? JSON.parse(saved) : ['yt-01', 'yt-02', 'yt-04'];
  });
  
  const [currentView, setCurrentView] = useState('home');
  const [viewParam, setViewParam] = useState(null);
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);

  const [activeLyrics, setActiveLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

  const [activeEqPreset, setActiveEqPreset] = useState("EDM Crimson");
  const [eqBands, setEqBands] = useState(EQ_PRESETS["EDM Crimson"]);

  const pollTimerRef = useRef(null);

  // Subscribe to YouTube / HTML5 Player state changes
  useEffect(() => {
    const unsubscribe = ytController.subscribe((type, data) => {
      if (type === 'stateChange') {
        if (data === 1) { // PLAYING
          setIsPlaying(true);
          const dur = ytController.getDuration();
          if (dur > 0) setDuration(dur);
        } else if (data === 2) { // PAUSED
          setIsPlaying(false);
        } else if (data === 0) { // ENDED
          handleTrackEnd();
        }
      }
    });

    return () => unsubscribe();
  }, [repeatMode, queue, currentTrack, isShuffle]);

  // Smooth polling for playback time & duration
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
      }, 400);
    } else {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    }

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [isPlaying]);

  // Firebase auth state listener
  useEffect(() => {
    if (isFirebaseConfigured() && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const profile = {
            id: user.uid,
            name: user.displayName || user.email?.split('@')[0] || "VIP Red Member",
            email: user.email,
            avatar: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`,
            tier: "VIP Firebase Member"
          };
          setCurrentUser(profile);
          setAuthToken(user.uid);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('musick_liked_tracks', JSON.stringify(likedTrackIds));
  }, [likedTrackIds]);

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
    } else {
      localStorage.removeItem('musick_user_profile');
    }
  }, [currentUser]);

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

  // Play track online via YouTube streaming engine (0 backend storage)
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

    // Trigger online playback
    ytController.playTrack(track);
    setIsPlaying(true);
  }, [currentTrack]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      ytController.pause();
      setIsPlaying(false);
    } else {
      ytController.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      ytController.seekTo(0);
      ytController.play();
    } else {
      nextTrack();
    }
  };

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
  }, [currentTime, history, currentTrack, playTrack]);

  const seek = useCallback((timeInSeconds) => {
    ytController.seekTo(timeInSeconds);
    setCurrentTime(timeInSeconds);
  }, []);

  const setVolume = useCallback((val) => {
    const v = parseFloat(val);
    setVolumeState(v);
    setIsMuted(v === 0);
    ytController.setVolume(v);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      const restored = prevVolume || 0.85;
      setVolumeState(restored);
      ytController.setVolume(restored);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      setVolumeState(0);
      ytController.setVolume(0);
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

  // Firebase Auth Handlers
  const loginGoogle = async () => {
    const user = await signInWithGoogle();
    const profile = {
      id: user.uid,
      name: user.displayName || "Google Red Listener",
      email: user.email,
      avatar: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`,
      tier: "VIP Google Member"
    };
    setCurrentUser(profile);
    setAuthToken(user.uid);
    return profile;
  };

  const login = async (email, password) => {
    const user = await fbLogin(email, password);
    const profile = {
      id: user.uid,
      name: user.displayName || email.split('@')[0],
      email: user.email,
      avatar: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      tier: "VIP Red Member"
    };
    setCurrentUser(profile);
    setAuthToken(user.uid);
    return profile;
  };

  const register = async (name, email, password) => {
    const user = await fbRegister(name, email, password);
    const profile = {
      id: user.uid,
      name: name,
      email: email,
      avatar: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      tier: "VIP Red Member"
    };
    setCurrentUser(profile);
    setAuthToken(user.uid);
    return profile;
  };

  const logout = async () => {
    await logoutFirebase();
    setAuthToken('');
    setCurrentUser(null);
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
        isNowPlayingOpen,
        setIsNowPlayingOpen,
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
        loginGoogle,
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
