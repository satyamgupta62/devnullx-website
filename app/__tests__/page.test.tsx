import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../page";

describe("DevNullX homepage", () => {
  it("exposes the product proposition and two actions", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /a safer fleet becomes a smarter network/i,
      }),
    ).toBeInTheDocument();
    const hero = screen.getByRole("region", {
      name: /a safer fleet becomes a smarter network/i,
    });
    expect(
      within(hero).getByRole("link", { name: /see devnullx in action/i }),
    ).toHaveAttribute("href", "#system");
    expect(
      within(hero).getByRole("link", { name: /review current capability/i }),
    ).toHaveAttribute("href", "#platform");
  });
});
