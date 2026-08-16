# music.k — The Red Spotify 🔴

> An aggressive, energetic, and ad-free music streaming experience swapping Spotify's signature green for a striking, bold crimson aesthetic with deep obsidian surfaces, real-time Web Audio DSP, synchronized karaoke lyrics, and real-time audio visualization.

---

## 🎨 UI & Design Architecture

- **The Color Palette**: 
  - Background: Deep obsidian blacks (`#08080a`, `#101014`, `#16161c`)
  - Crimson Accents: High-voltage red (`#E50914`, `#FF2A3A`, `#FF4757`) exclusively for primary actions, the signature bold circular play button, live track scrubber, glowing active state indicators, and audio waves.
- **Layout Structure**:
  - **Left Sidebar**: Fixed navigation (Home, Search, Your Library, Liked Songs with red gradient heart, custom & curated playlists).
  - **Top Bar**: Search input with instant autocomplete, category filters, 5-band studio equalizer toggle, and audio visualizer trigger.
  - **Main Content Viewport**: Scrollable card-based grid featuring square album covers, dynamic greetings, quick 6-grid picks, featured artist circles, and responsive tables.
  - **Bottom Player Bar**: Persistent 3-column audio control deck (track info + animated like button on the left, **Bold Red Play/Pause button** + precision scrub bar in the center, and volume + synced lyrics + EQ + queue on the right).
- **Typography**: Geometric sans-serif fonts (*Plus Jakarta Sans* & *Outfit*) with crisp optical tracking and tabular numeric timestamps.

---

## 🚀 Key Features

1. **⚡ Ad-Free Audio Engine**:
   - High-fidelity streaming with HTML5 Audio and Web Audio API fallback synthesis.
   - 5-Band Studio Equalizer (60Hz, 230Hz, 910Hz, 3.6kHz, 14kHz) with presets (*Bass Boost*, *EDM Crimson*, *Pop Vocal*, *Lo-Fi Mellow*, *Flat*).
2. **🎤 Live Synchronized Karaoke Lyrics**:
   - Real-time LRC timestamp synchronization with auto-scrolling and glowing red highlights.
   - Click on any lyric line to jump directly to that timestamp in the song.
3. **📊 Real-time Sound Visualizer**:
   - 60 FPS HTML5 Canvas audio spectrum analyzer with 3 switchable visual modes: *Crimson Bars*, *Laser Wave*, and *Neon Pulsar*.
4. **🔍 Instant Search & Explore**:
   - Live query matching across songs, artists, albums, and playlists.
   - Colorful mood & genre explore cards (*Synthwave*, *Midnight Lo-Fi*, *Drift Phonk*, *Cyberpunk*, *Ruby Chill*, *Future Funk*).
5. **🎛️ Custom Playlist & Library Manager**:
   - Create custom playlists with custom titles, descriptions, and cover artworks.
   - Like songs with celebratory red confetti bursts and automatic library syncing.
   - Slide-out Play Queue drawer to reorder and manage upcoming tracks.

---

## 🛠️ Project Structure

```
music.k/
├── backend/
│   ├── main.py              # FastAPI server with search, lyrics & playlist endpoints
│   ├── audio_library.py     # Curated audio catalog & LRC lyrics database
│   └── user_data.json       # User playlists & liked tracks persistence
├── frontend/
│   ├── index.html           # Main HTML with Google Fonts & metadata
│   ├── package.json         # React 19, Vite, Lucide Icons, Canvas Confetti
│   └── src/
│       ├── main.jsx         # App entry point
│       ├── App.jsx          # Root component & view router
│       ├── styles/
│       │   └── index.css    # Full Vanilla CSS Red Spotify design system
│       ├── context/
│       │   └── AudioContext.jsx # Global audio state, playback queue & EQ
│       ├── services/
│       │   ├── api.js       # Resilient API client with local fallback
│       │   └── synthAudio.js # Web Audio API DSP & synthesis engine
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   ├── Header.jsx
│       │   ├── PlayerBar.jsx
│       │   ├── LyricsModal.jsx
│       │   ├── VisualizerModal.jsx
│       │   ├── EqualizerModal.jsx
│       │   ├── QueueDrawer.jsx
│       │   └── CreatePlaylistModal.jsx
│       └── views/
│           ├── HomeView.jsx
│           ├── SearchView.jsx
│           ├── LibraryView.jsx
│           ├── PlaylistDetailView.jsx
│           └── LikedSongsView.jsx
└── README.md
```

---

## ⚡ Getting Started

### 1. Run the Backend API
```bash
cd backend
pip install fastapi uvicorn
python -m uvicorn main:app --port 8000 --reload
```
API Documentation will be live at `http://127.0.0.1:8000/docs`.

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
