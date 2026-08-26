export type ProjectStatus =
  | 'Production client launch'
  | 'Deployed validation product'
  | 'Production business platform'
  | 'Phase 0 security prototype'
  | 'Validated beta tooling'

export interface ProjectLink {
  label: string
  href: string
  kind: 'live' | 'source' | 'record'
}

export interface Project {
  id: string
  index: string
  name: string
  status: ProjectStatus
  role: string
  summary: string
  problem: string
  decisions: string[]
  evidence: string[]
  outcomeBoundary: string
  stack: string[]
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  artifact: {
    label: string
    values: { label: string; value: string }[]
  }
  links: ProjectLink[]
}

/**
 * Curated proof records for the employer-facing portfolio.
 * Every claim below is bounded to shipped behavior, release evidence, or the
 * project's explicitly documented stage. Business outcomes are never inferred.
 */
export const projects: Project[] = [
  {
    id: 'ascension-roofing',
    index: '01',
    name: 'Ascension Roofing',
    status: 'Production client launch',
    role: 'Strategy, design, engineering, migration, and launch',
    summary:
      'A roofing-first Next.js rebuild that turns real project evidence into a clear estimate path without sacrificing search, email, or operational continuity.',
    problem:
      'Replace a legacy WordPress site with a faster, more trustworthy experience while preserving protected URLs, client-owned email, and a recoverable cutover.',
    decisions: [
      'Structured the experience around roofing decisions and documented work instead of generic service claims.',
      'Kept analytics consent-first and lead events free of form PII.',
      'Documented redirects, DNS, email continuity, rollback, and ownership before production cutover.',
    ],
    evidence: [
      'Owner-approved production launch on August 25, 2026.',
      '27 of 27 end-to-end release checks passed across the critical journey.',
      'Mobile lab audits recorded 94 performance, 100 accessibility, and 100 best practices.',
    ],
    outcomeBoundary:
      'Launch and lab evidence only. Lead, ranking, revenue, and ROI outcomes are not yet established.',
    stack: ['Next.js 16', 'TypeScript', 'Playwright', 'Resend', 'GA4'],
    image: {
      src: '/images/work/ascension-roofing.webp',
      alt: 'Ascension Roofing production homepage showing its roofing-first introduction and real project photography.',
      width: 1600,
      height: 1000,
    },
    artifact: {
      label: 'Release record',
      values: [
        { label: 'State', value: 'Live' },
        { label: 'E2E', value: '27 / 27' },
        { label: 'A11y lab', value: '100' },
        { label: 'Perf lab', value: '94' },
      ],
    },
    links: [
      {
        label: 'Visit production site',
        href: 'https://ascensionroofingcolorado.com/',
        kind: 'live',
      },
      {
        label: 'Read the project record',
        href: 'https://codorusweb.com/work/ascension-roofing/',
        kind: 'record',
      },
    ],
  },
  {
    id: 'presentsphere',
    index: '02',
    name: 'PresentSphere',
    status: 'Deployed validation product',
    role: 'Product strategy, full-stack engineering, and privacy model',
    summary:
      'A private gift-planning product for families and close friends, designed to coordinate useful ideas without exposing surprise-safe activity.',
    problem:
      'Make birthdays, preferences, wishlists, and gift coordination useful to a trusted group without turning private relationships into public profile data.',
    decisions: [
      'Enforced visibility at the Postgres layer with Row Level Security instead of relying on interface hiding.',
      'Separated recipient-visible information from buyer coordination through a Surprise Mode privacy model.',
      'Integrated authentication, invitations, transactional email, and feature-gated billing around one product contract.',
    ],
    evidence: [
      'The validation product is deployed and available on its canonical domain.',
      'Every application table is governed by Row Level Security policies.',
      'The repository includes dedicated content, provider, redirect, RLS, and authenticated visual-test contracts.',
    ],
    outcomeBoundary:
      'Validation-stage product. This record does not claim user adoption, retention, or subscription revenue.',
    stack: ['Next.js 16', 'React 19', 'Supabase', 'Postgres RLS', 'Stripe'],
    image: {
      src: '/images/work/presentsphere.webp',
      alt: 'PresentSphere product interface showing the private gift-planning experience.',
      width: 1600,
      height: 1000,
    },
    artifact: {
      label: 'Privacy model',
      values: [
        { label: 'State', value: 'Deployed' },
        { label: 'Data layer', value: 'RLS' },
        { label: 'Coordination', value: 'Surprise-safe' },
        { label: 'Billing', value: 'Feature-gated' },
      ],
    },
    links: [
      {
        label: 'Visit PresentSphere',
        href: 'https://presentsphere.com/',
        kind: 'live',
      },
    ],
  },
  {
    id: 'codorus-web',
    index: '03',
    name: 'Codorus Web',
    status: 'Production business platform',
    role: 'Founder, product strategy, design, engineering, and operations',
    summary:
      'A separate, roofing-first client platform built to market custom website services without diluting the employment-focused Build With Treez portfolio.',
    problem:
      'Give service-business owners a clear buying journey and honest proof while keeping review builds, form delivery, indexing, and public claims under explicit release control.',
    decisions: [
      'Used Astro static output so the public experience ships ordinary HTML and CSS with no UI framework runtime.',
      'Created source-controlled gates for indexing, form delivery, public claims, and cross-brand boundaries.',
      'Published production work with explicit permission and kept unmeasured business outcomes out of the story.',
    ],
    evidence: [
      'The standalone business site launched publicly on August 7, 2026.',
      'The approved Ascension production record was published on August 25, 2026.',
      'Release checks cover responsive layouts, JavaScript-off behavior, accessibility references, metadata, forms, and security headers.',
    ],
    outcomeBoundary:
      'Production and release evidence only. Search discovery, leads, conversions, and revenue remain measurement questions.',
    stack: ['Astro', 'TypeScript', 'Static HTML', 'Netlify', 'Release gates'],
    image: {
      src: '/images/work/codorus-web.webp',
      alt: 'Codorus Web production homepage presenting founder-led website services and client proof.',
      width: 1600,
      height: 1000,
    },
    artifact: {
      label: 'Delivery profile',
      values: [
        { label: 'State', value: 'Live' },
        { label: 'Output', value: 'Static' },
        { label: 'UI runtime', value: 'None' },
        { label: 'Claims', value: 'Evidence-gated' },
      ],
    },
    links: [
      {
        label: 'Visit Codorus Web',
        href: 'https://codorusweb.com/',
        kind: 'live',
      },
    ],
  },
  {
    id: 'identity-os',
    index: '04',
    name: 'Identity OS',
    status: 'Phase 0 security prototype',
    role: 'Product architecture, threat modeling, and technical spikes',
    summary:
      'A security control-center concept for passkeys, live sessions, trusted devices, OAuth applications, scoped API keys, and a visible audit trail.',
    problem:
      'Turn fragmented account-security settings into one understandable trust map where access can be inspected and revoked in real time.',
    decisions: [
      'Bounded the product to its own ecosystem rather than presenting it as a third-party identity provider.',
      'Made WebAuthn, OAuth authorization, and server-sent-event viability explicit decision gates before feature implementation.',
      'Established architecture, security, and threat-model authorities before treating the skeleton as a product.',
    ],
    evidence: [
      'The Phase 0 repository contains the application skeleton and source-controlled architecture package.',
      'CI is configured to run type checking, linting, and the production build.',
      'Security and threat-model documents define protected assets, trust boundaries, and open decisions.',
    ],
    outcomeBoundary:
      'Phase 0 only. The project is not production-ready and its final name and platform decisions remain open.',
    stack: ['Next.js 16', 'TypeScript', 'Postgres', 'WebAuthn', 'SSE'],
    image: {
      src: '/images/work/identity-os.webp',
      alt: 'Identity OS Phase 0 interface prototype visualizing account trust and security controls.',
      width: 1600,
      height: 1000,
    },
    artifact: {
      label: 'Decision register',
      values: [
        { label: 'State', value: 'Phase 0' },
        { label: 'Auth spike', value: 'Open' },
        { label: 'Realtime spike', value: 'Open' },
        { label: 'Production', value: 'Not ready' },
      ],
    },
    links: [],
  },
  {
    id: 'aieos',
    index: '05',
    name: 'AI Engineering Operating System',
    status: 'Validated beta tooling',
    role: 'Systems design, TypeScript CLI, schemas, and contract testing',
    summary:
      'Provider-neutral, local-first workflow governance for product discovery, repository intelligence, implementation planning, and evidence-backed delivery.',
    problem:
      'Keep scope, authority, evidence, approvals, and next actions durable when work moves between people, models, and fresh coding sessions.',
    decisions: [
      'Made a versioned JSON ledger the sole workflow-state authority instead of relying on copied chat summaries.',
      'Used deterministic CLI commands, digest bindings, stable exit codes, and review gates to make handoffs inspectable.',
      'Kept model choice outside the kernel so repository data does not need to pass through a provider API.',
    ],
    evidence: [
      'Discovery and audit workflows were exercised on a production repository and a greenfield build.',
      'The v2 TypeScript kernel includes automated coverage for CLI, schema, state, and delivery-interface contracts.',
      'Four profiles share one governed delivery kernel and repository-local next-action packet.',
    ],
    outcomeBoundary:
      'Validated beta. The v2 kernel still needs broader dogfooding, and licensing and contributor guidance are pending.',
    stack: ['TypeScript', 'Node.js 22', 'JSON Schema', 'AJV', 'Vitest'],
    image: {
      src: '/images/work/aieos.webp',
      alt: 'AI Engineering Operating System command-line output showing governed workflow state and the next authorized action.',
      width: 1600,
      height: 1000,
    },
    artifact: {
      label: 'Kernel contract',
      values: [
        { label: 'State', value: 'Beta' },
        { label: 'Profiles', value: '4' },
        { label: 'Authority', value: 'Ledger' },
        { label: 'Provider', value: 'Neutral' },
      ],
    },
    links: [
      {
        label: 'View source',
        href: 'https://github.com/TreezCode/ai-engineering-operating-system',
        kind: 'source',
      },
    ],
  },
]
