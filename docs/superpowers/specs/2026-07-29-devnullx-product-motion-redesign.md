# DevNullX Product Motion Redesign

## Status

Approved direction: curved-route motion plus interface-state morphs.

## Objective

Replace the primitive product diagrams and straight-line animations on the
DevNullX public website with sophisticated, credible product theater. The
redesign must make the existing product story easier to understand without
adding unsupported capabilities, customer evidence, or decorative visual
noise.

The visitor should see one continuous operational narrative:

1. the edge device detects a safety event,
2. the system attaches vehicle and route context,
3. fleet command receives reviewable evidence, and
4. trusted context enables a relay handoff.

## Design Principle

Motion must communicate a state transition. It may not exist solely to make a
surface feel futuristic.

Straight diagonal beams, generic arrows, continuously rotating rings, primitive
faces, and diagram-only placeholders are removed. Route movement follows
curved, checkpoint-aware paths. Product interfaces change state when the
corresponding packet reaches them.

## Visual Language

The existing DevNullX palette, typography, product truth, and dark
instrumentation identity remain. The redesign adds depth through:

- layered operational surfaces instead of isolated boxes,
- curved corridor geometry instead of straight rays,
- quiet depth, masks, and controlled light falloff,
- dense but legible telemetry,
- stateful controls, evidence thumbnails, and review queues,
- staggered transitions with physical acceleration and deceleration.

Only one motion event dominates a viewport. Glow remains tied to safety,
telemetry, verification, or relay state.

## Surface Redesigns

### 1. Network Atlas

The hero atlas becomes a corridor control surface rather than a diagram laid
over an abstract India shape.

- A curved Delhi-to-Nagpur path passes through the event and relay checkpoints.
- A small telemetry packet travels the route using a motion path.
- The packet slows at each checkpoint and activates the corresponding event
  state.
- Completed path segments retain a restrained semantic glow; future segments
  remain muted.
- Device, event, cloud, and operator information are consolidated into a
  compact evidence rail instead of four floating cards.
- The illustrative-route disclosure remains visible.

There are no arrowheads and no long straight light streaks.

### 2. Operational Stack

The four planes become one connected system sequence.

- The vertical rainbow signal is removed.
- Each plane has a credible product-specific visualization.
- A compact event token transfers between planes through short curved
  connectors.
- The active plane changes through opacity, depth, and interface state rather
  than translating the entire stack.

The four visualizations are:

1. **Axon edge:** dual-camera telemetry, confidence traces, eye-closure
   waveform, and an event capture buffer.
2. **Evidence cloud:** a sealed event packet with clip, GPS, CAN, and checksum
   states.
3. **Operator desk:** a route-aware review queue with evidence preview,
   acknowledgement state, and nearby vehicle context.
4. **Relay network:** an incoming leg, verified handoff window, next driver,
   and staged outbound leg.

### 3. Incident Journey

The primitive illustrated face is replaced with a presentation-grade camera
analysis surface.

- The camera frame uses a restrained low-light driver silhouette and facial
  landmark/eye-region analysis.
- A PERCLOS trace and eye-closure duration make the detection legible.
- The event clip, vehicle state, GPS, and CAN evidence appear as linked
  artifacts.
- The timeline becomes an operator review sequence whose active state advances
  when the evidence packet arrives.

The surface remains explicitly illustrative and does not imply a real customer
recording.

### 4. Relay Narrative

The concentric-circle relay diagram becomes a handoff control strip.

- A curved incoming leg terminates at a relay node.
- The handoff panel verifies driver, vehicle, evidence continuity, and timing.
- After verification, a new curved outbound leg activates.
- The animation visibly pauses at the relay point before the next leg begins.
- Delhi, relay point, and Nagpur remain the illustrative corridor.

### 5. Shared Motion System

The redesign uses a small set of reusable motion primitives:

- curved path reveal,
- packet travel,
- checkpoint arrival,
- evidence state activation,
- handoff pause and release,
- panel depth transition.

Motion uses transforms, opacity, path progress, and masked light. It avoids
layout animation during scroll.

## Interaction and Accessibility

- All information remains present in document order without animation.
- `prefers-reduced-motion` produces a complete static end state.
- Complex visuals retain concise text equivalents for screen readers.
- Focus behavior and navigation remain unchanged.
- No essential information is conveyed by color or movement alone.

## Performance Constraints

- No permanent WebGL scene or full-page canvas.
- Motion pauses or does not initialize when the surface is off-screen.
- The dominant route animation targets 60fps using transform/path progress.
- Decorative layers are limited and avoid large animated blur filters.
- Mobile uses a simplified path and fewer simultaneous transitions.

## Responsive Behavior

Desktop uses layered product stages. Tablet retains the same state sequence with
reduced overlap. Mobile converts floating evidence into a vertical evidence
rail while preserving the curved route and checkpoint order.

## Implementation Boundaries

- Preserve all current factual copy unless a label must change to describe the
  redesigned interface.
- Do not add contact collection, customer claims, outcome metrics, or
  production-deployment claims.
- Reuse the current React, Motion, Lucide, CSS, and vinext stack.
- Add no heavy visualization dependency unless the browser implementation
  cannot meet the motion and performance requirements with the existing stack.

## Verification

The redesign is complete only after:

- unit and accessibility tests pass,
- the production-render test passes,
- TypeScript, Biome, and the production build pass,
- reduced-motion behavior is verified,
- desktop and mobile browser captures are visually reviewed,
- the Impeccable detector is run once over the changed UI,
- the exact verified commit is pushed and deployed publicly.
