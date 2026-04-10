/**
 * Interaction Hint Component
 * 
 * Subtle, auto-dismissing hint for 3D interactive elements.
 * Follows enterprise UX patterns:
 * - Shows only once per user (localStorage)
 * - Auto-fades after 4 seconds
 * - Dismisses on first interaction
 * - Minimal visual weight
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface InteractionHintProps {
  /** Unique storage key for this hint (optional - if not provided, shows always) */
  storageKey?: string
  /** Hint text to display */
  text?: string
  /** Auto-hide after this many seconds (default: 8) */
  autoHideDelay?: number
  /** Use sessionStorage instead of localStorage (per-session instead of permanent) */
  sessionOnly?: boolean
  /** Additional CSS classes */
  className?: string
}

export function InteractionHint({ 
  storageKey, 
  text = 'Drag to rotate',
  autoHideDelay = 8,
  sessionOnly = false,
  className = ''
}: InteractionHintProps) {
  const [isVisible, setIsVisible] = useState(false)

  const handleInteraction = useCallback(() => {
    setIsVisible(false)
    // Don't store if no storageKey provided (always show)
    if (storageKey) {
      const storage = sessionOnly ? sessionStorage : localStorage
      storage.setItem(storageKey, 'true')
    }
  }, [storageKey, sessionOnly])

  useEffect(() => {
    // If no storageKey, always show
    if (!storageKey) {
      const showTimer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)

      const hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, (autoHideDelay + 2) * 1000)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    }

    // Check if user has seen this hint
    const storage = sessionOnly ? sessionStorage : localStorage
    const hasSeen = storage.getItem(storageKey)
    
    if (!hasSeen) {
      // Show hint after scene loads
      const showTimer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)

      // Auto-hide after duration
      const hideTimer = setTimeout(() => {
        setIsVisible(false)
        storage.setItem(storageKey, 'true')
      }, (autoHideDelay + 2) * 1000)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [storageKey, autoHideDelay, sessionOnly])

  // Listen for any interaction to dismiss hint
  useEffect(() => {
    if (isVisible) {
      const events = ['pointerdown', 'touchstart', 'wheel']
      events.forEach(event => {
        window.addEventListener(event, handleInteraction, { once: true })
      })

      return () => {
        events.forEach(event => {
          window.removeEventListener(event, handleInteraction)
        })
      }
    }
  }, [isVisible, handleInteraction])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className={`pointer-events-none select-none ${className}`}
        >
          {/* Hint badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-primary/90 backdrop-blur-sm border border-border-primary shadow-lg">
            {/* Gesture icon */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-accent-primary animate-pulse"
            >
              <path 
                d="M12 2C10.9 2 10 2.9 10 4V12.17L8.59 10.76C8.21 10.38 7.7 10.17 7.17 10.17C5.97 10.17 5 11.14 5 12.34C5 12.87 5.21 13.38 5.59 13.76L10.83 19C11.58 19.75 12.6 20.17 13.66 20.17H17C19.21 20.17 21 18.38 21 16.17V8C21 6.9 20.1 6 19 6C17.9 6 17 6.9 17 8V4C17 2.9 16.1 2 15 2C13.9 2 13 2.9 13 4V8C13 6.9 12.1 6 11 6C9.9 6 9 6.9 9 8V12C9 10.9 8.1 10 7 10C5.9 10 5 10.9 5 12V16.17C5 17.23 5.42 18.25 6.17 19L11.41 24.24C12.16 24.99 13.18 25.41 14.24 25.41H17.66C20.85 25.41 23.66 22.6 23.66 19.41V12C23.66 10.9 22.76 10 21.66 10C20.56 10 19.66 10.9 19.66 12V8" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            
            {/* Text */}
            <span className="text-sm font-medium text-text-primary">
              {text}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
