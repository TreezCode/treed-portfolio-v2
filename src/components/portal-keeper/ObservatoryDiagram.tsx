import { POSITIONS, traceLight, type Mechanism, type PuzzleState } from './puzzle'

const map = ([x, z]: readonly number[]) => [250 + x * 44, 195 + z * 43]
export function ObservatoryDiagram({
  state,
  selected,
  onSelect,
}: {
  state: PuzzleState
  selected: Mechanism
  onSelect: (value: Mechanism) => void
}) {
  const light = traceLight(state)
  const [rx, ry] = map(POSITIONS.receiver)
  const [lx, ly] = map(POSITIONS.lens)
  const [sx, sy] = map(POSITIONS.source)
  if (state.entered)
    return (
      <svg
        className="keeper-diagram keeper-garden-diagram"
        viewBox="0 0 500 360"
        aria-hidden="true"
      >
        <circle cx="250" cy="160" r="109" fill="none" stroke="#667755" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx="250"
            cy="130"
            rx="31"
            ry="72"
            fill="none"
            stroke="#d5ed9b"
            transform={`rotate(${angle} 250 160)`}
          />
        ))}
        <circle cx="250" cy="160" r="16" fill="#d5ed9b" />
        <text x="250" y="320" textAnchor="middle" fill="#f4f1e7" fontSize="13">
          A sleeping world, awake again.
        </text>
      </svg>
    )
  return (
    <svg className="keeper-diagram" viewBox="0 0 500 360" aria-hidden="true">
      <rect x="28" y="24" width="444" height="308" rx="130" fill="#202923" stroke="#57624c" />
      <circle cx="250" cy="185" r="132" fill="none" stroke="#384536" />
      <circle cx="250" cy="185" r="117" fill="none" stroke="#384536" />
      <path
        d={`M${rx - 30} ${ry - 25}v-40a30 30 0 0 1 60 0v40`}
        fill={light.solved ? '#466954' : '#121d18'}
        stroke={light.solved ? '#d5ed9b' : '#8b7957'}
        strokeWidth="5"
      />
      <text x={rx} y={ry - 34} textAnchor="middle" fill="#e5ddbd" fontSize="10">
        PORTAL
      </text>
      {light.segments.map((segment, i) => {
        const [x1, y1] = map(segment.from),
          [x2, y2] = map(segment.to)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e8eeae" strokeWidth="3" />
      })}
      <circle cx={sx} cy={sy} r="13" fill="#d5ed9b" />
      <text x={sx} y={sy + 32} fill="#c4cdbb" textAnchor="middle" fontSize="11">
        Lantern
      </text>
      {(['mirrorA', 'mirrorB'] as const).map((id) => {
        const [x, y] = map(POSITIONS[id])
        const angle = state[id] * 22.5
        return (
          <g key={id} onClick={() => onSelect(id)} style={{ cursor: 'pointer' }}>
            <circle
              cx={x}
              cy={y}
              r="28"
              fill="#28382c"
              stroke={selected === id ? '#d5ed9b' : '#6b7960'}
              strokeWidth="2"
            />
            <line
              x1={x - 25}
              y1={y}
              x2={x + 25}
              y2={y}
              transform={`rotate(${angle} ${x} ${y})`}
              stroke="#e6d9b0"
              strokeWidth="5"
            />
            <text x={x + 34} y={y + 5} fill="#f4f1e7" fontSize="14">
              {id === 'mirrorA' ? 'A' : 'B'}
            </text>
          </g>
        )
      })}
      <g onClick={() => onSelect('lens')} style={{ cursor: 'pointer' }}>
        <circle
          cx={lx}
          cy={ly}
          r="24"
          fill="#26382f"
          stroke={selected === 'lens' ? '#d5ed9b' : '#8b7957'}
          strokeWidth="2"
          strokeDasharray={state.lensPlaced ? undefined : '4 4'}
        />
        {state.lensPlaced && (
          <path
            d={`M${lx} ${ly - 24}v10M${lx - 8} ${ly}h16M${lx} ${ly - 8}v16`}
            transform={`rotate(${state.lensStep * 90} ${lx} ${ly})`}
            stroke="#f4f1e7"
            fill="none"
            strokeWidth="3"
          />
        )}
        <text x={lx} y={ly + 41} textAnchor="middle" fill="#c4cdbb" fontSize="11">
          Lens
        </text>
      </g>
      <circle
        cx={rx}
        cy={ry}
        r="16"
        fill={light.receiverLit ? '#778c50' : '#26372c'}
        stroke="#d5ed9b"
        strokeWidth="2"
      />
      <path
        d={`M${rx - 16} ${ry}h8M${rx - 5} ${ry}h10M${rx} ${ry - 5}v10`}
        stroke="#f4f1e7"
        strokeWidth="2"
      />
      <text x={rx} y={ry + 39} textAnchor="middle" fill="#c4cdbb" fontSize="11">
        Receiver · notch left
      </text>
    </svg>
  )
}
