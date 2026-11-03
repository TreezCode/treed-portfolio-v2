'use client'

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Canvas, type ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, RenderTexture } from '@react-three/drei'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  Path,
  Quaternion,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three'
import { type Mechanism, type PuzzleState, traceLight } from './puzzle'

export type ObservatoryCanvasProps = {
  state: PuzzleState
  selected: Mechanism
  onSelect: (mechanism: Mechanism) => void
  active: boolean
  reducedMotion: boolean
  onFailure: () => void
}

type Point3 = [number, number, number]
const BRASS = '#ac8f5e'
const GOLD = '#d7be7d'
const LIGHT = '#e7f5a8'
const BEAM_HEIGHT = 1.12
const Y_AXIS = new Vector3(0, 1, 0)
const MotionContext = createContext(false)

function refreshShadows(renderer: WebGLRenderer) {
  renderer.shadowMap.needsUpdate = true
}

function DialTicks({
  radius,
  count,
  length,
  y,
}: {
  radius: number
  count: number
  length: number
  y: number
}) {
  const geometry = useMemo(() => {
    const result = new BufferGeometry()
    const vertices: number[] = []
    const colors: number[] = []
    const major = new Color('#a08d60')
    const minor = new Color('#62765e')
    for (let index = 0; index < count; index++) {
      const angle = (index * Math.PI * 2) / count
      const tick = index % 4 === 0 ? length : length * 0.45
      const color = index % 4 === 0 ? major : minor
      vertices.push(
        Math.cos(angle) * (radius - tick),
        y,
        Math.sin(angle) * (radius - tick),
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      )
      colors.push(color.r, color.g, color.b, color.r, color.g, color.b)
    }
    result.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3))
    result.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3))
    return result
  }, [radius, count, length, y])
  useEffect(() => () => geometry.dispose(), [geometry])
  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial vertexColors />
    </lineSegments>
  )
}

function frameCamera(camera: OrthographicCamera, width: number, height: number, entered: boolean) {
  if (entered) camera.position.set(7, 5.7, 9)
  else camera.position.set(8.5, 11, 14)
  camera.lookAt(0, entered ? 0.9 : 0.6, 0)
  camera.zoom = entered ? Math.min(width / 8.4, height / 7.2) : Math.min(width / 12, height / 9.5)
  camera.updateProjectionMatrix()
}

