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
    id: 'treecommerce',
    name: 'Treecommerce',
    description:
      "A simple, yet powerful ecommerce website built with the Next.js framework. Uses Sanity for content management, Auth0 for authentication, Stripe for payments, and Vercel for deployment. Provides a fast, secure, and scalable ecommerce solution.",
    tags: ['Next.js', 'Sanity', 'Stripe', 'Auth0', 'TypeScript'],
    sourceCode: 'https://github.com/TreezCode/treecommerce',
    liveDemo: 'https://treecommerce.vercel.app/',
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
  {
    id: 'react-click-game',
    name: 'React Click Game',
    description:
      'A web-based memory challenge built using React and deployed on GitHub Pages. Users must click on randomly generated images to test their memory skills. Images are repositioned randomly and users must click a different image to continue playing.',
    tags: ['React', 'Node.js', 'CSS'],
    sourceCode: 'https://github.com/TreezCode/React-Click-Game',
    liveDemo: 'https://iamtreez.com/React-Click-Game/',
    featured: false,
  },
]
