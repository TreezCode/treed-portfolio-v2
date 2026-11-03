import type { Metadata } from 'next'
import { PortfolioShell, PortfolioCTA } from '@/components/portfolio/PortfolioShell'
import ProjectCollection from '@/components/portfolio/ProjectCollection'
import KeeperStoryPreview from '@/components/playground/KeeperStoryPreview'

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Explore software products, client websites and original creative work by Joey Kubalak, with the decisions and implementation behind each project.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <PortfolioShell active="work">
      <header className="folio-page-lead folio-container">
        <h1>
          The work,
          <br />
          <span>up close.</span>
        </h1>
        <p>
          A selection of things I’ve built, from useful software to imagined worlds. Open a project
          to see the decisions behind it.
        </p>
      </header>
      <ProjectCollection />
      <KeeperStoryPreview />
      <PortfolioCTA />
    </PortfolioShell>
  )
}
