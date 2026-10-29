# DevNullX Living Product Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace repeated product imagery and static demonstrations with three
distinct visual assets plus a fast, continuous-and-replayable product motion
system.

**Architecture:** Keep every server-rendered product surface complete and
readable, then add two focused client boundaries: a hero
`LifecycleWorkspace` that owns the authored four-stage sequence, and a reusable
`MotionSurface` wrapper that activates local product-state animations in later
sections. Use the installed Motion package for viewport state and interruptible
sequencing, and CSS keyframes for bounded ambient loops.

**Tech Stack:** React 19, TypeScript, Motion 12, CSS keyframes, Vitest,
Testing Library, vinext, Sharp, built-in image generation.

## Global Constraints

- Use a hybrid motion model: continuous ambient activity plus a replayable
  lifecycle sequence.
- Do not animate a packet, dot, arrow, or beam travelling along a straight
  route.
- The three product moments must use distinct image sources.
- Use no WebGL, canvas particles, autoplay video, or new animation dependency.
- The hero lifecycle lasts approximately 10–12 seconds including its completed
  hold.
- Motion pauses when offscreen or when `document.hidden` is true.
- `prefers-reduced-motion: reduce` preserves the final completed state without
  authored or ambient motion.
- Phone layouts remain readable at 390 pixels with no horizontal overflow.
- Generated media is explicitly illustrative and contains no customer or
  deployment claims.

---

### Task 1: Create the distinct product-media contract and assets

**Files:**
- Modify: `app/components/product-demo.tsx`
- Modify: `app/components/__tests__/product-demo.test.tsx`
- Create: `public/axon-hardware-cabin.webp`
- Create: `public/axon-driver-side-event.webp`
- Preserve: `public/axon-driver-ir-demo.webp`

**Interfaces:**
- Consumes: the existing `DriverCameraFrame({ compact, label })` callers.
- Produces:
  `DriverCameraFrame({ compact?, label?, view?: "frontal" | "side" })` and
  `AxonHardwareFrame({ compact?: boolean })`.

- [ ] **Step 1: Write the failing media-source test**

Update the test so it renders all three product moments and verifies unique
sources:

```tsx
render(
  <>
    <AxonHardwareFrame compact />
    <DriverCameraFrame view="frontal" />
    <DriverCameraFrame view="side" />
  </>,
);

expect(screen.getByRole("img", { name: /axon hardware/i })).toHaveAttribute(
  "src",
  "/axon-hardware-cabin.webp",
);
expect(screen.getByRole("img", { name: /frontal infrared/i })).toHaveAttribute(
  "src",
  "/axon-driver-ir-demo.webp",
);
expect(screen.getByRole("img", { name: /side-angle infrared/i })).toHaveAttribute(
  "src",
  "/axon-driver-side-event.webp",
);
expect(new Set(screen.getAllByRole("img").map((image) => image.getAttribute("src"))).size).toBe(3);
```

- [ ] **Step 2: Run the focused test and confirm the contract is absent**

Run:

```bash
npm test -- app/components/__tests__/product-demo.test.tsx
```

Expected: FAIL because `AxonHardwareFrame` and the `view` property do not yet
exist.

- [ ] **Step 3: Generate the hardware-context image**

Use the built-in image-generation tool with this project-bound prompt:

```text
Use case: photorealistic-natural
Asset type: DevNullX landing-page hero product-demonstration frame
Primary request: a convincing night-time heavy-truck cabin showing a compact fictional edge-computing camera/device mounted near the dashboard or A-pillar, with windshield road context and practical wiring visible
Style/medium: restrained documentary product photography, realistic Indian heavy-truck cabin, not an advertisement
Composition/framing: landscape, hardware is the clear subject, enough clean dark space for HTML telemetry overlays
Lighting/mood: dim graphite cabin, subtle infrared and road-light spill
Constraints: no logos, no readable plates, no people as the main subject, no embedded UI, no text, no watermark, no science-fiction styling
```

Save the selected output as `public/axon-hardware-cabin.webp`, converting with
Sharp and targeting 80–150 KB where quality permits.

