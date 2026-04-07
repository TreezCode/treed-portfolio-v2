export interface Service {
  title: string
  description: string
  icon: string
}

export const services: Service[] = [
  {
    title: 'Web Developer',
    description: 'Building responsive, performant web applications with modern technologies',
    icon: 'Globe',
  },
  {
    title: 'MERN Stack Developer',
    description: 'Full-stack development using MongoDB, Express, React, and Node.js',
    icon: 'Zap',
  },
  {
    title: 'Frontend Developer',
    description: 'Creating intuitive user interfaces with React, Next.js, and TypeScript',
    icon: 'Code',
  },
  {
    title: 'UI/UX Developer',
    description: 'Designing and implementing user-centered digital experiences',
    icon: 'Palette',
  },
]
