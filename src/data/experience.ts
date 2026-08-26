export type ExperienceKind = 'engineering' | 'additional' | 'education' | 'credential'

export interface Experience {
  kind: ExperienceKind
  title: string
  company: string
  date: string
  points: string[]
}

export const experiences: Experience[] = [
  {
    kind: 'engineering',
    title: 'Founder & Software Engineer',
    company: 'Codorus Web / Build With Treez',
    date: '2026 - Present',
    points: [
      'Own product strategy, interface design, implementation, verification, deployment, and maintenance across client and independent software.',
      'Built and launched the Ascension Roofing production rebuild and the standalone Codorus Web business platform.',
      'Translate privacy, authorization, analytics, migration, and recovery constraints into explicit engineering and release decisions.',
    ],
  },
  {
    kind: 'additional',
    title: 'Delivery Associate',
    company: 'Walmart',
    date: 'April 2023 - Present',
    points: [
      'Manage time-sensitive routes and customer issues while building products, delivering client work, and completing an information-security degree.',
    ],
  },
  {
    kind: 'education',
    title: 'Information Security, A.A.S.',
    company: 'Northampton Community College',
    date: 'September 2022 - May 2025',
    points: [
      'Dean\'s List every semester while working full-time.',
      'Coursework and labs in network defense, security operations, cryptography, vulnerability testing, and incident response.',
      'Also completed the University of Denver Full-Stack Web Development Bootcamp in 2019.',
    ],
  },
  {
    kind: 'credential',
    title: 'CompTIA Security+',
    company: 'CompTIA',
    date: 'Certified 2024 - 2027',
    points: [
      'Validated foundation across threats, secure architecture, security operations, identity, risk, and cryptography.',
    ],
  },
]
