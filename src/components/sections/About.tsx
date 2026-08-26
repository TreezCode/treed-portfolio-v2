import { MotionSequence } from '@/components/animations/MotionSystem'

const principles = [
  {
    index: '01',
    title: 'Product judgment',
    description:
      'I translate user needs, business constraints, and interface decisions into one shippable product contract.',
    evidence:
      'Discovery, information architecture, interaction design, and implementation stay connected.',
  },
  {
    index: '02',
    title: 'Security in the architecture',
    description:
      'Authorization, privacy, validation, and recovery are designed into the system instead of added after the interface is finished.',
    evidence:
      'Security+ foundation, Postgres RLS, threat modeling, PII boundaries, and secure release practices.',
  },
  {
    index: '03',
    title: 'Proof before claims',
    description:
      'I treat verification and honest outcome boundaries as part of the work, not as cleanup before a launch.',
    evidence:
      'Type checks, browser tests, accessibility review, release gates, rollback plans, and post-launch measurement.',
  },
] as const

const workingSet = [
  {
    label: 'Core engineering',
    value: 'TypeScript, React, Next.js, Node.js, PostgreSQL, Supabase',
  },
  {
    label: 'Interface & delivery',
    value: 'HTML, CSS, Astro, Three.js, Playwright, Figma, Vercel, Netlify',
  },
  {
    label: 'Security practice',
    value: 'Row Level Security, threat modeling, WebAuthn, Burp Suite, Wireshark, Nmap',
  },
] as const

export function About() {
  return (
    <section
      id="approach"
      className="portfolio-section approach-section"
      aria-labelledby="approach-title"
    >
      <div className="portfolio-container">
        <MotionSequence as="header" className="section-intro section-intro--split">
          <div data-motion-item>
            <span className="section-index" aria-hidden="true">
              02
            </span>
            <h2 id="approach-title" className="text-headline">
              How I engineer
            </h2>
          </div>
          <p data-motion-item>
            I&apos;m Joey Kubalak, a product-minded software engineer who cares about how a system
            feels, how it fails, and how confidently it can be released.
          </p>
        </MotionSequence>

        <MotionSequence
          as="ol"
          className="principle-register"
          staggerDelay={0.085}
          viewportAmount={0.15}
        >
          {principles.map((principle) => (
            <li key={principle.index} data-motion-item>
              <span className="principle-register__index" aria-hidden="true">
                {principle.index}
              </span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
                <p className="principle-register__evidence">{principle.evidence}</p>
              </div>
            </li>
          ))}
        </MotionSequence>

        <MotionSequence className="working-set" distance={16}>
          <div className="working-set__intro" data-motion-item>
            <p className="text-label">Working set</p>
            <p>
              Tools are selected for the product and its constraints. These are the ones carrying
              the current body of work.
            </p>
          </div>
          <MotionSequence
            as="dl"
            direction="right"
            distance={10}
            duration={0.52}
            staggerDelay={0.06}
          >
            {workingSet.map((group) => (
              <div key={group.label} data-motion-item>
                <dt>{group.label}</dt>
                <dd>{group.value}</dd>
              </div>
            ))}
          </MotionSequence>
        </MotionSequence>
      </div>
    </section>
  )
}
