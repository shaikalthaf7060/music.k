"""
Audio Catalog and Lyrics Database for music.k (The Red Spotify)
Contains rich track metadata, high-quality audio streams, and synchronized karaoke lyrics.
"""

TRACKS_DATABASE = [
    {
        "id": "red-01",
        "title": "Crimson Drive",
        "artist": "Neon Phantom",
        "album": "Redline Horizon",
        "duration": 184,
        "genre": "Synthwave",
        "year": 2026,
        "plays": "2,841,920",
        "coverUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80",
        "audioUrl": "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=synthwave-80s-110045.mp3",
        "bpm": 124,
        "lyrics": [
            {"time": 0, "text": "[Instrumental Intro - Pulsing Synth Bass]"},
            {"time": 12, "text": "Driving down the scarlet highway late at night"},
            {"time": 18, "text": "Crimson streetlights flashing through the neon light"},
            {"time": 25, "text": "Feel the engine rumble underneath my hands"},
            {"time": 32, "text": "Racing towards the borders of the promised lands"},
            {"time": 39, "text": "We are the night runners, painted in red"},
            {"time": 46, "text": "Leaving yesterday behind, chasing what lies ahead"},
            {"time": 53, "text": "[Synthesizer Solo - Pure Analog Resonance]"},
            {"time": 68, "text": "City skyline glowing like an ember spark"},
            {"time": 75, "text": "Shadows in the mirror cutting through the dark"},
            {"time": 82, "text": "No speed limit on this crimson track"},
            {"time": 89, "text": "Once we cross the redline there is no turning back"},
            {"time": 96, "text": "We are the night runners, painted in red"},
            {"time": 103, "text": "Leaving yesterday behind, chasing what lies ahead"},
            {"time": 118, "text": "[Heavy Arpeggiator Breakdown]"},
            {"time": 140, "text": "Red neon in the rearview fading away..."},
            {"time": 155, "text": "Until tomorrow turns into today"},
            {"time": 170, "text": "[Outro - Fade into Deep Bass Pulse]"}
        ]
    },
    {
        "id": "red-02",
        "title": "Midnight In Kyoto",
        "artist": "Velvet Shaik",
        "album": "Rain & Cassettes",
        "duration": 142,
        "genre": "Lo-Fi Beats",
        "year": 2026,
        "plays": "4,120,400",
        "coverUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
        "audioUrl": "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=lofi-study-112191.mp3",
        "bpm": 82,
        "lyrics": [
            {"time": 0, "text": "[Raindrop Ambience & Vinyl Crackle]"},
            {"time": 10, "text": "Gentle red lanterns swinging in the breeze"},
            {"time": 20, "text": "Warm matcha steam rising through the autumn trees"},
            {"time": 32, "text": "Quiet footsteps on cobblestone streets"},
            {"time": 45, "text": "Every drop of rain finding sync with the beats"},
            {"time": 58, "text": "[Rhodes Piano & Lo-Fi Vinyl Melodies]"},
            {"time": 80, "text": "Midnight whispers lost inside the glow"},
            {"time": 95, "text": "Time moves slowly when you let it go"},
            {"time": 110, "text": "Deep in Kyoto, watching shadows sway"},
            {"time": 125, "text": "[Gentle Tape Stop & Soft Rain Fade]"}
        ]
    },
    {
        "id": "red-03",
        "title": "Shadow Phonk",
        "artist": "K-Rider & VEX",
        "album": "Tokyo Driftline",
        "duration": 165,
        "genre": "Drift Phonk",
        "year": 2026,
        "plays": "6,750,000",
        "coverUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
        "audioUrl": "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=phonk-dark-trap-122484.mp3",
        "bpm": 138,
        "lyrics": [
            {"time": 0, "text": "[Cowbell Melody & Distorted Sub 808]"},
            {"time": 14, "text": "Step into the red zone, tires smoke the asphalt"},
            {"time": 21, "text": "Engine revving high, going hard with no fault"},
            {"time": 28, "text": "Tokyo highway, drift around the corner tight"},
            {"time": 35, "text": "Twin turbo screaming through the dead of night"},
            {"time": 42, "text": "[Heavy Phonk Cowbell Drop]"},
            {"time": 56, "text": "Smoke in the rearview, headlights glare"},
            {"time": 63, "text": "Catch me if you can, nobody can compare"},
            {"time": 77, "text": "Red tachometer bouncing on the rev limiter"},
            {"time": 91, "text": "Pure drift adrenaline, rhythm getting grittier"},
            {"time": 105, "text": "[Second Cowbell & Bassline Explosion]"},
            {"time": 130, "text": "Fast lane phantom disappears into the night"},
            {"time": 145, "text": "[Screeching Tires & Reverb Tail]"}
        ]
    },
    {
        "id": "red-04",
        "title": "Scarlet Horizons",
        "artist": "Aura Pulse",
        "album": "Visions of Red",
        "duration": 205,
        "genre": "Electronic / Melodic",
        "year": 2026,
        "plays": "1,940,300",
        "coverUrl": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
        "audioUrl": "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=electronic-future-beats-117997.mp3",
        "bpm": 128,
        "lyrics": [
            {"time": 0, "text": "[Atmospheric Pad & Vocal Chops]"},
            {"time": 16, "text": "Under the red aurora where colors collide"},
            {"time": 24, "text": "Open up your senses, let the rhythm guide"},
            {"time": 32, "text": "Waves of sound washing over the shore"},
            {"time": 40, "text": "Every heartbeat begging for more"},
            {"time": 48, "text": "[Melodic Euphoric Drop]"},
            {"time": 72, "text": "Can you feel the scarlet frequency?"},
            {"time": 80, "text": "Resonating deep in perfect harmony"},
            {"time": 96, "text": "We rise above the atmosphere"},
            {"time": 104, "text": "All the static fades and suddenly it's clear"},
            {"time": 120, "text": "[Progressive Synth Drop with Red Laser FX]"},
            {"time": 160, "text": "Forever in the scarlet horizon glow"},
            {"time": 180, "text": "[Outro - Ambient Echoes]"}
        ]
    },
    {
        "id": "red-05",
        "title": "Obsidian & Crimson",
        "artist": "Valkyrie Sound",
        "album": "Cyberpunk Requiem",
        "duration": 192,
        "genre": "Cyberpunk / Industrial",
        "year": 2026,
        "plays": "3,210,000",
        "coverUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
        "audioUrl": "https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=cyberpunk-2099-28156.mp3",
        "bpm": 130,
        "lyrics": [
            {"time": 0, "text": "[Cybernetic Glitch & Heavy Industrial Kick]"},
            {"time": 15, "text": "Glass towers piercing through obsidian sky"},
            {"time": 23, "text": "Augmented shadows watching passersby"},
            {"time": 30, "text": "Neon wires pulsing beneath the floor"},
            {"time": 38, "text": "Knocking on the titanium door"},
            {"time": 45, "text": "[Hard Cyberpunk Synth Wave Drop]"},
            {"time": 75, "text": "System overload, red alert flashing bright"},
            {"time": 83, "text": "Uncaged adrenaline takes over the night"},
            {"time": 105, "text": "Digital rebellion, breaking the code"},
            {"time": 120, "text": "Traveling down the cybernetic road"},
            {"time": 140, "text": "[Intense Overdrive Bassline]"},
            {"time": 175, "text": "Reboot sequence initiated... Red system active."}
        ]
    },
    {
        "id": "red-06",
        "title": "Ruby Sunset Chill",
        "artist": "Acoustic Ember",
        "album": "Campfire Stories",
        "duration": 156,
        "genre": "Acoustic / Chill",
        "year": 2026,
        "plays": "1,520,000",
        "coverUrl": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=80",
        "audioUrl": "https://cdn.pixabay.com/download/audio/2022/01/18/audio_7322eb9a69.mp3?filename=acoustic-guitars-ambient-chill-112193.mp3",
        "bpm": 90,
        "lyrics": [
            {"time": 0, "text": "[Warm Acoustic Guitar Fingerpicking]"},
            {"time": 12, "text": "Sun goes down behind the western hills"},
            {"time": 20, "text": "Painting skies in red while evening chills"},
            {"time": 30, "text": "Strings of acoustic melodies in the air"},
            {"time": 40, "text": "Not a single worry, not a single care"},
            {"time": 55, "text": "[Harmonica & Soft Guitar Strumming]"},
            {"time": 75, "text": "Sit beside the fire, watch the embers glow"},
            {"time": 90, "text": "Stories in the dusk, moving soft and slow"},
            {"time": 110, "text": "When the stars emerge in the ruby sky"},
            {"time": 125, "text": "We will watch the peaceful world go by"},
            {"time": 140, "text": "[Gentle Guitar Harmonics Outro]"}
        ]
    },
    {
        "id": "red-07",
        "title": "Bloodline Drift",
        "artist": "Redline Syndicate",
        "album": "Underground Ignition",
        "duration": 178,
        "genre": "Trap / Bass",
        "year": 2026,
        "plays": "5,430,100",
        "coverUrl": "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=500&auto=format&fit=crop&q=80",
        "audioUrl": "https://cdn.pixabay.com/download/audio/2022/11/06/audio_03d9876f18.mp3?filename=trap-future-bass-125091.mp3",
        "bpm": 140,
        "lyrics": [
            {"time": 0, "text": "[808 Roll & Hi-Hat Trap Rhythms]"},
            {"time": 14, "text": "Red lasers locked in on the target ahead"},
            {"time": 21, "text": "Living in the rhythm, painted in red"},
            {"time": 28, "text": "Heavy bass shaking every single speaker wall"},
            {"time": 35, "text": "Stand strong and tall, we will never fall"},
            {"time": 42, "text": "[Massive Trap Bass Drop]"},
            {"time": 70, "text": "Turn the volume up until the meter peaks"},
            {"time": 84, "text": "music.k streaming the sound that everybody seeks"},
            {"time": 105, "text": "[Second Trap Drop with Horn Stabs]"},
            {"time": 140, "text": "Bloodline power, unstoppable drive"},
            {"time": 160, "text": "[Sub Bass Fadeout]"}
        ]
    },
    {
        "id": "red-08",
        "title": "Tokyo Neon Dreams",
        "artist": "Shibuya Echo",
        "album": "Metropolis Redux",
        "duration": 210,
        "genre": "Future Funk / Nu-Disco",
        "year": 2026,
        "plays": "3,890,000",
        "coverUrl": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80",
        "audioUrl": "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=groovy-funky-future-bass-116560.mp3",
        "bpm": 120,
        "lyrics": [
            {"time": 0, "text": "[Disco Slap Bass & Funky Brass]"},
            {"time": 16, "text": "Shibuya crossing in the pouring rain"},
            {"time": 24, "text": "Catching every beat on the bullet train"},
            {"time": 32, "text": "Bright red billboards lighting up the night"},
            {"time": 40, "text": "Dancing till the morning brings the golden light"},
            {"time": 48, "text": "[Funky Disco Drop with Red Neon Synth]"},
            {"time": 72, "text": "Come with me into the rhythm of the city beat"},
            {"time": 88, "text": "Electric love flowing on every street"},
            {"time": 112, "text": "[Guitar Funky Solo]"},
            {"time": 136, "text": "Never stop the dance, never break the flow"},
            {"time": 160, "text": "music.k playing everywhere we go"},
            {"time": 190, "text": "[Funky Brass Outro]"}
        ]
    }
]

