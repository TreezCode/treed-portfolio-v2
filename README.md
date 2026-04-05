# Joey Kubalak - Portfolio V2

Modern, minimalist portfolio built with Next.js 15, React 19, TypeScript, and Three.js.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber, Drei
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod
- **Email Service:** Resend
- **Icons:** Lucide React (custom SVG icons)
- **Deployment:** Vercel

## 📦 Getting Started

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

## 🎨 Features

- ✅ Responsive navigation with mobile menu
- ✅ Animated hero section with gradient orbs
- ✅ About section with service cards
- ✅ Experience timeline
- ✅ Technologies showcase (categorized)
- ✅ Projects gallery with filtering
- ✅ Contact form with validation
- ✅ Email integration via Resend
- ✅ Scroll-triggered animations
- ✅ Glass-morphism UI design
- ✅ SEO optimized
- ✅ Accessibility compliant

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── animations/        # Reusable animation components
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections (About, Experience, etc.)
│   ├── three/             # Three.js components
│   └── ui/                # Reusable UI components
├── data/                  # Static data (projects, experience, etc.)
├── lib/
│   ├── hooks/             # Custom React hooks
│   ├── utils.ts           # Utility functions
│   └── validations/       # Zod schemas
└── styles/
    └── globals.css        # Global styles & design tokens
```

## 🎯 Development Roadmap

### Completed (Phases 1-5)
- ✅ Foundation & Setup
- ✅ Layout & Navigation
- ✅ Content Migration
- ✅ Projects Gallery
- ✅ Contact Form & Email Integration

### Upcoming (Phase 6+)
- 🔲 Advanced 3D scenes with custom shaders
- 🔲 Post-processing effects
- 🔲 Interactive 3D tech constellation
- 🔲 Performance optimization
- 🔲 Analytics integration

## 🚢 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TreezCode/treed-portfolio-v2)

Or manually:

```bash
npm run build
vercel --prod
```

## 📝 Environment Variables

Required environment variables:

- `RESEND_API_KEY` - Resend API key for email functionality
- `CONTACT_EMAIL_FROM` - Sender email address
- `CONTACT_EMAIL_TO` - Recipient email address

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this as inspiration for your own portfolio.

## 🔗 Links

- **Live Site:** [joeykulbalak.com](https://joeykulbalak.com)
- **GitHub:** [@TreezCode](https://github.com/TreezCode)
- **LinkedIn:** [Joey Kubalak](https://www.linkedin.com/in/joey-kubalak-425032180/)

---

Built with ❤️ by Joey Kubalak
