# Independent privacy boundary review

Reviewed November 3, 2026. Scope: the clean local portfolio release, its actual served responses, the visitor's generated listening brief, and preservation of the existing client-review material. No deployment or third-party communication was performed.

**Result: no internal review notes, communications, review documents or links to earlier review deployments were found in the clean release.** Every tested excluded path returned the real 404 document. This conclusion applies to the artifact and local server described here; the same boundary must be checked on the eventual deployed origin.

## Candidate identity

- Artifact directory: `C:/Dev/treed-portfolio-v2/experiences/russound/release/upload`
- 81 files, 7,579,878 bytes (about 7.23 MiB).
- Seven HTML documents: six visitor pages and `404.html`.
- Manifest SHA-256: `9e2ae668e1b3760d50e588f024368df93fced525571cc63ff18eda21a383afb7`
- ZIP SHA-256: `1603108f7caa8add3ea060218ba115f77bc2c821eeaad3600ce217b8c0e73fae`
- All file paths and hashes match the release manifest. ZIP contents match the upload directory exactly.

## Artifact inspection

The complete upload was inventoried independently of the package verifier. Every file's bytes were scanned for the known review routes, review UI markers, internal-note phrases, internal document filenames, older review deployment hosts, local source paths and source-map references. There were zero findings and no HTML comments. There are no PDF, Office, email, archive, source, configuration-secret or source-map files in the upload.

The retained 49 image/vector/video assets match the frozen public assets. Inspection of all 45 raster images' EXIF/text/XMP found no GPS, private filesystem paths, person-author fields or communication text. Two retain ordinary Adobe application/version/document-ID metadata. The MP4 tags contain only encoder/container metadata. The selected hospitality images and Rooms app screenshot were visually inspected for review annotations. Public product-guide imagery is distinct from internal review documents.

The public company-history reference to Maureen Baldwin, official Russound product manuals, product installation guidance, and the visitor's own `MY NOTES` area are legitimate visitor content. They are not internal communications. The catalog's former design-review wording and footer links to older review origins are absent from this candidate.

## Served boundary

Target: `http://127.0.0.1:4336/`, using the strict allowlist server.

- All 80 public files returned 200 and their expected hashes. `_headers` is hosting configuration and is intentionally not served.
- 33 distinct excluded paths were requested with both GET and HEAD: **66 correct 404 responses**. GET bodies matched `404.html` byte for byte; HEAD bodies were empty.
- Paths included both former review routes and PDF filenames, source and provenance manifests, release archives, source modules and scripts, `.git/config`, `.env`, asset-directory listings, unknown maps, and literal/encoded/double-encoded traversal variants.
- `?smz=charcoal` returned the same SMZ8 HTML as the normal page. The exported JavaScript and markup contain no comparison controls or query-hook markers.
- The cinematic video returned a valid 206 response for bytes 0 through 31.

Exact paths, methods, status results and public-file hashes are recorded in `../../output/playwright/russound-independent-audit/http-audit.json` and `artifact-audit.json`.

## Generated download

A real Chromium session used the visitor UI at `/#planner`, then clicked **Save my brief**. Two downloaded files were inspected:

1. Default choices: 2 to 8 rooms, music first, indoors, phone control. The `MY NOTES` field was empty.
2. Changed choices: 9 to 16 rooms, TV sound, patio/garden, wall touchscreen. The only custom note was the deliberately entered text `Audit visitor note: music on the patio.`

Both downloads contain public product and installation guidance, link only to `russound.com`, and contain no private review signatures. The recorded network activity during this exercise was 38 local static GET requests. No form POST, third-party data request or internal-document request occurred.

Saved evidence under `../../output/playwright/russound-independent-audit/`:

- `planner-default.txt`: 985 bytes, SHA-256 `74b8f6ff4bf93a65b3e9d7a221201a6c94d94b4d067b86237cefcb65b69fcd94`
- `planner-custom.txt`: 1,834 bytes, SHA-256 `0f4205899aa9e6767722bc21e0cbad34171c3e05a24ba0eac831e3efffda85ea`
- `planner-audit.json`, `planner-network.txt`, and the Playwright CLI snapshots in `.playwright-cli/`.

## Preservation

All **86 frozen client-review upload files** match their original SHA-256 inventory. All **46 original source files** referenced by the curated-source provenance manifest also match their captured original hashes. This independent review did not modify either source location or the existing deployment.

## Reproduce

Start the strict candidate server from this project:

```powershell
python scripts/serve.py --port 4336
```

In another terminal, run the independent read-only recheck:

```powershell
python C:/Dev/treed-portfolio-v2/output/playwright/russound-independent-audit/recheck.py
```

It independently verifies inventory, file and ZIP hashes, private signatures, original preservation, every recorded negative request, all served files, the old query parameter, video ranges, and the saved browser downloads. Reproduce the downloads by opening `/#planner`, saving the default brief, then selecting the four custom choices above, opening the editable brief, adding the quoted visitor note, and saving again.

This is a confidentiality and artifact-boundary review. The parent build's separate desktop/mobile interaction and visual review covers presentation and broader behavior. A future hosted release still requires the same direct-path checks against its own origin, because deployment configuration can change routing and exposure.
