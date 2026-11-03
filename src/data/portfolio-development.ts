import type { PortfolioProject } from './portfolio-types'

// Current source and asset provenance: docs/portfolio-refresh/development-inventory.md.
export const developmentProjects: PortfolioProject[] = [
  {
    id: 'presentsphere',
    title: 'PresentSphere',
    category: 'Web & apps',
    kind: 'Family gifting app',
    year: '2026',
    description:
      'Remember their birthday. Know what they love. Plan something thoughtful, and keep the surprise.',
    role: 'Product strategy, identity, app and website development',
    image: {
      src: '/portfolio/2026/presentsphere.webp',
      alt: 'The current green and lavender PresentSphere website, with its family gifting app and folded-bow identity.',
    },
    tags: ['Expo', 'React Native', 'Supabase', 'Next.js'],
    story: [
      'PresentSphere starts with a person, not a shopping list. Private family circles bring together interests, hints and occasions, while gift ideas and plans stay with the people preparing the surprise.',
      'I built the cross-platform product, its privacy model and a separate public website around one warm green-and-lavender identity. Managed profiles make room for children and relatives without requiring everyone to create an account. The browser app is available to approved testers, with the Android release in preparation.',
    ],
    links: [{ label: 'Visit PresentSphere', href: 'https://presentsphere.com/' }],
    featured: true,
  },
  {
    id: 'ascension-roofing',
    title: 'Ascension Roofing',
    category: 'Web & apps',
    kind: 'Client website',
    year: '2026',
    description:
      'Real Colorado roofing work, a clear estimate journey, and a carefully managed move from WordPress to Next.js.',
    role: 'Strategy, design, copy, engineering and launch',
    image: {
      src: '/portfolio/2026/ascension-roofing.webp',
      alt: 'Ascension Roofing’s current website pairs its Colorado roofing introduction with a mountain and metal-roof photograph.',
    },
    tags: ['Next.js', 'TypeScript', 'Playwright', 'WordPress migration'],
    story: [
      'A roof is more than a finished photograph. The Roof Record follows a real project through the problem, recommendation, construction and result, giving homeowners useful evidence before they request an estimate.',
      'I designed and built the current site, following my earlier Bricks and ACSS WordPress implementation. The launch included protected URL redirects, consent-based analytics, estimate delivery, email continuity and a documented recovery path.',
    ],
    links: [
      { label: 'Visit Ascension', href: 'https://ascensionroofingcolorado.com/' },
      { label: 'Explore the case study', href: 'https://codorusweb.com/work/ascension-roofing/' },
    ],
    featured: true,
  },
  {
    id: 'codorus-web',
    title: 'Codorus Web',
    category: 'Web & apps',
    kind: 'Independent studio',
    year: '2026',
    description:
      'My web studio, brought to life through editorial layouts, purposeful motion and a direct path from an idea to a conversation.',
    role: 'Founder, brand direction, design and engineering',
    image: {
      src: '/portfolio/2026/codorus-web-hero.webp',
      alt: 'The current Codorus Web homepage opening, with its studio headline and original hero artwork.',
    },
    tags: ['Astro', 'TypeScript', 'Motion design', 'Netlify'],
    story: [
      'Codorus Web is where I work with businesses on websites, online stores, web apps, identity and motion. The site makes the work tangible through real client journeys and original motion studies.',
      'I built a static Astro site with carefully timed sequences, an editorial service directory and useful alternatives for touch, reduced motion and JavaScript-free browsing. The identity, website and release workflow are part of the same ongoing studio practice.',
    ],
    links: [{ label: 'Visit Codorus Web', href: 'https://codorusweb.com/' }],
    featured: true,
  },
  {
    id: 'honeyden',
    title: 'Honeyden',
    category: 'Web & apps',
    kind: 'Family app in development',
    year: '2026',
    description:
      'Chores, savings goals and a friendly bear named Cubby. A family money app built around progress kids can see.',
    role: 'Product design, application engineering and character experience',
    image: {
      src: '/portfolio/2026/honeyden.webp',
      alt: 'Cubby, Honeyden’s original plush bear guide, in the app’s warm storybook welcome artwork.',
    },
    tags: ['Expo', 'React Native', 'Supabase', 'Product design'],
    story: [
      'Honeyden gives parents an approval inbox and a clear record of family chores and savings, while children get a welcoming den, goals and rewards for their effort.',
      'The implementation includes parent and child access, chores, savings contributions, approvals, notifications and a server-controlled reward economy. Cubby’s storybook world gives the practical routines a little personality. The project remains in development.',
    ],
    links: [],
  },
  {
    id: 'renamerly',
    title: 'Renamerly',
    category: 'Tools & systems',
    kind: 'Product photography tool',
    year: '2026',
    description:
      'Turn a folder of camera filenames into a consistent product-image library, with previews before anything is exported.',
    role: 'Product strategy, interface design and full-stack development',
    image: {
      src: '/portfolio/2026/renamerly.webp',
      alt: 'Original Renamerly artwork introducing the product-image organization tool.',
    },
    tags: ['Next.js', 'TypeScript', 'Zustand', 'Filename parser'],
    story: [
      'Renamerly organizes the repetitive part of product photography: naming files, assigning views and exporting a clean batch. A visual format builder, RAW previews and ZIP and CSV exports keep the workflow in one place.',
      'Its filename engine parses templates into an abstract syntax tree and renders them through a deterministic core shared by previews and exports. That keeps the visible filename and the delivered file in agreement.',
    ],
    links: [{ label: 'Visit Renamerly', href: 'https://renamerly.com/' }],
  },
  {
    id: 'sayfold',
    title: 'Sayfold',
    category: 'Web & apps',
    kind: 'Client-discovery prototype',
    year: '2026',
    description:
      'A calmer way to gather a client’s story, one short, resumable conversation at a time.',
    role: 'Product architecture, interaction design and application development',
    image: {
      src: '/portfolio/2026/sayfold.webp',
      alt: 'Sayfold’s selected Open Sky design study for a calm, conversational client interview.',
    },
    tags: ['Next.js', 'TypeScript', 'Postgres', 'Passwordless access'],
    story: [
      'Sayfold breaks a large discovery interview into manageable objectives. Respondents can answer, save and return, while the underlying system keeps track of evidence and approvals.',
      'The local prototype implements invitation codes, opaque sessions, server-selected questions, autosave, navigation and submission boundaries. The Open Sky study shown here informed its restrained visual direction.',
    ],
    links: [],
  },
  {
    id: 'florida-fungi-farm',
    title: 'Florida Fungi Farm',
    category: 'Web & apps',
    kind: 'Historical client store',
    year: '2022',
    description: 'Branding and a customized Shopify storefront for a gourmet mushroom farm.',
    role: 'Branding, Shopify design and storefront development',
    image: {
      src: '/portfolio/2026/florida-fungi-farm.webp',
      alt: 'Pink and blue oyster mushrooms from the retained Florida Fungi Farm project asset collection.',
    },
    tags: ['Shopify', 'Taste theme', 'Ecommerce', 'Branding'],
    story: [
      'I built Florida Fungi Farm’s online store and branding around the character of a small gourmet mushroom business, customizing Shopify’s Taste theme for its products.',
      'This is historical client work from around 2022. The farm has since closed; the project’s original visual assets remain part of the archive.',
    ],
    links: [],
  },
  {
    id: 'kismet-rugs',
    title: 'Kismet Fine Rugs',
    category: 'Tools & systems',
    kind: 'Photography workflow',
    year: '2025',
    description:
      'A custom image-renaming tool that brings SKU, camera files and product views into a repeatable workflow.',
    role: 'Tool design and development',
    image: {
      src: '/portfolio/2026/kismet-rugs.webp',
      alt: 'An illustration of Kismet’s workflow from camera filename to SKU-based product-image filename.',
    },
    tags: ['React', 'TypeScript', 'Vite', 'Client-side processing'],
    story: [
      'Built for Kismet Fine Rugs’ photography workflow, the tool pairs a SKU with named product views, prevents duplicate descriptors and previews the result before exporting a ZIP. Sony RAW previews and an offline single-file build support work at the photo station.',
      'The wider Kismet exploration also included a customized Shopify Dawn theme and an augmented-reality rug visualizer prototype. The delivered renaming tool is the practical centerpiece of that work.',
    ],
    links: [
      {
        label: 'View the tool source',
        href: 'https://github.com/TreezCode/kismet-rugs-image-renamer',
      },
    ],
  },
  {
    id: 'local-knowledge-base',
    title: 'Local Second Brain',
    category: 'Tools & systems',
    kind: 'Research infrastructure',
    year: '2026',
    description:
      'A searchable record of projects and decisions that always leads back to the original evidence.',
    role: 'Architecture, Python implementation and retrieval validation',
    image: {
      src: '/portfolio/2026/knowledge-base.webp',
      alt: 'The Local Second Brain architecture connects local sources, FTS5 and BM25 search, and original evidence.',
    },
    tags: ['Python', 'SQLite', 'FTS5', 'Provenance'],
    story: [
      'A long-running creative practice accumulates decisions, files and half-remembered solutions. This local system makes that history searchable without turning a generated summary into the source of truth.',
      'Incremental ingestion, project-scoped FTS5 and BM25 retrieval, source-health reporting and evidence pointers keep answers connected to the original records. It is the system used to reconcile this portfolio.',
    ],
    links: [],
  },
  {
    id: 'evidence-intelligence',
    title: 'Evidence Intelligence',
    category: 'Tools & systems',
    kind: 'Research toolkit',
    year: '2026',
    description:
      'Turn video research and public-ad observations into structured, searchable records with useful source trails.',
    role: 'Research-system architecture and Python development',
    image: {
      src: '/portfolio/2026/evidence-intelligence.webp',
      alt: 'Evidence Intelligence’s illustrated flow from captions and metadata to timestamped records and cited answers.',
    },
    tags: ['Python', 'VTT processing', 'Schemas', 'Local search'],
    story: [
      'Evidence Intelligence collects selected video metadata and captions, normalizes transcripts into timestamped Markdown and makes the resulting library searchable by topic and project.',
      'A separate operator-assisted workflow records public-commercial-ad observations with freshness and provenance. The system separates observed material, interpretation and results so a useful pattern stays connected to its evidence.',
    ],
    links: [],
  },
  {
    id: 'aieos',
    title: 'AIEOS Engineering Toolkit',
    category: 'Tools & systems',
    kind: 'Engineering toolkit',
    year: '2026',
    description:
      'Small, reusable engineering practices for tracing a problem, making the change and finishing the work.',
    role: 'Systems design, workflow design and documentation',
    image: {
      src: '/portfolio/2026/aieos-toolkit.webp',
      alt: 'The current AIEOS toolkit workflow: inspect, implement and verify, then review and deliver.',
    },
    tags: ['Engineering workflows', 'Agent skills', 'Documentation'],
    story: [
      'AIEOS packages repository discovery, focused audits, product discovery and delivery habits into optional agent playbooks. The current toolkit works with ordinary repository tools and does not require a runtime or CLI.',
      'It grew out of an earlier TypeScript governance kernel, preserved in a historical archive. The evolution reflects a practical lesson: keep the evidence and engineering discipline while removing process that gets in the way of delivery.',
    ],
    links: [
      {
        label: 'View the earlier source',
        href: 'https://github.com/TreezCode/ai-engineering-operating-system',
      },
    ],
  },
  {
    id: 'identity-os',
    title: 'Identity OS',
    category: 'Web & apps',
    kind: 'Security concept',
    year: '2026',
    description:
      'An account-security control center that makes sessions, devices and connected access easier to understand.',
    role: 'Product architecture, threat modeling and technical prototypes',
    image: {
      src: '/images/work/identity-os.webp',
      alt: 'The Identity OS security-control-center prototype.',
    },
    tags: ['Next.js', 'TypeScript', 'WebAuthn', 'Threat modeling'],
    story: [
      'Identity OS explores a living trust map instead of scattered account settings: passkeys, devices, active sessions, connected applications and an audit timeline in one place.',
      'The Phase 0 work includes the application skeleton, architecture, threat model and decision gates for authentication and realtime behavior. It is a security concept and technical prototype.',
    ],
    links: [],
  },
  {
    id: 'family-in-view',
    title: 'Family in View',
    category: 'Web & apps',
    kind: 'Private platform prototype',
    year: '2026',
    description:
      'A consent-led inquiry platform with a carefully defined handoff from consumer request to a private buyer inbox.',
    role: 'Product architecture, full-stack development and operations design',
    image: {
      src: '/portfolio/2026/family-in-view.webp',
      alt: 'An architecture illustration showing capture and consent, verification and storage, and a private buyer inbox.',
    },
    tags: ['TypeScript', 'Supabase', 'MFA', 'Workflow design'],
    story: [
      'This private development project connects a consumer inquiry with a named buyer through explicit permission, verification and an auditable delivery process.',
      'The implementation covers persistent records, OTP verification, a buyer inbox protected by MFA, encrypted context, withdrawal and restore procedures. A protected hosted rehearsal exercised the end-to-end journey; the public service has not launched.',
    ],
    links: [],
  },
  {
    id: 'rift-riders',
    title: 'Rift Riders',
    category: 'Creative work',
    kind: 'Multiplayer game prototype',
    year: '2026',
    description:
      'Grapple across an arena, steal the core and send it through the sky. A playful Windows multiplayer experiment.',
    role: 'Game systems, presentation and playtest engineering',
    image: {
      src: '/portfolio/2026/rift-riders.webp',
      alt: 'Rift Riders running in the Windows player, with grapple combat beneath elevated scoring hoops.',
    },
    tags: ['Unity', 'C#', 'Netcode', 'Relay'],
    story: [
      'Rift Riders combines grappling, core throwing, elevated hoops and a moving golden objective in five-minute arena rounds. Offline bot practice provides a place to learn the controls before a private match.',
      'I developed the game systems and original presentation on the multiplayer foundation supplied by Ivan at Honez Studios. Windows builds and a live two-process Relay playtest exercised movement, scoring, pickups and respawns.',
    ],
    links: [],
  },
  {
    id: 'blender-production',
    title: 'Blender Production Workflow',
    category: 'Tools & systems',
    kind: 'Creative production toolkit',
    year: '2026',
    description:
      'A repeatable path from a scene brief to editable Blender sources, rendered images and validated game assets.',
    role: 'Workflow architecture, tooling and verification',
    image: {
      src: '/portfolio/2026/blender-production.webp',
      alt: 'An original teal instrument product still built as an editable Blender verification fixture.',
    },
    tags: ['Blender', 'Python', 'MCP', 'glTF'],
    story: [
      'This reusable production workflow connects scene inspection, materials, lighting, rendering and export with the checks needed to keep the source useful after delivery.',
      'Original fixtures test save-and-reopen behavior, reproducible renders, transparency and game-prop export. The toolkit supports the editable sources behind the Little Portal Studio production practice.',
    ],
    links: [],
  },
  {
    id: 'ridgewright',
    title: 'Ridgewright Metal Roofing',
    category: 'Web & apps',
    kind: 'Independent website concept',
    year: '2026',
    description:
      'An architectural roofing concept with strong typography, a dimensional material study and a direct estimate path.',
    role: 'Art direction, interface design and front-end development',
    image: {
      src: '/portfolio/2026/ridgewright.webp',
      alt: 'The Ridgewright Metal Roofing independent website concept.',
    },
    tags: ['Art direction', 'Web development', 'Scroll choreography'],
    story: [
      'Ridgewright is an independent concept for a fictional metal-roofing company. Its material-led presentation explores how a specialist service can feel distinctive while remaining straightforward to navigate.',
      'The interactive sheet study uses connected annotations and a clear reading sequence, with a native touch route and reduced-motion alternatives.',
    ],
    links: [
      {
        label: 'Explore the concept',
        href: 'https://codorusweb.com/work/ridgewright-metal-roofing/preview/',
      },
    ],
  },
  {
    id: 'treecommerce',
    title: 'Treecommerce',
    category: 'Web & apps',
    kind: 'Archived ecommerce project',
    year: 'Archive',
    description:
      'A Next.js storefront connecting a product catalog, customer authentication and Stripe payments.',
    role: 'Full-stack application development',
    image: {
      src: '/portfolio/2026/treecommerce.webp',
      alt: 'The original Treecommerce storefront from the project archive.',
    },
    tags: ['Next.js', 'Sanity', 'Auth0', 'Stripe'],
    story: [
      'An earlier ecommerce build that brings Sanity content, Auth0 authentication and Stripe payments together in a Next.js storefront. It is preserved here as part of the path toward the more focused products and client work that followed.',
    ],
    links: [{ label: 'View source', href: 'https://github.com/TreezCode/treecommerce' }],
  },
  {
    id: 'muziquehub',
    title: 'MuziqueHub',
    category: 'Web & apps',
    kind: 'Archived music discovery app',
    year: '2019',
    description:
      'An artist discovery app for exploring biographies, music videos, concerts and personal favorites.',
    role: 'Collaborative full-stack development',
    image: {
      src: '/portfolio/2026/muziquehub.webp',
      alt: 'An illustrated guide to MuziqueHub’s artist discovery, concert search and favorites flow.',
    },
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    story: [
      'MuziqueHub connects artist information, social links, music videos and concert search in a MERN application. Signed-in users can keep favorites in a personal feed. This collaborative project remains part of my early full-stack archive.',
    ],
    links: [{ label: 'View source', href: 'https://github.com/TreezCode/MuziqueHub' }],
  },
  {
    id: 'article-scraper',
    title: 'Leafly Article Scraper',
    category: 'Web & apps',
    kind: 'Archived research app',
    year: 'Archive',
    description:
      'An early full-stack application for collecting articles, saving a reading list and adding notes.',
    role: 'Application development',
    image: {
      src: '/portfolio/2026/article-scraper.webp',
      alt: 'The original Leafly Article Scraper interface from its repository archive.',
    },
    tags: ['Node.js', 'Mongoose', 'Cheerio', 'Handlebars'],
    story: [
      'This earlier application used Cheerio to collect article information, Mongoose to store saved items and Handlebars to present a reading and commenting interface. It is an archived implementation, with its original source retained.',
    ],
    links: [{ label: 'View source', href: 'https://github.com/TreezCode/Article-Scraper' }],
  },
  {
    id: 'vanilla-portfolio',
    title: 'The First Portfolio',
    category: 'Web & apps',
    kind: 'Archived personal website',
    year: 'Archive',
    description:
      'The earlier, framework-free portfolio. An origin point in HTML, CSS and JavaScript.',
    role: 'Design and front-end development',
    image: {
      src: '/portfolio/2026/vanilla-portfolio.webp',
      alt: 'The original vanilla JavaScript portfolio preserved in the project archive.',
    },
    tags: ['JavaScript', 'HTML', 'CSS'],
    story: [
      'A personal website built directly with HTML, CSS and JavaScript. Keeping it in the collection makes the progression visible, from the fundamentals to dimensional interfaces, products and a broader creative practice.',
    ],
    links: [{ label: 'View source', href: 'https://github.com/TreezCode/TreezCode.github.io' }],
  },
]
