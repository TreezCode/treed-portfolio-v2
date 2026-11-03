'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { portfolioProjects } from '@/data/portfolio'
import type { PortfolioCategory } from '@/data/portfolio-types'

export default function ProjectCollection() {
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
      <h2 id="archive-title" className="sr-only">
        Selected projects
      </h2>
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
