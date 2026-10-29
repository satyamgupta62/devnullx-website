import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProductSpotlight } from "../network-atlas";

afterEach(cleanup);

describe("NetworkAtlas", () => {
  it("describes the route and demonstration without requiring the visual map", () => {
    render(<ProductSpotlight />);

    expect(
      screen.getByText(/illustrative product demonstration/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /illustrative Delhi to Nagpur route for AGR-006/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/edge connected/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /system proof sequence.*drowsiness.*gps and can.*evidence sealed/i,
      ),
    ).toBeInTheDocument();
  });

  it("presents the event as a four-state operational journey", () => {
    render(<ProductSpotlight />);

    const journey = screen.getByRole("list", {
      name: /event journey from edge detection to relay handoff/i,
    });

    expect(journey).toHaveTextContent("Detected");
    expect(journey).toHaveTextContent("Contextualized");
    expect(journey).toHaveTextContent("Reviewed");
    expect(journey).toHaveTextContent("Handed off");
    expect(screen.getByText(/single event packet/i)).toBeInTheDocument();
  });

  it("opens with one inspectable AGR-006 lifecycle workspace", () => {
    render(<ProductSpotlight />);

    const lifecycle = screen.getByRole("region", {
      name: /AGR-006 event lifecycle/i,
    });

    expect(lifecycle).toHaveTextContent(/Axon edge/i);
    expect(lifecycle).toHaveTextContent(/Evidence sealed/i);
    expect(lifecycle).toHaveTextContent(/Operator review/i);
    expect(lifecycle).toHaveTextContent(/Relay ready/i);
    expect(lifecycle).toHaveTextContent(/evt_1a7f9c2e/i);
  });
});
