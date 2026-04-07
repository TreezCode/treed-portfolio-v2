import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-background-secondary border border-background-tertiary',
      glass: 'bg-white/5 backdrop-blur-xl border border-white/10',
      gradient:
        'bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20',
    }

    return (
      <div
        ref={ref}
        className={cn('rounded-2xl p-4 sm:p-6 transition-all duration-300', variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
