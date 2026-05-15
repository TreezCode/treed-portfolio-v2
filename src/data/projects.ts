export interface Project {
  id: string
  name: string
  description: string
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
      "Designed and developed a front-end web developer portfolio showcasing clean design with interactive 3D elements using Three.js. Animated with Framer-motion and styled with Tailwind CSS for a minimalist touch. Implements sacred geometry patterns and immersive WebGL experiences.",
    tags: ['React', 'Next.js', 'Three.js', 'TypeScript', 'Tailwind CSS'],
    sourceCode: 'https://github.com/TreezCode/treed-portfolio-v2',
    liveDemo: 'https://buildwithtreez.com/',
    featured: true,
  },
  {
    id: 'presentsphere',
    name: 'PresentSphere',
    description:
      "A private gift-planning app for families and close friends. Members keep wishlists, birthdays, sizes, and gentle hints in one trusted place and coordinate gifts without ruining surprises. Surprise Mode hides buyer coordination from recipients, and every table runs under Postgres Row Level Security. Built end-to-end with a custom Warm Celebration design system.",
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind v4', 'shadcn/ui'],
    liveDemo: 'https://presentsphere.com',
    featured: true,
  },
  {
    id: 'renamerly',
    name: 'Renamerly',
    description:
      'A browser-based SaaS tool for e-commerce professionals to batch rename and organize product images in seconds. Features a drag-and-drop Format Builder with live preview, AI-generated alt text, CSV manifest export, and RAW file support - all processed client-side with no data leaving your device. Launched as a subscription product with Stripe billing and Supabase backend.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Zustand', 'Tailwind CSS'],
    liveDemo: 'https://renamerly.com',
    featured: true,
  },
  {
    id: 'ascension-roofing',
    name: 'Ascension Roofing Colorado',
    description:
      'Designed in Figma and built with Bricks Builder in WordPress, leveraging plugins like ACSS, Frames, ACF, and RankMath SEO. Implemented scalable architecture using custom post types and dynamic service area pages to enhance SEO. Led all phases of the project including development, hosting, SEO optimization, and ongoing maintenance.',
    tags: ['WordPress', 'Figma', 'Bricks Builder', 'SEO', 'ACF'],
    liveDemo: 'https://ascensionroofingcolorado.com/',
    featured: true,
  },
  {
    id: 'florida-fungi',
    name: 'Florida Fungi Farm',
    description:
      'Developed a fully responsive e-commerce site for gourmet and medicinal mushrooms using Shopify with custom Liquid code and WS Form. Managed end-to-end delivery: hosting, design, development, SEO strategy, and ongoing maintenance. Launched a professional online storefront that enabled the client to start a successful mushroom business in Florida.',
    tags: ['Shopify', 'Liquid', 'E-Commerce', 'SEO', 'Custom Forms'],
    featured: true,
  },
  {
    id: 'vanilla-portfolio',
    name: 'Vanilla JS Portfolio',
    description:
      'A static website built with Vanilla JS, highlighting front-end web development skills. Designed without using any JS frameworks, demonstrating proficiency in pure JavaScript coding.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    sourceCode: 'https://github.com/TreezCode/TreezCode.github.io',
    liveDemo: 'https://iamtreez.com/',
    featured: false,
  },
]
