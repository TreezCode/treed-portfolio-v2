import Image from 'next/image'
import { projects, type Project } from '@/data/projects'

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

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4 10.5 3.5 3.5L16 5.5" />
    </svg>
  )
}

function ArtifactRegister({ project }: { project: Project }) {
  return (
    <div className="case-artifact" aria-label={`${project.name} ${project.artifact.label}`}>
      <div className="case-artifact__header">
        <span>{project.artifact.label}</span>
        <span aria-hidden="true">{project.index} / 05</span>
      </div>
      <dl className="case-artifact__grid">
        {project.artifact.values.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function ProjectCase({ project, position }: { project: Project; position: number }) {
  const isReversed = position % 2 === 1

  return (
    <article
      id={`case-${project.id}`}
      className="case-study"
      aria-labelledby={`case-title-${project.id}`}
    >
      <div className="case-study__heading">
        <span className="case-study__number" aria-hidden="true">
          {project.index}
        </span>
        <div>
          <p className="case-study__status">{project.status}</p>
          <h3 id={`case-title-${project.id}`}>{project.name}</h3>
          <p className="case-study__role">{project.role}</p>
        </div>
      </div>

      <div className="case-study__body">
        <div className={`case-study__visual ${isReversed ? 'lg:order-2' : ''}`}>
          <div className="case-study__image-frame">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(min-width: 1280px) 640px, (min-width: 1024px) 52vw, calc(100vw - 2rem)"
              className="case-study__image"
            />
          </div>
          <ArtifactRegister project={project} />
        </div>

        <div className={`case-study__content ${isReversed ? 'lg:order-1' : ''}`}>
          <p className="case-study__summary">{project.summary}</p>

          <div className="case-study__block">
            <h4>Problem</h4>
            <p>{project.problem}</p>
          </div>

          <div className="case-study__block">
            <h4>Decisions</h4>
            <ul>
              {project.decisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
          </div>

          <div className="case-study__block case-study__evidence">
            <h4>Verified evidence</h4>
            <ul>
              {project.evidence.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="case-study__boundary">
            <span>Evidence boundary</span>
            {project.outcomeBoundary}
          </p>

          <div className="case-study__stack" aria-label={`${project.name} technology stack`}>
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          {project.links.length > 0 && (
            <div className="case-study__links">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <ArrowIcon />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section id="work" className="portfolio-section work-section" aria-labelledby="work-title">
      <div className="portfolio-container">
        <header className="section-intro section-intro--split">
          <div>
            <span className="section-index" aria-hidden="true">
              01
            </span>
            <h2 id="work-title" className="text-headline">
              Selected work
            </h2>
          </div>
          <p>
            Production launches, privacy-sensitive products, and developer tooling. Each record
            separates what shipped from what still needs to be proven.
          </p>
        </header>

        <div className="case-study-list">
          {projects.map((project, index) => (
            <ProjectCase key={project.id} project={project} position={index} />
          ))}
        </div>

        <div className="work-afterword">
          <p>
            Where source is public, the repositories show the systems, contracts, and engineering
            decisions behind the work.
          </p>
          <a href="https://github.com/TreezCode" target="_blank" rel="noreferrer">
            Browse GitHub
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
