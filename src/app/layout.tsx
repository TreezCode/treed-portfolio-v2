import type { Metadata } from 'next'
import { Archivo, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import dynamic from 'next/dynamic'

// Performance tools - only loaded when explicitly enabled
// When env var is unset/false, these imports are completely excluded from bundle
const isPerfEnabled = process.env.NEXT_PUBLIC_ENABLE_PERF_TOOLS === 'true'

// Dynamic imports - webpack will exclude these from production bundle when condition is false
const PerfProvider = isPerfEnabled
  ? dynamic(
      () => import('@/components/perf/PerfProvider').then((mod) => ({ default: mod.PerfProvider })),
      { ssr: true }
    )
  : ({ children }: { children: React.ReactNode }) => <>{children}</>

const PerfOverlayRoot = isPerfEnabled
  ? dynamic(() =>
      import('@/components/perf/PerfOverlayRoot').then((mod) => ({ default: mod.PerfOverlayRoot }))
    )
  : () => null

// Variable font with the width axis: display type uses 'wdth' 118-125 (see globals.css)
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  display: 'optional',
  axes: ['wdth'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'optional',
  preload: false,
})

const themeInitializationScript = `
  try {
    const storedTheme = localStorage.getItem('treez-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
`

const motionInitializationScript = `
  try {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    if (!reduceMotion) {
      root.dataset.motionReady = 'true';
      window.setTimeout(() => {
        root.removeAttribute('data-motion-ready');
      }, 1400);
    }
  } catch {}
`

export const metadata: Metadata = {
  metadataBase: new URL('https://buildwithtreez.com'),
  title: {
    default: 'Joey Kubalak | Software Engineer & Creative Maker',
    template: '%s | Joey Kubalak',
  },
  description:
    'Software, imaginative digital worlds, and the curiosity behind them. Explore websites, apps, motion design, and creative projects by Joey Kubalak.',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'Software Engineer',
    'Product Engineer',
    'Frontend Developer',
    'Full Stack TypeScript Engineer',
    'CompTIA Security+',
    'React Developer',
    'Next.js',
    'Three.js',
    'Secure Web Development',
    'TypeScript',
    'Information Security',
    'PostgreSQL',
  ],
  authors: [{ name: 'Joey Kubalak' }],
  creator: 'Joey Kubalak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buildwithtreez.com',
    title: 'Joey Kubalak | Software Engineer & Creative Maker',
    description:
      'Thoughtful software and imaginative digital worlds. Explore the complete project collection by Joey Kubalak.',
    siteName: 'Joey Kubalak Portfolio',
    // Images automatically generated from opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joey Kubalak | Software Engineer & Creative Maker',
    description:
      'Thoughtful software and imaginative digital worlds. Explore the complete project collection by Joey Kubalak.',
    // Images automatically generated from opengraph-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
        <Script
          id="treez-motion-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: motionInitializationScript }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background-primary text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Joey Kubalak',
              url: 'https://buildwithtreez.com',
              jobTitle: 'Software Engineer',
              knowsAbout: [
                'React',
                'Next.js',
                'Three.js',
                'TypeScript',
                'PostgreSQL',
                'WebGL',
                '3D Web Development',
                'Secure Web Development',
                'CompTIA Security+',
                'Information Security',
              ],
              sameAs: ['https://github.com/TreezCode', 'https://www.linkedin.com/in/joey-kubalak/'],
            }),
          }}
        />
        <a
          id="skip-to-content"
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-accent-fill focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <PerfProvider>
            <div className="flex-1">{children}</div>
            {isPerfEnabled && <PerfOverlayRoot />}
          </PerfProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
