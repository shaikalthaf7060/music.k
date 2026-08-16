import React from 'react';
import { Play, Pause, Heart, Clock, Music } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { ONLINE_CHARTS } from '../services/api';

function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function LikedSongsView() {
  const { currentTrack, isPlaying, playTrack, togglePlay, likedTrackIds, toggleLike } = useAudio();

  const likedTracks = ONLINE_CHARTS.filter(t => likedTrackIds.includes(t.id));
  const isCurrentPlaying = likedTracks.some(t => currentTrack && t.id === currentTrack.id);

  const handlePlayAll = () => {
    if (likedTracks.length > 0) {
      if (isCurrentPlaying) {
        togglePlay();
      } else {
        playTrack(likedTracks[0], likedTracks);
      }
    }
  };

  return (
    <div className="liked-songs-view">
      {/* Gradient Hero */}
      <div style={{
        padding: '36px 28px 24px',
        background: 'linear-gradient(180deg, #5b060b 0%, #16161c 100%)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '24px'
      }}>
        <div style={{
          width: '180px',
          height: '180px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #450a0a, #E50914, #ff6b81)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          flexShrink: 0
        }}>
          <Heart size={80} fill="#ffffff" />
        </div>

        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--red-bright)' }}>
            Playlist
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, margin: '8px 0 12px', letterSpacing: '-1px' }}>
            Liked Songs
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: 700, color: 'white' }}>Shaik</span>
            <span>•</span>
            <span>{likedTracks.length} songs</span>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div style={{ padding: '20px 28px' }}>
        <button 
          className="main-play-btn" 
          style={{ width: '54px', height: '54px' }}
          onClick={handlePlayAll}
          title="Play Liked Songs"
          disabled={likedTracks.length === 0}
        >
          {isCurrentPlaying && isPlaying ? (
            <Pause size={24} fill="#ffffff" />
          ) : (
            <Play size={24} fill="#ffffff" style={{ marginLeft: '3px' }} />
          )}
        </button>
      </div>

      {/* Tracks Table */}
      <div style={{ padding: '0 28px 40px' }}>
        {likedTracks.length > 0 ? (
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
              {likedTracks.map((track, idx) => {
                const isCurrent = currentTrack && currentTrack.id === track.id;

                return (
                  <tr 
                    key={track.id}
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
            <h2>Songs you like will appear here</h2>
            <p>Save songs by tapping the heart icon on any track or player bar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