- [ ] **Step 4: Generate the side-camera evidence image**

Inspect `public/axon-driver-ir-demo.webp` with the image-viewing tool, then use
it as an identity/style reference and create a distinct second-camera frame:

```text
Use case: identity-preserve
Asset type: DevNullX incident-review evidence frame
Primary request: show the same fictional heavy-truck driver and cabin from a distinctly different passenger-side or high side-angle infrared camera at the same night-time moment
Composition/framing: landscape, shoulders and face readable, visibly different camera placement and crop from the frontal frame
Lighting/mood: authentic monochrome near-infrared sensor image with subtle grain
Constraints: preserve the fictional driver's practical appearance and cabin continuity; no embedded UI, text, logos, timestamp, watermark, extra people, or exaggerated sleep
```

Save the selected output as `public/axon-driver-side-event.webp`, converting
with Sharp and targeting 80–150 KB where quality permits.

- [ ] **Step 5: Implement the media components**

Use an explicit source map:

```tsx
const driverViews = {
  frontal: {
    src: "/axon-driver-ir-demo.webp",
    alt: "Frontal infrared driver-monitoring frame",
    camera: "IR CAM 01",
  },
  side: {
    src: "/axon-driver-side-event.webp",
    alt: "Side-angle infrared event evidence frame",
    camera: "IR CAM 02",
  },
} as const;
```

`AxonHardwareFrame` renders `/axon-hardware-cabin.webp` with a small
hardware-lock reticle and device-health caption. It must use direct optimized
`<img>` elements because the vinext worker image binding is unavailable.

- [ ] **Step 6: Run the focused test**

Run:

```bash
npm test -- app/components/__tests__/product-demo.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit the distinct media work**

```bash
git add app/components/product-demo.tsx app/components/__tests__/product-demo.test.tsx public/axon-hardware-cabin.webp public/axon-driver-side-event.webp
git commit -m "feat: add distinct DevNullX product media"
```

---

### Task 2: Build the authored hero lifecycle

**Files:**
- Create: `app/components/lifecycle-workspace.tsx`
- Create: `app/components/__tests__/lifecycle-workspace.test.tsx`
- Modify: `app/components/network-atlas.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `AxonHardwareFrame`, `StatusPill`, and the existing AGR-006 product
  facts.
- Produces: `LifecycleWorkspace()` with four focusable panes, automatic stages,
  replay controls, and a static completed reduced-motion state.

- [ ] **Step 1: Write lifecycle timing and interaction tests**

Use fake timers and mock reduced motion:

```tsx
vi.useFakeTimers();
render(<LifecycleWorkspace />);

expect(screen.getByTestId("lifecycle-edge")).toHaveAttribute(
  "data-stage-state",
  "active",
);

act(() => vi.advanceTimersByTime(2400));
expect(screen.getByTestId("lifecycle-evidence")).toHaveAttribute(
  "data-stage-state",
  "active",
);

await user.click(screen.getByRole("button", { name: /replay operator review/i }));
expect(screen.getByTestId("lifecycle-operator")).toHaveAttribute(
  "data-stage-state",
  "active",
);
```

Add a reduced-motion test that mocks
`matchMedia("(prefers-reduced-motion: reduce)")` and expects all four panes to
use `data-stage-state="complete"`.

- [ ] **Step 2: Confirm the hero tests fail**

Run:

```bash
npm test -- app/components/__tests__/lifecycle-workspace.test.tsx
```

Expected: FAIL because `LifecycleWorkspace` does not exist.

- [ ] **Step 3: Implement the visibility-aware clock**

In the client component, use this schedule:

```ts
const lifecycleSchedule = [
  { stage: 0, at: 0 },
  { stage: 1, at: 2400 },
  { stage: 2, at: 4700 },
  { stage: 3, at: 7200 },
] as const;
const lifecycleDuration = 10800;
```

Combine `useReducedMotion`, `useInView`, and `visibilitychange`. Start timers
only when the workspace is visible, in view, and not reduced. Clear every
timeout on cleanup. Direct interaction temporarily selects a stage and resets
the automatic schedule after interaction ends.

