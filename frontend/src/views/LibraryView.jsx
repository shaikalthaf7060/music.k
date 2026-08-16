import React, { useState } from 'react';
import { Plus, Heart, Disc, User, Music, Sparkles } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { ONLINE_PLAYLISTS, ONLINE_ARTISTS } from '../services/api';

export default function LibraryView() {
  const { 
    customPlaylists, 
    likedTrackIds, 
    setIsCreatePlaylistOpen, 
    navigateTo 
  } = useAudio();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'playlists', 'artists'

  return (
    <div className="library-view" style={{ padding: '24px 28px' }}>
      {/* Header & Filter Chips */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'all', label: 'All Library' },
            { id: 'playlists', label: 'Playlists' },
            { id: 'artists', label: 'Artists' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`badge-pill-btn ${activeTab === tab.id ? 'active-red' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button 
          className="btn-primary-red"
          onClick={() => setIsCreatePlaylistOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontSize: '0.85rem' }}
        >
          <Plus size={18} />
          <span>Create Playlist</span>
        </button>
      </div>

      <div className="cards-grid">
        {/* Liked Songs Special Card */}
        {(activeTab === 'all' || activeTab === 'playlists') && (
          <div 
            className="media-card"
            style={{ 
              background: 'linear-gradient(135deg, #450a0a 0%, #E50914 60%, #990000 100%)', 
              borderColor: 'rgba(255, 42, 58, 0.4)',
              cursor: 'pointer'
            }}
            onClick={() => navigateTo('liked')}
          >
            <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', padding: '12px' }}>
              <Heart size={44} fill="#ffffff" />
            </div>
            <h3 className="media-card-title" style={{ fontSize: '1.2rem' }}>Liked Songs</h3>
            <p className="media-card-desc" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {likedTrackIds.length} tracks • Your personal favorites
            </p>
          </div>
        )}

        {/* Custom User Playlists */}
        {(activeTab === 'all' || activeTab === 'playlists') && customPlaylists.map(pl => (
          <div 
            key={pl.id}
            className="media-card"
            onClick={() => navigateTo('playlist', pl.id)}
          >
            <div className="media-card-img-wrapper">
              <img src={pl.coverUrl} alt={pl.title} className="media-card-img" />
            </div>
            <h3 className="media-card-title">{pl.title}</h3>
            <p className="media-card-desc">{pl.description || "Custom Playlist"}</p>
          </div>
        ))}

        {/* Featured Online Playlists */}
        {(activeTab === 'all' || activeTab === 'playlists') && ONLINE_PLAYLISTS.map(pl => (
          <div 
            key={pl.id}
            className="media-card"
            onClick={() => navigateTo('playlist', pl.id)}
          >
            <div className="media-card-img-wrapper">
              <img src={pl.coverUrl} alt={pl.title} className="media-card-img" />
            </div>
            <h3 className="media-card-title">{pl.title}</h3>
            <p className="media-card-desc">{pl.description}</p>
          </div>
        ))}

        {/* Artists */}
        {(activeTab === 'all' || activeTab === 'artists') && ONLINE_ARTISTS.map(art => (
          <div 
            key={art.id}
            className="media-card"
            onClick={() => navigateTo('artist', art.name)}
          >
            <div className="media-card-img-wrapper" style={{ borderRadius: '50%' }}>
              <img src={art.image} alt={art.name} className="media-card-img" style={{ borderRadius: '50%' }} />
            </div>
            <h3 className="media-card-title" style={{ textAlign: 'center' }}>{art.name}</h3>
            <p className="media-card-desc" style={{ textAlign: 'center' }}>Artist • {art.monthlyListeners} listeners</p>
          </div>
        ))}
      </div>
    </div>
  );
}
