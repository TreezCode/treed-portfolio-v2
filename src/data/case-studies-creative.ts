import type { PortfolioCaseStudy } from './portfolio-case-types'

export const creativeCaseStudies: PortfolioCaseStudy[] = [
  {
    projectId: 'cosmic-zen',
    introduction:
      'Cosmic Zen began as a family keepsake and grew into an original animated adventure series. I developed its recurring cast, powers and connected story arcs, then directed the storyboards, character action and camera progression that bring each short to life.',
    challenge:
      'A fifteen-second adventure has to establish a problem, make the action readable and earn its ending. Across a series, the same characters must remain recognizable while the locations, threats and camera language keep evolving.',
    decisions: [
      {
        title: 'Give every power a visual identity',
        body: 'Cosmic Zen’s comet light and Super Joe’s prismatic pattern language serve different dramatic roles. Canonical identity and motion references keep silhouettes, materials and powers consistent, while episode-specific direction controls the performance.',
      },
      {
        title: 'Storyboard the action before the finish',
        body: 'Rough cinematic boards establish the cause and effect of a scene: attack, response, reversal and payoff. Changes in angle and shot scale follow the action, giving the final imagery a clear sequence to resolve.',
      },
      {
        title: 'Make teamwork happen in the same moment',
        body: 'Mosaic Resonance gives Super Joe an active role in the shared problem. In Glare Moth, his tactical response creates an opening for Cosmic Zen’s aerial counter. Both characters contribute to one unfolding incident.',
      },
    ],
    delivery: {
      title: 'A connected world, built episode by episode',
      body: 'The work spans character references, environments, rough boards, completed shorts and a continuing series plan. Sky Island Awakening establishes the world, Secret Powers brings it into everyday life, Rival Spark develops a recurring opponent, and Mosaic Resonance expands the cast and its teamwork.',
    },
    reflection:
      'The most useful production discipline is separating what must stay consistent from what should change. Character identity stays anchored; staging and camera choices remain free to serve the story.',
    flow: {
      title: 'From incident to adventure',
      introduction: 'Each short is built around one visible problem and a concrete payoff.',
      steps: [
        { title: 'Establish', body: 'Choose the incident, setting and opening composition.' },
        {
          title: 'Choreograph',
          body: 'Plan distinct shots, character paths and the turning point.',
        },
        {
          title: 'Connect',
          body: 'Carry the accepted ending into the next episode when the story continues.',
        },
      ],
    },
    gallery: [
      {
        src: '/portfolio/cases/cosmic-zen-storyboard.webp',
        alt: 'Eight rough cinematic panels showing the Glare Moth encounter, with varied angles and arrows describing movement.',
        caption:
          'Glare Moth: the rough board establishes action, camera variety and the shared threat before final rendering.',
      },
      {
        src: '/portfolio/cases/cosmic-zen-glare-moth.webp',
        alt: 'An overhead animated frame of Cosmic Zen and Super Joe confronting a luminous moth on a crystal-lined terrace.',
        caption:
          'An actual frame from the completed Glare Moth episode, bringing both characters into the same incident.',
      },
    ],
  },
  {
    projectId: 'little-portal-studio',
    introduction:
      'Little Portal Studio is my creative shop for streamers: a place for tactile transitions, atmospheric scenes and small details that make a channel feel like its own world. I shape the identity, develop the collections and carry the work through animation, packaging and presentation.',
    challenge:
      'A beautiful scene has to make room for a real stream. Camera footage, chat, live names and gameplay need clear space, and the same visual idea must work across screens, frames, alerts and practical setup instructions.',
    decisions: [
      {
        title: 'Build a material family',
        body: 'Each collection starts with a setting and a small set of recognizable materials. Sugarplum’s icing and cranberry sugar carry into its alert frames. North Pole Dispatch uses ivory stationery, brass and cranberry wax to connect the workshop with its smaller components.',
      },
      {
        title: 'Let the streamer supply the live content',
        body: 'Clean backgrounds, separate frames and transparent animation keep camera, chat and viewer text independent. Full packs offer ready-arranged layouts alongside individual elements, giving the same artwork useful options for different kinds of streams.',
      },
      {
        title: 'Make the handoff part of the product',
        body: 'The production path includes loop and transparency checks, actual OBS playback, illustrated guides and packaged downloads. Where a collection includes alerts, its documentation connects the finished artwork to the supported StreamElements setup.',
      },
    ],
    delivery: {
      title: 'One studio, eight released products',
      body: 'The collection includes complete stream worlds, scene transitions and modular seasonal decorations. Each release carries its own imagery, motion personality and buyer files, while a shared brand and delivery approach make the shop feel connected. The product gallery below brings those finished collections together.',
    },
    reflection:
      'The small details carry the larger world. A wax seal, folded panel or lantern becomes convincing when its material, movement and place in the stream all agree.',
    flow: {
      title: 'From world to working stream',
      introduction: 'The collection is developed as a complete experience.',
      steps: [
        {
          title: 'Set the scene',
          body: 'Define the setting, material language and usable composition.',
        },
        {
          title: 'Build the family',
          body: 'Carry that language through matching components and motion.',
        },
        {
          title: 'Prepare the handoff',
          body: 'Check the files in context and make setup understandable.',
        },
      ],
    },
    gallery: [
      {
        src: '/portfolio/cases/lps-sugarplum-alert-family.webp',
        alt: 'Six Sugarplum Bakery alert designs using matching gingerbread, icing, cranberry and star details.',
        caption:
          'One material language, six different arrivals: the coordinated Sugarplum alert family.',
      },
      {
        src: '/portfolio/cases/lps-dispatch-wax-seal.webp',
        alt: 'A dimensional cranberry wax seal on an ivory postal alert banner against a navy background.',
        caption:
          'The modeled wax-seal treatment carries North Pole Dispatch’s postal identity into a live subscription alert.',
      },
    ],
  },
  {
    projectId: 'rift-riders',
    introduction:
      'Rift Riders turns momentum into an arena game: grapple through the air, take the core and score through elevated hoops. Ivan / Honez Studios supplied the original Unity movement, Netcode and Relay prototype. I built on that foundation with the game-specific match systems, arena presentation and Windows playtest delivery.',
    challenge:
      'The prototype needed a complete reason to play. Movement, possession, combat and scoring had to work as one match, while hosting, joining, practice and rematches needed a clear path from the opening menu.',
    decisions: [
      {
        title: 'Give movement a scoring purpose',
        body: 'Three hoop heights offer different point values, giving vertical movement an immediate goal. Knockouts and a roaming golden objective create other opportunities within a five-minute round. A tied score leads into sudden death.',
      },
      {
        title: 'Keep the match rules in one place',
        body: 'The host runs the shared simulation and publishes its results. Scoring rules are separated from presentation, and fast throws are checked across the goal plane between physics steps so a core cannot skip through a hoop unnoticed.',
      },
      {
        title: 'Make the whole session playable',
        body: 'Offline practice supplies three bots. Private online rooms use Relay invitation codes, with readable feedback for invalid invites, full arenas and a departing host. The menu, match HUD and return path belong to the same experience.',
      },
    ],
    delivery: {
      title: 'A packaged Windows playtest',
      body: 'The playable build includes the neon arena, scoring and combat loop, bot practice, private online sessions and rematches. A repeatable Unity test, build and packaging workflow ties the Windows delivery to its source, player guide and contributor credits.',
    },
    reflection:
      'I treated the session around the match with the same attention as the match itself: entering, understanding the state, recovering from a disconnect and getting back into play.',
    flow: {
      title: 'One round in the arena',
      introduction: 'A compact loop gives the movement a clear destination.',
      steps: [
        { title: 'Enter', body: 'Practice with bots or join a private room by invitation code.' },
        {
          title: 'Compete',
          body: 'Carry or throw the core, use the arena’s height and contest the golden objective.',
        },
        {
          title: 'Return',
          body: 'Resolve the round, enter sudden death if tied, or start a rematch.',
        },
      ],
    },
    gallery: [
      {
        src: '/portfolio/cases/rift-riders-menu.webp',
        alt: 'The Rift Riders Windows playtest menu with hosting, practice and invitation controls alongside the arena and rider.',
        caption:
          'The actual Windows menu brings hosting, practice and joining into one consistent entry point.',
      },
      {
        src: '/portfolio/cases/rift-riders-arena.webp',
        alt: 'Rift Riders in play with a third-person rider, three scoring hoops, the objective and a visible match HUD.',
        caption:
          'The rendered arena and HUD connect movement, possession and scoring during a practice round.',
      },
    ],
  },
]
