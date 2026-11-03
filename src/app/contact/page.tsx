import { createPageMetadata } from '@/lib/metadata'
import { PortfolioShell } from '@/components/portfolio/PortfolioShell'
import { Contact } from '@/components/sections/Contact'

export const metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Contact Joey Kubalak about software engineering opportunities, product development or creative collaboration.',
  path: '/contact',
  image: {
    url: '/share/contact',
    alt: 'Contact Joey Kubalak about engineering and creative collaboration',
  },
})

export default function ContactPage() {
  return (
    <PortfolioShell active="contact">
      <Contact headingLevel="h1" />
    </PortfolioShell>
  )
}
