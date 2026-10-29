import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { IncidentJourney } from "../incident-journey";

afterEach(cleanup);

describe("IncidentJourney", () => {
  it("presents the demo boundary and the complete evidence chain", () => {
    render(<IncidentJourney />);

    expect(screen.getByText("Product demonstration")).toBeInTheDocument();
    expect(screen.getByText("Driver camera")).toBeInTheDocument();
    expect(screen.getByText("GPS and CAN context")).toBeInTheDocument();
    expect(screen.getByText("Evidence sealed")).toBeInTheDocument();
    expect(screen.getByText("Operator notified")).toBeInTheDocument();
  });

  it("makes the driver analysis and evidence artifacts inspectable", () => {
    render(<IncidentJourney />);

    const analysis = screen.getByRole("img", {
      name: /driver camera eye-region analysis/i,
    });
    expect(analysis).toHaveTextContent(/eye l/i);
    expect(analysis).toHaveTextContent(/eye r/i);
    expect(analysis).toHaveTextContent(/eye closure trace/i);

    const artifacts = screen.getByRole("list", {
      name: /sealed evidence artifacts/i,
    });
    expect(artifacts).toHaveTextContent(/event clip/i);
    expect(artifacts).toHaveTextContent(/gps and can/i);
    expect(artifacts).toHaveTextContent(/checksum/i);
    expect(artifacts).toHaveTextContent(/operator acknowledgement/i);
  });

  it("connects the camera frame to a measurable PERCLOS trace", () => {
    render(<IncidentJourney />);

    const analysis = screen.getByRole("img", {
      name: /driver camera eye-region analysis/i,
    });

    expect(analysis).toHaveTextContent(/Frame 0618/i);
    expect(analysis).toHaveTextContent(/PERCLOS trace/i);
    expect(analysis).toHaveTextContent(/Threshold 24%/i);
    expect(screen.getByText("evt_1a7f9c2e")).toBeInTheDocument();
  });

  it("marks media, trace, evidence, and review as sequential motion phases", () => {
    render(<IncidentJourney />);

    const surface = screen.getByTestId("motion-surface");
    for (const phase of ["media", "trace", "evidence", "review"]) {
      expect(
        surface.querySelector(`[data-motion-phase="${phase}"]`),
      ).toBeInTheDocument();
    }
  });
});
