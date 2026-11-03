import type { Metadata } from 'next'
import { PortfolioShell } from '@/components/portfolio/PortfolioShell'
import { Contact } from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Joey Kubalak about software engineering opportunities, product development or creative collaboration.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <PortfolioShell active="contact">
      <Contact headingLevel="h1" />
    </PortfolioShell>
  )
}
