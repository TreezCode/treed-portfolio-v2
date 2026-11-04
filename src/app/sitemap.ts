import type { MetadataRoute } from 'next'
import { indexablePortfolioProjects } from '@/data/portfolio'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://buildwithtreez.com',
      lastModified: new Date('2026-11-03'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...[
      'work',
      'playground',
      'playground/geometry-bench',
      'play/portal-keeper',
      'about',
      'contact',
      'privacy',
    ].map((path) => ({
      url: `https://buildwithtreez.com/${path}`,
      lastModified: new Date('2026-11-03'),
      changeFrequency: 'monthly' as const,
      priority: path === 'work' ? 0.9 : 0.6,
    })),
    ...indexablePortfolioProjects.map((project) => ({
      url: `https://buildwithtreez.com/work/${project.id}`,
      lastModified: new Date('2026-11-03'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
