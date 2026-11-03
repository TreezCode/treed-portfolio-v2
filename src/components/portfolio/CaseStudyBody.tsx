import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { PortfolioCaseStudy } from '@/data/portfolio-case-types'
import { SharingExample, FilenameExample } from './CaseDemos'
import { caseImageSizes } from '@/data/portfolio-case-image-sizes'

export default function CaseStudyBody({ study }: { study: PortfolioCaseStudy }) {
  const hasDemo = ['presentsphere', 'renamerly'].includes(study.projectId)
  return (
    <div className={`folio-case-layout folio-container case-${study.projectId}`}>
      <nav className="folio-case-nav" aria-label="In this project">
        <span>Inside the project</span>
        <a href="#the-challenge">The challenge</a>
        {hasDemo && <a href="#interactive-example">Try the idea</a>}
        <a href="#the-decisions">The decisions</a>
        {study.gallery?.length ? <a href="#a-closer-look">A closer look</a> : null}
        <a href="#the-delivery">The delivery</a>
      </nav>
      <div className="folio-case-main">
        <section
          id="the-challenge"
          className="folio-case-introduction"
          aria-labelledby="challenge-heading"
        >
          <p className="folio-case-lede">{study.introduction}</p>
          <div className="folio-case-challenge">
            <h2 id="challenge-heading">The challenge.</h2>
            <p>{study.challenge}</p>
          </div>
        </section>
        {study.projectId === 'presentsphere' && <SharingExample />}
        {study.projectId === 'renamerly' && <FilenameExample />}
        <section
          className="folio-case-decisions"
          id="the-decisions"
          aria-labelledby="decisions-heading"
        >
          <h2 id="decisions-heading">
            Decisions that
            <br />
            shaped the work.
          </h2>
          {study.decisions.map((decision) => (
            <div className="folio-case-decision" key={decision.title}>
              <h3>{decision.title}</h3>
              <p>{decision.body}</p>
            </div>
          ))}
        </section>
        {study.flow && (
          <section className="folio-case-flow" aria-labelledby="flow-heading">
            <h2 id="flow-heading">{study.flow.title}</h2>
            <p>{study.flow.introduction}</p>
            <ol>
              {study.flow.steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </section>
        )}
        {study.gallery?.length ? (
          <section
            className="folio-case-gallery"
            id="a-closer-look"
            aria-labelledby="gallery-heading"
          >
            <h2 id="gallery-heading">A closer look.</h2>
            {study.gallery.map((item, index) => (
              <figure key={item.src}>
                <a
                  className="folio-case-gallery-image"
                  href={item.src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open full image: ${item.alt}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    {...caseImageSizes[item.src]}
                    sizes={
                      ['presentsphere', 'honeyden'].includes(study.projectId)
                        ? '(max-width: 760px) 100vw, 36vw'
                        : '(max-width: 900px) 100vw, 72vw'
                    }
                  />
                </a>
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item.caption}</p>
                  <a
                    href={item.src}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View full image ${index + 1}`}
                  >
                    <ArrowUpRight size={20} />
                  </a>
                </figcaption>
              </figure>
            ))}
          </section>
        ) : null}
        <section
          className="folio-case-delivery"
          id="the-delivery"
          aria-labelledby="delivery-heading"
        >
          <h2 id="delivery-heading">{study.delivery.title}</h2>
          <p>{study.delivery.body}</p>
          {study.reflection && (
            <div className="folio-case-reflection">
              <h3>What I take forward.</h3>
              <p>{study.reflection}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
