'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { portfolioProjects } from '@/data/portfolio'
import type { PortfolioProject } from '@/data/portfolio-types'
import { PortfolioCTA } from './PortfolioShell'
import { DirectionSwitch, GeometryMark, PortfolioFooter, PortfolioHeader } from './PortfolioChrome'
import './portfolio.css'

const wallImages = [
  ['cosmic-zen', 'presentsphere', 'russound-digital-experience', 'renamerly'],
  ['ascension-roofing', 'codorus-web', 'little-portal-studio', 'presentsphere'],
  ['honeyden', 'rift-riders', 'russound-learning-course', 'cosmic-zen'],
]

function useChoreography(root: React.RefObject<HTMLDivElement | null>, paused: boolean) {
  useEffect(() => {
    const element = root.current
    if (!element) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const hero = element.querySelector<HTMLElement>('.folio-hero')
    const band = element.querySelector<HTMLElement>('.folio-band')
    let frame = 0,
      previous = 0,
      current = 0,
      target = 0
    let active = true
    const reset = () => {
      cancelAnimationFrame(frame)
      frame = 0
      current = target = 0
      element.style.setProperty('--pointer', '0')
      element.style.setProperty('--hero-travel', '0px')
      element.style.setProperty('--wall-turn', '-18deg')
      element.style.setProperty('--band-travel', '0px')
    }
    const enabled = () => !paused && !reduced.matches && !document.hidden
    const tick = (time: number) => {
      frame = 0
      if (!enabled() || !active) return
      const delta = Math.min(time - previous || 16, 64)
      previous = time
      current += (target - current) * (1 - Math.exp(-delta / 180))
      element.style.setProperty('--pointer', current.toFixed(4))
      if (Math.abs(target - current) > 0.001) frame = requestAnimationFrame(tick)
    }
    const request = () => {
      if (!frame && enabled() && active) {
        previous = 0
        frame = requestAnimationFrame(tick)
      }
    }
    const move = (event: PointerEvent) => {
      if (!enabled() || !pointer.matches || !hero) return
      const bounds = hero.getBoundingClientRect()
      target = Math.max(-0.9, Math.min(0.9, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
      request()
    }
    const leave = () => {
      target = 0
      request()
    }
    const scroll = () => {
      if (!enabled()) return
      if (hero) {
        const bounds = hero.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, -bounds.top / bounds.height))
        element.style.setProperty('--hero-travel', `${progress * 100}px`)
        element.style.setProperty('--wall-turn', `${-18 + progress * 7}deg`)
      }
      if (band) {
        const bounds = band.getBoundingClientRect()
        if (bounds.bottom > 0 && bounds.top < innerHeight) {
          const progress = Math.max(
            0,
            Math.min(1, (innerHeight - bounds.top) / (innerHeight + bounds.height))
          )
          element.style.setProperty('--band-travel', `${(progress - 0.5) * 110}px`)
        }
      }
    }
    const modeChange = () => {
      reset()
      scroll()
    }
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      if (!active) {
        cancelAnimationFrame(frame)
        frame = 0
      } else request()
    })
    if (hero) observer.observe(hero)
    hero?.addEventListener('pointermove', move)
    hero?.addEventListener('pointerleave', leave)
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('resize', scroll, { passive: true })
    document.addEventListener('visibilitychange', modeChange)
    reduced.addEventListener('change', modeChange)
    pointer.addEventListener('change', modeChange)
    scroll()
    return () => {
      reset()
      observer.disconnect()
      hero?.removeEventListener('pointermove', move)
      hero?.removeEventListener('pointerleave', leave)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('resize', scroll)
      document.removeEventListener('visibilitychange', modeChange)
      reduced.removeEventListener('change', modeChange)
      pointer.removeEventListener('change', modeChange)
    }
  }, [root, paused])
}

