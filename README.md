# Build With Treez

The portfolio of Joey Kubalak, a software engineer and creative maker. The November 2026 Living Archive release brings software, original motion, digital products and creative worlds into one curated collection.

**Live site:** [buildwithtreez.com](https://buildwithtreez.com/)

The Living Archive browser icon is authored in `src/app/icon.svg`. Run `node scripts/prepare-favicon.mjs` after editing it to regenerate the matching ICO fallback at 16, 32, 48, 64, 128 and 256 pixels. Next.js owns the icon links and their versioned URLs. The Apple home-screen icon remains in `src/app/apple-icon.tsx`.

## November 2026 release

- `/`: Living Archive, the approved direction with three featured stories and a creative selection.
- `/work`: The approved 12-project collection with categories and search.
- `/about` and `/contact`: Background, creative interests, resume and engineering inquiries.
- `/playground`: The hub for two original interactive experiences and their technical stories.
- `/playground/geometry-bench`: A Three.js instrument with Bloom/Orbit/Portal forms, keyboard/touch controls, reproducible recipes and local PNG/SVG exports.
- `/play/portal-keeper`: A standalone light-and-mirror puzzle with a playable diagram fallback, progressive hints and local saves. Its engineering case study is at `/work/portal-keeper`.
- `/privacy`: The consent-based analytics policy and preference controls.
- `/work/little-portal-studio`: One studio project with eight released products inside it.
- `/directions/fieldnotes`: Retained, unlinked editorial direction study.
- `/work/[slug]`: All 12 approved projects have deeper case studies, with original screenshots, decisions and delivery details. PresentSphere and Renamerly include small interactive explanations. Original detail URLs remain recoverable; unselected records are noindex and excluded from the sitemap.
- `/archive/first-portfolio/index.html`: Restored historical portfolio, with locally served original dependencies and optimized images. Clearly labeled and noindex.

Run `npm run build`, then `npm run start -- --hostname 127.0.0.1 --port 4318` to review a local production build. The authorized November 3 release is live. See `DEPLOYMENT.md` for deployed commits, origins and hosted verification.

Current project content lives in `src/data/portfolio-{development,creative,russound}.ts`, joined by `src/data/portfolio.ts`. Source reconciliation and asset manifests are retained locally in `docs/portfolio-refresh/`, which this repository intentionally excludes from Git. Read `DESIGN.md` for reference decisions and `LAUNCH_SCORECARD.md` for actual verification and launch boundaries.

The deeper narratives live in `src/data/case-studies-{products,client,creative}.ts`. Their original image derivatives are in `public/portfolio/cases`; run `node scripts/prepare-case-image-sizes.mjs` after adding images to refresh intrinsic dimensions. Geometry Bench's configuration, procedural geometry, renderer and poster generator live under `src/components/playground/`. Portal Keeper's renderer, diagram and puzzle model live under `src/components/portal-keeper/`. `PLAYTEST.md` defines the fresh-player check before additional rooms.

## What this repository demonstrates

- An employer-first introduction and complete browsable collection with roles and accurate project stages
- Server-rendered project content with client-side category filters, search and optional motion
- Original sacred geometry, a CSS perspective image wall and an alternate editorial contact sheet
- Responsive, keyboard-accessible interfaces with intentional reduced-motion behavior
- A hardened contact route with server-side validation, output encoding, a honeypot, Netlify edge rate limiting, defense-in-depth throttling, and Resend delivery
- Canonical metadata, Open Graph imagery, sitemap and robots generation, and production security headers

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Three.js and React Three Fiber
- Framer Motion
- React Hook Form and Zod
- Resend
- Netlify

## Local development

### Requirements

- Node.js 20.9 or newer
- npm

### Setup

```bash
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Configure the three contact variables in `.env.local`. The sending address must use a domain verified with Resend.

```dotenv
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL_FROM=Portfolio <portfolio@your-verified-domain.example>
CONTACT_EMAIL_TO=jkubalak.dev@gmail.com
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run build
```

Performance scripts under `perf/` provide lab evidence only. They should be rerun against the current build before publishing score or frame-rate claims.

## Project structure

```text
netlify/
`- edge-functions/      # Durable platform rate limiting for contact requests
src/
|- app/                  # Routes, metadata, contact endpoint, global styles
|- components/
|  |- layout/            # Header and footer
|  |- sections/          # Portfolio narrative and proof
|  |- three/             # Progressive WebGL scenes
|  `- ui/                # Shared interface components
|- contexts/             # Theme state
|- data/                 # Case studies, experience, and technology content
|- hooks/                # Client behavior hooks
`- lib/                  # Validation and shared utilities
```

## Professional links

- [Portfolio](https://buildwithtreez.com/)
- [GitHub](https://github.com/TreezCode)
- [LinkedIn](https://www.linkedin.com/in/joey-kubalak/)
- [Codorus Web](https://codorusweb.com/)

The source is public for professional review. No license is granted unless a license file is added to this repository.

## Strategy boundary

Build With Treez is the employer-first portfolio. [Codorus Web](https://codorusweb.com/) owns business-services marketing. [INDUSTRY_CONCEPTS_PLAN.md](INDUSTRY_CONCEPTS_PLAN.md) is retained as superseded planning history and does not override the current product authority in [PRODUCT.md](PRODUCT.md).
