import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import PortfolioPage from '@/components/portfolio/PortfolioPage'
const editorial = Cormorant_Garamond({
  variable: '--font-editorial',
  subsets: ['latin'],
  display: 'optional',
  preload: false,
  weight: ['500'],
  style: ['normal', 'italic'],
})
export const metadata: Metadata = {
  title: 'Fieldnotes | A different way to explore',
  description: 'Software, creative projects, and independent products by Joey Kubalak.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
}
export default function Fieldnotes() {
  return (
    <div className={editorial.variable}>
      <PortfolioPage direction="fieldnotes" />
    </div>
  )
}
