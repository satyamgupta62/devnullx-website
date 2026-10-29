import "@testing-library/jest-dom/vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MotionSurface } from "../motion-surface";

vi.mock("motion/react", async () => {
  const motion = await vi.importActual<typeof import("motion/react")>(
    "motion/react",
  );

  return {
    ...motion,
    useReducedMotion: () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
});

let intersectionCallback: IntersectionObserverCallback;
let observedElement: Element | null = null;

class TestIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0.2];

  constructor(callback: IntersectionObserverCallback) {
    intersectionCallback = callback;
  }

  disconnect() {}

  observe(element: Element) {
    observedElement = element;
  }

  takeRecords() {
    return [];
  }

  unobserve() {}
}

function setReducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: query === "(prefers-reduced-motion: reduce)" && matches,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  );
}

function setDocumentVisibility(visibilityState: "hidden" | "visible") {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    value: visibilityState,
  });
  Object.defineProperty(document, "hidden", {
    configurable: true,
    value: visibilityState === "hidden",
  });
}

function setDocumentHiddenOnly(hidden: boolean) {
  Object.defineProperty(document, "hidden", {
    configurable: true,
    value: hidden,
  });
}

function setIntersection(isIntersecting: boolean) {
  if (!observedElement) {
    throw new Error("Motion surface was not observed");
  }
  const target = observedElement;

  act(() => {
    intersectionCallback(
      [
        {
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: isIntersecting ? 1 : 0,
          intersectionRect: target.getBoundingClientRect(),
          isIntersecting,
          rootBounds: null,
          target,
          time: 0,
        },
      ],
      {} as IntersectionObserver,
    );
  });
}

beforeEach(() => {
  observedElement = null;
  vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
  setReducedMotion(false);
  setDocumentVisibility("visible");
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("MotionSurface", () => {
  it("mounts once, activates in view, and pauses without resetting on exit", () => {
    render(
      <MotionSurface
        replayLabel="Replay evidence sealing"
        sequence="evidence"
      >
        <div>Evidence contents</div>
      </MotionSurface>,
    );

    expect(screen.getByText("Evidence contents")).toBeInTheDocument();
    expect(screen.getByTestId("motion-surface")).toHaveAttribute(
      "data-motion-state",
      "idle",
    );

    setIntersection(true);

    expect(screen.getByTestId("motion-surface")).toHaveAttribute(
      "data-motion-state",
      "active",
    );
    const firstRun = screen.getByText("Evidence contents");
    expect(screen.getByTestId("motion-surface")).toHaveStyle({
      "--motion-play-state": "running",
    });
    expect(
      screen.getByRole("button", { name: /replay evidence sealing/i }),
    ).toBeInTheDocument();

    setIntersection(false);
    expect(screen.getByTestId("motion-surface")).toHaveAttribute(
      "data-motion-state",
      "active",
    );
    expect(screen.getByTestId("motion-surface")).toHaveStyle({
      "--motion-play-state": "paused",
    });
    expect(screen.getByText("Evidence contents")).toBe(firstRun);

    setIntersection(true);
    expect(screen.getByTestId("motion-surface")).toHaveStyle({
      "--motion-play-state": "running",
    });
    expect(screen.getByText("Evidence contents")).toBe(firstRun);
  });

  it("pauses an active surface while the document is hidden", () => {
    render(
      <MotionSurface replayLabel="Replay operator review" sequence="operator">
        <div>Operator contents</div>
      </MotionSurface>,
    );
    setIntersection(true);

    setDocumentVisibility("hidden");
    fireEvent(document, new Event("visibilitychange"));

    expect(screen.getByTestId("motion-surface")).toHaveAttribute(
      "data-motion-state",
      "active",
    );
    expect(screen.getByTestId("motion-surface")).toHaveStyle({
      "--motion-play-state": "paused",
    });
  });

  it("starts paused from document.hidden and resumes when visible", () => {
    setDocumentHiddenOnly(true);
    render(
      <MotionSurface replayLabel="Replay edge trace" sequence="edge">
        <div>Initially hidden contents</div>
      </MotionSurface>,
    );
    setIntersection(true);

    expect(screen.getByTestId("motion-surface")).toHaveStyle({
      "--motion-play-state": "paused",
    });

    setDocumentHiddenOnly(false);
    fireEvent(document, new Event("visibilitychange"));

    expect(screen.getByTestId("motion-surface")).toHaveStyle({
      "--motion-play-state": "running",
    });
  });

  it("renders static completed evidence without IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    render(
      <MotionSurface replayLabel="Replay edge trace" sequence="edge">
        <div>Static edge contents</div>
      </MotionSurface>,
    );

    expect(screen.getByText("Static edge contents")).toBeInTheDocument();
    expect(screen.getByTestId("motion-surface")).toHaveAttribute(
      "data-motion-state",
      "complete",
    );
    expect(screen.getByTestId("motion-surface")).toHaveStyle({
      "--motion-play-state": "paused",
    });
  });

  it("restarts its local animation subtree on replay", () => {
    render(
      <MotionSurface replayLabel="Replay edge trace" sequence="edge">
        <div data-testid="replay-child">Edge contents</div>
      </MotionSurface>,
    );
    setIntersection(true);
    const firstRun = screen.getByTestId("replay-child");

    fireEvent.click(
      screen.getByRole("button", { name: /replay edge trace/i }),
    );

    expect(screen.getByTestId("replay-child")).not.toBe(firstRun);
  });

  it("renders a completed paused state when reduced motion is requested", () => {
    setReducedMotion(true);

    render(
      <MotionSurface replayLabel="Replay relay handoff" sequence="relay">
        <div>Relay contents</div>
      </MotionSurface>,
    );
    setIntersection(true);

    expect(screen.getByTestId("motion-surface")).toHaveAttribute(
      "data-motion-state",
      "complete",
    );
    expect(screen.getByTestId("motion-surface")).toHaveStyle({
      "--motion-play-state": "paused",
    });
  });
});
