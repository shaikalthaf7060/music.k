import os
import json
import time
import hashlib
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, Header, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse, Response
from pydantic import BaseModel
import requests

app = FastAPI(title="music.k Audio & Auth API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)
USERS_FILE = os.path.join(DATA_DIR, "users.json")
STREAM_CACHE_FILE = os.path.join(DATA_DIR, "stream_cache.json")

def load_json(filepath, default):
    if os.path.exists(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return default
    return default

def save_json(filepath, data):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

stream_cache = load_json(STREAM_CACHE_FILE, {})

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@app.get("/")
def root():
    return {"status": "ok", "app": "music.k - The Red Spotify", "version": "2.0.0"}

# ----------------- USER AUTHENTICATION -----------------

@app.post("/api/auth/register")
def register(user: UserRegister):
    users = load_json(USERS_FILE, {})
    email_clean = user.email.strip().lower()
    
    if email_clean in users:
        raise HTTPException(status_code=400, detail="An account with this email already exists")
    
    user_id = f"user_{int(time.time()*1000)}"
    user_data = {
        "id": user_id,
        "name": user.name.strip(),
        "email": email_clean,
        "password": hash_password(user.password),
        "avatar": f"https://api.dicebear.com/7.x/bottts/svg?seed={email_clean}",
        "tier": "VIP Red Premium",
        "likedTracks": ["chart-01", "chart-02", "chart-04"],
        "createdAt": int(time.time())
    }
    
    users[email_clean] = user_data
    save_json(USERS_FILE, users)
    
    token = f"token_{user_id}_{hashlib.md5(email_clean.encode()).hexdigest()}"
    return {
        "token": token,
        "user": {
            "id": user_id,
            "name": user_data["name"],
            "email": user_data["email"],
            "avatar": user_data["avatar"],
            "tier": user_data["tier"],
            "likedTracks": user_data["likedTracks"]
        }
    }

@app.post("/api/auth/login")
def login(creds: UserLogin):
    users = load_json(USERS_FILE, {})
    email_clean = creds.email.strip().lower()
    
    if email_clean not in users:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    user_data = users[email_clean]
    if user_data["password"] != hash_password(creds.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = f"token_{user_data['id']}_{hashlib.md5(email_clean.encode()).hexdigest()}"
    return {
        "token": token,
        "user": {
            "id": user_data["id"],
            "name": user_data["name"],
            "email": user_data["email"],
            "avatar": user_data["avatar"],
            "tier": user_data["tier"],
            "likedTracks": user_data.get("likedTracks", [])
        }
    }

@app.get("/api/auth/me")
def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization:
        return {
            "user": {
                "id": "guest_01",
                "name": "Red Explorer",
                "email": "guest@musick.stream",
                "avatar": "https://api.dicebear.com/7.x/bottts/svg?seed=redexplorer",
                "tier": "VIP Red Free",
                "likedTracks": ["chart-01", "chart-02"]
            }
        }
    
    token = authorization.replace("Bearer ", "").strip()
    users = load_json(USERS_FILE, {})
    for email, user in users.items():
        expected_token = f"token_{user['id']}_{hashlib.md5(email.encode()).hexdigest()}"
        if token == expected_token:
            return {
                "user": {
                    "id": user["id"],
                    "name": user["name"],
                    "email": user["email"],
                    "avatar": user["avatar"],
                    "tier": user["tier"],
                    "likedTracks": user.get("likedTracks", [])
                }
            }
    
    raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/api/user/sync-likes")
def sync_likes(likes: List[str], authorization: Optional[str] = Header(None)):
    if not authorization:
        return {"status": "ok", "synced": len(likes)}
    
    token = authorization.replace("Bearer ", "").strip()
    users = load_json(USERS_FILE, {})
    for email, user in users.items():
        expected_token = f"token_{user['id']}_{hashlib.md5(email.encode()).hexdigest()}"
        if token == expected_token:
            user["likedTracks"] = likes
            save_json(USERS_FILE, users)
            return {"status": "ok", "likedTracks": likes}
    
    return {"status": "ok", "synced": len(likes)}

# ----------------- YOUTUBE MUSIC AD-FREE STREAM EXTRACTION -----------------

def extract_stream_info(query_or_id: str):
    clean_key = query_or_id.strip().lower()
    
    if clean_key in stream_cache:
        cached = stream_cache[clean_key]
        if time.time() - cached.get("timestamp", 0) < 18000:
            return cached

    import yt_dlp
    query = f"https://www.youtube.com/watch?v={query_or_id}" if len(query_or_id) == 11 and not " " in query_or_id else f"ytsearch1:{query_or_id} audio"
    
    ydl_opts = {
        'format': 'bestaudio[ext=m4a]/bestaudio/best',
        'quiet': True,
        'no_warnings': True,
        'noplaylist': True,
        'extract_flat': False
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(query, download=False)
        if 'entries' in info and info['entries']:
            info = info['entries'][0]
        
        audio_url = info.get('url')
        if audio_url:
            result = {
                "status": "success",
                "streamUrl": audio_url,
                "title": info.get('title'),
                "artist": info.get('uploader') or info.get('channel') or "Artist",
                "duration": info.get('duration') or 210,
                "coverUrl": info.get('thumbnail') or "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
                "timestamp": int(time.time())
            }
            stream_cache[clean_key] = result
            save_json(STREAM_CACHE_FILE, stream_cache)
            return result
            
    return None

@app.get("/api/stream")
def get_stream_meta(q: str = Query(..., description="Song name or artist"), video_id: Optional[str] = None):
    target = video_id or q
    res = extract_stream_info(target)
    if res:
        return res
    return {
        "status": "fallback",
        "streamUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "duration": 210
    }

@app.get("/api/stream-audio")
def stream_audio_proxy(request: Request, q: str = Query(..., description="Song title and artist")):
    """
    Direct proxy audio streaming from YouTube Music with full length and range headers.
    """
    info = extract_stream_info(q)
    if not info or not info.get("streamUrl"):
        raise HTTPException(status_code=404, detail="Audio stream not found")

    target_url = info["streamUrl"]
    
    # Forward range header if browser sends it for scrub seeking
    range_header = request.headers.get("range")
    req_headers = {"User-Agent": "Mozilla/5.0"}
    if range_header:
        req_headers["Range"] = range_header

    try:
        upstream = requests.get(target_url, headers=req_headers, stream=True, timeout=10)
        
        resp_headers = {
            "Accept-Ranges": "bytes",
            "Content-Type": upstream.headers.get("Content-Type", "audio/mp4"),
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Range, Content-Type",
            "Access-Control-Expose-Headers": "Content-Range, Content-Length, Accept-Ranges"
        }
        
        if "Content-Range" in upstream.headers:
            resp_headers["Content-Range"] = upstream.headers["Content-Range"]
        if "Content-Length" in upstream.headers:
            resp_headers["Content-Length"] = upstream.headers["Content-Length"]

        def iterfile():
            for chunk in upstream.iter_content(chunk_size=65536):
                if chunk:
                    yield chunk

        return StreamingResponse(
            iterfile(),
            status_code=upstream.status_code,
            headers=resp_headers
        )
    except Exception as e:
        print("Proxy stream error:", e)
        raise HTTPException(status_code=500, detail="Failed to stream audio")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
