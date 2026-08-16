import json
import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from audio_library import (
    TRACKS_DATABASE,
    GENRES,
    FEATURED_PLAYLISTS,
    FEATURED_ARTISTS
)

app = FastAPI(
    title="music.k Audio API",
    description="Backend API powering the music.k (The Red Spotify) music streaming platform",
    version="1.0.0"
)

# Enable CORS for all frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

USER_DATA_FILE = os.path.join(os.path.dirname(__file__), "user_data.json")

def load_user_data():
    if os.path.exists(USER_DATA_FILE):
        try:
            with open(USER_DATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "liked_tracks": ["red-01", "red-03", "red-05"],
        "custom_playlists": [
            {
                "id": "custom-01",
                "title": "Red Midnight Drive",
                "description": "Late night energy & electronic vibes",
                "coverUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80",
                "tracks": ["red-01", "red-05", "red-07"],
                "createdAt": "2026-08-16"
            }
        ]
    }

def save_user_data(data):
    with open(USER_DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

class CreatePlaylistRequest(BaseModel):
    title: str
    description: Optional[str] = ""
    coverUrl: Optional[str] = ""

class AddTrackRequest(BaseModel):
    track_id: str

@app.get("/")
def root():
    return {
        "app": "music.k",
        "tagline": "The Red Spotify",
        "status": "online",
        "endpoints": ["/api/tracks", "/api/search", "/api/genres", "/api/playlists/featured", "/api/lyrics/{id}"]
    }

@app.get("/api/tracks")
def get_tracks(genre: Optional[str] = None):
    if genre:
        genre_lower = genre.lower()
        return [t for t in TRACKS_DATABASE if genre_lower in t["genre"].lower()]
    return TRACKS_DATABASE

@app.get("/api/tracks/{track_id}")
def get_track_by_id(track_id: str):
    for track in TRACKS_DATABASE:
        if track["id"] == track_id:
            return track
    raise HTTPException(status_code=404, detail="Track not found")

@app.get("/api/lyrics/{track_id}")
def get_track_lyrics(track_id: str):
    for track in TRACKS_DATABASE:
        if track["id"] == track_id:
            return {
                "trackId": track["id"],
                "title": track["title"],
                "artist": track["artist"],
                "lyrics": track.get("lyrics", [])
            }
    raise HTTPException(status_code=404, detail="Lyrics not found")

@app.get("/api/genres")
def get_genres():
    return GENRES

@app.get("/api/playlists/featured")
def get_featured_playlists():
    return FEATURED_PLAYLISTS

@app.get("/api/artists")
def get_artists():
    return FEATURED_ARTISTS

@app.get("/api/search")
def search_all(q: str = Query(..., min_length=1)):
    query = q.strip().lower()
    
    matching_tracks = [
        t for t in TRACKS_DATABASE
        if query in t["title"].lower() 
        or query in t["artist"].lower() 
        or query in t["album"].lower()
        or query in t["genre"].lower()
    ]
    
    matching_artists = [
        a for a in FEATURED_ARTISTS
        if query in a["name"].lower() or query in a["bio"].lower()
    ]
    
    matching_playlists = [
        p for p in FEATURED_PLAYLISTS
        if query in p["title"].lower() or query in p["description"].lower()
    ]
    
    top_result = None
    if matching_tracks:
        top_result = {"type": "track", "data": matching_tracks[0]}
    elif matching_artists:
        top_result = {"type": "artist", "data": matching_artists[0]}
    elif matching_playlists:
        top_result = {"type": "playlist", "data": matching_playlists[0]}

    return {
        "query": q,
        "topResult": top_result,
        "tracks": matching_tracks,
        "artists": matching_artists,
        "playlists": matching_playlists
    }

@app.get("/api/library")
def get_user_library():
    user_data = load_user_data()
    liked_ids = set(user_data.get("liked_tracks", []))
    liked_tracks = [t for t in TRACKS_DATABASE if t["id"] in liked_ids]
    
    return {
        "likedTracks": liked_tracks,
        "customPlaylists": user_data.get("custom_playlists", []),
        "featuredPlaylists": FEATURED_PLAYLISTS,
        "artists": FEATURED_ARTISTS
    }

@app.post("/api/like/{track_id}")
def toggle_like_track(track_id: str):
    user_data = load_user_data()
    liked = user_data.setdefault("liked_tracks", [])
    if track_id in liked:
        liked.remove(track_id)
        is_liked = False
    else:
        liked.append(track_id)
        is_liked = True
    save_user_data(user_data)
    return {"trackId": track_id, "liked": is_liked}

@app.get("/api/playlists/custom")
def get_custom_playlists():
    user_data = load_user_data()
    return user_data.get("custom_playlists", [])

@app.post("/api/playlists/custom")
def create_playlist(payload: CreatePlaylistRequest):
    user_data = load_user_data()
    playlists = user_data.setdefault("custom_playlists", [])
    
    new_id = f"custom-{len(playlists) + 1:02d}-{os.urandom(2).hex()}"
    default_cover = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80"
    
    new_playlist = {
        "id": new_id,
        "title": payload.title,
        "description": payload.description or "Custom playlist created in music.k",
        "coverUrl": payload.coverUrl or default_cover,
        "tracks": [],
        "createdAt": "2026-08-16"
    }
    playlists.append(new_playlist)
    save_user_data(user_data)
    return new_playlist

@app.post("/api/playlists/custom/{playlist_id}/tracks")
def add_track_to_playlist(playlist_id: str, payload: AddTrackRequest):
    user_data = load_user_data()
    for pl in user_data.get("custom_playlists", []):
        if pl["id"] == playlist_id:
            if payload.track_id not in pl["tracks"]:
                pl["tracks"].append(payload.track_id)
            save_user_data(user_data)
            return pl
    raise HTTPException(status_code=404, detail="Playlist not found")

@app.delete("/api/playlists/custom/{playlist_id}")
def delete_custom_playlist(playlist_id: str):
    user_data = load_user_data()
    playlists = user_data.get("custom_playlists", [])
    user_data["custom_playlists"] = [p for p in playlists if p["id"] != playlist_id]
    save_user_data(user_data)
    return {"success": True, "deletedId": playlist_id}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
