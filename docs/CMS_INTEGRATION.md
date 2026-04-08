# CMS Integration Guide — BuildwithTreez Portfolio

## Why a CMS?

Right now all content lives in `src/data/*.ts` files — hero text, projects, experience, technologies.
Updating any of it requires a code edit + redeploy. A CMS moves that to a browser-based editor
so you can update your portfolio content without touching the codebase.

---

## Recommended CMS: Sanity

You already use Sanity in Treecommerce, so the mental model is familiar. It fits this portfolio perfectly:

- **Free tier** covers a personal portfolio indefinitely (3 users, 10GB, 200k API calls/month)
- **Structured content** maps cleanly to your existing TypeScript interfaces (`Project`, `Experience`, etc.)
- **GROQ queries** are fast and composable — no over-fetching
- **Sanity Studio** is the editor UI — it can be hosted at `/studio` inside this Next.js app itself
- **Real-time previews** work natively with Next.js App Router

---

## Content Mapping

Every `src/data/*.ts` file maps to a Sanity schema document type:

| Current file | Sanity document type | Fields |
|---|---|---|
| `hero.ts` | `heroContent` | `headText` (string), `subText` (array of strings) |
| `projects.ts` | `project` | `id`, `name`, `description`, `tags`, `image` (image), `sourceCode`, `liveDemo`, `featured` |
| `experience.ts` | `experience` | `title`, `company`, `date`, `points` (array of strings), `order` (number for sorting) |
| `technologies.ts` | `technology` | `name`, `category` (frontend/backend/database/tools) |
| `services.ts` | `service` | `title`, `description`, `icon` |

---

## Step-by-Step Integration Plan

### Step 1 — Create a Sanity project

```bash
npm create sanity@latest -- --project <new> --dataset production --template clean
```

Or reuse an existing Sanity project if you have one from Treecommerce.
Note the **project ID** and **dataset** name — you'll need these as env vars.

---

### Step 2 — Install dependencies

```bash
npm install next-sanity @sanity/image-url
```

`next-sanity` provides the App Router client, live preview utilities, and the Studio embed.

---

### Step 3 — Add environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token   # only needed for draft/preview mode
```

Add the same vars to your Netlify site environment (Site settings → Environment variables).

---

### Step 4 — Create the Sanity client

Create `src/lib/sanity.ts`:

```ts
import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true, // cached responses for production; set false for previews
})
```

---

### Step 5 — Define schemas

Create `src/sanity/schemas/` with one file per content type. Example for projects:

```ts
// src/sanity/schemas/project.ts
export const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'sourceCode', title: 'Source Code URL', type: 'url' },
    { name: 'liveDemo', title: 'Live Demo URL', type: 'url' },
    { name: 'featured', title: 'Featured', type: 'boolean' },
  ],
  orderings: [{ title: 'Featured first', by: [{ field: 'featured', direction: 'desc' }] }],
}
```

Create similar schemas for `experience`, `heroContent`, `technology`, and `service`.

---

### Step 6 — Embed Sanity Studio at /studio

Create `src/app/studio/[[...tool]]/page.tsx`:

```tsx
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

Create `src/sanity/sanity.config.ts`:

```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { projectSchema } from './schemas/project'
import { experienceSchema } from './schemas/experience'
// ... other schemas

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: { types: [projectSchema, experienceSchema /* ... */] },
})
```

Studio will now be accessible at `localhost:3000/studio` in dev and on your live URL.

---

### Step 7 — Replace static data with GROQ queries

Convert each `src/data/*.ts` export to an async fetch. Example for projects:

**Before** (`src/data/projects.ts`):
```ts
export const projects: Project[] = [ /* hardcoded */ ]
```

**After** (`src/data/projects.ts`):
```ts
import { sanityClient } from '@/lib/sanity'

export async function getProjects(): Promise<Project[]> {
  return sanityClient.fetch(`
    *[_type == "project"] | order(featured desc) {
      "id": _id,
      name,
      description,
      tags,
      "image": image.asset->url,
      sourceCode,
      liveDemo,
      featured
    }
  `)
}
```

Then in any Server Component that consumes it:
```tsx
// This page/section becomes async
const projects = await getProjects()
```

---

### Step 8 — Handle the 3D tech scene

The `technologies` array feeds directly into the `TechScene` 3D component. Since `TechScene` is a
Client Component (it uses R3F), the fetch needs to happen in a parent Server Component and be
passed down as a prop — which is already how it works today via `src/data/technologies.ts`.

The data shape stays identical:
```ts
{ name: string; category: 'frontend' | 'backend' | 'database' | 'tools' }
```

No changes needed to `TechScene.tsx` or `PlatonicSolid.tsx`.

---

### Step 9 — Seed initial content

Rather than re-entering all content manually in Studio, use the Sanity CLI to import a JSON seed:

```bash
# Export your current data as JSON, then:
npx sanity dataset import seed.ndjson production
```

Or create a one-time seed script at `scripts/sanity-seed.ts` that calls the Sanity mutations API
to push all current `src/data/*.ts` content up on first run.

---

### Step 10 — On-demand revalidation (optional but recommended)

By default, Next.js caches `fetch` results. To get content updates to appear without a full
redeploy, add a revalidation webhook from Sanity → your Netlify deploy hook or a custom
`/api/revalidate` route:

```ts
// src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }
  revalidatePath('/')
  return NextResponse.json({ revalidated: true })
}
```

In Sanity → Settings → Webhooks, point to `https://your-site.netlify.app/api/revalidate?secret=xxx`
and trigger on document publish. The page will re-fetch fresh content within seconds of saving in Studio.

---

## Migration Order (least risky first)

1. **`hero.ts`** — smallest file, easiest to validate visually
2. **`projects.ts`** — most frequently updated content in practice
3. **`experience.ts`** — changes rarely but painful to code-edit
4. **`technologies.ts`** — feeds 3D scene, test carefully after migration
5. **`services.ts`** — if a services section is added later

Migrate one at a time. Keep the static fallback in `src/data/` until each fetch is verified
in production, then delete the hardcoded array.

---

## What stays in code (not the CMS)

- Brand colors, fonts, spacing — these are design tokens in Tailwind config
- 3D scene geometry, animation logic, shader parameters
- Section layout and component structure
- Performance flags and perf testing utilities

The CMS owns **what** you say. The codebase owns **how** it looks.
