import React, { useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1, 
  Volume2, 
  VolumeX, 
  Volume1, 
  Heart, 
  Mic2, 
  ListMusic, 
  Activity, 
  Sliders,
  Tv
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function PlayerBar() {
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
    isLyricsOpen,
    isQueueOpen,
    isVisualizerOpen,
    isEqualizerOpen,
    isVideoModalOpen,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    setIsLyricsOpen,
    setIsQueueOpen,
    setIsVisualizerOpen,
    setIsEqualizerOpen,
    setIsVideoModalOpen,
    navigateTo
  } = useAudio();

  const scrubBarRef = useRef(null);

  if (!currentTrack) return null;

  const isLiked = likedTrackIds.includes(currentTrack.id);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleScrubClick = (e) => {
    if (!scrubBarRef.current) return;
    const rect = scrubBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    seek(percentage * duration);
  };

  return (
    <div className="player-bar">
      {/* Left: Track Information */}
      <div className="player-left">
        <img 
          src={currentTrack.coverUrl} 
          alt={currentTrack.title} 
          className="player-cover" 
          onClick={() => setIsLyricsOpen(true)}
          title="Open Synced Lyrics & Art"
        />
        
        <div className="player-meta">
          <span 
            className="player-title" 
            title={currentTrack.title}
            onClick={() => navigateTo('playlist', 'pl-01')}
            style={{ cursor: 'pointer' }}
          >
            {currentTrack.title}
          </span>
          <span 
            className="player-artist" 
            title={currentTrack.artist}
            onClick={() => navigateTo('artist', currentTrack.artist)}
            style={{ cursor: 'pointer' }}
          >
            {currentTrack.artist}
          </span>
        </div>

        {/* Like Heart Button */}
        <button 
          className={`like-heart-btn ${isLiked ? 'liked' : ''}`}
          onClick={() => toggleLike(currentTrack.id)}
          title={isLiked ? "Remove from Liked Songs" : "Save to Liked Songs"}
        >
          <Heart size={20} fill={isLiked ? "#FF2A3A" : "none"} strokeWidth={2} />
        </button>
      </div>

      {/* Center: Playback Controls & Progress Bar */}
      <div className="player-center">
        <div className="control-buttons-row">
          {/* Shuffle Button */}
          <button 
            className={`ctrl-btn ${isShuffle ? 'active' : ''}`} 
            onClick={toggleShuffle}
            title={isShuffle ? "Shuffle On" : "Shuffle Off"}
          >
            <Shuffle size={18} />
          </button>

          {/* Previous Track */}
          <button 
            className="ctrl-btn" 
            onClick={prevTrack}
            title="Previous Track"
          >
            <SkipBack size={22} fill="currentColor" />
          </button>

          {/* Signature Bold Red Play/Pause Button */}
          <button 
            className="main-play-btn" 
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={22} fill="#ffffff" />
            ) : (
              <Play size={22} fill="#ffffff" style={{ marginLeft: '3px' }} />
            )}
          </button>

          {/* Next Track */}
          <button 
            className="ctrl-btn" 
            onClick={nextTrack}
            title="Next Track"
          >
            <SkipForward size={22} fill="currentColor" />
          </button>

          {/* Repeat Mode */}
          <button 
            className={`ctrl-btn ${repeatMode !== 'off' ? 'active' : ''}`} 
            onClick={toggleRepeat}
            title={`Repeat: ${repeatMode.toUpperCase()}`}
          >
            {repeatMode === 'one' ? <Repeat1 size={19} /> : <Repeat size={19} />}
          </button>
        </div>

        {/* Progress Bar / Scrubber */}
        <div className="scrub-container">
          <span className="time-stamp">{formatTime(currentTime)}</span>
          
          <div 
            className="slider-bar-track" 
            ref={scrubBarRef}
            onClick={handleScrubClick}
          >
            <div 
              className="slider-fill" 
              style={{ width: `${progressPercent}%` }}
            >
              <div className="slider-thumb" />
            </div>
          </div>

          <span className="time-stamp">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Tools & Volume */}
      <div className="player-right">
        {/* Video Mode Toggle */}
        <button 
          className={`tool-icon-btn ${isVideoModalOpen ? 'active' : ''}`}
          onClick={() => setIsVideoModalOpen(prev => !prev)}
          title="Watch YouTube Video"
        >
          <Tv size={18} />
        </button>

        {/* Synced Lyrics Toggle */}
        <button 
          className={`tool-icon-btn ${isLyricsOpen ? 'active' : ''}`}
          onClick={() => setIsLyricsOpen(prev => !prev)}
          title="Karaoke Lyrics"
        >
          <Mic2 size={18} />
        </button>

        {/* Queue Drawer Toggle */}
        <button 
          className={`tool-icon-btn ${isQueueOpen ? 'active' : ''}`}
          onClick={() => setIsQueueOpen(prev => !prev)}
          title="Queue"
        >
          <ListMusic size={20} />
        </button>

        {/* Equalizer Toggle */}
        <button 
          className={`tool-icon-btn ${isEqualizerOpen ? 'active' : ''}`}
          onClick={() => setIsEqualizerOpen(prev => !prev)}
          title="Equalizer"
        >
          <Sliders size={18} />
        </button>

        {/* Visualizer Toggle */}
        <button 
          className={`tool-icon-btn ${isVisualizerOpen ? 'active' : ''}`}
          onClick={() => setIsVisualizerOpen(prev => !prev)}
          title="Visualizer"
        >
          <Activity size={19} />
        </button>

        {/* Volume Controller */}
        <div className="volume-wrapper">
          <button 
            className="tool-icon-btn" 
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={19} color="#FF4757" />
            ) : volume < 0.5 ? (
              <Volume1 size={19} />
            ) : (
              <Volume2 size={19} />
            )}
          </button>

          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(e.target.value)}
            className="vertical-range"
            style={{ 
              writingMode: 'horizontal-tb', 
              width: '80px', 
              height: '4px',
              accentColor: '#FF2A3A',
              cursor: 'pointer' 
            }}
          />
        </div>
      </div>
    </div>
  );
}
