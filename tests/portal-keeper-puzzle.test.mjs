import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  INITIAL_STATE,
  POSITIONS,
  WORLD_BOUNDS,
  applyMove,
  describeState,
  getHint,
  isValidState,
  parseSavedState,
  serializeState,
  traceLight,
} from '../src/components/portal-keeper/puzzle.ts'

const solved = { ...INITIAL_STATE, mirrorA: 6, mirrorB: 6, lensPlaced: true, lensStep: 3 }

test('all mirror positions produce finite bounded paths and one receiver route', () => {
  const receiverRoutes = []
  for (let mirrorA = 0; mirrorA < 8; mirrorA++) {
    for (let mirrorB = 0; mirrorB < 8; mirrorB++) {
      const trace = traceLight({ ...solved, mirrorA, mirrorB })
      assert.ok(trace.segments.length >= 1 && trace.segments.length <= 9)
      assert.deepEqual(trace.segments[0].from, POSITIONS.source)
      for (const segment of trace.segments) {
        for (const [x, z] of [segment.from, segment.to]) {
          assert.ok(Number.isFinite(x) && Number.isFinite(z))
          assert.ok(x >= WORLD_BOUNDS.minX - 1e-8 && x <= WORLD_BOUNDS.maxX + 1e-8)
          assert.ok(z >= WORLD_BOUNDS.minZ - 1e-8 && z <= WORLD_BOUNDS.maxZ + 1e-8)
        }
      }
      if (trace.receiverLit) receiverRoutes.push([mirrorA, mirrorB])
    }
  }
  assert.deepEqual(receiverRoutes, [[6, 6]])
  const solutionTrace = traceLight(solved)
  assert.deepEqual(solutionTrace.hits, ['mirrorA', 'mirrorB', 'lens'])
  assert.equal(solutionTrace.solved, true)
})

test('the physical path observes equal incidence and reflection at each mirror', () => {
  for (let mirrorA = 1; mirrorA < 8; mirrorA++) {
    const trace = traceLight({ ...INITIAL_STATE, mirrorA })
    const [incoming, outgoing] = trace.segments
    assert.ok(incoming && outgoing)
    const dx = outgoing.to[0] - outgoing.from[0]
    const dz = outgoing.to[1] - outgoing.from[1]
    const magnitude = Math.hypot(dx, dz)
    const angle = (mirrorA * Math.PI) / 8
    assert.ok(Math.abs(dx / magnitude - Math.cos(2 * angle)) < 1e-8)
    assert.ok(Math.abs(dz / magnitude - Math.sin(2 * angle)) < 1e-8)
  }
})

test('the lens must be installed with its unique notch orientation', () => {
  assert.equal(traceLight({ ...solved, lensPlaced: false }).solved, false)
  for (let lensStep = 0; lensStep < 4; lensStep++) {
    assert.equal(traceLight({ ...solved, lensStep }).solved, lensStep === 3)
  }
})

test('moves wrap without mutating prior snapshots, and entry needs a solution', () => {
  const before = { ...INITIAL_STATE, mirrorA: 0 }
  const after = applyMove(before, { type: 'rotate', target: 'mirrorA', delta: -1 })
  assert.equal(before.mirrorA, 0)
  assert.equal(after.mirrorA, 7)
  assert.equal(applyMove(after, { type: 'rotate', target: 'mirrorA', delta: 1 }).mirrorA, 0)
  assert.equal(applyMove(before, { type: 'rotate', target: 'lens', delta: 1 }), before)
  assert.equal(applyMove(before, { type: 'enter' }), before)
  const placed = applyMove(before, { type: 'place-lens' })
  assert.equal(placed.lensPlaced, true)
  assert.equal(applyMove(placed, { type: 'rotate', target: 'lens', delta: -1 }).lensStep, 3)
  const entered = applyMove(solved, { type: 'enter' })
  assert.equal(entered.entered, true)
  assert.equal(applyMove(entered, { type: 'rotate', target: 'mirrorB', delta: 1 }), entered)
})

test('versioned progress preserves valid states and rejects corrupt or contradictory saves', () => {
  for (const state of [INITIAL_STATE, solved, { ...solved, entered: true }]) {
    assert.deepEqual(parseSavedState(serializeState(state)), state)
  }
  for (const invalid of [
    null,
    undefined,
    '',
    '{',
    '[]',
    JSON.stringify({ version: 2, state: INITIAL_STATE }),
    JSON.stringify({ version: 1, state: { ...INITIAL_STATE, mirrorA: -1 } }),
    JSON.stringify({ version: 1, state: { ...INITIAL_STATE, mirrorB: 8 } }),
    JSON.stringify({ version: 1, state: { ...INITIAL_STATE, mirrorA: 1.5 } }),
    JSON.stringify({ version: 1, state: { ...INITIAL_STATE, lensStep: 4 } }),
    JSON.stringify({ version: 1, state: { ...INITIAL_STATE, entered: true } }),
    JSON.stringify({ version: 1, state: { ...INITIAL_STATE, lensPlaced: 'true' } }),
  ]) assert.equal(parseSavedState(invalid), null)
  assert.equal(isValidState({ ...solved, mirrorA: NaN }), false)
  assert.throws(() => serializeState({ ...INITIAL_STATE, entered: true }))
})

test('feedback follows the current light and hints provide a correct next move', () => {
  assert.match(describeState(INITIAL_STATE), /misses the second mirror/)
  const firstAligned = { ...INITIAL_STATE, mirrorA: 6 }
  assert.match(describeState(firstAligned), /misses the receiver/)
  assert.match(describeState({ ...solved, lensPlaced: false }), /Place the patterned lens/)
  assert.match(describeState(solved), /ready to enter/)
  assert.match(getHint(INITIAL_STATE, 3), /first mirror right 4 stops/)
  assert.match(getHint(firstAligned, 3), /second mirror left 2 stops/)
  assert.match(getHint({ ...solved, lensStep: 0 }, 3), /lens left 1 stop/)
  assert.match(getHint(solved, 3), /Enter the portal/)
})
