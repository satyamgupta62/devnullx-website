# DevNullX Investor Product Story Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the DevNullX public website around a believable, investor-ready AGR-006 lifecycle from in-cab detection through verified relay handoff.

**Architecture:** Preserve the current React page and factual content, but replace the hero atlas and oversized operational cards with a shared event-dossier model rendered in a wide lifecycle workspace. Reuse one optimized illustrative infrared camera asset in the hero, Axon detail, and incident detail; keep all product meaning semantic and use CSS only for restrained visual state.

**Tech Stack:** React 19, TypeScript, CSS, Motion for React, Lucide React, Vitest, Testing Library, vinext.

## Global Constraints

- Preserve every capability and limitation in `PRODUCT.md`.
- Use `evt_1a7f9c2e`, AGR-006, Delhi → Nagpur, PERCLOS 34%, closure 2.8s, buffer 04.2s, and 62 km/h consistently.
- Label illustrative data as a product demonstration.
- Add no customer claims, outcome metrics, contact form, map SDK, WebGL scene, or autoplay video.
- Remove decorative route scribbles, floating rings, cartoon eyes, human silhouette CSS, and equalizer bars.
- Meet WCAG 2.2 AA and respect `prefers-reduced-motion`.

---

### Task 1: Lock the lifecycle contracts

**Files:**
- Modify: `app/components/__tests__/network-atlas.test.tsx`
- Modify: `app/components/__tests__/operational-stack.test.tsx`
- Modify: `app/components/__tests__/incident-journey.test.tsx`

**Interfaces:**
- Consumes: the current `NetworkAtlas`, `OperationalStack`, and `IncidentJourney` public components.
- Produces: behavioral contracts for the four lifecycle stages, event continuity, operable review queue, real trace labels, and illustrative camera analysis.

- [ ] **Step 1: Write the failing hero workspace test**

Add an assertion that the hero contains a region named `AGR-006 event lifecycle`
with Axon edge, Evidence sealed, Operator review, and Relay ready, and contains
the consistent event ID `evt_1a7f9c2e`.

- [ ] **Step 2: Run the hero test and verify RED**

Run: `npm test -- app/components/__tests__/network-atlas.test.tsx`

Expected: FAIL because the lifecycle region and selected event dossier do not
exist.

- [ ] **Step 3: Write the failing operational-detail test**

Assert that the Axon surface contains `PERCLOS trace`, the operator surface
contains `Review queue` and `Acknowledge event`, and the relay surface contains
`Identity and evidence retained`.

- [ ] **Step 4: Run the operational test and verify RED**

Run: `npm test -- app/components/__tests__/operational-stack.test.tsx`

Expected: FAIL because the current visual uses stylized eye regions and does not
expose the new trace or continuity labels.

- [ ] **Step 5: Write the failing incident-detail test**

Require the incident analysis region to expose `Frame 0618`, `PERCLOS trace`,
`Threshold 24%`, and the same `evt_1a7f9c2e` sealed record.

- [ ] **Step 6: Run the incident test and verify RED**

Run: `npm test -- app/components/__tests__/incident-journey.test.tsx`

Expected: FAIL because the current block waveform does not expose the new
time-series contract.

### Task 2: Build the hero lifecycle workspace

**Files:**
- Modify: `app/components/network-atlas.tsx`
- Modify: `app/globals.css`
- Test: `app/components/__tests__/network-atlas.test.tsx`

**Interfaces:**
- Consumes: `networkRoute`, `proofBoundary`, and the camera asset path.
- Produces: the `AGR-006 event lifecycle` region and reusable class vocabulary
  for lifecycle panes, event facts, and state footer.

- [ ] **Step 1: Replace the atlas DOM with the wide lifecycle workspace**

Create four semantic panes under one labelled region. Keep route context inside
the evidence pane, use the same event ID in each state, and render the lifecycle
footer as an ordered list.

- [ ] **Step 2: Implement presentation styles**

Use a full-width product stage below the hero copy, restrained borders, readable
data hierarchy, semantic status colors, and a single selected-state emphasis.
At mobile widths, convert the four columns into readable stacked panes.

- [ ] **Step 3: Run the hero test and verify GREEN**

Run: `npm test -- app/components/__tests__/network-atlas.test.tsx`

Expected: PASS.

### Task 3: Replace the oversized operational cards

**Files:**
- Modify: `app/components/operational-stack.tsx`
- Modify: `app/components/operational-plane.tsx`
- Delete: `app/components/operational-stack-motion.tsx`
- Modify: `app/globals.css`
- Test: `app/components/__tests__/operational-stack.test.tsx`

