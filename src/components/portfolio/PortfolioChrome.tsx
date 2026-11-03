import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

export function GeometryMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="43" strokeWidth="1" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <circle
          key={angle}
          cx="50"
          cy="29"
          r="21"
          strokeWidth="1"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <path d="M50 8 86 71H14L50 8ZM50 92 14 29H86L50 92Z" strokeWidth=".7" />
    </svg>
  )
}

export function PortfolioHeader({
  direction = 'archive',
  detail = false,
}: {
  direction?: 'archive' | 'fieldnotes'
  detail?: boolean
}) {
  const home = direction === 'archive' ? '/' : '/directions/fieldnotes'
  return (
    <header className="folio-header">
      <Link className="folio-brand" href={home} aria-label="buildwithtreez. home">
        <GeometryMark />
        <span>
          buildwithtreez<span className="folio-brand-dot">.</span>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <a href={`${detail ? home : ''}#work`}>Work</a>
        <a href={`${detail ? home : ''}#about`}>About</a>
        <a href={`${detail ? home : ''}#contact`}>Contact</a>
      </nav>
      <a className="folio-resume" href="/joey-kubalak-resume.pdf" download>
        Résumé <ArrowDown size={16} />
      </a>
    </header>
  )
}

export function DirectionSwitch({ direction }: { direction: 'archive' | 'fieldnotes' }) {
  return (
    <nav className="direction-switch" aria-label="Portfolio directions">
      <span>Two ways to explore</span>
      <Link href="/" aria-current={direction === 'archive' ? 'page' : undefined}>
        Living Archive
      </Link>
      <Link
        href="/directions/fieldnotes"
        aria-current={direction === 'fieldnotes' ? 'page' : undefined}
      >
        Fieldnotes
      </Link>
    </nav>
  )
}

export function PortfolioFooter() {
  return (
    <footer className="folio-footer">
      <a className="folio-brand" href="#main-content">
        <GeometryMark />
        <span>Keep making interesting things.</span>
      </a>
      <div>
        <a href="https://github.com/TreezCode" target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={15} />
        </a>
        <a href="https://www.linkedin.com/in/joey-kubalak/" target="_blank" rel="noreferrer">
          LinkedIn <ArrowUpRight size={15} />
        </a>
        <span>© 2026 Joey Kubalak</span>
      </div>
    </footer>
  )
}
