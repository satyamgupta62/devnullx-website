import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CompanyClose } from "../company-close";

describe("CompanyClose", () => {
  it("closes with a continuity record instead of an abstract network symbol", () => {
    render(<CompanyClose />);

    const continuity = screen.getByRole("img", {
      name: /operational context travelling with AGR-006/i,
    });

    expect(continuity).toHaveTextContent(/edge context onboard/i);
    expect(continuity).toHaveTextContent(/fleet decision retained/i);
    expect(continuity).toHaveTextContent(/relay ready/i);
  });
});
