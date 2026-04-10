# Monetizable App Portfolio — PRD Overview

## Purpose
This document defines three product concepts to build, validate, and monetize. The goal is to prioritize apps that are:
- realistic to build quickly
- aligned with the founder’s interests and strengths
- capable of solving real-world problems
- strong additions to a professional portfolio
- viable for early monetization

The three apps are:

1. **AssetFlow** — product image renaming and organization for eCommerce sellers
2. **PerfLens** — mobile web performance debugging and optimization assistant for developers
3. **SwearJar+ Lite** — gamified family habit-tracking mobile app

---

# 1. AssetFlow

## Product Summary
AssetFlow is a SaaS web application for eCommerce sellers and freelancers who need to organize, rename, preview, and export product images into clean, standardized filenames.

Example:
- Input: `IMG_2045.jpg`
- Output: `63755-front.jpg`

## Mission
Help sellers and asset managers eliminate manual image-renaming work and produce store-ready product assets in seconds.

## Problem
Many Shopify sellers, Etsy sellers, photographers, and freelancers work with large batches of product photos that come from cameras or phones with useless default names. Renaming them manually is repetitive, slow, and error-prone.

## Target Users
- Shopify store owners
- Etsy sellers
- small business owners
- product photographers
- freelancers managing product assets for clients

## Core Value Proposition
Turn messy image files into clean, store-ready assets in seconds.

## Tech Stack
### MVP
- Next.js 15
- TypeScript
- Tailwind CSS v4
- Zustand
- Framer Motion (light use only)
- JSZip for client-side ZIP export

### SaaS Phase
- Supabase Auth
- Supabase Postgres
- Stripe Checkout
- Stripe Webhooks

## Core Features
### MVP
- drag-and-drop upload
- image previews
- product grouping
- SKU input
- descriptor assignment
- duplicate descriptor prevention
- live filename preview
- ZIP export
- responsive UI
- landing page
- pricing section

### Paid / SaaS Features
- saved naming templates
- unlimited images
- persistent user accounts
- dashboard
- billing and subscription management

## Monetization Model
### Free
- up to 20 images per session
- no login required
- full core workflow

### Pro
- unlimited images
- saved templates
- future premium workflow features
- monthly subscription

## User Stories
- As a Shopify seller, I want to rename product images quickly so I can upload professional assets without wasting time.
- As a freelancer, I want a repeatable naming workflow so I can process client assets faster and with fewer mistakes.
- As a photographer, I want to export standardized filenames in bulk so my delivery process is cleaner and more professional.

## Success Criteria
- Users can complete a full upload-to-export flow with no onboarding
- The app clearly demonstrates value within the first session
- Users hit the free limit and see a compelling reason to upgrade
- The product is portfolio-worthy and launchable

---

# 2. PerfLens

## Product Summary
PerfLens is a developer-focused web performance debugging tool designed to help identify causes of low FPS, janky animation, and poor mobile runtime performance in modern web apps.

It is especially useful for apps using:
- Three.js
- React Three Fiber
- Framer Motion
- heavy CSS overlays
- animation-heavy landing pages

## Mission
Help developers diagnose and reduce real-world mobile performance issues faster, with less guesswork.

## Problem
Modern frontend apps often look smooth on desktop but become choppy on mobile devices. Debugging the cause is difficult because the issue may come from WebGL rendering, CSS overlays, excessive motion, DOM compositing, or JavaScript main-thread work.

## Target Users
- frontend developers
- Three.js / WebGL developers
- creative developers
- freelancers building interactive websites
- agencies shipping high-end marketing sites
- indie hackers building polished apps

## Core Value Proposition
Find the real cause of mobile performance issues before wasting hours guessing.

## Tech Stack
### MVP
- Next.js 15
- TypeScript
- Tailwind CSS
- browser-based performance instrumentation
- Playwright for automated testing
- Lighthouse integration
- optional Chrome trace/report parsing

### Possible Future Stack
- Supabase for accounts/reports
- Stripe for paid plans
- report storage and sharing
- team collaboration features

