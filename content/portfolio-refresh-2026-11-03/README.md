# Living Archive capture library

This local review pack preserves the live portfolio before deployment and the unpublished Living Archive candidate. It supplies source material for later social posts, a blog article or a video edit. It is not a publication or a claim of audience results.

Open `index.html` through the local media server at `http://127.0.0.1:4320/`. The gallery compares Home, Work and Contact in desktop/mobile views, links full-resolution originals, offers normal-motion recordings and collects Playground, Geometry Bench and Portal Keeper captures.

## Source map

| Folder/file | Purpose |
| --- | --- |
| `before/` | Actual `https://buildwithtreez.com/` captures from November 3, 2026. Dark theme is the primary comparison; light videos are supplemental. |
| `after/` | Actual local candidate captures. These are labeled unpublished until a deployment is separately completed. |
| `before/manifest.json`, `media-manifest.json` | Capture conditions, provenance, video metadata and media hashes. |
| `before/README.md` | Production capture and matching notes. |
| `MOTION_REVIEW.md` | Current motion decisions and review evidence. |
| `index.html` | Local dependency-free comparison gallery. |

The stills use 1440 × 1000 and 390 × 844 CSS viewports at DPR 2. They preserve full images. Full-page PNGs are taller source references; use the viewport shots when laying out an initial comparison. The old Work and Contact were homepage sections; the new versions have dedicated pages. Label those comparisons accordingly.

Videos are normal-motion captures with no autoplay in the gallery. Native WebM originals and MP4 editing/playback copies are available for both versions. The recordings show actual scrolling, parameter changes and gameplay; no forms were submitted. Mobile footage uses browser emulation. The game recording shows the solution, so keep it separate from an uncoached player's invitation.

## Recommended first content piece

Use a six-slide before-and-after carousel:

1. Homepage before/after, with the reason for bringing more personality into the portfolio.
2. Living Archive's design choices: geometric identity, selected work and complete image compositions.
3. The move from a long page to Work, About, Contact and deeper case studies.
4. Geometry Bench and an example of changing a procedural form.
5. Portal Keeper, its light puzzle and the engineering story behind it.
6. The next step: fresh-player feedback before another room, with a reachable playtest link once available.

Then reuse a short instrument or game recording for a focused interaction clip. A longer build article can cover the art direction, page structure, procedural geometry, the shared puzzle model, reduced-motion/fallback behavior and what is learned in the playtest. This is an internal editorial outline, not a finished campaign script. No claim about follower growth or opportunities is implied.

## Preserve and edit

Keep source PNGs and native WebMs intact. Make derivative crops, layouts, captions and edits in a new delivery subfolder. Preserve the difference between “local candidate,” “published” and “playtested” in outward-facing copy. Select the platform, final format and copy after reviewing the material.

Media masters stay outside Git; the gallery and notes can be tracked. For a published post, use the approved project/content scope and publication authorization rather than treating the capture pack as permission to publish.

## Capture checks

The pack contains 22 PNGs, six primary WebM recordings, two supplemental light-theme WebMs and six MP4 copies, approximately 107 MB total. All final after stills were independently inspected. Sampled video frames show the intended browser states, and all MP4 copies decode fully. The gallery's 26 referenced desktop assets/links return successfully; desktop/mobile image switching and native video playback passed with no page errors or mobile overflow.

The candidate build is `KMMPvmE6ex9jiqxQXIma9`. Its code change in this pass is limited to scrollbar and keyboard skip-link styling. Both sites were captured through a real Chrome browser; the after version remains local and the phone view is emulated. These captures preserve the work for editing and do not replace the planned fresh-player or physical-phone sessions.
