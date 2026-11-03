# Build With Treez: local redesign verification

Date: November 3, 2026. Status: Living Archive, the 12-project selection, corrected framing and multi-page delivery approved. Geometry Bench and Portal Keeper are implemented; Joey's initial game playthrough found no issues at first glance. The authorized Playground hub and game case study are locally verified. No production deployment.

## Predeployment capture and finish pass, November 3, 2026

- [x] Preserved the actual older live portfolio before deployment: eight desktop/mobile PNG originals, two primary dark-theme recordings and two labeled supplemental light-theme recordings. The production title, URLs, UTC times, browser, theme, response details and hashes are recorded; no production source commit was inferred.
- [x] Captured the reviewed candidate in fourteen PNGs, with matching 1440 × 1000 and 390 × 844 CSS viewports at DPR 2. Work and Contact are explicitly labeled as old sections versus new dedicated pages. Four additional normal-motion recordings cover the homepage on desktop/mobile, Geometry Bench and Portal Keeper. Native WebM sources and six MP4 compatibility copies are retained. No publication or social posting occurred.
- [x] The local comparison gallery switches desktop/mobile pairs, preserves full image edges, offers original downloads and native video controls. Original media remains local outside Git; `content/portfolio-refresh-2026-11-03/media-manifest.json` records dimensions, probes and hashes. The guide includes a six-beat carousel outline and later clip/article reuse.
- [x] Fixed residual purple viewport scrollbar and keyboard skip-link styling in the existing portfolio stylesheet. Root-document scope now follows Living Archive, with native scrollbar sizing, a dark-green track, an olive thumb and forced-color equivalents. Thumb/track contrast is 5.15:1.
- [x] Production build `KMMPvmE6ex9jiqxQXIma9` passes with 56 generated pages. Built-CSS checks confirm desktop/mobile colors, keyboard skip-link focus and destination, forced colors, Fieldnotes preservation, zero horizontal overflow and no page errors. Evidence: `output/playwright/scrollbar-final-result.{json,md}`.
- [x] Independent motion review on the immediately preceding build exercised desktop pointer travel, forward/reverse wall and typography progress, pause/resume, live reduced motion and touch composition. Planned motion is present; no new reveal system is needed. This CSS-only finish does not change that runtime. Details and limits: `content/portfolio-refresh-2026-11-03/MOTION_REVIEW.md`.
- [x] All fourteen final after stills passed an independent capture review. Video samples were visually inspected and MP4 files fully decoded. These are editable source recordings, not completed social edits, continuous device-performance measurements or fresh-player sessions.

A reachable playtest preview is the next deployment step; player sessions are the gate for expanding the game, not a prerequisite for making a test link reachable. The existing named-public-media permissions and hosted delivery checks below remain public-release considerations. No deployment was performed in this pass.

## Playground hub and case study delivery, November 3, 2026

`/playground` now gives Geometry Bench and The Portal Keeper equivalent original previews and direct actions. The instrument lives at `/playground/geometry-bench`; existing recipe and explanatory bookmarks forward with their query and hash intact. `/work/portal-keeper` adds an editorial story, actual scene captures and an independent three-state light-path example driven by the game's puzzle model. Home, Work and the game connect these pages while retaining the approved 12-project collection.

- [x] Final production build `IgqEnj7jbkGIvTqvG0I-X` generated 56 pages. Scoped ESLint passes. No dependencies were added. The Impeccable mechanical detector returned no findings for the new surface.
- [x] Five browser regression cases cover both hub destinations, the dedicated bench canonical and anchor, old recipe/query restoration, new copied addresses, hash navigation, malformed recipe recovery, clipboard-denial recovery, direct case refresh and all three diagram states.
- [x] Independent browser review covered 1440px, 390px and 320px, plus doubled computed text and line height at 390px. Images load with complete compositions, controls remain visible, navigation round trips work and no horizontal overflow or uncaught page errors were recorded.
- [x] The example responds to keyboard activation, exposes pressed states and announces its explanation. Its 48px-high stage controls and static SVG do not alter the saved game.
- [x] Fresh independent visual review approved the hub and case at desktop/mobile sizes for local owner review. Full-page case captures were taken after decoding all lazy images; an extra desktop reward-only capture with overlapping sticky header was excluded.
- [x] Three original 960 × 641 scene captures retain source provenance and embedded origin metadata. The metadata scan found no missing entries. The hub and story use static images, with game canvases confined to their own routes.
- [x] Final served HTML matches build `IgqEnj7jbkGIvTqvG0I-X`; all five route cases pass again in 12.8s. Fresh contexts with JavaScript disabled retain the hub, story, native navigation and static diagram while hiding inactive stage buttons. Neither page requests the identified Three renderer chunk with JavaScript enabled or disabled, including scrolling and example interaction; both have zero canvases and page errors.