/** The same segment endpoints used by the puzzle model become physical beams. */
function Rod({
  from,
  to,
  radius = 0.025,
  color = BRASS,
  luminous = false,
}: {
  from: Point3
  to: Point3
  radius?: number
  color?: string
  luminous?: boolean
}) {
  const pose = useMemo(() => {
    const a = new Vector3(...from)
    const b = new Vector3(...to)
    return {
      position: a.clone().add(b).multiplyScalar(0.5),
      quaternion: new Quaternion().setFromUnitVectors(Y_AXIS, b.clone().sub(a).normalize()),
      length: a.distanceTo(b),
    }
  }, [from, to])
  return (
    <group position={pose.position} quaternion={pose.quaternion}>
      <mesh>
        <cylinderGeometry args={[radius, radius, pose.length, 8]} />
        {luminous ? (
          <meshBasicMaterial color={color} toneMapped={false} />
        ) : (
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.35} />
        )}
      </mesh>
      {luminous && (
        <mesh>
          <cylinderGeometry args={[radius * 5, radius * 5, pose.length, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.075}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}

function Ring({
  radius,
  thickness = 0.015,
  color = BRASS,
  position = [0, 0.01, 0],
  arc = Math.PI * 2,
  rotation = [-Math.PI / 2, 0, 0],
  luminous = false,
}: {
  radius: number
  thickness?: number
  color?: string
  position?: Point3
  arc?: number
  rotation?: Point3
  luminous?: boolean
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <torusGeometry args={[radius, thickness, 6, 80, arc]} />
      {luminous ? (
        <meshBasicMaterial color={color} toneMapped={false} />
      ) : (
        <meshStandardMaterial color={color} roughness={0.38} metalness={0.65} />
      )}
    </mesh>
  )
}

function Pedestal({ selected = false }: { selected?: boolean }) {
  return (
    <>
      <mesh position={[0, 0.12, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.6, 0.66, 0.24, 32]} />
        <meshStandardMaterial color="#293b35" roughness={0.6} metalness={0.35} />
      </mesh>
      <Ring
        radius={0.59}
        position={[0, 0.25, 0]}
        color={selected ? LIGHT : BRASS}
        luminous={selected}
      />
      <Ring radius={0.45} position={[0, 0.255, 0]} thickness={0.008} color="#5b6650" />
      <DialTicks radius={0.55} count={16} length={0.065} y={0.26} />
      <mesh position={[0, 0.48, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.1, 0.5, 12]} />
        <meshStandardMaterial color={BRASS} roughness={0.35} metalness={0.8} />
      </mesh>
    </>
  )
}

/** Small camera-facing instrument labels use a local canvas, never a font request. */
function InstrumentMarker({ label, selected }: { label: 'A' | 'B'; selected: boolean }) {
  const narrow = useThree((state) => state.size.width < 600)
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 128
    const context = canvas.getContext('2d')!
    context.fillStyle = selected ? '#d5ed9b' : '#172a24'
    context.beginPath()
    context.arc(64, 64, 56, 0, Math.PI * 2)
    context.fill()
    context.strokeStyle = '#d5ed9b'
    context.lineWidth = 4
    context.stroke()
    context.fillStyle = selected ? '#172a24' : '#f4f1e7'
    context.font = '600 68px Arial, sans-serif'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(label, 64, 68)
    const result = new CanvasTexture(canvas)
    result.colorSpace = SRGBColorSpace
    return result
  }, [label, selected])
  useEffect(() => () => texture.dispose(), [texture])
  return (
    <sprite position={[0, 1.98, 0]} scale={narrow ? 0.8 : 0.57} renderOrder={15}>
      <spriteMaterial
        map={texture}
        transparent
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </sprite>
  )
}

function Mirror({
  name,
  position,
  step,
  selected,
  onSelect,
}: {
  name: 'mirrorA' | 'mirrorB'
  position: Point3
  step: number
  selected: boolean
  onSelect: ObservatoryCanvasProps['onSelect']
}) {
  const choose = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onSelect(name)
  }
  return (
    <group position={position} onClick={choose}>
      <Pedestal selected={selected} />
      <InstrumentMarker label={name === 'mirrorA' ? 'A' : 'B'} selected={selected} />
      <group position={[0, BEAM_HEIGHT, 0]} rotation={[0, -(step * Math.PI) / 8, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.34, 0.88, 0.1]} />
          <meshStandardMaterial color={BRASS} metalness={0.8} roughness={0.32} />
        </mesh>
        <mesh position={[0, 0, 0.057]}>
          <planeGeometry args={[1.19, 0.73]} />
          <meshStandardMaterial color="#b9d2c4" metalness={0.75} roughness={0.16} />
        </mesh>
        <mesh position={[0, 0, -0.057]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.19, 0.73]} />
          <meshStandardMaterial color="#8eb9af" metalness={0.75} roughness={0.16} />
        </mesh>
        <Rod from={[-0.72, -0.54, 0]} to={[-0.72, 0.53, 0]} radius={0.025} />
        <Rod from={[0.72, -0.54, 0]} to={[0.72, 0.53, 0]} radius={0.025} />
        <mesh position={[0.76, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 16]} />
          <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
      <mesh position={[0, 0.98, 0]}>
        <sphereGeometry args={[0.9, 12, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* One / two brass studs match the DOM's first / second mirror. */}
      {Array.from({ length: name === 'mirrorA' ? 1 : 2 }, (_, index) => (
        <mesh key={index} position={[(index - (name === 'mirrorB' ? 0.5 : 0)) * 0.15, 0.29, 0.37]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={LIGHT} />
        </mesh>
      ))}
    </group>
  )
}

function Source() {
  return (
    <group position={[-3.9, 0, 2]}>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.47, 0.55, 0.36, 8]} />
        <meshStandardMaterial color="#4b5140" roughness={0.6} metalness={0.35} />
      </mesh>
      <Rod from={[0, 0.3, 0]} to={[0, BEAM_HEIGHT, 0]} radius={0.08} />
      <group position={[0, BEAM_HEIGHT, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.31, 0.22, 0.57, 16, 1, true]} />
          <meshStandardMaterial color={BRASS} roughness={0.3} metalness={0.85} side={DoubleSide} />
        </mesh>
        <mesh position={[0, 0.29, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.02, 24]} />
          <meshBasicMaterial color={LIGHT} toneMapped={false} />
        </mesh>
      </group>
      <pointLight
        position={[0.4, BEAM_HEIGHT, 0]}
        color="#e2eab1"
        intensity={2}
        distance={3}
        decay={2}
      />
    </group>
  )
}

