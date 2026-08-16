import React, { useEffect, useRef } from 'react';
import { X, Mic2, Flame } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function LyricsModal() {
  const { 
    currentTrack, 
    activeLyrics, 
    currentLyricIndex, 
    seek, 
    isLyricsOpen, 
    setIsLyricsOpen 
  } = useAudio();

  const activeLineRef = useRef(null);
  const containerRef = useRef(null);

  // Auto scroll to active lyric line
  useEffect(() => {
    if (activeLineRef.current && isLyricsOpen) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentLyricIndex, isLyricsOpen]);

  if (!isLyricsOpen || !currentTrack) return null;

  return (
    <div className="lyrics-overlay" ref={containerRef}>
      {/* Header Close */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '720px', width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title} 
            style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} 
          />
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{currentTrack.title}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{currentTrack.artist}</p>
          </div>
        </div>

        <button 
          className="action-icon-btn" 
          onClick={() => setIsLyricsOpen(false)}
          title="Close Lyrics"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Synchronized Lyrics Container */}
      <div className="lyrics-container">
        {activeLyrics && activeLyrics.length > 0 ? (
          activeLyrics.map((lyric, idx) => {
            const isActive = idx === currentLyricIndex;
            return (
              <p
                key={idx}
                ref={isActive ? activeLineRef : null}
                className={`lyric-line ${isActive ? 'active' : ''}`}
                onClick={() => seek(lyric.time)}
                title="Click to jump to this lyric"
              >
                {lyric.text}
              </p>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <Mic2 size={48} color="#FF2A3A" style={{ marginBottom: '16px', opacity: 0.7 }} />
            <h3>Enjoy the music</h3>
            <p>Karaoke lyrics for this track are tuning in...</p>
          </div>
        )}
      </div>
    </div>
  );
}
