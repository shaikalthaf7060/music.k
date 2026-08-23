import React, { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CoverflowStage({ tracks }) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const [activeIndex, setActiveIndex] = useState(2);

  const playlist = tracks && tracks.length > 0 ? tracks : [
    {
      id: 'cov-01',
      title: 'Backburner',
      artist: 'NIKI',
      coverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      duration: 238
    },
    {
      id: 'cov-02',
      title: 'Bergema Sampai',
      artist: 'Nadhif Basalamah',
      coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      duration: 215
    },
    {
      id: 'cov-03',
      title: 'Bawa Dia Kembali',
      artist: 'Mahalini',
      coverUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
      duration: 245
    },
    {
      id: 'cov-04',
      title: 'Dirimu Yang Dulu',
      artist: 'Anggis Devaki',
      coverUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
      duration: 220
    },
    {
      id: 'cov-05',
      title: 'Monolog',
      artist: 'Pamungkas',
      coverUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
      duration: 205
    }
  ];

  // Sync active card with current playing track
  useEffect(() => {
    if (currentTrack) {
      const idx = playlist.findIndex(t => t.id === currentTrack.id || t.title === currentTrack.title);
      if (idx !== -1) {
        setActiveIndex(idx);
      }
    }
  }, [currentTrack, playlist]);

  const handleCardClick = (idx) => {
    if (idx === activeIndex) {
      if (currentTrack && (currentTrack.id === playlist[idx].id || currentTrack.title === playlist[idx].title)) {
        togglePlay();
      } else {
        playTrack(playlist[idx], playlist);
      }
    } else {
      setActiveIndex(idx);
      playTrack(playlist[idx], playlist);
    }
  };

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + playlist.length) % playlist.length;
    setActiveIndex(nextIdx);
    playTrack(playlist[nextIdx], playlist);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % playlist.length;
    setActiveIndex(nextIdx);
    playTrack(playlist[nextIdx], playlist);
  };

  return (
    <div className="coverflow-container">
      {/* 3D Carousel Stage */}
      <div className="coverflow-stage">
        {playlist.map((track, idx) => {
          let offset = idx - activeIndex;
          
          // Loop wrapping for smooth circular coverflow
          if (offset < -2) offset += playlist.length;
          if (offset > 2) offset -= playlist.length;

          if (Math.abs(offset) > 2) return null;

          const isCenter = offset === 0;
          const isTrackPlaying = isCenter && isPlaying;

          let transformStyle = '';
          let zIndex = 5 - Math.abs(offset);
          let opacity = 1 - Math.abs(offset) * 0.28;

          if (offset === 0) {
            transformStyle = 'translateX(0px) translateZ(0px) scale(1.15) rotateY(0deg)';
          } else if (offset === -1) {
            transformStyle = 'translateX(-175px) translateZ(-60px) scale(0.92) rotateY(28deg)';
          } else if (offset === 1) {
            transformStyle = 'translateX(175px) translateZ(-60px) scale(0.92) rotateY(-28deg)';
          } else if (offset === -2) {
            transformStyle = 'translateX(-320px) translateZ(-120px) scale(0.78) rotateY(42deg)';
          } else if (offset === 2) {
            transformStyle = 'translateX(320px) translateZ(-120px) scale(0.78) rotateY(-42deg)';
          }

          return (
            <div
              key={track.id || idx}
              className={`coverflow-card ${isCenter ? 'active-center' : ''}`}
              style={{
                transform: transformStyle,
                zIndex: zIndex,
                opacity: opacity
              }}
              onClick={() => handleCardClick(idx)}
            >
              {/* Card Poster Image Container */}
              <div className="card-artwork-box">
                <img 
                  src={track.coverUrl} 
                  alt={track.title}
                  className="card-artwork-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80';
                  }}
                />

                {isCenter && (
                  <div className="card-play-overlay">
                    <button className="coverflow-play-pill">
                      {isTrackPlaying ? (
                        <Pause size={20} fill="#ffffff" color="#ffffff" />
                      ) : (
                        <Play size={20} fill="#ffffff" color="#ffffff" style={{ marginLeft: '3px' }} />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Card Meta Text */}
              <div className="card-meta">
                <h3 className="card-artist">{track.artist}</h3>
                <p className="card-title">{track.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle Navigation Chevrons */}
      <div className="coverflow-nav-controls">
        <button className="coverflow-nav-btn" onClick={handlePrev} title="Previous">
          <ChevronLeft size={22} />
        </button>
        <button className="coverflow-nav-btn" onClick={handleNext} title="Next">
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
