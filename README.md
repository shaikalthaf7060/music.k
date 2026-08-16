<div align="center">

# 🔴 music.k — The Red Spotify

<p align="center">
  <strong>An aggressive, energetic, and 100% ad-free music streaming experience swapping Spotify's signature green for a bold crimson aesthetic.</strong>
</p>

<p align="center">
  <a href="https://shaikalthaf7060.github.io/music.k/"><img src="https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-E50914?style=for-the-badge&logo=github" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Auth" />
</p>

<p align="center">
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-firebase-configuration">Firebase Setup</a> •
  <a href="#-project-structure">Project Structure</a>
</p>

---

</div>

## 🌐 Live Demo

Experience **music.k** live in your browser:
👉 **[https://shaikalthaf7060.github.io/music.k/](https://shaikalthaf7060.github.io/music.k/)**

---

## 🎨 UI & Design Philosophy

- **The Color Palette**: 
  - **Background Surfaces**: Deep obsidian blacks (`#08080a`, `#101014`, `#16161c`) designed to eliminate eye strain.
  - **Crimson Accents**: High-voltage reds (`#E50914`, `#FF2A3A`, `#FF4757`) exclusively for primary actions, the signature bold circular play button, live track scrubber, glowing active state indicators, and soundwaves.
- **Minimalist Layout**:
  - **Left Sidebar**: Clean, uncluttered navigation (**Home** & **Your Library**).
  - **Top Navigation Bar**: Live global search bar with instant autocomplete across millions of tracks worldwide, plus User Profile with Google/Email login.
  - **Main Viewport**: Glassmorphic spotlight hero card with bold red play button, live soundwave animations, and high-res album covers.
  - **Persistent Player Deck**: Full-featured 3-column player bar with interactive scrubber, volume control, like hearts, synced lyrics, 5-band studio EQ, and audio visualizer.

---

## 🚀 Key Features

### 1. ⚡ Ad-Free Full-Length Audio Streaming
- Direct YouTube Music streaming engine via backend audio proxy (`/api/stream-audio`).
- Pure, full-length audio tracks (3–6+ minutes) with **zero 30-second preview limitations** and **zero advertising interruptions**.
- Supports HTTP 206 Partial Content range requests for instant seek/scrubbing across any part of the song.

### 2. 🔍 Live Global Online Search
- Search across millions of songs, artists, and albums in real time.
- Instant 600×600 high-resolution album artwork, artist names, albums, release years, and duration metadata.

### 3. 🔥 Firebase & JWT User Authentication
- **1-Click Google Sign-In** with Firebase popup authentication.
- **Email & Password** account registration and login.
- Persistent **Liked Songs** synced automatically with user profiles.
- 1-Click VIP Demo Login for quick testing.

### 4. 🎤 Live Synchronized Karaoke Lyrics
- Real-time LRC timestamp synchronization with auto-scrolling and glowing red line highlights via LRCLIB.
- Jump to any section in the song simply by clicking a lyric line.

### 5. 🎛️ 5-Band Studio Equalizer & 60 FPS Visualizer
- Web Audio API DSP equalizer (60Hz, 230Hz, 910Hz, 3.6kHz, 14kHz) with curated audio presets:
  - *Bass Boost* 🔊
  - *EDM Crimson* ⚡
  - *Pop Vocal* 🎙️
  - *Lo-Fi Mellow* ☕
  - *Flat* 🎚️
- HTML5 Canvas audio spectrum visualizer with real-time frequency reactivity.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + Vite | Ultra-fast rendering & modern component lifecycle |
| **Styling** | Vanilla CSS Design System | Custom Red Spotify glassmorphic UI without Tailwind fluff |
| **Icons & Effects** | Lucide React + Canvas Confetti | Modern iconography & celebratory like animations |
| **Client Audio** | HTML5 Audio + Web Audio API | Low-latency audio playback, DSP equalizer & analyzer |
| **Backend API** | FastAPI (Python 3.10+) | Asynchronous REST API & streaming audio proxy |
| **Audio Extraction** | `yt-dlp` | Pure ad-free audio stream extraction from YouTube Music |
| **Authentication** | Firebase Auth + JWT / SHA-256 | Google OAuth popup & secure email/password auth |
| **Deployment** | GitHub Pages + GitHub Actions | Automated continuous integration and deployment |

---

## 📁 Project Structure

```
music.k/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages CI/CD workflow
├── backend/
│   ├── main.py               # FastAPI server with YouTube Music stream proxy & Auth API
│   ├── requirements.txt      # Python dependencies (fastapi, uvicorn, yt-dlp, requests)
│   └── data/
│       ├── users.json        # User database & credentials
│       └── stream_cache.json # Cached stream metadata for 0ms lookup
├── frontend/
│   ├── index.html            # HTML entry point with Google Fonts
│   ├── package.json          # React 19 dependencies & deploy scripts
│   ├── vite.config.js        # Vite build configuration with GitHub Pages base path
│   ├── .env.example          # Firebase environment variables template
│   ├── public/
│   │   ├── .nojekyll         # Disables Jekyll for GitHub Pages
│   │   └── audio/            # Bundled local fallback audio files
│   └── src/
│       ├── main.jsx          # React DOM entry
│       ├── App.jsx           # Root layout & view router
│       ├── index.css         # Complete Red Spotify CSS design tokens
│       ├── context/
│       │   └── AudioContext.jsx # Global playback, auth & queue state
│       ├── services/
│       │   ├── api.js        # Global search & lyrics fetcher
│       │   └── firebase.js   # Firebase Google & Email auth service
│       ├── components/
│       │   ├── Sidebar.jsx   # Clean Home & Library navigation
│       │   ├── Header.jsx    # Search bar & user profile badge
│       │   ├── PlayerBar.jsx # Bottom red player bar deck
│       │   ├── AuthModal.jsx # Google / Email sign-in modal
│       │   ├── LyricsModal.jsx # Karaoke synchronized lyrics
│       │   ├── VisualizerModal.jsx # HTML5 Canvas audio spectrum
│       │   ├── EqualizerModal.jsx  # 5-Band studio EQ
│       │   └── QueueDrawer.jsx     # Slide-out playlist queue
│       └── views/
│           ├── HomeView.jsx    # Minimalist spotlight hero & track table
│           ├── SearchView.jsx  # Live search results grid
│           └── LibraryView.jsx # Saved & Liked Songs collection
└── README.md
```

---

## ⚡ Getting Started Locally

### Prerequisites
- **Node.js**: v18.0 or higher
- **Python**: v3.10 or higher
- **Git**

---

### 1. Clone the Repository
```bash
git clone https://github.com/shaikalthaf7060/music.k.git
cd music.k
```

---

### 2. Start the Backend Streaming Server
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
*API documentation will be live at `http://localhost:8000/docs`.*

---

### 3. Start the Frontend Application
```bash
cd ../frontend
npm install
npm run dev
```
*Open `http://localhost:5173` in your browser.*

---

## 🔥 Firebase Configuration

To connect your own Firebase project for Google Sign-In & Email Authentication:

1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Google** and **Email/Password** under **Authentication > Sign-in method**.
3. Under **Authentication > Settings > Authorized domains**, add `shaikalthaf7060.github.io` (and `localhost`).
4. Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=musick-a7927.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=musick-a7927
   VITE_FIREBASE_STORAGE_BUCKET=musick-a7927.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

---

## 🚀 Deployment to GitHub Pages

Deploy the compiled single-page application to GitHub Pages:

```bash
cd frontend
npm run deploy
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ for music enthusiasts who love the Red aesthetic.</sub>
</div>
