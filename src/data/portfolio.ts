import { creativeProjects } from './portfolio-creative'
import { developmentProjects } from './portfolio-development'
import { russoundProjects } from './portfolio-russound'
import type { PortfolioProject } from './portfolio-types'

// Retain original records and detail URLs while the owner reviews the curated selection.
export const allPortfolioProjects = [
  ...developmentProjects,
  ...russoundProjects,
  ...creativeProjects,
]

const selectedProjectIds = [
  'presentsphere',
  'russound-digital-experience',
  'ascension-roofing',
  'codorus-web',
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