function Lens({
  state,
  selected,
  onSelect,
}: Pick<ObservatoryCanvasProps, 'state' | 'onSelect'> & { selected: boolean }) {
  return (
    <group
      position={[0.4, 0, -1.1]}
      onClick={(event) => {
        event.stopPropagation()
        onSelect('lens')
      }}
    >
      <Pedestal selected={selected} />
      <group
        position={state.lensPlaced ? [0, BEAM_HEIGHT, 0] : [0.6, 0.65, 0.65]}
        rotation={[0, Math.PI / 2, state.lensPlaced ? 0 : -0.35]}
      >
        <Ring radius={0.47} thickness={0.045} position={[0, 0, 0]} rotation={[0, 0, 0]} />
        <mesh>
          <circleGeometry args={[0.43, 48]} />
          <meshStandardMaterial
            color="#9bc1b1"
            transparent
            opacity={0.25}
            metalness={0.6}
            roughness={0.15}
            side={DoubleSide}
          />
        </mesh>
        <group rotation={[0, 0, -(state.lensStep * Math.PI) / 2]}>
          <Ring
            radius={0.28}
            thickness={0.016}
            position={[0, 0, 0.015]}
            rotation={[0, 0, 0]}
            arc={Math.PI * 1.65}
            color={LIGHT}
            luminous
          />
          <mesh position={[0, 0.34, 0.025]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.09, 0.09, 0.03]} />
            <meshBasicMaterial color={LIGHT} />
          </mesh>
          <Rod
            from={[0, -0.12, 0.02]}
            to={[0.18, 0.02, 0.02]}
            radius={0.012}
            color={LIGHT}
            luminous
          />
          <Rod
            from={[0.18, 0.02, 0.02]}
            to={[0, 0.15, 0.02]}
            radius={0.012}
            color={LIGHT}
            luminous
          />
        </group>
      </group>
      {!state.lensPlaced && (
        <Ring
          radius={0.45}
          position={[0, BEAM_HEIGHT, 0]}
          rotation={[0, Math.PI / 2, 0]}
          thickness={0.022}
          color="#69715b"
        />
      )}
    </group>
  )
}

function Receiver({ lit, solved }: { lit: boolean; solved: boolean }) {
  return (
    <group position={[2.1, 0, -1.1]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.33, 0.48, 0.7, 6]} />
        <meshStandardMaterial color="#435646" roughness={0.65} />
      </mesh>
      <group position={[0, BEAM_HEIGHT, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.15, 32]} />
          <meshStandardMaterial color={BRASS} roughness={0.35} metalness={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.47, 0.47, 0.12, 32]} />
          <meshStandardMaterial color="#172a28" roughness={0.45} metalness={0.45} />
        </mesh>
        <group position={[0, 0, 0.07]} rotation={[0, 0, (-3 * Math.PI) / 2]}>
          <Ring
            radius={0.3}
            thickness={0.024}
            rotation={[0, 0, 0]}
            position={[0, 0, 0]}
            arc={Math.PI * 1.65}
            color={solved ? LIGHT : lit ? '#dcb681' : '#82907a'}
            luminous
          />
          <mesh position={[0, 0.37, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.1, 0.1, 0.025]} />
            <meshBasicMaterial color={solved ? LIGHT : GOLD} />
          </mesh>
          <Rod
            from={[0, -0.12, 0]}
            to={[0.18, 0.02, 0]}
            radius={0.014}
            color={solved ? LIGHT : GOLD}
            luminous
          />
          <Rod
            from={[0.18, 0.02, 0]}
            to={[0, 0.15, 0]}
            radius={0.014}
            color={solved ? LIGHT : GOLD}
            luminous
          />
        </group>
      </group>
    </group>
  )
}

