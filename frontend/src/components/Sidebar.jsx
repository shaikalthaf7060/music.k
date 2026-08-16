import React from 'react';
import { Home, Library, Flame } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function Sidebar() {
  const { currentView, navigateTo } = useAudio();

  return (
    <aside className="sidebar" style={{ width: '220px', padding: '16px 12px' }}>
      {/* Brand Header */}
      <div 
        className="brand-header" 
        onClick={() => navigateTo('home')} 
        style={{ cursor: 'pointer', padding: '8px 10px', marginBottom: '24px' }}
      >
        <div className="brand-logo" style={{ width: '32px', height: '32px' }}>
          <Flame size={18} fill="#ffffff" />
        </div>
        <div className="brand-title" style={{ fontSize: '1.25rem' }}>
          music<span className="red-dot">.k</span>
        </div>
      </div>

      {/* Clean Navigation: Only Home and Your Library */}
      <ul className="nav-list" style={{ gap: '6px' }}>
        <li>
          <button 
            className={`nav-item-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
            style={{ padding: '12px 14px', fontSize: '0.95rem' }}
          >
            <Home size={20} className="nav-icon" />
            <span>Home</span>
          </button>
        </li>
        <li>
          <button 
            className={`nav-item-btn ${currentView === 'library' ? 'active' : ''}`}
            onClick={() => navigateTo('library')}
            style={{ padding: '12px 14px', fontSize: '0.95rem' }}
          >
            <Library size={20} className="nav-icon" />
            <span>Your Library</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}
