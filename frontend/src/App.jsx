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

function MainAppContent() {
  const { currentView, viewParam } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');

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

      {/* YouTube Online Streaming Mount Frame */}
      <div 
        id="yt-player-dock"
        style={{ 
          position: 'fixed', 
          bottom: '96px', 
          right: '16px', 
          width: '160px', 
          height: '90px', 
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
          border: '1px solid rgba(229, 9, 20, 0.4)',
          background: '#000',
          zIndex: 50,
          opacity: 0.05,
          pointerEvents: 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <div id="yt-music-iframe" style={{ width: '100%', height: '100%' }} />
      </div>

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
