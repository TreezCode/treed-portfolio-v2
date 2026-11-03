import type { MetadataRoute } from 'next'
import { indexablePortfolioProjects } from '@/data/portfolio'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://buildwithtreez.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...indexablePortfolioProjects.map((project) => ({
      url: `https://buildwithtreez.com/work/${project.id}`,
      lastModified: new Date('2026-11-03'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
