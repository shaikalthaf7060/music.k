import React from 'react';
import { Play, Pause, Flame, Sparkles, TrendingUp, Radio } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { LOCAL_TRACKS, LOCAL_PLAYLISTS, LOCAL_ARTISTS } from '../services/api';

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

  const quickPicks = LOCAL_TRACKS.slice(0, 6);
  const synthwaveTracks = LOCAL_TRACKS.filter(t => t.genre.includes('Synth') || t.genre.includes('Cyber'));
  const chillTracks = LOCAL_TRACKS.filter(t => t.genre.includes('Lo-Fi') || t.genre.includes('Acoustic') || t.genre.includes('Funk'));

  return (
    <div className="home-view">
      {/* Dynamic Greeting Hero Banner */}
      <div className="hero-banner">
        <h1 className="greeting-text">{getGreeting()}</h1>

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
            <h2 className="section-title">Trending in Crimson</h2>
            <p className="section-subtitle">Top global hits and adrenaline beats on music.k</p>
          </div>
          <button className="see-all-btn" onClick={() => navigateTo('library')}>See All</button>
        </div>

        <div className="cards-grid">
          {LOCAL_PLAYLISTS.map(pl => (
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
                    const firstTrack = LOCAL_TRACKS.find(t => t.id === pl.tracks[0]) || LOCAL_TRACKS[0];
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

      {/* Section: Heavy Beats & High Energy */}
      <section className="section-wrapper">
        <div className="section-header">
          <div>
            <h2 className="section-title">Synthwave & Cyberpunk Velocity</h2>
            <p className="section-subtitle">Analog resonance, dark electro, and retro pulse</p>
          </div>
        </div>

        <div className="cards-grid">
          {synthwaveTracks.map(track => {
            const isCurrent = currentTrack && currentTrack.id === track.id;
            return (
              <div 
                key={track.id}
                className="media-card"
                onClick={() => handlePlayCard(track, synthwaveTracks)}
              >
                <div className="media-card-img-wrapper">
                  <img src={track.coverUrl} alt={track.title} className="media-card-img" />
                  <button 
                    className="media-play-overlay-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayCard(track, synthwaveTracks);
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

      {/* Section: Featured Artists */}
      <section className="section-wrapper">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Artists</h2>
            <p className="section-subtitle">Producers shaping the sound of the Red platform</p>
          </div>
        </div>

        <div className="cards-grid">
          {LOCAL_ARTISTS.map(artist => (
            <div 
              key={artist.id}
              className="media-card"
              onClick={() => {
                const artistTrack = LOCAL_TRACKS.find(t => t.artist === artist.name) || LOCAL_TRACKS[0];
                playTrack(artistTrack);
              }}
            >
              <div className="media-card-img-wrapper" style={{ borderRadius: '50%' }}>
                <img src={artist.image} alt={artist.name} className="media-card-img" style={{ borderRadius: '50%' }} />
                <button 
                  className="media-play-overlay-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const artistTrack = LOCAL_TRACKS.find(t => t.artist === artist.name) || LOCAL_TRACKS[0];
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

      {/* Section: Midnight Lo-Fi & Chill */}
      <section className="section-wrapper">
        <div className="section-header">
          <div>
            <h2 className="section-title">Midnight Beats & Lo-Fi Tapeloops</h2>
            <p className="section-subtitle">Cozy rain vibes, warm jazz chords, and subtle rhythms</p>
          </div>
        </div>

        <div className="cards-grid">
          {chillTracks.map(track => {
            const isCurrent = currentTrack && currentTrack.id === track.id;
            return (
              <div 
                key={track.id}
                className="media-card"
                onClick={() => handlePlayCard(track, chillTracks)}
              >
                <div className="media-card-img-wrapper">
                  <img src={track.coverUrl} alt={track.title} className="media-card-img" />
                  <button 
                    className="media-play-overlay-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayCard(track, chillTracks);
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
