'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  OrthographicCamera,
} from 'three'
import { PALETTES, type BenchConfig } from './bench-config'
import { buildBenchGeometry } from './geometry-shapes'

export type GeometryCanvasProps = {
  config: BenchConfig
  paused: boolean
  reducedMotion: boolean
  yaw: number
  viewReset: number
  onReady?: () => void
  onFailure?: () => void
  onCaptureReady?: (capture: (() => string | null) | null) => void
}

const nodeVertex = `
  uniform float uPixelRatio;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = 16.0 * uPixelRatio;
  }
`

const nodeFragment = `
  uniform vec3 uColor;
  void main() {
    float radius = length(gl_PointCoord - 0.5) * 2.0;
    if (radius > 1.0) discard;
    float halo = pow(1.0 - radius, 3.0) * 0.45;
    float core = 1.0 - smoothstep(0.08, 0.27, radius);
    gl_FragColor = vec4(uColor, clamp(halo + core, 0.0, 1.0));
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

function makeGeometry(positions: Float32Array) {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.computeBoundingSphere()
  return geometry
}

function Sculpture({
  config,
  paused,
  reducedMotion,
  yaw,
  viewReset,
  onReady,
  onFailure,
  onCaptureReady,
}: GeometryCanvasProps) {
  const group = useRef<Group>(null)
  const phase = useRef(0)
  const ready = useRef(false)
  const readyFrame = useRef(0)
  const { gl, camera, scene, size, invalidate, viewport } = useThree()
  const palette = PALETTES[config.palette]
  const active = !paused && !reducedMotion && config.speed > 0
  const geometry = useMemo(() => {
    const data = buildBenchGeometry(config)
    return {
      primary: makeGeometry(data.primary),
      secondary: makeGeometry(data.secondary),
      surfaces: makeGeometry(data.surfaces),
      nodes: makeGeometry(data.nodes),
    }
    // Palette and speed change materials/motion without reallocating vertex buffers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.shape, config.symmetry, config.layers, config.spread, config.twist, config.seed])
  const uniforms = useMemo(
    () => ({
      uColor: { value: new Color(palette.node) },
      uPixelRatio: { value: viewport.dpr },
    }),
    [palette.node, viewport.dpr]
  )

  useEffect(
    () => () => {
      for (const item of Object.values(geometry)) item.dispose()
    },
    [geometry]
  )

  useEffect(() => () => cancelAnimationFrame(readyFrame.current), [])

  useLayoutEffect(() => {
    if (camera instanceof OrthographicCamera) {
      camera.zoom = Math.min(size.width, size.height) / 4.3
      camera.updateProjectionMatrix()
      invalidate()
    }
  }, [camera, size.width, size.height, invalidate])

  useEffect(() => {
    const canvas = gl.domElement
    const lost = (event: Event) => {
      event.preventDefault()
      onCaptureReady?.(null)
      onFailure?.()
    }
    canvas.addEventListener('webglcontextlost', lost)
    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.touchAction = 'pan-y'
    const capture = () => {
      if (gl.getContext().isContextLost()) return null
      // Export synchronously after a render, before the drawing buffer is discarded.
      gl.render(scene, camera)
      try {
        return canvas.toDataURL('image/png')
      } catch {
        return null
      }
    }
    onCaptureReady?.(capture)
    return () => {
      canvas.removeEventListener('webglcontextlost', lost)
      onCaptureReady?.(null)
    }
  }, [gl, scene, camera, onFailure, onCaptureReady])

  useEffect(() => {
    invalidate()
  }, [active, config, yaw, invalidate])

  useLayoutEffect(() => {
    // Reset is an explicit action, so pressing it again works even when yaw is already zero.
    // Shape controls and pause/resume leave accumulated motion alone.
    phase.current = 0
    invalidate()
  }, [viewReset, invalidate])

  useFrame((_, delta) => {
    if (active) phase.current += Math.min(delta, 0.05) * (0.02 + config.speed * 0.0024)
    if (group.current) {
      // Single ownership of the sculpture pose: explicit view + accumulated active time.
      group.current.rotation.set(
        Math.sin(phase.current * 0.65) * 0.12,
        yaw + Math.sin(phase.current * 0.47) * 0.18,
        phase.current * 0.35
      )
    }
    if (!ready.current) {
      ready.current = true
      readyFrame.current = requestAnimationFrame(() => onReady?.())
    }
    if (active) invalidate()
  })

  return (
    <>
      <color attach="background" args={[palette.bg]} />
      <group ref={group}>
        <mesh geometry={geometry.surfaces} renderOrder={0}>
          <meshBasicMaterial
            color={palette.secondary}
            side={DoubleSide}
            transparent
            opacity={0.045}
            depthWrite={false}
          />
        </mesh>
        <lineSegments geometry={geometry.secondary} renderOrder={1}>
          <lineBasicMaterial
            color={palette.secondary}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </lineSegments>
        <lineSegments geometry={geometry.primary} renderOrder={2}>
          <lineBasicMaterial color={palette.line} transparent opacity={0.88} depthWrite={false} />
        </lineSegments>
        <points geometry={geometry.nodes} renderOrder={3}>
          <shaderMaterial
            vertexShader={nodeVertex}
            fragmentShader={nodeFragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </points>
      </group>
    </>
  )
}

/** The surrounding DOM owns accessible controls, drag behavior and the non-WebGL poster. */
export default function GeometryCanvas(props: GeometryCanvasProps) {
  const [supported, setSupported] = useState(false)
  const { onFailure } = props

  useEffect(() => {
    // Fiber 9 creates its renderer in an async effect. A rejected WebGL setup
    // does not reach a React error boundary, so check before mounting Canvas.
    const frame = requestAnimationFrame(() => {
      const probe = document.createElement('canvas')
      probe.width = probe.height = 1
      try {
        const context = probe.getContext('webgl2', {
          antialias: true,
          alpha: false,
          powerPreference: 'low-power',
          preserveDrawingBuffer: false,
        })
        if (!context) {
          onFailure?.()
          return
        }
        context.getExtension('WEBGL_lose_context')?.loseContext()
        setSupported(true)
      } catch {
        onFailure?.()
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [onFailure])

  if (!supported) return null

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 7], near: 0.1, far: 30, zoom: 100 }}
      dpr={[1, 1.6]}
      frameloop="demand"
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'low-power',
        preserveDrawingBuffer: false,
      }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Sculpture {...props} />
    </Canvas>
  )
}
