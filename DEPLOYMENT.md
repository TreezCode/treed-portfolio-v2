# Living Archive production release

Released November 3, 2026, after owner approval of the launch pass and clean Russound portfolio edition.

## Published origins

| Surface | URL | Release |
| --- | --- | --- |
| Portfolio | https://buildwithtreez.com | Git commit `6173ee9356ac1c947e75871cdbdac69656d19811`; Netlify deploy `6aea218d53f77b439f44e0f5` |
| Clean Russound experience | https://treez-russound-experience.netlify.app | Netlify deploy `6aea1fb01491af4b74be38d7`; immutable 81-file `experiences/russound/release/upload` artifact |

Portfolio [PR #2](https://github.com/TreezCode/treed-portfolio-v2/pull/2) was merged at 18:01:46 UTC. The connected production build succeeded, and Netlify's published-site readback confirms the commit and deployment above. Local `main` was fast-forwarded to the merged release. Later documentation-only commits do not change these deployed application bytes.

The live release includes Home, Work, About, Contact, Privacy, deeper case studies, the Playground hub, Geometry Bench and Portal Keeper. The bench's face-on alignment and reset/export correction are included. The standalone game remains one room pending fresh-player feedback.

## Hosted verification

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