GENRES = [
    {"id": "synthwave", "name": "Synthwave & Retro", "color": "linear-gradient(135deg, #E50914, #800020)", "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80"},
    {"id": "lofi", "name": "Midnight Lo-Fi", "color": "linear-gradient(135deg, #8B0000, #2C001E)", "image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80"},
    {"id": "phonk", "name": "Drift Phonk & Trap", "color": "linear-gradient(135deg, #FF1744, #4A000E)", "image": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80"},
    {"id": "cyberpunk", "name": "Cyberpunk & Dark Electro", "color": "linear-gradient(135deg, #D50000, #1A0000)", "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80"},
    {"id": "chill", "name": "Ruby Acoustic & Chill", "color": "linear-gradient(135deg, #C62828, #3E000C)", "image": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80"},
    {"id": "disco", "name": "Future Funk & Disco", "color": "linear-gradient(135deg, #FF5252, #5D001E)", "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=80"},
    {"id": "electronic", "name": "Electronic & EDM", "color": "linear-gradient(135deg, #B71C1C, #1E0008)", "image": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80"},
    {"id": "workout", "name": "High Energy Workout", "color": "linear-gradient(135deg, #FF1744, #212121)", "image": "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=300&auto=format&fit=crop&q=80"}
]

FEATURED_PLAYLISTS = [
    {
        "id": "pl-01",
        "title": "Crimson Top 50 Global",
        "description": "The hottest trending tracks on music.k right now worldwide.",
        "coverUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
        "trackCount": 50,
        "likes": "1,204,912",
        "tracks": ["red-01", "red-03", "red-07", "red-05", "red-08", "red-04"]
    },
    {
        "id": "pl-02",
        "title": "Midnight In Tokyo: Red Edition",
        "description": "Late night lo-fi beats and rain frequencies to focus and relax.",
        "coverUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80",
        "trackCount": 38,
        "likes": "842,109",
        "tracks": ["red-02", "red-06", "red-08", "red-04"]
    },
    {
        "id": "pl-03",
        "title": "Drift & Speed: Phonk Heat",
        "description": "Aggressive drift phonk and heavy basslines for peak adrenaline.",
        "coverUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
        "trackCount": 45,
        "likes": "2,490,300",
        "tracks": ["red-03", "red-07", "red-05", "red-01"]
    },
    {
        "id": "pl-04",
        "title": "Cyberpunk 2099: Scarlet Core",
        "description": "Dark synth, industrial beats, and neon grit from the underground.",
        "coverUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
        "trackCount": 30,
        "likes": "631,440",
        "tracks": ["red-05", "red-01", "red-04", "red-03"]
    }
]

FEATURED_ARTISTS = [
    {
        "id": "art-01",
        "name": "Neon Phantom",
        "monthlyListeners": "4,128,900",
        "verified": True,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80",
        "bio": "Electronic & synthwave producer exploring neon-lit dystopian soundscapes."
    },
    {
        "id": "art-02",
        "name": "Velvet Shaik",
        "monthlyListeners": "5,820,400",
        "verified": True,
        "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        "bio": "Crafting mellow lo-fi tapes, jazz chords, and midnight chill experiences."
    },
    {
        "id": "art-03",
        "name": "K-Rider & VEX",
        "monthlyListeners": "7,310,000",
        "verified": True,
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
        "bio": "Pioneering the modern drift phonk wave with thunderous 808s and raw speed."
    },
    {
        "id": "art-04",
        "name": "Aura Pulse",
        "monthlyListeners": "2,950,120",
        "verified": True,
        "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
        "bio": "Melodic EDM and cinematic dreamscapes with shimmering vocal synthesis."
    }
]
