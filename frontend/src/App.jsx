import React, { useState, useMemo } from 'react';
import { AudioProvider, useAudio } from './context/AudioContext';
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
import AuthModal from './components/AuthModal';

function MainAppContent() {
  const { currentView, viewParam } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');

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

      {/* Dynamic Overlays & Modals */}
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
