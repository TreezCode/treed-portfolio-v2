# Temporary portfolio hold

November 4, 2026. Joey requested withholding the Russound client website until its launch, preserving all content, selecting a replacement and deploying the change. He explicitly confirmed that Sound, Made Clear can remain public because it uses public Russound data.

## Public state

- Russound Digital Experience and Music in the Room are absent from the public catalog. Their case-study and social-image routes return 404 and they are excluded from the sitemap, related work and client project data.
- Sound, Made Clear remains selected, with its case study, hero artwork, social preview, course link and three images unchanged.
- Codorus Web replaces the website experience in the homepage featured trio. Portal Keeper replaces it in the hero wall and collection, keeping 12 selected projects and linking to its existing interactive case study. Existing approved copy and imagery are reused.
- Four withheld images were moved here from `public` without changing their bytes. `assets.json` records original public paths and SHA-256 digests.
- The independent Russound portfolio demo and original client-review deployments are outside this portfolio update and remain unchanged.

## Preserved source

- `src/data/portfolio-russound.ts`: complete website and motion records, plus a reference to the public course record.
- `src/data/portfolio-sound-made-clear.ts`: the original course record extracted without copy changes, so public imports do not pull in withheld records.
- `src/data/case-studies-client.ts`: full case-study content remains intact.
- `public/` within this folder: archived images in their original relative layout.

## Restore after owner authorization

1. Copy each manifest asset from this folder's `public/` subtree to the repository's `public/` subtree and verify its digest.
2. In `src/data/portfolio.ts`, replace the standalone `soundMadeClearProject` import/array entry with the `russoundProjects` import and array spread. Do not include both or duplicate the course.
3. Restore `russound-digital-experience` to the selected list when its updated case study is approved. Review the website's actual launch status and links first. Motion studies were not selected before this hold, so do not automatically add them to the collection.
4. Choose whether to restore the previous hero and featured placement or keep Codorus Web there.
5. Build, inspect desktop/mobile, verify restored case-study/social-image routes and sitemap, then deploy with authorization.

Copy research: research not needed. This bounded publication change reuses approved project wording and the existing portfolio audience evidence; no new public claims or paid research were introduced.