function Flower({
  position,
  scale = 1,
  open,
  phase = 0,
}: {
  position: Point3
  scale?: number
  open: boolean
  phase?: number
}) {
  const bloom = useRef<Group>(null)
  const moving = useContext(MotionContext)
  const [initialScale] = useState(open ? 1 : 0.35)
  useLayoutEffect(() => {
    if (!moving && bloom.current)
      bloom.current.scale.set(open ? 1 : 0.35, open ? 0.72 : 1.15, open ? 1 : 0.35)
  }, [open, moving])
  useFrame((_, delta) => {
    if (!bloom.current || !moving) return
    const target = open ? 1 : 0.35
    const value = bloom.current.scale.x + (target - bloom.current.scale.x) * Math.min(delta * 4, 1)
    const height =
      bloom.current.scale.y +
      ((open ? 0.72 : 1.15) - bloom.current.scale.y) * Math.min(delta * 4, 1)
    bloom.current.scale.set(value, height, value)
  })
  return (
    <group position={position} scale={scale} rotation={[0, phase, 0]}>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.24, 0.17, 0.26, 6]} />
        <meshStandardMaterial color="#616347" roughness={0.8} />
      </mesh>
      <Rod from={[0, 0.1, 0]} to={[0, 0.9, 0]} radius={0.025} color="#709172" />
      <group position={[0, 0.85, 0]} ref={bloom} scale={initialScale}>
        {Array.from({ length: 5 }, (_, index) => {
          const angle = (index * Math.PI * 2) / 5
          return (
            <group key={index} rotation={[0, angle, 0]}>
              <mesh position={[0.21, 0.15, 0]} rotation={[0, 0, -0.65]} scale={[0.18, 0.43, 0.11]}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                  color={open ? '#d6db97' : '#7a9984'}
                  roughness={0.45}
                  metalness={0.18}
                />
              </mesh>
            </group>
          )
        })}
        <mesh position={[0, 0.09, 0]}>
          <icosahedronGeometry args={[0.12, 0]} />
          <meshBasicMaterial color={open ? '#f3d99c' : '#a6b991'} />
        </mesh>
      </group>
      <mesh position={[0.11, 0.48, 0]} rotation={[0, 0, -0.7]} scale={[0.11, 0.3, 0.045]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#709172" roughness={0.7} />
      </mesh>
    </group>
  )
}

function Stars() {
  const geometry = useMemo(() => {
    const result = new BufferGeometry()
    const positions: number[] = []
    for (let i = 0; i < 54; i++) {
      positions.push(
        Math.sin(i * 23.17) * 7,
        1.5 + (Math.sin(i * 7.93) * 0.5 + 0.5) * 6,
        -4 - (i % 5) * 0.4
      )
    }
    result.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
    return result
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])
  return (
    <points geometry={geometry}>
      <pointsMaterial color="#dfe9bb" size={0.035} sizeAttenuation />
    </points>
  )
}

