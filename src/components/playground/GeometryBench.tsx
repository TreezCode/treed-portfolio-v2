'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
} from 'lucide-react'
import {
  DEFAULT_CONFIG,
  PALETTES,
  PRESETS,
  configFromHash,
  configToHash,
  makeVariation,
  normalizeConfig,
  type BenchConfig,
  type BenchPalette,
} from './bench-config'
import { buildPosterSvg } from './bench-poster'

const GeometryCanvas = dynamic(() => import('./GeometryCanvas'), { ssr: false })
const reducedQuery = '(prefers-reduced-motion: reduce)'
const subscribeMotion = (callback: () => void) => {
  const query = window.matchMedia(reducedQuery)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
const subscribeVisibility = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback)
  return () => document.removeEventListener('visibilitychange', callback)
}
const motionSnapshot = () => window.matchMedia(reducedQuery).matches
const visibilitySnapshot = () => !document.hidden
const serverSnapshot = () => true

class SceneBoundary extends Component<
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

const sliders: {
  key: 'symmetry' | 'layers' | 'spread' | 'twist' | 'speed'
  label: string
  min: number
  max: number
  unit: string
}[] = [
  { key: 'symmetry', label: 'Symmetry', min: 3, max: 12, unit: 'fold' },
  { key: 'layers', label: 'Layers', min: 2, max: 8, unit: '' },
  { key: 'spread', label: 'Spread', min: 0, max: 100, unit: '%' },
  { key: 'twist', label: 'Twist', min: -90, max: 90, unit: '°' },
  { key: 'speed', label: 'Motion', min: 0, max: 100, unit: '%' },
]

