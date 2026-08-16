import React, { useState } from 'react';
import { X, PlusSquare, Music, Image as ImageIcon } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const PRESET_COVERS = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80"
];

export default function CreatePlaylistModal() {
  const { isCreatePlaylistOpen, setIsCreatePlaylistOpen, createPlaylist, navigateTo } = useAudio();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCover, setSelectedCover] = useState(PRESET_COVERS[0]);

  if (!isCreatePlaylistOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newPl = createPlaylist(title, description);
    setIsCreatePlaylistOpen(false);
    setTitle('');
    setDescription('');
    if (newPl) {
      navigateTo('playlist', newPl.id);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsCreatePlaylistOpen(false)}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div className="modal-title">
            <PlusSquare size={22} color="#FF2A3A" />
            <span>Create Red Playlist</span>
          </div>
          <button className="action-icon-btn" onClick={() => setIsCreatePlaylistOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
            Playlist Name *
          </label>
          <input 
            type="text" 
            className="text-input-field" 
            placeholder="e.g. Midnight Phonk Drive"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />

          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
            Description
          </label>
          <textarea 
            className="text-input-field" 
            placeholder="Describe the vibes of your playlist..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{ resize: 'none' }}
          />

          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
            Choose Album Cover
          </label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
            {PRESET_COVERS.map((cov, i) => (
              <img 
                key={i}
                src={cov}
                alt={`Cover ${i}`}
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '6px', 
                  objectFit: 'cover', 
                  cursor: 'pointer',
                  border: selectedCover === cov ? '2.5px solid #FF2A3A' : '1px solid var(--border-subtle)',
                  boxShadow: selectedCover === cov ? '0 0 12px rgba(229, 9, 20, 0.5)' : 'none'
                }}
                onClick={() => setSelectedCover(cov)}
              />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button 
              type="button" 
              className="badge-pill-btn" 
              onClick={() => setIsCreatePlaylistOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary-red"
            >
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
