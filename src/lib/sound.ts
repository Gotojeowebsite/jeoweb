/**
 * Tiny UI sound kit — synthesised live with OscillatorNode + envelope
 * shaping. No asset files: every cue is a single-shot oscillator + gain
 * envelope so the bundle stays zero-bytes for audio and works offline.
 *
 * Tuning rationale: each cue is short (< 250ms), polite (peak gain
 * trimmed), and uses harmonically gentle waves (sine / triangle) so
 * repeated firing during browsing is unobtrusive.
 *
 * Browser autoplay rules block AudioContext before the first user gesture;
 * we lazy-create on first play() and rely on sound-bindings.ts to call
 * wire() after first interaction.
 */

import { getPref } from './storage';

export type SoundName = 'blip' | 'pop' | 'launch' | 'chime' | 'swoosh';

class SoundKit {
	private ctx: AudioContext | null = null;
	private master: GainNode | null = null;
	private initialized = false;

	enabled(): boolean {
		try { return getPref('sound') !== false; } catch { return false; }
	}

	private ensureCtx(): AudioContext | null {
		if (this.ctx) return this.ctx;
		const Ctor = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined;
		if (!Ctor) return null;
		try {
			this.ctx = new Ctor();
			this.master = this.ctx.createGain();
			const vol = Number(getPref('soundVolume') ?? 0.55);
			this.master.gain.value = isFinite(vol) ? vol : 0.55;
			this.master.connect(this.ctx.destination);
		} catch { return null; }
		return this.ctx;
	}

	/** ADSR-style one-shot helper. */
	private tone(opts: {
		freq: number;
		type?: OscillatorType;
		dur?: number;        // total duration in seconds
		attack?: number;     // seconds
		release?: number;    // seconds
		peak?: number;       // 0..1 relative to master
		freqEnd?: number;    // optional pitch glide target
		when?: number;       // delay from now
	}) {
		const ctx = this.ctx;
		const master = this.master;
		if (!ctx || !master) return;
		const t0 = ctx.currentTime + (opts.when ?? 0);
		const dur = opts.dur ?? 0.14;
		const atk = Math.min(opts.attack ?? 0.005, dur / 3);
		const rel = Math.min(opts.release ?? 0.08, dur);
		const peak = opts.peak ?? 0.4;
		const osc = ctx.createOscillator();
		osc.type = opts.type ?? 'sine';
		osc.frequency.setValueAtTime(opts.freq, t0);
		if (opts.freqEnd != null) {
			osc.frequency.exponentialRampToValueAtTime(Math.max(opts.freqEnd, 1), t0 + dur);
		}
		const g = ctx.createGain();
		g.gain.setValueAtTime(0, t0);
		g.gain.linearRampToValueAtTime(peak, t0 + atk);
		g.gain.linearRampToValueAtTime(peak * 0.7, t0 + dur - rel);
		g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
		osc.connect(g).connect(master);
		osc.start(t0);
		osc.stop(t0 + dur + 0.02);
	}

	async play(name: SoundName) {
		if (!this.enabled()) return;
		const ctx = this.ensureCtx();
		if (!ctx) return;
		if (ctx.state === 'suspended') {
			try { await ctx.resume(); } catch { return; }
		}
		switch (name) {
			case 'blip':
				this.tone({ freq: 1100, type: 'sine', dur: 0.06, peak: 0.10, release: 0.04 });
				break;
			case 'pop':
				this.tone({ freq: 520, freqEnd: 880, type: 'triangle', dur: 0.12, peak: 0.22, release: 0.08 });
				break;
			case 'launch':
				// Rising arpeggio — three quick steps up.
				this.tone({ freq: 392, freqEnd: 587, type: 'triangle', dur: 0.16, peak: 0.28, release: 0.10 });
				this.tone({ freq: 523, freqEnd: 784, type: 'triangle', dur: 0.18, peak: 0.28, release: 0.12, when: 0.08 });
				this.tone({ freq: 659, freqEnd: 988, type: 'sine',     dur: 0.22, peak: 0.32, release: 0.16, when: 0.16 });
				break;
			case 'chime':
				// Perfect fifth + octave — celebratory.
				this.tone({ freq: 880, type: 'sine', dur: 0.32, peak: 0.30, release: 0.22 });
				this.tone({ freq: 1318.5, type: 'sine', dur: 0.36, peak: 0.22, release: 0.26, when: 0.06 });
				break;
			case 'swoosh':
				// Down-glide for modal open/close.
				this.tone({ freq: 1200, freqEnd: 320, type: 'sine', dur: 0.18, peak: 0.20, release: 0.14 });
				break;
		}
	}

	suspend() { this.ctx?.suspend?.(); }
	resume()  { this.ctx?.resume?.(); }

	wire() {
		if (this.initialized) return;
		this.initialized = true;
		document.addEventListener('visibilitychange', () => {
			if (document.hidden) this.suspend();
			else this.resume();
		});
	}
}

export const sound = new SoundKit();
