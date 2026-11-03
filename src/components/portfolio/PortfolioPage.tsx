'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Pause, Play, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { portfolioProjects } from '@/data/portfolio'
import type { PortfolioCategory, PortfolioProject } from '@/data/portfolio-types'
import { Contact } from '@/components/sections/Contact'
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
        <span className="folio-image-open">
          <ArrowUpRight size={24} />
        </span>
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

function ProjectArchive() {
  const [category, setCategory] = useState<PortfolioCategory | 'All work'>('All work')
  const [query, setQuery] = useState('')
  const categories = ['All work', 'Web & apps', 'Creative work', 'Tools & systems'] as const
  const shown = portfolioProjects.filter(
    (project) =>
      (category === 'All work' || project.category === category) &&
      `${project.title} ${project.description} ${project.group ?? ''} ${project.tags.join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase().trim())
  )
  return (
    <section
      className="folio-collection folio-container"
      id="archive"
      aria-labelledby="archive-title"
    >
      <div className="folio-section-heading">
        <h2 id="archive-title">
          Work worth exploring<span>.</span>
        </h2>
        <p>
          Client work, independent products, and the things I made because I wanted to see them
          exist.
        </p>
      </div>
      <div className="folio-archive-tools">
        <div className="folio-filters" role="group" aria-label="Filter projects">
          {categories.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {value}
              <span>
                {value === 'All work'
                  ? portfolioProjects.length
                  : portfolioProjects.filter((project) => project.category === value).length}
              </span>
            </button>
          ))}
        </div>
        <div className="folio-search">
          <Search size={18} />
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find something"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      <noscript>
        <style>{'.folio-archive-tools { display: none; }'}</style>
      </noscript>
      <p className="folio-results" aria-live="polite" aria-atomic="true">
        {shown.length} {shown.length === 1 ? 'project' : 'projects'}
        {query && ` matching “${query}”`}
      </p>
      <div className="folio-project-grid">
        {shown.map((project) => (
          <article key={project.id} className="folio-project-card">
            <Link className={`folio-card-image cover-${project.id}`} href={`/work/${project.id}`}>
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
              <span className="folio-image-open">
                <ArrowUpRight size={23} />
              </span>
            </Link>
            <div className="folio-project-meta">
              <span>{project.group || project.category}</span>
              <span>{project.year}</span>
            </div>
            <h3>
              <Link href={`/work/${project.id}`}>
                {project.title}
                <ArrowUpRight size={19} />
              </Link>
            </h3>
            <p>{project.description}</p>
            <span className="folio-project-kind">{project.kind}</span>
          </article>
        ))}
      </div>
      {shown.length === 0 && (
        <div className="folio-empty">
          <h3>No projects found.</h3>
          <p>Try a project name, a medium, or a technology.</p>
          <button
            className="folio-button"
            type="button"
            onClick={() => {
              setQuery('')
              setCategory('All work')
            }}
          >
            Show all work
          </button>
        </div>
      )}
    </section>
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
  const featured = ['presentsphere', 'russound-digital-experience']
    .map((id) => portfolioProjects.find((project) => project.id === id))
    .filter((project): project is PortfolioProject => Boolean(project))
  return (
    <div className={`folio folio-${direction}`} ref={root} data-motion-paused={paused}>
      <PortfolioHeader direction={direction} />
      {direction === 'fieldnotes' && <DirectionSwitch direction={direction} />}
      <Hero direction={direction} paused={paused} setPaused={setPaused} />
      <div className="folio-intro folio-container">
        <GeometryMark />
        <p>
          Good engineering makes it work.
          <br />
          <span>A little imagination makes it yours.</span>
        </p>
        <a className="folio-text-link" href="#archive">
          Explore {portfolioProjects.length} selected projects <ArrowDown size={18} />
        </a>
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
            A family product and an interactive audio experience. Two different problems, each
            carried from an idea into working software.
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
      <ProjectArchive />
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
            I’m a Pennsylvania-based software engineer with a background in information security. I
            work across product design and development, taking projects through the details that
            turn an idea into something people can use.
          </p>
          <p>
            Off the beaten path, you’ll find my animated worlds, original music, and a lasting
            fascination with sacred geometry. That curiosity carries into the software, too.
          </p>
          <dl className="folio-credentials">
            <div>
              <dt>Foundation</dt>
              <dd>
                A.A.S. Information Security
                <br />
                CompTIA Security+
              </dd>
            </div>
            <div>
              <dt>Practice</dt>
              <dd>
                TypeScript · React · Next.js
                <br />
                Creative development & motion
              </dd>
            </div>
          </dl>
          <a className="folio-text-link" href="/joey-kubalak-resume.pdf" download>
            Download my résumé <ArrowDown size={18} />
          </a>
        </div>
      </section>
      <Contact />
      <PortfolioFooter />
    </div>
  )
}