## Core Features
### MVP
- mobile performance audit workflow
- FPS / frame-time instrumentation
- CSS-heavy UI reduction testing
- reduced-motion testing
- reduced-3D quality testing
- Lighthouse mobile audit integration
- Playwright mobile emulation scripts
- simple performance report output

### Paid / SaaS Features
- saved audits
- advanced report history
- team/project workspaces
- hosted dashboards
- performance suggestions ranked by likely impact

## Monetization Model
### Free
- local/per-session testing
- limited report generation
- basic performance summaries

### Pro
- saved reports
- advanced diagnostics
- team sharing
- comparison history
- subscription pricing

## User Stories
- As a frontend developer, I want to isolate the cause of low mobile FPS so I can optimize the right thing first.
- As a Three.js developer, I want to compare reduced UI, reduced motion, and reduced rendering modes so I can identify my true bottleneck.
- As a freelancer, I want to produce a performance report for a client so I can justify optimization work clearly.

## Success Criteria
- Developers can run a repeatable performance check quickly
- The tool helps identify probable causes of jank
- The reports are useful enough to share with others
- The app demonstrates deep technical problem-solving in the portfolio

---

# 3. SwearJar+ Lite

## Product Summary
SwearJar+ Lite is a gamified family habit-tracking mobile app focused on helping families track habits, improve accountability, and make behavior change more engaging.

The Lite version should be smaller in scope than the larger SwearJar+ vision and focused on getting a real app shipped to the Play Store.

## Mission
Make family habit tracking feel fun, motivating, and simple enough to use every day.

## Problem
Many family habit-tracking apps are either too generic, too boring, or too cluttered. Parents need something simple and engaging, while kids need something visual, rewarding, and fun.

## Target Users
- parents
- families with young children
- households using positive reinforcement
- users who want a playful accountability app

## Core Value Proposition
Turn habit tracking into a simple, motivating family game instead of a chore.

## Tech Stack
### MVP / Mobile
- React Native with Expo
- TypeScript
- simple local or cloud-backed data model
- lightweight gamified UI system

### Future Expansion
- Supabase or Firebase backend
- parent/child roles
- subscriptions
- badge systems
- family sync
- financial/accountability features

## Core Features
### MVP / Lite
- create a habit or behavior goal
- track progress daily
- streaks
- basic rewards/points
- parent-friendly dashboard
- kid-friendly visual feedback
- simple badge/reward loop
- Android-first release (Google Play)

### Future / Paid Features
- multi-user family sync
- premium badge packs
- custom goal systems
- advanced reporting
- shared family goals
- financial reward integrations

## Monetization Model
### Free
- limited habit tracking
- basic streaks and rewards
- single-family basic mode

### Pro
- premium rewards/badges
- more family members
- advanced tracking
- subscriptions or one-time premium unlock

## User Stories
- As a parent, I want to track my child’s goals in a simple way so I can reinforce positive habits consistently.
- As a family, we want an engaging system that makes daily habits feel rewarding instead of frustrating.
- As the app creator, I want a polished mobile app on the Play Store so I can demonstrate mobile product capability and test monetization.

## Success Criteria
- The app feels simple and engaging from the first session
- Kids can understand the reward system easily
- Parents see clear value in continued use
- The app is polished enough to launch publicly and showcase in the portfolio

---

# Portfolio Strategy

## Why these three apps
These apps create a strong, balanced portfolio:
- **AssetFlow** shows practical SaaS problem-solving for business users
- **PerfLens** shows deep technical engineering and performance expertise
- **SwearJar+ Lite** shows product design thinking and mobile app capability

Together they demonstrate:
- frontend engineering
- UX and product thinking
- monetization awareness
- business-oriented problem solving
- both web and mobile development capability

## Build Priority Recommendation
1. **AssetFlow** — fastest to launch and easiest to monetize
2. **PerfLens** — strongest technical differentiator
3. **SwearJar+ Lite** — strongest long-term brand/product play

## Overall Goal
Ship products that:
- solve real problems
- can attract early users
- create strong portfolio proof
- open the door to revenue, freelance work, or employment