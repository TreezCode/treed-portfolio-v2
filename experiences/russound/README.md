# Russound portfolio experience

A standalone static Astro edition of the approved Russound visitor experience. Its six routes preserve the selected warm palette, copper product feature, navigation, motion, product discovery and listening planner.

## Source boundary

The source was curated from six visitor entry points and their recursive local dependencies. The client-review page, guide dialog, comparison controls, internal documents and review archive were excluded before the dependency graph was copied. The shared review handler and unused review styles were removed. The footer identifies this edition as a portfolio concept and links back to the case study.

The original prototype and frozen client-review publication remain separate. This project does not import their route tree or public directory at build time. `source-manifest.json` records the original and curated file hashes without copying private document contents. `asset-provenance.json` separately records the approved frozen asset inputs.

Public visitor routes:

- `/`
- `/audio-systems/`
- `/products/smz8/`
- `/catalog/`
- `/connectivity-control/`
- `/news/`

`404.html` provides a return to the experience. There is no alias for an earlier review route. Public product manuals continue to open the official Russound website. The listening brief contains the visitor's selections and editable notes. The newsletter control is an explicit demonstration and does not collect or save email addresses.

## Build and package

Use Node 22.12 or later and the pinned dependencies in `package-lock.json`. The lock preserves the original resolved dependency tree; only the project name changed. Local validation may use a junction to the already installed dependency directory. Astro and Vite caches are isolated under this project's `.cache` directory.

From this directory:

```powershell
npm run build
npm run package
npm run audit
npm run preview
```

`npm run preview` serves only the packaged `release/upload` directory on port 4336. `npm run dev` runs the standalone source on port 4331 for development. See [packaging instructions](scripts/README.md) for asset preparation, immutable release directories and negative route probes.

Only the verified `release/upload` directory is a deployment candidate. Do not publish the project directory, source, manifests, caches or the original client-review package. This project has no deployment command.

## Copy decisions

Premium Client Site and Cinematic Web Experiences continue the approved art direction and interaction behavior. OpenSEO Copy uses the product-UI treatment for the small portfolio-context labels and 404 recovery link. Research was not needed: the audience, existing public product copy and return destination were already established. Product claims and public company history were preserved. Internal review context was removed from visitor copy and source comments.

Build, package, leak and browser checks are recorded by the release workflow. Source preparation alone does not certify a hosted origin; any future hosted release requires the same unknown-route and document-path checks against that origin.
