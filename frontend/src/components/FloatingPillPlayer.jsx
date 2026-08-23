import React, { useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Cast, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Volume1,
  Maximize2
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const DEFAULT_COVER = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80";

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function FloatingPillPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    seek,
    toggleMute,
    nextTrack,
    prevTrack,
    setIsNowPlayingOpen,
    setIsEqualizerOpen,
    setIsVisualizerOpen
  } = useAudio();

  const scrubBarRef = useRef(null);
  const [isHoveringScrub, setIsHoveringScrub] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [hoverPos, setHoverPos] = useState(0);

  if (!currentTrack) return null;

  const trackDuration = currentTrack?.duration || duration || 210;
  const progressPercent = trackDuration > 0 ? Math.min(100, (currentTime / trackDuration) * 100) : 0;

  const handleScrubClick = (e) => {
    if (!scrubBarRef.current) return;
    const rect = scrubBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSec = percentage * trackDuration;
    seek(targetSec);
  };

  const handleMouseMove = (e) => {
    if (!scrubBarRef.current) return;
    const rect = scrubBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    setHoverTime(percentage * trackDuration);
    setHoverPos(clickX);
  };

  return (
    <div className="floating-pill-player-wrapper">
      <div className="floating-pill-player">
        {/* Left: Playback Controls */}
        <div className="pill-left-controls">
          <button className="pill-ctrl-btn" onClick={prevTrack} title="Previous">
            <SkipBack size={19} fill="currentColor" />
          </button>
          
          <button className="pill-main-play-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              <Pause size={19} fill="currentColor" />
            ) : (
              <Play size={19} fill="currentColor" style={{ marginLeft: '2px' }} />
            )}
          </button>

          <button className="pill-ctrl-btn" onClick={nextTrack} title="Next">
            <SkipForward size={19} fill="currentColor" />
          </button>
        </div>

        {/* Center: Interactive Track & Scrub Island */}
        <div className="pill-center-track-wrapper">
          <div 
            className="pill-center-track" 
            onClick={() => setIsNowPlayingOpen(true)}
            title="Click to Open Fullscreen Player"
          >
            <img 
              src={currentTrack.coverUrl || DEFAULT_COVER} 
              alt={currentTrack.title}
              className="pill-track-thumb"
              onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_COVER; }}
            />

            <div className="pill-track-meta">
              <span className="pill-track-artist">{currentTrack.artist || 'Artist'}</span>
              <span className="pill-track-title">{currentTrack.title || 'Song Title'}</span>
            </div>

            {/* Time Stamp Indicators */}
            <div className="pill-time-badge">
              <span>{formatTime(currentTime)}</span>
              <span style={{ opacity: 0.5 }}>/</span>
              <span>{formatTime(trackDuration)}</span>
            </div>

            {/* Animated Soundwave */}
            {isPlaying && (
              <div className="pill-soundwave">
                <span /><span /><span />
              </div>
            )}
          </div>

          {/* Interactive Scrub Bar (Click & Drag Anywhere) */}
          <div 
            className="pill-scrub-bar"
            ref={scrubBarRef}
            onClick={handleScrubClick}
            onMouseEnter={() => setIsHoveringScrub(true)}
            onMouseLeave={() => setIsHoveringScrub(false)}
            onMouseMove={handleMouseMove}
            title="Click anywhere to jump in song"
          >
            <div className="pill-scrub-track">
              <div className="pill-scrub-fill" style={{ width: `${progressPercent}%` }} />
              <div className="pill-scrub-thumb" style={{ left: `${progressPercent}%` }} />
            </div>

            {/* Tooltip on Hover */}
            {isHoveringScrub && (
              <div className="scrub-tooltip" style={{ left: `${hoverPos}px` }}>
                {formatTime(hoverTime)}
              </div>
            )}
          </div>
        </div>

        {/* Right: Audio Tools & Volume */}
        <div className="pill-right-controls">
          <button 
            className="pill-tool-btn"
            onClick={() => setIsVisualizerOpen(prev => !prev)}
            title="Audio Visualizer"
          >
            <Cast size={18} />
          </button>

          <button 
            className="pill-tool-btn"
            onClick={() => setIsEqualizerOpen(prev => !prev)}
            title="Equalizer"
          >
            <Sliders size={17} />
          </button>

          <button 
            className="pill-tool-btn"
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={18} color="#9CA3AF" />
            ) : volume < 0.5 ? (
              <Volume1 size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
