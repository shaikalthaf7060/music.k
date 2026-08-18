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
import { Tv } from 'lucide-react';

function MainAppContent() {
  const { currentView, viewParam, isPlaying, currentTrack } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMiniDockExpanded, setIsMiniDockExpanded] = useState(false);

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
        return <SearchView searchQuery={searchQuery} />;
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

      {/* Visible YouTube Streaming Frame (Guarantees 100% Uninterrupted Audio Playback) */}
      <div 
        id="yt-player-dock"
        style={{ 
          position: 'fixed', 
          bottom: '96px', 
          right: '16px', 
          width: isMiniDockExpanded ? '280px' : '200px', 
          height: isMiniDockExpanded ? '158px' : '112px', 
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(0,0,0,0.85), 0 0 20px rgba(229, 9, 20, 0.35)',
          border: '1px solid rgba(229, 9, 20, 0.45)',
          background: '#000',
          zIndex: 95,
          opacity: 1,
          pointerEvents: 'auto',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: currentTrack ? 'block' : 'none'
        }}
      >
        <div id="yt-music-iframe" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Mini Video Toggle Button */}
      {currentTrack && (
        <button
          onClick={() => setIsMiniDockExpanded(prev => !prev)}
          style={{
            position: 'fixed',
            bottom: isMiniDockExpanded ? '260px' : '214px',
            right: '16px',
            background: 'rgba(20, 20, 26, 0.9)',
            border: '1px solid rgba(229, 9, 20, 0.4)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '16px',
            fontSize: '0.72rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            zIndex: 96,
            cursor: 'pointer'
          }}
          title={isMiniDockExpanded ? "Minimize Video" : "Expand Video"}
        >
          <Tv size={13} color="#FF2A3A" />
          <span>{isMiniDockExpanded ? 'Compact' : 'Expand'}</span>
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
