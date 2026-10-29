# DevNullX Investor Product Story Redesign

## Status

Approved direction: a product-realistic, editorially restrained website built
around one continuous AGR-006 event lifecycle.

## Objective

Make DevNullX understandable to an investor, fleet operator, or strategic
partner within the first viewport. The page must show what happens:

1. inside the truck,
2. when evidence reaches the platform,
3. when fleet command reviews it, and
4. when verified context supports a relay handoff.

The redesign replaces the current CSS diagrams with believable operational
software. It preserves the product truth and public demonstration boundary in
`PRODUCT.md`.

## Direction Contract

**THESIS:** DevNullX is one operational chain from cab signal to verified
handoff. The page refuses disconnected feature cards and abstract network art.

**OWN-WORLD:** Near-black fleet instrumentation, paper-white editorial type,
quiet steel separators, safety coral, telemetry cyan, verified mint, and relay
violet. Dense product surfaces are framed like serious operating software.

**STORY:** A visitor sees AGR-006 trigger one drowsiness event, watches its
camera, GPS, CAN, and clip evidence stay together, sees the operator decision,
and understands how the same context reaches relay operations.

**FIRST VIEWPORT:** Compact navigation, concise proposition and actions, then a
wide four-stage product workspace large enough to inspect. The workspace, not
decoration, is the visual thesis.

**FORM:** A wide lifecycle workspace with editorial explanation below. It uses
the approved second composition probe as a hierarchy and density reference, not
as a literal screenshot.

## Visual System

### Palette

- Void: `#050607`
- Carbon: `#0B0D10`
- Raised instrument: `#10151A`
- Strong separator: `#29323C`
- Paper: `#F5F7FA`
- Secondary text: `#A0A7B2`
- Safety coral: `#FF563D`
- Telemetry cyan: `#47D7FF`
- Verified mint: `#50E3A4`
- Relay violet: `#7868FF`

Colors are semantic. There are no decorative multicolor gradients.

### Typography

- Display and body: Geist, using fewer oversized lines and a calmer desktop
  scale.
- Data and utility labels: Geist Mono, limited to IDs, time, state, and compact
  metrics.
- Headings use sentence case. Tracked uppercase labels remain short.

### Layout

Desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│ navigation                                                  │
├─────────────────────────────────────────────────────────────┤
│ proposition + actions                       proof boundary  │
├──────────────┬──────────────┬──────────────┬────────────────┤
│ Axon edge    │ Evidence     │ Operator     │ Relay          │
│ camera       │ packet + map │ review queue │ continuity     │
│ signal       │ metadata     │ decision     │ verified       │
├──────────────┴──────────────┴──────────────┴────────────────┤
│ event lifecycle rail                                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────┬──────────────────────────────┐
│ infrared event frame         │ evidence and telemetry       │
└──────────────────────────────┴──────────────────────────────┘
```

Mobile:

```text
┌─────────────────────┐
│ proposition/actions │
├─────────────────────┤
│ lifecycle tabs      │
├─────────────────────┤
│ active product pane │
├─────────────────────┤
│ evidence summary    │
└─────────────────────┘
```

The mobile lifecycle is horizontally scrollable or stacked without shrinking
the operational UI into illegible four-column miniatures.

## Signature

The same event dossier, `evt_1a7f9c2e`, appears in every stage with consistent
time, vehicle, severity, and evidence state. This continuity is the distinctive
visual mechanism and the proof of the company story.

## Surface Requirements

### Hero Lifecycle Workspace

- The hero becomes a wide, coherent product workspace.
- Four stages show Axon edge, sealed evidence, operator review, and relay
  readiness.
- A compact route context belongs inside the evidence stage; there is no empty
  freeform map.
- A lifecycle footer states Detected, Context attached, Reviewed, and Relay
  ready.
- One subtle active-state transition may advance across the lifecycle. No
  continuous orbital motion, floating checkpoints, or animated map scribbles.

### Axon Edge

- Use an illustrative monochrome/infrared driver-camera raster as the substrate.
- HTML overlays show eye regions, confidence, PERCLOS, closure duration, and
  buffer state.
- The signal history is a proper line/area trace with axes or time markers, not
  decorative equalizer bars.
- The demonstration label remains visible.

### Evidence

- Show event ID, clip duration, GPS, CAN, timestamp, and checksum state.
- Use a compact corridor inset that explains position rather than pretending to
  be a live customer map.
- Visually join the camera clip and telemetry as one sealed packet.

### Operator

- Show an event queue, selected-event summary, evidence availability, and an
  acknowledgement action.
- Route state and nearby vehicle context may appear as supporting information.
- The UI must look operable, not like an infographic.

### Relay

- Show the inbound leg, verification gate, and staged outbound leg as records.
- The verified state must explicitly preserve identity and evidence continuity.
- Avoid circles, orbit diagrams, and decorative route animation.

### Incident Detail

- Reuse the same camera asset and event facts.
- Build a synchronized media, telemetry, and artifact workspace.
- Remove the illustrated head, shoulders, facial dots, and block waveform.

## Motion

- Motion exists only for lifecycle activation, a trace cursor, and small status
  transitions.
- No infinite route travel, rotating shapes, floating particles, animated
  arrows, or scroll-linked decoration.
- `prefers-reduced-motion` shows the complete selected and verified state.

## Copy and Truth

- Preserve the established DevNullX claims and demonstration boundary.
- Do not use the generated composition's invented dates, metrics, customer
  counts, driver names, or production claims.
- No customer logos, pricing, email form, or outcome statistics.
- “Product demonstration” or equivalent remains adjacent to illustrative data.

## Accessibility and Performance

- WCAG 2.2 AA contrast and focus visibility.
- Product meaning remains in semantic DOM text.
- Images use concise descriptive alternatives; decorative overlays are hidden.
- Mobile copy remains readable without zoom.
- The camera asset is optimized and responsive.
- No WebGL, autoplay video, map SDK, or heavy visualization dependency.

## Acceptance Criteria

- A first-time visitor can identify the cab → evidence → operator → relay story
  from the first viewport.
- The criticized route scribbles, floating rings, cartoon eyes, empty operator
  map, head silhouette, and equalizer bars are absent.
- Desktop and mobile captures are visually reviewed.
- Unit tests, accessibility tests, TypeScript, lint, production build, and
  rendered HTML tests pass.
- The Impeccable detector runs once after the final UI edits.
- The verified commit is pushed to GitHub and the public site is redeployed.
