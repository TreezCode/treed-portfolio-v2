import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PerfProvider } from '@/components/perf/PerfProvider'
import { PerfOverlayRoot } from '@/components/perf/PerfOverlayRoot'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Joey Kubalak | Junior Software Engineer',
    template: '%s | Joey Kubalak',
  },
  description:
    'Junior Software Engineer with a focus on cybersecurity and secure web architecture. Building dynamic, SEO-optimized solutions with React, Next.js, and Three.js. CompTIA Security+ certified with hands-on knowledge of security tools.',
  keywords: [
    'Junior Software Engineer',
    'Frontend Developer',
    'Cybersecurity',
    'CompTIA Security+',
    'React Developer',
    'Next.js',
    'Three.js',
    'Full Stack Developer',
    'Secure Web Development',
    'TypeScript',
    'JavaScript',
    'Information Security',
    'AI Development',
    'Machine Learning',
    'Stable Diffusion',
    'Emerging Technologies',
    'Web Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Joey Kubalak' }],
  creator: 'Joey Kubalak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://joeykubalak.com',
    title: 'Joey Kubalak | Junior Software Engineer',
    description:
      'Junior Software Engineer with cybersecurity focus. CompTIA Security+ certified. Building secure, dynamic web applications with React, Next.js, and Three.js.',
    siteName: 'Joey Kubalak Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joey Kubalak | Junior Software Engineer',
    description:
      'Junior Software Engineer | CompTIA Security+ | React, Next.js, Three.js | Cybersecurity Focus',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background-primary text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Joey Kubalak',
              url: 'https://joeykubalak.com',
              jobTitle: 'Senior Frontend Developer',
              knowsAbout: ['React', 'Next.js', 'Three.js', 'TypeScript', 'WebGL', '3D Web Development'],
              sameAs: [
                'https://github.com/TreezCode',
                'https://www.linkedin.com/in/joey-kubalak-425032180/',
              ],
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-[#915eff] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <PerfProvider>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <PerfOverlayRoot />
        </PerfProvider>
      </body>
    </html>
  )
}
