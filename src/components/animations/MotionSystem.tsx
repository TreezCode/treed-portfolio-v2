'use client'

import { motion, useIsomorphicLayoutEffect, useScroll, useSpring } from 'framer-motion'
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import { useCallback, useRef } from 'react'
import type { UseInViewOptions } from 'framer-motion'
import styles from './MotionSystem.module.css'

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
const EASE_OUT_EXPO_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)'

export const motionTokens = {
  duration: {
    feedback: 0.14,
    interface: 0.22,
    reveal: 0.68,
    hero: 0.76,
  },
  distance: {
    detail: 10,
    reveal: 20,
    hero: 24,
  },
  stagger: {
    compact: 0.055,
    default: 0.085,
    hero: 0.075,
  },
  ease: EASE_OUT_EXPO,
} as const

type MotionDirection = 'up' | 'down' | 'left' | 'right' | 'none'
type MotionTrigger = 'load' | 'view'
type MotionTag =
  | 'a'
  | 'article'
  | 'aside'
  | 'div'
  | 'dl'
  | 'footer'
  | 'header'
  | 'li'
  | 'ol'
  | 'section'
  | 'ul'

interface MotionSequenceProps extends HTMLAttributes<HTMLElement> {
  as?: MotionTag
  children: ReactNode
  delay?: number
  direction?: MotionDirection
  distance?: number
  duration?: number
  itemSelector?: string
  staggerDelay?: number
  trigger?: MotionTrigger
  viewportAmount?: 'some' | 'all' | number
  viewportMargin?: UseInViewOptions['margin']
}

function offsetFor(direction: MotionDirection, distance: number) {
  switch (direction) {
    case 'down':
      return `translate3d(0, -${distance}px, 0)`
    case 'left':
      return `translate3d(${distance}px, 0, 0)`
    case 'right':
      return `translate3d(-${distance}px, 0, 0)`
    case 'none':
      return 'translate3d(0, 0, 0)'
    case 'up':
    default:
      return `translate3d(0, ${distance}px, 0)`
  }
}

function thresholdFor(amount: MotionSequenceProps['viewportAmount']) {
  if (amount === 'all') return 1
  if (amount === 'some') return 0

  return Math.min(1, Math.max(0, amount ?? 0))
}

function overlapsViewport(element: HTMLElement) {
  const bounds = element.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth

  return (
    bounds.bottom > 0 &&
    bounds.right > 0 &&
    bounds.top < viewportHeight &&
    bounds.left < viewportWidth
  )
}

/**
 * Progressive-enhancement entrance choreography.
 *
 * Elements are rendered in their final, readable state on the server. Motion starts only after
 * hydration and never owns layout, so content remains available if JavaScript, IntersectionObserver,
 * or animation playback fails.
 */
