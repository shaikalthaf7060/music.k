/**
 * music.k Live Music Search & Online Catalog
 * Live online search across millions of songs via public music APIs.
 */

// Curated top global tracks that are immediately available
export const ONLINE_CHARTS = [
  {
    id: "chart-01",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/a5/d8/4e/a5d84edc-15a0-5cb3-bc53-a5c9df68903c/mzaf_11306354670005706240.plus.aac.p.m4a",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    genre: "Synthwave / Pop",
    year: 2020,
    plays: "4.2B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/00/a3/96/00a39649-6291-7683-11ef-dd13289ca114/20UMGIM08249.rgb.jpg/600x600bb.jpg",
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
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/95/92/ff/9592ff90-9516-fc59-dc63-380d0d5d086a/mzaf_16393527263595507746.plus.aac.p.m4a",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    album: "Starboy",
    duration: 230,
    genre: "Electronic / R&B",
    year: 2016,
    plays: "3.1B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ef/07/70/ef077063-2287-c1f0-0e9e-cf795c378d38/16UMGIM69458.rgb.jpg/600x600bb.jpg",
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
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/10/4b/81/104b8156-f6ec-f233-a612-42171120f269/mzaf_10526756620959063529.plus.aac.p.m4a",
    title: "BIRDS OF A FEATHER",
    artist: "Billie Eilish",
    album: "HIT ME HARD AND SOFT",
    duration: 195,
    genre: "Indie Pop",
    year: 2024,
    plays: "1.8B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/e5/28/7f/e5287f34-3151-512c-47fc-629215ba0ea5/24UMGIM36515.rgb.jpg/600x600bb.jpg",
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
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/58/b0/a2/58b0a2fe-43fb-075f-ee6b-c744be6c1411/mzaf_11306786803875323455.plus.aac.p.m4a",
    title: "Not Like Us",
    artist: "Kendrick Lamar",
    album: "Single",
    duration: 274,
    genre: "Hip-Hop",
    year: 2024,
    plays: "950M",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/28/ab/51/28ab51ce-0b73-0498-8422-a72382f63f53/24UMGIM52378.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Mustard on the beat, ho]" },
      { time: 8, text: "Psst, I see dead people" },
      { time: 15, text: "They not like us, they not like us, they not like us" },
      { time: 55, text: "WOP, WOP, WOP, WOP, WOP, Dot, f*ck 'em up" }
    ]
  },
  {
    id: "chart-05",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/0d/bb/22/0dbb2289-53e7-3f30-8015-c266854ce45c/mzaf_12411999201509172153.plus.aac.p.m4a",
    title: "Lose Yourself",
    artist: "Eminem",
    album: "Curtain Call: The Hits",
    duration: 326,
    genre: "Hip-Hop",
    year: 2002,
    plays: "2.4B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/03/49/71/034971c2-3e2f-5d07-2d4e-b5f7b49e1e7f/00602498878934.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Iconic Piano & Electric Guitar Intro]" },
      { time: 12, text: "Look, if you had one shot, or one opportunity" },
      { time: 32, text: "His palms are sweaty, knees weak, arms are heavy" },
      { time: 53, text: "You better lose yourself in the music, the moment" }
    ]
  },
  {
    id: "chart-06",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/1b/c2/f7/1bc2f7f9-cbca-ee2e-f49a-e5fa4189e47c/mzaf_8497672223846665792.plus.aac.p.m4a",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    genre: "Nu-Disco / Pop",
    year: 2020,
    plays: "2.2B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/5c/48/4f/5c484f2e-4b47-ef99-87fb-6a6c4bbfba42/190295286101.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Nu-Disco Funk Bass Intro]" },
      { time: 9, text: "If you wanna run away with me, I know a galaxy" },
      { time: 46, text: "You want me, I want you, baby" },
      { time: 50, text: "My sugarboo, I'm levitating" }
    ]
  },
  {
    id: "chart-07",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/44/22/a3/4422a36b-a25e-ea77-c93d-4c312cb3bc89/mzaf_10793630656041697204.plus.aac.p.m4a",
    title: "Faded",
    artist: "Alan Walker",
    album: "Different World",
    duration: 212,
    genre: "EDM / Electronic",
    year: 2015,
    plays: "3.6B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/81/49/a2/8149a2bf-90bf-c533-87b3-8557b49da2ef/886445585097.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Atmospheric Piano Intro]" },
      { time: 15, text: "You were the shadow to my light" },
      { time: 40, text: "Where are you now?" },
      { time: 76, text: "I'm faded, I'm faded" }
    ]
  },
  {
    id: "chart-08",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/10/d4/0e/10d40e94-fa06-69e6-f56f-2cb8d672ef91/mzaf_7820542385108044706.plus.aac.p.m4a",
    title: "FE!N",
    artist: "Travis Scott ft. Playboi Carti",
    album: "UTOPIA",
    duration: 191,
    genre: "Trap",
    year: 2023,
    plays: "1.2B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/74/d3/18/74d31846-95ff-fce3-2db5-8c76332ec13b/196589578644.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Synth Stabs & Siren Intro]" },
      { time: 14, text: "FE!N, FE!N, FE!N, FE!N, FE!N" }
    ]
  },
  {
    id: "chart-09",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/6c/fb/8e/6cfb8eec-4bf0-f215-60b6-98dc42f36f3c/mzaf_10574241772651475736.plus.aac.p.m4a",
    title: "Cruel Summer",
    artist: "Taylor Swift",
    album: "Lover",
    duration: 178,
    genre: "Pop",
    year: 2019,
    plays: "2.1B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5a/81/4f/5a814f85-78e7-ff40-a35f-15c0e251a37c/19UMGIM68357.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Synth Intro]" },
      { time: 10, text: "Fever dream high in the quiet of the night" },
      { time: 55, text: "It's a cruel summer with you" }
    ]
  },
  {
    id: "chart-10",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/37/e7/03/37e70395-5cb5-2fbb-d08b-9ce9ee8fa7f7/mzaf_12952899015949544976.plus.aac.p.m4a",
    title: "Circles",
    artist: "Post Malone",
    album: "Hollywood's Bleeding",
    duration: 215,
    genre: "Pop Rock",
    year: 2019,
    plays: "2.5B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f4/13/46/f4134608-8f83-e18e-4f76-8dc9c02ff597/19UMGIM74597.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Acoustic Bass Intro]" },
      { time: 12, text: "Seasons change and our love went cold" },
      { time: 48, text: "Run away, but we're running in circles" }
    ]
  },
  {
    id: "chart-11",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/61/cf/37/61cf37fb-a790-21a4-96fe-df32fb6b8fb6/mzaf_17208756910609315357.plus.aac.p.m4a",
    title: "God's Plan",
    artist: "Drake",
    album: "Scorpion",
    duration: 198,
    genre: "Hip-Hop",
    year: 2018,
    plays: "2.3B",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/c5/40/4ac540ad-a0cb-e478-f9e4-bb1744b8dc22/18UMGIM30925.rgb.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Drake Vocal Sample Intro]" },
      { time: 15, text: "Yeah, they wishin' and wishin' on me" },
      { time: 35, text: "God's plan, God's plan" }
    ]
  },
  {
    id: "chart-12",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/0d/16/e2/0d16e257-22d7-fc06-69a4-1be69a844990/mzaf_11306354670005706240.plus.aac.p.m4a",
    title: "Kesariya",
    artist: "Arijit Singh",
    album: "Brahmastra",
    duration: 268,
    genre: "Bollywood",
    year: 2022,
    plays: "890M",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4b/c9/78/4bc97858-a5b6-79cf-93df-f4bf782f913d/8902894356499.jpg/600x600bb.jpg",
    lyrics: [
      { time: 0, text: "[Flute & Acoustic Melody]" },
      { time: 18, text: "Mujhko itna bataye koi" },
      { time: 45, text: "Kesariya tera ishq hai piya" }
    ]
  }
];

/**
 * Live Global Search across millions of songs in real time
 */
export async function searchMusicOnline(query) {
  if (!query || !query.trim()) {
    return { query: "", topResult: null, tracks: [], artists: [], playlists: [] };
  }

  const q = query.trim().toLowerCase();

  // 1. Check local preloaded chart tracks first
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
            : 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600';

          return {
            id: `online-${item.trackId}`,
            audioUrl: item.previewUrl,
            title: item.trackName,
            artist: item.artistName,
            album: item.collectionName || "Single",
            duration: Math.round((item.trackTimeMillis || 180000) / 1000),
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

  // Merge and deduplicate
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
    { time: 10, text: "Streaming live online in high fidelity" },
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
