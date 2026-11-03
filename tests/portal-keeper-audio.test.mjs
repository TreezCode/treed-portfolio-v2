import assert from 'node:assert/strict'
import { test } from 'node:test'
import { KeeperAudio } from '../src/components/portal-keeper/keeper-audio.ts'

// Deterministic browser boundaries: the tests control interruption and unresolved
// resume promises instead of depending on the host machine's audio device.
class FakeContext {
  constructor(state = 'running', resumeMode = 'immediate') {
    this.state = state
    this.resumeMode = resumeMode
    this.currentTime = 5
    this.destination = {}
    this.resumes = []
    this.oscillators = []
    this.gains = []
    this.closeCalls = 0
  }

  resume() {
    let resolve
    let reject
    const promise = new Promise((yes, no) => {
      resolve = yes
      reject = no
    })
    this.resumes.push({ resolve, reject })
    if (this.resumeMode === 'immediate') {
      this.state = 'running'
      resolve()
    } else if (this.resumeMode === 'reject') {
      reject(new Error('Audio device is unavailable'))
    }
    return promise
  }

  resolveResume(index, state = 'running') {
    this.state = state
    this.resumes[index].resolve()
  }

  close() {
    this.closeCalls += 1
    this.state = 'closed'
    return Promise.resolve()
  }

  createOscillator() {
    const oscillator = {
      frequency: { value: 0 },
      starts: [],
      stops: [],
      disconnected: false,
      onended: null,
      connect() {},
      disconnect() {
        this.disconnected = true
      },
      start(time) {
        this.starts.push(time)
      },
      stop(time) {
        this.stops.push(time)
      },
    }
    this.oscillators.push(oscillator)
    return oscillator
  }

  createGain() {
    const gain = {
      gain: {
        setValueAtTime() {},
        linearRampToValueAtTime() {},
        exponentialRampToValueAtTime() {},
      },
      disconnected: false,
      connect() {},
      disconnect() {
        this.disconnected = true
      },
    }
    this.gains.push(gain)
    return gain
  }
}

function setup(contextFactory = () => new FakeContext()) {
  const contexts = []
  const state = { visible: true, failures: 0 }
  const audio = new KeeperAudio({
    createContext: () => {
      const context = contextFactory(contexts.length)
      contexts.push(context)
      return context
    },
    isVisible: () => state.visible,
    onUnavailable: () => {
      state.failures += 1
    },
  })
  return { audio, contexts, state }
}

const flush = async () => {
  await Promise.resolve()
  await Promise.resolve()
}

test('audio is lazy, opt-in and releases both nodes and device when muted', () => {
  const { audio, contexts, state } = setup()
  audio.play('move')
  assert.equal(contexts.length, 0)

  audio.setEnabled(true)
  const context = contexts[0]
  assert.equal(context.oscillators.length, 1)
  assert.equal(context.oscillators[0].starts.length, 1)
  assert.equal(state.failures, 0)

  audio.setEnabled(false)
  assert.equal(context.closeCalls, 1)
  assert.equal(context.state, 'closed')
  assert.equal(context.oscillators[0].onended, null)
  assert.equal(context.oscillators[0].stops.length, 2)
  assert.ok(context.oscillators[0].disconnected)
  assert.ok(context.gains[0].disconnected)
  audio.play('enter')
  assert.equal(contexts.length, 1)
  assert.equal(context.oscillators.length, 1)
})

test('the next explicit action resumes suspended or interrupted sound immediately', async (t) => {
  for (const interruptedState of ['suspended', 'interrupted']) {
    await t.test(interruptedState, async () => {
      const { audio, contexts } = setup()
      audio.setEnabled(true)
      const context = contexts[0]
      context.state = interruptedState
      audio.play('wake')
      // resume must run in this call stack, before the browser gesture expires.
      assert.equal(context.resumes.length, 1)
      await flush()
      assert.equal(context.state, 'running')
      assert.equal(context.oscillators.length, 5)
      assert.equal(contexts.length, 1)
      audio.dispose()
    })
  }
})

test('muting or disposing while resume is unresolved cancels late sounds and failures', async (t) => {
  for (const action of ['mute', 'dispose']) {
    for (const settlement of ['resolve', 'reject']) {
      await t.test(`${action}, then ${settlement}`, async () => {
        const { audio, contexts, state } = setup(() => new FakeContext('suspended', 'pending'))
        audio.setEnabled(true)
        const context = contexts[0]
        assert.equal(context.resumes.length, 1)
        if (action === 'mute') audio.setEnabled(false)
        else audio.dispose()
        assert.equal(context.closeCalls, 1)

        if (settlement === 'resolve') context.resolveResume(0)
        else context.resumes[0].reject(new Error('Late browser rejection'))
        await flush()
        assert.equal(context.oscillators.length, 0)
        assert.equal(state.failures, 0)
        audio.play('move')
        assert.equal(contexts.length, 1)
      })
    }
  }
})

