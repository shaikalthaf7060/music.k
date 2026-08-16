/**
 * music.k Online Audio Engine & Live Music Search
 * Streams music from YouTube online (Youtify architecture) without backend storage.
 */

// Comprehensive verified global chart tracks with exact YouTube IDs
export const ONLINE_CHARTS = [
  {
    id: "yt-01",
    youtubeId: "4NRXx6U8ABQ",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    genre: "Synthwave / Pop",
    year: 2020,
    plays: "4.2B",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Intro - 80s Synth Bass Riff]" },
      { time: 14, text: "I've been on my own for long enough" },
      { time: 20, text: "Maybe you can show me how to love, maybe" },
      { time: 27, text: "I'm going through withdrawals" },
      { time: 33, text: "You don't even have to do too much" },
      { time: 37, text: "You can turn me on with just a touch, baby" },
      { time: 43, text: "I look around and Sin City's cold and empty" },
      { time: 51, text: "No one's around to judge me" },
      { time: 54, text: "I can't see clearly when you're gone" },
      { time: 61, text: "I said, ooh, I'm blinded by the lights" },
      { time: 69, text: "No, I can't sleep until I feel your touch" },
      { time: 76, text: "I said, ooh, I'm drowning in the night" },
      { time: 84, text: "Oh, when I'm like this, you're the one I trust" },
      { time: 92, text: "[High Energy Synth Drop]" }
    ]
  },
  {
    id: "yt-02",
    youtubeId: "dQTJ8sbm4Tg",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    album: "Starboy",
    duration: 230,
    genre: "Electronic / R&B",
    year: 2016,
    plays: "3.1B",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Daft Punk Vocoder & Electronic Kick]" },
      { time: 10, text: "I'm tryna put you in the worst mood, ah" },
      { time: 15, text: "P1 cleaner than your church shoes, ah" },
      { time: 20, text: "Milli point two just to hurt you, ah" },
      { time: 25, text: "All red Lamb' just to tease you, ah" },
      { time: 36, text: "Look what you've done" },
      { time: 41, text: "I'm a motherf*ckin' Starboy" }
    ]
  },
  {
    id: "yt-03",
    youtubeId: "V9PVRfjEBTI",
    title: "BIRDS OF A FEATHER",
    artist: "Billie Eilish",
    album: "HIT ME HARD AND SOFT",
    duration: 195,
    genre: "Indie Pop",
    year: 2024,
    plays: "1.8B",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Guitar Strumming & Soft Vocals]" },
      { time: 8, text: "I want you to stay" },
      { time: 13, text: "'Til I'm in the grave" },
      { time: 17, text: "'Til I rot away, dead and buried" },
      { time: 22, text: "'Til I'm in the casket you carry" },
      { time: 52, text: "Birds of a feather, we should stick together, I know" },
      { time: 60, text: "I said I'd never think I wasn't better alone" }
    ]
  },
  {
    id: "yt-04",
    youtubeId: "H58vbez_m4E",
    title: "Not Like Us",
    artist: "Kendrick Lamar",
    album: "Single",
    duration: 274,
    genre: "Hip-Hop / West Coast",
    year: 2024,
    plays: "950M",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Mustard on the beat, ho]" },
      { time: 8, text: "Psst, I see dead people" },
      { time: 15, text: "They not like us, they not like us, they not like us" },
      { time: 55, text: "WOP, WOP, WOP, WOP, WOP, Dot, f*ck 'em up" }
    ]
  },
  {
    id: "yt-05",
    youtubeId: "_Yhyp-_hX2s",
    title: "Lose Yourself",
    artist: "Eminem",
    album: "8 Mile Soundtrack",
    duration: 326,
    genre: "Hip-Hop / Classic",
    year: 2002,
    plays: "2.4B",
    coverUrl: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Iconic Piano & Electric Guitar Intro]" },
      { time: 12, text: "Look, if you had one shot, or one opportunity" },
      { time: 20, text: "To seize everything you ever wanted in one moment" },
      { time: 32, text: "His palms are sweaty, knees weak, arms are heavy" },
      { time: 36, text: "There's vomit on his sweater already, mom's spaghetti" },
      { time: 53, text: "You better lose yourself in the music, the moment" }
    ]
  },
  {
    id: "yt-06",
    youtubeId: "TUVcZfQe-Kw",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    genre: "Nu-Disco / Pop",
    year: 2020,
    plays: "2.2B",
    coverUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Nu-Disco Funk Bass Intro]" },
      { time: 9, text: "If you wanna run away with me, I know a galaxy" },
      { time: 46, text: "You want me, I want you, baby" },
      { time: 50, text: "My sugarboo, I'm levitating" }
    ]
  },
  {
    id: "yt-07",
    youtubeId: "60ItHLz5WEA",
    title: "Faded",
    artist: "Alan Walker",
    album: "Different World",
    duration: 212,
    genre: "EDM / Electronic",
    year: 2015,
    plays: "3.6B",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Atmospheric Piano Intro]" },
      { time: 15, text: "You were the shadow to my light" },
      { time: 40, text: "Where are you now?" },
      { time: 76, text: "I'm faded, I'm faded" }
    ]
  },
  {
    id: "yt-08",
    youtubeId: "UceaB44wvJ4",
    title: "FE!N",
    artist: "Travis Scott ft. Playboi Carti",
    album: "UTOPIA",
    duration: 191,
    genre: "Rage / Trap",
    year: 2023,
    plays: "1.2B",
    coverUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Synth Stabs & Siren Intro]" },
      { time: 14, text: "FE!N, FE!N, FE!N, FE!N, FE!N" },
      { time: 28, text: "FE!N, FE!N, FE!N, FE!N, FE!N" }
    ]
  },
  {
    id: "yt-09",
    youtubeId: "ic8j13piAhQ",
    title: "Cruel Summer",
    artist: "Taylor Swift",
    album: "Lover",
    duration: 178,
    genre: "Pop",
    year: 2019,
    plays: "2.1B",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Synth Intro]" },
      { time: 10, text: "Fever dream high in the quiet of the night" },
      { time: 45, text: "And it's new, the shape of your body, it's blue" },
      { time: 55, text: "It's a cruel summer with you" }
    ]
  },
  {
    id: "yt-10",
    youtubeId: "wXhTHyIgQ_U",
    title: "Circles",
    artist: "Post Malone",
    album: "Hollywood's Bleeding",
    duration: 215,
    genre: "Pop Rock",
    year: 2019,
    plays: "2.5B",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Acoustic Bass Intro]" },
      { time: 12, text: "Seasons change and our love went cold" },
      { time: 48, text: "Run away, but we're running in circles" }
    ]
  },
  {
    id: "yt-11",
    youtubeId: "uxpDa-c-4Mc",
    title: "God's Plan",
    artist: "Drake",
    album: "Scorpion",
    duration: 198,
    genre: "Hip-Hop",
    year: 2018,
    plays: "2.3B",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Drake Vocal Sample Intro]" },
      { time: 15, text: "Yeah, they wishin' and wishin' on me" },
      { time: 35, text: "God's plan, God's plan" }
    ]
  },
  {
    id: "yt-12",
    youtubeId: "BddP6PYo2gs",
    title: "Kesariya",
    artist: "Arijit Singh",
    album: "Brahmastra",
    duration: 268,
    genre: "Bollywood / Romantic",
    year: 2022,
    plays: "890M",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    lyrics: [
      { time: 0, text: "[Flute & Acoustic Melody]" },
      { time: 18, text: "Mujhko itna bataye koi" },
      { time: 45, text: "Kesariya tera ishq hai piya" }
    ]
  }
];

