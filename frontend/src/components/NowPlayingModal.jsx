import React, { useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1, 
  Heart, 
  Volume2, 
  VolumeX, 
  Volume1, 
  Mic2, 
  Sliders, 
  Activity
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import Logo from './Logo';

const DEFAULT_COVER = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80";

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function NowPlayingModal() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    likedTrackIds,
    isNowPlayingOpen,
    setIsNowPlayingOpen,
    isLyricsOpen,
    setIsLyricsOpen,
    isEqualizerOpen,
    setIsEqualizerOpen,
    isVisualizerOpen,
    setIsVisualizerOpen,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    activeLyrics,
    currentLyricIndex
  } = useAudio();

  const scrubRef = useRef(null);

  if (!isNowPlayingOpen || !currentTrack) return null;

  const isLiked = Boolean(currentTrack && Array.isArray(likedTrackIds) && likedTrackIds.includes(currentTrack.id));
  const trackDuration = currentTrack?.duration || duration || 210;
  const progressPercent = trackDuration > 0 ? Math.min(100, (currentTime / trackDuration) * 100) : 0;

  const handleScrubClick = (e) => {
    if (!scrubRef.current) return;
    const rect = scrubRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    seek(percentage * trackDuration);
  };

  const activeLyricText = activeLyrics && currentLyricIndex >= 0 && activeLyrics[currentLyricIndex]
    ? activeLyrics[currentLyricIndex].text
    : `Playing ${currentTrack.title} • ${currentTrack.artist}`;

  return (
    <div className="modal-backdrop" onClick={() => setIsNowPlayingOpen(false)}>
      <div 
        className="now-playing-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="np-header">
          <div className="np-brand">
            <Logo size={20} />
            <span className="np-header-title">NOW PLAYING</span>
          </div>

          <button 
            className="np-close-btn" 
            onClick={() => setIsNowPlayingOpen(false)}
            title="Close Player"
          >
            <X size={18} />
          </button>
        </div>

        {/* Artwork Stage */}
        <div className="np-artwork-container">
          <img 
            src={currentTrack.coverUrl || DEFAULT_COVER} 
            alt={currentTrack.title}
            className="np-artwork-img"
            onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_COVER; }}
          />

          {/* Animated soundwave pill */}
          {isPlaying && (
            <div className="np-soundwave-badge">
              <div className="sound-wave">
                <span /><span /><span /><span />
              </div>
            </div>
          )}
        </div>

        {/* Track Title & Artist with Like Heart */}
        <div className="np-meta-row">
          <div className="np-track-info">
            <h2 className="np-track-title" title={currentTrack.title}>
              {currentTrack.title}
            </h2>
            <p className="np-track-artist" title={currentTrack.artist}>
              {currentTrack.artist} <span className="np-album-sep">•</span> <span className="np-album-name">{currentTrack.album || 'Single'}</span>
            </p>
          </div>

          <button 
            className={`np-heart-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => toggleLike(currentTrack.id)}
            title={isLiked ? "Remove from Liked" : "Add to Liked"}
          >
            <Heart size={22} fill={isLiked ? "#FFFFFF" : "none"} strokeWidth={2} />
          </button>
        </div>

        {/* Active Lyric Teaser Pill */}
        <div 
          className="np-lyrics-teaser"
          onClick={() => {
            setIsNowPlayingOpen(false);
            setIsLyricsOpen(true);
          }}
          title="Open Synced Lyrics"
        >
          <Mic2 size={16} className="np-mic-icon" />
          <span className="np-lyric-text">
            {activeLyricText}
          </span>
          <span className="np-lyrics-arrow">
            LYRICS ›
          </span>
        </div>

        {/* Scrubber Progress Bar */}
        <div className="np-scrubber-box">
          <div 
            className="np-scrubber-track" 
            ref={scrubRef}
            onClick={handleScrubClick}
          >
            <div 
              className="np-scrubber-fill" 
              style={{ width: `${progressPercent}%` }}
            >
              <div className="np-scrubber-thumb" />
            </div>
          </div>

          <div className="np-time-row">
            <span className="np-timestamp">{formatTime(currentTime)}</span>
            <span className="np-timestamp">{formatTime(trackDuration)}</span>
          </div>
        </div>

        {/* Controls Deck */}
        <div className="np-controls-deck">
          <button 
            className={`np-ctrl-btn ${isShuffle ? 'active' : ''}`}
            onClick={toggleShuffle}
            title={isShuffle ? "Shuffle On" : "Shuffle Off"}
          >
            <Shuffle size={19} />
          </button>

          <button 
            className="np-ctrl-btn"
            onClick={prevTrack}
            title="Previous Track"
          >
            <SkipBack size={22} fill="currentColor" />
          </button>

          {/* Large Frosted Glass Center Play Button */}
          <button 
            className="np-play-btn"
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" style={{ marginLeft: '3px' }} />
            )}
          </button>

          <button 
            className="np-ctrl-btn"
            onClick={nextTrack}
            title="Next Track"
          >
            <SkipForward size={22} fill="currentColor" />
          </button>

          <button 
            className={`np-ctrl-btn ${repeatMode !== 'off' ? 'active' : ''}`}
            onClick={toggleRepeat}
            title={`Repeat: ${repeatMode.toUpperCase()}`}
          >
            {repeatMode === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
          </button>
        </div>

        {/* Bottom Utility Deck (Equalizer, Visualizer & Volume) */}
        <div className="np-bottom-deck">
          <div className="np-utility-group">
            <button 
              className={`np-tool-btn ${isEqualizerOpen ? 'active' : ''}`}
              onClick={() => {
                setIsNowPlayingOpen(false);
                setIsEqualizerOpen(true);
              }}
              title="Studio Equalizer"
            >
              <Sliders size={16} />
            </button>
            <button 
              className={`np-tool-btn ${isVisualizerOpen ? 'active' : ''}`}
              onClick={() => {
                setIsNowPlayingOpen(false);
                setIsVisualizerOpen(true);
              }}
              title="Audio Spectrum Visualizer"
            >
              <Activity size={16} />
            </button>
          </div>

          <div className="np-volume-group">
            <button 
              className="np-tool-btn" 
              onClick={toggleMute} 
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={16} color="#9CA3AF" />
              ) : volume < 0.5 ? (
                <Volume1 size={16} />
              ) : (
                <Volume2 size={16} />
              )}
            </button>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="np-volume-slider"
              title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
