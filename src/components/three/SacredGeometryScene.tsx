import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Merkaba } from './Merkaba'
import { QuantumField } from './QuantumField'
import { Loader } from './Loader'

interface SacredGeometrySceneProps {
  className?: string
}

export function SacredGeometryScene({ className }: SacredGeometrySceneProps) {
  return (
    <div className={className} style={{ touchAction: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#915eff" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00d4ff" />

          {/* Sacred Geometry Components */}
          <Merkaba />
          <QuantumField />

          {/* Post-processing Effects */}
          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              radius={0.6}
            />
          </EffectComposer>

          {/* OrbitControls disabled to allow particle interaction */}
          {/* Auto-rotation handled by Merkaba component */}
        </Suspense>
      </Canvas>
    </div>
  )
}