function Garden({
  active,
  reducedMotion,
  arrival = false,
}: {
  active: boolean
  reducedMotion: boolean
  arrival?: boolean
}) {
  const islands = useRef<Group>(null)
  const phase = useRef(0)
  useFrame((_, delta) => {
    if (active && !reducedMotion) phase.current += Math.min(delta, 0.05)
    if (islands.current) islands.current.position.y = Math.sin(phase.current * 0.45) * 0.08
  })
  return (
    <>
      <color attach="background" args={['#172a32']} />
      <ambientLight intensity={1.5} color="#a7c6b8" />
      <directionalLight position={[3, 6, 5]} intensity={3} color="#f4d5a0" />
      <Stars />
      <mesh position={[-2.2, 3.8, -5]}>
        <sphereGeometry args={[0.95, 40, 24]} />
        <meshBasicMaterial color="#d5dda0" />
      </mesh>
      <Ring
        radius={1.22}
        thickness={0.012}
        position={[-2.2, 3.8, -5]}
        rotation={[0.3, 0.5, 0.2]}
        color="#bfcf93"
        luminous
      />
      <group ref={islands}>
        <mesh position={[0, -0.45, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[1.9, 1.4, 7]} />
          <meshStandardMaterial color="#385c52" flatShading roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[1.9, 1.85, 0.15, 7]} />
          <meshStandardMaterial color="#779477" roughness={0.9} />
        </mesh>
        <Ring radius={1.45} position={[0, 0.34, 0]} thickness={0.025} color={GOLD} />
        <group position={[0, 0.32, 0]}>
          <Flower position={[0, 0, 0]} scale={2} open phase={0.2} />
          <Flower position={[-1.1, 0, 0.35]} scale={0.6} open />
          <Flower position={[0.7, 0, 0.9]} scale={0.75} open phase={1.3} />
          <Flower position={[0.85, 0, -0.8]} scale={0.5} open />
        </group>
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 3.1, side === -1 ? -0.25 : 0.65, -1.2]} scale={0.5}>
            <mesh rotation={[0, 0, Math.PI]}>
              <coneGeometry args={[1.25, 1.2, 5]} />
              <meshStandardMaterial color="#466558" flatShading />
            </mesh>
            <mesh position={[0, 0.6, 0]}>
              <cylinderGeometry args={[1.25, 1.25, 0.14, 5]} />
              <meshStandardMaterial color="#9aa986" />
            </mesh>
            <Flower position={[0, 0.65, 0]} open scale={1.4} />
          </group>
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <mesh
            key={i}
            position={[1.8 + i * 0.29, 0.2 + i * 0.08, -0.15 - i * 0.15]}
            rotation={[0, i * 0.2, 0]}
          >
            <cylinderGeometry args={[0.24, 0.2, 0.14, 6]} />
            <meshStandardMaterial color="#b3bc91" roughness={0.7} />
          </mesh>
        ))}
      </group>
      {arrival && (
        <Keeper
          active={active}
          reducedMotion={reducedMotion}
          awakened
          position={[-1.5, 1.4, 1.3]}
        />
      )}
    </>
  )
}

function portalShape(inset = 0) {
  const shape = new Shape()
  const radius = 0.93 - inset
  shape.moveTo(-radius, 0.18 + inset)
  shape.lineTo(radius, 0.18 + inset)
  shape.lineTo(radius, 2.2)
  shape.absarc(0, 2.2, radius, 0, Math.PI, false)
  shape.lineTo(-radius, 0.18 + inset)
  return shape
}

