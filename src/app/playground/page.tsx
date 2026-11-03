import { createPageMetadata } from '@/lib/metadata'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PortfolioShell } from '@/components/portfolio/PortfolioShell'
import LegacyBenchRecipe from '@/components/playground/LegacyBenchRecipe'
import KeeperStoryPreview from '@/components/playground/KeeperStoryPreview'
import '@/components/playground/playground-hub.css'

export const metadata = createPageMetadata({
  title: 'Playground | Geometry, games and curious worlds',
  description:
    'Make a geometric print or wake a sleeping world. Explore the Geometry Bench and The Portal Keeper, two interactive experiences by Joey Kubalak.',
  path: '/playground',
  image: { url: '/share/playground', alt: 'The Playground, with the Portal Keeper observatory' },
})

export default function PlaygroundPage() {
  return (
    <PortfolioShell active="playground">
      <LegacyBenchRecipe />
      <header className="playground-intro folio-container">
        <h1>
          Follow your
          <br />
          <span>curiosity.</span>
        </h1>
        <p>
          A shape to make your own. A small world to wake up. This is where I turn interesting ideas
          into things you can play with.
        </p>
      </header>
      <section className="playground-experiences folio-container" aria-label="Choose an experience">
        <article className="playground-experience">
          <Link
            className="playground-preview playground-preview-bench"
            href="/playground/geometry-bench"
            prefetch={false}
            aria-label="Open the Geometry Bench"
          >
            <Image
              src="/portfolio/geometry-bench-poster.svg"
              alt="A layered geometric bloom in chartreuse and soft teal"
              width={1200}
              height={1200}
              loading="eager"
            />
          </Link>
          <h2>The Geometry Bench.</h2>
          <p>
            Start with a simple shape. Change its symmetry, twist it into something unexpected, then
            keep a print or share your recipe.
          </p>
          <div className="playground-experience-actions">
            <Link className="folio-button" href="/playground/geometry-bench" prefetch={false}>
              Make something <ArrowUpRight size={18} />
            </Link>
            <Link
              className="folio-text-link"
              href="/playground/geometry-bench#how-it-works"
              prefetch={false}
            >
              How it works <ArrowUpRight size={16} />
            </Link>
          </div>
        </article>
        <article className="playground-experience">
          <Link
            className="playground-preview playground-preview-keeper"
            href="/play/portal-keeper"
            prefetch={false}
            aria-label="Play The Portal Keeper"
          >
            <Image
              src="/portfolio/portal-keeper/observatory.png"
              alt="The Portal Keeper's brass mirrors and sleeping doorway on a green miniature observatory"
              width={960}
              height={641}
              sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1552px) 46vw, 700px"
              loading="eager"
            />
          </Link>
          <h2>The Portal Keeper.</h2>
          <p>
            A lantern, two mirrors and a curious lens. Follow the light through a sleeping
            observatory and find out what waits on the other side.
          </p>
          <div className="playground-experience-actions">
            <Link className="folio-button" href="/play/portal-keeper" prefetch={false}>
              Wake the world <ArrowUpRight size={18} />
            </Link>
            <Link className="folio-text-link" href="/work/portal-keeper">
              Behind the game <ArrowUpRight size={16} />
            </Link>
          </div>
        </article>
      </section>
      <KeeperStoryPreview />
      <section
        className="playground-outro folio-container"
        aria-labelledby="playground-outro-title"
      >
        <h2 id="playground-outro-title">
          The same curiosity,
          <br />
          out in the world.
        </h2>
        <div>
          <p>
            These little experiments sit alongside the products, websites and creative projects I
            build.
          </p>
          <Link className="folio-text-link" href="/work">
            Explore the selected work <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </PortfolioShell>
  )
}
