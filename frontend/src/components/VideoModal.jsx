import React from 'react';
import { X, Tv, Maximize2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function VideoModal() {
  const { isVideoModalOpen, setIsVideoModalOpen, currentTrack } = useAudio();

  if (!isVideoModalOpen || !currentTrack) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
      <div 
        className="modal-content-box" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '820px', width: '95%', padding: '20px' }}
      >
        <div className="modal-header" style={{ marginBottom: '12px' }}>
          <div className="modal-title">
            <Tv size={22} color="#FF2A3A" />
            <span>YouTube Live Stream • {currentTrack.title}</span>
          </div>
          <button className="action-icon-btn" onClick={() => setIsVideoModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Video Player Display */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
          <div id="yt-player-container-modal" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {/* The YouTube iframe will be placed here or mirrored */}
          </div>
        </div>

        <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{currentTrack.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{currentTrack.artist} • {currentTrack.album}</p>
          </div>
          <span className="brand-badge">ONLINE YOUTUBE STREAM</span>
        </div>
      </div>
    </div>
  );
}
