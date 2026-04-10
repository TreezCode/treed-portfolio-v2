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

export function Logo({ variant = 'square', size = 56, className = '' }: LogoProps) {
  const logoMap = {
    square: '/images/bwt_brand--logo-square.webp',
    full: '/images/bwt-logo-full.webp',
    icon: '/images/bwt_brand--logo.webp',
    text: '/images/bwt_brand--name.webp',
  }

  return (
    <Image
      src={logoMap[variant]}
      alt="Build With Treez"
      width={size}
      height={size}
      className={`transition-all duration-300 ${className}`}
      priority
    />
  )
}
