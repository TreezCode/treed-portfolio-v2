'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  Component,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  Pause,
  Play,
  RotateCcw,
  Undo2,
  Volume2,
  VolumeX,
} from 'lucide-react'
import {
  applyMove,
  describeState,
  getHint,
  INITIAL_STATE,
  parseSavedState,
  serializeState,
  traceLight,
  type Mechanism,
  type PuzzleState,
} from './puzzle'
import { ObservatoryDiagram } from './ObservatoryDiagram'
import { trackAnalytics } from '@/lib/analytics'

const ObservatoryCanvas = dynamic(() => import('./ObservatoryCanvas'), {
  ssr: false,
  loading: () => <div className="keeper-loading">Opening the observatory…</div>,
})
const SAVE_KEY = 'portal-keeper:observatory:v1'
const motionQuery = '(prefers-reduced-motion: reduce)'
const subscribeMotion = (callback: () => void) => {
  const query = window.matchMedia(motionQuery)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
const subscribeVisibility = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
const motionSnapshot = () => window.matchMedia(motionQuery).matches
const visibleSnapshot = () => !document.hidden
const serverSnapshot = () => true

type Session = { state: PuzzleState; history: PuzzleState[]; hydrated: boolean }
type SessionAction =
  | { type: 'restore'; state: PuzzleState }
  | { type: 'change'; state: PuzzleState }
  | { type: 'undo' }
function sessionReducer(session: Session, action: SessionAction): Session {
  if (action.type === 'restore') return { state: action.state, history: [], hydrated: true }
  if (action.type === 'undo') {
    const previous = session.history.at(-1)
    return previous
      ? { ...session, state: previous, history: session.history.slice(0, -1) }
      : session
  }
  if (JSON.stringify(action.state) === JSON.stringify(session.state)) return session
  return {
    ...session,
    state: action.state,
    history: [...session.history.slice(-79), session.state],
  }
}

class ObservatoryBoundary extends Component<
  { children: React.ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onFailure()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

const mechanisms: { id: Mechanism; label: string; detail: string; mark: string }[] = [
  { id: 'mirrorA', label: 'Mirror A', detail: 'By the lantern', mark: 'A' },
  { id: 'mirrorB', label: 'Mirror B', detail: 'Toward the portal', mark: 'B' },
  { id: 'lens', label: 'Pattern lens', detail: 'The final piece', mark: '◒' },
]

export default function PortalKeeper() {
  const [session, dispatch] = useReducer(sessionReducer, {
    state: INITIAL_STATE,
    history: [],
    hydrated: false,
  })
  const { state } = session
  const [selected, setSelected] = useState<Mechanism>('mirrorA')
  const [paused, setPaused] = useState(false)
  const [flat, setFlat] = useState(false)
  const [failed, setFailed] = useState(false)
  const [visible, setVisible] = useState(true)
  const [hintLevel, setHintLevel] = useState(0)
  const [sound, setSound] = useState(false)
  const [notice, setNotice] = useState('')
  const [saveAvailable, setSaveAvailable] = useState(true)
  const audioRef = useRef<AudioContext | null>(null)
  const soundPending = useRef(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const completionRef = useRef<HTMLHeadingElement>(null)
  const startReported = useRef(false)
  const completionReported = useRef(false)
  const reducedMotion = useSyncExternalStore(subscribeMotion, motionSnapshot, serverSnapshot)
  const documentVisible = useSyncExternalStore(subscribeVisibility, visibleSnapshot, serverSnapshot)
  const light = traceLight(state)
  const active = !paused && !reducedMotion && visible && documentVisible
  const current = mechanisms.find((item) => item.id === selected)!
  const failedScene = useCallback(() => setFailed(true), [])
  const selectMechanism = useCallback((mechanism: Mechanism) => {
    if (!startReported.current) startReported.current = trackAnalytics('game_start')
    setSelected(mechanism)
    setNotice('')
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let restored: PuzzleState | null = null
      try {
        const raw = localStorage.getItem(SAVE_KEY)
        restored = raw ? parseSavedState(raw) : null
        if (raw && !restored)
          setNotice('That saved room could not be opened. A fresh observatory is ready.')
        if (restored) setNotice('Welcome back. Your observatory is just as you left it.')
      } catch {
        setSaveAvailable(false)
      }
      // Returning to a completed save is not a new room completion.
      completionReported.current = Boolean(restored?.entered)
      dispatch({ type: 'restore', state: restored ?? INITIAL_STATE })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!session.hydrated || !saveAvailable) return
    try {
      localStorage.setItem(SAVE_KEY, serializeState(state))
    } catch {
      const frame = requestAnimationFrame(() => setSaveAvailable(false))
      return () => cancelAnimationFrame(frame)
    }
  }, [state, session.hydrated, saveAvailable])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(stage)
    const header = document.querySelector('.folio-header')
    const measure = () => {
      sectionRef.current?.style.setProperty(
        '--keeper-header-height',
        `${header?.getBoundingClientRect().height ?? 92}px`
      )
      sectionRef.current?.style.setProperty(
        '--keeper-stage-height',
        `${stage.getBoundingClientRect().height}px`
      )
    }
    measure()
    const resize = new ResizeObserver(measure)
    if (header) resize.observe(header)
    resize.observe(stage)
    return () => {
      observer.disconnect()
      resize.disconnect()
    }
  }, [])

  useEffect(() => {
    const context = audioRef.current
    if (context && context.state !== 'closed') {
      if (!documentVisible || !visible || paused) void context.suspend().catch(() => {})
      else if (sound) void context.resume().catch(() => {})
    }
  }, [documentVisible, visible, paused, sound])
  useEffect(
    () => () => {
      void audioRef.current?.close().catch(() => {})
    },
    []
  )
  useEffect(() => {
    if (!state.entered) return
    const frame = requestAnimationFrame(() => completionRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [state.entered])

  function chime(kind: 'move' | 'wake' | 'enter', context = audioRef.current) {
    if (!context || context.state !== 'running') return
    const notes =
      kind === 'move'
        ? [293.66]
        : kind === 'wake'
          ? [293.66, 349.23, 440, 659.25]
          : [440, 587.33, 659.25, 880]
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency
      const start = context.currentTime + index * 0.16
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(kind === 'move' ? 0.025 : 0.045, start + 0.025)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.6)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start(start)
      oscillator.stop(start + 1.7)
      oscillator.onended = () => {
        oscillator.disconnect()
        gain.disconnect()
      }
    })
  }

  async function toggleSound() {
    if (soundPending.current) return
    soundPending.current = true
    if (sound) {
      setSound(false)
      await audioRef.current?.close().catch(() => {})
      audioRef.current = null
      soundPending.current = false
      return
    }
    try {
      const context = new AudioContext()
      audioRef.current = context
      await context.resume()
      setSound(true)
      chime('move', context)
    } catch {
      await audioRef.current?.close().catch(() => {})
      audioRef.current = null
      setNotice('Sound is unavailable in this browser. Every clue is also visible.')
    } finally {
      soundPending.current = false
    }
  }

  function change(next: PuzzleState) {
    if (session.hydrated && JSON.stringify(next) !== JSON.stringify(state)) {
      if (!startReported.current) startReported.current = trackAnalytics('game_start')
      if (next.entered && !state.entered && traceLight(next).solved && !completionReported.current) {
        completionReported.current = trackAnalytics('game_complete')
      }
    }
    dispatch({ type: 'change', state: next })
    setNotice('')
    if (sound)
      chime(next.entered ? 'enter' : traceLight(next).solved && !light.solved ? 'wake' : 'move')
  }
  function rotate(delta: 1 | -1) {
    change(applyMove(state, { type: 'rotate', target: selected, delta }))
  }
  const readyToTurn = selected !== 'lens' || state.lensPlaced

  return (
    <div
      className="portal-keeper"
      ref={sectionRef}
      data-phase={state.entered ? 'arrived' : light.solved ? 'awake' : 'sleeping'}
    >
      <div className="keeper-workspace">
        <div className="keeper-stage" ref={stageRef}>
          <div className="keeper-stage-label">
            <span>{state.entered ? 'The garden beyond' : 'The Sleeping Observatory'}</span>
            <span className={light.solved ? 'keeper-awake' : ''}>
              <span aria-hidden="true" />
              {state.entered ? 'A world remembered' : light.solved ? 'Awake' : 'Waiting for light'}
            </span>
          </div>
          <div
            className="keeper-scene"
            role="img"
            aria-label={
              state.entered
                ? 'An impossible floating garden revealed through the restored portal.'
                : `An optical observatory with two mirrors, a lens and a sleeping portal. ${describeState(state)}`
            }
          >
            {flat || failed || !session.hydrated ? (
              <ObservatoryDiagram state={state} selected={selected} onSelect={selectMechanism} />
            ) : (
              <ObservatoryBoundary onFailure={failedScene}>
                <ObservatoryCanvas
                  state={state}
                  selected={selected}
                  onSelect={selectMechanism}
                  active={active}
                  reducedMotion={reducedMotion}
                  onFailure={failedScene}
                />
              </ObservatoryBoundary>
            )}
          </div>
        </div>
        <div className="keeper-utilities">
          <span>
            {failed
              ? '3D is unavailable. The flat puzzle still works.'
              : flat
                ? 'Same puzzle. A different perspective.'
                : 'Select an instrument in the room or below.'}
          </span>
          <div>
            <button
              type="button"
              onClick={() => setFlat(!flat)}
              aria-pressed={flat || failed}
              disabled={failed}
            >
              {flat ? '3D room' : 'Flat view'}
            </button>
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-pressed={paused}
              disabled={reducedMotion}
              aria-label={paused ? 'Play ambient motion' : 'Pause ambient motion'}
            >
              {paused || reducedMotion ? <Play size={15} /> : <Pause size={15} />}
              <span>{reducedMotion ? 'Still' : paused ? 'Play' : 'Pause'}</span>
            </button>
            <button type="button" onClick={toggleSound} aria-pressed={sound}>
              {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>Sound {sound ? 'on' : 'off'}</span>
            </button>
          </div>
        </div>
        <div className="keeper-desk">
          {state.entered ? (
            <div className="keeper-completion">
              <h2 ref={completionRef} tabIndex={-1}>
                Some worlds just need
                <br />
                <span>a little light.</span>
              </h2>
              <p>You woke the observatory. Beyond its door, something is growing again.</p>
              <div className="keeper-completion-actions">
                <button
                  className="folio-button"
                  type="button"
                  onClick={() => change({ ...state, entered: false })}
                >
                  Back to the observatory <ArrowLeft size={17} />
                </button>
                <Link className="folio-text-link" href="/work">
                  Explore my other worlds <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="keeper-instruments">
              <div className="keeper-selectors" role="group" aria-label="Choose an instrument">
                {mechanisms.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected === item.id}
                    onClick={() => selectMechanism(item.id)}
                  >
                    <span className="keeper-instrument-mark" aria-hidden="true">
                      {item.id === 'lens' ? (
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="8" />
                          <path d="M12 4v5M8 12h8M12 9v7" />
                        </svg>
                      ) : (
                        item.mark
                      )}
                    </span>
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.detail}</small>
                    </span>
                  </button>
                ))}
              </div>
              <div className="keeper-instrument-controls">
                <div>
                  <h2>{current.label}</h2>
                  <p>
                    {selected === 'lens'
                      ? state.lensPlaced
                        ? 'Match the notch to the receiver: point it left.'
                        : 'The empty holder sits in front of the receiver.'
                      : 'Turn the mirror. Follow where the light goes.'}
                  </p>
                </div>
                {selected === 'lens' && !state.lensPlaced ? (
                  <button
                    className="folio-button"
                    type="button"
                    disabled={!session.hydrated}
                    onClick={() => change(applyMove(state, { type: 'place-lens' }))}
                  >
                    Place the lens <ArrowRight size={17} />
                  </button>
                ) : (
                  <div
                    className="keeper-turn-controls"
                    role="group"
                    aria-label={`Rotate ${current.label}`}
                  >
                    <button
                      type="button"
                      onClick={() => rotate(-1)}
                      disabled={!session.hydrated || !readyToTurn}
                      aria-label={`Turn ${current.label} left`}
                    >
                      <ArrowLeft size={18} />
                      <span>Left</span>
                    </button>
                    <span
                      className="keeper-angle"
                      aria-label={
                        selected === 'lens'
                          ? `Notch points ${['up', 'right', 'down', 'left'][state.lensStep]}`
                          : `Angle ${state[selected] * 22.5} degrees`
                      }
                    >
                      {selected === 'lens'
                        ? ['Up', 'Right', 'Down', 'Left'][state.lensStep]
                        : `${state[selected] * 22.5}°`}
                    </span>
                    <button
                      type="button"
                      onClick={() => rotate(1)}
                      disabled={!session.hydrated || !readyToTurn}
                      aria-label={`Turn ${current.label} right`}
                    >
                      <span>Right</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="keeper-field-notes">
            <div className="keeper-progress" aria-label="Room progress">
              <span data-complete={light.receiverLit}>
                {light.receiverLit ? <Check size={15} /> : <span aria-hidden="true">1</span>}Route
                the light
              </span>
              <span data-complete={light.solved}>
                {light.solved ? <Check size={15} /> : <span aria-hidden="true">2</span>}Align the
                pattern
              </span>
            </div>
            <p className="keeper-state" role="status" aria-live="polite" aria-atomic="true">
              {notice || describeState(state)}
            </p>
            {!state.entered && (
              <button
                className="keeper-enter"
                type="button"
                disabled={!light.solved}
                onClick={() => change(applyMove(state, { type: 'enter' }))}
              >
                Enter the portal <ArrowUpRight size={18} />
              </button>
            )}
            <div className="keeper-actions">
              <button
                type="button"
                disabled={!session.history.length}
                onClick={() => {
                  dispatch({ type: 'undo' })
                  setNotice('Last move undone.')
                }}
              >
                <Undo2 size={16} />
                Undo
              </button>
              <button
                type="button"
                disabled={!session.hydrated}
                onClick={() => {
                  change({ ...INITIAL_STATE })
                  setHintLevel(0)
                  setSelected('mirrorA')
                  setNotice('A fresh start. You can undo this reset.')
                }}
              >
                <RotateCcw size={15} />
                Reset
              </button>
              <button
                type="button"
                aria-expanded={hintLevel > 0}
                aria-controls="keeper-hint"
                onClick={() => {
                  const next = hintLevel === 3 ? 0 : hintLevel + 1
                  if (next) {
                    if (!startReported.current) startReported.current = trackAnalytics('game_start')
                    trackAnalytics('game_hint', { hint_level: next })
                  }
                  setHintLevel(next)
                }}
              >
                <CircleHelp size={16} />
                {hintLevel === 0
                  ? 'A little nudge'
                  : hintLevel === 3
                    ? 'Hide hint'
                    : 'Another nudge'}
              </button>
            </div>
            {hintLevel > 0 && (
              <p className="keeper-hint" id="keeper-hint" role="status">
                {getHint(state, hintLevel)}
              </p>
            )}
            <small className="keeper-save">
              {saveAvailable
                ? 'Progress stays in this browser.'
                : 'Progress cannot be saved in this browser session.'}{' '}
              No timer. Take your time.
            </small>
          </div>
        </div>
      </div>
      <noscript>
        <p className="keeper-nojs">
          This room needs JavaScript to play. You can still{' '}
          <Link href="/work">explore the portfolio</Link>.
        </p>
        <style>{'.keeper-utilities, .keeper-desk { display: none; }'}</style>
      </noscript>
    </div>
  )
}