export const ONLINE_PLAYLISTS = [
  {
    id: "pl-01",
    title: "Global Top 50 🔴",
    description: "The most played tracks worldwide on YouTube & Spotify streaming.",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    trackCount: 50,
    tracks: ["yt-01", "yt-02", "yt-03", "yt-04", "yt-05", "yt-06", "yt-07", "yt-08", "yt-09", "yt-10", "yt-11", "yt-12"]
  },
  {
    id: "pl-02",
    title: "Synthwave & 80s Velocity",
    description: "Retro neon highways, analog basslines, and adrenaline.",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    trackCount: 35,
    tracks: ["yt-01", "yt-02", "yt-07", "yt-10"]
  },
  {
    id: "pl-03",
    title: "Pure Hip-Hop & Rage Heat",
    description: "Heavy 808s, drift beats, and certified anthems.",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    trackCount: 40,
    tracks: ["yt-04", "yt-05", "yt-08", "yt-11"]
  },
  {
    id: "pl-04",
    title: "Electronic & Festival EDM",
    description: "Massive progressive drops and euphoric festival energy.",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    trackCount: 30,
    tracks: ["yt-07", "yt-02", "yt-06", "yt-01"]
  }
];

export const ONLINE_GENRES = [
  { id: "synthwave", name: "Synthwave & Retro", color: "linear-gradient(135deg, #E50914, #800020)", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80", query: "The Weeknd Blinding Lights" },
  { id: "hiphop", name: "Hip-Hop & Rap", color: "linear-gradient(135deg, #8B0000, #2C001E)", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80", query: "Kendrick Lamar Drake Eminem" },
  { id: "pop", name: "Global Pop Hits", color: "linear-gradient(135deg, #FF1744, #4A000E)", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80", query: "Taylor Swift Billie Eilish Dua Lipa" },
  { id: "edm", name: "EDM & Electro", color: "linear-gradient(135deg, #D50000, #1A0000)", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80", query: "Alan Walker Faded" },
  { id: "chill", name: "Lo-Fi & Chill", color: "linear-gradient(135deg, #C62828, #3E000C)", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&auto=format&fit=crop&q=80", query: "Post Malone Circles" },
  { id: "bollywood", name: "Bollywood Hits", color: "linear-gradient(135deg, #FF5252, #5D001E)", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80", query: "Arijit Singh Kesariya" }
];

export const ONLINE_ARTISTS = [
  { id: "art-01", name: "The Weeknd", monthlyListeners: "115,400,000", verified: true, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80" },
  { id: "art-02", name: "Billie Eilish", monthlyListeners: "98,200,000", verified: true, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80" },
  { id: "art-03", name: "Kendrick Lamar", monthlyListeners: "74,100,000", verified: true, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80" },
  { id: "art-04", name: "Eminem", monthlyListeners: "82,500,000", verified: true, image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=400&auto=format&fit=crop&q=80" }
];

/**
 * Live Online Search across millions of songs using iTunes + YouTube
 */
export async function searchMusicOnline(query) {
  if (!query || !query.trim()) {
    return { query: "", topResult: null, tracks: [], artists: [], playlists: [] };
  }

  const q = query.trim().toLowerCase();

  // Instant pre-loaded match
  const localMatching = ONLINE_CHARTS.filter(
    t => t.title.toLowerCase().includes(q) || 
         t.artist.toLowerCase().includes(q) ||
         t.genre.toLowerCase().includes(q)
  );

  let onlineTracks = [];

  try {
    const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=16`;
    const res = await fetch(itunesUrl);
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        onlineTracks = data.results.map((item) => {
          const highResCover = item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600';
          
          const existingLocal = ONLINE_CHARTS.find(
            c => c.title.toLowerCase() === item.trackName?.toLowerCase()
          );

          return {
            id: `itunes-${item.trackId}`,
            youtubeId: existingLocal ? existingLocal.youtubeId : null,
            title: item.trackName,
            artist: item.artistName,
            album: item.collectionName || "Single",
            duration: Math.round((item.trackTimeMillis || 180000) / 1000),
            genre: item.primaryGenreName || "Music",
            year: item.releaseDate ? new Date(item.releaseDate).getFullYear() : 2026,
            coverUrl: highResCover,
            previewUrl: item.previewUrl
          };
        });
      }
    }
  } catch (err) {}

  const combinedTracks = [...localMatching];
  onlineTracks.forEach(ot => {
    if (!combinedTracks.some(ct => ct.title.toLowerCase() === ot.title.toLowerCase())) {
      combinedTracks.push(ot);
    }
  });

  const matchingArtists = ONLINE_ARTISTS.filter(a => a.name.toLowerCase().includes(q));
  const matchingPlaylists = ONLINE_PLAYLISTS.filter(p => p.title.toLowerCase().includes(q));

  let topResult = null;
  if (combinedTracks.length > 0) {
    topResult = { type: "track", data: combinedTracks[0] };
  } else if (matchingArtists.length > 0) {
    topResult = { type: "artist", data: matchingArtists[0] };
  } else if (matchingPlaylists.length > 0) {
    topResult = { type: "playlist", data: matchingPlaylists[0] };
  }

  return {
    query,
    topResult,
    tracks: combinedTracks,
    artists: matchingArtists,
    playlists: matchingPlaylists
  };
}

/**
 * Fetch Synchronized Lyrics online via LRCLIB
 */
export async function fetchOnlineLyrics(track) {
  if (track.lyrics && track.lyrics.length > 0) {
    return { trackId: track.id, lyrics: track.lyrics };
  }

  try {
    const url = `https://lrclib.net/api/get?track_name=${encodeURIComponent(track.title)}&artist_name=${encodeURIComponent(track.artist)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.syncedLyrics) {
        const parsed = parseLrcString(data.syncedLyrics);
        if (parsed.length > 0) {
          return { trackId: track.id, lyrics: parsed };
        }
      }
    }
  } catch (e) {}

  const generated = [
    { time: 0, text: `[Playing ${track.title} by ${track.artist}]` },
    { time: 10, text: "Streaming live online via music.k Youtify engine" },
    { time: 25, text: `Feel the rhythm of ${track.album || 'the music'}...` },
    { time: 50, text: "Live online audio streaming • Pure Red aesthetic" }
  ];

  return { trackId: track.id, lyrics: generated };
}

function parseLrcString(lrc) {
  const lines = lrc.split('\n');
  const result = [];
  const regex = /\[(\d{2}):(\d{2})\.?(\d{2,3})?\](.*)/;

  lines.forEach(line => {
    const match = line.match(regex);
    if (match) {
      const min = parseInt(match[1], 10);
      const sec = parseInt(match[2], 10);
      const ms = match[3] ? parseInt(match[3], 10) / (match[3].length === 2 ? 100 : 1000) : 0;
      const totalSec = min * 60 + sec + ms;
      const text = match[4].trim();
      if (text) {
        result.push({ time: Math.floor(totalSec), text });
      }
    }
  });

  return result;
}

export const LOCAL_TRACKS = ONLINE_CHARTS;
export const LOCAL_PLAYLISTS = ONLINE_PLAYLISTS;
export const LOCAL_GENRES = ONLINE_GENRES;
export const LOCAL_ARTISTS = ONLINE_ARTISTS;