Evidence: `.impeccable/review/{hub,keeper-case}-{desktop,mobile}.png`, `output/playwright/playground-hub-detect.json`, the `hub-independent-*` review scripts, and `tests/playground-routes.spec.ts`. The broader review used build `CDkW_J2z9D3pltHXRcZJo`; the final build replaces the hub's deprecated image priority prop with eager loading. The earlier six model and three browser game cases below remain prior evidence for the unchanged game core, not a repeated test run.

`PLAYTEST.md` prepares two uncoached first-player sessions, including one physical phone. No sessions or physical-device results are recorded yet. These are the next check before expanding into a second room. No new Lighthouse scores, field performance claims or public release are part of this delivery.

## Earlier Geometry Bench delivery

The original `/playground` route, now `/playground/geometry-bench`, adds Bloom, Orbit and Portal sculptures with five parameter controls, three palettes, curated presets, seeded variations, sideways rotation and explicit view/pause buttons. Visitors can download a current-view PNG, generate a flat scalable SVG print, and share a versioned configuration link. Shared navigation and a static homepage invitation expose the experience without adding a WebGL canvas to Home.

- [x] Production build passes with 53 generated routes. ESLint passes. No new dependencies or paid services were introduced.
- [x] All three geometry families pass finite-coordinate, deterministic-buffer and bounded-radius checks at extreme settings. Versioned recipe parsing rejects malformed labels/syntax and clamps valid numeric ranges. One thousand deterministic variations and SVG outputs were checked.
- [x] Desktop 1440px, tablet 1024px/768px, mobile 390px/320px and short 844x390 landscape render one canvas and one main/h1 without horizontal overflow. Final 320px with doubled text also fits after allowing preset labels to wrap.
- [x] All three normal-motion compositions were inspected. Orbit's nearly edge-on loops were widened into readable ellipses. Parameter controls, presets, keyboard increments, touch preset activation and route remount work.
- [x] The mobile pause button uses a compact Play/Pause label with a full accessible name. Caption, sculpture and controls occupy separate rows. At 390px the control is about 70px wide and 44px high; actions begin 12px below the artwork. At 320px with doubled text the rows remain separate. Focused control labels are visible after native scrolling settles.
- [x] Actual WebGL draw-call instrumentation records activity during motion and zero draws during paused/reduced states. The fully offscreen sample records zero draws with the stage bottom 310px above the viewport. The first tall-viewport sample still intersected the stage and was not treated as an offscreen pass.
- [x] SVG/PNG download actions succeed. The actual PNG was inspected and contains the complete sculpture. Shared recipe restoration reproduces the selected Portal and changed twist value. Clipboard denial exposes a selectable recipe link.
- [x] WebGL2 returning null or throwing activates the responsive flat edition with no mounted canvas or uncaught page error. Context loss switches to the same fallback. SVG remains available, PNG disables, and form controls continue changing the print.
- [x] Without JavaScript, the poster, page content, navigation and original print download remain; inactive controls are hidden. Reduced motion keeps geometry controls useful without autoplay. A native emulated touch swipe over the sculpture scrolled the page 93px without pausing motion (`geometry-touch-scroll.txt`).
- [x] Independent source review covered resource ownership, frame-loop state, safe URL/SVG generation and unavailable-WebGL initialization. The Impeccable mechanical detector returned no findings for the changed page/UI targets.

| Current mobile lab | Performance | Accessibility | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 94 | 100 | 3.02s | 14ms | 0 |
| Playground | 85 | 100 | 3.53s | 274ms | 0 |

