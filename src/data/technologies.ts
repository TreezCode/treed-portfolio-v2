export interface Technology {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools'
  icon?: string // Optional icon path for future decal implementation
}

export const technologies: Technology[] = [
  // Frontend
  { name: 'HTML 5', category: 'frontend' },
  { name: 'CSS 3', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Three.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Redux', category: 'frontend' },
  { name: 'WordPress', category: 'frontend' },
  { name: 'Shopify', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'Firebase', category: 'backend' },
  
  // Database
  { name: 'MongoDB', category: 'database' },
  { name: 'MySQL', category: 'database' },
  
  // Tools & Security
  { name: 'Git', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'Metasploit', category: 'tools' },
  { name: 'Burp Suite', category: 'tools' },
  { name: 'Wireshark', category: 'tools' },
  { name: 'Nmap', category: 'tools' },
  { name: 'Nessus', category: 'tools' },
  { name: 'Kali Linux', category: 'tools' },
  { name: 'Stable Diffusion', category: 'tools' },
  { name: 'Windsurf (AI IDE)', category: 'tools' },
  { name: 'MCP Integration', category: 'tools' },
]
