/**
 * music.k Online Audio Engine & Track Catalog
 * Full-length audio playback with 0ms latency and synchronized lyrics.
 */

export const ONLINE_CHARTS = [
  {
    id: "track-01",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    localAudio: "/audio/track-01.mp3",
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
      { time: 92, text: "[High Energy Synth Drop]" },
      { time: 110, text: "I'm running out of time" },
      { time: 115, text: "'Cause I can see the sun light up the sky" },
      { time: 121, text: "So I hit the road in overdrive, baby, oh" },
      { time: 130, text: "I said, ooh, I'm blinded by the lights" },
      { time: 137, text: "No, I can't sleep until I feel your touch" },
      { time: 150, text: "[Outro - Synthesizer Fade]" }
    ]
  },
  {
    id: "track-02",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    localAudio: "/audio/track-02.mp3",
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
      { time: 41, text: "I'm a motherf*ckin' Starboy" },
      { time: 48, text: "[Daft Punk Synth Bass Drop]" },
      { time: 64, text: "Every day a star is born, clap if you feel me" },
      { time: 75, text: "House so empty, need a centerpiece" },
      { time: 88, text: "Look what you've done" },
      { time: 94, text: "I'm a motherf*ckin' Starboy" }
    ]
  },
  {
    id: "track-03",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    localAudio: "/audio/track-03.mp3",
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
    id: "track-04",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    localAudio: "/audio/track-04.mp3",
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
    id: "track-05",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    localAudio: "/audio/track-05.mp3",
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
    id: "track-06",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    localAudio: "/audio/track-06.mp3",
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
    id: "track-07",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    localAudio: "/audio/track-07.mp3",
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
    id: "track-08",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    localAudio: "/audio/track-08.mp3",
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
    id: "track-09",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    localAudio: "/audio/track-09.mp3",
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
      { time: 55, text: "It's a cruel summer with you" }
    ]
  },
  {
    id: "track-10",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    localAudio: "/audio/track-10.mp3",
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
    id: "track-11",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    localAudio: "/audio/track-11.mp3",
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
    id: "track-12",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    localAudio: "/audio/track-12.mp3",
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
    description: "The most played tracks worldwide on music.k streaming.",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    trackCount: 50,
    tracks: ["track-01", "track-02", "track-03", "track-04", "track-05", "track-06", "track-07", "track-08", "track-09", "track-10", "track-11", "track-12"]
  }
];

export const ONLINE_GENRES = [
  { id: "synthwave", name: "Synthwave & Retro", color: "linear-gradient(135deg, #E50914, #800020)", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80", query: "The Weeknd" },
  { id: "hiphop", name: "Hip-Hop & Rap", color: "linear-gradient(135deg, #8B0000, #2C001E)", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80", query: "Kendrick Lamar" },
  { id: "pop", name: "Global Pop Hits", color: "linear-gradient(135deg, #FF1744, #4A000E)", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80", query: "Taylor Swift" }
];

export const ONLINE_ARTISTS = [
  { id: "art-01", name: "The Weeknd", monthlyListeners: "115,400,000", verified: true, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80" },
  { id: "art-02", name: "Billie Eilish", monthlyListeners: "98,200,000", verified: true, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80" }
];

export async function searchMusicOnline(query) {
  if (!query || !query.trim()) {
    return { query: "", topResult: null, tracks: [], artists: [], playlists: [] };
  }

  const q = query.trim().toLowerCase();

  const matchingTracks = ONLINE_CHARTS.filter(
    t => t.title.toLowerCase().includes(q) || 
         t.artist.toLowerCase().includes(q) ||
         t.genre.toLowerCase().includes(q)
  );

  let topResult = matchingTracks.length > 0 ? { type: "track", data: matchingTracks[0] } : null;

  return {
    query,
    topResult,
    tracks: matchingTracks,
    artists: ONLINE_ARTISTS.filter(a => a.name.toLowerCase().includes(q)),
    playlists: ONLINE_PLAYLISTS
  };
}

export async function fetchOnlineLyrics(track) {
  if (track.lyrics && track.lyrics.length > 0) {
    return { trackId: track.id, lyrics: track.lyrics };
  }

  const generated = [
    { time: 0, text: `[Playing ${track.title} by ${track.artist}]` },
    { time: 10, text: "Streaming live online via music.k" },
    { time: 25, text: `Feel the rhythm of ${track.album || 'the music'}...` },
    { time: 50, text: "Pure Red Spotify aesthetic • Full-Length audio" }
  ];

  return { trackId: track.id, lyrics: generated };
}

export const LOCAL_TRACKS = ONLINE_CHARTS;
export const LOCAL_PLAYLISTS = ONLINE_PLAYLISTS;
export const LOCAL_GENRES = ONLINE_GENRES;
export const LOCAL_ARTISTS = ONLINE_ARTISTS;
