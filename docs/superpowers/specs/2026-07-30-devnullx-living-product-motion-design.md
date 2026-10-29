# DevNullX Living Product Motion

## Goal

Make the public DevNullX website feel like a living operating system without
turning it into a motion demo. The animation must explain how one AGR-006
safety event moves from Axon edge detection to sealed evidence, operator
review, and relay readiness. It must remain fast and understandable on phones.

## Approved Direction

Use a hybrid motion model:

- continuous ambient system activity keeps the interfaces alive;
- one authored lifecycle sequence advances through the four product states;
- hovering, focusing, or tapping a lifecycle stage replays and focuses that
  stage;
- later product surfaces animate only when they enter the viewport;
- all completed information remains visible when animation is unavailable.

The motion must happen inside believable product interfaces. Do not animate a
packet, dot, arrow, or beam travelling along a straight route.

## Distinct Visual Assets

The same image must not be repeated across the page.

1. **Hero — Axon hardware in context:** a synthetic night in-cab view centered
   on a dash- or A-pillar-mounted Axon camera/device, with the windshield and
   road environment visible. This establishes the physical edge system.
2. **Axon edge chapter — frontal infrared driver frame:** retain the existing
   synthetic frontal IR driver-monitoring frame. This image appears only here.
3. **Incident review — side-angle infrared event frame:** create a distinct
   synthetic IR frame from the second camera angle. It shows the same kind of
   heavy-truck cabin and a fictional driver, but uses different framing and
   moment so the incident workspace reads as a separate evidence view.

All generated images are illustrative product-demonstration assets. They must
contain no brands, customer identifiers, readable plates, embedded UI, or
claims of real deployment.

## Motion Thesis

### Focal sequence

The hero workspace runs a roughly 10–12 second lifecycle:

1. **Observe:** the Axon pane wakes with a bounded scan and live measurements.
2. **Detect:** PERCLOS crosses its threshold and the event status resolves.
3. **Seal:** clip, GPS, CAN, and checksum rows attach into one evidence record.
4. **Review:** AGR-006 becomes the active queue item and acknowledges.
5. **Handoff:** the relay verification gate changes from pending to ready.
6. **Rest:** the completed state holds briefly before the next cycle.

State propagates through color, labels, masks, and local interface changes—not
through travelling geometry.

### Continuous ambient activity

- live connection indicators breathe softly;
- timestamps and short telemetry values update at restrained intervals;
- the PERCLOS trace continuously redraws inside its chart;
- a low-opacity scan passes only across camera measurement regions;
- completed panels retain quiet live-state motion during the rest phase.

Ambient loops pause when the page is hidden or their surface is offscreen.

### Replay and focus

Pointer hover, keyboard focus, or touch selection on a lifecycle pane:

- brings that pane into visual focus;
- replays its local state transition;
- does not reset unrelated content or trap focus;
- returns to the ambient lifecycle after the interaction ends.

## Later Product Surfaces

- **Axon edge:** the camera scan resolves, the PERCLOS trace draws, and the
  coral threshold state appears.
- **Evidence cloud:** artifact rows attach in sequence and the checksum seal
  closes.
- **Operator desk:** AGR-006 highlights, its dossier opens, and acknowledgement
  changes to confirmed.
- **Relay network:** incoming context verifies and the outbound leg changes
  from staged to ready.
- **Incident journey:** the side-camera evidence appears, the trace resolves,
  and the evidence checklist completes in order.

These sequences run once on first viewport entry and may replay through direct
interaction. Generic fade-up section reveals are not used as the primary
effect.

## Technical Shape

- Use the installed Motion package for sequencing, viewport activation, and
  interruptible interaction states.
- Use CSS keyframes for small continuous ambient loops.
- Keep the default server-rendered markup in the complete, readable state.
- Add a small client motion controller rather than converting whole sections
  into client components.
- Use transforms, opacity, clip paths, stroke drawing, and bounded filters.
- Do not animate layout-driving width, height, top, left, or margin values.
- Do not add WebGL, canvas particles, autoplay video, or another animation
  dependency.

## Timing Defaults

- feedback: 120–180 ms;
- local state transitions: 220–360 ms;
- authored panel transitions: 420–650 ms;
- hero lifecycle: approximately 10–12 seconds including its completed hold;
- easing: confident deceleration, primarily
  `cubic-bezier(0.16, 1, 0.3, 1)`.

No bounce or elastic easing is used.

## Responsive and Accessibility

- Phone layouts keep the four lifecycle stages stacked and animate one local
  stage at a time.
- Touch targets select and replay stages without relying on hover.
- Motion never obscures labels or delays access to content.
- `prefers-reduced-motion: reduce` disables authored and ambient motion while
  preserving the final completed state.
- Animation pauses when `document.hidden` is true.
- Keyboard focus remains visible and follows ordinary document order.

## Performance Budget

- Generate two additional raster assets and ship them as optimized WebP.
- Target roughly 80–150 KB per product image where quality permits.
- Avoid continuous page-wide filters, large shadows, and offscreen loops.
- Do not preload the later incident image; load it lazily.
- Verify desktop and a 390-pixel phone viewport with no horizontal overflow.

## Verification

- Unit tests cover distinct image sources, semantic final states, and reduced
  motion behavior where testable.
- Lint, TypeScript, production build, and rendered HTML checks must pass.
- Browser verification covers desktop, phone, image loading, navigation, and
  overflow.
- Screenshots of desktop and phone results are shown in the task before
  publishing.
- The verified commit is pushed to GitHub and deployed to the existing public
  Sites URL.

