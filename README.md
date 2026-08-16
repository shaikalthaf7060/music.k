# music.k — The Red Spotify 🔴

> An aggressive, energetic, and 100% ad-free music streaming experience swapping Spotify's signature green for a striking, bold crimson aesthetic with deep obsidian surfaces, YouTube Music full-length audio streaming, user authentication, synchronized karaoke lyrics, 5-band studio equalizer, and audio visualization.

---

## 🎨 UI & Design Architecture

- **The Color Palette**: 
  - Background: Deep obsidian blacks (`#08080a`, `#101014`, `#16161c`)
  - Crimson Accents: High-voltage red (`#E50914`, `#FF2A3A`, `#FF4757`) exclusively for primary actions, the signature bold circular play button, live track scrubber, glowing active state indicators, and audio waves.
- **Minimalist Layout**:
  - **Left Sidebar**: Clean navigation (**Home** & **Your Library**).
  - **Top Bar**: Live global search bar with instant autocomplete across millions of songs, and User Profile with login/register badge.
  - **Main Content Viewport**: Spotlight hero card with bold red play button and sleek responsive track table.
  - **Bottom Player Bar**: Persistent audio control deck (track info + animated like heart on the left, **Bold Red Play/Pause button** + precision scrub bar in the center, and volume + synced lyrics + EQ + visualizer + queue on the right).

---

## 🚀 Key Features

1. **⚡ Ad-Free YouTube Music Streaming**:
   - Streams pure, full-length audio (3–6+ minutes) directly from YouTube Music via high-performance backend proxy (`/api/stream-audio`).
   - Supports HTTP 206 Partial Content range requests for instant scrubbing across the full song duration without ads.
2. **🔐 User Authentication & Profile**:
   - Secure Sign In & Sign Up with password hashing and JWT tokens.
   - User profile badge with VIP Red status and automatic Liked Songs synchronization.
3. **🔍 Live Global Online Search**:
   - Search for any artist, song, or album worldwide in real time with high-res 600x600 album artwork and verified metadata.
4. **🎤 Live Synchronized Karaoke Lyrics**:
   - Real-time LRC timestamp synchronization with auto-scrolling and glowing red highlights via LRCLIB.
5. **📊 Real-time Sound Visualizer & 5-Band Studio Equalizer**:
   - 60 FPS HTML5 Canvas audio spectrum analyzer with switchable presets (*Bass Boost*, *EDM Crimson*, *Pop Vocal*, *Lo-Fi Mellow*, *Flat*).

---

## 🛠️ Project Structure

```
music.k/
├── backend/
│   ├── main.py              # FastAPI server with YouTube Music stream extractor & Auth API
│   ├── data/
│   │   ├── users.json       # User database with hashed credentials
│   │   └── stream_cache.json # Stream cache for instant playback
│   └── requirements.txt
├── frontend/
│   ├── index.html           # Main HTML with Google Fonts & metadata
│   ├── package.json         # React 19, Vite, Lucide Icons, Canvas Confetti
│   └── src/
│       ├── main.jsx         # App entry point
│       ├── App.jsx          # Root component & view router
│       ├── styles/
│       │   └── index.css    # Full Vanilla CSS Red Spotify design system
│       ├── context/
│       │   └── AudioContext.jsx # Global audio state, YouTube Music stream & Auth
│       ├── services/
│       │   └── api.js       # Live search API client with verified artwork
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   ├── Header.jsx
│       │   ├── PlayerBar.jsx
│       │   ├── AuthModal.jsx
│       │   ├── LyricsModal.jsx
│       │   ├── VisualizerModal.jsx
│       │   ├── EqualizerModal.jsx
│       │   └── QueueDrawer.jsx
│       └── views/
│           ├── HomeView.jsx
│           ├── SearchView.jsx
│           └── LibraryView.jsx
└── README.md
```

---

## ⚡ Getting Started

### 1. Run the Backend API
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation will be live at `http://localhost:8000/docs`.

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
