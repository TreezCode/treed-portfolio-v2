'use client'

import {
  motion,
  useInView,
  useIsomorphicLayoutEffect,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'
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
  const hasAnimated = useRef(false)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(scope, {
    once: true,
    amount: viewportAmount,
    margin: viewportMargin,
  })

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement

    const showImmediately = () => {
      hasAnimated.current = true
      scope.current?.setAttribute('data-motion-state', 'visible')
    }

    if (hasAnimated.current || !scope.current) {
      return
    }

    if (shouldReduceMotion || (trigger === 'load' && !root.hasAttribute('data-motion-ready'))) {
      showImmediately()
      return
    }

    if (trigger === 'view' && !isInView) {
      return
    }

    const selectedItems = Array.from(scope.current.querySelectorAll<HTMLElement>(itemSelector))
    if (selectedItems.length === 0) {
      showImmediately()
      return
    }

    hasAnimated.current = true

    const targets = selectedItems
    const initialTransform = offsetFor(direction, distance)
    let disposed = false
    const controls: Animation[] = []

    scope.current.setAttribute('data-motion-state', 'animating')

    const cleanTargets = () => {
      targets.forEach((target) => {
        target.style.removeProperty('opacity')
        target.style.removeProperty('transform')
      })
    }

    const revealAndCancel = () => {
      scope.current?.setAttribute('data-motion-state', 'visible')
      controls.forEach((control) => control.cancel())
      cleanTargets()
    }

    try {
      targets.forEach((target, index) => {
        controls.push(
          target.animate(
            [
              { opacity: 0, transform: initialTransform },
              { opacity: 1, transform: 'translate3d(0, 0, 0)' },
            ],
            {
              delay: (delay + index * staggerDelay) * 1000,
              duration: duration * 1000,
              easing: EASE_OUT_EXPO_CSS,
              fill: 'both',
            }
          )
        )
      })

      const plannedEndMs =
        (delay + Math.max(0, targets.length - 1) * staggerDelay + duration) * 1000
      const watchdogMs = Math.min(1400, Math.max(350, plannedEndMs + 150))
      const watchdog = window.setTimeout(() => {
        if (disposed) return

        disposed = true
        revealAndCancel()
      }, watchdogMs)

      void Promise.all(controls.map((control) => control.finished.catch(() => undefined))).then(
        () => {
          if (disposed) return

          disposed = true
          window.clearTimeout(watchdog)
          revealAndCancel()
        }
      )

      return () => {
        disposed = true
        hasAnimated.current = false
        window.clearTimeout(watchdog)
        revealAndCancel()
      }
    } catch {
      revealAndCancel()
    }
  }, [
    delay,
    direction,
    distance,
    duration,
    isInView,
    itemSelector,
    shouldReduceMotion,
    staggerDelay,
    trigger,
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