**Interfaces:**
- Consumes: `operationalPlanes` and the lifecycle class vocabulary.
- Produces: two compact product-detail chapters: Axon + Evidence and Operator +
  Relay.

- [ ] **Step 1: Remove decorative transfer motion**

Remove `OperationalStackMotion`, its transfer arcs, and the infinite token.
Render the details in document order inside a plain product-detail container.

- [ ] **Step 2: Build credible Axon and evidence surfaces**

Use the illustrative camera asset with semantic detection overlays. Render
PERCLOS as an SVG line/area chart with labelled time points. Present clip, GPS,
CAN, buffer, and checksum as one evidence dossier.

- [ ] **Step 3: Build an operable operator and relay surface**

Render a three-row review queue, selected-event details, and acknowledgement
control. Render inbound leg, verification gate, identity/evidence continuity,
and outbound leg as operational records.

- [ ] **Step 4: Replace the giant numbered-card layout**

Use two alternating editorial chapters with a compact chapter marker and a
large shared product surface. Keep the product surface dominant and avoid empty
vertical space.

- [ ] **Step 5: Run the operational test and verify GREEN**

Run: `npm test -- app/components/__tests__/operational-stack.test.tsx`

Expected: PASS.

### Task 4: Rebuild the incident evidence workspace

**Files:**
- Modify: `app/components/incident-journey.tsx`
- Modify: `app/globals.css`
- Test: `app/components/__tests__/incident-journey.test.tsx`

**Interfaces:**
- Consumes: `incidentSteps`, `proofBoundary`, and the illustrative camera asset.
- Produces: synchronized camera, trace, telemetry, and sealed-artifact panels.

- [ ] **Step 1: Replace the illustrated person**

Render the optimized camera image with two semantic eye-region overlays and
frame metadata. Delete the head, shoulders, and landmark-dot DOM.

- [ ] **Step 2: Replace the block waveform**

Render a labelled SVG PERCLOS time series with threshold and event marker.
Retain 34%, 2.8s, and 62 km/h as text beside the chart.

- [ ] **Step 3: Tighten the evidence workspace**

Place media and telemetry together and keep the evidence artifacts in a compact
review rail. Do not let the camera frame create an oversized empty surface.

- [ ] **Step 4: Run the incident test and verify GREEN**

Run: `npm test -- app/components/__tests__/incident-journey.test.tsx`

Expected: PASS.

### Task 5: Update the durable design system

**Files:**
- Modify: `DESIGN.md`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the approved direction contract and the tokens that survived the
  implementation.
- Produces: durable rules for lifecycle workspaces, generated demonstration
  imagery, motion restraint, and mobile density.

- [ ] **Step 1: Record the workspace and image rules**

Replace the old curved-packet and silhouette guidance with the event-dossier
signature, one shared camera substrate, and lifecycle activation motion.

- [ ] **Step 2: Remove obsolete CSS**

Delete superseded atlas, eye-region, operator-curve, transfer-arc,
driver-presence, and block-wave selectors. Keep only selectors used by the
rendered page.

### Task 6: Inspect, verify, publish

**Files:**
- Modify as needed: changed UI files
- Update if final tokens changed: `DESIGN.md`

**Interfaces:**
- Consumes: the completed page and all project verification scripts.
- Produces: a verified Git commit, GitHub `main` update, and public Sites
  deployment.

- [ ] **Step 1: Capture desktop and mobile renders**

Inspect at approximately 1440×1000 and 390×844. Compare both against the
direction contract and correct hierarchy, overflow, legibility, and dead space.

- [ ] **Step 2: Run the Impeccable detector once**

Run:

```bash
node /Users/ichigo/.agents/skills/impeccable/scripts/detect.mjs --json \
  app/components/network-atlas.tsx \
  app/components/operational-stack.tsx \
  app/components/operational-plane.tsx \
  app/components/incident-journey.tsx \
  app/globals.css
```

Expected: no unresolved blocking findings.

- [ ] **Step 3: Run full verification**

Run:

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
npm run test:rendered
```

Expected: every command exits zero with no test failures.

- [ ] **Step 4: Commit and push**

Run:

```bash
git add PRODUCT.md DESIGN.md app public docs/superpowers
git commit -m "feat: rebuild DevNullX investor product story"
git push origin main
```

Push the exact verified commit to `devnullx-technology/devnullx-website`.

- [ ] **Step 5: Deploy and verify the public site**

Push the exact source state to the existing Sites project, save a new version,
deploy it publicly, and verify the production URL on desktop and mobile.