These are one Lighthouse 13.4.1 simulated mobile run per route on build `lGXfBwRU3GjCBFc6kIcgB`, not physical-device performance or accessibility certification. The audit screenshot shows the 3D sculpture. Initial 3D JavaScript and render-blocking CSS remain optimization opportunities; no field Core Web Vitals claim is made. Final build `Iz49hsL80mZ9p6lI4c0Sd` adds only the narrow enlarged-text preset wrapping correction. Final layout evidence confirms it at 320px/200% text.

Evidence under `output/playwright/`: `geometry-bench-results.txt`, `geometry-fallback-results.txt`, `geometry-final-layout-results.txt`, `bench-focus-settled.txt`, `geometry-release-results.txt`, `bench-release-*` screenshots, `bench-export.{png,svg}` and `geometry-lighthouse-*` reports. The first full harness hit a wrapped-label selector mismatch; the UI now has an explicit Form accessible name and the successful results include the corrected selector. Focus/scroll measurements use settled native scrolling, not the early in-flight sample.

Source provenance and selected/rejected external skill findings are in `docs/portfolio-refresh/threejs-skills-research.md`. Expert authorship is recorded where verified; community skill packs are not described as official Three.js guidance. No third-party skill pack was installed or executed. The standalone game and optional sound were future work at this checkpoint; their subsequent delivery is recorded below.

## Current multi-page delivery

Home now introduces three professional/product stories and three creative worlds. Work, About and Contact have their own routes. All 12 approved projects have source-backed case studies, with 19 actual app, website, game and production images. PresentSphere and Renamerly include small local interactive explanations. Little Portal Studio remains one parent entry with eight releases. The first portfolio is restored as a labeled, noindex historical exhibit at `/archive/first-portfolio/index.html`.

- [x] Production build passes with 52 generated routes. ESLint passes. The approved selection and full-image framing are preserved.
- [x] All 16 primary destinations (Home, Work, About, Contact and 12 cases) return 200 at desktop 1440px and mobile 390px. Six additional narrow 320px checks and six 200% text-size checks pass, totaling 44 views with no horizontal overflow, broken loaded images, duplicate main landmarks or missing/duplicate h1 headings.
- [x] Galleries use full source compositions without hover zoom. Portrait app screens are paired at desktop widths and capped at a readable height; mobile uses one column. Representative galleries were scrolled, decoded and visually reviewed.
- [x] Keyboard skip navigation bypasses the header and focuses the actual main region. Page titles, canonical routes, indexable selection and 24-entry sitemap are correct. An unknown project returns 404.
- [x] Category filtering, search, empty/reset states and the Work-to-project-to-Work round trip pass. Creative returns three projects; Little Portal search returns one parent; all eight studio releases remain inside it.
- [x] PresentSphere's adult-recipient example preserves private ideas, accepted collaboration and recipient exclusion. Renamerly's illustrative filename responds to text, view and separator changes. Both use labeled native controls; no product account, upload or API is involved.
- [x] No-JavaScript pages retain all 12 project links and complete case content. Optional filters and the interactive contact form are hidden; a direct email route remains.
- [x] Fine-pointer movement, native scroll, pause and runtime reduced-motion changes pass. Touch emulation follows the home anchor and Work navigation. Reduced motion removes demo color transitions. No uncaught page errors were recorded.
- [x] Contact validation blocks invalid data without a request. Intercepted success clears the form; intercepted failure exposes direct email recovery. No real messages were sent. A final hover-state correction keeps the submit button in the approved high-contrast palette instead of inheriting the old purple hover fill.
- [x] The historical exhibit passes a separate desktop 1680px/mobile 390px review of navigation, gallery category/search/pagination, manual carousel and visible image loading. Exact original dependencies are served locally under the unchanged CSP. It is an earlier-work exhibit, not a claim of modernizing every legacy interaction.

Independent reviews covered case-source accuracy and permissions teaching, keyboard landmarks and metadata, plus desktop/mobile composition. Corrections included the adult-recipient example, skip target, duplicate title suffixes, oversized portrait galleries and contact hover color. Existing original source images and repositories were not altered.

| Current mobile lab | Performance | Accessibility | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 95 | 100 | 2.96s | 39.5ms | 0 |
| PresentSphere case | 96 | 100 | 2.71s | 38ms | 0 |

