# Russound portfolio edition verification

Date: November 3, 2026. Status: published and independently verified at `https://treez-russound-experience.netlify.app`. The original client-review edition remains unchanged. The local-candidate evidence below is preserved as release lineage.

## Hosted release

Netlify site `05a6ea2b-a2ac-4326-9b9a-c40a600ca7a6`, deploy `6aea1fb01491af4b74be38d7`. Only the immutable 81-file `release/upload` artifact was published. The host processes `_headers`; all 80 served files match the reviewed artifact hashes.

- All six public routes return HTTP 200 with noindex. The video supports HTTP 206 byte ranges.
- Sixty-eight excluded GET/HEAD requests were blocked: 62 returned 404, and six malformed/encoded traversal requests returned 400. No internal notes, documents, source, manifests or release archives were accessible in this audit.
- Seventeen retained interactions pass on the hosted origin. Desktop 1440px, mobile 390px and the 320px homepage were visually checked with no horizontal overflow or uncaught page errors.
- Netlify's injected hosting badge was disabled and its absence was confirmed in a fresh anonymous browser. The artifact itself was not changed.
- The main portfolio now links to this clean edition. The footer returns to the portfolio case study.

Evidence: `../../output/playwright/russound-independent-audit/hosted-results.json` and `../../output/playwright/russound-hosted/FINAL_REVIEW.md`. Physical Safari/touch remains outside this Chromium/emulated-mobile audit.

## Delivered boundary

The standalone Astro project retains six visitor routes, the cinematic listening scenes, product collection, SMZ8 exploration, system planner, model support, public product manual links and demonstration newsletter. The footer identifies the portfolio concept and links to its case study.

The guide dialog, review footer/archive links, review page, comparison controls/query hooks and internal PDFs are excluded from source selection and export. The packaged artifact includes 81 files totaling 7,579,878 bytes. Its ZIP contains exactly the same file bytes as `release/upload`. Source, provenance manifests, this report and the ZIP itself sit outside the served directory.

`release/package-manifest.json` records every delivered file hash and reference edge. The packager validates 165 local anchors. `asset-provenance.json` records all 86 original client-review files and the 49 staged binary assets. `source-manifest.json` records 46 original source inputs. All original hashes still match. The original source tree was not built or edited.

## Checks

- Standalone Astro production build passes with seven generated pages: six visitor routes plus 404.
- A final source whitespace cleanup rebuilt to exactly the same 81 delivered file bytes, preserving the audited candidate and ZIP.
- Seven standard-library packaging/server tests pass, covering private-content injections, excluded routes/files, missing assets, broken anchors, traversal and media range requests.
- Independent artifact audit checks the complete release bytes, metadata, HTML comments, bundles, exact ZIP parity and preserved originals. No internal review material or earlier review-site links found.
- Independent HTTP audit checks all 80 served files against their hashes. The hosting `_headers` file is intentionally not served locally. Thirty-three excluded paths tested with GET and HEAD produce 66 correct 404s, including review PDFs/routes, source, manifests, archives, directory listings and encoded traversal.
- All six routes pass at 1440 × 900 and 390 × 900 with no page errors, failed local asset requests, broken loaded images or horizontal overflow. Home also fits 320 × 740. Screenshots confirm the selected palette, product imagery, mobile navigation and listening scene.
- Seventeen retained-interaction checks pass: catalog search/filter/reset, product front/rear selection, rear-panel controls, header search, Escape/focus restoration, hero pause, model support lookup, mobile menu/navigation, reduced-motion film behavior and no-JavaScript catalog/home content. Chromium's native search field consumes the first Escape to clear a populated query; the next closes the dialog and restores focus.
- Generated planner downloads were inspected independently, including an edited visitor note. They contain visitor choices and public product guidance only.
- Parent portfolio production build passes (`IW47C7DLeirzxSUozTM3a`, 56 generated pages). The client-review CTA is removed until the clean hosted URL exists. Standalone Astro source is excluded from Next TypeScript and ESLint inputs. Scoped parent lint passes.

Local browser evidence and reproducible CLI scripts: `../../output/playwright/russound-clean/`. Independent audit details are saved separately beside this report. Original image metadata was inspected; ordinary Adobe software/document identifiers were found, with no GPS, local paths, authors or communication text.

## Original predeployment procedure

Follow `scripts/README.md` for preparation, build, package, seven boundary tests and strict preview. Current local preview: `http://127.0.0.1:4336/`. The portfolio runs at `http://127.0.0.1:4318/`.

Only `release/upload` is the deployment candidate. Preserve the client-review hosting project. After deployment authorization, publish this candidate to a separate origin, verify actual hosted 404 behavior and document/source exclusions, then connect the new URL to the portfolio. Confirm the case-study return URL as part of the portfolio release. Do not enable a catch-all homepage rewrite or publish the parent project/release folder.

The original local checks used desktop Chromium and mobile emulation. At that stage physical Safari/touch behavior and the future host remained unchecked; the hosted release results above now resolve the hosting checks. No paid tools, new packages, external submissions or original client-review changes were used in that local preparation.
