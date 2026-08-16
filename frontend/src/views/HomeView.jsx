import React from 'react';
import { Play, Pause, Heart, Clock, Flame, Sparkles } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { ONLINE_CHARTS } from '../services/api';

function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function HomeView() {
  const { currentTrack, isPlaying, playTrack, togglePlay, likedTrackIds, toggleLike } = useAudio();

  const featured = ONLINE_CHARTS[0]; // The Weeknd - Blinding Lights
  const isFeaturedCurrent = currentTrack && currentTrack.id === featured.id;

  const handlePlayFeatured = () => {
    if (isFeaturedCurrent) {
      togglePlay();
    } else {
      playTrack(featured, ONLINE_CHARTS);
    }
  };

  const handlePlayTrack = (track) => {
    if (currentTrack && currentTrack.id === track.id) {
      togglePlay();
    } else {
      playTrack(track, ONLINE_CHARTS);
    }
  };

  return (
    <div className="home-view-minimal" style={{ padding: '24px 32px' }}>
      {/* Featured Spotlight Card */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(200px, 260px) 1fr',
          gap: '28px',
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.25) 0%, rgba(20, 20, 24, 0.85) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(229, 9, 20, 0.3)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(229, 9, 20, 0.15)',
          marginBottom: '32px',
          alignItems: 'center'
        }}
      >
        <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.8)' }}>
          <img 
            src={featured.coverUrl} 
            alt={featured.title} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Flame size={16} color="#FF2A3A" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#FF2A3A' }}>
              SPOTLIGHT • ONLINE STREAM
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, margin: '4px 0 8px', letterSpacing: '-0.5px' }}>
            {featured.title}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            {featured.artist} • <span style={{ color: 'var(--text-muted)' }}>{featured.album} ({featured.year})</span>
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '20px' }}>
            <button 
              className="main-play-btn" 
              style={{ width: '56px', height: '56px' }}
              onClick={handlePlayFeatured}
              title={isFeaturedCurrent && isPlaying ? "Pause" : "Play Featured"}
            >
              {isFeaturedCurrent && isPlaying ? (
                <Pause size={24} fill="#ffffff" />
              ) : (
                <Play size={24} fill="#ffffff" style={{ marginLeft: '3px' }} />
              )}
            </button>

            <button 
              className={`like-heart-btn ${likedTrackIds.includes(featured.id) ? 'liked' : ''}`}
              onClick={() => toggleLike(featured.id)}
              style={{ padding: '10px' }}
            >
              <Heart size={24} fill={likedTrackIds.includes(featured.id) ? "#FF2A3A" : "none"} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Clean Track List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 className="section-title" style={{ fontSize: '1.4rem' }}>Trending Hits</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Full-length online audio</span>
        </div>

        <table className="tracks-table">
          <thead>
            <tr>
              <th style={{ width: '44px', textAlign: 'center' }}>#</th>
              <th>Title</th>
              <th>Album</th>
              <th>Plays</th>
              <th style={{ width: '80px', textAlign: 'right' }}>
                <Clock size={16} style={{ verticalAlign: 'middle' }} />
              </th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {ONLINE_CHARTS.map((track, idx) => {
              const isCurrent = currentTrack && currentTrack.id === track.id;
              const isLiked = likedTrackIds.includes(track.id);

              return (
                <tr 
                  key={track.id}
                  className={`track-row ${isCurrent ? 'playing' : ''}`}
                  onClick={() => handlePlayTrack(track)}
                >
                  <td className="track-cell track-num-cell">
                    {isCurrent && isPlaying ? (
                      <div className="sound-wave" style={{ justifyContent: 'center' }}>
                        <span /><span /><span /><span />
                      </div>
                    ) : (
                      idx + 1
                    )}
                  </td>

                  <td className="track-cell">
                    <div className="track-info-cell">
                      <img src={track.coverUrl} alt={track.title} className="track-row-thumb" />
                      <div className="track-titles">
                        <span className="track-title-text">{track.title}</span>
                        <span className="track-artist-text">{track.artist}</span>
                      </div>
                    </div>
                  </td>

                  <td className="track-cell" style={{ color: 'var(--text-muted)' }}>
                    {track.album}
                  </td>

                  <td className="track-cell" style={{ color: 'var(--text-muted)' }}>
                    {track.plays}
                  </td>

                  <td className="track-cell" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>
                    {formatDuration(track.duration)}
                  </td>

                  <td className="track-cell" style={{ textAlign: 'center' }}>
                    <button 
                      className={`like-heart-btn ${isLiked ? 'liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(track.id);
                      }}
                      title={isLiked ? "Unlike" : "Like"}
                    >
                      <Heart size={16} fill={isLiked ? "#FF2A3A" : "none"} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