export function MotionSequence({
  as = 'div',
  children,
  delay = 0,
  direction = 'up',
  distance = motionTokens.distance.reveal,
  duration = motionTokens.duration.reveal,
  itemSelector = ':scope > [data-motion-item]',
  staggerDelay = motionTokens.stagger.default,
  trigger = 'view',
  viewportAmount = 0.12,
  viewportMargin = '0px 0px 12% 0px',
  ...elementProps
}: MotionSequenceProps) {
  const scope = useRef<HTMLElement>(null)
  const hasPlayed = useRef(false)

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement
    const sequence = scope.current

    if (!sequence) {
      return
    }

    const targets = Array.from(sequence.querySelectorAll<HTMLElement>(itemSelector))
    const initialTransform = offsetFor(direction, distance)
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const controls: Animation[] = []
    let disposed = false
    let hasStarted = false
    let observer: IntersectionObserver | undefined
    let watchdog: number | undefined
    let animationFrame: number | undefined
    let removeGuards = () => {}

    const reveal = (markPlayed: boolean) => {
      if (markPlayed) {
        hasPlayed.current = true
      }

      sequence.setAttribute('data-motion-state', 'visible')
      controls.forEach((control) => {
        try {
          control.cancel()
        } catch {
          // A failed animation must never be allowed to keep readable content hidden.
        }
      })
    }

    const finish = (markPlayed: boolean) => {
      if (disposed) return

      disposed = true
      observer?.disconnect()
      removeGuards()
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame)
      }
      if (watchdog !== undefined) {
        window.clearTimeout(watchdog)
      }
      reveal(markPlayed)
    }

    const showImmediately = () => {
      finish(true)
    }

    if (hasPlayed.current) {
      reveal(true)
      return
    }

    if (
      reducedMotionQuery.matches ||
      targets.length === 0 ||
      (trigger === 'load' && !root.hasAttribute('data-motion-ready'))
    ) {
      showImmediately()
      return
    }

    const startAnimation = () => {
      if (disposed || hasStarted) return

      hasStarted = true
      hasPlayed.current = true
      observer?.disconnect()
      sequence.setAttribute('data-motion-state', 'animating')

      try {
        targets.forEach((target, index) => {
          controls.push(
            target.animate(
              [
                { opacity: 0, transform: initialTransform },
                { opacity: 1, transform: 'translate3d(0, 0, 0)' },
              ],
              {
                delay: Math.max(0, delay + index * staggerDelay) * 1000,
                duration: Math.max(0, duration) * 1000,
                easing: EASE_OUT_EXPO_CSS,
                fill: 'both',
              }
            )
          )
        })

        const plannedEndMs =
          (Math.max(0, delay) +
            Math.max(0, targets.length - 1) * Math.max(0, staggerDelay) +
            Math.max(0, duration)) *
          1000
        const watchdogMs = Math.max(350, plannedEndMs + 200)
        watchdog = window.setTimeout(() => finish(true), watchdogMs)

        void Promise.all(controls.map((control) => control.finished)).then(
          () => finish(true),
          () => finish(true)
        )
      } catch {
        finish(true)
      }
    }

    const scheduleAnimation = () => {
      if (disposed || hasStarted || animationFrame !== undefined) return

      observer?.disconnect()
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = undefined
        startAnimation()
      })
    }

    const handleReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) {
        finish(true)
      }
    }
    const handleFocusIn = () => finish(true)
    const handlePageHide = () => finish(true)
    let removeReducedMotionListener = () => {}

    try {
      if (typeof reducedMotionQuery.addEventListener === 'function') {
        reducedMotionQuery.addEventListener('change', handleReducedMotion)
        removeReducedMotionListener = () =>
          reducedMotionQuery.removeEventListener('change', handleReducedMotion)
      } else {
        reducedMotionQuery.addListener(handleReducedMotion)
        removeReducedMotionListener = () => reducedMotionQuery.removeListener(handleReducedMotion)
      }
    } catch {
      showImmediately()
      return
    }

    sequence.addEventListener('focusin', handleFocusIn)
    window.addEventListener('pagehide', handlePageHide)
    removeGuards = () => {
      removeReducedMotionListener()
      sequence.removeEventListener('focusin', handleFocusIn)
      window.removeEventListener('pagehide', handlePageHide)
    }

    if (trigger === 'view') {
      // Server output is deliberately readable. If a sequence is already visible when hydration
      // begins (for example after anchor navigation or history restoration), do not rewind it.
      if (overlapsViewport(sequence) || typeof window.IntersectionObserver === 'undefined') {
        showImmediately()
        return
      }

      // Arm offscreen targets before they can enter the viewport. The observer starts the same
      // values through WAAPI, preventing the visible -> hidden -> visible flash on intersection.
      sequence.setAttribute('data-motion-state', 'armed')

      try {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              scheduleAnimation()
            }
          },
          {
            rootMargin: viewportMargin,
            threshold: thresholdFor(viewportAmount),
          }
        )
        observer.observe(sequence)
      } catch {
        finish(true)
      }
    } else {
      sequence.setAttribute('data-motion-state', 'armed')
      scheduleAnimation()
    }

    return () => {
      observer?.disconnect()
      removeGuards()
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame)
      }
      if (watchdog !== undefined) {
        window.clearTimeout(watchdog)
      }

      if (!disposed) {
        disposed = true
        reveal(false)
      }
    }
  }, [
    delay,
    direction,
    distance,
    duration,
    itemSelector,
    staggerDelay,
    trigger,
    viewportAmount,
    viewportMargin,
  ])

  const Component: ElementType = as
  const setScope = useCallback((node: HTMLElement | null) => {
    scope.current = node
  }, [])
  const { style: elementStyle, ...restElementProps } = elementProps
  const sequenceStyle = {
    ...elementStyle,
    '--motion-enter-transform': offsetFor(direction, distance),
  } as CSSProperties

  return (
    <Component
      ref={setScope}
      data-motion-sequence=""
      data-motion-trigger={trigger}
      style={sequenceStyle}
      {...restElementProps}
    >
      {children}
    </Component>
  )
}

/** A two-pixel surveying line that makes progress through the single-page narrative legible. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.24,
  })

  return <motion.div className={styles.scrollProgress} style={{ scaleX }} aria-hidden="true" />
}
