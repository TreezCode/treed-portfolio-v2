'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { FlowerOfLifeIcon } from '@/components/icons/FlowerOfLifeIcon'
import { MerkabaIcon } from '@/components/icons/MerkabaIcon'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  const handleClick = () => {
    toggleTheme()
    // Remove focus on mobile to prevent persistent hover state
    if ('ontouchstart' in window) {
      const activeElement = document.activeElement as HTMLElement | null
      activeElement?.blur()
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      className="relative group p-2 rounded-lg
        bg-transparent
        border border-border-primary
        hover:border-border-strong
        hover:bg-surface-primary
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-accent-primary
        focus-visible:ring-offset-2
        focus-visible:ring-offset-background-primary
        cursor-pointer
      theme-transition"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.14,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      {/* Icon container with rotation */}
      <motion.div
        className="w-[22px] h-[22px] relative"
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 180 : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.48,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="merkaba"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.24,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="absolute inset-0"
            >
              <MerkabaIcon className="w-full h-full" />
            </motion.div>
          ) : (
            <motion.div
              key="flower"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.24,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="absolute inset-0"
            >
              <FlowerOfLifeIcon className="w-full h-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}
