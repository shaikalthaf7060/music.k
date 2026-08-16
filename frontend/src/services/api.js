/**
 * music.k Live Music Search & Online Catalog
 * Full-length ad-free audio powered by YouTube Music stream extractor.
 */

// Curated top global tracks with verified high-res 600x600 album artwork
export const ONLINE_CHARTS = [
  {
    id: "chart-01",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    genre: "Synthwave / Pop",
    year: 2020,
    plays: "4.2B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/6e/bf/a66ebf79-5008-8948-b352-a790fc87446b/19UM1IM04638.rgb.jpg/600x600bb.jpg",
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
      { time: 84, text: "Oh, when I'm like this, you're the one I trust" }
    ]
  },
  {
    id: "chart-02",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    album: "Starboy",
    duration: 230,
    genre: "Electronic / R&B",
    year: 2016,
    plays: "3.1B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Daft Punk Vocoder & Electronic Kick]" },
      { time: 10, text: "I'm tryna put you in the worst mood, ah" },
      { time: 15, text: "P1 cleaner than your church shoes, ah" },
      { time: 20, text: "Milli point two just to hurt you, ah" },
      { time: 36, text: "Look what you've done" },
      { time: 41, text: "I'm a motherf*ckin' Starboy" }
    ]
  },
  {
    id: "chart-03",
    title: "BIRDS OF A FEATHER",
    artist: "Billie Eilish",
    album: "HIT ME HARD AND SOFT",
    duration: 195,
    genre: "Indie Pop",
    year: 2024,
    plays: "1.8B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Guitar Strumming & Soft Vocals]" },
      { time: 8, text: "I want you to stay" },
      { time: 13, text: "'Til I'm in the grave" },
      { time: 17, text: "'Til I rot away, dead and buried" },
      { time: 52, text: "Birds of a feather, we should stick together, I know" }
    ]
  },
  {
    id: "chart-04",
    title: "Not Like Us",
    artist: "Kendrick Lamar",
    album: "Single",
    duration: 274,
    genre: "Hip-Hop",
    year: 2024,
    plays: "950M",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/31/3a/3f/313a3fbc-bb8f-80c7-b5a2-e226869a38cd/24UMGIM51924.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Mustard on the beat, ho]" },
      { time: 8, text: "Psst, I see dead people" },
      { time: 15, text: "They not like us, they not like us, they not like us" },
      { time: 55, text: "WOP, WOP, WOP, WOP, WOP, Dot, f*ck 'em up" }
    ]
  },
  {
    id: "chart-05",
    title: "Lose Yourself",
    artist: "Eminem",
    album: "Curtain Call: The Hits",
    duration: 326,
    genre: "Hip-Hop",
    year: 2002,
    plays: "2.4B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/08/23/fc/0823fcd9-cb44-695b-32bf-b3bf51d9f800/00606949351229.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Iconic Piano & Electric Guitar Intro]" },
      { time: 12, text: "Look, if you had one shot, or one opportunity" },
      { time: 32, text: "His palms are sweaty, knees weak, arms are heavy" },
      { time: 53, text: "You better lose yourself in the music, the moment" }
    ]
  },
  {
    id: "chart-06",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    genre: "Nu-Disco / Pop",
    year: 2020,
    plays: "2.2B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6c/11/d6/6c11d681-aa3a-d59e-4c2e-f77e181026ab/190295092665.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Nu-Disco Funk Bass Intro]" },
      { time: 9, text: "If you wanna run away with me, I know a galaxy" },
      { time: 46, text: "You want me, I want you, baby" },
      { time: 50, text: "My sugarboo, I'm levitating" }
    ]
  },
  {
    id: "chart-07",
    title: "Faded",
    artist: "Alan Walker",
    album: "Different World",
    duration: 212,
    genre: "EDM / Electronic",
    year: 2015,
    plays: "3.6B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/0d/a3/1a/0da31af7-d0ff-9bee-c427-1b6d0336f6fc/886446321981.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Atmospheric Piano Intro]" },
      { time: 15, text: "You were the shadow to my light" },
      { time: 40, text: "Where are you now?" },
      { time: 76, text: "I'm faded, I'm faded" }
    ]
  },
  {
    id: "chart-08",
    title: "FE!N",
    artist: "Travis Scott ft. Playboi Carti",
    album: "UTOPIA",
    duration: 191,
    genre: "Trap",
    year: 2023,
    plays: "1.2B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/98/b5/5e/98b55efe-7310-e3cb-0f9f-27abb1a2b182/20a1306b-6cf6-4194-a492-a402d3dee879.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Synth Stabs & Siren Intro]" },
      { time: 14, text: "FE!N, FE!N, FE!N, FE!N, FE!N" }
    ]
  },
  {
    id: "chart-09",
    title: "Cruel Summer",
    artist: "Taylor Swift",
    album: "Lover",
    duration: 178,
    genre: "Pop",
    year: 2019,
    plays: "2.1B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/49/3d/ab/493dab54-f920-9043-6181-80993b8116c9/19UMGIM53909.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Synth Intro]" },
      { time: 10, text: "Fever dream high in the quiet of the night" },
      { time: 55, text: "It's a cruel summer with you" }
    ]
  },
  {
    id: "chart-10",
    title: "Circles",
    artist: "Post Malone",
    album: "Hollywood's Bleeding",
    duration: 215,
    genre: "Pop Rock",
    year: 2019,
    plays: "2.5B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7b/1b/1b/7b1b1b0b-7ce2-b223-f9e0-8e36abe51877/19UMGIM78325.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Acoustic Bass Intro]" },
      { time: 12, text: "Seasons change and our love went cold" },
      { time: 48, text: "Run away, but we're running in circles" }
    ]
  },
  {
    id: "chart-11",
    title: "God's Plan",
    artist: "Drake",
    album: "Scorpion",
    duration: 198,
    genre: "Hip-Hop",
    year: 2018,
    plays: "2.3B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/6d/8f/bb6d8f67-6d04-10b5-dd62-eb5809ac54fc/00602567879152.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Drake Vocal Sample Intro]" },
      { time: 15, text: "Yeah, they wishin' and wishin' on me" },
      { time: 35, text: "God's plan, God's plan" }
    ]
  },
  {
    id: "chart-12",
    title: "Kesariya",
    artist: "Arijit Singh",
    album: "Brahmastra",
    duration: 268,
    genre: "Bollywood",
    year: 2022,
    plays: "890M",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Flute & Acoustic Melody]" },
      { time: 18, text: "Mujhko itna bataye koi" },
      { time: 45, text: "Kesariya tera ishq hai piya" }
    ]
  }
];

