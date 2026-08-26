import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://buildwithtreez.com/sitemap.xml',
    host: 'https://buildwithtreez.com',
  }
}
