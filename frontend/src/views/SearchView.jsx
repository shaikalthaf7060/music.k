import React, { useState, useEffect } from 'react';
import { Play, Pause, Heart, Clock, Search as SearchIcon, Music, Sparkles, ListPlus } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { searchMusicOnline, RECENT_PLAYLISTS, ONLINE_CHARTS } from '../services/api';

const DEFAULT_COVER = "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg";

function formatDuration(sec) {
  if (!sec || isNaN(sec)) return "3:30";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function SearchView({ searchQuery }) {
  const { currentTrack, isPlaying, playTrack, togglePlay, likedTrackIds, toggleLike, navigateTo, setQueue } = useAudio();
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  const handleAddToQueue = (track, e) => {
    e.stopPropagation();
    setQueue(prev => [...(Array.isArray(prev) ? prev : []), track]);
  };

  return (
    <div className="search-view" style={{ padding: '24px 36px 120px' }}>
      {/* If Search Query is active */}
      {searchQuery && searchQuery.trim().length > 0 ? (
        <div>
          {isSearching && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF2A3A', marginBottom: '20px', fontSize: '0.92rem', fontWeight: 600 }}>
              <Sparkles size={16} />
              <span>Searching music catalog...</span>
            </div>
          )}

          {results && results.tracks.length === 0 && !isSearching ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}>
              <Music size={44} color="#FF2A3A" style={{ marginBottom: '16px', opacity: 0.8 }} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '8px', color: '#FFFFFF' }}>No results found for "{searchQuery}"</h2>
              <p style={{ fontSize: '0.9rem' }}>Try searching by artist (e.g. "Arijit Singh", "Coldplay", "Sid Sriram") or track title.</p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF' }}>
                  Search Results ({results?.tracks.length || 0})
                </h2>
              </div>

              <table className="tracks-table">
                <thead>
                  <tr>
                    <th style={{ width: '48px', textAlign: 'center' }}>#</th>
                    <th style={{ paddingLeft: '12px' }}>Title</th>
                    <th style={{ paddingLeft: '24px' }}>Album</th>
                    <th style={{ paddingLeft: '24px', width: '100px' }}>Year</th>
                    <th style={{ width: '80px', textAlign: 'right', paddingRight: '16px' }}>
                      <Clock size={15} style={{ verticalAlign: 'middle' }} />
                    </th>
                    <th style={{ width: '80px', textAlign: 'center' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {results?.tracks.map((track, idx) => {
                    const isCurrent = currentTrack && currentTrack.id === track.id;
                    const isLiked = (likedTrackIds || []).includes(track.id);
                    const isHovered = hoveredIndex === idx;

                    return (
                      <tr 
                        key={track.id || idx}
                        className={`track-row ${isCurrent ? 'playing' : ''}`}
                        onClick={() => handleTrackClick(track, results.tracks)}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <td className="track-cell track-num-cell" style={{ width: '48px' }}>
                          {isCurrent && isPlaying ? (
                            <div className="sound-wave" style={{ justifyContent: 'center' }}>
                              <span /><span /><span /><span />
                            </div>
                          ) : isHovered ? (
                            <Play size={16} fill="#FFFFFF" color="#FFFFFF" style={{ margin: '0 auto', display: 'block' }} />
                          ) : (
                            idx + 1
                          )}
                        </td>

                        <td className="track-cell" style={{ paddingLeft: '12px' }}>
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

                        <td className="track-cell" style={{ paddingLeft: '24px', color: '#9CA3AF', fontSize: '0.85rem' }}>
                          {track.album}
                        </td>

                        <td className="track-cell" style={{ paddingLeft: '24px', color: '#9CA3AF', fontSize: '0.85rem' }}>
                          {track.year || '2024'}
                        </td>

                        <td className="track-cell" style={{ textAlign: 'right', paddingRight: '16px', color: '#9CA3AF', fontSize: '0.85rem' }}>
                          {formatDuration(track.duration)}
                        </td>

                        <td className="track-cell" style={{ textAlign: 'center', width: '80px' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <button 
                              className="row-action-btn"
                              onClick={(e) => handleAddToQueue(track, e)}
                              title="Add to Queue"
                              style={{ opacity: isHovered ? 1 : 0.4 }}
                            >
                              <ListPlus size={16} color="#9CA3AF" />
                            </button>

                            <button 
                              className={`like-heart-btn ${isLiked ? 'liked' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(track.id);
                              }}
                              title={isLiked ? "Unlike" : "Like"}
                            >
                              <Heart size={16} fill={isLiked ? "#FF2A3A" : "none"} strokeWidth={1.8} />
                            </button>
                          </div>
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
        /* Landing View: Search Chips & Recent Playlists Glass Cards */
        <div>
          {/* Quick Search Chips with Glassmorphism */}
          <div style={{ textAlign: 'center', padding: '24px 0 36px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(229, 9, 20, 0.1)', border: '1px solid rgba(229, 9, 20, 0.25)', marginBottom: '16px' }}>
              <Sparkles size={15} color="#FF2A3A" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FF2A3A', letterSpacing: '0.5px' }}>
                ONLINE STREAMING DASHBOARD
              </span>
            </div>
            
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px', letterSpacing: '-0.5px' }}>
              Search Any Song Worldwide
            </h1>
            <p style={{ color: '#9CA3AF', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 24px' }}>
              Type any song, artist, or album name in the search bar above to stream instantly.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', maxWidth: '780px', margin: '0 auto' }}>
              {['Arijit Singh', 'Sid Sriram', 'Harris Jayaraj', 'Anirudh', 'Coldplay', 'Eminem', 'The Weeknd', 'Taylor Swift', 'Travis Scott', 'Drake', 'Pritam', 'AR Rahman'].map(tag => (
                <button
                  key={tag}
                  className="badge-pill-btn"
                  onClick={() => {
                    searchMusicOnline(tag).then(res => {
                      setResults(res);
                    });
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Playlists Grid */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                Recent Playlists
              </h2>
              <span style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>
                Curated Collections
              </span>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', 
              gap: '22px' 
            }}>
              {RECENT_PLAYLISTS.map((pl) => {
                const isPlPlaying = pl.tracks.some(t => currentTrack && t.id === currentTrack.id) && isPlaying;

                return (
                  <div
                    key={pl.id}
                    className="glass-panel playlist-card-hover"
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onClick={() => navigateTo('playlist', pl.id)}
                  >
                    <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', borderRadius: '10px', overflow: 'hidden', marginBottom: '14px', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
                      <img 
                        src={pl.coverUrl} 
                        alt={pl.title}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      
                      {/* Floating Play Button */}
                      <button
                        className="main-play-btn"
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          width: '42px',
                          height: '42px',
                          boxShadow: '0 4px 16px rgba(229, 9, 20, 0.5)'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (pl.tracks && pl.tracks.length > 0) {
                            playTrack(pl.tracks[0], pl.tracks);
                          }
                        }}
                        title={isPlPlaying ? "Pause" : `Play ${pl.title}`}
                      >
                        {isPlPlaying ? (
                          <Pause size={18} fill="#FFFFFF" />
                        ) : (
                          <Play size={18} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                        )}
                      </button>
                    </div>

                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pl.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#9CA3AF', lineHeight: '1.35', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {pl.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
