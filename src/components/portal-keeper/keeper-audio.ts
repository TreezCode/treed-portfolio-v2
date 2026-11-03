export type KeeperChime = 'move' | 'wake' | 'enter'

type AudioOptions = {
  createContext?: () => AudioContext
  isVisible?: () => boolean
  onUnavailable: () => void
}

function createContext() {
  const Audio =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Audio) throw new Error('Web Audio is unavailable')
  return new Audio()
}

/** Owns opt-in, short feedback sounds. Call play/enable directly from a user gesture. */
export class KeeperAudio {
  private context: AudioContext | null = null
  private enabled = false
  private attempt = 0
  private resumeTimer: ReturnType<typeof setTimeout> | undefined
  private voices = new Set<{ oscillator: OscillatorNode; gain: GainNode }>()
  private options: AudioOptions

  constructor(options: AudioOptions) {
    this.options = options
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (enabled) this.play('move')
    else this.release()
  }

  play(kind: KeeperChime) {
    if (!this.enabled || !this.isVisible()) return
    this.clearResumeTimer()
    const attempt = ++this.attempt
    let context: AudioContext
    const current = () => this.enabled && this.attempt === attempt
    const unavailable = () => {
      if (!current()) return
      this.enabled = false
      this.release()
      this.options.onUnavailable()
    }
    try {
      if (!this.context || this.context.state === 'closed') {
        this.stopVoices()
        this.context = (this.options.createContext ?? createContext)()
      }
      context = this.context
      const ready = () => {
        if (!current() || this.context !== context) return
        this.clearResumeTimer()
        if (!this.isVisible()) return
        if (context.state !== 'running') return unavailable()
        this.chime(kind, context)
      }
      if (context.state === 'running') {
        ready()
      } else {
        // Mobile browsers can require a fresh gesture after interruption. Do not
        // await anything before resume, or lock future taps behind this promise.
        this.stopVoices()
        this.resumeTimer = setTimeout(unavailable, 2000)
        void context.resume().then(ready).catch(unavailable)
      }
    } catch {
      unavailable()
    }
  }

  /** A hidden tab drops old notes; the next explicit action creates fresh audio. */
  quiet() {
    this.release()
  }

  dispose() {
    this.enabled = false
    this.release()
  }

  private isVisible() {
    return this.options.isVisible?.() ?? !document.hidden
  }

  private clearResumeTimer() {
    if (this.resumeTimer !== undefined) clearTimeout(this.resumeTimer)
    this.resumeTimer = undefined
  }

  private release() {
    ++this.attempt
    this.clearResumeTimer()
    const context = this.context
    this.context = null
    this.stopVoices()
    if (context && context.state !== 'closed') void context.close().catch(() => {})
  }

  private stopVoices() {
    for (const { oscillator, gain } of this.voices) {
      oscillator.onended = null
      try {
        oscillator.stop()
      } catch {
        /* An ended note is already silent. */
      }
      oscillator.disconnect()
      gain.disconnect()
    }
    this.voices.clear()
  }

  private chime(kind: KeeperChime, context: AudioContext) {
    const notes =
      kind === 'move'
        ? [293.66]
        : kind === 'wake'
          ? [293.66, 349.23, 440, 659.25]
          : [440, 587.33, 659.25, 880]
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const voice = { oscillator, gain }
      this.voices.add(voice)
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency
      const start = context.currentTime + index * 0.16
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(kind === 'move' ? 0.025 : 0.045, start + 0.025)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.6)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.onended = () => {
        oscillator.disconnect()
        gain.disconnect()
        this.voices.delete(voice)
      }
      oscillator.start(start)
      oscillator.stop(start + 1.7)
    })
  }
}