function Portal({
  solved,
  active,
  reducedMotion,
}: {
  solved: boolean
  active: boolean
  reducedMotion: boolean
}) {
  const frame = useMemo(() => {
    const shape = portalShape(-0.12)
    const inner = portalShape(0.04)
    shape.holes.push(new Path(inner.getPoints(32)))
    return shape
  }, [])
  const surface = useMemo(() => {
    const result = new ShapeGeometry(portalShape(0.06), 40)
    const positions = result.getAttribute('position')
    const uv = result.getAttribute('uv')
    for (let index = 0; index < uv.count; index++) {
      uv.setXY(index, (positions.getX(index) + 0.87) / 1.74, (positions.getY(index) - 0.24) / 2.83)
    }
    uv.needsUpdate = true
    return result
  }, [])
  useEffect(() => () => surface.dispose(), [surface])
  return (
    <group position={[2.1, 0, -2.65]} rotation={[0, -0.12, 0]}>
      <mesh position={[0, 0.09, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.7, 0.18, 1.08]} />
        <meshStandardMaterial color="#445749" roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.05, 0.7]} receiveShadow>
        <boxGeometry args={[2.1, 0.1, 0.45]} />
        <meshStandardMaterial color="#3e4d40" roughness={0.75} />
      </mesh>
      <mesh castShadow position={[0, 0, -0.07]}>
        <extrudeGeometry
          args={[
            frame,
            {
              depth: 0.16,
              bevelEnabled: true,
              bevelThickness: 0.035,
              bevelSize: 0.035,
              bevelSegments: 2,
              curveSegments: 32,
            },
          ]}
        />
        <meshStandardMaterial color={solved ? GOLD : BRASS} roughness={0.36} metalness={0.78} />
      </mesh>
      <mesh geometry={surface} position={[0, 0, -0.035]}>
        {solved ? (
          <meshBasicMaterial toneMapped={false}>
            <RenderTexture
              attach="map"
              width={320}
              height={512}
              samples={0}
              frames={active && !reducedMotion ? Infinity : 1}
              compute={() => false}
            >
              <PerspectiveCamera
                makeDefault
                manual
                aspect={1.74 / 2.83}
                fov={49}
                position={[5, 3.4, 8]}
                onUpdate={(camera) => camera.lookAt(0, 1.2, 0)}
              />
              <Garden active={active} reducedMotion={reducedMotion} />
            </RenderTexture>
          </meshBasicMaterial>
        ) : (
          <meshStandardMaterial color="#101f24" roughness={0.3} metalness={0.5} />
        )}
      </mesh>
      {!solved && (
        <group position={[0, 1.6, 0.01]}>
          <Ring
            radius={0.55}
            thickness={0.015}
            rotation={[0, 0, 0]}
            position={[0, 0, 0]}
            color="#687d70"
          />
          <Ring
            radius={0.38}
            thickness={0.008}
            rotation={[0, 0, Math.PI / 6]}
            position={[0, 0, 0]}
            color="#687d70"
            arc={Math.PI * 1.6}
          />
          {Array.from({ length: 6 }, (_, index) => (
            <mesh key={index} rotation={[0, 0, (index * Math.PI) / 3]}>
              <planeGeometry args={[0.04, 0.86]} />
              <meshBasicMaterial color="#344c47" />
            </mesh>
          ))}
          <mesh>
            <icosahedronGeometry args={[0.09, 0]} />
            <meshBasicMaterial color="#a9b592" />
          </mesh>
        </group>
      )}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.17, 0, 0]}>
          <mesh position={[0, 1, 0]} castShadow>
            <cylinderGeometry args={[0.085, 0.11, 2, 8]} />
            <meshStandardMaterial color={BRASS} metalness={0.65} roughness={0.5} />
          </mesh>
          <mesh position={[0, 2.06, 0]}>
            <octahedronGeometry args={[0.14, 0]} />
            <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.35} />
          </mesh>
        </group>
      ))}
      {solved && (
        <pointLight
          position={[0, 1.5, 0.5]}
          color="#bce0b4"
          intensity={3.5}
          distance={5}
          decay={2}
        />
      )}
    </group>
  )
}

