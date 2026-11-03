'use client'

import { useState } from 'react'
import { ObservatoryDiagram } from './ObservatoryDiagram'
import { INITIAL_STATE, describeState, traceLight, type PuzzleState } from './puzzle'

const stages: { label: string; state: PuzzleState; title: string; explanation: string }[] = [
  {
    label: 'Misaligned',
    state: { ...INITIAL_STATE },
    title: 'A reflection with somewhere else to go.',
    explanation:
      'The first mirror catches the light, but its angle sends the reflection away from the second. The beam makes that consequence visible.',
  },
  {
    label: 'Routed',
    state: { ...INITIAL_STATE, mirrorA: 6, mirrorB: 6 },
    title: 'The path reaches its receiver.',
    explanation:
      'With both mirrors aligned, the same ray calculation carries light across the room. The receiver has light, but the lens still needs to supply a matching pattern.',
  },
  {
    label: 'Awake',
    state: { ...INITIAL_STATE, mirrorA: 6, mirrorB: 6, lensPlaced: true, lensStep: 3 },
    title: 'Light and pattern agree.',
    explanation:
      'The installed lens faces the receiver’s notch. That combination opens the portal and triggers the room’s awakening. The renderer presents the result of the puzzle state.',
  },
]
const ignoreSelection = () => {}

export default function LightPathDemo() {
  const [stageIndex, setStageIndex] = useState(0)
  const stage = stages[stageIndex]
  const light = traceLight(stage.state)
  return (
    <div className="keeper-path-demo" data-path-stage={stage.label.toLowerCase()}>
      <div className="keeper-path-diagram" role="img" aria-label={describeState(stage.state)}>
        <ObservatoryDiagram state={stage.state} selected="lens" onSelect={ignoreSelection} />
      </div>
      <div className="keeper-path-explanation">
        <div className="keeper-path-controls" role="group" aria-label="Inspect the light path">
          {stages.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={stageIndex === index}
              onClick={() => setStageIndex(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          className="keeper-path-description"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <h3>{stage.title}</h3>
          <p>{stage.explanation}</p>
          <dl className="keeper-path-facts">
            <div>
              <dt>Receiver</dt>
              <dd>{light.receiverLit ? 'Lit' : 'Waiting'}</dd>
            </div>
            <div>
              <dt>Pattern</dt>
              <dd>
                {light.solved
                  ? 'Matched'
                  : stage.state.lensPlaced
                    ? 'Unaligned'
                    : 'Lens not placed'}
              </dd>
            </div>
            <div>
              <dt>Portal</dt>
              <dd>{light.solved ? 'Awake' : 'Sleeping'}</dd>
            </div>
          </dl>
        </div>
        <p className="keeper-path-caption">
          A live diagram using the game’s puzzle model. This example has its own state and leaves
          your saved game alone.
        </p>
        <noscript>
          <style>{'.keeper-path-controls{display:none}'}</style>
          <p className="keeper-path-caption">
            The diagram shows the initial light path. Enable JavaScript to inspect the other stages.
          </p>
        </noscript>
      </div>
    </div>
  )
}
