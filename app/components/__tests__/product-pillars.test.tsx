import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductPillars } from "../product-pillars";

describe("ProductPillars", () => {
  it("explains the relay as a verified pause between separate trip legs", () => {
    render(<ProductPillars />);

    const handoff = screen.getByRole("img", {
      name: /relay control showing an incoming leg/i,
    });

    expect(handoff).toHaveTextContent(/incoming leg/i);
    expect(handoff).toHaveTextContent(/identity verified/i);
    expect(handoff).toHaveTextContent(/evidence continuity/i);
    expect(handoff).toHaveTextContent(/outbound leg staged/i);
  });
});
