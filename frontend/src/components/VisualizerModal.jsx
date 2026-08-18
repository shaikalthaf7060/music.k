import React, { useEffect, useRef, useState } from 'react';
import { X, Activity, Radio, Disc, Sparkles } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { audioEngine } from '../services/audioEngine';

export default function VisualizerModal() {
  const { currentTrack, isPlaying, isVisualizerOpen, setIsVisualizerOpen } = useAudio();
  const canvasRef = useRef(null);
  const [visMode, setVisMode] = useState('bars'); // 'bars', 'wave', 'circle'
  const animIdRef = useRef(null);

  useEffect(() => {
    if (!isVisualizerOpen) {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Dark background gradient
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, width / 2);
      bgGrad.addColorStop(0, '#220508');
      bgGrad.addColorStop(1, '#0a0a0c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const freqData = audioEngine.getFrequencyData();
      const waveData = audioEngine.getWaveformData();

      if (visMode === 'bars') {
        // Red Frequency Bars
        const barCount = 48;
        const barWidth = (width / barCount) - 3;

        for (let i = 0; i < barCount; i++) {
          const index = Math.floor((i / barCount) * freqData.length);
          let value = isPlaying ? freqData[index] : 20 + Math.sin(Date.now() / 200 + i) * 10;
          const barHeight = (value / 255) * (height * 0.75);

          const x = i * (barWidth + 3) + 2;
          const y = height - barHeight - 20;

          // Crimson gradient for bars
          const barGrad = ctx.createLinearGradient(0, height, 0, y);
          barGrad.addColorStop(0, '#800000');
          barGrad.addColorStop(0.5, '#E50914');
          barGrad.addColorStop(1, '#FF4757');

          ctx.fillStyle = barGrad;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255, 42, 58, 0.6)';
          
          // Draw rounded bar
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
          ctx.fill();

          // Cap on top
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(x, y - 3, barWidth, 2);
        }
      } else if (visMode === 'wave') {
        // Crimson Oscilloscope Waveform
        ctx.beginPath();
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = '#FF2A3A';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FF2A3A';

        const sliceWidth = width / waveData.length;
        let x = 0;

        for (let i = 0; i < waveData.length; i++) {
          const v = isPlaying ? (waveData[i] / 128.0) : 1 + Math.sin(Date.now() / 300 + i * 0.1) * 0.08;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
      } else if (visMode === 'circle') {
        // Pulsing Neon Circle / Red Vinyl
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = 85;

        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius - 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#121216';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#E50914';
        ctx.shadowBlur = 25;
        ctx.shadowColor = 'rgba(255, 42, 58, 0.8)';
        ctx.stroke();

        const numPoints = 64;
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * 2 * Math.PI;
          const val = isPlaying ? freqData[i % freqData.length] : 40 + Math.sin(Date.now() / 200 + i) * 15;
          const r = baseRadius + (val / 255) * 60;

          const px = centerX + Math.cos(angle) * r;
          const py = centerY + Math.sin(angle) * r;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, 2 * Math.PI);
          ctx.fillStyle = '#FF4757';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FF2A3A';
          ctx.fill();
        }
      }

      animIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [isVisualizerOpen, visMode, isPlaying]);

  if (!isVisualizerOpen || !currentTrack) return null;

  return (
    <div className="visualizer-overlay">
      <div style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Activity size={24} color="#FF2A3A" />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>music.k Sonic Spectrum</h2>
          <span className="brand-badge">REAL-TIME FFT</span>
        </div>

        {/* Modes */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'bars', label: 'Crimson Bars' },
            { id: 'wave', label: 'Laser Wave' },
            { id: 'circle', label: 'Neon Pulsar' }
          ].map(m => (
            <button
              key={m.id}
              className={`badge-pill-btn ${visMode === m.id ? 'active-red' : ''}`}
              onClick={() => setVisMode(m.id)}
            >
              {m.label}
            </button>
          ))}
          <button 
            className="action-icon-btn" 
            onClick={() => setIsVisualizerOpen(false)}
            title="Close Visualizer"
            style={{ background: 'rgba(255,255,255,0.1)', marginLeft: '12px' }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <canvas 
        ref={canvasRef} 
        width={900} 
        height={380} 
        className="visualizer-canvas"
      />

      <div style={{ marginTop: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <span style={{ fontWeight: 700, color: 'white' }}>{currentTrack.title}</span> • {currentTrack.artist} ({currentTrack.genre})
      </div>
    </div>
  );
}
