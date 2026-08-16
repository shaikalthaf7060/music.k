import React from 'react';
import { Play, Pause, Flame, Sparkles, TrendingUp, Radio, Globe } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { ONLINE_CHARTS, ONLINE_PLAYLISTS, ONLINE_ARTISTS } from '../services/api';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomeView() {
  const { currentTrack, isPlaying, playTrack, togglePlay, navigateTo } = useAudio();

  const handlePlayCard = (track, list) => {
    if (currentTrack && currentTrack.id === track.id) {
      togglePlay();
    } else {
      playTrack(track, list);
    }
  };

  const quickPicks = ONLINE_CHARTS.slice(0, 6);
  const hiphopTracks = ONLINE_CHARTS.filter(t => t.genre.includes('Hip-Hop') || t.genre.includes('Trap') || t.genre.includes('Rage'));
  const electronicTracks = ONLINE_CHARTS.filter(t => t.genre.includes('Synth') || t.genre.includes('Pop') || t.genre.includes('EDM') || t.genre.includes('Electronic'));

  return (
    <div className="home-view">
      {/* Dynamic Greeting Hero Banner */}
      <div className="hero-banner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="greeting-text">{getGreeting()}</h1>
          <span className="brand-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={12} /> YOUTIFY ONLINE STREAMING
          </span>
        </div>

        {/* Quick Access 6-Grid */}
        <div className="quick-grid">
          {quickPicks.map(track => {
            const isCurrent = currentTrack && currentTrack.id === track.id;
            return (
              <div 
                key={track.id} 
                className="quick-card"
                onClick={() => handlePlayCard(track, quickPicks)}
              >
                <img src={track.coverUrl} alt={track.title} className="quick-card-img" />
                <span className="quick-card-title">{track.title}</span>
                
                <button 
                  className="quick-play-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayCard(track, quickPicks);
                  }}
                  title={isCurrent && isPlaying ? "Pause" : "Play"}
                >
                  {isCurrent && isPlaying ? (
                    <Pause size={18} fill="#ffffff" />
                  ) : (
                    <Play size={18} fill="#ffffff" style={{ marginLeft: '2px' }} />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: Trending Now & Global Charts */}
      <section className="section-wrapper">
        <div className="section-header">
          <div>
            <h2 className="section-title">Global Red Top Charts 🔴</h2>
            <p className="section-subtitle">The biggest streamed hits on YouTube & Spotify worldwide</p>
          </div>
          <button className="see-all-btn" onClick={() => navigateTo('library')}>See All</button>
        </div>

        <div className="cards-grid">
          {ONLINE_PLAYLISTS.map(pl => (
            <div 
              key={pl.id}
              className="media-card"
              onClick={() => navigateTo('playlist', pl.id)}
            >
              <div className="media-card-img-wrapper">
                <img src={pl.coverUrl} alt={pl.title} className="media-card-img" />
                <button 
                  className="media-play-overlay-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const firstTrack = ONLINE_CHARTS.find(t => t.id === pl.tracks[0]) || ONLINE_CHARTS[0];
                    playTrack(firstTrack);
                  }}
                  title="Play Playlist"
                >
                  <Play size={20} fill="#ffffff" style={{ marginLeft: '3px' }} />
                </button>
              </div>
              <h3 className="media-card-title">{pl.title}</h3>
              <p className="media-card-desc">{pl.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Hip-Hop, Phonk & Bass */}
      <section className="section-wrapper">
        <div className="section-header">
          <div>
            <h2 className="section-title">Hip-Hop & Heavy 808s</h2>
            <p className="section-subtitle">West Coast anthems, rage beats, and legendary verses</p>
          </div>
        </div>

        <div className="cards-grid">
          {hiphopTracks.map(track => {
            const isCurrent = currentTrack && currentTrack.id === track.id;
            return (
              <div 
                key={track.id}
                className="media-card"
                onClick={() => handlePlayCard(track, hiphopTracks)}
              >
                <div className="media-card-img-wrapper">
                  <img src={track.coverUrl} alt={track.title} className="media-card-img" />
                  <button 
                    className="media-play-overlay-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayCard(track, hiphopTracks);
                    }}
                    title={isCurrent && isPlaying ? "Pause" : "Play"}
                  >
                    {isCurrent && isPlaying ? (
                      <Pause size={20} fill="#ffffff" />
                    ) : (
                      <Play size={20} fill="#ffffff" style={{ marginLeft: '3px' }} />
                    )}
                  </button>
                </div>
                <h3 className="media-card-title">{track.title}</h3>
                <p className="media-card-desc">{track.artist} • {track.genre}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section: Featured Global Artists */}
      <section className="section-wrapper">
        <div className="section-header">
          <div>
            <h2 className="section-title">Global Icons</h2>
            <p className="section-subtitle">Top stream chart dominators on the red platform</p>
          </div>
        </div>

        <div className="cards-grid">
          {ONLINE_ARTISTS.map(artist => (
            <div 
              key={artist.id}
              className="media-card"
              onClick={() => {
                const artistTrack = ONLINE_CHARTS.find(t => t.artist.includes(artist.name)) || ONLINE_CHARTS[0];
                playTrack(artistTrack);
              }}
            >
              <div className="media-card-img-wrapper" style={{ borderRadius: '50%' }}>
                <img src={artist.image} alt={artist.name} className="media-card-img" style={{ borderRadius: '50%' }} />
                <button 
                  className="media-play-overlay-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const artistTrack = ONLINE_CHARTS.find(t => t.artist.includes(artist.name)) || ONLINE_CHARTS[0];
                    playTrack(artistTrack);
                  }}
                  title={`Play ${artist.name}`}
                >
                  <Play size={20} fill="#ffffff" style={{ marginLeft: '3px' }} />
                </button>
              </div>
              <h3 className="media-card-title" style={{ textAlign: 'center' }}>{artist.name}</h3>
              <p className="media-card-desc" style={{ textAlign: 'center' }}>{artist.monthlyListeners} monthly listeners</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Electronic, Synthwave & Pop */}
      <section className="section-wrapper">
        <div className="section-header">
          <div>
            <h2 className="section-title">Synthwave, Nu-Disco & Euphoric EDM</h2>
            <p className="section-subtitle">High-speed melodies, vocoders, and festival drops</p>
          </div>
        </div>

        <div className="cards-grid">
          {electronicTracks.map(track => {
            const isCurrent = currentTrack && currentTrack.id === track.id;
            return (
              <div 
                key={track.id}
                className="media-card"
                onClick={() => handlePlayCard(track, electronicTracks)}
              >
                <div className="media-card-img-wrapper">
                  <img src={track.coverUrl} alt={track.title} className="media-card-img" />
                  <button 
                    className="media-play-overlay-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayCard(track, electronicTracks);
                    }}
                    title={isCurrent && isPlaying ? "Pause" : "Play"}
                  >
                    {isCurrent && isPlaying ? (
                      <Pause size={20} fill="#ffffff" />
                    ) : (
                      <Play size={20} fill="#ffffff" style={{ marginLeft: '3px' }} />
                    )}
                  </button>
                </div>
                <h3 className="media-card-title">{track.title}</h3>
                <p className="media-card-desc">{track.artist} • {track.genre}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
