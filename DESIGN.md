---
name: DevNullX
description: A living control plane for safer fleets and relay logistics.
colors:
  void: "#050607"
  carbon: "#0B0D10"
  graphite: "#111419"
  line: "#232830"
  line-strong: "#444A55"
  paper: "#F5F7FA"
  paper-line: "#C9CDD1"
  paper-hover: "#E6E9EC"
  paper-quiet: "#E2E5E7"
  secondary-text: "#A0A7B2"
  quiet-text: "#78818E"
  safety-coral: "#FF563D"
  safety-coral-deep: "#C92F1D"
  safety-coral-soft: "#FF8C7A"
  relay-violet: "#7868FF"
  relay-violet-soft: "#A99FFF"
  telemetry-cyan: "#47D7FF"
  healthy-mint: "#50E3A4"
  instrument-mid: "#2C333A"
  instrument-edge: "#3A434C"
  light-surface-text: "#4F555C"
typography:
  display: "Geist, Arial, sans-serif"
  body: "Geist, Arial, sans-serif"
  label: "Geist Mono, ui-monospace, monospace"
---

# Design System: DevNullX

## Creative North Star

**The Continuous Event Dossier — Disciplined Futurism**

The site should feel like a real logistics operating system presented with
editorial confidence. It combines Impeccable compositional discipline with the
cinematic product storytelling the user valued in 21st.dev references, without
copying their layouts or imitating a generic dashboard gallery.

The visual world is near-black, precise, and deliberately operational. One
illustrative AGR-006 event connects the in-cab Axon frame, GPS and CAN context,
operator review, and relay handoff. Product mechanisms carry the drama; visual
effects remain subordinate to the evidence.

## Rules

- **One event dossier:** the same vehicle, event ID, and evidence state recur
  across every product surface.
- **Signal has meaning:** glow traces a route, event, live connection, or state
  change.
- **Workspace, not diagram:** evidence belongs inside believable operating
  software, not abstract map art, CSS illustration, or a uniform bento layout.
- **Interface speaks quietly:** one large proposition establishes a chapter,
  then the product demonstration takes over.
- **Truth is visible:** current capability, product demonstration, and roadmap
  direction are labeled separately.

## Type and Layout

Geist gives the public surface the calm, compressed precision associated with
high-quality infrastructure products. Geist Mono is reserved for event IDs,
timestamps, device state, and short operational messages.

The desktop canvas uses a fluid 1480-pixel maximum. The first viewport places a
concise proposition above a wide four-stage lifecycle workspace. Later sections
alternate editorial explanation with presentation-fidelity product surfaces.
Mobile preserves the lifecycle as readable stacked stages rather than shrinking
four columns into illegible miniatures.

## Color Semantics

- Safety Coral: detections and incident energy.
- Telemetry Cyan: routes, live data, and instrument traces.
- Relay Violet: handoffs and network expansion.
- Healthy Mint: verified connections and completed processing.
- Paper, secondary text, and quiet text preserve a restrained hierarchy.

Instrument-only neutral and soft-color tokens support camera frames, map
readouts, focus edges, and the light closing panel. They are tonal ramps of the
core palette, not additional semantic colors. Black and white alpha overlays
are permitted for depth.

Hairline grid fields are reserved for the route atlas and camera measurement
surfaces. They represent mapping or machine-vision coordinates and must not
appear as page decoration.

## Interaction

Motion explains state rather than decorating the page. The system is hybrid:
the hero runs one authored 10.8-second lifecycle from Axon edge capture through
sealed evidence and operator review to relay readiness, while later product
surfaces run short, local state changes when they enter view. Motion pauses
while its surface is offscreen or the document is hidden, and quiet replay
controls restart only the relevant local sequence. Hero stage controls inspect
and replay one pane without rewriting the ambient lifecycle; the explicit
workspace Replay control alone restarts the full event.

Media roles stay distinct throughout that motion. The Axon hardware view shows
the frontal in-cab device context; driver-monitoring analysis uses the frontal
infrared evidence frame; incident review alone uses the side infrared evidence
frame. Motion may reveal or resolve those states, but must not substitute one
image for another.

Recurring movement is limited to restrained live-state pulses and trace event
markers after a sequence completes. There are no travelling packets, transfer
arcs, floating checkpoints, rotating shapes, generic section entrances, or
scroll-linked decoration. Under reduced-motion preferences, every lifecycle
pane and local product surface renders immediately in its completed state with
animation paused. No continuous full-page WebGL or autoplay video is used.

## Components

- Compact paper-on-void primary action and a quieter graphite secondary action.
- Wide lifecycle workspace joining Axon edge, sealed evidence, operator review,
  and relay readiness.
- Distinct illustrative infrared assets: a frontal driver frame for
  driver-monitoring analysis and a side-angle frame for incident review;
  semantic HTML overlays supply measurements and state.
- Four operational chapters: Axon edge, evidence cloud, operator desk, and relay
  network.
- Incident workspace joining the side-angle driver frame, PERCLOS trace,
  GPS/CAN context, evidence, and operator notification.
- Capability ledger separating demonstrable state from roadmap.
- Relay narrative showing the compounding path from safety to handoff.
- Closing continuity record showing driver, truck, route, and evidence context
  travelling together.

## Do

- Author product UI at presentation fidelity.
- Label illustrative deployment data honestly.
- Keep meaningful content present before motion initializes.
- Prefer semantic product state over motion; use SVG only for measured traces.

## Do Not

- Paste unmodified design-library blocks.
- Use generic star fields, random orbiting particles, or gradient headlines.
- Use illustrated faces, floating map rings, decorative equalizers, or empty
  route canvases as substitutes for product evidence.
- Present roadmap goals or demonstration data as achieved customer outcomes.
- Glow every card, icon, button, or divider.

## Multi-Page Architecture (2026-07-31 overhaul)

The site is now a multi-pager. Chrome (skip-link, `SiteNav`, `SiteFooter`)
renders from `app/layout.tsx`; pages render `<main id="main">` content only.

- `/` — condensed story: hero lifecycle workspace + measured stats strip,
  operational chapters, capability ledger, incident journey, pillars, close.
- `/platform` — deep product: NCAP detection taxonomy, edge-to-cloud chain,
  hardware, evidence discipline, cost architecture.
- `/relay` — relay thesis + interactive corridor simulation (labeled
  SIMULATION · ILLUSTRATIVE SCHEDULE).
- `/company` — mission, vision, problem, segments, principles, ambition.
- `/careers` — culture, hiring process, open roles.
- `/investors` — measured traction wall, thesis, honest boundary, #contact.

Each page owns a scoped stylesheet in its route directory (`app/<route>/*.css`)
prefixed with the route name; `globals.css` holds shared tokens and home/chrome
styles only.

## Camera-Frame Landmark Convention

Overlay boxes on photographic frames (face, eyes, device lock) are IMAGE DATA,
not styling: coordinates live beside the image record in
`app/components/product-demo.tsx` as percentages of the rendered 3:2 frame and
are applied as inline styles. When adding a photo with landmarks: (1) measure
on the actual asset, (2) if the image's natural aspect differs from the 3:2
container, remap for the `object-fit: cover` crop (e.g. 16:9 in 3:2 crops
~7.8% per side: display% = (natural% − 7.8) / 0.844), (3) never share
coordinates between different photographs.

## Generated Imagery

`public/generated/*.webp` are AI-generated illustrative frames (source PNGs +
eye-position notes in `public/generated/MANIFEST.md`). They are cinematic
set-dressing and must be captioned as illustrative, never presented as
customer-deployment photography.
