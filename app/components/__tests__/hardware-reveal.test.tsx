import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HardwareReveal } from "../hardware-reveal";

describe("HardwareReveal", () => {
  it("presents the Aghrahan device before the situational-awareness truck", () => {
    render(<HardwareReveal />);

    expect(
      screen.getByRole("heading", {
        name: /intelligence, made physical/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/aghrahan 7-inch inclined in-cab edge terminal/i),
    ).toHaveAttribute("src", "/models/aghran-apple-hires.png");
    expect(
      screen.getByAltText(/360-degree situational awareness/i),
    ).toHaveAttribute("src", "/images/situational-awareness.webp");
    expect(
      document.querySelector(".hardware-device__screen-logo img"),
    ).toHaveAttribute("src", "/images/devnullx-logo.png");
  });
});
