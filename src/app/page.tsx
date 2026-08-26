import { About, Contact, Experience, Projects } from '@/components/sections'
import { HeroScene } from '@/components/three/HeroScene'
import { MotionSequence, ScrollProgress } from '@/components/animations/MotionSystem'

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 2v10m-4-4 4 4 4-4M3 16h14" />
    </svg>
  )
}

function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <HeroScene />

      <div className="portfolio-container hero__inner">
        <MotionSequence
          className="hero__copy"
          trigger="load"
          distance={24}
          duration={0.76}
          staggerDelay={0.075}
        >
          <div className="hero__identity" data-motion-item>
            <span>Joey Kubalak</span>
            <span aria-hidden="true">/</span>
            <span>Software Engineer</span>
          </div>

          <h1 id="hero-title" className="text-display" data-motion-item>
            I build secure, high-craft web products.
          </h1>

          <p className="hero__summary" data-motion-item>
            Product-minded software engineer shipping TypeScript applications and production
            websites with React, Next.js, thoughtful UX, and security built into the architecture.
          </p>

          <div className="hero__actions" data-motion-item>
            <a className="button-primary" href="#work">
              View case studies
              <ArrowIcon />
            </a>
            <a
              className="button-secondary"
              href="/joey-kubalak-resume.pdf"
              download="Joey-Kubalak-Software-Engineer-Resume.pdf"
            >
              Download resume
              <DownloadIcon />
            </a>
          </div>

          <div
            className="hero__proof"
            aria-label="Professional credentials and availability"
            data-motion-item
          >
            <span>CompTIA Security+</span>
            <span>A.A.S. Information Security</span>
            <span>Pennsylvania · Remote</span>
          </div>

          <nav className="hero__profiles" aria-label="Professional profiles" data-motion-item>
            <a href="https://github.com/TreezCode" target="_blank" rel="noreferrer">
              GitHub
              <ArrowIcon />
            </a>
            <a href="https://www.linkedin.com/in/joey-kubalak" target="_blank" rel="noreferrer">
              LinkedIn
              <ArrowIcon />
            </a>
            <a href="mailto:jkubalak.dev@gmail.com">Email</a>
          </nav>
        </MotionSequence>
      </div>

      <a className="hero__handoff" href="#work">
        <span>Selected evidence</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}

export default function Home() {
  return (
    <div className="portfolio-page">
      <ScrollProgress />
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Contact />
    </div>
  )
}
