export type PortfolioCategory = 'Web & apps' | 'Creative work' | 'Tools & systems'

export type PortfolioProject = {
  id: string
  title: string
  category: PortfolioCategory
  kind: string
  year: string
  description: string
  role: string
  image: { src: string; alt: string }
  tags: string[]
  story: string[]
  links: { label: string; href: string }[]
  group?: string
  featured?: boolean
}
