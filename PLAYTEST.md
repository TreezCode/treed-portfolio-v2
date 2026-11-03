# Playground: a small first-player check

Prepared November 3, 2026. One mobile check is reported below; no complete structured participant session is recorded yet. Joey's initial playthrough found no issues at first glance; the check below adds two people who have not seen the solution. The released hub is `https://buildwithtreez.com/playground`, and the direct game is `https://buildwithtreez.com/play/portal-keeper`. Record the active deployment from `DEPLOYMENT.md` with each session.

### First reported mobile check, November 3

Joey reported that one player tried the game on a mobile device. The initial concern was silent audio, which Joey also encountered before refreshing. He subsequently confirmed that audio works and believes the player's volume was too low. Treat that reported symptom as resolved; the device, browser, completion result and other session observations were not supplied.

The investigation separately reproduced two recovery defects in Chromium: a suspended audio context stayed silent after a game tap, and a short landscape viewport could silence visible controls when the scene scrolled away. The authorized reliability patch is now published and passes hosted browser checks without changing sound levels. See the follow-up in `LAUNCH_SCORECARD.md`. This report is not yet a complete uncoached-player session record.

## Set up

- Invite two fresh players. One may perform the physical-phone session, so this need not be a third participant. Do not show the case study or puzzle solution first.
- Record the build, preview URL, device, OS, browser and input method. Use a fresh browser profile or reset the room before each session.
- Have one player use a physical phone with the released HTTPS URL above. Browser emulation does not count as this check.
- Allow roughly ten minutes each. Observe without coaching. Ask permission before recording their screen or voice; written notes are enough.

## Neutral prompts

1. “Explore this Playground. What would you like to try?” Observe which experience they choose and whether the two invitations make sense.
2. “Try the other experience too. Tell me what you think you can do and what you expect when you act.” Let them discover the Portal Keeper goal and controls. Do not name a mirror angle, lens orientation or next move.
3. If they ask for help: “What could you try on this page?” Let them find the built-in hints. If they remain stuck, record where before helping; mark the result as assisted.
4. After play: “Find out how one of these experiences was built, then return to the portfolio's work.”

## Watch, then ask

Note whether the player recognizes the game goal, connects A/B to the room, understands a reflected beam, discovers the lens action, finds hints, recognizes completion and returns to the portfolio. Also watch whether Geometry Bench's controls and share/export actions are understandable. Record pauses and repeated actions in the player's own terms, without labeling hesitation as failure.

On the phone, check readable labels and lens feedback, accurate taps, natural scrolling, visible controls beneath the scene and an unobscured completion message. Try pausing motion, switching to the flat view and leaving/returning once. Ask: “What surprised you?”, “Where were you unsure?” and “What would you try next?”

## Session record

| Observation | Player 1 | Player 2 |
| --- | --- | --- |
| Date, build and preview URL | | |
| Device, OS, browser, input | | |
| First experience chosen and reason | | |
| Game goal described in their words | | |
| Control, beam or lens confusion | | |
| Hints found/used; any facilitator help | | |
| Completion reached; time observed | | |
| Case study and return route found | | |
| Phone readability, taps, scroll or motion issues | | |
| Exact useful quote / requested change | | |

## Before room two

Proceed when both fresh players can identify the goal, explain the effect of a move, finish with the available hints and find their way back, and the physical-phone session exposes no unresolved blocker. Fix repeated confusion or hidden controls, then recheck that specific path. Two sessions provide qualitative direction, not a completion-rate or performance claim. Keep the 3–5 minute visit as a design target until actual times are recorded.

Sources: [approved game plan](GAME_PLAN.md), [portfolio audience and purpose](CLIENT_SITE_BRIEF.md), and [technical verification](LAUNCH_SCORECARD.md). This guide does not authorize outreach, recording, publication or additional rooms.
