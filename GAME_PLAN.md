# The Portal Keeper

November 3, 2026. The owner approved this direction and requested the first playable build. This document defines the one-room delivery; additional rooms remain future proposals. Living Archive and the Geometry Bench remain the visual and interaction foundation.

## Recommendation

A short, tactile 3D puzzle adventure about restoring light to strange little places. The player is the keeper of a small archive of dormant worlds. Understanding one room's mechanisms wakes its portal and reveals the next place.

This connects Joey's geometric visual language, original worlds and music with a complete interactive system. A visitor can discover the goal quickly and finish a satisfying first room in roughly 3–5 minutes, as a design target. The game has a clear beginning and payoff, while the portfolio remains easy to leave and return to.

## First playable room: The Sleeping Observatory

An intimate observatory contains a dark portal, a light source, two turning mirrors and a patterned lens beside its holder. A small engraved diagram and visible beam paths teach the rule. A curious light-moth is an optional character detail after the puzzle works, not a separate character-animation project.

1. **Notice:** the portal's receiver carries an engraved, asymmetrically notched pattern. The source emits a visible beam that currently hits the wrong surface.
2. **Route:** select each mirror and rotate it through discrete stops. The beam visibly redirects after each move, showing why a path succeeds or fails.
3. **Focus:** place the lens in its obvious holder, then turn it to align its projected pattern with the receiver. The notch makes orientation meaningful; a rotationally identical pattern must not pretend to have different valid states.
4. **Wake:** the beam settles into the receiver. Geometric flowers open, the room gains warmth and an optional original musical phrase resolves. A live glimpse of an impossible garden appears inside the portal.
5. **Finish:** activate the portal for a brief arrival scene and completion. Replay, inspect the mechanism or return to the work.

The core rule is light routing plus pattern alignment. Use one authored, solvable layout. Every mechanism should be recognizable, every action reversible, and the success condition visible. No timer or combat is needed for this first room. Do not add an inventory interface when a single lens-and-holder interaction communicates the same action more clearly.

## Living Archive, made inhabitable

- Retain the ink-green shell, ivory typography, restrained chartreuse guidance and original geometric motifs. The game has a dedicated `/play/portal-keeper` route, with an obvious exit back to the portfolio.
- Use a fixed three-quarter camera with a small number of deliberate inspection views. The composition should feel like a crafted miniature observatory with warm materials, rather than an unrestricted camera demo.
- Make the room memorable through a few authored details: a hand-built optical instrument, a plant that unfolds when lit, a curious inhabitant and the portal's impossible depth. Resolve those details inside the existing brand rather than applying a new neon interface theme.
- Keep the interface outside the artwork. Select a mechanism to reveal compact rotation actions beneath the scene. No floating pause panel covering the puzzle on mobile.
- Reuse the Geometry Bench's math and shape vocabulary where useful. Its presets may later provide cosmetic portal patterns; arbitrary seeds must not generate unverified puzzle layouts.

## Controls and accessibility

| Input | Complete interaction path |
| --- | --- |
| Mouse | Click a mechanism, turn left/right with visible buttons, activate the lens/portal |
| Touch | Tap the same objects and actions; generous targets, no precision dragging or swipe-only clue |
| Keyboard | Tab through named mechanisms and their controls; select and rotate using native buttons |

Offer undo, reset and graduated hints: first direct attention, then explain the rule, then show the next useful move. Important feedback uses shape and text as well as light. Audio is explicitly enabled by the visitor and never carries the only clue. Reduced motion preserves the puzzle and replaces camera travel or sweeping portal transitions with composed changes. A compact mechanism-state description should make the puzzle understandable without seeing the beam animation.

If WebGL cannot run, provide an intentional still overview and a clear return route. Whether the entire puzzle can also be offered as a 2D accessible diagram belongs in the first feasibility test; do not promise full fallback play before it is implemented and checked.

## Technical creativity made visible

| System | What the visitor experiences |
| --- | --- |
| Deterministic puzzle model | Consistent mirror/lens rules, immediate feedback, undo and reliable saved progress |
| Light-path calculation | The beam actually follows the current mechanism configuration; bounded reflections prevent loops |
| Three.js and React Three Fiber | A responsive 3D room, precise picking, geometric animation and carefully framed mobile views |
| Portal rendering | One convincing view into another small scene, with bounded render-target resolution and a static fallback |
| Sound and motion direction | Optional musical layers and a coordinated room awakening that reward a solved puzzle |
| Inspectable engineering | A short, optional “How it works” view after play explains the state model, light path and rendering choices |

Keep the puzzle rules separate from rendering. React owns selected objects and controls; Three.js owns transient frame updates. A versioned local save stores validated puzzle state, not renderer objects. The first room needs no accounts, backend, multiplayer or general physics engine. Begin with explicit optical geometry and discrete states; add a dependency only if the prototype demonstrates a need.

The existing scene infrastructure supplies bounded DPR, resource cleanup, visibility suspension and context-failure handling. Share those small utilities deliberately rather than importing the entire Bench UI into the game. Load the game only on its route.

For the portal, the official [Drei RenderTexture documentation](https://drei.docs.pmnd.rs/portals/render-texture) supports a separate scene rendered into a material, with explicit size and frame-count controls. This is a feasible candidate, not a verified game implementation. Confirm the installed Drei version's API and mobile cost in the prototype. The reviewed Three.js skill guidance remains a supplement to installed source and official documentation.

## First delivery and expansion gate

**First delivery:** one room, one complete puzzle, the awakening and a short ending. Include restart/undo/hints, keyboard/touch controls, local restoration, optional audio and the explanatory view. The destination is a playable showcase, not a trailer for an unfinished larger game.

Build in three passes:

1. **Prove the puzzle:** use simple geometry to validate the rule, solve path, touch/keyboard interaction, undo and save restoration. Test with people who have not been coached on the answer.
2. **Give it a world:** author the observatory's objects, lighting, portal glimpse and optional sound. Establish the start, intermediate and completed visual states before adding decorative motion.
3. **Finish the experience:** verify the complete route, small-screen controls, reduced motion, unavailable WebGL, context loss, resource cleanup and production-built loading performance.

Expand only when a new player can recognize the goal, understand the consequences of a move and complete the room with appropriate hints. All deliberate actions must be undoable or resettable, and restoring a save must preserve a valid state. Choose and measure a mobile frame/render budget against a named target device; emulator screenshots alone do not establish smooth physical-device play.

Possible later rooms are **The Curious Glasshouse** (split and direct light to awaken growth) and **The Quiet Sky Garden** (connect a path across floating structures). Introduce one new rule per room. A compact three-room edition could target a 10–15 minute visit after the first room proves enjoyable. Free-roaming worlds, procedural puzzle generation, multiplayer and combat remain outside this proposed first delivery.

## Delivery boundary

The approved next commitment is one complete observatory room at `/play/portal-keeper`, with a garden arrival and return path. The local implementation uses original procedural geometry and optional synthesized interface notes. Further rooms, public deployment and independent player testing remain separate next steps. Technical verification is recorded in `LAUNCH_SCORECARD.md`; neither browser checks nor the target duration establish that an uncoached player finds the puzzle enjoyable.

The owner subsequently reported an initial playthrough with no issues at first glance and approved the next portfolio integration pass. The Playground hub, dedicated Geometry Bench route and Portal Keeper case study now make both experiences and their engineering easier to discover. `PLAYTEST.md` provides the short fresh-player/physical-phone check before the proposed Curious Glasshouse room. No participant results or second-room implementation are implied by this integration.
