'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { FlowerOfLifeIcon } from '@/components/icons/FlowerOfLifeIcon'
import { MerkabaIcon } from '@/components/icons/MerkabaIcon'
import { useState } from 'react'

export function ThemeToggle() {
  const { theme, toggleTheme, isTransitioning } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    toggleTheme()
    // Remove focus on mobile to prevent persistent hover state
    if ('ontouchstart' in window) {
      (document.activeElement as HTMLElement)?.blur()
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(false)} // Prevent hover on touch
      className="relative group p-2 rounded-lg
        bg-transparent
        border border-border-primary
        hover:border-[#915eff]
        hover:bg-surface-primary
        transition-all duration-300
        active:scale-95
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#915eff]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-background-primary
        cursor-pointer
        theme-transition"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      whileTap={{ scale: 0.9 }}
    >
      {/* Icon container with rotation */}
      <motion.div
        className="w-[22px] h-[22px] relative"
        animate={{
          rotate: isTransitioning ? 180 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="merkaba"
              initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <MerkabaIcon className="w-full h-full" />
            </motion.div>
          ) : (
            <motion.div
              key="flower"
              initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <FlowerOfLifeIcon className="w-full h-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subtle glow on hover - desktop only */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: 'radial-gradient(circle, rgba(145, 94, 255, 0.15) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      )}
    </motion.button>
  )
}
