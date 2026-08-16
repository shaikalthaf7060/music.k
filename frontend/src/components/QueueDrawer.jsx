import React from 'react';
import { X, Trash2, Play, ListMusic, Music } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function QueueDrawer() {
  const { 
    isQueueOpen, 
    setIsQueueOpen, 
    currentTrack, 
    queue, 
    setQueue, 
    playTrack, 
    isPlaying 
  } = useAudio();

  if (!isQueueOpen) return null;

  const removeFromQueue = (index) => {
    setQueue(prev => prev.filter((_, i) => i !== index));
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <div className="queue-drawer">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ListMusic size={22} color="#FF2A3A" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Play Queue</h2>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {queue.length > 0 && (
            <button 
              className="badge-pill-btn" 
              onClick={clearQueue}
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              Clear
            </button>
          )}
          <button 
            className="action-icon-btn" 
            onClick={() => setIsQueueOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Now Playing Section */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px', letterSpacing: '0.5px' }}>
          Now Playing
        </h4>
        {currentTrack ? (
          <div className="playlist-item-row active">
            <img src={currentTrack.coverUrl} alt={currentTrack.title} className="playlist-row-img" />
            <div className="playlist-row-info" style={{ flex: 1 }}>
              <span className="playlist-row-title" style={{ color: 'var(--red-bright)' }}>{currentTrack.title}</span>
              <span className="playlist-row-subtitle">{currentTrack.artist}</span>
            </div>
            {isPlaying && (
              <div className="sound-wave">
                <span /><span /><span /><span />
              </div>
            )}
          </div>
        ) : (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No track playing</p>
        )}
      </div>

      {/* Next Up List */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', letterSpacing: '0.5px' }}>
          Next In Queue ({queue.length})
        </h4>

        {queue.length > 0 ? (
          queue.map((track, idx) => (
            <div 
              key={`${track.id}-${idx}`}
              className="playlist-item-row"
              style={{ justifyContent: 'space-between' }}
            >
              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden', flex: 1, cursor: 'pointer' }}
                onClick={() => {
                  const remaining = queue.filter((_, i) => i !== idx);
                  setQueue(remaining);
                  playTrack(track);
                }}
              >
                <img src={track.coverUrl} alt={track.title} style={{ width: '38px', height: '38px', borderRadius: '4px', objectFit: 'cover' }} />
                <div className="playlist-row-info">
                  <span className="playlist-row-title">{track.title}</span>
                  <span className="playlist-row-subtitle">{track.artist}</span>
                </div>
              </div>

              <button 
                className="action-icon-btn" 
                onClick={() => removeFromQueue(idx)}
                title="Remove from queue"
                style={{ width: '28px', height: '28px' }}
              >
                <Trash2 size={14} color="#6E6E80" />
              </button>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <Music size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
            <p style={{ fontSize: '0.85rem' }}>Queue is empty</p>
            <p style={{ fontSize: '0.75rem' }}>Add songs from search or browse grids</p>
          </div>
        )}
      </div>
    </div>
  );
}
