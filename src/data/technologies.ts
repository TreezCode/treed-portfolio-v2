export interface Technology {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools'
  /** Core stack gets visual weight; everything else renders as a quiet secondary list. */
  core?: boolean
  icon?: string // Optional icon path for future decal implementation
}

export const technologies: Technology[] = [
  // Core stack - the tools that define the day-to-day work
  { name: 'TypeScript', category: 'frontend', core: true },
  { name: 'JavaScript', category: 'frontend', core: true },
  { name: 'React', category: 'frontend', core: true },
  { name: 'Next.js', category: 'frontend', core: true },
  { name: 'Three.js', category: 'frontend', core: true },
  { name: 'Tailwind CSS', category: 'frontend', core: true },
  { name: 'Node.js', category: 'backend', core: true },
  { name: 'Express', category: 'backend', core: true },
  { name: 'MongoDB', category: 'database', core: true },
  { name: 'MySQL', category: 'database', core: true },
  { name: 'WordPress', category: 'frontend', core: true },
  { name: 'Shopify', category: 'frontend', core: true },

  // Working knowledge - grouped quietly by category
  { name: 'HTML 5', category: 'frontend' },
  { name: 'CSS 3', category: 'frontend' },
  { name: 'Redux', category: 'frontend' },
  { name: 'Firebase', category: 'backend' },
  { name: 'Git', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'Metasploit', category: 'tools' },
  { name: 'Burp Suite', category: 'tools' },
  { name: 'Wireshark', category: 'tools' },
  { name: 'Nmap', category: 'tools' },
  { name: 'Kali Linux', category: 'tools' },
  { name: 'Stable Diffusion', category: 'tools' },
]