Single Lighthouse 13.4.1 simulated mobile runs on build `MWEEipxDcTxgJnd5PmnTy`. These are local lab scores, not field Core Web Vitals, screen-reader review or physical-device qualification. LCP remains above 2.5s; render-blocking CSS and unused initial-load JavaScript are bounded release-optimization opportunities. Images passed the image-delivery audit. Final build `ZsboOpaOspyOC6uv5dd7k` adds only the contact hover CSS correction, confirmed in `multipage-hover-confirmation.txt`; it does not change either audited page's behavior.

Evidence: `output/playwright/multipage-final-results.txt`, final-multipage/final-gallery/final-sharing/final-filename/final-contact screenshots, and `multipage-lighthouse-{home,presentsphere}.{json,html}`. Local source and asset provenance in `docs/portfolio-refresh/`: `product-case-study-provenance.md`, `client-case-provenance.md`, `case-studies-creative-provenance.md`, case asset manifests and `first-portfolio-restoration.md`.

### Measurement after an authorized launch

Use case opens, artifact/source visits, resume downloads and successful contact delivery as supporting signals. Do not count internal QA as engagement. At 30 days, check that the real journeys work and review any recruiter questions. At 60 days, use those questions to improve unclear cases and assess the optional Playground entry. At 90 days, evaluate substantive engineering conversations and interviews alongside engagement, without attributing outcomes to the redesign from sparse evidence. No tracking service or new data collection was introduced in this delivery.

## Current image-framing correction

Build PqdGJTWrjIOvZsaHNGqKR preserves full source compositions across hero tiles, featured work, project cards and retained Fieldnotes prints. Cover sizing and hover zoom were removed. Small frame insets protect the edges, and corner icons no longer obscure the artwork. Source assets were not cropped or replaced.

- [x] Desktop 1440px and mobile 390px/320px inspection confirms full framed images, no horizontal overflow, loaded images and no uncaught page errors.
- [x] Featured, project-card and studio-release images remain unscaled on hover.
- [x] Portrait Cosmic Zen artwork and wide website screenshots were visually reviewed at desktop and mobile sizes. The hero's intentional outer viewport clipping remains part of its composition.
- [x] Build and ESLint pass. The approved 12-project selection is unchanged.

Evidence: output/playwright/framing-review.txt, framing-feature-1440.png, framing-feature-390.png, framing-collection-1440.png, framing-collection-390.png and framing-hero-1440.png. Earlier performance scores below were not remeasured for this CSS-only framing correction.

## Previous curation revision

Build KJiOYz8PyAPnZygg97r0o implements the owner's follow-up: 12 proposed selected projects, one Little Portal Studio logo entry, eight releases on its collection page, and Codorus Web's actual current hero. The direction switch is removed from the primary page. Original records remain recoverable; unselected records are noindex and outside the sitemap. The full next-phase plan is in DESIGN.md.

- [x] Build and ESLint pass. All 49 existing generated routes remain available.
- [x] Homepage and studio page checked at 1440px, 390px and 320px with no horizontal overflow, broken loaded images or uncaught page errors.
- [x] Studio gallery preserves complete artwork instead of cropping listing text. Its mobile layout also passes doubled text-size/line-height checks.
- [x] Pointer movement and pause still work. Filters return three creative projects; Little Portal search returns one studio entry.
- [x] No-JavaScript HTML contains 12 selected projects and all eight studio releases.
- [x] Sitemap contains 21 URLs: home, 12 selected projects and eight studio releases. A sampled unselected record remains reachable with noindex and is absent from the sitemap.
- [x] Real Codorus hero captured from the live site; approved original studio logo converted without generation or recoloring. Source provenance is retained locally.
- [x] Renamerly homepage/workspace open. First Portfolio source opens; its former live domain fails DNS. Keep its source link and plan a restored archive preview.

Evidence: output/playwright/curation-results.txt, curated-home-1440.png, curated-home-390.png, curated-studio-1440.png and curated-studio-390.png. Current source hashes are in docs/portfolio-refresh/curation-build.json. The earlier full baseline and Lighthouse measurements below are retained with their original build lineage; performance scores were not remeasured for this image/content revision.

## Initial direction-build baseline

