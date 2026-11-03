import type { PortfolioCaseStudy } from './portfolio-case-types'

export const clientCaseStudies: PortfolioCaseStudy[] = [
  {
    projectId: 'russound-digital-experience',
    introduction:
      'A working website concept for bringing whole-home audio into everyday life. I connected the cinematic presentation to useful product discovery, a listening brief, and a clear next conversation with an installer.',
    challenge:
      'Homeowners arrive with rooms, music, and routines in mind. The product range is organized around controllers, amplification, speakers, and connections. The experience needed to bridge those two ways of thinking while keeping model-specific information within reach.',
    decisions: [
      {
        title: 'Make the story lead somewhere',
        body: 'Lifestyle scenes introduce the experience of listening. Four product families, a connected SMZ8 explanation, and model-support lookup then give that story practical depth. Persistent navigation keeps product and support routes available as visitors move through the page.',
      },
      {
        title: 'Turn preferences into a useful brief',
        body: 'The planner asks about rooms, TV, outdoor listening, and control preferences. Choices update named products and an editable listening brief that visitors can copy or save. It prepares an installer conversation, with technical confirmation kept in the hands of the installer.',
      },
      {
        title: 'Keep the interface authentic',
        body: 'The app section pairs supplied Rooms artwork with a lived-in listening scene. Motion has pause controls, while mobile and reduced-motion presentations retain a composed static arrangement. Product imagery and connection annotations carry the technical explanation.',
      },
    ],
    delivery: {
      title: 'A concept built for review and handoff',
      body: 'Delivered a responsive working concept, a nine-page buyer-journey walkthrough, and a four-page proposed sitemap. The package makes both the visual direction and the route from discovery to dealer reviewable before production implementation.',
    },
    flow: {
      title: 'From listening idea to installer conversation',
      introduction: 'Each step gives the visitor a little more context for the next.',
      steps: [
        { title: 'Imagine', body: 'Recognize a room, routine, or way of listening.' },
        { title: 'Understand', body: 'Explore the system and its product families.' },
        { title: 'Prepare', body: 'Save a brief shaped around the home.' },
        { title: 'Connect', body: 'Take those preferences to a Russound dealer.' },
      ],
    },
    gallery: [
      {
        src: '/portfolio/cases/russound-listening-planner.webp',
        alt: 'Russound concept planner with four listening questions beside a suggested SMZ8 system and saveable brief.',
        caption:
          'The planner turns everyday preferences into a starting point for a technical conversation.',
      },
      {
        src: '/portfolio/cases/russound-app-experience.webp',
        alt: 'Russound Rooms interface presented beside a warmly lit living room in the website concept.',
        caption: 'Authentic app artwork connects the product story to everyday listening.',
      },
    ],
  },
  {
    projectId: 'russound-learning-course',
    introduction:
      'Sound, Made Clear turns an audio syllabus into an interactive field guide. I designed the lesson sequence, original system diagrams, practical activities, and lightweight frontend around a simple learning rhythm: read, change something, explain what happened.',
    challenge:
      'Terms such as source, channel, zone, and amplifier are easy to repeat and easy to confuse. The course needed to make those distinctions visible, then help learners use them in a room plan, support note, or sourced content brief.',
    decisions: [
      {
        title: 'Draw the function, then name it',
        body: 'A consistent visual language separates audio paths from control paths and shows selection, amplification, and speaker output as distinct jobs. Diagram labels live in normal HTML, so they wrap and grow with the text instead of becoming tiny artwork on a phone.',
      },
      {
        title: 'Make practice explain the answer',
        body: 'Signal explorers, ordering exercises, and categorization tasks respond with reasoning. A four-room lab lets learners change sources and independent volume settings, making the difference between available programs and listening zones tangible.',
      },
      {
        title: 'Let people leave and return',
        body: 'Each lesson saves its reading position and review marks in the browser. Printable recaps support notebook work away from the screen. Static examples and explanations remain readable without JavaScript, while optional videos load only when requested.',
      },
    ],
    delivery: {
      title: 'Seven connected stages',
      body: 'Published six self-study lessons and a seventh stage for preparing a supervised review. Each lesson combines six sections, three activities, explained questions, and a recap. A learner-perspective review traced practical assignments back to their explanations and filled gaps in examples, definitions, and self-checks.',
    },
    reflection:
      'The most useful review question was whether someone could produce the requested work from the lesson itself. That led to stronger teaching, beyond simply checking whether the controls worked.',
    gallery: [
      {
        src: '/portfolio/cases/russound-course-diagram.webp',
        alt: 'Dark Russound learning notebook opening with a labeled audio signal diagram.',
        caption:
          'A shared diagram language introduces the functions that later activities ask learners to apply.',
      },
      {
        src: '/portfolio/cases/russound-course-room-lab.webp',
        alt: 'Four-room learning activity with separate source and volume controls for kitchen, patio, office, and bedroom.',
        caption:
          'A conceptual room lab separates source availability, stereo channels, and independent zone control.',
      },
    ],
  },
  {
    projectId: 'ascension-roofing',
    introduction:
      'A complete rebuild for an owner-led Colorado roofing business, from positioning and project storytelling through engineering and launch. The site pairs a distinctive high-desert identity with evidence that helps homeowners understand the work and request an estimate.',
    challenge:
      'A roofing website has to establish trust before someone can inspect the craftsmanship themselves. This rebuild also had to carry an existing WordPress site into a new platform while preserving useful URLs, estimate delivery, and the company’s email service.',
    decisions: [
      {
        title: 'Show the reasoning behind the roof',
        body: 'I developed the Roof Record around four steps: observed, recommended, built, and final check. The Crestone project explains why bathroom exhaust routing was corrected before the standing-seam roof went on. Real photographs, phase labels, and specific captions connect the recommendation to visible work.',
      },
      {
        title: 'Give every page a useful next step',
        body: 'Service pages explain the situation a homeowner might recognize, then connect to relevant work and an estimate request. The form carries the selected service forward and allows a preferred contact method, keeping the inquiry tied to the visitor’s original need.',
      },
      {
        title: 'Treat migration as part of the design',
        body: 'The launch plan accounted for protected URLs, redirects, canonical pages, consent-based measurement, and recovery backups. Estimate delivery was checked through the client-owned email service, and existing business email continuity was verified during the domain cutover.',
      },
    ],
    delivery: {
      title: 'A launched site with an operating plan',
      body: 'The Next.js rebuild launched in August 2026 with the approved local Roof Record, responsive service pages, working estimate delivery, and documented hosting and recovery procedures. The content model supports later project additions without making an external CMS a requirement for the launch.',
    },
    reflection:
      'The Roof Record gave the visual identity a practical purpose: make the contractor’s judgment legible, then make the next conversation straightforward.',
    gallery: [
      {
        src: '/portfolio/cases/ascension-project-detail.webp',
        alt: 'Ascension project page pairing the Crestone standing-seam roof photograph with its service, location, and project details.',
        caption:
          'Real project photography and concrete details establish the context before the story unfolds.',
      },
      {
        src: '/portfolio/cases/ascension-roof-record.webp',
        alt: 'Roof Record with four labeled stages explaining the findings, recommendation, construction, and final check.',
        caption: 'The Roof Record connects the finished roof to the decisions that came before it.',
      },
    ],
  },
  {
    projectId: 'codorus-web',
    introduction:
      'My own web studio needed to demonstrate the same care it offers clients. I built Codorus Web as a practical service website with an editorial visual identity, original motion, real project evidence, and clear routes into a conversation.',
    challenge:
      'The offer spans new websites, rebuilds, ecommerce, web apps, ongoing help, identity, and motion. Visitors needed a recognizable starting point without having to understand development terminology or sit through a presentation before finding a service.',
    decisions: [
      {
        title: 'Organize around the work people need',
        body: 'The service directory groups Websites and apps, Website help, and Identity and motion. It pairs concrete destinations with Ascension client proof. On mobile, one scrolling directory exposes all three groups, with Work and Let’s talk available first.',
      },
      {
        title: 'Use motion to explain a journey',
        body: 'The homepage’s three-phone sequence connects exploring a service, inspecting a project, and requesting an estimate. The service panel opens with a coordinated reveal and retracts on pointer exit. Keyboard departure and reduced-motion modes respond immediately, preserving clear control.',
      },
      {
        title: 'Build the quiet parts as carefully',
        body: 'Astro provides the page structure, with focused JavaScript enhancements for navigation and motion. Native disclosure retains a usable path without JavaScript. Forms, confirmation states, redirects, and consent behavior are part of the delivered experience, alongside the visual work.',
      },
    ],
    delivery: {
      title: 'A working studio, expressed through its website',
      body: 'Published the current service structure across the retained site, then added the persistent navigation and refined motion. Desktop, narrow-screen, keyboard, and static-mode checks informed the implementation. Live form verification followed requests through provider records to the notification inbox.',
    },
    reflection:
      'Working on the studio itself sharpened the balance I want in client work: enough character to be memorable, with practical destinations always close at hand.',
    gallery: [
      {
        src: '/portfolio/cases/codorus-service-directory.webp',
        alt: 'Codorus Web service directory with three service groups and a featured Ascension Roofing project.',
        caption:
          'The expanded directory makes the studio’s range easy to scan and connects it to real work.',
      },
      {
        src: '/portfolio/cases/codorus-phone-journey.webp',
        alt: 'Three phone screens showing an Ascension service page, project evidence, and estimate form.',
        caption:
          'The homepage sequence explains the route from a useful service page to a relevant inquiry.',
      },
    ],
  },
]
