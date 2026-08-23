import React from 'react';
import { Search, Library, Heart, ListMusic, PlusCircle, Sparkles } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { RECENT_PLAYLISTS } from '../services/api';
import Logo from './Logo';

export default function Sidebar() {
  const { currentView, navigateTo, viewParam, setIsCreatePlaylistOpen } = useAudio();

  return (
    <aside className="sidebar glossy-sidebar" style={{ width: '250px', padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
      {/* Brand Header with Logo */}
      <div 
        className="brand-header" 
        onClick={() => navigateTo('search')} 
        style={{ 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          padding: '8px 12px', 
          marginBottom: '28px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}
      >
        <Logo size={32} />
        <div className="brand-title" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
          music<span className="red-dot">.k</span>
        </div>
      </div>

      {/* Main Navigation Pill Group */}
      <ul className="nav-list" style={{ gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <button 
            className={`nav-item-btn ${currentView === 'search' ? 'active-pill' : ''}`}
            onClick={() => navigateTo('search')}
          >
            <Search size={20} className="nav-icon" />
            <span>Search</span>
          </button>
        </li>
        <li>
          <button 
            className={`nav-item-btn ${currentView === 'library' ? 'active-pill' : ''}`}
            onClick={() => navigateTo('library')}
          >
            <Library size={20} className="nav-icon" />
            <span>Your Library</span>
          </button>
        </li>
        <li>
          <button 
            className={`nav-item-btn ${currentView === 'liked' ? 'active-pill' : ''}`}
            onClick={() => navigateTo('liked')}
          >
            <Heart size={20} className="nav-icon" fill={currentView === 'liked' ? "#FF2A3A" : "none"} />
            <span>Liked Songs</span>
          </button>
        </li>
      </ul>

      {/* Playlists Section Divider */}
      <div style={{ margin: '24px 0 12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />

      {/* Dedicated Playlists List */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 10px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#9CA3AF' }}>
            Playlists
          </span>
          <button 
            onClick={() => setIsCreatePlaylistOpen(true)}
            style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '2px' }}
            title="Create Playlist"
          >
            <PlusCircle size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {RECENT_PLAYLISTS.map(pl => {
            const isActive = currentView === 'playlist' && viewParam === pl.id;

            return (
              <button
                key={pl.id}
                onClick={() => navigateTo('playlist', pl.id)}
                style={{
                  background: isActive ? 'rgba(229, 9, 20, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(229, 9, 20, 0.35)' : '1px solid transparent',
                  color: isActive ? '#FFFFFF' : '#9CA3AF',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'all 0.18s ease'
                }}
                className="playlist-nav-link"
              >
                {pl.title}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
