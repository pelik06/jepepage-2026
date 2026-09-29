/* ————————————————————————————————————————————
   music engine — a tiny generative music box.
   Pure Web Audio, no audio files: a slow dreamy arpeggio
   (Gm9 → E♭maj9 → B♭maj7 → F add9) with a soft pad and a
   feedback delay for space. Starts only on user gesture.
———————————————————————————————————————————— */

const MIDI_A4 = 69
const freq = (m) => 440 * Math.pow(2, (m - MIDI_A4) / 12)

// chord tones (MIDI) for the arpeggio + pad roots
const CHORDS = [
  { arp: [62, 65, 69, 70, 74, 77], pad: [43, 50] }, // Gm9  : D F A Bb D F
  { arp: [63, 67, 70, 74, 79], pad: [39, 46] },     // Eb9  : Eb G Bb D G
  { arp: [62, 65, 70, 74, 77], pad: [46, 53] },     // Bbmaj7: D F Bb D F
  { arp: [60, 65, 67, 69, 72, 77], pad: [41, 48] }, // Fadd9: C F G A C F
]

const STEP = 60 / 72 / 2 // eighth note at 72 bpm ≈ 0.416s

class MusicBox {
  constructor() {
    this.ctx = null
    this.master = null
    this.timer = null
    this.stepIndex = 0
    this.nextTime = 0
    this.playing = false
    this.listeners = new Set()
  }

  _ensure() {
    if (this.ctx) return
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    this.ctx = new Ctx()

    this.master = this.ctx.createGain()
    this.master.gain.value = 0.0001

    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -20
    comp.ratio.value = 4

    // dreamy feedback delay
    this.delay = this.ctx.createDelay(2)
    this.delay.delayTime.value = 0.46
    this.fb = this.ctx.createGain()
    this.fb.gain.value = 0.34
    this.wet = this.ctx.createGain()
    this.wet.gain.value = 0.3

    this.master.connect(comp)
    comp.connect(this.ctx.destination)
    this.master.connect(this.delay)
    this.delay.connect(this.fb)
    this.fb.connect(this.delay)
    this.delay.connect(this.wet)
    this.wet.connect(comp)
  }

  _pluck(midi, t, vel = 1) {
    const f = freq(midi)
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.16 * vel, t + 0.006)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.9 + Math.random() * 0.5)
    g.connect(this.master)

    const o = this.ctx.createOscillator()
    o.type = 'sine'
    o.frequency.value = f
    o.connect(g)
    o.start(t)
    o.stop(t + 2.6)

    // bell shimmer partial
    const g2 = this.ctx.createGain()
    g2.gain.setValueAtTime(0.0001, t)
    g2.gain.exponentialRampToValueAtTime(0.03 * vel, t + 0.005)
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
    g2.connect(this.master)
    const o2 = this.ctx.createOscillator()
    o2.type = 'sine'
    o2.frequency.value = f * 4
    o2.connect(g2)
    o2.start(t)
    o2.stop(t + 0.7)
  }

  _pad(midis, t, dur) {
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(0.022, t + dur * 0.4)
    g.gain.linearRampToValueAtTime(0.0001, t + dur * 1.05)
    const lp = this.ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 720
    g.connect(lp)
    lp.connect(this.master)
    for (const m of midis) {
      const o = this.ctx.createOscillator()
      o.type = 'triangle'
      o.frequency.value = freq(m) * (1 + (Math.random() - 0.5) * 0.004)
      o.connect(g)
      o.start(t)
      o.stop(t + dur * 1.1)
    }
  }

  _schedule() {
    while (this.nextTime < this.ctx.currentTime + 1.2) {
      const chord = CHORDS[Math.floor(this.stepIndex / 8) % CHORDS.length]
      if (this.stepIndex % 8 === 0) {
        this._pad(chord.pad, this.nextTime, STEP * 8)
      }
      // arpeggio note: walk up, sparkle occasionally
      const idx = this.stepIndex % chord.arp.length
      const vel = 0.7 + Math.random() * 0.3
      this._pluck(chord.arp[idx], this.nextTime, vel)
      if (Math.random() < 0.18) {
        const hi = chord.arp[Math.floor(Math.random() * chord.arp.length)] + 12
        this._pluck(hi, this.nextTime + STEP * 0.5, 0.4)
      }
      this.nextTime += STEP
      this.stepIndex += 1
    }
  }

  start() {
    this._ensure()
    if (!this.ctx || this.playing) return
    if (this.ctx.state === 'suspended') this.ctx.resume()
    this.playing = true
    this.nextTime = Math.max(this.ctx.currentTime + 0.08, this.nextTime)
    this.master.gain.cancelScheduledValues(this.ctx.currentTime)
    this.master.gain.setTargetAtTime(0.85, this.ctx.currentTime, 0.6)
    this._schedule()
    this.timer = setInterval(() => this._schedule(), 400)
    this._emit()
  }

  stop() {
    if (!this.ctx || !this.playing) return
    this.playing = false
    this.master.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.35)
    clearInterval(this.timer)
    this.timer = null
    this._emit()
  }

  toggle() {
    this.playing ? this.stop() : this.start()
    return this.playing
  }

  chime() {
    // a tiny two-note greeting for special moments (surprise reveal)
    this._ensure()
    if (!this.ctx) return
    if (this.ctx.state === 'suspended') this.ctx.resume()
    const t = this.ctx.currentTime + 0.02
    this._pluck(86, t, 0.9)
    this._pluck(93, t + 0.22, 0.7)
  }

  _emit() {
    for (const fn of this.listeners) fn(this.playing)
  }

  subscribe(fn) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }
}

export const music = new MusicBox()
