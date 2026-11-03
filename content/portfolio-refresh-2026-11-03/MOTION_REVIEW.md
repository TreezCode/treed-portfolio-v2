# Living Archive: predeployment motion review

Reviewed November 3, 2026. Source revision `123d71b`; served production build `IgqEnj7jbkGIvTqvG0I-X`. This review precedes the separate scrollbar correction. No motion code was changed.

## Recommendation

Keep the current motion direction for this release. The planned signature sequences are present, and no additional text reveal or transition is required to complete the approved design. The strongest content story is already the progression from a portfolio to a collection of useful products, a geometric instrument and a playable world.

Preserve immediate identity, headings, project proof and actions. Do not add a page-wide fade-and-rise system, split-word reading gate, text scramble, splash screen or navigation curtain. These would add waiting and new failure paths without improving this portfolio's main task. `DESIGN.md:13` explicitly keeps frontal copy and native scroll; `DESIGN.md:121` chooses editorial case pacing without hidden-copy reveals.

If a later creative pass needs another authored detail, a single short geometric-mark trace at an editorial transition could fit the visual language. It is optional, would need its own normal/reduced-motion review, and is not a release prerequisite. No new animation dependency is justified by the current brief.

## Plan compared with source

| Intended behavior | Current implementation | Assessment |
| --- | --- | --- |
| Atrium-inspired wall with opposing pointer rows | `PortfolioPage.tsx:19` owns fine-pointer damping and lifecycle; `portfolio.css:297` separates scroll, projected plane and row transforms | Present; headings and CTA remain in a steady foreground plane |
| Native-scroll wall relaxation | `PortfolioPage.tsx:67` computes bounded hero translation and rotation | Present; reverse returns to the corresponding pose |
| Opposing graphic type tracks | `DESIGN.md:43`, `PortfolioPage.tsx:75`, `portfolio.css:478` | Present; bounded scroll relationship, no autoplay or pin |
| Pause, preference changes and cleanup | `PortfolioPage.tsx:41`, `:86`, `:106`; `portfolio.css:1601` | Present; pause settles artwork, reduced motion removes spatial movement |
| Deliberate touch composition | `portfolio.css:1196` and `:1614` | Present; static wall, native document travel and readable copy |
| Case-study storytelling | `PortfolioShell.tsx` and the case pages; `DESIGN.md:121` | Intentionally editorial, with interaction explaining the work rather than hiding prose |

These references name files under `src/components/portfolio/` unless otherwise stated. The plan never required installing GSAP, using every Cinematic Web Experiences recipe, or putting a scroll trigger on every section.

## Fresh browser coverage

Used a separate Chrome session on the production build, with normal motion enabled, at desktop 1440 × 1000 and touch-emulated mobile 390 × 844.

- Moved the pointer left and right across the desktop hero. The first row moved from approximately −42px to +41px; the neighboring row moved from −41px to −166px. The hero heading retained exactly the same screen bounds.
- Advanced native document scroll to 420px and reversed. The wall's additional translation changed to about 38.6px and returned to 0px.
- Sampled entry, intermediate and near-exit typography poses, then reversed to the intermediate scroll position. Opposing tracks had opposite translations; the repeated position restored the exact prior transform.
- Activated Pause artwork, then Resume artwork. Pause settled the wall and graphic track variables. Changed the reduced-motion preference during the session; wall transform became `none` and translation variables returned to zero.
- In the touch context, confirmed the coarse-pointer media query, static wall, zero horizontal page overflow, and matching graphic-track transforms when reversing to the same scroll position.
- Visually inspected the desktop left/right wall, desktop graphic transition, mobile opening and mobile transition captures. Copy remains readable, the CTA is available and the wall remains deliberately composed. The mobile decorative type band's outer clipping is intentional and does not clip page content.
- No uncaught page errors were recorded in this bounded pass.

Evidence script: `output/playwright/motion-finish-audit.js`. Captures: `motion-finish-desktop-{left,right,band}.png` and `motion-finish-mobile-{top,band}.png` in the same directory. The script exercises real pointer input and browser scroll positions, not private animation state. These are sampled motion states and visual checks, not a continuous frame-rate measurement, physical-phone review or another game playtest.

## Existing release considerations

- `CLIENT_SITE_BRIEF.md:43` and `LAUNCH_SCORECARD.md:156` retain unresolved permission for named public Russound portfolio/media use and Rift Riders contributor/distribution terms. Check the applicable original permission before publishing those materials. A local capture does not establish public reuse permission.
- The new before-and-after request authorizes capture and preparation before deployment. It does not ask this audit to publish the site or post content.
- A reachable preview can support the uncoached-player and physical-phone sessions. Those sessions are a gate for more rooms; requiring them before any reachable playtest preview would be circular. They remain unperformed here.
- Current evidence is desktop Chrome and emulation. Physical Safari/touch, assistive technology, named-device rendering/loading behavior, hosted routes/assets and actual contact delivery remain separate checks already recorded in the scorecard.

The appropriate next step is to preserve the before material, complete the scrollbar correction, capture the reviewed after state, and prepare a concrete deployment candidate. Extra effects are not needed to make that candidate reviewable.