function downloadFile(href: string, filename: string) {
  const link = document.createElement('a')
  link.href = href
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export default function GeometryBench() {
  const [config, setConfig] = useState<BenchConfig>(DEFAULT_CONFIG)
  const [paused, setPaused] = useState(false)
  const [yaw, setYaw] = useState(0)
  const [visible, setVisible] = useState(true)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [message, setMessage] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const benchRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; yaw: number } | null>(null)
  const captureRef = useRef<(() => string | null) | null>(null)
  const reducedMotion = useSyncExternalStore(subscribeMotion, motionSnapshot, serverSnapshot)
  const documentVisible = useSyncExternalStore(
    subscribeVisibility,
    visibilitySnapshot,
    serverSnapshot
  )
  const palette = PALETTES[config.palette]
  const poster = useMemo(
    () => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(buildPosterSvg(config))}`,
    [config]
  )
  const preset = PRESETS.find((item) => configToHash(item.config) === configToHash(config))
  const isStill = paused || reducedMotion || config.speed === 0 || failed
  const captureReady = useCallback((capture: (() => string | null) | null) => {
    captureRef.current = capture
  }, [])
  const sceneReady = useCallback(() => setReady(true), [])
  const sceneFailed = useCallback(() => {
    setFailed(true)
    setReady(false)
  }, [])

  useEffect(() => {
    const restore = () => {
      const restored = configFromHash(window.location.hash)
      if (restored) {
        setConfig(restored)
        setYaw(0)
        setMessage('Shared recipe loaded. Make it your own.')
      } else if (window.location.hash.startsWith('#bench='))
        setMessage('That recipe could not be opened. Try one of the starting points below.')
    }
    const frame = requestAnimationFrame(restore)
    window.addEventListener('hashchange', restore)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', restore)
    }
  }, [])

  useEffect(() => {
    const element = stageRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '50px',
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const header = document.querySelector('.folio-header')
    if (!header) return
    const measure = () =>
      benchRef.current?.style.setProperty(
        '--bench-header-height',
        `${header.getBoundingClientRect().height}px`
      )
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  function update(values: Partial<BenchConfig>) {
    setConfig((previous) => normalizeConfig({ ...previous, ...values }))
    setCopied(false)
    setShareUrl('')
    setMessage('')
  }

  function selectPreset(next: BenchConfig) {
    setConfig({ ...next })
    setYaw(0)
    setCopied(false)
    setShareUrl('')
    setMessage('')
  }

  async function copyRecipe() {
    const url = new URL(window.location.href)
    url.hash = configToHash(config)
    // The recipe describes the sculpture; live animation time and viewing angle are not stored.
    window.history.replaceState(window.history.state, '', url)
    try {
      await navigator.clipboard.writeText(url.href)
      setCopied(true)
      setMessage('Recipe link copied. It opens this shape, palette and settings.')
    } catch {
      setShareUrl(url.href)
      setMessage('Copy this recipe link to keep or share your settings.')
    }
  }

  function savePoster() {
    const url = URL.createObjectURL(new Blob([buildPosterSvg(config)], { type: 'image/svg+xml' }))
    downloadFile(url, `geometry-bench-${config.shape}-${config.seed}.svg`)
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setMessage('Your flat geometric print is ready as an SVG.')
  }

  function saveView() {
    const data = captureRef.current?.()
    if (data) {
      downloadFile(data, `geometry-bench-${config.shape}-${config.seed}.png`)
      setMessage('Your current 3D view is ready as a PNG.')
    } else setMessage('The 3D view could not be saved. You can still save the SVG print.')
  }

  return (
    <div
      className="geometry-bench"
      ref={benchRef}
      style={
        {
          '--bench-color': palette.line,
          '--bench-secondary': palette.secondary,
        } as React.CSSProperties
      }
    >
      <div className="bench-presets" role="group" aria-label="Starting points">
        {PRESETS.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => selectPreset(item.config)}
            aria-pressed={preset?.id === item.id}
          >
            <span className={`bench-preset-symbol symbol-${item.config.shape}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>
              <strong>{item.name}</strong>
              <small>{item.description}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="bench-workspace">
        <div className="bench-stage-column">
          <div
            className="bench-stage"
            ref={stageRef}
            data-renderer={failed ? 'poster' : ready ? 'webgl' : 'loading'}
            data-motion={isStill ? 'still' : 'playing'}
          >
            <div className="bench-stage-caption">
              <span>{preset?.name ?? 'Your curious variation'}</span>
              <span>Seed {String(config.seed).padStart(6, '0')}</span>
            </div>
            <div
              className="bench-view"
              role="img"
              aria-label={`${config.symmetry}-fold ${config.shape} sculpture with ${config.layers} layers, in the ${palette.label} palette. Adjust it with the controls.`}
              onPointerDown={(event) => {
                if (event.button !== 0) return
                drag.current = { x: event.clientX, yaw }
                event.currentTarget.setPointerCapture(event.pointerId)
              }}
              onPointerMove={(event) => {
                if (!drag.current) return
                const distance = event.clientX - drag.current.x
                if (Math.abs(distance) > 5) {
                  setPaused(true)
                  setYaw(drag.current.yaw + distance * 0.009)
                }
              }}
              onPointerUp={() => {
                drag.current = null
              }}
              onPointerCancel={() => {
                drag.current = null
              }}
            >
              <div className="bench-poster" data-hidden={ready && !failed}>
                <Image unoptimized src={poster} alt="" width={1200} height={1200} priority />
              </div>
              {!failed && (
                <SceneBoundary onFailure={sceneFailed}>
                  <GeometryCanvas
                    config={config}
                    yaw={yaw}
                    paused={paused || !visible || !documentVisible}
                    reducedMotion={reducedMotion}
                    onReady={sceneReady}
                    onFailure={sceneFailed}
                    onCaptureReady={captureReady}
                  />
                </SceneBoundary>
              )}
            </div>
            <div className="bench-stage-actions">
              <button
                type="button"
                onClick={() => setPaused(!paused)}
                disabled={reducedMotion || failed || config.speed === 0}
                aria-pressed={isStill}
                aria-label={
                  reducedMotion ? 'Motion reduced' : isStill ? 'Play motion' : 'Pause motion'
                }
              >
                {isStill ? <Play size={16} /> : <Pause size={16} />}
                <span className="bench-motion-long">
                  {reducedMotion ? 'Motion reduced' : isStill ? 'Play motion' : 'Pause motion'}
                </span>
                <span className="bench-motion-short" aria-hidden="true">
                  {reducedMotion || failed || config.speed === 0
                    ? 'Still'
                    : isStill
                      ? 'Play'
                      : 'Pause'}
                </span>
              </button>
              <div role="group" aria-label="Viewing angle">
                <button
                  type="button"
                  aria-label="Turn sculpture left"
                  disabled={failed}
                  onClick={() => {
                    setPaused(true)
                    setYaw((value) => value - Math.PI / 8)
                  }}
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  aria-label="Reset viewing angle"
                  disabled={failed}
                  onClick={() => setYaw(0)}
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Turn sculpture right"
                  disabled={failed}
                  onClick={() => {
                    setPaused(true)
                    setYaw((value) => value + Math.PI / 8)
                  }}
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
          <p className="bench-stage-note">
            {failed
              ? 'The 3D view is unavailable here. The flat print still responds to your controls.'
              : 'Drag sideways to turn it. Or use the arrow buttons. Scrolling stays yours.'}
          </p>
        </div>
        <section
          className="bench-controls"
          aria-labelledby="bench-controls-title"
          onFocusCapture={(event) => {
            const target = event.target as HTMLElement
            if (
              !target.matches(':focus-visible') ||
              window.innerWidth > 760 ||
              window.innerHeight < 740
            )
              return
            const row = target.closest(
              '.bench-range, .bench-form-select, .bench-palettes, .bench-change-actions'
            )
            if (!row) return
            requestAnimationFrame(() => {
              if (!row.isConnected) return
              const stageBottom =
                stageRef.current?.parentElement?.getBoundingClientRect().bottom ?? 0
              const top = row.getBoundingClientRect().top
              if (top < stageBottom + 14)
                window.scrollBy({ top: top - stageBottom - 14, behavior: 'instant' })
            })
          }}
        >
          <div className="bench-controls-title">
            <h2 id="bench-controls-title">Follow your curiosity.</h2>
            <p>There’s no right setting.</p>
          </div>
          <label className="bench-form-select">
            Form
            <select
              aria-label="Form"
              value={config.shape}
              onChange={(event) => update({ shape: event.target.value as BenchConfig['shape'] })}
            >
              <option value="bloom">Bloom</option>
              <option value="orbit">Orbit</option>
              <option value="portal">Portal</option>
            </select>
          </label>
          {sliders.map((item) => (
            <div className="bench-range" key={item.key}>
              <label htmlFor={`bench-${item.key}`}>
                {item.label}
                <span>
                  {config[item.key]}
                  {item.unit === 'fold' ? '-fold' : item.unit}
                </span>
              </label>
              <input
                id={`bench-${item.key}`}
                type="range"
                min={item.min}
                max={item.max}
                step="1"
                value={config[item.key]}
                onChange={(event) => update({ [item.key]: Number(event.target.value) })}
                aria-valuetext={`${config[item.key]} ${item.unit}`}
              />
            </div>
          ))}
          <fieldset className="bench-palettes">
            <legend>Color mood</legend>
            <div>
              {(Object.entries(PALETTES) as [BenchPalette, (typeof PALETTES)[BenchPalette]][]).map(
                ([id, item]) => (
                  <button
                    type="button"
                    key={id}
                    aria-pressed={config.palette === id}
                    onClick={() => update({ palette: id })}
                  >
                    <i style={{ background: item.line }} aria-hidden="true" />
                    {item.label}
                  </button>
                )
              )}
            </div>
          </fieldset>
          <div className="bench-change-actions">
            <button
              type="button"
              onClick={() => {
                setConfig((value) => makeVariation(value))
                setCopied(false)
                setShareUrl('')
                setMessage('A new variation. Keep pulling at the thread.')
              }}
            >
              <Shuffle size={16} />
              Surprise me
            </button>
            <button
              type="button"
              onClick={() => {
                selectPreset(DEFAULT_CONFIG)
                setPaused(false)
              }}
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </section>
      </div>
      <div className="bench-toolbar">
        <div>
          <strong>Made something you like?</strong>
          <p>Keep a print, capture this view or pass the recipe along.</p>
        </div>
        <div className="bench-save-actions">
          <button type="button" onClick={savePoster}>
            <Download size={17} />
            Save SVG print
          </button>
          <button type="button" onClick={saveView} disabled={!ready || failed}>
            <Download size={17} />
            Save PNG view
          </button>
          <button type="button" onClick={copyRecipe}>
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? 'Link copied' : 'Copy recipe link'}
          </button>
        </div>
      </div>
      <p className="bench-status" role="status" aria-live="polite">
        {message}
      </p>
      {shareUrl && (
        <label className="bench-share-fallback">
          Recipe link
          <input readOnly value={shareUrl} onFocus={(event) => event.currentTarget.select()} />
        </label>
      )}
      <noscript>
        <style>
          {
            '.bench-controls,.bench-presets,.bench-toolbar,.bench-stage-actions,.bench-stage-note{display:none}.bench-workspace{grid-template-columns:minmax(0,1fr)}'
          }
        </style>
        <p className="bench-nojs">
          This is the still edition. Enable JavaScript to shape the sculpture, or{' '}
          <a href="/portfolio/geometry-bench-poster.svg" download>
            save the original print
          </a>
          .
        </p>
      </noscript>
    </div>
  )
}
