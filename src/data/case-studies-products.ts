import type { PortfolioCaseStudy } from './portfolio-case-types'

// Original-source and image provenance: docs/portfolio-refresh/product-case-study-provenance.md.
export const productCaseStudies: PortfolioCaseStudy[] = [
  {
    projectId: 'presentsphere',
    introduction:
      'Thoughtful gifts begin with knowing someone. PresentSphere brings birthdays, interests, hints and private plans into one family space, so an original idea can become a gift without spoiling the surprise.',
    challenge:
      'Families overlap. A child may belong to several circles without needing an account, while the adults planning a gift need a smaller, private conversation. The product had to make those relationships understandable and enforce the same boundaries behind the interface.',
    decisions: [
      {
        title: 'Start with the person',
        body: 'I centered the experience on upcoming occasions and durable gift profiles. Interests and preferences give a buyer somewhere to start, even when there is no wishlist. Adults can manage profiles for children and relatives, explicitly choosing which circles receive that information.',
      },
      {
        title: 'Separate sharing from the surprise',
        body: 'Profile sharing, private ideas and gift collaboration have separate permissions. Only accepted collaborators can see shared plan content; the recipient is excluded. Private notes and original captured messages stay with the plan’s creator. Database policies and atomic commands carry these rules through invitations, reservations and access removal.',
      },
      {
        title: 'Make recovery part of saving',
        body: 'A slow connection should not turn one gift into two. Stable submission identifiers let the app reconcile an uncertain response before retrying. The interface distinguishes a confirmed save from a failed refresh, while account changes invalidate old callbacks and retained screens.',
      },
    ],
    delivery: {
      title: 'One product across familiar devices',
      body: 'I built the Expo and React Native application, Supabase data model and separate Next.js public website around the same green-and-lavender identity. Browser history preserves useful drafts and scroll positions, with inactive screens kept out of keyboard and assistive navigation. The browser app is available to approved testers, with Android release preparation underway.',
    },
    reflection:
      'The central design decision is also the central engineering decision: sharing useful context about someone should never silently share the work of surprising them.',
    gallery: [
      {
        src: '/portfolio/cases/presentsphere-person.webp',
        alt: 'Maya’s fictional profile in the actual PresentSphere browser app, showing her birthday, interests and Plan a gift action.',
        caption:
          'A person before a shopping list. Actual app screen with a fictional family example.',
      },
      {
        src: '/portfolio/cases/presentsphere-plan.webp',
        alt: 'A private pottery-afternoon gift plan for Maya, with its reason, status choices and private-notes section.',
        caption: 'The idea, the thought behind it and a clear privacy state stay together.',
      },
    ],
  },
  {
    projectId: 'honeyden',
    introduction:
      'Honeyden makes family routines feel like a small adventure. Children have a welcoming den and savings goals they can picture. Parents have the approvals and activity history that keep those goals grounded.',
    challenge:
      'The same chore has two different jobs: give a child a clear next step, and give a parent a reliable record. I needed a playful interface that could explain progress without making money, rewards or family permissions ambiguous.',
    decisions: [
      {
        title: 'Give each person the right starting point',
        body: 'The child’s den pairs Cubby with one contextual message and a next action. Parent Home puts requests first, then each child’s progress. Shared-device transitions use explicit parent authentication and device-specific child PIN handling, keeping a friendly profile picker connected to real authorization.',
      },
      {
        title: 'Make the money tell a consistent story',
        body: 'Earnings, savings contributions, deductions and returned funds have distinct meanings in one shared activity renderer. Paired transfers can read as a single event without removing the original ledger records. Goal progress keeps exact amounts visible, and server commands govern changes to balances.',
      },
      {
        title: 'Give the character a useful role',
        body: 'Cubby belongs to the routine: welcoming a child, pointing toward a chore or celebrating progress. Original storybook scenes, avatars and collectible badges give that world continuity. Short performances play once and pause when inactive; composed posters carry the same scene when motion is reduced.',
      },
    ],
    delivery: {
      title: 'A working family experience',
      body: 'The cross-platform implementation connects chores, approvals, savings goals, family progress and earned rewards. Synthetic-family walkthroughs exercised parent and child journeys, while database checks covered authorization, concurrent commands and retained ledger history. Loading and error states preserve uncertainty instead of presenting a failed read as a zero balance or an empty inbox.',
    },
    reflection:
      'The personality and the accounting support each other. Cubby makes the next step inviting; precise records make that progress understandable to the family.',
    gallery: [
      {
        src: '/portfolio/cases/honeyden-profile-picker.webp',
        alt: 'Honeyden’s actual profile picker with Cubby at the doorway and the synthetic child profile Maple.',
        caption:
          'The storybook doorway gives shared-device entry a recognizable place. Saved app capture with a synthetic household.',
      },
      {
        src: '/portfolio/cases/honeyden-goals.webp',
        alt: 'Honeyden’s goal-management screen with a shared family goal, funding progress and separate fund, edit and remove actions.',
        caption: 'A shared goal keeps funding, progress and management actions distinct.',
      },
    ],
  },
  {
    projectId: 'renamerly',
    introduction:
      'A folder of camera filenames is a poor handoff. Renamerly turns that folder into a consistent set of named files, with a visible preview and a manifest that connects the original names to the delivered ones.',
    challenge:
      'Photographers and product teams need different naming conventions, but they share one expectation: the name in the workspace must be the name in the export. Supporting flexible formats made that consistency an architectural problem as much as an interface problem.',
    decisions: [
      {
        title: 'Use one engine from preview to delivery',
        body: 'I built a deterministic filename engine that parses a format into a structured representation, then renders it against each file’s context. Presets and custom formats use the same grammar. Workspace rows, ZIP exports and CSV manifests all call that engine, removing a separate preview formatter that could drift from the output.',
      },
      {
        title: 'Make a format tangible',
        body: 'The visual builder exposes useful pieces such as SKU, view, sequence and date. A shared normalization boundary handles case, separators and filename characters. Warnings make missing metadata and date fallbacks visible, while tolerant parsing keeps an imperfect format editable.',
      },
      {
        title: 'Keep image work at the edges',
        body: 'Asynchronous metadata extraction stays outside the pure filename core. RAW previews can help someone identify a shot while export preserves its original file extension. Only a small allowlist of camera metadata is available to filenames, keeping location and serial-number fields out of that public artifact.',
      },
    ],
    delivery: {
      title: 'A usable browser workflow',
      body: 'The live workspace brings file grouping, a format builder, row previews and ZIP plus CSV delivery together. Group-level metadata can be inherited and individual rows overridden, so a shared product description does not need to be retyped for every view.',
    },
    reflection:
      'The most important output is confidence in the handoff. A flexible naming tool becomes useful when every visible choice has a predictable result.',
  },
  {
    projectId: 'local-knowledge-base',
    introduction:
      'Useful work was scattered across project documents and long development conversations. I built a local second brain that can find the relevant passage and lead back to the evidence behind it.',
    challenge:
      'Retrieving a familiar phrase is easy to confuse with recovering a decision. The system needed to distinguish original evidence from summaries, keep projects separate and make missing or stale sources visible before an answer relied on them.',
    decisions: [
      {
        title: 'Keep evidence close to search',
        body: 'SQLite holds the retained source text alongside a compact FTS5 search index. BM25 ranking and a modest recency adjustment provide local keyword retrieval. Project provenance, source locations and fingerprints stay attached to the results, so finding a passage is the beginning of verification.',
      },
      {
        title: 'Respect the shape of technical questions',
        body: 'Quoted phrases, paths and identifiers remain required anchors. A failed exact match is not silently broadened into something similar. Project scoping follows the original document path or working directory, while default filtering suppresses path listings, copied build output and duplicate passages.',
      },
      {
        title: 'Make maintenance inspectable',
        body: 'Incremental ingestion uses a process lock, records source health and preserves coverage gaps. Transactional index updates keep search aligned with the source records. Search and inspection open the database read-only; ordinary refresh stays local. Generated summaries remain attributed pointers with explicit links to their evidence.',
      },
    ],
    delivery: {
      title: 'Research infrastructure used in the work',
      body: 'The implementation includes ingestion, scoped search, source inspection, health reports and a repeatable verification workflow. It helped recover the project histories behind this portfolio, with current original files checked before those histories became public descriptions.',
    },
    flow: {
      title: 'From recollection to evidence',
      introduction: 'A result is useful when another person can follow how it was established.',
      steps: [
        {
          title: 'Collect',
          body: 'Retain supported local documents and conversation records with their provenance.',
        },
        {
          title: 'Find',
          body: 'Search distinctive terms within the relevant project and inspect the matching passage.',
        },
        {
          title: 'Verify',
          body: 'Open the original source, check its date and separate a proposal from a completed result.',
        },
      ],
    },
  },
  {
    projectId: 'vanilla-portfolio',
    introduction:
      'The first portfolio brought code and digital art into the same place. Its bold type, illustrated identity and browsable gallery already showed the combination that still runs through my work.',
    challenge:
      'I wanted a personal site that could introduce my development projects and make a growing image collection enjoyable to explore. The interactions needed to stay understandable in a small, directly editable codebase.',
    decisions: [
      {
        title: 'Build the gallery as small cooperating parts',
        body: 'Image data, rendering, pagination and the pointer magnifier live in separate JavaScript modules. Category filters and text search help visitors move through the collection, while the magnifier invites a closer look at the artwork.',
      },
      {
        title: 'Let the page have a point of view',
        body: 'A strong opening, custom imagery and playful project presentation give the site an identity beyond a list of repositories. The implementation uses HTML, CSS and JavaScript with Bootstrap styling and jQuery helpers.',
      },
    ],
    delivery: {
      title: 'An origin point worth keeping',
      body: 'The restored historical exhibit preserves the page, original gallery and custom interactions, with optimized images and current contact links. It keeps an early expression of the same interest in useful interaction and imaginative visual work that shapes the current portfolio.',
    },
    gallery: [
      {
        src: '/portfolio/cases/first-portfolio-archive.webp',
        alt: 'The restored first portfolio opening, with its original purple moon landscape, Treez Code identity and historical-preview banner.',
        caption: 'The original visual identity, preserved in a working historical exhibit.',
      },
    ],
  },
]