- [ ] **Step 4: Move the workspace markup behind the client boundary**

Move only the lifecycle workspace and rail from `network-atlas.tsx`.
`NetworkAtlas` remains a server component and renders:

```tsx
<LifecycleWorkspace />
```

Each article receives `data-stage-state="idle|active|complete"`. Add a real
button to each header:

```tsx
<button
  aria-label={`Replay ${label}`}
  onClick={() => selectStage(index)}
  type="button"
>
  {index + 1}
</button>
```

The Axon pane uses `AxonHardwareFrame`, so the hero no longer repeats the
driver image.

- [ ] **Step 5: Author the hero motion language**

In `app/globals.css`:

- wake the active hardware pane with a bounded vertical scan mask;
- resolve the coral detection state with a 260 ms color/opacity transition;
- reveal evidence rows with clipped local masks at 80 ms offsets;
- highlight AGR-006 and change the action state to acknowledged;
- change relay verification from pending graphite to mint/violet ready state;
- keep quiet live-state pulses after completion;
- never animate geometry between panes.

Use `--motion-play-state` and apply it to every loop. Define:

```css
@keyframes camera-scan {
  from { transform: translateY(-120%); }
  to { transform: translateY(420%); }
}

@keyframes trace-draw {
  from { stroke-dashoffset: 760; }
  to { stroke-dashoffset: 0; }
}
```

Reduced motion must set animation duration to `0.01ms`, iteration count to
`1`, and force completed pane styles.

- [ ] **Step 6: Run hero tests and regression tests**

Run:

```bash
npm test -- app/components/__tests__/lifecycle-workspace.test.tsx app/components/__tests__/network-atlas.test.tsx app/__tests__/page.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit the hero lifecycle**

```bash
git add app/components/lifecycle-workspace.tsx app/components/__tests__/lifecycle-workspace.test.tsx app/components/network-atlas.tsx app/globals.css
git commit -m "feat: animate the DevNullX lifecycle"
```

---

### Task 3: Activate meaningful motion in later product surfaces

**Files:**
- Create: `app/components/motion-surface.tsx`
- Create: `app/components/__tests__/motion-surface.test.tsx`
- Modify: `app/components/operational-plane.tsx`
- Modify: `app/components/incident-journey.tsx`
- Modify: `app/components/product-pillars.tsx`
- Modify: `app/components/company-close.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: server-rendered `ReactNode` product surfaces.
- Produces:

```ts
type MotionSurfaceProps = {
  children: React.ReactNode;
  className?: string;
  replayLabel: string;
  sequence: "edge" | "evidence" | "operator" | "relay" | "incident" | "continuity";
};
```

- [ ] **Step 1: Write the motion-surface behavior test**

Mock `IntersectionObserver`, render a surface, trigger intersection, and verify
activation:

```tsx
render(
  <MotionSurface replayLabel="Replay evidence sealing" sequence="evidence">
    <div>Evidence contents</div>
  </MotionSurface>,
);

act(() => intersectionCallback([{ isIntersecting: true }]));
expect(screen.getByTestId("motion-surface")).toHaveAttribute(
  "data-motion-state",
  "active",
);
expect(
  screen.getByRole("button", { name: /replay evidence sealing/i }),
).toBeInTheDocument();
```

Add tests for hidden-page pause and reduced-motion completed state.

- [ ] **Step 2: Confirm the wrapper test fails**

Run:

```bash
npm test -- app/components/__tests__/motion-surface.test.tsx
```

Expected: FAIL because the wrapper does not exist.

- [ ] **Step 3: Implement `MotionSurface`**

Use `motion/react` `useInView` and `useReducedMotion`. Keep children mounted
from the first render. The wrapper exposes:

```tsx
data-motion-sequence={sequence}
data-motion-state={reduced ? "complete" : active ? "active" : "idle"}
style={{ "--motion-play-state": active && visible ? "running" : "paused" }}
```

Increment a local `run` key on replay so descendant CSS animations restart.
The replay button is keyboard accessible and visually quiet.

