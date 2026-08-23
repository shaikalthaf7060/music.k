import React, { useState, useEffect, useMemo, Component } from 'react';
import { AudioProvider, useAudio } from './context/AudioContext';
import { ytController } from './services/audioEngine';
import { searchMusicOnline, ONLINE_CHARTS } from './services/api';
import CoverflowStage from './components/CoverflowStage';
import FloatingPillPlayer from './components/FloatingPillPlayer';
import NowPlayingModal from './components/NowPlayingModal';
import LyricsModal from './components/LyricsModal';
import VisualizerModal from './components/VisualizerModal';
import EqualizerModal from './components/EqualizerModal';
import QueueDrawer from './components/QueueDrawer';
import CreatePlaylistModal from './components/CreatePlaylistModal';
import AuthModal from './components/AuthModal';
import { Search, Sparkles, X, ExternalLink } from 'lucide-react';
import Logo from './components/Logo';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React boundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#120c15',
          color: 'white',
          textAlign: 'center',
          padding: '32px',
          fontFamily: 'sans-serif'
        }}>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', marginBottom: '12px' }}>music.k</h1>
          <p style={{ color: '#ccc', marginBottom: '16px', maxWidth: '500px' }}>
            We encountered an unexpected rendering issue. Click below to reset your cache and reload.
          </p>
          <button
            onClick={() => {
              try { 
                localStorage.clear(); 
                sessionStorage.clear();
              } catch(e) {}
              window.location.reload();
            }}
            style={{
              padding: '12px 28px',
              borderRadius: '24px',
              border: 'none',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              backdropFilter: 'blur(16px)'
            }}
          >
            Clear Cache & Refresh music.k
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainAppContent() {
  const { currentTrack } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mount Audio Controller
  useEffect(() => {
    try {
      if (ytController && ytController.init) {
        ytController.init();
      }
    } catch (e) {}
  }, []);

  // Handle Live Search
  useEffect(() => {
    if (searchQuery && searchQuery.trim().length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        searchMusicOnline(searchQuery).then(res => {
          setSearchResults(res);
          setIsSearching(false);
        });
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setSearchResults(null);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const activeCoverflowTracks = useMemo(() => {
    if (searchResults && searchResults.tracks.length > 0) {
      return searchResults.tracks;
    }
    return ONLINE_CHARTS;
  }, [searchResults]);

  return (
    <div className="experience-container">
      {/* Reactive Ambient Background Glow */}
      <div className={`reactive-ambient-glow ${currentTrack ? 'active-glow' : ''}`} />

      {/* Top Header: Centered Logo ABOVE Search Bar */}
      <header className="hero-top-header">
        {/* Centered Website Logo ABOVE Search Bar */}
        <div className="hero-logo-box">
          <Logo size={24} />
          <span className="hero-brand-name">music<span className="hero-dot">.k</span></span>
        </div>

        {/* Centered Frosted Glass Search Bar */}
        <div className="hero-search-wrapper">
          <Search size={17} className="hero-search-icon" color="rgba(255, 255, 255, 0.45)" />
          <input 
            type="text" 
            placeholder="Search songs, artists, albums..."
            className="hero-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="search-clear-btn" 
              onClick={() => setSearchQuery('')}
              title="Clear Search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </header>

      {/* Main 3D Coverflow Stage with Reactive Transitions */}
      <main className="hero-main-stage">
        {isSearching && (
          <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600, fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Sparkles size={13} color="rgba(255, 255, 255, 0.6)" />
            <span>Finding songs...</span>
          </div>
        )}

        <CoverflowStage tracks={activeCoverflowTracks} />
      </main>

      {/* Bottom Floating Pill Player (Compact Width) */}
      <FloatingPillPlayer />

      {/* Developed by Althaf (Placed at Top-Right in Sleek Glass Badge) */}
      <div className="corner-dev-credit">
        <span className="dev-text">Developed by</span>
        <a 
          href="https://github.com/shaikalthaf7060" 
          target="_blank" 
          rel="noopener noreferrer"
          className="dev-link-badge"
          title="Visit Althaf on GitHub"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" className="github-icon">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span className="dev-name">Althaf</span>
          <ExternalLink size={10} style={{ opacity: 0.6 }} />
        </a>
      </div>

      {/* Modals & Overlays */}
      <NowPlayingModal />
      <AuthModal />
      <LyricsModal />
      <VisualizerModal />
      <EqualizerModal />
      <QueueDrawer />
      <CreatePlaylistModal />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AudioProvider>
        <MainAppContent />
      </AudioProvider>
    </ErrorBoundary>
  );
}
