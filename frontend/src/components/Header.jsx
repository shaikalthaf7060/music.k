import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  X, 
  Sliders, 
  Activity, 
  Radio, 
  Sparkles,
  User
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function Header({ searchQuery, setSearchQuery }) {
  const { 
    currentView, 
    navigateTo, 
    setIsEqualizerOpen, 
    setIsVisualizerOpen, 
    isVisualizerOpen,
    isEqualizerOpen 
  } = useAudio();

  const [activeFilter, setActiveFilter] = useState('All');

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 0 && currentView !== 'search') {
      navigateTo('search');
    }
  };

  return (
    <header className="top-header">
      <div className="header-left">
        {/* Navigation History Arrows */}
        <div className="history-btns">
          <button 
            className="circle-nav-btn" 
            title="Go Back"
            onClick={() => window.history.back()}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="circle-nav-btn" 
            title="Go Forward"
            onClick={() => window.history.forward()}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon-left" />
          <input 
            type="text"
            className="search-input"
            placeholder="Search tracks, artists, or genres..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (currentView !== 'search') navigateTo('search');
            }}
          />
          {searchQuery && (
            <button 
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
          {['All', 'Music', 'Phonk & Bass', 'Lo-Fi Chill'].map(filter => (
            <button
              key={filter}
              className={`badge-pill-btn ${activeFilter === filter ? 'active-red' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="header-right">
        {/* Audio Equalizer Quick Trigger */}
        <button 
          className={`badge-pill-btn ${isEqualizerOpen ? 'active-red' : ''}`}
          onClick={() => setIsEqualizerOpen(prev => !prev)}
          title="Audio Equalizer & FX"
        >
          <Sliders size={16} color="#FF2A3A" />
          <span>EQ</span>
        </button>

        {/* Visualizer Quick Trigger */}
        <button 
          className={`badge-pill-btn ${isVisualizerOpen ? 'active-red' : ''}`}
          onClick={() => setIsVisualizerOpen(prev => !prev)}
          title="Real-time Sound Visualizer"
        >
          <Activity size={16} color="#FF2A3A" />
          <span>Visualizer</span>
        </button>

        {/* User Profile Pill */}
        <div className="user-avatar-btn" title="music.k VIP Red Account">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" 
            alt="Profile" 
            className="user-avatar-img" 
          />
          <span className="user-name">Shaik</span>
        </div>
      </div>
    </header>
  );
}
