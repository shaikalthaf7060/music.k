import React, { useState, useEffect } from 'react';
import { Play, Pause, Heart, Clock, Search as SearchIcon, Music, Sparkles } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { searchMusicOnline, ONLINE_CHARTS } from '../services/api';

function formatDuration(sec) {
  if (!sec || isNaN(sec)) return "3:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function SearchView({ searchQuery }) {
  const { currentTrack, isPlaying, playTrack, togglePlay, likedTrackIds, toggleLike } = useAudio();
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery && searchQuery.trim().length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        searchMusicOnline(searchQuery).then(res => {
          setResults(res);
          setIsSearching(false);
        });
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setResults(null);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleTrackClick = (track, trackList) => {
    if (currentTrack && currentTrack.id === track.id) {
      togglePlay();
    } else {
      playTrack(track, trackList || results?.tracks || ONLINE_CHARTS);
    }
  };

  return (
    <div className="search-view" style={{ padding: '24px 32px' }}>
      {/* If Search Query is active */}
      {searchQuery && searchQuery.trim().length > 0 ? (
        <div>
          {isSearching && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--red-bright)', marginBottom: '20px', fontSize: '0.95rem', fontWeight: 600 }}>
              <Sparkles size={18} />
              <span>Searching live music catalog...</span>
            </div>
          )}

          {results && results.tracks.length === 0 && !isSearching ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <Music size={48} color="#FF2A3A" style={{ marginBottom: '16px', opacity: 0.7 }} />
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'white' }}>No results found for "{searchQuery}"</h2>
              <p>Try searching for popular artists (e.g. "Coldplay", "Eminem", "The Weeknd", "Taylor Swift", "Arijit Singh") or track titles.</p>
            </div>
          ) : (
            <div>
              <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '18px' }}>
                Search Results ({results?.tracks.length || 0})
              </h2>

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
                  {results?.tracks.map((track, idx) => {
                    const isCurrent = currentTrack && currentTrack.id === track.id;
                    const isLiked = likedTrackIds.includes(track.id);

                    return (
                      <tr 
                        key={track.id || idx}
                        className={`track-row ${isCurrent ? 'playing' : ''}`}
                        onClick={() => handleTrackClick(track, results.tracks)}
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
                          {track.year || '2026'}
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
          )}
        </div>
      ) : (
        /* Empty Search Prompt with quick suggestions */
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <SearchIcon size={52} color="#FF2A3A" style={{ marginBottom: '16px', opacity: 0.8 }} />
          <h1 className="greeting-text" style={{ fontSize: '2rem', marginBottom: '8px' }}>
            Search Millions of Songs
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 24px' }}>
            Type any song, artist, or album in the top search bar to stream live online.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
            {['The Weeknd', 'Coldplay', 'Eminem', 'Taylor Swift', 'Billie Eilish', 'Kendrick Lamar', 'Arijit Singh', 'Dua Lipa', 'Drake', 'Alan Walker'].map(tag => (
              <button
                key={tag}
                className="badge-pill-btn"
                onClick={() => {
                  searchMusicOnline(tag).then(res => {
                    setResults(res);
                  });
                }}
                style={{ padding: '8px 16px', fontSize: '0.88rem' }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
