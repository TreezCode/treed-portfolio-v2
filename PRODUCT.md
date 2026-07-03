# Product

## Register

brand

## Users

Two audiences, one behavior: they skim first and judge fast.

- **Hiring managers and recruiters** evaluating a junior software engineer with a cybersecurity focus. They arrive from a resume link or LinkedIn, spend under 60 seconds forming an impression, and are looking for evidence of judgment, not a feature checklist. Many will open the site on a phone between meetings.
- **Prospective freelance clients** (small businesses, e-commerce owners) who need to feel the work is professional and trustworthy. They care about outcomes: the finished sites, the polish, the reliability.

The job to be done: convince a skeptical, time-poor evaluator that Joey Kubalak can be trusted to build production-quality front-end work. The site itself is the primary exhibit.

## Product Purpose

BuildWithTreez is Joey Kubalak's single-page developer portfolio. Its purpose is to land a job opportunity (and secondarily, client work) by demonstrating front-end craft, design judgment, and 3D/WebGL capability firsthand. Success is a recruiter reaching the contact form, or replying to an application, because the site itself proved the skills the resume claims.

## Brand Personality

**Precise, dimensional, quietly confident.**

- **Precise**: every value deliberate; hairline borders, exact spacing, disciplined color. The site reads like the work of someone who sweats details.
- **Dimensional**: real-time 3D sacred geometry is the signature. Depth comes from WebGL scenes and tonal layering, not from decorative gradients and glows.
- **Quietly confident**: no shouting, no badge walls, no "Available for Hire" pulse animations. The work states its case; the interface stays out of its way.

The sacred geometry motif (Merkaba, Metatron's Cube, platonic solids) is the brand's identity and stays, but as a deliberate signature in a few chosen places, not wallpaper behind every section.

## Anti-references

- **Gradient-everything AI slop**: purple-to-pink buttons, gradient card borders, gradient text, tri-color glows on hover. The 2024-era AI-generated portfolio look. Retired entirely from UI chrome.
- **The template SaaS hero**: pulsing availability badge, side-stripe decoration, icon-title-subtitle card grids, uppercase tracked eyebrow labels repeated above every section.
- **Badge walls**: 28 technology chips, 25 filter pills for 6 projects. Enumerating everything communicates nothing.
- **Glassmorphism as default**: backdrop-blur sprinkled on hints, badges, and overlays without purpose.
- **Lock/unlock canvas UI**: overlays, hints, and toggle buttons bolted onto 3D scenes to work around scroll traps. The interaction model must simply never trap the user.

## Design Principles

1. **The site is the resume.** Every pixel is evidence of judgment. A misaligned card or trapped scroll costs more than a missing feature.
2. **3D is the signature, not the wallpaper.** WebGL scenes carry the dimensional identity in a few high-impact moments; 2D surfaces stay disciplined and tonal.
3. **Curation over completeness.** Six strong projects beat twenty filters. Twelve core technologies beat twenty-eight chips. Cut until what remains is load-bearing.
4. **One accent, committed.** Purple carries the brand alone in UI chrome. Rarity is what makes it read as intentional.
5. **Never trap the user.** Scroll always works. No interaction requires instructions to escape.

## Accessibility & Inclusion

- WCAG 2.1 AA: 4.5:1 minimum text contrast in both themes, visible focus states, full keyboard navigation, 44px minimum touch targets.
- `prefers-reduced-motion` honored across Framer Motion and canvas animations.
- Dark and light themes are both first-class; no hardcoded colors that break either.
- 3D canvases are progressive enhancement: all content and navigation must work without them.
