/**
 * Build With Treez Logo Component
 * Uses webp images for optimal performance
 */

'use client'

import Image from 'next/image'

interface LogoProps {
  variant?: 'square' | 'full' | 'icon' | 'text'
  size?: number
  className?: string
}

/** Intrinsic pixel dimensions for layout/CLS; display size is controlled via `size`. */
const INTRINSIC = {
  square: { width: 512, height: 512 },
  icon: { width: 512, height: 512 },
  full: { width: 640, height: 240 },
  text: { width: 640, height: 160 },
} as const

export function Logo({ variant = 'square', size = 56, className = '' }: LogoProps) {
  const logoMap = {
    square: '/images/bwt_brand--logo-square.webp',
    full: '/images/bwt-logo-full.webp',
    icon: '/images/bwt_brand--logo.webp',
    text: '/images/bwt_brand--name.webp',
  }

  const { width, height } = INTRINSIC[variant]

  return (
    <Image
      src={logoMap[variant]}
      alt="Build With Treez"
      width={width}
      height={height}
      className={`h-auto transition-all duration-300 ${className}`}
      style={{ width: size, height: 'auto' }}
      priority
    />
  )
}
