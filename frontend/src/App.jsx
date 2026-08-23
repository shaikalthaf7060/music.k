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
import { Search, Sparkles, Disc3 } from 'lucide-react';

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
      {/* Top Header: Monochromatic Blended Logo + Attractive Glass Search Bar */}
      <header className="hero-top-header">
        {/* Seamless Blended Logo (Zero Red) */}
        <div className="hero-logo-box">
          <Disc3 size={24} color="rgba(255, 255, 255, 0.45)" />
          <span className="hero-brand-name">music<span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>.k</span></span>
        </div>

        {/* Attractive Glassmorphic Search Bar */}
        <div className="hero-search-wrapper">
          <Search size={18} className="hero-search-icon" color="rgba(255, 255, 255, 0.4)" />
          <input 
            type="text" 
            placeholder="Search songs, artists, albums..."
            className="hero-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Main 3D Coverflow Stage */}
      <main className="hero-main-stage">
        {isSearching && (
          <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Sparkles size={14} color="rgba(255, 255, 255, 0.6)" />
            <span>Finding songs...</span>
          </div>
        )}

        <CoverflowStage tracks={activeCoverflowTracks} />
      </main>

      {/* Bottom Floating Pill Player (Matches Reference Image) */}
      <FloatingPillPlayer />

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
