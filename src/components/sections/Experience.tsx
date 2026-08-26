import { experiences } from '@/data/experience'

export function Experience() {
  const engineering = experiences.find((item) => item.kind === 'engineering')
  const additional = experiences.find((item) => item.kind === 'additional')
  const credentials = experiences.filter(
    (item) => item.kind === 'education' || item.kind === 'credential',
  )

  if (!engineering || !additional) return null

  return (
    <section
      id="experience"
      className="portfolio-section experience-section"
      aria-labelledby="experience-title"
    >
      <div className="portfolio-container">
        <header className="section-intro section-intro--split">
          <div>
            <span className="section-index" aria-hidden="true">
              03
            </span>
            <h2 id="experience-title" className="text-headline">
              Experience & credentials
            </h2>
          </div>
          <p>
            Independent engineering work is presented as professional experience, with the degree
            and certification that shape my secure-by-design approach.
          </p>
        </header>

        <div className="experience-layout">
          <article className="experience-primary">
            <div className="experience-meta">
              <p>{engineering.company}</p>
              <p>{engineering.date}</p>
            </div>
            <h3>{engineering.title}</h3>
            <ul>
              {engineering.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>

          <div className="credential-register">
            {credentials.map((item) => (
              <article key={item.title}>
                <div className="credential-register__meta">
                  <p>{item.company}</p>
                  <p>{item.date}</p>
                </div>
                <h3>{item.title}</h3>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <article className="additional-experience">
          <div>
            <p className="text-label">Additional experience</p>
            <h3>{additional.title}</h3>
            <p>{additional.company}</p>
          </div>
          <p>{additional.points[0]}</p>
          <p className="additional-experience__date">{additional.date}</p>
        </article>
      </div>
    </section>
  )
}