The initial direction build established Living Archive's perspective wall and Fieldnotes' paper-and-print composition. The following baseline describes the original 40-entry version before the owner's curation correction above.

- Living Archive: http://127.0.0.1:4318/
- Fieldnotes: http://127.0.0.1:4318/directions/fieldnotes
- Shared project details: /work/[slug]
- Design rationale, reference choices and motion contract: DESIGN.md

## Content reconciliation

- [x] 40 unique project records and 40 generated project pages: 20 development/tool projects, three Russound projects and 17 creative projects/studies.
- [x] Cosmic Zen Collections, Little Portal Studio and its eight releases, PresentSphere, Codorus Web, Russound website/course/motion work, IMPULSE and original music are included alongside the wider software collection.
- [x] Knowledge-base discoveries were checked against original project records, current exports and publication receipts. Current November 1 North Pole Dispatch release evidence supersedes the earlier stopped experiment.
- [x] Current source images were preserved; optimized derivatives, current descriptions, roles, detail links and available media were added.
- [x] PresentSphere uses its current folded-bow identity and family positioning. AIEOS is described as the current documentation/skill toolkit, with the older source clearly labeled.
- [x] All local images/media referenced by project data exist. Current resume matches the authoritative software-engineer resume byte-for-byte.
- [x] Archived/released/concept work is described according to its evidence. Client implementation, contributor credit and asset attribution are retained where relevant.
- [x] No authored em dashes in the refreshed portfolio copy. No invented business results or customer endorsements.

Detailed provenance remains in the local, Git-ignored docs/portfolio-refresh inventories and asset manifests. Some platform links limited fresh automated access; those links retain dated publication evidence rather than a claim that every external destination was freshly inspected.

## Desktop and mobile verification

- [x] Both directions inspected at 1440x1000, 1440x700, 768x1024, 390x844 and 320x740. No horizontal overflow or broken loaded images.
- [x] At 390px with computed text and line height doubled, content grows naturally and the primary action remains within the hero. This was a text-resize test, not a claim of testing every browser zoom implementation.
- [x] Touch emulation retains native scrolling and a working Explore the work anchor. No pointer-dependent navigation.
- [x] Pointer travel, native-scroll response, reverse scroll and Pause artwork were sampled. Reduced-motion changes stop decorative translation during the session.
- [x] Category filters, keyboard activation, search, empty state and reset work. All 40 projects remain in server HTML without JavaScript; optional filter controls are hidden in that fallback.
- [x] All 40 detail routes return 200; an unknown project returns 404. Related studio projects group correctly.
- [x] Native video/audio controls are available and media uses preload=none. Source/export decoding was checked; this is not a new artistic listening or full playback approval.
- [x] Contact validation blocks invalid submissions. Intercepted success resets the form; intercepted failure exposes email recovery. No messages were sent. Without JavaScript, the form is hidden and an ordinary email link remains available.
- [x] No uncaught page JavaScript errors in the primary interaction/viewport harness.

## Build and performance evidence

- [x] Production build succeeds with 49 generated pages, including the 40 project routes.
- [x] ESLint passes with --quiet. git diff --check passes; only repository line-ending conversion notices remain.
- [x] Alternate direction is noindex and canonicalizes to the primary page. Sitemap now includes project detail pages, and the Open Graph artwork matches the new identity.

| Direction | Mobile Lighthouse performance | Accessibility | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Living Archive | 92 | 100 | 3.3s | 30ms | 0 |
| Fieldnotes | 90 | 100 | 3.6s | 40ms | 0 |

These are local Lighthouse 13 lab measurements, not field Core Web Vitals or a complete accessibility certification. Cold mobile LCP still exceeds the 2.5s good threshold and remains a launch optimization opportunity. Removing redundant contact animation and limiting font preloads improved Living Archive from its initial 83 score. The final Fieldnotes check confirms the corrected contact-panel contrast.

Build lineage: the complete viewport/interaction harness ran on fnw_q-rv51GWX36WVOKDW. Contact/fallback checks and the Living Archive performance result followed on aNPOq2rRyJ493Ql9mb9To. The final build, DnWgm4Dx5Rivi3SoLyjfW, contains the scoped editorial font and contact color-token corrections; the final Fieldnotes audit ran against that build. These later changes did not alter project data or interaction logic. Source hashes are in docs/portfolio-refresh/verification-build.json.

