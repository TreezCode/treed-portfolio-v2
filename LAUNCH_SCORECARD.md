# Build With Treez: local redesign verification

Date: November 3, 2026. Status: Living Archive and the 12-project selection approved; requested image framing corrected. No production deployment.

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
- Living Archive and the curated project list are approved. Complete the remaining page build and final owner review, then explicitly authorize production publication when ready.
- Perform physical mobile Safari/touch and assistive-technology review. Current verification used desktop Chromium and mobile emulation, not physical devices.
- Check production email delivery and hosted performance when a release is authorized. Current form tests were intercepted and the existing contact endpoint was preserved.

No paid research, new service subscription, outreach, real contact submission or deployment was performed for this local build.
