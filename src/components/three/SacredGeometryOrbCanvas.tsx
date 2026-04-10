'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Hand } from 'lucide-react'
import { SacredGeometryOrb } from './SacredGeometryOrb'
import { FPSTracker } from '@/components/perf/FPSTracker'
import { usePerfFlags } from '@/components/perf/PerfProvider'
import { useMobileDpr } from '@/hooks/useMobileDpr'
import { useIsMobile } from '@/hooks/useMobileReduced'

interface SacredGeometryOrbCanvasProps {
  className?: string
}

export function SacredGeometryOrbCanvas({ className }: SacredGeometryOrbCanvasProps) {
  const perf = usePerfFlags()
  const mobileDpr = useMobileDpr()
  const isMobile = useIsMobile()
  const [isUnlocked, setIsUnlocked] = useState(false)
  
  // PERF FIX: cap DPR and reduce geometry on mobile permanently; perf mode stacks on top
  const dpr = perf.reduced3D ? 1 : mobileDpr
  const reduced = isMobile || perf.reduced3D

  const handleUnlock = () => {
    if (isMobile) {
      setIsUnlocked(true)
    }
  }

  const handleLock = () => {
    if (isMobile) {
      setIsUnlocked(false)
    }
  }

  return (
    <div 
      className={className}
      style={{ 
        touchAction: isMobile && !isUnlocked ? 'auto' : 'none', 
        cursor: !isMobile ? 'grab' : 'default',
        position: 'relative'
      }}
    >
      {/* Tap to unlock overlay - mobile only */}
      <AnimatePresence>
        {isMobile && !isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleUnlock}
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
          >
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-background-primary/40 backdrop-blur-[2px]" />
            
            {/* Tap to interact badge */}
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative z-20 flex flex-col items-center gap-2 px-5 py-3 rounded-xl bg-surface-primary/95 backdrop-blur-sm border border-accent-primary/30 shadow-2xl"
            >
              {/* Tap icon - lucide Hand */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Hand className="w-8 h-8 text-accent-primary" strokeWidth={2} />
              </motion.div>
              
              {/* Text */}
              <div className="text-center">
                <p className="text-base font-semibold text-text-primary mb-0.5">
                  Tap to Interact
                </p>
                <p className="text-xs text-text-tertiary">
                  Rotate the orb
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lock button - shows when unlocked on mobile */}
      <AnimatePresence>
        {isMobile && isUnlocked && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleLock}
            className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-surface-primary/95 backdrop-blur-sm border border-border-primary hover:border-accent-primary transition-colors shadow-lg"
            aria-label="Lock interaction"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-text-primary">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 3D Canvas */}
      <Canvas
        camera={{ fov: 35, near: 0.1, far: 200, position: [0, 0, 8] }}
        dpr={dpr}
        gl={{ preserveDrawingBuffer: false, alpha: true }}
        style={{ cursor: 'inherit', width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.4}
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            enabled={!isMobile || isUnlocked}
          />
          <ambientLight intensity={0.1} />
          {/* PERF FIX: reduced=true on mobile permanently + in reduced-3d perf mode */}
          <SacredGeometryOrb reduced={reduced} />
          <Preload all />
        </Suspense>
        <FPSTracker label="orb" mode={perf.mode} />
      </Canvas>
    </div>
  )
}
