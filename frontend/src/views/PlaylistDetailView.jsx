import React from 'react';
import { Play, Pause, Shuffle, Heart, Clock, Music, Trash2, Plus } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { ONLINE_PLAYLISTS, ONLINE_CHARTS } from '../services/api';

function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function PlaylistDetailView({ playlistId }) {
  const { 
    currentTrack, 
    isPlaying, 
    playTrack, 
    togglePlay, 
    likedTrackIds, 
    toggleLike, 
    customPlaylists,
    toggleShuffle,
    isShuffle
  } = useAudio();

  // Look in custom playlists or featured playlists
  let playlist = customPlaylists.find(p => p.id === playlistId);
  if (!playlist) {
    playlist = ONLINE_PLAYLISTS.find(p => p.id === playlistId);
  }

  if (!playlist) {
    return (
      <div style={{ padding: '40px 28px', textAlign: 'center' }}>
        <h2>Playlist not found</h2>
      </div>
    );
  }

  // Resolve track objects
  const tracks = playlist.tracks.map(tId => {
    if (typeof tId === 'object') return tId;
    return ONLINE_CHARTS.find(t => t.id === tId);
  }).filter(Boolean);

  const totalDurationSec = tracks.reduce((acc, t) => acc + (t.duration || 200), 0);
  const totalMins = Math.floor(totalDurationSec / 60);

  const isCurrentPlaylistPlaying = tracks.some(t => currentTrack && t.id === currentTrack.id);

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      if (isCurrentPlaylistPlaying) {
        togglePlay();
      } else {
        playTrack(tracks[0], tracks);
      }
    }
  };

  return (
    <div className="playlist-detail-view">
      {/* Hero Banner with Red Ambient Gradient */}
      <div style={{ 
        padding: '36px 28px 24px', 
        background: 'linear-gradient(180deg, rgba(229, 9, 20, 0.35) 0%, rgba(18, 18, 22, 0.6) 100%)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '24px'
      }}>
        <img 
          src={playlist.coverUrl} 
          alt={playlist.title} 
          style={{ 
            width: '190px', 
            height: '190px', 
            borderRadius: '8px', 
            objectFit: 'cover', 
            boxShadow: 'var(--shadow-lg)',
            flexShrink: 0 
          }} 
        />

        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--red-bright)' }}>
            Playlist • Online Stream
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 800, margin: '8px 0 12px', letterSpacing: '-1px' }}>
            {playlist.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '12px' }}>
            {playlist.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: 700, color: 'white' }}>music.k</span>
            <span>•</span>
            <span>{tracks.length} songs</span>
            <span>•</span>
            <span>about {totalMins} min</span>
          </div>
        </div>
      </div>

      {/* Play Actions Row */}
      <div style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button 
          className="main-play-btn" 
          style={{ width: '54px', height: '54px' }}
          onClick={handlePlayAll}
          title={isCurrentPlaylistPlaying && isPlaying ? "Pause" : "Play Playlist"}
        >
          {isCurrentPlaylistPlaying && isPlaying ? (
            <Pause size={24} fill="#ffffff" />
          ) : (
            <Play size={24} fill="#ffffff" style={{ marginLeft: '3px' }} />
          )}
        </button>

        <button 
          className={`action-icon-btn ${isShuffle ? 'active-red' : ''}`}
          onClick={toggleShuffle}
          title="Shuffle Playlist"
          style={{ width: '38px', height: '38px' }}
        >
          <Shuffle size={22} color={isShuffle ? "#FF2A3A" : "var(--text-secondary)"} />
        </button>
      </div>

      {/* Tracks Table */}
      <div style={{ padding: '0 28px 40px' }}>
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
            {tracks.map((track, idx) => {
              const isCurrent = currentTrack && currentTrack.id === track.id;
              const isLiked = likedTrackIds.includes(track.id);

              return (
                <tr 
                  key={track.id}
                  className={`track-row ${isCurrent ? 'playing' : ''}`}
                  onClick={() => playTrack(track, tracks)}
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