Local evidence: output/playwright/final-results.json, contact-results.txt, fallback-and-band-results.txt, lighthouse-archive-final.json, lighthouse-fieldnotes-release.json and desktop/mobile screenshots. The first no-JavaScript contact check exposed a selector issue; fallback-and-band-results.txt records the corrected hidden form.

## Before public launch

- Obtain the outstanding named public portfolio/media permission for Russound and contributor distribution permission for Rift Riders. Local preview inclusion does not settle those permissions.
- Living Archive, the curated project list, image framing, multi-page delivery and Geometry Bench are approved. Joey reported a positive initial Portal Keeper playthrough. Complete the prepared uncoached-player and physical-phone checks; production publication still requires explicit authorization. Additional rooms remain future work.
- Perform physical mobile Safari/touch and assistive-technology review. Current verification used desktop Chromium and mobile emulation, not physical devices.
- Check production email delivery and hosted performance when a release is authorized. Current form tests were intercepted and the existing contact endpoint was preserved.

No paid research, new service subscription, outreach, real contact submission or deployment was performed for this local build.

## Portal Keeper first-room delivery, November 3, 2026

The owner approved the game plan and requested implementation. The first room is available locally at `/play/portal-keeper`, linked from the Playground, with its canonical route in the sitemap. It uses the existing Three.js/Fiber/Drei stack and original procedural geometry. No packages or external art assets were added.

- Production build `-O14HTP41ICLITYBA3B1k` passes with 54 generated pages. Scoped ESLint and `git diff --check` pass. The layout detector returned no findings for the new surface.
- Six model tests pass, covering all 64 mirror configurations, bounded reflections, equal incidence/reflection, the unique lens orientation, entry gating and versioned save validation. Only the intended mirror pair reaches the receiver.
- Three browser journey tests pass against that build: complete play with wrong-lens gating, save restoration, entry/undo/reversible reset; keyboard play at 390px with reduced motion and unobscured focused controls/completion; unavailable WebGL with playable diagram and corrupt-save recovery. A 320px overflow check is included. Repeat with `npm run test:portal-keeper` while the local server runs.
- A separate no-JavaScript check confirms the authored diagram, explanatory recovery text and portfolio route remain visible, while inactive game controls are hidden. The Playground's game link remains present without JavaScript.
- Normal-motion renders were inspected at 1440x1100 and 1869x947, and mobile at 390x844. Final views cover initial, awakened, garden arrival, scrolled lens controls and completion. The first pass found a missing render-texture attachment and insufficient mirror identification; both were corrected and visually confirmed.
- Independent interaction QA verified direct 3D picking, opt-in audio, pause/resume/mute, context-loss fallback, route-away audio cleanup and single-canvas restoration. At 390px, 200% computed text scaling produced no horizontal overflow. Native keyboard focus initially hid behind the sticky scene; measured scroll margins and completion focus corrected it, verified by settled geometry and hit testing.
- The independent visual review returned **ship within its screenshot-based scope**. Portal rendering, A/B correspondence and scrolled control placement are resolved. Supporting 10–11px text is readable in captures but remains a physical-phone readability check.

The renderer caps DPR at 1.5 and the garden target at 320x512 logical pixels, uses demand rendering, suspends ambient motion offscreen/hidden/paused, and uses a single static shadow map refreshed on relevant changes. These are implementation controls, not measured phone frame-rate claims. Only an upstream Three.js Clock deprecation warning remains in the game browser check; no uncaught page errors were observed.

Local captures are `.impeccable/review/portal-*.png`; independent QA artifacts are under `output/playwright/portal-*`. Source and model/browser tests are committed; generated screenshots and traces stay local.

Joey subsequently reported a positive initial playthrough. Remaining acceptance: uncoached-player sessions, physical mobile readability/touch/Safari and assistive-technology review, and measured frame/loading behavior on a named physical device before expanding the game. Use Pixel 6a Chrome and iPhone 13 Safari as initial performance targets, aiming for 60fps during ambient motion; no result on either device is claimed. The 3–5 minute duration remains a design target, not observed player data. This delivery does not authorize deployment or more rooms.
