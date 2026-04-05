import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-accent-primary text-white hover:bg-accent-secondary active:scale-95',
      secondary:
        'bg-background-secondary text-text-primary hover:bg-background-tertiary active:scale-95',
      outline:
        'border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white active:scale-95',
      ghost: 'text-text-primary hover:bg-background-secondary active:scale-95',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const classes = cn(baseStyles, variants[variant], sizes[size], className)

    if (asChild && children) {
      // Clone the child element and add our classes
      const child = children as React.ReactElement
      return (
        <child.type
          {...child.props}
          className={cn(classes, child.props.className)}
          ref={ref}
        />
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
