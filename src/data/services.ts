export interface Service {
  title: string
  description: string
  icon: string
}

export const services: Service[] = [
  {
    title: 'Full-Stack Developer',
    description: 'Building secure, scalable web applications with React, Next.js, Node.js, and modern databases',
    icon: 'Globe',
  },
  {
    title: 'Security-Focused Development',
    description: 'CompTIA Security+ certified with hands-on experience in Metasploit, Burp Suite, and secure coding practices',
    icon: 'Zap',
  },
  {
    title: 'Frontend Specialist',
    description: 'Creating responsive, SEO-optimized interfaces with React, TypeScript, and immersive 3D experiences using Three.js',
    icon: 'Code',
  },
  {
    title: 'CMS & E-Commerce',
    description: 'Expert in WordPress, Shopify, and headless CMS solutions for dynamic content management',
    icon: 'Palette',
  },
]
