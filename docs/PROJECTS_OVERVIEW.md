# Projects Overview — AssetFlow, PerfLens, SwearJar+ Lite

## Purpose

Define three product applications to build, validate, and monetize.
Each product must:

* solve a real problem
* be buildable quickly
* support monetization
* strengthen portfolio credibility

---

# 1. AssetFlow

## Product

AssetFlow is a SaaS web application that organizes, renames, previews, and exports product images into standardized filenames.

## Mission

Eliminate manual image renaming workflows for eCommerce users.

## Core Problem

Users receive large batches of images with unusable default filenames and must manually rename them for store uploads.

## Target Users

* Shopify sellers
* Etsy sellers
* small business owners
* freelancers managing product assets
* product photographers

## Core Value

Transform:

```
IMG_2045.jpg → 63755-front.jpg
```

in seconds.

## Workflow

1. Upload images
2. Group into products
3. Assign descriptors
4. Enter SKU
5. Preview filenames
6. Export ZIP

## Tech Stack

### MVP

* Next.js 15
* TypeScript
* Tailwind CSS v4
* Zustand
* Framer Motion (light use)
* JSZip

### SaaS

* Supabase Auth
* Supabase Postgres
* Stripe Checkout
* Stripe Webhooks

## Features

### MVP

* drag-and-drop upload
* image previews
* product grouping
* descriptor assignment
* duplicate descriptor prevention
* SKU input
* live filename preview
* ZIP export
* responsive UI
* landing page
* pricing

### SaaS

* saved templates
* user accounts
* dashboard
* subscription management

## Monetization

### Free

* up to 20 images
* no login required

### Pro

* unlimited images
* saved templates
* subscription billing

## Key User Stories

* Rename product images quickly for store upload
* Process large batches without errors
* Maintain consistent naming standards

## Success Criteria

* user completes workflow without guidance
* value is clear within first session
* upgrade path is visible and compelling

---

# 2. PerfLens

## Product

PerfLens is a web-based performance debugging tool for identifying mobile FPS issues and runtime bottlenecks in modern web apps.

## Mission

Help developers quickly diagnose real causes of poor mobile performance.

## Core Problem

Developers struggle to identify whether performance issues come from:

* WebGL rendering
* CSS/compositing
* animations
* JavaScript main thread

## Target Users

* frontend developers
* Three.js / WebGL developers
* freelancers
* agencies building interactive sites

## Core Value

Identify the true performance bottleneck without guesswork.

## Workflow

1. Run performance test
2. Toggle optimization modes
3. analyze results
4. generate report

## Tech Stack

### MVP

* Next.js 15
* TypeScript
* Tailwind CSS
* Lighthouse integration
* Playwright
* browser performance APIs

### SaaS

* Supabase
* Stripe
* report storage

## Features

### MVP

* FPS tracking
* frame-time analysis
* CSS impact detection
* reduced-motion testing
* reduced-3D testing
* Lighthouse audits
* Playwright mobile emulation

### SaaS

* saved reports
* comparison history
* team sharing

## Monetization

### Free

* basic audits
* limited reports

### Pro

* saved reports
* advanced diagnostics
* team features

## Key User Stories

* Identify cause of mobile performance issues
* compare optimization strategies
* generate reports for clients

## Success Criteria

* tool identifies likely bottlenecks
* results are actionable
* reports are shareable

---

# 3. SwearJar+ Lite

## Product

SwearJar+ Lite is a gamified mobile habit-tracking app for families.

## Mission

Make habit tracking engaging and easy for families.

## Core Problem

Existing habit apps are:

* too complex
* not engaging for kids
* not designed for family use

## Target Users

* parents
* families
* households using habit tracking

## Core Value

Turn habit tracking into a simple, rewarding system.

## Workflow

1. Create habit
2. Track progress
3. earn rewards
4. maintain streaks

## Tech Stack

### MVP

* React Native (Expo)
* TypeScript

### Future

* Supabase or Firebase
* subscription system

## Features

### MVP

* create habits
* track daily progress
* streak tracking
* simple rewards
* parent-friendly dashboard
* kid-friendly UI

### Future

* family sync
* premium rewards
* advanced tracking

## Monetization

### Free

* basic tracking
* limited features

### Pro

* premium rewards
* extended features
* subscription or unlock

## Key User Stories

* Track child habits easily
* motivate behavior through rewards
* maintain consistency over time

## Success Criteria

* app is simple to use
* engagement is consistent
* users understand reward system quickly

---

# Portfolio Strategy

## Objective

Build three complementary products that demonstrate:

* real-world problem solving
* technical depth
* product thinking
* monetization capability

## Product Roles

* AssetFlow → business SaaS (fastest monetization)
* PerfLens → technical differentiator
* SwearJar+ Lite → mobile product capability

## Build Priority

1. AssetFlow
2. PerfLens
3. SwearJar+ Lite

## Outcome

A portfolio demonstrating:

* full-stack development
* UX/product design
* SaaS architecture
* mobile app development
* monetization strategy
