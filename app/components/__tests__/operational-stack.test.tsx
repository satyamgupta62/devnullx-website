import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OperationalStack } from "../operational-stack";

afterEach(cleanup);

describe("OperationalStack", () => {
  it("renders all four system planes in narrative order", () => {
    render(<OperationalStack />);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.map((heading) => heading.textContent)).toEqual([
      "Axon edge",
      "Evidence cloud",
      "Operator desk",
      "Relay network",
    ]);
    expect(screen.getByText(/motion is optional/i)).toBeInTheDocument();
  });

  it("shows a specific operational surface for every system plane", () => {
    render(<OperationalStack />);

    expect(
      screen.getByRole("img", { name: /dual-camera edge analysis/i }),
    ).toHaveTextContent(/eye closure trace/i);
    expect(
      screen.getByRole("img", { name: /sealed evidence packet/i }),
    ).toHaveTextContent(/checksum verified/i);
    expect(
      screen.getByRole("region", { name: /operator review workspace/i }),
    ).toHaveTextContent(/acknowledge event/i);
    expect(
      screen.getByRole("img", { name: /verified relay handoff/i }),
    ).toHaveTextContent(/outbound leg staged/i);
  });

  it("shows the real decision signals carried across the lifecycle", () => {
    render(<OperationalStack />);

    expect(
      screen.getByRole("img", { name: /dual-camera edge analysis/i }),
    ).toHaveTextContent(/PERCLOS trace/i);
    expect(
      screen.getByRole("region", { name: /operator review workspace/i }),
    ).toHaveTextContent(/Review queue/i);
    expect(
      screen.getByRole("region", { name: /operator review workspace/i }),
    ).toHaveTextContent(/Acknowledge event/i);
    expect(
      screen.getByRole("img", { name: /verified relay handoff/i }),
    ).toHaveTextContent(/Identity and evidence retained/i);
  });

  it("marks the edge camera, trace, and threshold as authored motion phases", () => {
    render(<OperationalStack />);

    const edge = screen.getByRole("img", {
      name: /dual-camera edge analysis/i,
    });
    for (const phase of ["camera", "trace"]) {
      expect(
        edge.querySelector(`[data-motion-phase="${phase}"]`),
      ).toBeInTheDocument();
    }
    expect(
      edge.querySelector(
        '[data-motion-phase="threshold"] .trace-threshold',
      ),
    ).toBeInTheDocument();
    expect(
      edge.querySelector(
        '.perclos-trace__legend[data-motion-phase="threshold"]',
      ),
    ).toHaveTextContent(/threshold 24%/i);
  });
});
