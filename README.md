# Build With Treez - Portfolio

A modern, performant portfolio showcasing full-stack development expertise through interactive 3D experiences and thoughtful UX design.

**Live Site:** [buildwithtreez.com](https://buildwithtreez.com/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://buildwithtreez.netlify.app/)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber
- **Deployment:** Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TreezCode/treed-portfolio-v2.git
cd treed-portfolio-v2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Resend API key:
```
RESEND_API_KEY=your_api_key_here
CONTACT_EMAIL_FROM=onboarding@resend.dev
CONTACT_EMAIL_TO=your.email@example.com
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Features

- Light/dark mode with smooth transitions
- Interactive 3D scenes and animations
- Fully responsive design
- WCAG AA accessibility compliant
- Optimized performance (60fps animations)
- Integrated contact form
- SEO optimized

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint (Resend)
│   ├── layout.tsx         # Root layout with theme providers
│   ├── page.tsx           # Home page
│   └── globals.css        # Theme CSS variables & transitions
├── components/
│   ├── backgrounds/       # Sacred geometry patterns
│   ├── icons/             # Custom SVG icons (Flower of Life, Merkaba)
│   ├── layout/            # Header, Footer, Navigation
│   ├── perf/              # Performance monitoring (dev-only)
│   ├── sections/          # Page sections (Hero, About, Experience, etc.)
│   ├── three/             # Three.js/R3F components & scenes
│   └── ui/                # Reusable UI components (ThemeToggle, etc.)
├── contexts/              # React Context providers
│   └── ThemeContext.tsx   # Sacred Toggle theme management
├── data/                  # Static content (projects, experience, tech stack)
├── hooks/                 # Custom React hooks
└── lib/
    ├── themes.ts          # Theme configuration & color palettes
    ├── utils.ts           # Utility functions (cn, etc.)
    └── validations/       # Zod schemas for forms
```

## Deployment

Hosted on Netlify with continuous deployment from the main branch.

```bash
npm run build  # Build for production
```

## Contributing

This is a personal portfolio. Feel free to fork and use as inspiration for your own projects.

## License

MIT License

## Connect

- **Portfolio:** [buildwithtreez.com](https://buildwithtreez.com/)
- **GitHub:** [@TreezCode](https://github.com/TreezCode)
- **LinkedIn:** [Joey Kubalak](https://www.linkedin.com/in/joey-kubalak-425032180/)

---

**Built by Treez** | Full-Stack Developer
