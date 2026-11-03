import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { GeometryMark } from '@/components/portfolio/PortfolioChrome'
import { PortfolioShell, PortfolioCTA } from '@/components/portfolio/PortfolioShell'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Joey Kubalak, a Pennsylvania-based software engineer and creative maker with an information-security foundation and a curiosity for interactive worlds.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <PortfolioShell active="about">
      <header className="folio-page-lead folio-container folio-about-opening">
        <div>
          <h1>
            A practical mind.
            <br />
            <span>A curious streak.</span>
          </h1>
          <p>I’m Joey. Treez is the creative side of the same brain.</p>
        </div>
        <GeometryMark className="folio-about-mark" />
      </header>
      <section className="folio-about-story folio-container" aria-labelledby="about-story-title">
        <div>
          <h2 id="about-story-title">
            I like understanding
            <br />
            how things fit.
          </h2>
          <dl className="folio-about-facts">
            <div>
              <dt>Home</dt>
              <dd>Pennsylvania, USA</dd>
            </div>
            <div>
              <dt>Foundation</dt>
              <dd>
                A.A.S. Information Security
                <br />
                CompTIA Security+
              </dd>
            </div>
            <div>
              <dt>Everyday tools</dt>
              <dd>
                TypeScript, React, Next.js
                <br />
                Python, SQL and Blender
              </dd>
            </div>
          </dl>
          <a className="folio-text-link" href="/joey-kubalak-resume.pdf" download>
            Download my résumé <ArrowDown size={17} />
          </a>
        </div>
        <div className="folio-about-prose">
          <p>
            I’m a software engineer who enjoys the whole path from a difficult question to something
            people can use. I work across product design and development, and I care about the
            details that connect the two.
          </p>
          <p>
            My information-security background shapes how I think about privacy, permissions and
            failure. A gift-planning app needs to protect the surprise. A client website needs to
            keep its important routes and inquiries working through a rebuild. Those constraints
            belong in the design from the start.
          </p>
          <p>
            There’s another side to that curiosity: animated worlds, original music, game systems
            and a lasting fascination with sacred geometry. I enjoy bringing that imagination into
            interfaces without making the useful parts harder to reach.
          </p>
          <p>
            Codorus Web is my independent studio for client work. This portfolio brings that
            practice together with my own products and creative projects.
          </p>
          <a
            className="folio-text-link"
            href="https://codorusweb.com/"
            target="_blank"
            rel="noreferrer"
          >
            Visit Codorus Web <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <section className="folio-about-pair folio-container" aria-labelledby="two-sides-title">
        <div className="folio-section-heading">
          <h2 id="two-sides-title">
            The structure.
            <br />
            The spark.
          </h2>
          <p>
            A product can be thoughtful. A creative world can be carefully engineered. I like
            working where those instincts meet.
          </p>
        </div>
        <Link href="/work/presentsphere" className="folio-about-art">
          <Image
            src="/portfolio/2026/presentsphere.webp"
            alt="PresentSphere's family gifting product and website"
            width={1440}
            height={1000}
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span>
            Making room for real life <ArrowUpRight size={18} />
          </span>
        </Link>
        <Link href="/work/cosmic-zen" className="folio-about-art folio-about-art-portrait">
          <Image
            src="/portfolio/2026/cosmic-zen.webp"
            alt="Cosmic Zen, an original character surrounded by comet light"
            width={1123}
            height={1401}
            sizes="(max-width: 760px) 100vw, 35vw"
          />
          <span>
            Making room for imagination <ArrowUpRight size={18} />
          </span>
        </Link>
      </section>
      <section className="folio-origin-note folio-container" aria-labelledby="origin-title">
        <h2 id="origin-title">Keep the first version.</h2>
        <div>
          <p>
            My first portfolio was built with HTML, CSS and JavaScript. It still belongs here. It’s
            a reminder of how much comes from making something, learning from it and making the next
            thing better.
          </p>
          <Link className="folio-text-link" href="/work/vanilla-portfolio">
            Visit the origin story <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <PortfolioCTA />
    </PortfolioShell>
  )
}
