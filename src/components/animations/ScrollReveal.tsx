import { MotionSequence } from './MotionSystem'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
}: ScrollRevealProps) {
  return (
    <MotionSequence delay={delay} direction={direction} className={className}>
      <div data-motion-item>{children}</div>
    </MotionSequence>
  )
}
