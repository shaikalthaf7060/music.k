import React from 'react';
import { Home, Library } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import Logo from './Logo';

export default function Sidebar() {
  const { currentView, navigateTo } = useAudio();

  return (
    <aside className="sidebar glossy-sidebar" style={{ width: '240px', padding: '20px 14px' }}>
      {/* Brand Header with New Logo */}
      <div 
        className="brand-header" 
        onClick={() => navigateTo('home')} 
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

      {/* Clean Navigation: Only Home and Your Library */}
      <ul className="nav-list" style={{ gap: '8px' }}>
        <li>
          <button 
            className={`nav-item-btn glossy-nav-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            <Home size={20} className="nav-icon" />
            <span>Home</span>
          </button>
        </li>
        <li>
          <button 
            className={`nav-item-btn glossy-nav-btn ${currentView === 'library' ? 'active' : ''}`}
            onClick={() => navigateTo('library')}
          >
            <Library size={20} className="nav-icon" />
            <span>Your Library</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}
