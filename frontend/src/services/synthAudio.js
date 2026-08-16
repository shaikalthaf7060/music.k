/**
 * Web Audio API Engine for music.k
 * Generates dynamic synthwave / lofi / phonk audio streams in real-time
 * or handles HTML5 Audio buffer feeding with BiquadFilter equalizer nodes.
 */

class MusicAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.analyser = null;
    this.gainNode = null;
    this.eqNodes = [];
    this.sourceNode = null;
    this.htmlAudio = new Audio();
    this.htmlAudio.crossOrigin = "anonymous";
    this.isPlaying = false;
    this.synthInterval = null;
    this.activeTrack = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      
      // Analyser for real-time audio visualization
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      // Master Gain
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = 0.8;

      // 5-Band Equalizer: 60Hz (Sub), 230Hz (Bass), 910Hz (Mid), 3600Hz (Treble), 14000Hz (Air)
      const frequencies = [60, 230, 910, 3600, 14000];
      const types = ['lowshelf', 'peaking', 'peaking', 'peaking', 'highshelf'];

      this.eqNodes = frequencies.map((freq, i) => {
        const filter = this.audioCtx.createBiquadFilter();
        filter.type = types[i];
        filter.frequency.value = freq;
        filter.gain.value = 0;
        return filter;
      });

      // Chain: EQ[0] -> EQ[1] -> ... -> EQ[4] -> Analyser -> Gain -> Destination
      for (let i = 0; i < this.eqNodes.length - 1; i++) {
        this.eqNodes[i].connect(this.eqNodes[i + 1]);
      }
      this.eqNodes[this.eqNodes.length - 1].connect(this.analyser);
      this.analyser.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      try {
        this.sourceNode = this.audioCtx.createMediaElementSource(this.htmlAudio);
        this.sourceNode.connect(this.eqNodes[0]);
      } catch (e) {
        console.warn("Media element source init fallback", e);
      }
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setGain(volume) {
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(volume, this.audioCtx ? this.audioCtx.currentTime : 0);
    }
    this.htmlAudio.volume = Math.max(0, Math.min(1, volume));
  }

  setEqualizerBand(index, gainDb) {
    if (this.eqNodes && this.eqNodes[index] && this.audioCtx) {
      this.eqNodes[index].gain.setValueAtTime(gainDb, this.audioCtx.currentTime);
    }
  }

  getFrequencyData() {
    if (!this.analyser) return new Uint8Array(64);
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  getWaveformData() {
    if (!this.analyser) return new Uint8Array(64);
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  // Plays synthesized chord/bass sequence if direct audio stream is blocked/offline
  playSyntheticTrack(track) {
    this.init();
    this.stopSyntheticTrack();
    this.activeTrack = track;

    const bpm = track.bpm || 120;
    const beatInterval = (60 / bpm) * 1000;
    let step = 0;

    const chords = [
      [220, 261.63, 329.63, 392.00], // A minor 7
      [174.61, 220, 261.63, 329.63], // F maj 7
      [130.81, 164.81, 196.00, 246.94], // C maj 7
      [196.00, 246.94, 293.66, 349.23]  // G 7
    ];

    this.synthInterval = setInterval(() => {
      if (!this.isPlaying || !this.audioCtx) return;

      const chord = chords[Math.floor(step / 4) % chords.length];
      const note = chord[step % chord.length];

      // Synth Note
      const osc = this.audioCtx.createOscillator();
      const noteGain = this.audioCtx.createGain();
      
      osc.type = track.genre?.includes('Phonk') ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(note, this.audioCtx.currentTime);

      noteGain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.35);

      osc.connect(noteGain);
      noteGain.connect(this.eqNodes[0]);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.4);

      // Kick drum on beats
      if (step % 2 === 0) {
        const kickOsc = this.audioCtx.createOscillator();
        const kickGain = this.audioCtx.createGain();
        kickOsc.frequency.setValueAtTime(120, this.audioCtx.currentTime);
        kickOsc.frequency.exponentialRampToValueAtTime(30, this.audioCtx.currentTime + 0.15);
        kickGain.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
        kickGain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.15);

        kickOsc.connect(kickGain);
        kickGain.connect(this.eqNodes[0]);

        kickOsc.start();
        kickOsc.stop(this.audioCtx.currentTime + 0.16);
      }

      step++;
    }, beatInterval / 2);
  }

  stopSyntheticTrack() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const audioEngine = new MusicAudioEngine();
