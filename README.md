# music.k 🔴

> A sleek, ad-free music streaming app with a bold Red Spotify dark aesthetic.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-E50914?style=for-the-badge)](https://shaikalthaf7060.github.io/music.k/)
[![React](https://img.shields.io/badge/React-19-black?style=for-the-badge&logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

---

## 🌐 Live App
👉 **[https://shaikalthaf7060.github.io/music.k/](https://shaikalthaf7060.github.io/music.k/)**

---

## ✨ Features

- **⚡ Full-Length Ad-Free Streaming**: Pure audio streamed directly from YouTube Music with full seeking.
- **🔍 Global Search**: Instant live search across millions of songs with 600×600 album artwork.
- **🔥 Firebase Auth**: 1-Click Google Sign-In and Email/Password authentication.
- **🎤 Synced Lyrics**: Real-time karaoke lyrics auto-scrolling with the music.
- **🎛️ Studio Equalizer & Visualizer**: 5-Band EQ (Bass Boost, EDM Crimson, Pop) + 60 FPS audio visualizer.
- **🖤 Minimalist Red UI**: High-contrast dark theme with bold crimson accents (Home & Library navigation).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Vanilla CSS, Lucide Icons, Canvas Confetti
- **Backend**: FastAPI, Uvicorn, `yt-dlp`, `requests`
- **Auth**: Firebase Authentication (Google OAuth + Email)
- **Deployment**: GitHub Pages

---

## ⚡ Quick Start

### 1. Backend (Streaming & Auth)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --port 8000 --reload
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🚀 Deploy

```bash
cd frontend
npm run deploy
```

---

## 📄 License
MIT License.
