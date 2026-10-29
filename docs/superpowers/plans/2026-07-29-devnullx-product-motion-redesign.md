# DevNullX Product Motion Redesign Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the site's simplistic straight-line motion and placeholder product illustrations with a restrained, investor-ready demonstration of DevNullX's real edge-to-relay operating loop.

**Architecture:** Keep the current single-page React structure and product copy, but rebuild four visual components around one shared event state model. Use semantic HTML plus CSS motion paths and Motion for React for progressive enhancement; all product meaning must remain present without animation and under reduced-motion preferences.

**Tech Stack:** React 19, TypeScript, Motion for React, Lucide React, CSS, Vitest, Testing Library, vinext.

---

### Task 1: Specify the new visual contracts in tests

**Files:**
- Modify: `app/components/__tests__/network-atlas.test.tsx`
- Modify: `app/components/__tests__/operational-stack.test.tsx`
- Modify: `app/components/__tests__/incident-journey.test.tsx`
- Create: `app/components/__tests__/product-pillars.test.tsx`

**Step 1: Write failing tests**

- Require the atlas to expose four meaningful route states: detected, contextualized, reviewed, handed off.
- Require each operational plane to contain its specific product surface rather than the old generic visual.
- Require the incident journey to expose eye-region analysis, PERCLOS, clip, GPS/CAN, checksum, and operator acknowledgement.
- Require the relay story to expose incoming leg, verified handoff, and staged outbound leg.
- Assert that legacy class hooks for straight route beams, the vertical operational signal, and primitive face illustration are absent.

**Step 2: Run the focused tests and confirm RED**

Run: `npm test -- app/components/__tests__/network-atlas.test.tsx app/components/__tests__/operational-stack.test.tsx app/components/__tests__/incident-journey.test.tsx app/components/__tests__/product-pillars.test.tsx`

Expected: FAIL because the new state labels and visual contracts do not exist.

**Step 3: Commit the red tests**

```bash
git add app/components/__tests__
git commit -m "test: define product motion visual contracts"
```

### Task 2: Rebuild the hero atlas as a curved event journey

**Files:**
- Modify: `app/components/network-atlas.tsx`
- Modify: `app/globals.css`
- Test: `app/components/__tests__/network-atlas.test.tsx`

**Step 1: Replace straight beams with a curved corridor**

- Build a CSS motion-path route through Delhi, the safety event, the review checkpoint, and Nagpur.
- Represent AGR-006 as a compact device status panel and the moving item as a telemetry packet.
- Keep route state labels readable in the DOM and mark only decorative geometry `aria-hidden`.

**Step 2: Author one motion sequence**

- Animate one event packet along the curved route.
- Change checkpoint and completed-segment states as the packet advances.
- Use a static final state under `prefers-reduced-motion`.

**Step 3: Run the atlas test and confirm GREEN**

Run: `npm test -- app/components/__tests__/network-atlas.test.tsx`

Expected: PASS.

### Task 3: Rebuild the operational planes as real product surfaces

**Files:**
- Modify: `app/components/operational-plane.tsx`
- Modify: `app/components/operational-stack-motion.tsx`
- Modify: `app/globals.css`
- Test: `app/components/__tests__/operational-stack.test.tsx`

**Step 1: Replace each placeholder visual**

- Axon edge: dual-camera telemetry, eye-region landmarks, eye-closure trace, and local event buffer.
- Evidence cloud: sealed evidence packet with clip, GPS, CAN, schema, and checksum states.
- Operator desk: route-aware review surface with evidence preview, nearby vehicle context, and acknowledgement.
- Relay network: curved incoming and outbound legs with an explicit verification pause at Nagpur.

**Step 2: Replace the vertical rainbow signal**

- Remove scroll-scaled `.operational-signal`.
- Transfer a compact event token between planes with short curved connectors and depth/state changes.
- Keep stack motion subordinate to each product surface.

**Step 3: Run the operational stack test and confirm GREEN**

Run: `npm test -- app/components/__tests__/operational-stack.test.tsx`

Expected: PASS.

### Task 4: Rebuild the evidence and relay demonstrations

**Files:**
- Modify: `app/components/incident-journey.tsx`
- Modify: `app/components/product-pillars.tsx`
- Modify: `app/globals.css`
- Test: `app/components/__tests__/incident-journey.test.tsx`
- Test: `app/components/__tests__/product-pillars.test.tsx`

**Step 1: Replace the primitive incident face**

- Create a low-light driver camera analysis surface using composed HTML/CSS regions, eye landmarks, an eye-closure waveform, and time-linked evidence data.
- Preserve the product demonstration boundary and all accessible evidence-chain text.

**Step 2: Replace the straight relay bar**

- Show a curved inbound path terminating at Nagpur, a verification control, and a separately staged outbound path.
- Animate a deliberate pause at verification; do not use a continuous arrow or marquee.

**Step 3: Run the focused tests and confirm GREEN**

Run: `npm test -- app/components/__tests__/incident-journey.test.tsx app/components/__tests__/product-pillars.test.tsx`

Expected: PASS.

### Task 5: Refine, verify, and publish

**Files:**
- Modify as needed: `app/globals.css`
- Modify as needed: changed component files

**Step 1: Responsive and accessibility refinement**

- Verify desktop, tablet, and mobile composition.
- Verify keyboard focus and semantic labels.
- Verify reduced-motion mode produces a complete static product story.
- Ensure one dominant motion event per viewport and no text overflow.

**Step 2: Run the Impeccable mechanical detector once**

Run: `node /Users/ichigo/.agents/skills/impeccable/scripts/detect.mjs --json app/components/network-atlas.tsx app/components/operational-plane.tsx app/components/operational-stack-motion.tsx app/components/incident-journey.tsx app/components/product-pillars.tsx app/globals.css`

Expected: no unresolved blocking findings.

**Step 3: Run fresh full verification**

Run:

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
npm run test:rendered
```

Expected: all commands pass.

**Step 4: Inspect the rendered site**

- Capture desktop and mobile screenshots.
- Compare against the five criticized surfaces.
- Fix any remaining straight-line, placeholder, overflow, or excessive-motion issues and rerun affected checks.

**Step 5: Commit and publish the exact verified tree**

```bash
git add app docs/superpowers/plans/2026-07-29-devnullx-product-motion-redesign.md
git commit -m "feat: redesign DevNullX product motion"
git push origin main
```

- Push the exact commit to the existing Sites project.
- Save a new version, deploy it, retain public access, and verify the live URL.
