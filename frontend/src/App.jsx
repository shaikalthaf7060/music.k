import React, { useState, useEffect, useMemo, Component } from 'react';
import { AudioProvider, useAudio } from './context/AudioContext';
import { ytController } from './services/audioEngine';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PlayerBar from './components/PlayerBar';
import HomeView from './views/HomeView';
import SearchView from './views/SearchView';
import LibraryView from './views/LibraryView';
import PlaylistDetailView from './views/PlaylistDetailView';
import LikedSongsView from './views/LikedSongsView';
import NowPlayingModal from './components/NowPlayingModal';
import LyricsModal from './components/LyricsModal';
import VisualizerModal from './components/VisualizerModal';
import EqualizerModal from './components/EqualizerModal';
import QueueDrawer from './components/QueueDrawer';
import CreatePlaylistModal from './components/CreatePlaylistModal';
import AuthModal from './components/AuthModal';

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
          background: '#060608',
          color: 'white',
          textAlign: 'center',
          padding: '32px',
          fontFamily: 'sans-serif'
        }}>
          <h1 style={{ fontSize: '2rem', color: '#FF2A3A', marginBottom: '12px' }}>music.k</h1>
          <p style={{ color: '#ccc', marginBottom: '16px', maxWidth: '500px' }}>
            We encountered an unexpected rendering issue. Click below to reset your cache and reload.
          </p>
          {this.state.error && (
            <pre style={{
              background: 'rgba(255,255,255,0.06)',
              padding: '12px 16px',
              borderRadius: '8px',
              color: '#ff6b6b',
              fontSize: '0.82rem',
              maxWidth: '600px',
              overflowX: 'auto',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              {this.state.error.toString()}
            </pre>
          )}
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
              background: '#E50914',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(229, 9, 20, 0.4)'
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
  const { currentView, viewParam } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMiniDockMinimized, setIsMiniDockMinimized] = useState(false);

  // Mount Audio Controller
  useEffect(() => {
    try {
      if (ytController && ytController.init) {
        ytController.init();
      }
    } catch (e) {}
  }, []);

  const activeViewComponent = useMemo(() => {
    switch (currentView) {
      case 'home':
      case 'search':
        return <SearchView searchQuery={searchQuery} />;
      case 'library':
        return <LibraryView />;
      case 'playlist':
        return <PlaylistDetailView playlistId={viewParam} />;
      case 'liked':
        return <LikedSongsView />;
      default:
        return <SearchView searchQuery={searchQuery} />;
    }
  }, [currentView, viewParam, searchQuery]);

  return (
    <div className="app-container">
      {/* Left Fixed Navigation Sidebar */}
      <Sidebar />

      {/* Main Dynamic Viewport */}
      <main className="main-viewport">
        {/* Top Header Bar with Live Search & User Profile */}
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Scrollable View Content */}
        <div className="content-scrollable">
          {activeViewComponent}
        </div>
      </main>

      {/* Sleek Floating Stream Dock (Powers 100% Full-Length Songs) */}
      <div 
        id="musick-stream-dock"
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: isMiniDockMinimized ? '200px' : '300px',
          height: isMiniDockMinimized ? '40px' : '180px',
          background: 'rgba(14, 14, 20, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '14px',
          border: '1px solid rgba(229, 9, 20, 0.4)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.85), 0 0 20px rgba(229, 9, 20, 0.25)',
          overflow: 'hidden',
          zIndex: 90,
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: '#FF2A3A' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF2A3A', boxShadow: '0 0 8px #FF2A3A' }}></span>
            <span>LIVE STREAM DOCK</span>
          </div>
          <button 
            onClick={() => setIsMiniDockMinimized(prev => !prev)}
            style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: '0.74rem', fontWeight: 700 }}
          >
            {isMiniDockMinimized ? 'Expand ↗' : 'Minimize ↘'}
          </button>
        </div>

        <div style={{ flex: 1, width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
          <div id="musick-yt-embed-slot" style={{ width: '100%', height: isMiniDockMinimized ? '1px' : '100%' }}></div>
        </div>
      </div>

      {/* Persistent Bottom Player Bar */}
      <PlayerBar />

      {/* Overlays & Modals */}
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
