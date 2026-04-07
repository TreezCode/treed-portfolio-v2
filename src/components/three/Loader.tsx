'use client'

import { Html, useProgress } from '@react-three/drei'

export function Loader() {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        {/* Spinning loader */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-accent-primary/20 rounded-full" />
          <div 
            className="absolute inset-0 border-4 border-transparent border-t-accent-primary rounded-full animate-spin"
            style={{ animationDuration: '1s' }}
          />
        </div>
        
        {/* Progress text */}
        <div className="text-center">
          <p className="text-accent-primary font-medium text-lg">
            Loading 3D Model
          </p>
          <p className="text-text-secondary text-sm mt-1">
            {progress.toFixed(0)}%
          </p>
        </div>
      </div>
    </Html>
  )
}
