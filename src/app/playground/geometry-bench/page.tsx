import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import GeometryBench from '@/components/playground/GeometryBench'
import { PortfolioShell } from '@/components/portfolio/PortfolioShell'
import '@/components/playground/playground.css'

export const metadata: Metadata = {
  title: 'Geometry Bench',
  description:
    'An interactive geometry instrument by Joey Kubalak. Shape a bloom, explore an orbit or twist a portal, then keep a print or share the recipe.',
  alternates: { canonical: '/playground/geometry-bench' },
}

export default function GeometryBenchPage() {
  return (
    <PortfolioShell active="playground">
      <header className="bench-intro folio-container">
        <div>
          <Link className="folio-text-link" href="/playground">
            <ArrowLeft size={17} /> Back to the Playground
          </Link>
          <h1>
            The Geometry
            <br />
            <span>Bench.</span>
          </h1>
        </div>
        <div>
          <p>I like seeing how far a simple shape can go. This is a place to play with that.</p>
          <a className="folio-text-link" href="#how-it-works">
            How it works <ArrowUpRight size={17} />
          </a>
        </div>
      </header>
      <div className="folio-container">
        <GeometryBench />
      </div>
      <section
        className="bench-making folio-container"
        id="how-it-works"
        aria-labelledby="bench-making-title"
      >
        <div>
          <h2 id="bench-making-title">
            A few rules.
            <br />
            Room to wander.
          </h2>
          <p>
            The same curiosity runs through my products, animated worlds and little experiments like
            this one.
          </p>
          <Link className="folio-text-link" href="/work">
            Explore the rest of my work <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="bench-making-notes">
          <details open>
            <summary>How a shape grows</summary>
            <p>
              Three.js draws the sculpture from points and lines. Symmetry repeats a form around a
              center; layers add depth. Spread and twist change how those repetitions meet. The seed
              gives each variation a repeatable starting point.
            </p>
          </details>
          <details>
            <summary>What the recipe remembers</summary>
            <p>
              The link stores the form, settings, color and seed in its address. Opening it rebuilds
              the same sculpture. It starts from the default viewing angle, so the recipe stays
              separate from the moment you captured.
            </p>
          </details>
          <details>
            <summary>Two ways to keep it</summary>
            <p>
              The PNG captures your current 3D view. The SVG is a flat geometric print made from the
              same recipe, ready to scale. Both are created in your browser.
            </p>
          </details>
          <details>
            <summary>Built to come to rest</summary>
            <p>
              React Three Fiber connects the controls to the scene. Motion stops when you pause,
              leave the page out of view or prefer reduced motion. The controls still work in a flat
              edition when 3D rendering is unavailable.
            </p>
          </details>
        </div>
      </section>
    </PortfolioShell>
  )
}
