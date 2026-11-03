/** Shared resource destinations for the handoff header, mobile menu and footer.
 * Product taxonomy remains in handoff-catalog.ts and is unchanged by this layer.
 */
export const navigationResources = {
  apps: { label: 'Russound Apps', href: 'https://russound.com/russound-apps/' },
  modelLookup: { label: 'Model lookup', href: '/#model-support' },
  productSupport: { label: 'Product support', href: '/#support' },
  documents: { label: 'Document Center', href: 'https://russound.com/document-center/' },
  legacy: { label: 'Legacy product support', href: 'https://russound.com/legacy-products/' },
  partners: { label: 'Integration partners', href: 'https://russound.com/integration-partners/' },
  rci: { label: 'Russound Certified Installer', href: 'https://russound.com/rci-program/' },
  news: { label: 'News', href: '/news/' },
  company: { label: 'About Russound', href: 'https://russound.com/about-us/' },
  story: { label: 'Our story', href: '/#story' },
  contact: { label: 'Contact Russound', href: 'https://russound.com/contact-us/' },
  integrator: { label: 'Integrator login', href: 'https://russound.com/my-account/' },
  dealer: { label: 'Find a dealer', href: '/#installer' },
  dealerLocator: { label: 'Find a dealer', href: 'https://russound.com/dealer-locator/' },
  browse: { label: 'Browse products', href: '/catalog/' },
  planner: { label: 'Plan a system', href: '/#planner' },
} as const;

export const supportGroups = [
  { label: 'Product help', links: ['modelLookup', 'documents', 'legacy'] },
  { label: 'For professionals', links: ['partners', 'rci'] },
] as const;
export const aboutLinks = ['company', 'story'] as const;
export const footerExploreLinks = ['news', 'company', 'story'] as const;
export const mobileResourceGroups = [
  { label: 'Help & resources', links: ['apps', 'modelLookup', 'documents', 'legacy'] },
  { label: 'About Russound', links: ['company', 'story', 'news', 'contact'] },
  { label: 'For professionals', links: ['partners', 'rci'] },
] as const;
export const footerResourceGroups = [
  { label: 'Help & resources', links: ['apps', 'productSupport', 'modelLookup', 'documents', 'legacy', 'dealerLocator', 'contact'] },
  { label: 'For professionals', links: ['rci', 'integrator', 'partners'] },
] as const;