- [ ] **Step 4: Apply semantic sequences**

- Edge uses the frontal IR frame and trace draw.
- Incident uses `view="side"` and sequential evidence checks.
- Evidence clips and metadata attach in order.
- Operator AGR-006 highlights before acknowledgement resolves.
- Relay verification reveals before the outbound leg becomes ready.
- Company continuity retains a soft completed-state pulse only.

Do not add generic section fade-ups.

- [ ] **Step 5: Add local sequence CSS**

Use sequence-specific selectors such as:

```css
[data-motion-sequence="evidence"][data-motion-state="active"]
  .evidence-product__metadata > div {
  animation: evidence-attach 420ms var(--ease-out) both;
}

[data-motion-sequence="operator"][data-motion-state="active"]
  .operator-review-row--active {
  animation: operator-confirm 560ms var(--ease-out) 620ms both;
}
```

Stagger evidence children with `:nth-child()` delays capped below 500 ms.
All local loops read `--motion-play-state`.

- [ ] **Step 6: Run focused and regression tests**

Run:

```bash
npm test -- app/components/__tests__/motion-surface.test.tsx app/components/__tests__/operational-stack.test.tsx app/components/__tests__/incident-journey.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit the later-surface motion**

```bash
git add app/components/motion-surface.tsx app/components/__tests__/motion-surface.test.tsx app/components/operational-plane.tsx app/components/incident-journey.tsx app/components/product-pillars.tsx app/components/company-close.tsx app/globals.css
git commit -m "feat: add product-state motion surfaces"
```

---

### Task 4: Verify, document, publish, and show the result

**Files:**
- Modify: `DESIGN.md`
- Modify only if tests require: existing component tests

**Interfaces:**
- Consumes: the complete motion system and generated assets.
- Produces: verified GitHub commit, live Sites deployment, desktop screenshot,
  and 390-pixel phone screenshot.

- [ ] **Step 1: Update the durable motion rules**

Document the hybrid motion model, distinct media roles, offscreen pausing,
replay interaction, 10–12 second lifecycle, and reduced-motion completed state.
Remove the old rule that the only recurring motion is a pulse and event marker.

- [ ] **Step 2: Run the final Impeccable craft floor and detector**

Read `reference/craft-floor.md` immediately before the last UI edit. After all
UI changes are frozen, run the detector exactly once:

```bash
node /Users/ichigo/.agents/skills/impeccable/scripts/detect.mjs --json app/components/lifecycle-workspace.tsx app/components/motion-surface.tsx app/components/product-demo.tsx app/components/network-atlas.tsx app/components/operational-plane.tsx app/components/incident-journey.tsx app/globals.css
```

Resolve blocking findings before verification. Treat grid warnings as
acceptable only on camera, chart, or map measurement surfaces.

- [ ] **Step 3: Run the complete verification suite**

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
npm run test:rendered
git diff --check
```

Expected: every command exits successfully.

- [ ] **Step 4: Perform browser QA**

At desktop and 390 × 844:

- capture the hero during edge, evidence, operator, and relay phases;
- capture the distinct Axon and incident images;
- verify all images report nonzero natural width;
- verify `document.documentElement.scrollWidth <= window.innerWidth`;
- verify the mobile navigation remains usable;
- verify reduced motion resolves to the completed state.

Show the best desktop and phone screenshots in the task.

- [ ] **Step 5: Commit and push**

```bash
git add DESIGN.md app public
git commit -m "feat: bring the DevNullX product story to life"
git push origin main
```

Confirm the GitHub `main` SHA matches local `HEAD`.

- [ ] **Step 6: Deploy the exact pushed commit**

Reuse project ID `appgprj_6a68a9d7ace88191bbe85348e1318be1`.
Push the exact source state to the Sites source repository, package the
successful build, save a version using the pushed `HEAD`, and deploy that saved
version. Poll until deployment succeeds.

- [ ] **Step 7: Verify production**

Open the deployed URL with a cache-busting query, confirm the distinct image
sources and new lifecycle controls are present, and verify there is no
horizontal overflow. Return the live URL and GitHub repository link.
