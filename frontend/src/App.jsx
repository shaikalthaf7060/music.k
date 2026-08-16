import React, { useState, useEffect } from 'react';
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

  // Mount YouTube IFrame API controller on app startup
  useEffect(() => {
    ytController.init('yt-player-iframe');
  }, []);

  const renderActiveView = () => {
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
  };

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
          {renderActiveView()}
        </div>
      </main>

      {/* Persistent Bottom Player Bar */}
      <PlayerBar />

      {/* Discreet YouTube Player Stream Mount (Plays online audio in background) */}
      <div 
        style={{ 
          position: 'fixed', 
          bottom: '100px', 
          right: '20px', 
          width: '200px', 
          height: '112px', 
          zIndex: -1, 
          opacity: 0.01, 
          pointerEvents: 'none',
          overflow: 'hidden'
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