function Keeper({
  active,
  reducedMotion,
  awakened,
  position = [0.15, 1.7, 1],
}: {
  active: boolean
  reducedMotion: boolean
  awakened: boolean
  position?: Point3
}) {
  const body = useRef<Group>(null)
  const wingLeft = useRef<Mesh>(null)
  const wingRight = useRef<Mesh>(null)
  const phase = useRef(0)
  useFrame((_, delta) => {
    if (active && !reducedMotion) phase.current += Math.min(delta, 0.05)
    if (body.current) {
      body.current.position.y = position[1] + Math.sin(phase.current * 1.1) * 0.11
      body.current.rotation.y = Math.sin(phase.current * 0.6) * 0.3
    }
    const flap = Math.sin(phase.current * 7) * 0.3
    if (wingLeft.current) wingLeft.current.rotation.z = -0.55 + flap
    if (wingRight.current) wingRight.current.rotation.z = 0.55 - flap
  })
  return (
    <group ref={body} position={position} scale={awakened ? 1.15 : 0.85}>
      <mesh scale={[0.07, 0.17, 0.07]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshBasicMaterial color={LIGHT} toneMapped={false} />
      </mesh>
      <mesh
        ref={wingLeft}
        position={[-0.12, 0.06, 0]}
        scale={[0.16, 0.28, 0.025]}
        rotation={[0, 0, -0.55]}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#d6d5ab" roughness={0.4} side={DoubleSide} />
      </mesh>
      <mesh
        ref={wingRight}
        position={[0.12, 0.06, 0]}
        scale={[0.16, 0.28, 0.025]}
        rotation={[0, 0, 0.55]}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#d6d5ab" roughness={0.4} side={DoubleSide} />
      </mesh>
      <Rod from={[-0.025, 0.1, 0]} to={[-0.09, 0.25, 0]} radius={0.006} color={LIGHT} luminous />
      <Rod from={[0.025, 0.1, 0]} to={[0.09, 0.25, 0]} radius={0.006} color={LIGHT} luminous />
    </group>
  )
}

function ObservatoryFloor({ solved }: { solved: boolean }) {
  return (
    <group>
      <mesh position={[0, -0.38, 0]} scale={[1, 1, 0.78]} receiveShadow castShadow>
        <cylinderGeometry args={[5.3, 5.02, 0.6, 80]} />
        <meshStandardMaterial color="#263b34" roughness={0.75} metalness={0.18} />
      </mesh>
      <mesh position={[0, -0.055, 0]} scale={[1, 1, 0.78]} receiveShadow>
        <cylinderGeometry args={[5.3, 5.3, 0.08, 80]} />
        <meshStandardMaterial
          color={solved ? '#365145' : '#2c423a'}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      <group scale={[1, 1, 0.78]}>
        <Ring radius={5.25} position={[0, 0, 0]} thickness={0.027} color={BRASS} />
        <Ring radius={5.06} position={[0, 0.005, 0]} thickness={0.008} color="#809079" />
        <Ring radius={4.85} position={[0, 0.005, 0]} thickness={0.009} color="#60755f" />
        <DialTicks radius={5.2} count={48} length={0.16} y={0.005} />
      </group>
      <Ring radius={1.25} position={[0.4, 0.01, 0.5]} color="#506751" thickness={0.012} />
      <Ring radius={0.96} position={[0.4, 0.01, 0.5]} color="#506751" thickness={0.008} />
      <Rod from={[-3.4, 0.025, 2.75]} to={[3.9, 0.025, 2.75]} radius={0.007} color="#7e7a53" />
      {/* A fragment of the observatory dome gives the miniature a silhouette. */}
      <group position={[-1.7, 0.03, -2.8]}>
        <Ring
          radius={2.25}
          thickness={0.032}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          arc={Math.PI}
          color="#7c7958"
        />
        <Ring
          radius={2.35}
          thickness={0.008}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          arc={Math.PI}
          color="#627259"
        />
        <Rod from={[-2.25, 0, 0]} to={[-2.25, 1.4, 0]} radius={0.045} color="#7c7958" />
        <mesh position={[-2.25, 1.57, 0]}>
          <sphereGeometry args={[0.13, 16, 10]} />
          <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.3} />
        </mesh>
        <Ring radius={0.3} position={[-2.25, 1.57, 0]} rotation={[0.3, 0.5, 0]} thickness={0.014} />
      </group>
      <Flower position={[-3.5, 0, -1.5]} scale={1.3} open={solved} phase={0.4} />
      <Flower position={[3.55, 0, 0.3]} scale={1.15} open={solved} phase={1.4} />
      <Flower position={[2.9, 0, 2.2]} scale={0.75} open={solved} />
      <Flower position={[-0.9, 0, 3.1]} scale={0.62} open={solved} phase={0.7} />
      <mesh position={[0, -0.73, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 0.78, 1]}>
        <circleGeometry args={[5.7, 80]} />
        <meshBasicMaterial color="#080f10" transparent opacity={0.35} depthWrite={false} />
      </mesh>
    </group>
  )
}

