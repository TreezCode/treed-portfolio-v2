# Living Archive production release

Released November 3, 2026, after owner approval of the launch pass and clean Russound portfolio edition.

The two-row portfolio navigation went live on November 10, 2026 at 12:19 a.m. New York time. Work, Playground, and Contact stay pinned. Scrolling up brings back the wordmark, About, and Resume. [PR #5](https://github.com/TreezCode/treed-portfolio-v2/pull/5) · [Fixed production deployment](https://6af2a93e922a089cee7f969e--buildwithtreez.netlify.app/)

All 24 browser checks passed on `https://buildwithtreez.com`. Desktop wheel input at 1440 × 900 and touch emulation at 390 × 844 kept all three primary links visible and clickable throughout the sampled transitions. Deliberate upward scroll restored both the wordmark and About while the visitor was still partway down the page. Tabbing into the hidden row in either direction retained the 700 px reading position. Additional coverage included 320 px reflow, reduced motion, JavaScript disabled and alignment with both Playground stages. Recordings and JSON results are in the local `output/playwright/tiered-nav-production/` folder. Mobile checks used Chromium touch emulation.

The previous portfolio release was the November 4 temporary Russound hold and Portal Keeper collection replacement in [PR #4](https://github.com/TreezCode/treed-portfolio-v2/pull/4), commit `a103d3bfc63d9d24aeecfba0ef08a08919e73bb6` and Netlify deploy `6aeadc4c073b792af5b68f6b`. PR #3 shipped the Living Archive favicon and Portal Keeper audio recovery on November 3.

## Published origins

| Surface | URL | Release |
| --- | --- | --- |
| Portfolio | https://buildwithtreez.com | Git commit `20741fc7a376cddfbed27a49e4d9c8451b0cccf3`; Netlify deploy `6af2a93e922a089cee7f969e` |
| Clean Russound experience | https://treez-russound-experience.netlify.app | Netlify deploy `6aea1fb01491af4b74be38d7`; immutable 81-file `experiences/russound/release/upload` artifact |

The initial portfolio [PR #2](https://github.com/TreezCode/treed-portfolio-v2/pull/2) was merged at 18:01:46 UTC, publishing commit `6173ee9356ac1c947e75871cdbdac69656d19811` as deploy `6aea218d53f77b439f44e0f5`. The follow-up above supersedes that deployment. Local `main` was fast-forwarded to the merged release. Later documentation-only commits do not change these deployed application bytes.

The live release includes Home, Work, About, Contact, Privacy, deeper case studies, the Playground hub, Geometry Bench and Portal Keeper. The bench's face-on alignment and reset/export correction are included. The standalone game remains one room pending fresh-player feedback.

## November 4 temporary Russound hold

- Russound Digital Experience and Music in the Room are withheld from the public catalog, direct case-study routes, share images and related work. Their source records and case-study text remain preserved. Four unchanged images were moved outside `public`, with hashes and restoration instructions in `content/held-projects/russound/README.md`.
- Sound, Made Clear remains public by Joey's explicit clarification, including its original copy, three images, course link and hero placement.
- Portal Keeper fills the selected-work vacancy, keeping 12 projects and linking to the existing interactive case study. Its observatory image replaces the withdrawn hero image. Codorus Web replaces the homepage featured website slot.
- Production build, scoped lint, independent source review and asset-preservation checks passed. Local browser views passed at 1440, 390 and 320 pixels. Netlify preview `6aeadbd696b79c74e35c51b6` passed before merge.
- Production readback confirms the merged commit and ready deploy above. Sixteen targeted HTTP checks passed: eight withheld URLs return 404 and eight retained/new project, preview and image URLs return 200. The sitemap has 28 unique URLs with Portal Keeper present once. Eleven delivered homepage/Work JavaScript chunks contain neither withheld record.
- Live Chromium checks at 1440 and 390 pixels confirm 12 cards, retained course, Portal Keeper search and navigation, no horizontal overflow, no broken loaded images, no withheld links and no uncaught page errors. Analytics was declined and collection requests blocked. These are browser-emulation checks, not physical-device tests.
- The separately hosted clean Russound demo and original client-review version remain unchanged by this portfolio-only withdrawal.

Evidence: `output/playwright/russound-hold-production-http.json`, `russound-hold-preview-http.json`, `russound-hold-live-review.js`, and the `russound-hold-production-*` screenshots.

## Favicon and audio follow-up verification

- The browser favicon now matches Living Archive: a simplified lichen-green geometric flower on a dark tile, supplied as SVG and a true ICO with 16/32/48/64/128/256 pixel frames. Small-size review passed at 16 and 32 pixels. `scripts/prepare-favicon.mjs` regenerates the ICO from the editable vector.
- Home, Work and Portal Keeper return new versioned icon links. Both served files match the reviewed hashes and return the correct MIME types with revalidation caching. The Apple icon is unchanged byte-for-byte. Intended production pages remain indexable.
- Audio now resumes directly on an explicit game action after interruption. Event feedback is independent of ambient-motion pause and scene visibility. Pending or old sounds are canceled on mute, hide and unmount; failed starts can be retried. Note levels remain unchanged.
- The combined candidate passed its production build, scoped lint, 21 audio/puzzle unit checks and all three gameplay browser journeys. Production Chromium instrumentation confirms a nonzero audio signal after opt-in, gesture-bound recovery after suspension, feedback with the scene offscreen in landscape, feedback while ambient motion is paused, mute and route cleanup. No page errors were observed. Analytics was declined and collection requests were blocked throughout QA.
- Preview deploy `6aea45b4a6836afcd9cac13b` passed before publication. Netlify's injected preview drawer obstructed the landscape mute control, so preview mute/cleanup was checked in portrait. The unmodified production page passed the full landscape harness without that preview-only obstruction. No security policy or application layout was changed for the drawer.

Evidence: `output/playwright/favicon-production-results.json`, `favicon-release-review.md`, `audio-recovery-hosted-qa.js` and `audio-recovery-hosted-results.json`. The reported player's original audio concern was subsequently attributed by the owner to likely low device volume; the independently reproduced recovery issues are separate findings. Physical-device recovery testing remains a follow-up.

## Initial launch hosted verification

- All 29 sitemap routes pass canonical, title, description, Open Graph, Twitter and indexing-header checks. All 49 social cards return valid 1200 x 630 PNGs, and the Apple icon is 180 x 180.
- All 40 project routes pass the old-Russound-link and indexing-boundary audit. Twenty unselected projects remain noindex. Fieldnotes and the restored first portfolio also remain noindex; unknown project/share routes return 404.
- Nine normal-motion browser views at 1440px, 390px and 320px cover Home, Work, Playground, the Russound case, Contact and Privacy. No overflow, broken loaded images, uncaught page errors or failed same-origin responses were observed. The initial mobile consent panel fits. No hosting badge or preview toolbar appears in production.
- Four production browser tests pass: public routes and resume PDF; actual Google SDK consent, clean route payloads and revocation with collection intercepted; contact success/failure UI with the API mocked; mobile Geometry Bench and Portal Keeper completion/restoration. A test initially expected desktop-only subtitle text in a mobile selector; the selector was corrected and the full suite passed without a runtime change.
- The clean Russound deployment serves the reviewed artifact bytes. All 80 served files match hashes, and 68 excluded GET/HEAD requests are blocked (62 HTTP 404, six malformed traversal HTTP 400). Six public routes, video range delivery, 17 interactions and desktop/mobile visuals pass. The original client-review source and deployment remain unchanged. A clicked roundtrip from the portfolio case study to the clean demo and back succeeds.
- Search Console accepted the new sitemap at 18:05 UTC, reports **Success**, and discovered all 29 URLs. Discovery is distinct from indexing and rankings.

The PR 2 deploy preview also passed before merge. It retained noindex headers and sent no Analytics requests even with an accepted choice stored. Its optional Netlify collaboration drawer was blocked by CSP; that preview-only host injection is absent on production. The production security policy was preserved.

## Measurement and evidence

GA4 property `562162593`, stream `16264746038`, measurement `G-S67R6WEVXS`, and verified Search Console domain `sc-domain:buildwithtreez.com` are connected. Enhanced measurement, Google signals and advertising personalization remain off. Eight approved event dimensions and the no-value `generate_lead` key event are present in the post-release Admin API readback. `ANALYTICS.md` records the event and consent contract.

Two bounded, labeled QA homepage views received HTTP 204 from Google at 18:10:39 and 18:15:46 UTC. The second used normal headed Chrome. **Live receipt is confirmed in Google DebugView:** the actual pageview shows campaign `portfolio_launch_browser_20261103`, source `qa`, medium `debug`, debug mode enabled and the canonical homepage URL. Google also records the accompanying first visit and session start. The failed first harness attempt, corrected debug-marker handling and protocol/filter checks are documented in `ANALYTICS.md`; no production code change was required. No real conversions or contact emails were sent.

Detailed local evidence:

- `output/playwright/social-preview/HOSTED_PRODUCTION_REVIEW.md`
- `output/playwright/social-preview/hosted-production-results.json`
- `output/playwright/social-preview/hosted-project-boundary-results.json`
- `output/playwright/launch-live/`: production browser checks and the bounded labeled Analytics receipt check
- `output/playwright/launch-accounts/search-console-sitemap-submitted.yml`
- `output/playwright/launch-accounts/analytics-debugview-received.yml` and `analytics-received-pageview-parameters.txt`
- `output/playwright/russound-hosted/FINAL_REVIEW.md`
- `output/playwright/russound-independent-audit/hosted-results.json`

Before/after screenshots and motion masters remain preserved locally through `content/portfolio-refresh-2026-11-03/media-manifest.json` and its comparison gallery. No social post or campaign was published by this release.

## Next work

Run the two uncoached-player sessions in `PLAYTEST.md`, including one physical-phone session, before adding another room. The public game URL is now reachable from those devices. Browser verification used Chromium and mobile emulation; physical Safari/touch and named-device performance are still part of that follow-up. Contact UI and API validation were exercised without sending a real email; inbox delivery is not claimed by those checks.

After initial use, inspect the consented Analytics baseline and Search Console indexing status. Keep QA visits distinct from genuine visitors and successful form submissions distinct from qualified opportunities. Use the preserved before/after material for an owner-reviewed building-in-public post or short film.
