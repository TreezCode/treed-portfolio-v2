# Isolated release boundary

Run these commands from `experiences/russound` with Python 3.11 or newer. Scripts use the standard library only. They make no network or deployment calls.

```powershell
python scripts/release.py prepare
python -m unittest discover -s scripts -p 'test_*.py' -v
npm run build
python scripts/release.py package
python scripts/release.py verify
python scripts/serve.py --port 4336
```

`prepare` copies only the approved image and video asset folders from the frozen client-review upload. It excludes HTML, compiled bundles, review documents and PDFs. `asset-provenance.json` records the complete original 86-file SHA-256 inventory and each copied asset. Repeating `prepare` validates that both original upload and staged assets are unchanged. The frozen path is declared at the top of `release.py`; it is read only.

The Astro source closure and original source hashes are documented separately in `source-manifest.json`. The new source is curated, so never replace it with a broad copy from the review site. Dependency installation is separate from these scripts; use the project's resolved lockfile. Build caches and output stay in this project.

`package` starts from the six route HTML files and `404.html`, follows local HTML, CSS, JavaScript, SVG, srcset and literal dynamic asset references, and rejects missing files or unexpected local routes, roots and types. It scans all selected bytes, including HTML comments, bundles, JSON and binary metadata, for specific internal review signatures. Legitimate public company history, product installation notes and the visitor's own planner notes are retained.

Only this dependency closure, a noindex robots file and headers enter `release/upload`. The explicit file/hash/reference manifest and deterministic ZIP sit beside that directory. Upload or serve only `release/upload`, never `dist`, this project, or the parent `release` folder. The ZIP contains exactly the upload files. Source, internal documents, archives and source maps cannot enter the package through the resolver.

Existing releases are preserved. For a subsequent build use a new directory, and pass the same flag to package, verify and serve:

```powershell
python scripts/release.py package --release-dir release-r02
python scripts/release.py verify --release-dir release-r02
python scripts/serve.py --release-dir release-r02 --port 4336
```

The local preview server verifies the package and originals before listening on loopback. It serves only manifest files, uses the actual 404 document for unknown routes, rejects encoded traversal and never lists directories. It supports GET, HEAD and single byte ranges for the cinematic video. Evidence manifests, source, build scripts and ZIP files remain outside its boundary. `_headers` is a hosting configuration file and is not served by the preview server.

The package command prints final file, byte and anchor counts. `package-manifest.json` provides exact per-file hashes and reference edges. Negative tests inject private content, documents, missing assets, extra routes, broken anchors and traversal requests. These static checks and local HTTP tests complement browser interaction checks. They do not establish permissions or headers on a future hosting deployment.
