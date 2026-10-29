import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteNav } from "../components/site-nav";
import Home from "../page";

afterEach(cleanup);

describe("DevNullX accessibility contract", () => {
  it("keeps one page title and exposes every primary destination", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(document.querySelector("#platform")).toBeInTheDocument();
    expect(document.querySelector("#safety")).toBeInTheDocument();
    expect(document.querySelector("#relay")).toBeInTheDocument();
    expect(document.querySelector("#company")).toBeInTheDocument();
    expect(document.querySelector("#pilot")).toBeInTheDocument();
  });

  it("offers an operable compact navigation", () => {
    render(<SiteNav />);

    const toggle = screen.getByRole("button", { name: "Open navigation" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Close navigation");

    fireEvent.keyDown(document, { key: "Escape" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAccessibleName("Open navigation");
  });
});
