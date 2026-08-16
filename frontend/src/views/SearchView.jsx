import React, { useState, useEffect } from 'react';
import { Play, Pause, Heart, Plus, Clock, Search as SearchIcon, Music, Globe, Sparkles } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { searchMusicOnline, ONLINE_GENRES, ONLINE_CHARTS } from '../services/api';

function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function SearchView({ searchQuery }) {
  const { currentTrack, isPlaying, playTrack, togglePlay, likedTrackIds, toggleLike, navigateTo } = useAudio();
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        searchMusicOnline(searchQuery).then(res => {
          setResults(res);
          setIsSearching(false);
        });
      }, 250);

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
      playTrack(track, trackList);
    }
  };

  return (
    <div className="search-view" style={{ padding: '24px 28px' }}>
      {/* If Search Query is active */}
      {searchQuery.trim().length > 0 ? (
        <div>
          {isSearching && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--red-bright)', marginBottom: '16px', fontSize: '0.9rem' }}>
              <Sparkles size={16} className="spin-anim" />
              <span>Searching online music catalog...</span>
            </div>
          )}

          {results && results.tracks.length === 0 && results.artists.length === 0 && !isSearching ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <Music size={48} color="#FF2A3A" style={{ marginBottom: '16px' }} />
              <h2>No results found for "{searchQuery}"</h2>
              <p>Search for any song, artist (e.g. "The Weeknd", "Drake", "Eminem", "Taylor Swift", "Arijit Singh"), or genre.</p>
            </div>
          ) : (
            <div>
              {/* Top Result + Songs Split */}
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 380px) 1fr', gap: '24px', marginBottom: '32px' }}>
                {/* Top Result Card */}
                {results?.topResult && (
                  <div>
                    <h2 className="section-title" style={{ marginBottom: '16px' }}>Top Result</h2>
                    <div 
                      className="media-card" 
                      style={{ padding: '20px', height: 'calc(100% - 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                      onClick={() => {
                        if (results.topResult.type === 'track') {
                          handleTrackClick(results.topResult.data, results.tracks);
                        } else if (results.topResult.type === 'playlist') {
                          navigateTo('playlist', results.topResult.data.id);
                        }
                      }}
                    >
                      <div>
                        <img 
                          src={results.topResult.data.coverUrl || results.topResult.data.image} 
                          alt="Top Result" 
                          style={{ 
                            width: '100px', 
                            height: '100px', 
                            borderRadius: results.topResult.type === 'artist' ? '50%' : '8px', 
                            objectFit: 'cover',
                            marginBottom: '16px',
                            boxShadow: 'var(--shadow-md)'
                          }} 
                        />
                        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>
                          {results.topResult.data.title || results.topResult.data.name}
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                          <span style={{ color: 'var(--red-bright)', fontWeight: 700 }}>
                            {results.topResult.type.toUpperCase()}
                          </span> • {results.topResult.data.artist || results.topResult.data.genre || "Online Stream"}
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <button 
                          className="main-play-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (results.topResult.type === 'track') {
                              handleTrackClick(results.topResult.data, results.tracks);
                            }
                          }}
                        >
                          {currentTrack?.id === results.topResult.data?.id && isPlaying ? (
                            <Pause size={20} fill="#ffffff" />
                          ) : (
                            <Play size={20} fill="#ffffff" style={{ marginLeft: '2px' }} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Matching Songs List */}
                <div>
                  <h2 className="section-title" style={{ marginBottom: '16px' }}>
                    Songs ({results?.tracks.length || 0})
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {results?.tracks.slice(0, 6).map(track => {
                      const isCurrent = currentTrack && currentTrack.id === track.id;
                      const isLiked = likedTrackIds.includes(track.id);

                      return (
                        <div 
                          key={track.id}
                          className={`playlist-item-row ${isCurrent ? 'active' : ''}`}
                          style={{ justifyContent: 'space-between', padding: '8px 12px' }}
                          onClick={() => handleTrackClick(track, results.tracks)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                            <img src={track.coverUrl} alt={track.title} style={{ width: '42px', height: '42px', borderRadius: '4px', objectFit: 'cover' }} />
                            <div className="playlist-row-info">
                              <span className="playlist-row-title" style={{ color: isCurrent ? 'var(--red-bright)' : 'white' }}>
                                {track.title}
                              </span>
                              <span className="playlist-row-subtitle">{track.artist}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <button 
                              className={`like-heart-btn ${isLiked ? 'liked' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(track.id);
                              }}
                            >
                              <Heart size={16} fill={isLiked ? "#FF2A3A" : "none"} />
                            </button>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: '35px' }}>
                              {formatDuration(track.duration)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Matching Playlists */}
              {results?.playlists.length > 0 && (
                <section style={{ marginTop: '32px' }}>
                  <h2 className="section-title" style={{ marginBottom: '16px' }}>Playlists</h2>
                  <div className="cards-grid">
                    {results.playlists.map(pl => (
                      <div 
                        key={pl.id}
                        className="media-card"
                        onClick={() => navigateTo('playlist', pl.id)}
                      >
                        <div className="media-card-img-wrapper">
                          <img src={pl.coverUrl} alt={pl.title} className="media-card-img" />
                          <button className="media-play-overlay-btn">
                            <Play size={20} fill="#ffffff" style={{ marginLeft: '3px' }} />
                          </button>
                        </div>
                        <h3 className="media-card-title">{pl.title}</h3>
                        <p className="media-card-desc">{pl.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Browse All Genres & Moods Grid */
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Globe size={24} color="#FF2A3A" />
            <h1 className="greeting-text" style={{ fontSize: '1.8rem' }}>
              Explore Live Online Streaming
            </h1>
          </div>

          <div className="genre-grid">
            {ONLINE_GENRES.map(genre => (
              <div 
                key={genre.id}
                className="genre-tile"
                style={{ background: genre.color }}
                onClick={() => {
                  searchMusicOnline(genre.query).then(res => {
                    if (res.tracks.length > 0) {
                      playTrack(res.tracks[0], res.tracks);
                    }
                  });
                }}
              >
                <h3 className="genre-name">{genre.name}</h3>
                <img src={genre.image} alt={genre.name} className="genre-img" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
