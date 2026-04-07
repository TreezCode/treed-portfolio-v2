export interface Technology {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools'
  icon?: string // Optional icon path for future decal implementation
}

export const technologies: Technology[] = [
  { name: 'HTML 5', category: 'frontend' },
  { name: 'CSS 3', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Three.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Redux', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Git', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
]
