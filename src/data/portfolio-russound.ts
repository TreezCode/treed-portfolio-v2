import type { PortfolioProject } from './portfolio-types'

export const russoundProjects: PortfolioProject[] = [
  {
    id: 'russound-digital-experience',
    title: 'Russound Digital Experience',
    category: 'Web & apps',
    kind: 'Website concept',
    year: '2026',
    description:
      'A lifestyle-led audio experience, from the first listening moment to product discovery and a local dealer.',
    role: 'Creative direction, interface design and frontend development',
    image: {
      src: '/portfolio/2026/russound-digital.webp',
      alt: 'Russound website concept showing a listening scene, the Rooms app and music services',
    },
    tags: ['Astro', 'Interactive storytelling', 'Responsive design'],
    story: [
      'Whole-home audio brings together rooms, sources, controls and equipment. This website concept makes those relationships easier to explore through a clear product journey and interactive system explanations.',
      'The work includes responsive navigation, a system planner, model support, an authored listening scene and a visual handoff covering the buyer journey and proposed sitemap.',
      'Developed with Russound feedback and supplied product assets, with a documented handoff for the production implementation partner.',
    ],
    links: [
      {
        label: 'Explore the concept',
        href: 'https://russound-november-review.pages.dev/handoff-review/',
      },
    ],
    group: 'Russound',
    featured: true,
  },
  {
    id: 'russound-learning-course',
    title: 'Sound, Made Clear',
    category: 'Web & apps',
    kind: 'Interactive learning course',
    year: '2026',
    description:
      'An audio field guide that turns system diagrams into hands-on lessons, practical activities and explained quizzes.',
    role: 'Learning experience design, original diagrams and frontend development',
    image: {
      src: '/portfolio/2026/russound-course.webp',
      alt: 'Sound, Made Clear course cover with an illustrated audio signal path',
    },
    tags: ['Educational design', 'Interactive diagrams', 'JavaScript'],
    story: [
      'Six self-study lessons move from audio fundamentals through one-room and whole-home systems to a practical, sourced content brief. A final stage prepares the learner for a supervised review.',
      'Original diagrams separate audio signals from control commands. Scenario activities and explained quiz answers help connect the vocabulary to real decisions.',
      'The browser saves progress for each lesson. Printable recaps and complete static explanations keep the material useful across different study habits and devices.',
    ],
    links: [{ label: 'Open the course', href: 'https://russound-learning-course.pages.dev/' }],
    group: 'Russound',
  },
  {
    id: 'russound-motion-studies',
    title: 'Music in the Room',
    category: 'Creative work',
    kind: 'Russound motion studies',
    year: '2026',
    description:
      'Architectural listening scenes, precise product details and musical motion that makes the invisible feel present.',
    role: 'Art direction, motion design and compositing',
    image: {
      src: '/portfolio/2026/russound-motion.webp',
      alt: 'Architectural listening-room study with warm musical contours and floating notes',
    },
    tags: ['Motion design', 'Compositing', 'Art direction'],
    story: [
      'A series of visual studies explores how to show the feeling of music throughout a home. Warm architectural scenes establish the experience, while authored musical gestures connect it to the listening space.',
      'The latest effects study animates individually composed notes across a contour field. Desktop and phone treatments preserve the people and the visual source of the music.',
      'Earlier website motion concepts pair silent films with editable page copy, playback controls and still alternatives.',
    ],
    links: [
      {
        label: 'View the earlier motion concept',
        href: 'https://russound-design-review.pages.dev/motion',
      },
    ],
    group: 'Russound',
  },
]
