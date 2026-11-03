import { createPageMetadata } from '@/lib/metadata'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowDown, ArrowUpRight } from 'lucide-react'
import { PortfolioShell } from '@/components/portfolio/PortfolioShell'
import LightPathDemo from '@/components/portal-keeper/LightPathDemo'
import '@/components/portal-keeper/keeper-case-study.css'

export const metadata = createPageMetadata({
  title: 'The Portal Keeper | Building a playable world',
  description:
    'Inside an original Three.js puzzle by Joey Kubalak: calculated light reflections, procedural worldbuilding and one puzzle model shared by 3D and flat views.',
  path: '/work/portal-keeper',
  image: {
    url: '/share/portal-keeper-story',
    alt: 'Inside The Portal Keeper: the garden beyond the observatory portal',
  },
})

export default function PortalKeeperCaseStudyPage() {
  return (
    <PortfolioShell active="work">
      <article className="keeper-case">
        <header className="keeper-case-opening folio-container">
          <Link className="folio-text-link keeper-case-back" href="/work">
            <ArrowLeft size={16} /> Selected work
          </Link>
          <div className="keeper-case-title-row">
            <div>
              <h1>
                The Portal <span>Keeper.</span>
              </h1>
              <p className="keeper-case-summary">
                A little world with a reason to explore it. Turn two mirrors, follow the light and
                wake a sleeping observatory.
              </p>
            </div>
            <dl className="keeper-case-facts">
              <div>
                <dt>The work</dt>
                <dd>Original browser puzzle</dd>
              </div>
              <div>
                <dt>My role</dt>
                <dd>Creative direction, game design & development</dd>
              </div>
              <div>
                <dt>Built with</dt>
                <dd>Three.js, React Three Fiber & TypeScript</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>2026</dd>
              </div>
            </dl>
          </div>
          <div className="keeper-case-opening-actions">
            <Link className="folio-button" href="/play/portal-keeper" prefetch={false}>
              Play The Portal Keeper <ArrowUpRight size={18} />
            </Link>
            <a className="folio-text-link" href="#inside-the-mechanism">
              Inside the mechanism <ArrowDown size={17} />
            </a>
          </div>
        </header>

        <figure className="keeper-case-figure keeper-case-opening-figure folio-container">
          <Image
            src="/portfolio/portal-keeper/observatory.png"
            alt="The Sleeping Observatory, an original green and brass miniature with two mirror instruments, a patterned lens and a dark portal"
            width={960}
            height={641}
            sizes="(max-width: 760px) 100vw, 90vw"
            preload
          />
          <figcaption>
            The Sleeping Observatory. A fixed view keeps the instruments, light path and destination
            in one composition.
          </figcaption>
        </figure>

        <section className="keeper-case-story folio-container" aria-labelledby="keeper-case-idea">
          <h2 id="keeper-case-idea">
            Make curiosity
            <br />
            <span>playable.</span>
          </h2>
          <div>
            <p className="keeper-case-lead">
              I wanted the portfolio to offer a place to spend a little time, with something to
              discover through your own actions.
            </p>
            <p>
              The room begins with an obvious relationship: a light source and a sleeping doorway.
              Brass instruments invite you to turn them. Every move changes a visible beam, so the
              scene itself helps explain the puzzle.
            </p>
            <p>
              I kept the first world small enough to finish. One room, two mirrors and a patterned
              lens give the journey a clear beginning and a reward. The geometric plants and curious
              light-moth bring a little life to the machinery.
            </p>
          </div>
        </section>

        <section
          className="keeper-case-mechanism folio-container"
          id="inside-the-mechanism"
          aria-labelledby="keeper-case-light"
        >
          <div className="keeper-case-section-heading">
            <h2 id="keeper-case-light">
              The beam tells
              <br />
              the truth.
            </h2>
            <p>
              Light follows the instruments. A ray meets each finite mirror surface and reflects
              according to its angle. The receiver only lights when that calculated path reaches it.
            </p>
          </div>
          <LightPathDemo />
          <div className="keeper-case-mechanism-notes">
            <p>
              Discrete turns make the puzzle comfortable on touchscreens and with a keyboard. A
              bounded reflection loop keeps every configuration finite, including a beam that turns
              back toward another mirror.
            </p>
            <p>
              The lens adds a second, visible rule: its asymmetric notch must match the receiver.
              Progress comes from understanding the objects, with graduated hints available when a
              player wants a nudge.
            </p>
          </div>
        </section>

        <section
          className="keeper-case-reward folio-container"
          aria-labelledby="keeper-case-reward"
        >
          <div className="keeper-case-section-heading">
            <h2 id="keeper-case-reward">
              A door worth
              <br />
              <span>opening.</span>
            </h2>
            <p>
              When the pattern aligns, plants unfold and the portal reveals a floating garden.
              Stepping through gives the puzzle a destination beyond its solved state.
            </p>
          </div>
          <figure className="keeper-case-figure">
            <Image
              src="/portfolio/portal-keeper/garden.png"
              alt="The garden beyond the portal: geometric flowers growing on small floating islands beneath a quiet sky"
              width={960}
              height={641}
              sizes="(max-width: 760px) 100vw, 90vw"
            />
            <figcaption>
              The garden is another 3D scene. Before entry, it appears through a render texture
              inside the doorway.
            </figcaption>
          </figure>
        </section>

        <section
          className="keeper-case-engineering folio-container"
          aria-labelledby="keeper-case-model"
        >
          <div className="keeper-case-engineering-intro">
            <h2 id="keeper-case-model">
              The same puzzle.
              <br />
              Two ways inside.
            </h2>
            <p>
              Separating the rules from the renderer made the experience easier to test, restore and
              offer in different forms.
            </p>
          </div>
          <div className="keeper-case-decisions">
            <section aria-labelledby="keeper-case-state">
              <h3 id="keeper-case-state">A small, explicit state</h3>
              <p>
                Mirror angles, lens placement and orientation describe the puzzle. Both the 3D room
                and the playable flat diagram use that state and the same ray calculation. Undo
                restores earlier snapshots; a reset is reversible too.
              </p>
              <p>
                Versioned browser saves are validated before restoration. Progress returns without
                an account, and an invalid save opens a fresh room.
              </p>
            </section>
            <section aria-labelledby="keeper-case-rendering">
              <h3 id="keeper-case-rendering">Spend rendering work deliberately</h3>
              <p>
                The garden preview uses one bounded render texture. Device pixel ratio is capped,
                the scene renders on demand, and ambient motion rests when paused, hidden or outside
                the viewport. The game loads on its own route.
              </p>
              <p>
                Original geometry gives the room its identity without a library of downloaded
                models. The small musical notes are synthesized only after sound is enabled.
              </p>
            </section>
            <section aria-labelledby="keeper-case-controls">
              <h3 id="keeper-case-controls">Keep the player in control</h3>
              <p>
                Named HTML buttons provide a complete path through the puzzle. On phones, the
                controls sit beneath the artwork and focus scrolling accounts for the sticky scene.
                Text and shape carry clues alongside light and sound.
              </p>
              <p>
                Reduced motion preserves the puzzle. If WebGL is unavailable or its context is lost,
                the same room continues in the flat view.
              </p>
            </section>
          </div>
        </section>

        <section className="keeper-case-close folio-container" aria-labelledby="keeper-case-play">
          <div>
            <h2 id="keeper-case-play">
              Your turn to
              <br />
              <span>let the light in.</span>
            </h2>
            <p>No timer. A few things to figure out. A world waiting on the other side.</p>
          </div>
          <div className="keeper-case-close-actions">
            <Link className="folio-button" href="/play/portal-keeper" prefetch={false}>
              Enter the observatory <ArrowUpRight size={18} />
            </Link>
            <Link className="folio-text-link" href="/playground" prefetch={false}>
              More from the Playground <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </article>
    </PortfolioShell>
  )
}
