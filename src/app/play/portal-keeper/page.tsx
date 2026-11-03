import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PortalKeeper from '@/components/portal-keeper/PortalKeeper'
import { PortfolioShell } from '@/components/portfolio/PortfolioShell'
import '@/components/portal-keeper/portal-keeper.css'

export const metadata: Metadata = {
  title: 'The Portal Keeper | A little puzzle adventure',
  description:
    'Wake a sleeping observatory. Turn mirrors, follow the light and open a door into an impossible garden. An original browser puzzle by Joey Kubalak.',
  alternates: { canonical: '/play/portal-keeper' },
}

export default function PortalKeeperPage() {
  return (
    <PortfolioShell active="playground">
      <header className="keeper-intro folio-container">
        <div>
          <Link href="/playground" className="keeper-back">
            <ArrowLeft size={15} />
            Back to the Playground
          </Link>
          <h1>
            The Portal <span>Keeper.</span>
          </h1>
        </div>
        <div>
          <p>Somewhere, a little world has gone quiet.</p>
          <p>
            Guide the light to its sleeping portal. Two mirrors and a curious lens might be all it
            takes.
          </p>
        </div>
      </header>
      <div className="folio-container">
        <PortalKeeper />
      </div>
      <section className="keeper-making folio-container" aria-labelledby="keeper-making-title">
        <div>
          <h2 id="keeper-making-title">
            A small world.
            <br />
            Real things to figure out.
          </h2>
          <p>
            I wanted to make something you could spend a little time inside. Part optical toy, part
            impossible place, with a door worth opening.
          </p>
        </div>
        <div>
          <details>
            <summary>How the light finds its way</summary>
            <p>
              Each mirror changes the path of a calculated ray. The incoming angle determines the
              outgoing angle, so the beam you see follows the instruments you turn. The lens adds a
              second rule: its notch must match the receiver.
            </p>
          </details>
          <details>
            <summary>One room, two ways to play</summary>
            <p>
              Three.js and React Three Fiber draw the observatory from original geometry. The flat
              view uses the same puzzle state and light calculation. The buttons beneath both views
              let you play with a mouse, touch or keyboard.
            </p>
          </details>
          <details>
            <summary>A world that waits for you</summary>
            <p>
              Your progress saves in this browser. Undo includes a reset, so an accidental fresh
              start is reversible. Ambient motion rests when the room leaves view, and sound only
              starts when you turn it on.
            </p>
          </details>
        </div>
      </section>
    </PortfolioShell>
  )
}
