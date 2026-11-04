import { creativeProjects } from './portfolio-creative'
import { developmentProjects } from './portfolio-development'
import { soundMadeClearProject } from './portfolio-sound-made-clear'
import { portalKeeperProject } from './portfolio-playground'
import type { PortfolioProject } from './portfolio-types'

// Russound's client website and motion work are withheld until the website launches.
// Its records remain in portfolio-russound.ts; restoration is documented in
// content/held-projects/russound/README.md. Keep it out of this public catalog
// so listings, detail routes, related work, analytics IDs and social cards agree.
export const allPortfolioProjects = [
  ...developmentProjects,
  soundMadeClearProject,
  portalKeeperProject,
  ...creativeProjects,
]

const selectedProjectIds = [
  'presentsphere',
  'portal-keeper',
  'codorus-web',
  'ascension-roofing',
  'honeyden',
  'renamerly',
  'russound-learning-course',
  'cosmic-zen',
  'little-portal-studio',
  'rift-riders',
  'local-knowledge-base',
  'vanilla-portfolio',
]

export const portfolioProjects = selectedProjectIds
  .map((id) => allPortfolioProjects.find((project) => project.id === id))
  .filter((project): project is PortfolioProject => Boolean(project))

const studioReleaseIds = [
  'sugarplum-bakery',
  'glasshouse',
  'north-pole-dispatch',
  'observatory',
  'prism-tide',
  'signal-fold',
  'winterlight-atelier',
  'merry-current',
]
export const studioReleases = studioReleaseIds
  .map((id) => allPortfolioProjects.find((project) => project.id === id))
  .filter((project): project is PortfolioProject => Boolean(project))

export const indexablePortfolioProjects = [...portfolioProjects, ...studioReleases]

export function getProject(id: string) {
  return allPortfolioProjects.find((project) => project.id === id)
}
