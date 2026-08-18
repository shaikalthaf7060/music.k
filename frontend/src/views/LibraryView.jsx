import React from 'react';
import { Heart, Music, Clock } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { ONLINE_CHARTS } from '../services/api';

const DEFAULT_COVER = "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/6e/bf/a66ebf79-5008-8948-b352-a790fc87446b/19UM1IM04638.rgb.jpg/600x600bb.jpg";

function formatDuration(sec) {
  if (!sec || isNaN(sec)) return "3:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function LibraryView() {
  const { currentTrack, isPlaying, playTrack, togglePlay, likedTrackIds, toggleLike } = useAudio();

  const likedTracks = ONLINE_CHARTS.filter(t => likedTrackIds.includes(t.id));
  const isCurrentPlaying = likedTracks.some(t => currentTrack && t.id === currentTrack.id);

  return (
    <div className="library-view" style={{ padding: '24px 32px' }}>
      {/* Header Banner */}
      <div style={{
        padding: '32px 28px',
        background: 'linear-gradient(135deg, #450a0a 0%, #E50914 50%, #990000 100%)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        boxShadow: '0 12px 32px rgba(229, 9, 20, 0.3)',
        marginBottom: '28px'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <Heart size={36} fill="#ffffff" />
        </div>

        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.8)' }}>
            YOUR COLLECTION
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, margin: '4px 0', color: 'white' }}>
            Liked Songs & Library
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
            {likedTracks.length} saved songs
          </p>
        </div>
      </div>

      {/* Tracks Table */}
      <div>
        {likedTracks.length > 0 ? (
          <table className="tracks-table">
            <thead>
              <tr>
                <th style={{ width: '44px', textAlign: 'center' }}>#</th>
                <th>Title</th>
                <th>Album</th>
                <th>Year</th>
                <th style={{ width: '80px', textAlign: 'right' }}>
                  <Clock size={16} style={{ verticalAlign: 'middle' }} />
                </th>
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {likedTracks.map((track, idx) => {
                const isCurrent = currentTrack && currentTrack.id === track.id;

                return (
                  <tr 
                    key={track.id || idx}
                    className={`track-row ${isCurrent ? 'playing' : ''}`}
                    onClick={() => playTrack(track, likedTracks)}
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
                        <img 
                          src={track.coverUrl} 
                          alt={track.title} 
                          className="track-row-thumb" 
                          onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_COVER; }}
                        />
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
                      {track.year || '2026'}
                    </td>

                    <td className="track-cell" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>
                      {formatDuration(track.duration)}
                    </td>

                    <td className="track-cell" style={{ textAlign: 'center' }}>
                      <button 
                        className="like-heart-btn liked"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(track.id);
                        }}
                        title="Remove from Liked Songs"
                      >
                        <Heart size={16} fill="#FF2A3A" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <Music size={48} color="#FF2A3A" style={{ marginBottom: '16px', opacity: 0.7 }} />
            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '8px' }}>Your library is empty</h2>
            <p>Save songs by clicking the heart icon on any song.</p>
          </div>
        )}
      </div>
    </div>
  );
}
