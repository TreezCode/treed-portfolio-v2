import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import {
  allPortfolioProjects,
  portfolioProjects,
  indexablePortfolioProjects,
  studioReleases,
  getProject,
} from '@/data/portfolio'
import { PortfolioFooter, PortfolioHeader } from '@/components/portfolio/PortfolioChrome'
import '@/components/portfolio/portfolio.css'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return allPortfolioProjects.map((project) => ({ slug: project.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: project.title,
    description: project.description,
    robots: indexablePortfolioProjects.some((item) => item.id === project.id)
      ? undefined
      : { index: false, follow: true },
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title: `${project.title} | Build With Treez`,
      description: project.description,
      url: `/work/${project.id}`,
      images: [{ url: project.image.src, alt: project.image.alt }],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  const isStudio = project.id === 'little-portal-studio'
  const isStudioRelease = studioReleases.some((item) => item.id === project.id)
  const related = (
    isStudioRelease ? [getProject('little-portal-studio')!, ...studioReleases] : portfolioProjects
  )
    .filter(
      (other) =>
        other.id !== project.id &&
        (project.group && !isStudio
          ? other.group === project.group || other.title === project.group
          : other.category === project.category)
    )
    .slice(0, 3)
  const video = project.links.find((link) => link.href.endsWith('.mp4'))
  const audio = project.links.find((link) => link.href.endsWith('.mp3'))
  return (
    <div className="folio folio-archive">
      <PortfolioHeader detail />
      <div className="folio-detail-header folio-container">
        <Link
          className="folio-text-link folio-detail-back"
          href={isStudioRelease ? '/work/little-portal-studio#collections' : '/#archive'}
        >
          <ArrowLeft size={17} />
          {isStudioRelease ? 'Little Portal Studio collections' : 'Selected work'}
        </Link>
        <h1>{project.title}</h1>
        <p className="folio-detail-summary">{project.description}</p>
        <dl className="folio-detail-facts">
          <div>
            <dt>The work</dt>
            <dd>{project.kind}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
        </dl>
      </div>
      <div className={`folio-container folio-detail-cover cover-${project.id}`}>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 760px) 100vw, 90vw"
          preload
        />
      </div>
      <section className="folio-detail-body folio-container" aria-labelledby="project-story">
        <div>
          <h2 id="project-story">Inside the project.</h2>
          <div className="folio-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div>
          {project.story.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {video && (
            <video
              controls
              playsInline
              preload="none"
              poster={project.image.src}
              aria-label={`${project.title} film`}
            >
              <source src={video.href} type="video/mp4" />
              Your browser cannot play this video. <a href={video.href}>Download the film</a>.
            </video>
          )}
          {audio && (
            <audio controls preload="none" aria-label={`${project.title} recording`}>
              <source src={audio.href} type="audio/mpeg" />
              Your browser cannot play this recording.{' '}
              <a href={audio.href}>Download the recording</a>.
            </audio>
          )}
          {project.links.length > 0 && (
            <div className="folio-detail-links">
              {project.links
                .filter((link) => link !== video && link !== audio)
                .map((link) => (
                  <a
                    className="folio-button"
                    href={link.href}
                    key={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {link.label}
                    <ArrowUpRight size={18} />
                  </a>
                ))}
            </div>
          )}
        </div>
      </section>
      {isStudio && (
        <section
          className="folio-studio-collection folio-container"
          id="collections"
          aria-labelledby="studio-collections-title"
        >
          <div className="folio-section-heading">
            <h2 id="studio-collections-title">
              Step inside the collection<span>.</span>
            </h2>
            <p>
              Eight released products, each with its own atmosphere and a practical place in a live
              stream.
            </p>
          </div>
          <div className="folio-studio-grid">
            {studioReleases.map((release) => (
              <article key={release.id}>
                <Link className="folio-card-image" href={`/work/${release.id}`}>
                  <Image
                    src={release.image.src}
                    alt={release.image.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </Link>
                <h3>
                  <Link href={`/work/${release.id}`}>{release.title}</Link>
                </h3>
                <p>{release.description}</p>
                <div className="folio-studio-links">
                  <Link className="folio-text-link" href={`/work/${release.id}`}>
                    Inside the release <ArrowUpRight size={16} />
                  </Link>
                  {release.links.slice(0, 2).map((link) => (
                    <a
                      className="folio-text-link"
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} <ArrowUpRight size={16} />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="folio-studio-studies">
            <h3>On the workbench.</h3>
            <p>Material and motion studies from the studio.</p>
            <Link className="folio-text-link" href="/work/paper-garden">
              Paper Garden <ArrowUpRight size={16} />
            </Link>
            <Link className="folio-text-link" href="/work/tinsel-tonight">
              Tinsel Tonight <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      )}
      {related.length > 0 && (
        <section className="folio-related folio-container" aria-labelledby="related-title">
          <h2 id="related-title">Keep exploring.</h2>
          <div className="folio-related-grid">
            {related.map((item) => (
              <article key={item.id}>
                <Link className="folio-card-image" href={`/work/${item.id}`}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, 33vw"
                  />
                </Link>
                <h3>
                  <Link href={`/work/${item.id}`}>{item.title}</Link>
                </h3>
              </article>
            ))}
          </div>
        </section>
      )}
      <PortfolioFooter />
    </div>
  )
}
