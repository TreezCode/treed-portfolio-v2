import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

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
    default: 'Joey Kubalak | Senior Frontend Developer',
    template: '%s | Joey Kubalak',
  },
  description:
    'Senior Frontend Developer specializing in React, Next.js, and Three.js. Creating immersive 3D web experiences and modern user interfaces.',
  keywords: [
    'Frontend Developer',
    'React Developer',
    'Next.js',
    'Three.js',
    'WebGL',
    '3D Web Development',
    'TypeScript',
    'JavaScript',
    'Web Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Joey Kubalak' }],
  creator: 'Joey Kubalak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://joeykubalak.com',
    title: 'Joey Kubalak | Senior Frontend Developer',
    description:
      'Senior Frontend Developer specializing in React, Next.js, and Three.js. Creating immersive 3D web experiences.',
    siteName: 'Joey Kubalak Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joey Kubalak | Senior Frontend Developer',
    description:
      'Senior Frontend Developer specializing in React, Next.js, and Three.js',
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
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
