import type { PortfolioProject } from './portfolio-types'

// Reuses the approved content and imagery from the dedicated case study.
export const portalKeeperProject: PortfolioProject = {
  id: 'portal-keeper',
  title: 'The Portal Keeper',
  category: 'Creative work',
  kind: 'Original browser puzzle',
  year: '2026',
  description:
    'Turn two mirrors, follow the light and wake a sleeping observatory. An original browser puzzle built with Three.js.',
  role: 'Creative direction, game design and development',
  image: {
    src: '/portfolio/portal-keeper/observatory.png',
    alt: 'The Sleeping Observatory, an original green and brass miniature with two mirror instruments, a patterned lens and a dark portal',
  },
  tags: ['Three.js', 'React Three Fiber', 'TypeScript', 'Game design'],
  story: [
    'A little world with a reason to explore it. Turn two mirrors, follow the light and wake a sleeping observatory.',
    'Calculated light reflections, procedural worldbuilding and one puzzle model shared by 3D and flat views.',
  ],
  links: [{ label: 'Play The Portal Keeper', href: '/play/portal-keeper' }],
}
