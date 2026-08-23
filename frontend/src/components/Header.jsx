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
    <header className="top-header">
      {/* Left: Integrated Search Bar with Navigation Arrows */}
      <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, maxWidth: '680px' }}>
        <div className="history-btns" style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="circle-nav-btn" 
            onClick={() => navigateTo('search')}
            title="Search"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            className="circle-nav-btn" 
            onClick={() => navigateTo('library')}
            title="Library"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Integrated Flow Search Input */}
        <div className="search-bar-wrapper" style={{ flex: 1 }}>
          <Search size={18} className="search-icon-inside" color="#9CA3AF" />
          <input 
            type="text" 
            placeholder="Search any song, artist, or album worldwide..." 
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (currentView !== 'search') navigateTo('search');
            }}
          />
        </div>
      </div>

      {/* Right: User Profile / Sign In with balanced glow */}
      <div className="header-right">
        {authToken ? (
          <div style={{ position: 'relative' }}>
            <button 
              className="user-profile-badge" 
              onClick={() => setShowDropdown(prev => !prev)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                background: 'rgba(255,255,255,0.04)', 
                padding: '6px 14px 6px 8px', 
                borderRadius: '30px', 
                border: '1px solid rgba(255, 255, 255, 0.08)', 
                cursor: 'pointer',
                backdropFilter: 'blur(16px)'
              }}
            >
              <img 
                src={currentUser?.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=musickvip"} 
                alt="Avatar" 
                style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1e1e24' }} 
              />
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF' }}>
                {currentUser?.name || "VIP Member"}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div 
                className="glossy-dropdown"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '115%',
                  background: 'rgba(22, 22, 28, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.85)',
                  padding: '8px',
                  minWidth: '210px',
                  backdropFilter: 'blur(20px)',
                  zIndex: 999
                }}
              >
                <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '6px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>{currentUser?.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>{currentUser?.email}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '0.74rem', color: '#FF2A3A', fontWeight: 700 }}>
                    <ShieldCheck size={13} />
                    <span>{currentUser?.tier || "VIP Member"}</span>
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
            className="signin-btn-refined" 
            onClick={() => setIsAuthModalOpen(true)}
            style={{ 
              borderRadius: '24px', 
              padding: '8px 18px', 
              fontSize: '0.88rem', 
              fontWeight: 600,
              gap: '8px',
              display: 'flex',
              alignItems: 'center',
              background: '#E50914',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(229, 9, 20, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
