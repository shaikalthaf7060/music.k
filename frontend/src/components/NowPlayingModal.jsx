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

  const isLiked = Boolean(currentTrack && Array.isArray(likedTrackIds) && likedTrackIds.includes(currentTrack.id));
  const trackDuration = currentTrack?.duration || duration || 200;
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
    : "Streaming pure online audio...";

  return (
    <div className="modal-backdrop" onClick={() => setIsNowPlayingOpen(false)}>
      <div 
        className="glossy-card now-playing-modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '92%',
          maxWidth: '430px',
          maxHeight: '94vh',
          padding: '20px 24px',
          background: 'linear-gradient(145deg, rgba(28, 12, 16, 0.96) 0%, rgba(14, 14, 18, 0.98) 100%)',
          border: '1px solid rgba(229, 9, 20, 0.35)',
          borderRadius: '20px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(229, 9, 20, 0.25)',
          backdropFilter: 'blur(30px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '14px',
          overflowY: 'auto'
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Logo size={22} />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#FF2A3A' }}>
              NOW PLAYING • music.k
            </span>
          </div>

          <button 
            className="action-icon-btn" 
            onClick={() => setIsNowPlayingOpen(false)}
            style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.08)' }}
            title="Close Full Player"
          >
            <X size={18} />
          </button>
        </div>

        {/* Compact Responsive Glossy Album Artwork */}
        <div 
          style={{
            position: 'relative',
            width: 'min(240px, 30vh)',
            height: 'min(240px, 30vh)',
            margin: '0 auto',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(0,0,0,0.85), 0 0 25px rgba(229, 9, 20, 0.3)',
            border: '1px solid rgba(255,255,255,0.12)',
            flexShrink: 0
          }}
        >
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title}
            onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_COVER; }}
            style={{
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
                bottom: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(8px)',
                padding: '4px 8px',
                borderRadius: '14px',
                border: '1px solid rgba(229, 9, 20, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <div className="sound-wave" style={{ height: '12px' }}>
                <span /><span /><span /><span />
              </div>
            </div>
          )}
        </div>

        {/* Track Title & Artist with Like Heart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
          <div style={{ overflow: 'hidden', paddingRight: '10px' }}>
            <h2 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.35rem', 
                fontWeight: 800, 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                color: 'white',
                marginBottom: '2px'
              }}
            >
              {currentTrack.title}
            </h2>
            <p 
              style={{ 
                fontSize: '0.88rem', 
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
            style={{ padding: '6px' }}
          >
            <Heart size={22} fill={isLiked ? "#FF2A3A" : "none"} strokeWidth={2} />
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
            borderRadius: '10px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Mic2 size={16} color="#FF2A3A" />
          <span style={{ fontSize: '0.82rem', color: 'white', fontWeight: 600, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {activeLyricText}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Lyrics ›
          </span>
        </div>

        {/* Scrubber Progress Bar */}
        <div>
          <div 
            className="slider-bar-track" 
            ref={scrubRef}
            onClick={handleScrubClick}
            style={{ height: '5px', background: 'rgba(255,255,255,0.12)' }}
          >
            <div 
              className="slider-fill" 
              style={{ width: `${progressPercent}%` }}
            >
              <div className="slider-thumb" style={{ opacity: 1, width: '12px', height: '12px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span className="time-stamp" style={{ fontSize: '0.74rem' }}>{formatTime(currentTime)}</span>
            <span className="time-stamp" style={{ fontSize: '0.74rem' }}>{formatTime(trackDuration)}</span>
          </div>
        </div>

        {/* Controls Deck */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button 
            className={`ctrl-btn ${isShuffle ? 'active' : ''}`}
            onClick={toggleShuffle}
            title="Shuffle"
          >
            <Shuffle size={18} />
          </button>

          <button 
            className="ctrl-btn"
            onClick={prevTrack}
            title="Previous Track"
          >
            <SkipBack size={22} fill="currentColor" />
          </button>

          {/* Large Glossy Circular Play Button */}
          <button 
            className="main-play-btn"
            onClick={togglePlay}
            style={{ 
              width: '56px', 
              height: '56px', 
              boxShadow: '0 8px 24px rgba(229, 9, 20, 0.6), 0 0 16px rgba(255, 42, 58, 0.4)' 
            }}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={24} fill="#ffffff" />
            ) : (
              <Play size={24} fill="#ffffff" style={{ marginLeft: '3px' }} />
            )}
          </button>

          <button 
            className="ctrl-btn"
            onClick={nextTrack}
            title="Next Track"
          >
            <SkipForward size={22} fill="currentColor" />
          </button>

          <button 
            className={`ctrl-btn ${repeatMode !== 'off' ? 'active' : ''}`}
            onClick={toggleRepeat}
            title={`Repeat: ${repeatMode.toUpperCase()}`}
          >
            {repeatMode === 'one' ? <Repeat1 size={19} /> : <Repeat size={19} />}
          </button>
        </div>

        {/* Bottom Tools & Volume */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`tool-icon-btn ${isEqualizerOpen ? 'active' : ''}`}
              onClick={() => {
                setIsNowPlayingOpen(false);
                setIsEqualizerOpen(true);
              }}
              title="Studio Equalizer"
            >
              <Sliders size={17} />
            </button>
            <button 
              className={`tool-icon-btn ${isVisualizerOpen ? 'active' : ''}`}
              onClick={() => {
                setIsNowPlayingOpen(false);
                setIsVisualizerOpen(true);
              }}
              title="Audio Visualizer"
            >
              <Activity size={17} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="tool-icon-btn" onClick={toggleMute}>
              {isMuted || volume === 0 ? <VolumeX size={17} color="#FF4757" /> : <Volume2 size={17} />}
            </button>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(e.target.value)}
              style={{ width: '80px', accentColor: '#FF2A3A', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
