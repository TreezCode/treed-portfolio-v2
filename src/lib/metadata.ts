import type { Metadata } from 'next'

export const SITE_URL = 'https://buildwithtreez.com'
export const SITE_NAME = 'Joey Kubalak Portfolio'

type PageMetadata = {
  title: string
  description: string
  path: string
  image?: { url: string; alt: string }
  noIndex?: boolean
}

// Set both social formats explicitly. Nested metadata does not merge field by field.
export function createPageMetadata({
  title,
  description,
  path,
  image = { url: '/opengraph-image', alt: 'Joey Kubalak, software engineer and creative maker' },
  noIndex = false,
}: PageMetadata): Metadata {
  const socialTitle = title.includes('Joey Kubalak') ? title : `${title} | Joey Kubalak`
  const socialImage = {
    url: image.url,
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: image.alt,
  }
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: path,
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [socialImage],
    },
  }
}
