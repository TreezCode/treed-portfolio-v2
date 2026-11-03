# Portfolio measurement

## Connected accounts, verified November 3, 2026

The owner authorized Google Analytics and Search Console setup through the existing Google account. The portfolio has its own property within TreezAnalytics; other properties were not changed.

| Setting | Verified value |
| --- | --- |
| GA4 account | TreezAnalytics, `256385215` |
| GA4 property | Build With Treez Portfolio, `562162593` |
| Web stream | Build With Treez production, `16264746038` |
| Measurement ID | `G-S67R6WEVXS` |
| Website | `https://buildwithtreez.com` |
| Reporting timezone / currency | New York / USD |
| Search Console | Domain property `sc-domain:buildwithtreez.com`, verified owner |
| OpenSEO | Project `f5dbaf72-a417-45bd-9ab7-338fc933e578`, both Google properties connected |

Google signals and user-provided data collection are off. Ads personalization is disabled in all 307 regions. Enhanced measurement is off at stream level; the disabled feature's individual defaults are inert. Event and user-data retention are both two months, with reset on new activity off. Those retention settings were saved and reopened to verify them. `generate_lead` is a key event, counted once per event, with no default monetary value. Google's creation flow initially persisted a $1 value despite the no-value choice; a follow-up edit removed it and the Admin API readback confirmed its absence.

Eight event-scoped custom dimensions are registered: `project_id`, `destination_domain`, `link_kind`, `experiment`, `format`, `game`, `room` and `hint_level`. Search Console is also linked directly to this GA4 web stream. OpenSEO's measurement health readback confirms the stream, measurement ID, key event and all eight definitions. Its enhanced-measurement/site-search warnings are intentional under this manual, privacy-limited event contract. Google's unused default key events do not have application senders.

Ownership uses a new TXT record in the existing Netlify DNS zone `69d72ffcb9f2aec13c35e618`, record ID `6aea1c9b2bf384f1a38b6b2d`. It was visible through Google's public DNS resolver before Search Console returned **Ownership verified**. Existing web and verification records were preserved. Keep this TXT record to retain ownership.

The public measurement ID is saved and read back on Netlify site `ec535d22-007f-4358-8674-153121e8ad99`, in the **production context only**. This account rejected restricted build scopes, so the non-secret ID uses the plan's default scopes. Runtime and context guards still prevent local or preview collection. No build/deployment was triggered by account setup.

The connected Search Console read returned zero rows for October 4–31, 2026. This establishes connection, not traffic or search visibility. The live site still serves its earlier one-URL sitemap; the candidate has 29 URLs. Submit `https://buildwithtreez.com/sitemap.xml` after the authorized release, then verify its fetched contents and indexing eligibility. Live GA4 receipt, public social fetches and hosted headers likewise remain post-release checks.

Account evidence is retained locally in `output/playwright/launch-accounts/`. Browser verification is recorded in `output/playwright/launch-analytics/FINAL_REVIEW.md`; metadata verification is in `output/playwright/social-preview/FINAL_REVIEW.md`. The production candidate is build `ehUPGqfFr8uX0wCP-EwxD`, served locally on port 4340. Nine browser tests and seven policy tests passed, along with the production build, scoped ESLint and TypeScript. The real Google SDK test intercepted all collection calls and sent no QA events to the property.

## Runtime configuration

This launch uses one GA4 property for the portfolio. Public collection requires all three conditions: a valid `NEXT_PUBLIC_GA_MEASUREMENT_ID`, the `production` deployment context, and the exact `buildwithtreez.com` hostname. Local, branch and deploy-preview traffic cannot initialize the Google tag. Netlify's `CONTEXT` takes precedence over any explicitly supplied `NEXT_PUBLIC_ANALYTICS_CONTEXT`.

## Consent and payload boundary

`PortfolioAnalytics` mounts once in the root layout. Before consent it makes no Google request, creates no Google tag and queues no past pageviews or actions. The notice offers equal-size allow/decline actions; the footer and privacy page can reopen preferences. The choice stays in local storage, with an in-memory fallback when storage is unavailable. Changes synchronize between tabs.

