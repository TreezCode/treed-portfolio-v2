# Before: live Build With Treez portfolio

Captured from `https://buildwithtreez.com/` on November 3, 2026, approximately 15:18–15:23 UTC, before any deployment of Living Archive. The live page title was **Joey Kubalak | Product-Minded Software Engineer**. Its older purple-accent design is a single page with Work, Approach, Experience and Contact anchors. No production Git commit is inferred from the local repository.

## Originals

- `desktop-home-hero.png`, `desktop-work.png`, `desktop-contact.png`: 2880 × 2000 PNGs from a 1440 × 1000 CSS viewport at DPR 2.
- `mobile-home-hero.png`, `mobile-work.png`, `mobile-contact.png`: 780 × 1688 PNGs from a 390 × 844 CSS viewport at DPR 2.
- `desktop-home-full.png`: complete page, 2880 × 22832 pixels.
- `mobile-home-full.png`: complete page, 780 × 32710 pixels.
- `desktop-home-to-work.webm`: primary dark-theme recording, native 1440 × 1000, 30 fps VP9, 22.466 seconds.
- `mobile-home-to-work.webm`: primary dark-theme recording, native 390 × 844, 30 fps VP9, 20.333 seconds.
- `desktop-light-home-to-work.webm` and `mobile-light-home-to-work.webm`: supplemental native light-theme recordings, 29.333 and 23.566 seconds respectively. Use the dark versions for matching the stills and Living Archive.

The original PNGs and WebM recordings are unedited browser output. No illustration generation, image retouching, replacement text, captions, music, overlays or cursor callouts were added. Keep these masters intact and make copies for edits. The recordings include natural holds at their beginning and end that can be trimmed in a later edit.

## Matching the after captures

Use the same viewport sizes and DPR 2 for stills. Use dark color scheme and reduced motion, await fonts, move the document through its natural scroll range to load images, decode them, then return to scroll zero and let the page settle. Avoid calling `scrollIntoView` on decorative images inside Living Archive's clipped wall: that can move its nested overflow container and spoil the capture. The old Work and Contact shots scroll their section top to 85px below the viewport top. In Living Archive, Work and Contact are separate pages, so identify those as section-to-page comparisons rather than claiming identical page structures. The hero and full-page shots use the root URL at scroll zero.

Primary videos use DPR 1, normal motion and dark color-scheme emulation, verified through the native “Switch to light mode” control. The desktop recording holds the hero, scrolls from 0 to 4300px over 18 seconds and holds; mobile uses 0 to 2600px over 16 seconds. Both are screen recordings, with no audio. Mobile is browser emulation, not a physical-device recording. The supplemental light-theme mobile take uses a 14-second scroll.

## Verification and provenance

Chrome 156.0.8078.80 returned HTTP 200. No uncaught page errors or failed requests were recorded during the still captures. All main project images decoded. A hidden duplicate desktop navigation logo reported incomplete at the final check, with natural dimensions present; it is not a broken visible content image. Hero, Work and Contact frames were visually inspected. Sampled video frames show actual scroll progress without capture overlays, and both video streams decode fully without FFmpeg errors. This is capture QA, not a full audiovisual edit review.

`manifest.json` preserves UTC times, viewport/emulation settings, response headers, image status and SHA-256 hashes for every original media file. The capture script is `output/playwright/capture-before-stills.js`; raw tool evidence is `output/playwright/capture-before-stills-result.txt`. No forms were filled or submitted.