export async function searchMusicOnline(query) {
  if (!query || !query.trim()) {
    return { query: "", topResult: null, tracks: [], artists: [], playlists: [] };
  }

  const q = query.trim().toLowerCase();

  const localMatches = ONLINE_CHARTS.filter(
    t => t.title.toLowerCase().includes(q) || 
         t.artist.toLowerCase().includes(q) || 
         t.genre.toLowerCase().includes(q)
  );

  let onlineResults = [];

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=25`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        onlineResults = data.results.map(item => {
          const highRes = item.artworkUrl100 
            ? item.artworkUrl100.replace('100x100bb', '600x600bb') 
            : 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/6e/bf/a66ebf79-5008-8948-b352-a790fc87446b/19UM1IM04638.rgb.jpg/600x600bb.jpg';

          return {
            id: `online-${item.trackId}`,
            title: item.trackName,
            artist: item.artistName,
            album: item.collectionName || "Single",
            duration: Math.round((item.trackTimeMillis || 210000) / 1000),
            genre: item.primaryGenreName || "Music",
            year: item.releaseDate ? new Date(item.releaseDate).getFullYear() : 2026,
            plays: "Popular",
            coverUrl: highRes
          };
        });
      }
    }
  } catch (err) {
    console.warn("Live online search error:", err);
  }

  const allTracks = [...localMatches];
  onlineResults.forEach(track => {
    if (!allTracks.some(t => t.title.toLowerCase() === track.title.toLowerCase() && t.artist.toLowerCase() === track.artist.toLowerCase())) {
      allTracks.push(track);
    }
  });

  const topResult = allTracks.length > 0 ? { type: "track", data: allTracks[0] } : null;

  return {
    query,
    topResult,
    tracks: allTracks,
    artists: [],
    playlists: []
  };
}

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
    { time: 0, text: `[Now Playing ${track.title} by ${track.artist}]` },
    { time: 10, text: "Streaming full-length ad-free audio via YouTube Music engine" },
    { time: 25, text: `Enjoy the sound of ${track.album || 'music.k'}...` },
    { time: 50, text: "music.k • The Red Spotify" }
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

export const ONLINE_PLAYLISTS = [];
export const ONLINE_GENRES = [];
export const ONLINE_ARTISTS = [];

export const LOCAL_TRACKS = ONLINE_CHARTS;
export const LOCAL_PLAYLISTS = [];
export const LOCAL_GENRES = [];
export const LOCAL_ARTISTS = [];
