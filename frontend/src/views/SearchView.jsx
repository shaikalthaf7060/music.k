import React, { useState, useEffect } from 'react';
import { Play, Pause, Heart, Clock, Search as SearchIcon, Music, Sparkles, ListMusic } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { searchMusicOnline, RECENT_PLAYLISTS, ONLINE_CHARTS } from '../services/api';

const DEFAULT_COVER = "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/6e/bf/a66ebf79-5008-8948-b352-a790fc87446b/19UM1IM04638.rgb.jpg/600x600bb.jpg";

function formatDuration(sec) {
  if (!sec || isNaN(sec)) return "3:30";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function SearchView({ searchQuery }) {
  const { currentTrack, isPlaying, playTrack, togglePlay, likedTrackIds, toggleLike, navigateTo } = useAudio();
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

  const handlePlayPlaylist = (playlist) => {
    if (playlist.tracks && playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0], playlist.tracks);
    }
  };

  return (
    <div className="search-view" style={{ padding: '24px 32px 100px' }}>
      {/* If Search Query is active */}
      {searchQuery && searchQuery.trim().length > 0 ? (
        <div>
          {isSearching && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--red-bright)', marginBottom: '20px', fontSize: '0.95rem', fontWeight: 600 }}>
              <Sparkles size={18} />
              <span>Searching live full-length songs...</span>
            </div>
          )}

          {results && results.tracks.length === 0 && !isSearching ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <Music size={48} color="#FF2A3A" style={{ marginBottom: '16px', opacity: 0.7 }} />
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'white' }}>No results found for "{searchQuery}"</h2>
              <p>Try searching for artists (e.g. "Coldplay", "Eminem", "Arijit Singh", "The Weeknd") or song titles.</p>
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
                    const isLiked = (likedTrackIds || []).includes(track.id);

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
        /* Landing State: Search Tags + Recent Playlists Grid (No Trending Table) */
        <div>
          {/* Quick Search Chips */}
          <div style={{ textAlign: 'center', padding: '24px 0 32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(229, 9, 20, 0.12)', border: '1px solid rgba(229, 9, 20, 0.3)', marginBottom: '12px' }}>
              <Sparkles size={16} color="#FF2A3A" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FF2A3A', letterSpacing: '0.5px' }}>
                100% FULL-LENGTH SONGS • ZERO ADS
              </span>
            </div>
            
            <h1 className="greeting-text" style={{ fontSize: '2.2rem', marginBottom: '8px', fontWeight: 800 }}>
              Search Any Song Worldwide
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 20px' }}>
              Type any song, artist, or album name in the search bar above to stream instantly.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', maxWidth: '750px', margin: '0 auto' }}>
              {['Arijit Singh', 'Sid Sriram', 'Harris Jayaraj', 'Anirudh', 'Coldplay', 'Eminem', 'The Weeknd', 'Taylor Swift', 'Travis Scott', 'Drake'].map(tag => (
                <button
                  key={tag}
                  className="badge-pill-btn"
                  onClick={() => {
                    searchMusicOnline(tag).then(res => {
                      setResults(res);
                    });
                  }}
                  style={{ padding: '7px 16px', fontSize: '0.86rem' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Playlists Grid */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ListMusic size={22} color="#FF2A3A" />
                <h2 className="section-title" style={{ fontSize: '1.35rem', color: 'white', margin: 0 }}>
                  Recent Playlists
                </h2>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Full-Length Tracks
              </span>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', 
              gap: '20px' 
            }}>
              {RECENT_PLAYLISTS.map((pl) => {
                const isPlPlaying = pl.tracks.some(t => currentTrack && t.id === currentTrack.id) && isPlaying;

                return (
                  <div
                    key={pl.id}
                    className="glossy-card"
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      background: 'rgba(22, 22, 28, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      position: 'relative'
                    }}
                    onClick={() => navigateTo('playlist', pl.id)}
                  >
                    <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', borderRadius: '10px', overflow: 'hidden', marginBottom: '14px', boxShadow: '0 8px 20px rgba(0,0,0,0.6)' }}>
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
                          width: '44px',
                          height: '44px',
                          boxShadow: '0 4px 16px rgba(229, 9, 20, 0.6)'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPlaylist(pl);
                        }}
                        title={isPlPlaying ? "Pause" : `Play ${pl.title}`}
                      >
                        {isPlPlaying ? (
                          <Pause size={20} fill="#ffffff" />
                        ) : (
                          <Play size={20} fill="#ffffff" style={{ marginLeft: '2px' }} />
                        )}
                      </button>
                    </div>

                    <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'white', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pl.title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
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
