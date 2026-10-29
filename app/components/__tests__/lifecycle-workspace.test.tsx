import "@testing-library/jest-dom/vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LifecycleWorkspace } from "../lifecycle-workspace";

const motionState = vi.hoisted(() => ({
  inView: true,
  listeners: new Set<() => void>(),
}));

vi.mock("motion/react", async () => {
  const { useSyncExternalStore } = await import("react");

  return {
    useInView: () =>
      useSyncExternalStore(
        (listener) => {
          motionState.listeners.add(listener);
          return () => motionState.listeners.delete(listener);
        },
        () => motionState.inView,
        () => false,
      ),
    useReducedMotion: () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
});

class TestIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];

  disconnect() {}
  observe() {}
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
}

function setInView(inView: boolean) {
  act(() => {
    motionState.inView = inView;
    for (const listener of motionState.listeners) {
      listener();
    }
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  motionState.inView = true;
  motionState.listeners.clear();
  vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
  setReducedMotion(false);
  setDocumentVisibility("visible");
});

afterEach(() => {
  cleanup();
  motionState.listeners.clear();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("LifecycleWorkspace", () => {
  it("advances the AGR-006 lifecycle on the authored schedule", () => {
    render(<LifecycleWorkspace />);

    expect(screen.getByTestId("lifecycle-edge")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    act(() => vi.advanceTimersByTime(2400));
    expect(screen.getByTestId("lifecycle-edge")).toHaveAttribute(
      "data-stage-state",
      "complete",
    );
    expect(screen.getByTestId("lifecycle-evidence")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    act(() => vi.advanceTimersByTime(2300));
    expect(screen.getByTestId("lifecycle-operator")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    act(() => vi.advanceTimersByTime(2500));
    expect(screen.getByTestId("lifecycle-relay")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    act(() => vi.advanceTimersByTime(3600));
    expect(screen.getByTestId("lifecycle-edge")).toHaveAttribute(
      "data-stage-state",
      "active",
    );
  });

  it("inspects a stage without rewriting the ambient lifecycle", () => {
    render(<LifecycleWorkspace />);

    act(() => vi.advanceTimersByTime(4700));
    expect(screen.getByTestId("lifecycle-operator")).toHaveAttribute(
      "data-stage-state",
      "active",
    );
    expect(screen.getByTestId("lifecycle-relay")).toHaveAttribute(
      "data-stage-state",
      "idle",
    );

    const edgeBeforeInspection = screen.getByTestId("lifecycle-edge-motion");
    fireEvent.click(
      screen.getByRole("button", { name: /inspect Axon edge/i }),
    );
    expect(screen.getByTestId("lifecycle-edge-motion")).not.toBe(
      edgeBeforeInspection,
    );
    expect(
      screen.getByRole("button", { name: /inspect Axon edge/i }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("lifecycle-operator")).toHaveAttribute(
      "data-stage-state",
      "active",
    );
    expect(screen.getByTestId("lifecycle-relay")).toHaveAttribute(
      "data-stage-state",
      "idle",
    );
  });

  it("treats pointer entry, focus, and click as one combined inspection", () => {
    render(<LifecycleWorkspace />);

    const control = screen.getByRole("button", {
      name: /inspect Axon edge/i,
    });
    const initialBody = screen.getByTestId("lifecycle-edge-motion");

    fireEvent.pointerEnter(control);
    const inspectedBody = screen.getByTestId("lifecycle-edge-motion");
    expect(inspectedBody).not.toBe(initialBody);

    fireEvent.focus(control);
    fireEvent.click(control, { detail: 1 });
    expect(screen.getByTestId("lifecycle-edge-motion")).toBe(inspectedBody);

    fireEvent.pointerLeave(control);
    expect(control).toHaveAttribute("aria-pressed", "true");

    fireEvent.blur(control);
    expect(control).toHaveAttribute("aria-pressed", "false");
  });

  it("restarts the full lifecycle only from its explicit replay control", () => {
    render(<LifecycleWorkspace />);

    act(() => vi.advanceTimersByTime(7200));
    expect(screen.getByTestId("lifecycle-relay")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    fireEvent.click(
      screen.getByRole("button", { name: /replay full event lifecycle/i }),
    );

    expect(screen.getByTestId("lifecycle-edge")).toHaveAttribute(
      "data-stage-state",
      "active",
    );
    for (const stage of ["evidence", "operator", "relay"]) {
      expect(screen.getByTestId(`lifecycle-${stage}`)).toHaveAttribute(
        "data-stage-state",
        "idle",
      );
    }

    act(() => vi.advanceTimersByTime(2400));
    expect(screen.getByTestId("lifecycle-evidence")).toHaveAttribute(
      "data-stage-state",
      "active",
    );
  });

  it("preserves the current stage and remaining delay while hidden", () => {
    render(<LifecycleWorkspace />);

    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByTestId("lifecycle-evidence")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    setDocumentVisibility("hidden");
    fireEvent(document, new Event("visibilitychange"));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByTestId("lifecycle-evidence")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    setDocumentVisibility("visible");
    fireEvent(document, new Event("visibilitychange"));
    expect(screen.getByTestId("lifecycle-evidence")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    act(() => vi.advanceTimersByTime(1699));
    expect(screen.getByTestId("lifecycle-evidence")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByTestId("lifecycle-operator")).toHaveAttribute(
      "data-stage-state",
      "active",
    );
  });

  it("preserves the current stage and remaining delay while out of view", () => {
    render(<LifecycleWorkspace />);

    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByTestId("lifecycle-evidence")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    setInView(false);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByTestId("lifecycle-evidence")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    setInView(true);
    expect(screen.getByTestId("lifecycle-evidence")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    act(() => vi.advanceTimersByTime(1699));
    expect(screen.getByTestId("lifecycle-evidence")).toHaveAttribute(
      "data-stage-state",
      "active",
    );

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByTestId("lifecycle-operator")).toHaveAttribute(
      "data-stage-state",
      "active",
    );
  });

  it("renders a complete paused story without IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<LifecycleWorkspace />);

    expect(
      screen.getByRole("region", { name: /AGR-006 event lifecycle/i }),
    ).toHaveAttribute("data-clock-state", "paused");

    for (const stage of ["edge", "evidence", "operator", "relay"]) {
      expect(screen.getByTestId(`lifecycle-${stage}`)).toHaveAttribute(
        "data-stage-state",
        "complete",
      );
    }
    expect(screen.getByTestId("lifecycle-operator")).toHaveTextContent(
      /acknowledged/i,
    );
    expect(screen.getByTestId("lifecycle-relay")).toHaveTextContent(/verified/i);
  });

  it("renders every pane complete when reduced motion is requested", () => {
    setReducedMotion(true);
    render(<LifecycleWorkspace />);

    for (const stage of ["edge", "evidence", "operator", "relay"]) {
      expect(screen.getByTestId(`lifecycle-${stage}`)).toHaveAttribute(
        "data-stage-state",
        "complete",
      );
    }
  });
});