Allowing analytics initializes the tag with analytics storage granted, advertising storage/user-data/personalization denied, and Google signals/personalization disabled. Declining sets Google's property-specific opt-out flag, stops the application event sender, clears this site's `_ga` cookies and empties pending commands. It does not delete data previously received by Google. Browsing, contact, local game saves and exports remain functional without consent.

Only known core routes and the server-supplied approved project IDs may appear in `page_location`. Query strings and hashes are excluded. Referrers are reduced to origin; subsequent internal navigation uses the previous clean route. Optional public campaign labels (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) accept at most 64 alphanumeric/underscore/hyphen characters. Labels containing email syntax, whitespace or other punctuation are rejected. Use intentional public labels such as `linkedin`, `social`, `living_archive_launch` and `hero_carousel` in promotional URLs; never place personal details in campaign tags.

Custom events pass a name-specific field allowlist. No form values, email addresses, full destination URLs, free-text searches, recipe hashes, pointer samples or render-frame measurements are sent. Session replay and advertising features are outside this setup.

## Event contract

| Event | Trigger and permitted dimensions |
| --- | --- |
| `page_view` | Consent plus a known route; one event per route change. No replay of routes visited before consent. |
| `generate_lead` | Contact API returns HTTP success and `{ success: true }`, with the honeypot empty. `method=contact_form`. This records a submitted inquiry, not a qualified opportunity. |
| `resume_click` | A visitor clicks the portfolio resume link. This is a click, not confirmation that a download completed. |
| `email_click` | A visitor clicks a mail link; no recipient or subject is included. |
| `project_link_click` | A marked project link is clicked. Approved `project_id`, destination domain and a fixed `link_kind` distinguish site, source, video, product, case study and archive links. |
| `bench_interaction` | First meaningful parameter, preset, view or export action in the mounted bench. |
| `bench_export` | SVG/PNG download is initiated. Only `format` and the fixed experiment name. |
| `bench_share` | Recipe link is successfully copied. No recipe or complete URL. |
| `game_start` | First instrument choice, move or hint in the mounted game. |
| `game_hint` | A hint is shown; fixed game/room names and hint level 1–3. |
| `game_complete` | A valid explicit move enters the solved portal. Completed-save restoration and repeated entry do not count as a new completion in that mount. |

## Google property settings

- Turn **all enhanced measurement off**. The application owns pageviews and relevant events, so history, form, outbound, download and site-search automation would duplicate actions or send unapproved parameters.
- Keep Google signals and advertising personalization off. No Ads link is required.
- Mark `generate_lead` as the primary key event. Resume, project and game events remain engagement indicators.
- Recommended event/user-data retention: two months, with retention reset on new activity off.
- Useful event-scoped custom dimensions: `project_id`, `destination_domain`, `link_kind`, `experiment`, `format`, `game`, `room`, `hint_level`.

The JavaScript sets `send_page_view: false` on initialization and each route configuration. It emits explicit clean pageviews and updates the route configuration so automatically collected engagement events use the same sanitized location. Advertising joins are disabled both in consent and configuration. CSP permits only the Google tag and Analytics transport hosts needed by this integration.

## Verification

Run `node --experimental-strip-types --test tests/analytics-policy.test.mjs`. Seven tests cover deployment exclusions, consent, no retroactive collection, deduplication/back navigation, revocation, unknown routes, payload field restrictions, and sanitized campaign/referrer values. Scoped ESLint and TypeScript checks cover the component integration.

Browser checks must intercept Google requests before testing a simulated production origin. Do not send local QA events into the production property. Check zero requests before consent, one tag after acceptance, one pageview per actual route, successful-form-only conversion, decline/revoke and saved-choice reloads, no query/hash/form data, and no events from restored game completion. Also inspect the consent panel at 390px and 320px, keyboard focus, the footer preference control and blocked-storage behavior.

After an authorized deployment, verify the real production event flow and property settings with a clearly identified QA session. A local intercepted check verifies application behavior; it does not establish that GA4 received live events. Search Console ownership and sitemap submission are separate from analytics collection.

Official references consulted November 3, 2026: [manual pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views), [privacy controls and opt-out flag](https://developers.google.com/tag-platform/security/guides/privacy), [Content Security Policy](https://developers.google.com/tag-platform/security/guides/csp).
