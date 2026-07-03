export interface Service {
  title: string
  description: string
  icon: string
}

export const services: Service[] = [
  {
    title: 'Full-Stack Development',
    description: 'Secure, scalable apps with React, Next.js, and Node.js',
    icon: 'Globe',
  },
  {
    title: 'Security-First Engineering',
    description: 'CompTIA Security+ certified; secure coding and pen-test tooling',
    icon: 'Zap',
  },
  {
    title: 'Front-End & 3D',
    description: 'Responsive interfaces and immersive WebGL with Three.js',
    icon: 'Code',
  },
  {
    title: 'CMS & E-Commerce',
    description: 'WordPress and Shopify builds that clients run themselves',
    icon: 'Palette',
  },
]
