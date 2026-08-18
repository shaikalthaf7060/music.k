import React, { useState, useEffect, useMemo } from 'react';
import { AudioProvider, useAudio } from './context/AudioContext';
import { ytController } from './services/youtubePlayer';
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
import { Tv, ChevronDown } from 'lucide-react';

function MainAppContent() {
  const { currentView, viewParam, isPlaying, currentTrack } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [showVideoDock, setShowVideoDock] = useState(false);

  // Mount YouTube IFrame API Controller
  useEffect(() => {
    ytController.init('yt-music-iframe');
  }, []);

  const activeViewComponent = useMemo(() => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'search':
        return <SearchView searchQuery={searchQuery} />;
      case 'library':
        return <LibraryView />;
      case 'playlist':
        return <PlaylistDetailView playlistId={viewParam} />;
      case 'liked':
        return <LikedSongsView />;
      default:
        return <HomeView />;
    }
  }, [currentView, viewParam, searchQuery]);

  return (
    <div className="app-container">
      {/* Left Fixed Minimalist Navigation Sidebar */}
      <Sidebar />

      {/* Main Dynamic Viewport */}
      <main className="main-viewport">
        {/* Top Header Bar with Live Search & User Auth */}
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Scrollable View Content */}
        <div className="content-scrollable">
          {activeViewComponent}
        </div>
      </main>

      {/* Persistent Bottom Player Bar */}
      <PlayerBar />

      {/* YouTube Full-Length Streaming Dock (Youtify Style) */}
      <div 
        id="yt-player-dock"
        style={{ 
          position: 'fixed', 
          bottom: '98px', 
          right: '18px', 
          width: showVideoDock ? '240px' : '1px', 
          height: showVideoDock ? '135px' : '1px', 
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: showVideoDock ? '0 12px 36px rgba(0,0,0,0.9), 0 0 20px rgba(229, 9, 20, 0.4)' : 'none',
          border: showVideoDock ? '1px solid rgba(229, 9, 20, 0.4)' : 'none',
          background: '#000',
          zIndex: 95,
          opacity: showVideoDock ? 1 : 0.01,
          pointerEvents: showVideoDock ? 'auto' : 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div id="yt-music-iframe" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Mini Video Toggle Button */}
      {currentTrack && (
        <button
          onClick={() => setShowVideoDock(prev => !prev)}
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            background: showVideoDock ? 'var(--red-primary)' : 'rgba(20, 20, 26, 0.85)',
            border: '1px solid rgba(229, 9, 20, 0.4)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.74rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            zIndex: 96,
            cursor: 'pointer'
          }}
          title={showVideoDock ? "Hide Video Dock" : "Show Live Video Dock"}
        >
          <Tv size={14} />
          <span>{showVideoDock ? 'Hide Video' : 'Live Stream'}</span>
        </button>
      )}

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
    <AudioProvider>
      <MainAppContent />
    </AudioProvider>
  );
}
