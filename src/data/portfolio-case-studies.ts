import { productCaseStudies } from './case-studies-products'
import { clientCaseStudies } from './case-studies-client'
import { creativeCaseStudies } from './case-studies-creative'

export const portfolioCaseStudies = [
  ...productCaseStudies,
  ...clientCaseStudies,
  ...creativeCaseStudies,
]
export function getCaseStudy(projectId: string) {
  return portfolioCaseStudies.find((study) => study.projectId === projectId)
}
