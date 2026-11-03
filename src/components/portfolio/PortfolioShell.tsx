import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { PortfolioFooter, PortfolioHeader } from './PortfolioChrome'
import './portfolio.css'
import './portfolio-pages.css'

export function PortfolioShell({
  children,
  active,
}: {
  children: React.ReactNode
  active?: 'work' | 'about' | 'contact'
}) {
  return (
    <div className="folio folio-archive folio-page">
      <PortfolioHeader active={active} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <PortfolioFooter />
    </div>
  )
}

export function PortfolioCTA() {
  return (
    <section
      className="folio-next-conversation folio-container"
      aria-labelledby="conversation-title"
    >
      <div>
        <h2 id="conversation-title">
          Something to build<span>?</span>
        </h2>
        <p>Tell me about your team and the work you want to do.</p>
      </div>
      <div className="folio-next-actions">
        <Link className="folio-button" href="/contact">
          Start a conversation <ArrowUpRight size={18} />
        </Link>
        <a className="folio-text-link" href="/joey-kubalak-resume.pdf" download>
          My résumé <ArrowDown size={17} />
        </a>
      </div>
    </section>
  )
}
