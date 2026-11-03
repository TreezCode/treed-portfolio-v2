import type { PortfolioProject } from './portfolio-types'

/** Current production sources and asset lineage: docs/portfolio-refresh/creative-inventory.md. */
export const creativeProjects: PortfolioProject[] = [
  {
    id: 'elsewhere',
    title: 'Elsewhere',
    category: 'Web & apps',
    kind: 'Interaction study',
    year: '2026',
    group: 'Independent studies',
    description:
      'A photographic collection on a tilted plane. The imagery responds to the pointer while the invitation stays still.',
    role: 'Visual identity, interaction design and frontend engineering',
    image: {
      src: '/portfolio/2026/elsewhere.webp',
      alt: 'Elsewhere’s original website composition with photographic covers behind a clear foreground headline.',
    },
    tags: ['Astro', 'CSS perspective', 'GSAP'],
    story: [
      'Elsewhere is an original fictional collection built to explore a perspective media wall. Inspired by the interaction mechanics of Atrium Music, it brings twenty independently licensed photographs together with original cover titles and typography.',
      'Neighboring rows respond in opposing directions to pointer movement, then drift more slowly than the page during the scroll exit. Mobile keeps a deliberately composed static wall, with native scrolling, a pause control and useful content when motion is unavailable.',
    ],
    links: [],
  },
  {
    id: 'fieldwork',
    title: 'Fieldwork',
    category: 'Web & apps',
    kind: 'Interaction study',
    year: '2026',
    group: 'Independent studies',
    description:
      'An architectural web study with opposing headline movement, a shifting diagonal edge and a tactile gallery of light and form.',
    role: 'Art direction, vector design, motion choreography and frontend engineering',
    image: {
      src: '/portfolio/2026/fieldwork.webp',
      alt: 'Fieldwork’s forest-green website opening with large ivory typography and original elliptical contour artwork.',
    },
    tags: ['Astro', 'GSAP', 'Native scroll'],
    story: [
      'Fieldwork translates the graphic choreography studied in The Grovery into an original fictional identity: forest green, sharp lime, oversized typography and a custom nested-ellipse drawing. The headline departs along opposing tracks as a diagonal boundary settles into the next section.',
      'A native scrolling gallery connects the selected image, caption and optional photo-motion preview. Keyboard controls, touch gestures and motion preferences share the same selection model, keeping the interaction coherent across layouts.',
    ],
    links: [],
  },
  {
    id: 'cosmic-zen',
    title: 'Cosmic Zen Collections',
    category: 'Creative work',
    kind: 'Animated adventure series',
    year: '2026',
    description:
      'A small hero. A very big universe. Original animated adventures built around recurring characters, cosmic powers and cinematic storytelling.',
    role: 'Worldbuilding, character direction, storyboards and film production',
    image: {
      src: '/portfolio/2026/cosmic-zen.webp',
      alt: 'Cosmic Zen in his black and violet outfit, surrounded by blue and gold comet light.',
    },
    tags: ['Character design', 'Storyboarding', 'Animation'],
    story: [
      'Cosmic Zen began as a personal family adventure and grew into a connected world of floating islands, secret school-day powers and unlikely friendships. Each short starts with a clear visual incident and a story worth following.',
      'I develop the characters, direct the action and camera progression, and maintain a reference system that carries identity and continuity across episodes. The series includes Sky Island Awakening, Secret Powers, Rival Spark and Mosaic Resonance.',
    ],
    links: [
      { label: 'Watch the adventures', href: 'https://www.youtube.com/@CosmicZenCollections' },
    ],
    featured: true,
  },
  {
    id: 'little-portal-studio',
    group: 'Little Portal Studio',
    title: 'Little Portal Studio',
    category: 'Creative work',
    kind: 'Independent creative shop',
    year: '2026',
    description:
      'Little worlds for people who stream. A growing collection of animated scenes, tactile transitions and seasonal details.',
    role: 'Brand, art direction, motion, product development and delivery',
    image: {
      src: '/portfolio/2026/little-portal-studio-logo.webp',
      alt: 'Little Portal Studio’s illuminated doorway logo on a deep blue background.',
    },
    tags: ['Creative direction', 'Digital products', 'OBS'],
    story: [
      'I built Little Portal Studio around a simple idea: a stream can feel like somewhere you want to spend time. The collection moves from a miniature observatory and pearlescent waves to complete winter and Christmas worlds.',
      'The work extends from the first composition through animation, transparent media, setup guides, native OBS checks and product presentation. Eight released products now sit alongside new material and motion studies.',
    ],
    links: [
      { label: 'Explore the shop', href: 'https://www.etsy.com/shop/LittlePortalStudio' },
      { label: 'Watch the collection', href: 'https://www.youtube.com/@LittlePortalStudio' },
    ],
    featured: true,
  },
  {
    id: 'glasshouse',
    title: 'The Glasshouse',
    category: 'Creative work',
    kind: 'Released stream world',
    year: '2026',
    group: 'Little Portal Studio',
    description:
      'Snow outside, lantern light inside. A coordinated winter world for screens, camera frames and live alerts.',
    role: 'Art direction, scene compositing, motion and product engineering',
    image: {
      src: '/portfolio/2026/glasshouse.webp',
      alt: 'An ornate conservatory arch frames a blue winter valley and a warm hanging lantern.',
    },
    tags: ['Atmospheric motion', 'Stream design', 'Transparent video'],
    story: [
      'A quiet winter landscape becomes the visual foundation for a complete streaming collection. Restrained snowfall and atmosphere keep the scene alive while preserving generous space for the streamer.',
      'The finished pack carries the same visual language into status screens, camera and chat layouts, alerts, panels and editable channel headers. Illustrated instructions connect the artwork to practical OBS and StreamElements setup.',
    ],
    links: [
      {
        label: 'View the released pack',
        href: 'https://www.etsy.com/listing/4605797331/winter-stream-overlay-pack-for-obs',
      },
    ],
  },
  {
    id: 'sugarplum-bakery',
    title: 'Sugarplum Bakery',
    category: 'Creative work',
    kind: 'Released stream world',
    year: '2026',
    group: 'Little Portal Studio',
    description:
      'Piped icing, cranberry sugar and warm oven light. A Christmas bakery made into a complete streaming collection.',
    role: 'Art direction, animation, component design and buyer experience',
    image: {
      src: '/portfolio/2026/sugarplum-bakery.webp',
      alt: 'An intricate gingerbread bakery with icing arches, cranberry ornaments and a glowing oven.',
    },
    tags: ['Worldbuilding', 'Motion design', 'OBS'],
    story: [
      'Sugarplum is built around a consistent material family: baked surfaces, delicate icing, translucent cranberry sugar and patterned linen. Its central opening gives the scene room to breathe.',
      'I extended that world into animated screens, frames, alerts, layouts and editable headers, then prepared the package and setup experience. A separate music-backed showcase presents the finished collection.',
    ],
    links: [
      { label: 'Watch the showcase', href: 'https://www.youtube.com/watch?v=VqMbmApZ0sY' },
      {
        label: 'View the released pack',
        href: 'https://www.etsy.com/listing/4606432007/christmas-twitch-overlay-pack-for-obs',
      },
    ],
    featured: true,
  },
  {
    id: 'north-pole-dispatch',
    title: 'North Pole Dispatch',
    category: 'Creative work',
    kind: 'Released stream world',
    year: '2026',
    group: 'Little Portal Studio',
    description:
      'A Christmas postal workshop, complete with letter cubbies, cranberry enamel, brass details and a dimensional wax seal.',
    role: 'Art direction, 3D components, animation and product delivery',
    image: {
      src: '/portfolio/2026/north-pole-dispatch.webp',
      alt: 'A festive postal workshop with ivory letter cubbies, a cranberry mail chute and a snowy village window.',
    },
    tags: ['3D design', 'Seasonal worlds', 'Live alerts'],
    story: [
      'North Pole Dispatch turns the rituals of receiving mail into a visual language for live streaming. Letter arrivals, parcels, stamps and a dimensional wax seal give each alert its own small story.',
      'The complete collection includes coordinated scenes, camera frames, layouts, supporter artwork, panels and editable headers. The final pack and its holiday showcase were released in November 2026.',
    ],
    links: [
      { label: 'Watch the showcase', href: 'https://www.youtube.com/watch?v=TgphcDeaJSI' },
      {
        label: 'View the released pack',
        href: 'https://www.etsy.com/listing/4607793309/christmas-twitch-overlay-pack-for-obs',
      },
    ],
  },
  {
    id: 'observatory',
    title: 'Observatory',
    category: 'Creative work',
    kind: 'Released motion product',
    year: '2026',
    group: 'Little Portal Studio',
    description:
      'A miniature observatory between scenes. A dimensional shutter transition with carefully timed picture and sound.',
    role: '3D modeling, animation, sound direction and release engineering',
    image: {
      src: '/portfolio/2026/observatory.webp',
      alt: 'Observatory stream transition artwork and its dimensional circular shutter.',
    },
    tags: ['Blender', 'Motion design', 'Sound design'],
    story: [
      'The opening Little Portal Studio release turns a practical scene change into a small mechanical performance. An authored shutter closes, holds the cut and opens into the next scene.',
      'Three palettes and Normal, Quiet and Silent sound options give streamers a choice of character. The release includes transparent video, illustrated instructions and a real OBS setup demonstration.',
    ],
    links: [
      { label: 'Watch the transition', href: 'https://www.youtube.com/watch?v=JNg4lX9VfyQ' },
      {
        label: 'View the product',
        href: 'https://www.etsy.com/listing/4591663450/observatory-obs-stinger-transition',
      },
    ],
  },
  {
    id: 'prism-tide',
    title: 'Prism Tide',
    category: 'Creative work',
    kind: 'Released motion product',
    year: '2026',
    group: 'Little Portal Studio',
    description:
      'Pearlescent waves gather and release, turning a scene change into a fluid, tactile moment.',
    role: 'Material design, 3D animation, sound integration and packaging',
    image: {
      src: '/portfolio/2026/prism-tide.webp',
      alt: 'Pearlescent mint, lilac and ivory waves in the Prism Tide transition.',
    },
    tags: ['Materials', '3D motion', 'Transparent video'],
    story: [
      'Prism Tide explores softness through broad overlapping forms and shifting pearlescent color. The movement covers the scene change before releasing into the next image.',
      'The finished product includes three palettes with Normal, Quiet and Silent sound variants. Its continuous sound treatment follows the same gather-and-release rhythm as the picture.',
    ],
    links: [
      { label: 'Watch the transition', href: 'https://www.youtube.com/watch?v=cr1Y9pDIKnM' },
      {
        label: 'View the product',
        href: 'https://www.etsy.com/listing/4600732305/prism-tide-obs-stinger-transition',
      },
    ],
  },
  {
    id: 'signal-fold',
    title: 'Signal Fold',
    category: 'Creative work',
    kind: 'Released motion product',
    year: '2026',
    group: 'Little Portal Studio',
    description:
      'Angled panels gather, catch a moving highlight and reveal the next scene with a crisp graphic rhythm.',
    role: 'Visual direction, animation, sound timing and product delivery',
    image: {
      src: '/portfolio/2026/signal-fold.webp',
      alt: 'Signal Fold artwork showing its layered angled panels and restrained graphic palette.',
    },
    tags: ['Graphic motion', 'Sound timing', 'OBS'],
    story: [
      'Signal Fold passes a visual cue across matte planes like a choreographed relay. Shallow dimensional edges provide tactility while broad quiet areas keep the stream identity in charge.',
      'Three finished palettes and coordinated sound variants carry the direction into a downloadable OBS transition, supported by native playback checks and setup guidance.',
    ],
    links: [
      { label: 'Watch the transition', href: 'https://www.youtube.com/watch?v=f7V5SdMkL6k' },
      {
        label: 'View the product',
        href: 'https://www.etsy.com/listing/4602107193/signal-fold-obs-stinger-transition',
      },
    ],
  },
  {
    id: 'winterlight-atelier',
    title: 'Winterlight Atelier',
    category: 'Creative work',
    kind: 'Released decoration collection',
    year: '2026',
    group: 'Little Portal Studio',
    description:
      'Glowing star lanterns, brass frames and evergreen foliage, designed to live around a streamer’s existing layout.',
    role: '3D design, lighting, loop animation and instructional media',
    image: {
      src: '/portfolio/2026/winterlight-atelier.webp',
      alt: 'Winterlight Atelier lanterns and evergreen accents in winter and Christmas finishes.',
    },
    tags: ['Lighting', 'Loop animation', 'Modular design'],
    story: [
      'Winterlight Atelier brings atmosphere to the edges of a stream. Single Light, Hanging Canopy and Lantern Nook work independently or together, with room left for the actual content.',
      'The six silent loops span Frost & Brass and Evergreen & Cranberry finishes. Matching camera accents and a recorded OBS walkthrough complete the product.',
    ],
    links: [
      { label: 'Watch the collection', href: 'https://www.youtube.com/watch?v=gJgFTgIR_8c' },
      {
        label: 'View the product',
        href: 'https://www.etsy.com/listing/4602668883/winterlight-atelier-winter-christmas',
      },
    ],
  },
  {
    id: 'merry-current',
    title: 'Merry Current',
    category: 'Creative work',
    kind: 'Released decoration collection',
    year: '2026',
    group: 'Little Portal Studio',
    description:
      'Cherry and turquoise glass lights, gold stars and an illuminated ribbon tree for a brighter Christmas stream.',
    role: '3D modeling, materials, lighting and animation',
    image: {
      src: '/portfolio/2026/merry-current.webp',
      alt: 'Merry Current Christmas decorations with colorful lights, stars and a luminous ribbon tree.',
    },
    tags: ['Blender', 'Lighting', 'Seasonal design'],
    story: [
      'Merry Current is a playful counterpart to the quieter Winterlight collection. Gold, cherry, turquoise and ivory connect a hanging garland, ribbon tree and camera-corner accent.',
      'Each piece is an independent silent animation with transparency, so a streamer can choose a single accent or build the complete arrangement. The product includes an illustrated guide and an actual OBS setup walkthrough.',
    ],
    links: [
      {
        label: 'View the product',
        href: 'https://www.etsy.com/listing/4603160817/christmas-stream-decorations-for-obs',
      },
    ],
  },
  {
    id: 'paper-garden',
    title: 'Paper Garden',
    category: 'Creative work',
    kind: 'Material and motion study',
    year: '2026',
    group: 'Little Portal Studio',
    description:
      'A folded botanical world that unfurls, fills the frame and curls back toward its stems.',
    role: 'Concept, procedural 3D craft, choreography and sound pairing',
    image: {
      src: '/portfolio/2026/paper-garden.webp',
      alt: 'Folded paper foliage in Paper Garden’s sage and apricot palette.',
    },
    tags: ['Paper craft', 'Blender', 'Motion study'],
    story: [
      'Paper Garden explores the warmth of broad folded leaves, soft shadows and restrained paper fibers. The transition is carried by the material itself: an asymmetrical canopy gathers, settles and opens again.',
      'The study includes three finished visual palettes, responsive choreography and a synchronized paper sound treatment. Editable production controls keep the folds, coverage and release timing available for refinement.',
    ],
    links: [],
  },
  {
    id: 'tinsel-tonight',
    title: 'Tinsel Tonight',
    category: 'Creative work',
    kind: '3D art direction study',
    year: '2026',
    group: 'Little Portal Studio',
    description:
      'A retro Christmas studio in mint, cranberry, ivory and chrome, framed by gathered velvet curtains.',
    role: 'Art direction, 3D scene development and material studies',
    image: {
      src: '/portfolio/2026/tinsel-tonight.webp',
      alt: 'Tinsel Tonight’s mint stage, ribbed backdrop, gathered cranberry curtains and frosted trees.',
    },
    tags: ['Art direction', 'Blender', 'Material study'],
    story: [
      'Tinsel Tonight borrows the warmth of a holiday television studio: a small mint stage, ribbed glass, chrome trim, bottlebrush trees and deep cranberry velvet.',
      'The current editable Blender study develops the studio and a matching Curtain Call transition through modeled fabric, sewn hems and controlled closure poses. The accepted still direction establishes the material language for the next production phase.',
    ],
    links: [],
  },
  {
    id: 'artificial-influence',
    title: 'Artificial Influence',
    category: 'Creative work',
    kind: 'Character-led short films',
    year: '2026',
    description:
      'Recurring fictional characters, everyday comedy and a little impossible behavior. Short films with a consistent cast and distinct voices.',
    role: 'Character development, scripts, scene direction and production workflow',
    image: {
      src: '/portfolio/2026/artificial-influence.webp',
      alt: 'Mara Vale in a creative studio with a large handmade paper koi.',
    },
    tags: ['Character direction', 'Short films', 'Production systems'],
    story: [
      'Romy Arden and Mara Vale approach the world with different kinds of mischief. Their films combine recognizable characters, purposeful movement, dialogue and visual surprises that fit each personality.',
      'The production system keeps identity references, story choices, source footage and release packages connected across episodes. Work includes character and wardrobe direction, complete scene production, matching covers and captions.',
    ],
    links: [
      { label: 'Meet Romy', href: 'https://www.instagram.com/romy.arden/' },
      { label: 'Meet Mara', href: 'https://www.instagram.com/maramakesamess/' },
    ],
  },
  {
    id: 'impulse',
    title: 'IMPULSE',
    category: 'Creative work',
    kind: 'Motion and sound study',
    year: '2026',
    description:
      'Energy becomes form. Fifteen seconds of kinetic typography, a dimensional iris, glass and recorded sound.',
    role: 'Creative direction, motion design, compositing and sound integration',
    image: {
      src: '/portfolio/2026/impulse.webp',
      alt: 'A dimensional ivory iris surrounding a luminous blue ring in the IMPULSE motion film.',
    },
    tags: ['Kinetic typography', '3D motion', 'EffectCraft'],
    story: [
      'IMPULSE moves through graphic type, mechanical form and fluid material in a compact visual rhythm. The soundtrack combines a recorded Sansula melody with tactile accents that follow the picture.',
      'The latest version rebuilds the opening and closing as editable EffectCraft typography and shapes while preserving the original rendered inserts and selected soundtrack. The native project supports continued editing through both the desktop interface and connected tools.',
    ],
    links: [{ label: 'Play the film', href: '/portfolio/2026/impulse-preview.mp4' }],
    featured: true,
  },
  {
    id: 'original-lofi',
    title: 'An Original Lo-fi Instrumental',
    category: 'Creative work',
    kind: 'Music composition study',
    year: '2026',
    description:
      'A warm piano phrase develops into a complete instrumental, with a straight groove, synthesized bass and a quiet room around it.',
    role: 'Composition, arrangement, synthesis and mix production',
    image: {
      src: '/portfolio/2026/original-lofi.webp',
      alt: 'Waveform of the complete original lo-fi instrumental.',
    },
    tags: ['Original composition', 'MIDI', 'Audio production'],
    story: [
      'A small melodic idea becomes a 32-bar arrangement at 90 BPM, moving through an opening, theme, development, quieter passage and reprise. The delivery includes an editable score and MIDI, aligned instrument stems and a finished stereo mix.',
      'Piano samples: Salamander Grand Piano by Alexander Holm, CC BY 3.0, distributed by Tone.js. Adapted with tuning, envelopes, filtering, mixing and room treatment in this original composition. Drums: Virtuosity Drums by Versilian Studios and Karoryfer Samples, performed by Austin McMahon, CC0. Bass is original synthesis.',
    ],
    links: [
      { label: 'Listen to the instrumental', href: '/portfolio/2026/original-lofi.mp3' },
      {
        label: 'Piano sample credit',
        href: 'https://github.com/Tonejs/audio/tree/master/salamander',
      },
      { label: 'CC BY 3.0 license', href: 'https://creativecommons.org/licenses/by/3.0/' },
    ],
  },
]
