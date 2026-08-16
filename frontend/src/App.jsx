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
import LyricsModal from './components/LyricsModal';
import VisualizerModal from './components/VisualizerModal';
import EqualizerModal from './components/EqualizerModal';
import QueueDrawer from './components/QueueDrawer';
import CreatePlaylistModal from './components/CreatePlaylistModal';
import VideoModal from './components/VideoModal';

function MainAppContent() {
  const { currentView, viewParam } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');

  // Mount YouTube IFrame API controller once
  useEffect(() => {
    ytController.init('yt-player-iframe');
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
      {/* Left Fixed Navigation Sidebar */}
      <Sidebar />

      {/* Main Dynamic Viewport */}
      <main className="main-viewport">
        {/* Top Header Bar */}
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Scrollable View Content */}
        <div className="content-scrollable">
          {activeViewComponent}
        </div>
      </main>

      {/* Persistent Bottom Player Bar */}
      <PlayerBar />

      {/* Zero-Overhead Background Audio Mount */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: 0, 
          right: 0, 
          width: '1px', 
          height: '1px', 
          opacity: 0, 
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: -9999
        }}
      >
        <div id="yt-player-iframe" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Dynamic Overlays & Modals */}
      <LyricsModal />
      <VisualizerModal />
      <EqualizerModal />
      <QueueDrawer />
      <CreatePlaylistModal />
      <VideoModal />
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