function World(props: ObservatoryCanvasProps) {
  const { state, selected, onSelect, active, reducedMotion, onFailure } = props
  const { camera, gl, size, invalidate } = useThree()
  const light = useMemo(() => traceLight(state), [state])
  const beam = useRef<Group>(null)
  const phase = useRef(0)
  const moving = active && !reducedMotion

  useLayoutEffect(() => {
    if (camera instanceof OrthographicCamera) {
      frameCamera(camera, size.width, size.height, state.entered)
      invalidate()
    }
  }, [camera, size.width, size.height, state.entered, invalidate])

  useEffect(() => {
    const canvas = gl.domElement
    const lost = (event: Event) => {
      event.preventDefault()
      onFailure()
    }
    canvas.addEventListener('webglcontextlost', lost)
    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.setProperty('touch-action', 'pan-y')
    return () => canvas.removeEventListener('webglcontextlost', lost)
  }, [gl, onFailure])

  useEffect(() => {
    refreshShadows(gl)
    invalidate()
  }, [state, selected, moving, gl, invalidate])

  useFrame((_, delta) => {
    if (moving) phase.current += Math.min(delta, 0.05)
    if (beam.current) {
      const value = 0.96 + Math.sin(phase.current * 1.6) * 0.04
      beam.current.children.forEach((child) => {
        const material = (child as Mesh).material
        if (material instanceof MeshBasicMaterial) material.opacity = value
      })
    }
    if (moving) invalidate()
  })

  if (state.entered)
    return (
      <MotionContext value={moving}>
        <Garden active={active} reducedMotion={reducedMotion} arrival />
      </MotionContext>
    )

  return (
    <MotionContext value={moving}>
      <color attach="background" args={['#142320']} />
      <ambientLight intensity={1.15} color="#afc7ae" />
      <hemisphereLight args={['#c4d7bc', '#172721', 1.4]} />
      <directionalLight
        position={[-4, 9, 5]}
        intensity={3.1}
        color="#f5deb4"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-normalBias={0.04}
      />
      <directionalLight
        position={[5, 4, -4]}
        intensity={light.solved ? 2.4 : 1.3}
        color="#9bcdbf"
      />
      <ObservatoryFloor solved={light.solved} />
      <Source />
      <Mirror
        name="mirrorA"
        position={[-1.7, 0, 2]}
        step={state.mirrorA}
        selected={selected === 'mirrorA'}
        onSelect={onSelect}
      />
      <Mirror
        name="mirrorB"
        position={[-1.7, 0, -1.1]}
        step={state.mirrorB}
        selected={selected === 'mirrorB'}
        onSelect={onSelect}
      />
      <Lens state={state} selected={selected === 'lens'} onSelect={onSelect} />
      <Receiver lit={light.receiverLit} solved={light.solved} />
      <Portal solved={light.solved} active={active} reducedMotion={reducedMotion} />
      <Keeper active={active} reducedMotion={reducedMotion} awakened={light.solved} />
      <group ref={beam}>
        {light.segments.map((segment, index) => (
          <Rod
            key={index}
            from={[segment.from[0], BEAM_HEIGHT, segment.from[1]]}
            to={[segment.to[0], BEAM_HEIGHT, segment.to[1]]}
            radius={0.016}
            color={LIGHT}
            luminous
          />
        ))}
      </group>
      {light.receiverLit && (
        <pointLight
          position={[2.1, 1.5, -1.1]}
          color={light.solved ? '#d5eaa4' : '#dfb67f'}
          intensity={2.5}
          distance={3.2}
          decay={2}
        />
      )}
    </MotionContext>
  )
}

/** DOM controls own keyboard interaction and the diagram fallback. */
export default function ObservatoryCanvas(props: ObservatoryCanvasProps) {
  const [supported, setSupported] = useState(false)
  const { onFailure } = props
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const probe = document.createElement('canvas')
      probe.width = probe.height = 1
      try {
        const context = probe.getContext('webgl2', {
          antialias: true,
          alpha: false,
          powerPreference: 'low-power',
        })
        if (!context) {
          onFailure()
          return
        }
        context.getExtension('WEBGL_lose_context')?.loseContext()
        setSupported(true)
      } catch {
        onFailure()
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [onFailure])
  if (!supported) return null
  return (
    <Canvas
      orthographic
      camera={{ position: [8.5, 11, 14], near: 0.1, far: 70, zoom: 50 }}
      dpr={[1, 1.5]}
      shadows="percentage"
      frameloop="demand"
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'low-power',
        preserveDrawingBuffer: false,
      }}
      onCreated={({ gl }) => {
        gl.shadowMap.autoUpdate = false
        gl.shadowMap.needsUpdate = true
      }}
      style={{ position: 'absolute', inset: 0, touchAction: 'pan-y' }}
      aria-hidden="true"
    >
      <World {...props} />
    </Canvas>
  )
}
