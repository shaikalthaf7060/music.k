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
  Activity, 
  Flame, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import Logo from './Logo';

const DEFAULT_COVER = "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/6e/bf/a66ebf79-5008-8948-b352-a790fc87446b/19UM1IM04638.rgb.jpg/600x600bb.jpg";

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

  const isLiked = likedTrackIds.includes(currentTrack.id);
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleScrubClick = (e) => {
    if (!scrubRef.current) return;
    const rect = scrubRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    seek(percentage * duration);
  };

  const activeLyricText = activeLyrics && currentLyricIndex >= 0 && activeLyrics[currentLyricIndex]
    ? activeLyrics[currentLyricIndex].text
    : "Streaming full online ad-free audio...";

  return (
    <div className="modal-backdrop" onClick={() => setIsNowPlayingOpen(false)}>
      <div 
        className="glossy-card now-playing-modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '560px',
          padding: '32px',
          background: 'linear-gradient(145deg, rgba(28, 12, 16, 0.92) 0%, rgba(14, 14, 18, 0.96) 100%)',
          border: '1px solid rgba(229, 9, 20, 0.35)',
          borderRadius: '24px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(229, 9, 20, 0.25)',
          backdropFilter: 'blur(30px)',
          position: 'relative'
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Logo size={24} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#FF2A3A' }}>
              NOW PLAYING • music.k
            </span>
          </div>

          <button 
            className="action-icon-btn" 
            onClick={() => setIsNowPlayingOpen(false)}
            style={{ background: 'rgba(255,255,255,0.08)' }}
            title="Close Full Player"
          >
            <X size={20} />
          </button>
        </div>

        {/* Big Glossy Album Artwork */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '80%',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0,0,0,0.8), 0 0 35px rgba(229, 9, 20, 0.25)',
            marginBottom: '24px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title}
            onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_COVER; }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          {/* Floating soundwave indicator */}
          {isPlaying && (
            <div 
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(8px)',
                padding: '6px 12px',
                borderRadius: '20px',
                border: '1px solid rgba(229, 9, 20, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <div className="sound-wave">
                <span /><span /><span /><span />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FF2A3A', letterSpacing: '0.5px' }}>
                ONLINE LIVE
              </span>
            </div>
          )}
        </div>

        {/* Track Title & Artist with Like Heart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ overflow: 'hidden', paddingRight: '12px' }}>
            <h2 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.6rem', 
                fontWeight: 800, 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                color: 'white',
                marginBottom: '4px'
              }}
            >
              {currentTrack.title}
            </h2>
            <p 
              style={{ 
                fontSize: '1rem', 
                color: 'var(--text-secondary)', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis' 
              }}
            >
              {currentTrack.artist} • <span style={{ color: 'var(--text-muted)' }}>{currentTrack.album || 'Single'}</span>
            </p>
          </div>

          <button 
            className={`like-heart-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => toggleLike(currentTrack.id)}
            style={{ padding: '10px' }}
          >
            <Heart size={26} fill={isLiked ? "#FF2A3A" : "none"} strokeWidth={2} />
          </button>
        </div>

        {/* Active Lyric Teaser */}
        <div 
          onClick={() => {
            setIsNowPlayingOpen(false);
            setIsLyricsOpen(true);
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(229, 9, 20, 0.2)',
            borderRadius: '12px',
            padding: '10px 14px',
            marginBottom: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Mic2 size={18} color="#FF2A3A" />
          <span style={{ fontSize: '0.88rem', color: 'white', fontWeight: 600, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {activeLyricText}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Lyrics ›
          </span>
        </div>

        {/* Scrubber Progress Bar */}
        <div style={{ marginBottom: '24px' }}>
          <div 
            className="slider-bar-track" 
            ref={scrubRef}
            onClick={handleScrubClick}
            style={{ height: '6px', background: 'rgba(255,255,255,0.12)' }}
          >
            <div 
              className="slider-fill" 
              style={{ width: `${progressPercent}%` }}
            >
              <div className="slider-thumb" style={{ opacity: 1, width: '14px', height: '14px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <span className="time-stamp" style={{ fontSize: '0.8rem' }}>{formatTime(currentTime)}</span>
            <span className="time-stamp" style={{ fontSize: '0.8rem' }}>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls Deck */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button 
            className={`ctrl-btn ${isShuffle ? 'active' : ''}`}
            onClick={toggleShuffle}
            title="Shuffle"
          >
            <Shuffle size={20} />
          </button>

          <button 
            className="ctrl-btn"
            onClick={prevTrack}
            title="Previous Track"
          >
            <SkipBack size={26} fill="currentColor" />
          </button>

          {/* Large Glossy Circular Play Button */}
          <button 
            className="main-play-btn"
            onClick={togglePlay}
            style={{ 
              width: '64px', 
              height: '64px', 
              boxShadow: '0 8px 28px rgba(229, 9, 20, 0.6), 0 0 20px rgba(255, 42, 58, 0.4)' 
            }}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={28} fill="#ffffff" />
            ) : (
              <Play size={28} fill="#ffffff" style={{ marginLeft: '4px' }} />
            )}
          </button>

          <button 
            className="ctrl-btn"
            onClick={nextTrack}
            title="Next Track"
          >
            <SkipForward size={26} fill="currentColor" />
          </button>

          <button 
            className={`ctrl-btn ${repeatMode !== 'off' ? 'active' : ''}`}
            onClick={toggleRepeat}
            title={`Repeat: ${repeatMode.toUpperCase()}`}
          >
            {repeatMode === 'one' ? <Repeat1 size={22} /> : <Repeat size={22} />}
          </button>
        </div>

        {/* Bottom Tools & Volume */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`tool-icon-btn ${isEqualizerOpen ? 'active' : ''}`}
              onClick={() => {
                setIsNowPlayingOpen(false);
                setIsEqualizerOpen(true);
              }}
              title="Studio Equalizer"
            >
              <Sliders size={18} />
            </button>
            <button 
              className={`tool-icon-btn ${isVisualizerOpen ? 'active' : ''}`}
              onClick={() => {
                setIsNowPlayingOpen(false);
                setIsVisualizerOpen(true);
              }}
              title="Audio Visualizer"
            >
              <Activity size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="tool-icon-btn" onClick={toggleMute}>
              {isMuted || volume === 0 ? <VolumeX size={18} color="#FF4757" /> : <Volume2 size={18} />}
            </button>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(e.target.value)}
              style={{ width: '90px', accentColor: '#FF2A3A', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
