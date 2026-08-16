import React from 'react';
import { X, Sliders, Volume2, RotateCcw } from 'lucide-react';
import { useAudio, EQ_PRESETS } from '../context/AudioContext';

const BAND_LABELS = [
  { freq: '60 Hz', name: 'Sub Bass' },
  { freq: '230 Hz', name: 'Punch' },
  { freq: '910 Hz', name: 'Mids' },
  { freq: '3.6 kHz', name: 'Treble' },
  { freq: '14 kHz', name: 'Air' }
];

export default function EqualizerModal() {
  const { 
    isEqualizerOpen, 
    setIsEqualizerOpen, 
    eqBands, 
    setEqualizerBand, 
    activeEqPreset, 
    applyEqPreset 
  } = useAudio();

  if (!isEqualizerOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsEqualizerOpen(false)}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <Sliders size={22} color="#FF2A3A" />
            <span>5-Band Studio Equalizer</span>
          </div>
          <button 
            className="action-icon-btn" 
            onClick={() => setIsEqualizerOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Preset Selector */}
        <div className="eq-preset-pills">
          {Object.keys(EQ_PRESETS).map(preset => (
            <button
              key={preset}
              className={`eq-pill ${activeEqPreset === preset ? 'active' : ''}`}
              onClick={() => applyEqPreset(preset)}
            >
              {preset}
            </button>
          ))}
          <button 
            className="eq-pill"
            onClick={() => applyEqPreset('Flat')}
            title="Reset to Flat"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>

        {/* 5-Band Slider Columns */}
        <div className="eq-sliders-grid">
          {BAND_LABELS.map((band, idx) => {
            const val = eqBands[idx] || 0;
            return (
              <div key={band.freq} className="eq-slider-col">
                <span className="eq-db-value">{val > 0 ? `+${val}` : val} dB</span>
                
                <input 
                  type="range"
                  min="-12"
                  max="12"
                  step="1"
                  value={val}
                  onChange={(e) => setEqualizerBand(idx, parseFloat(e.target.value))}
                  className="vertical-range"
                />

                <div style={{ textAlign: 'center' }}>
                  <div className="eq-band-label" style={{ color: 'white', fontWeight: 700 }}>{band.freq}</div>
                  <div className="eq-band-label">{band.name}</div>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
          Real-time Web Audio BiquadFilter DSP engine active.
        </p>
      </div>
    </div>
  );
}
