import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'
import { allPortfolioProjects, getProject } from '@/data/portfolio'

export const socialImageSize = { width: 1200, height: 630 }

type SocialCard = { title: string; subtitle: string; label: string; image?: string; path: string }

const pages: Record<string, SocialCard> = {
  home: {
    title: 'Joey Kubalak',
    subtitle: 'Useful things. Unexpected worlds.',
    label: 'Software engineer & creative maker',
    path: 'buildwithtreez.com',
  },
  work: {
    title: 'The work, up close.',
    subtitle: 'Useful software, thoughtful websites and imagined worlds.',
    label: 'Selected work',
    image: '/portfolio/2026/presentsphere.webp',
    path: 'buildwithtreez.com/work',
  },
  about: {
    title: 'A practical mind.\nA curious streak.',
    subtitle: 'Meet Joey Kubalak. Software engineer and creative maker.',
    label: 'About Joey',
    path: 'buildwithtreez.com/about',
  },
  contact: {
    title: 'Let’s build something.',
    subtitle: 'Engineering opportunities, product ideas and creative collaboration.',
    label: 'Contact Joey',
    path: 'buildwithtreez.com/contact',
  },
  playground: {
    title: 'Follow your curiosity.',
    subtitle: 'Make a print. Wake a world. Spin a gallery.',
    label: 'The Playground',
    image: '/portfolio/portal-keeper/observatory.png',
    path: 'buildwithtreez.com/playground',
  },
  'geometry-bench': {
    title: 'The Geometry Bench.',
    subtitle: 'Shape a bloom, explore an orbit or twist a portal. Keep what you make.',
    label: 'An interactive geometry instrument',
    image: '/portfolio/geometry-bench-poster.svg',
    path: 'buildwithtreez.com/playground/geometry-bench',
  },
  'portal-keeper': {
    title: 'The Portal Keeper.',
    subtitle: 'Turn mirrors. Follow the light. Wake a sleeping observatory.',
    label: 'A little puzzle adventure',
    image: '/portfolio/portal-keeper/observatory.png',
    path: 'buildwithtreez.com/play/portal-keeper',
  },
  'portal-keeper-story': {
    title: 'Building a playable world.',
    subtitle: 'Inside The Portal Keeper, an original Three.js puzzle.',
    label: 'The Portal Keeper / Case study',
    image: '/portfolio/portal-keeper/garden.png',
    path: 'buildwithtreez.com/work/portal-keeper',
  },
  privacy: {
    title: 'Your visit. Your choice.',
    subtitle: 'Privacy and analytics preferences for this portfolio.',
    label: 'Privacy',
    path: 'buildwithtreez.com/privacy',
  },
}

export const socialImageIds = [
  ...Object.keys(pages).filter((id) => id !== 'home'),
  ...allPortfolioProjects.map((project) => `project-${project.id}`),
]

function getCard(id: string): SocialCard | undefined {
  if (Object.hasOwn(pages, id)) return pages[id]
  if (!id.startsWith('project-')) return undefined
  const project = getProject(id.slice('project-'.length))
  if (!project) return undefined
  return {
    title: project.title,
    subtitle: project.description,
    label: project.kind,
    image: project.image.src,
    path: 'buildwithtreez.com / Selected work',
  }
}

function Geometry() {
  return (
    <svg width="360" height="360" viewBox="0 0 100 100" fill="none" stroke="#d5ed9b">
      <circle cx="50" cy="50" r="43" strokeWidth=".5" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <circle
          key={angle}
          cx="50"
          cy="29"
          r="21"
          strokeWidth=".5"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <path d="M50 8 86 71H14L50 8ZM50 92 14 29H86L50 92Z" strokeWidth=".35" />
    </svg>
  )
}

export async function createSocialImage(id: string) {
  const card = getCard(id)
  if (!card) return new Response('Image not found', { status: 404 })

  // Convert selected local artwork to one bounded PNG. No external fetch or crop.
  const art = card.image
    ? await sharp(await readFile(join(process.cwd(), 'public', card.image)))
        .resize(650, 440, { fit: 'inside', withoutEnlargement: true })
        .png()
        .toBuffer({ resolveWithObject: true })
    : undefined
  const titleSize = card.title.length > 36 ? 49 : card.title.length > 24 ? 55 : 66

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#191c1b',
        color: '#f4f1e7',
        fontFamily: 'Arial, sans-serif',
        padding: '38px 44px 30px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #424942',
          paddingBottom: 24,
        }}
      >
        <div style={{ display: 'flex', fontSize: 25, fontWeight: 700, letterSpacing: '-.05em' }}>
          buildwithtreez<span style={{ color: '#d5ed9b' }}>.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 17, color: '#b6bdb7' }}>
          Joey Kubalak / Living Archive
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 30 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: art ? 420 : 680,
            paddingRight: art ? 0 : 38,
          }}
        >
          <div
            style={{
              display: 'flex',
              color: '#d5ed9b',
              fontSize: 17,
              lineHeight: 1.35,
              marginBottom: 20,
            }}
          >
            {card.label}
          </div>
          <div
            style={{
              display: 'flex',
              fontWeight: 700,
              fontSize: art ? titleSize : 68,
              lineHeight: 1.02,
              letterSpacing: '-.045em',
              whiteSpace: 'pre-wrap',
            }}
          >
            {card.title}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              color: '#b6bdb7',
              fontSize: art ? 23 : 28,
              lineHeight: 1.35,
            }}
          >
            {card.subtitle}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: art ? 662 : 382,
            height: 438,
            background: '#232824',
            border: '1px solid #424942',
            borderRadius: 10,
            padding: 14,
          }}
        >
          {art ? (
            // The whole source fits inside the card; the container supplies the matte.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`data:image/png;base64,${art.data.toString('base64')}`}
              width={art.info.width}
              height={art.info.height}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <Geometry />
          )}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #424942',
          paddingTop: 16,
          color: '#b6bdb7',
          fontSize: 16,
        }}
      >
        <span>{card.path}</span>
        <span style={{ color: '#d5ed9b' }}>Explore the work ↗</span>
      </div>
    </div>,
    { ...socialImageSize, headers: { 'Cache-Control': 'public, max-age=86400' } }
  )
}