function MediaWall() {
  return (
    <div className="media-wall" aria-hidden="true">
      <div className="media-wall-scroll">
        <div className="media-wall-plane">
          {wallImages.map((row, index) => (
            <div className={`media-wall-row media-wall-row-${index}`} key={index}>
              {row.map((slug, i) => (
                <div className={`media-wall-tile wall-${slug}`} key={`${slug}-${i}`}>
                  <Image
                    src={portfolioProjects.find((project) => project.id === slug)!.image.src}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 180px, 340px"
                    loading={index === 1 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Hero({
  direction,
  paused,
  setPaused,
}: {
  direction: 'archive' | 'fieldnotes'
  paused: boolean
  setPaused: (value: boolean) => void
}) {
  return (
    <section className="folio-hero" aria-labelledby="folio-title">
      {direction === 'archive' && <MediaWall />}
      <div className="folio-hero-copy">
        <div className="folio-identity">
          <span>Joey Kubalak</span>
          <span>Software engineer & creative maker</span>
        </div>
        <h1 id="folio-title">
          {direction === 'archive' ? (
            <>
              Useful things.
              <br />
              <span>Unexpected</span>
              <br />
              worlds.
            </>
          ) : (
            <>
              A practical mind.
              <br />
              <span>A curious streak.</span>
            </>
          )}
        </h1>
        <div className="folio-hero-bottom">
          <p>
            I build thoughtful software and bring imaginative digital worlds to life. This is where
            those two sides meet.
          </p>
          <a className="folio-button" href="#work">
            Explore the work <ArrowDown size={19} />
          </a>
        </div>
      </div>
      {direction === 'fieldnotes' && (
        <>
          <GeometryMark className="fieldnotes-geometry" />
          <div className="fieldnotes-contact-sheet">
            {['presentsphere', 'cosmic-zen', 'sugarplum-bakery'].map((slug, i) => (
              <Link href={`/work/${slug}`} key={slug} className={`sheet-image sheet-image-${i}`}>
                <Image
                  src={`/portfolio/2026/${slug}.webp`}
                  alt={
                    i === 0
                      ? 'PresentSphere family gifting product'
                      : i === 1
                        ? 'Cosmic Zen Collections artwork'
                        : 'Sugarplum Bakery animated world'
                  }
                  fill
                  sizes="(max-width: 600px) 50vw, 40vw"
                  loading="eager"
                />
                <span>
                  {['Useful by design', 'Curious by nature', 'Made to feel something'][i]}
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
      <div className="folio-hero-foot">
        <span>
          Pennsylvania, USA <span className="folio-foot-separator">/</span> Building with curiosity.
        </span>
        <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>
          {paused ? <Play size={14} /> : <Pause size={14} />}
          <span>{paused ? 'Resume artwork' : 'Pause artwork'}</span>
        </button>
      </div>
    </section>
  )
}

function Feature({ project, flip = false }: { project: PortfolioProject; flip?: boolean }) {
  return (
    <article className={`folio-feature ${flip ? 'folio-feature-flip' : ''}`}>
      <Link href={`/work/${project.id}`} className="folio-feature-image">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 760px) 100vw, 63vw"
        />
      </Link>
      <div className="folio-feature-copy">
        <div className="folio-project-meta">
          <span>{project.kind}</span>
          <span>{project.year}</span>
        </div>
        <h3>
          <Link href={`/work/${project.id}`}>{project.title}</Link>
        </h3>
        <p>{project.description}</p>
        <div className="folio-tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Link className="folio-text-link" href={`/work/${project.id}`}>
          Inside the project <ArrowUpRight size={19} />
        </Link>
      </div>
    </article>
  )
}

export default function PortfolioPage({
  direction = 'archive',
}: {
  direction?: 'archive' | 'fieldnotes'
}) {
  const root = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  useChoreography(root, paused)
  const featured = ['presentsphere', 'russound-digital-experience', 'ascension-roofing']
    .map((id) => portfolioProjects.find((project) => project.id === id))
    .filter((project): project is PortfolioProject => Boolean(project))
  return (
    <div className={`folio folio-${direction}`} ref={root} data-motion-paused={paused}>
      <PortfolioHeader direction={direction} />
      <main id="main-content" tabIndex={-1}>
        {direction === 'fieldnotes' && <DirectionSwitch direction={direction} />}
        <Hero direction={direction} paused={paused} setPaused={setPaused} />
        <div className="folio-intro folio-container">
          <GeometryMark />
          <p>
            Good engineering makes it work.
            <br />
            <span>A little imagination makes it yours.</span>
          </p>
          <Link className="folio-text-link" href="/work">
            Explore {portfolioProjects.length} selected projects <ArrowDown size={18} />
          </Link>
        </div>
        <section
          className="folio-selected folio-container"
          id="work"
          aria-labelledby="selected-title"
        >
          <div className="folio-section-heading">
            <h2 id="selected-title">
              A few ways
              <br />
              curiosity takes shape<span>.</span>
            </h2>
            <p>
              Open a story to see the product decisions, technical constraints and details that
              brought the work together.
            </p>
          </div>
          {featured.map((project, index) => (
            <Feature key={project.id} project={project} flip={index === 1} />
          ))}
        </section>
        <div className="folio-band" aria-hidden="true">
          <div>
            Practical mind. <GeometryMark /> Curious streak.
          </div>
          <div>
            Built with intent. <GeometryMark /> Made to explore.
          </div>
        </div>
        <section className="folio-home-worlds folio-container" aria-labelledby="worlds-title">
          <div className="folio-section-heading">
            <h2 id="worlds-title">
              Leave room
              <br />
              for wonder<span>.</span>
            </h2>
            <p>
              The creative side of the practice: characters, places and a game worth learning to
              play.
            </p>
          </div>
          <div className="folio-home-world-grid">
            {['cosmic-zen', 'little-portal-studio', 'rift-riders'].map((id) => {
              const project = portfolioProjects.find((item) => item.id === id)!
              return (
                <article key={id}>
                  <Link className={`folio-card-image cover-${id}`} href={`/work/${id}`}>
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                    />
                  </Link>
                  <h3>
                    <Link href={`/work/${id}`}>
                      {project.title} <ArrowUpRight size={18} />
                    </Link>
                  </h3>
                  <p>{project.kind}</p>
                </article>
              )
            })}
          </div>
          <Link className="folio-text-link" href="/work">
            Explore all selected work <ArrowUpRight size={18} />
          </Link>
        </section>
        <section className="folio-about folio-container" id="about" aria-labelledby="about-title">
          <div>
            <GeometryMark />
            <h2 id="about-title">
              There’s a person
              <br />
              behind the pixels.
            </h2>
          </div>
          <div>
            <p className="folio-about-lead">
              I’m Joey. Treez is the creative side of the same brain.
            </p>
            <p>
              I’m a Pennsylvania-based software engineer with a background in information security.
              I work across product design and development, taking projects through the details that
              turn an idea into something people can use.
            </p>
            <Link className="folio-text-link" href="/about">
              A little more about me <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
        <PortfolioCTA />
      </main>
      <PortfolioFooter />
    </div>
  )
}
