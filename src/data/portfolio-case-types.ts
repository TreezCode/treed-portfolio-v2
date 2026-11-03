export type PortfolioCaseStudy = {
  projectId: string
  introduction: string
  challenge: string
  decisions: { title: string; body: string }[]
  delivery: { title: string; body: string }
  reflection?: string
  flow?: {
    title: string
    introduction: string
    steps: { title: string; body: string }[]
  }
  gallery?: { src: string; alt: string; caption: string }[]
}