test('later gestures can recover pending resume and only their current feedback plays', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  const { audio, contexts, state } = setup(() => new FakeContext('suspended', 'pending'))
  audio.setEnabled(true)
  const context = contexts[0]
  audio.play('wake')
  audio.play('enter')
  assert.equal(context.resumes.length, 3)

  context.resolveResume(0)
  context.resumes[1].reject(new Error('Stale attempt rejected'))
  await flush()
  assert.equal(context.oscillators.length, 0)
  assert.equal(state.failures, 0)

  context.resolveResume(2)
  await flush()
  assert.deepEqual(
    context.oscillators.map((node) => node.frequency.value),
    [440, 587.33, 659.25, 880]
  )
  t.mock.timers.tick(3000)
  assert.equal(state.failures, 0)
  assert.equal(context.closeCalls, 0)
  audio.dispose()
})

test('a device context closed by the browser is replaced on the next explicit action', () => {
  const { audio, contexts, state } = setup()
  audio.setEnabled(true)
  contexts[0].state = 'closed'
  audio.play('move')
  assert.equal(contexts.length, 2)
  assert.equal(contexts[1].oscillators.length, 1)
  assert.equal(state.failures, 0)
  audio.dispose()
})

test('hiding drops active and queued notes; returning stays quiet until a fresh action', async () => {
  const { audio, contexts, state } = setup(() => new FakeContext())
  audio.setEnabled(true)
  const first = contexts[0]
  first.state = 'interrupted'
  first.resumeMode = 'pending'
  audio.play('wake')
  state.visible = false
  audio.quiet()
  assert.equal(first.closeCalls, 1)
  assert.equal(first.oscillators[0].onended, null)
  assert.ok(first.oscillators[0].disconnected)
  first.resolveResume(0)
  await flush()
  assert.equal(first.oscillators.length, 1)
  audio.play('enter')
  assert.equal(contexts.length, 1)

  state.visible = true
  await flush()
  assert.equal(contexts.length, 1)
  audio.play('move')
  assert.equal(contexts.length, 2)
  assert.equal(contexts[1].oscillators.length, 1)
  assert.equal(state.failures, 0)
  audio.dispose()
})

test('rejected resumes release the failed device and allow explicit retry', async () => {
  const { audio, contexts, state } = setup((index) =>
    index === 0 ? new FakeContext('suspended', 'reject') : new FakeContext()
  )
  audio.setEnabled(true)
  await flush()
  assert.equal(state.failures, 1)
  assert.equal(contexts[0].closeCalls, 1)
  assert.equal(contexts[0].oscillators.length, 0)
  audio.play('move')
  assert.equal(contexts.length, 1)
  audio.setEnabled(true)
  assert.equal(contexts.length, 2)
  assert.equal(contexts[1].oscillators.length, 1)
  audio.dispose()
})

test('a never-settled resume times out, releases its device and leaves retry usable', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  const { audio, contexts, state } = setup((index) =>
    index === 0 ? new FakeContext('suspended', 'pending') : new FakeContext()
  )
  audio.setEnabled(true)
  assert.equal(state.failures, 0)
  t.mock.timers.tick(3000)
  assert.equal(state.failures, 1)
  assert.equal(contexts[0].closeCalls, 1)
  audio.setEnabled(true)
  assert.equal(contexts.length, 2)
  assert.equal(contexts[1].oscillators.length, 1)
  contexts[0].resolveResume(0)
  await flush()
  assert.equal(contexts[0].oscillators.length, 0)
  assert.equal(state.failures, 1)
  audio.dispose()
})

test('ended notes clean their nodes and are not stopped again during later disposal', () => {
  const { audio, contexts } = setup()
  audio.setEnabled(true)
  const {
    oscillators: [oscillator],
    gains: [gain],
  } = contexts[0]
  oscillator.onended()
  assert.ok(oscillator.disconnected)
  assert.ok(gain.disconnected)
  assert.equal(oscillator.stops.length, 1)
  audio.dispose()
  assert.equal(oscillator.stops.length, 1)
})
