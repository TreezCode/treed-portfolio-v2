export type ProjectCategory = 'fullstack' | 'client' | 'frontend'

export const projectCategories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full-Stack Apps' },
  { id: 'client', label: 'Client Sites' },
  { id: 'frontend', label: 'Front-End & 3D' },
]

export interface Project {
  id: string
  name: string
  description: string
  category: ProjectCategory
  tags: string[]
  image?: string
  sourceCode?: string
  liveDemo?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: '3d-portfolio',
    name: '3D Portfolio',
    description:
      'This site: a single-page portfolio built around real-time sacred geometry in Three.js, with Framer Motion choreography and a token-driven design system.',
    category: 'frontend',
    tags: ['Next.js', 'Three.js', 'TypeScript'],
    sourceCode: 'https://github.com/TreezCode/treed-portfolio-v2',
    liveDemo: 'https://buildwithtreez.com/',
    featured: true,
  },
  {
    id: 'presentsphere',
    name: 'PresentSphere',
    description:
      'A private gift-planning app for families: wishlists, hints, and surprise-safe coordination, secured end-to-end with Postgres Row Level Security.',
    category: 'fullstack',
    tags: ['Next.js', 'Supabase', 'Stripe', 'TypeScript'],
    liveDemo: 'https://presentsphere.com',
    featured: true,
  },
  {
    id: 'renamerly',
    name: 'Renamerly',
    description:
      'A browser-based SaaS that batch renames product images for e-commerce teams, entirely client-side, with Stripe billing and a drag-and-drop format builder.',
    category: 'fullstack',
    tags: ['Next.js', 'Supabase', 'Stripe', 'Zustand'],
    liveDemo: 'https://renamerly.com',
    featured: true,
  },
  {
    id: 'ascension-roofing',
    name: 'Ascension Roofing Colorado',
    description:
      'Marketing site for a Colorado roofing company: designed in Figma, built in WordPress with dynamic service-area pages that drive local SEO.',
    category: 'client',
    tags: ['WordPress', 'Figma', 'SEO'],
    liveDemo: 'https://ascensionroofingcolorado.com/',
    featured: true,
  },
  {
    id: 'florida-fungi',
    name: 'Florida Fungi Farm',
    description:
      "Shopify storefront for a gourmet mushroom farm, with custom Liquid sections and an SEO strategy that launched the client's online business.",
    category: 'client',
    tags: ['Shopify', 'Liquid', 'SEO'],
    featured: true,
  },
  {
    id: 'vanilla-portfolio',
    name: 'Vanilla JS Portfolio',
    description:
      'A framework-free portfolio in pure JavaScript, HTML, and CSS, proving the fundamentals without a build step.',
    category: 'frontend',
    tags: ['JavaScript', 'HTML', 'CSS'],
    sourceCode: 'https://github.com/TreezCode/TreezCode.github.io',
    liveDemo: 'https://iamtreez.com/',
    featured: false,
  },
]
