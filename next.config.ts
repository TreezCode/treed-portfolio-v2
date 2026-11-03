import type { NextConfig } from 'next'

const isDevelopment = process.env.NODE_ENV === 'development'

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDevelopment ? " 'unsafe-eval'" : ''};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://www.googletagmanager.com https://*.google-analytics.com;
  font-src 'self' data:;
  connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${isDevelopment ? '' : 'upgrade-insecure-requests;'}
`

const nextConfig: NextConfig = {
  env: {
    // Netlify supplies CONTEXT for real production/preview builds. Local builds remain off.
    NEXT_PUBLIC_ANALYTICS_CONTEXT: process.env.CONTEXT ?? process.env.NEXT_PUBLIC_ANALYTICS_CONTEXT ?? 'local',
  },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['@react-three/drei', '@react-three/fiber', 'three'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  allowedDevOrigins: ['192.168.12.213'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          ...(process.env.CONTEXT && process.env.CONTEXT !== 'production'
            ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
            : []),
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
