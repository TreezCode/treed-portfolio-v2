import type { PortfolioProject } from './portfolio-types'

// Public educational work, retained with owner approval during the client-site hold.
export const soundMadeClearProject: PortfolioProject = {
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
}
