import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, LogOut, ShieldCheck, LogIn } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function Header({ searchQuery, setSearchQuery }) {
  const { currentView, navigateTo, currentUser, authToken, logout, setIsAuthModalOpen } = useAudio();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 0 && currentView !== 'search') {
      navigateTo('search');
    }
  };

  return (
    <header className="top-header glossy-header">
      {/* Left: Navigation history arrows */}
      <div className="header-left">
        <div className="history-btns">
          <button 
            className="circle-nav-btn glossy-btn" 
            onClick={() => navigateTo('home')}
            title="Back to Home"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="circle-nav-btn glossy-btn" 
            onClick={() => navigateTo('library')}
            title="Go to Library"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Center: Live Music Search Bar with perfectly centered icon */}
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon-inside" />
          <input 
            type="text" 
            placeholder="Search any song, artist, or album worldwide..." 
            className="search-input glossy-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (currentView !== 'search') navigateTo('search');
            }}
          />
        </div>
      </div>

      {/* Right: User Authentication & Profile */}
      <div className="header-right">
        {authToken ? (
          <div style={{ position: 'relative' }}>
            <button 
              className="user-profile-badge glossy-btn" 
              onClick={() => setShowDropdown(prev => !prev)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                background: 'rgba(255,255,255,0.08)', 
                padding: '6px 14px 6px 8px', 
                borderRadius: '30px', 
                border: '1px solid rgba(229, 9, 20, 0.4)', 
                cursor: 'pointer' 
              }}
            >
              <img 
                src={currentUser?.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=musickvip"} 
                alt="Avatar" 
                style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1e1e24' }} 
              />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>
                {currentUser?.name || "VIP Red Member"}
              </span>
            </button>

            {/* User Dropdown Menu */}
            {showDropdown && (
              <div 
                className="glossy-dropdown"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '115%',
                  background: 'rgba(22, 22, 28, 0.95)',
                  border: '1px solid rgba(229, 9, 20, 0.35)',
                  borderRadius: '12px',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.85)',
                  padding: '8px',
                  minWidth: '210px',
                  backdropFilter: 'blur(20px)',
                  zIndex: 999
                }}
              >
                <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '6px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>{currentUser?.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{currentUser?.email}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '0.74rem', color: '#FF2A3A', fontWeight: 800 }}>
                    <ShieldCheck size={13} />
                    <span>{currentUser?.tier || "VIP Red Member"}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: 'none',
                    color: '#ff6b6b',
                    fontWeight: 600,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            className="main-play-btn glossy-signin-btn" 
            onClick={() => setIsAuthModalOpen(true)}
            style={{ 
              borderRadius: '24px', 
              padding: '9px 20px', 
              width: 'auto', 
              height: 'auto', 
              fontSize: '0.9rem', 
              fontWeight: 800,
              gap: '8px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 4px 18px rgba(229, 9, 20, 0.45)'
            }}
          >
            <LogIn size={16} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
