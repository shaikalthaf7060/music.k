import React from 'react';
import { 
  Home, 
  Search, 
  Library, 
  PlusSquare, 
  Heart, 
  Disc, 
  Flame, 
  Radio, 
  Sparkles,
  Music
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { LOCAL_PLAYLISTS } from '../services/api';

export default function Sidebar() {
  const { 
    currentView, 
    viewParam, 
    navigateTo, 
    customPlaylists, 
    likedTrackIds, 
    setIsCreatePlaylistOpen 
  } = useAudio();

  return (
    <aside className="sidebar">
      {/* Top Nav Card */}
      <div className="sidebar-box">
        {/* Brand Header */}
        <div className="brand-header" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo">
            <Flame size={20} fill="#ffffff" />
          </div>
          <div className="brand-title">
            music<span className="red-dot">.k</span>
          </div>
          <span className="brand-badge">RED</span>
        </div>

        {/* Primary Navigation */}
        <ul className="nav-list">
          <li>
            <button 
              className={`nav-item-btn ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              <Home size={22} className="nav-icon" />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button 
              className={`nav-item-btn ${currentView === 'search' ? 'active' : ''}`}
              onClick={() => navigateTo('search')}
            >
              <Search size={22} className="nav-icon" />
              <span>Search</span>
            </button>
          </li>
          <li>
            <button 
              className={`nav-item-btn ${currentView === 'library' ? 'active' : ''}`}
              onClick={() => navigateTo('library')}
            >
              <Library size={22} className="nav-icon" />
              <span>Your Library</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Library & Playlists Box */}
      <div className="sidebar-box library-box">
        <div className="library-header">
          <button 
            className="library-title-btn"
            onClick={() => navigateTo('library')}
          >
            <Disc size={20} color="#FF2A3A" />
            <span>Playlists & Mixes</span>
          </button>
          
          <button 
            className="action-icon-btn" 
            title="Create Playlist"
            onClick={() => setIsCreatePlaylistOpen(true)}
          >
            <PlusSquare size={19} />
          </button>
        </div>

        {/* Liked Songs Quick Item */}
        <div 
          className={`playlist-item-row ${currentView === 'liked' ? 'active' : ''}`}
          onClick={() => navigateTo('liked')}
        >
          <div className="playlist-row-icon-liked">
            <Heart size={20} fill="#ffffff" />
          </div>
          <div className="playlist-row-info">
            <span className="playlist-row-title">Liked Songs</span>
            <span className="playlist-row-subtitle">{likedTrackIds.length} tracks • Auto-curated</span>
          </div>
        </div>

        {/* Playlist List Scrollable */}
        <div className="library-scroll">
          {/* Custom User Playlists */}
          {customPlaylists.map(pl => (
            <div 
              key={pl.id}
              className={`playlist-item-row ${currentView === 'playlist' && viewParam === pl.id ? 'active' : ''}`}
              onClick={() => navigateTo('playlist', pl.id)}
            >
              <img src={pl.coverUrl} alt={pl.title} className="playlist-row-img" />
              <div className="playlist-row-info">
                <span className="playlist-row-title">{pl.title}</span>
                <span className="playlist-row-subtitle">Playlist • By You</span>
              </div>
            </div>
          ))}

          {/* Featured Red Playlists */}
          {LOCAL_PLAYLISTS.map(pl => (
            <div 
              key={pl.id}
              className={`playlist-item-row ${currentView === 'playlist' && viewParam === pl.id ? 'active' : ''}`}
              onClick={() => navigateTo('playlist', pl.id)}
            >
              <img src={pl.coverUrl} alt={pl.title} className="playlist-row-img" />
              <div className="playlist-row-info">
                <span className="playlist-row-title">{pl.title}</span>
                <span className="playlist-row-subtitle">music.k Original</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
