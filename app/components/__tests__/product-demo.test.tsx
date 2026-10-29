import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AxonHardwareFrame, DriverCameraFrame } from "../product-demo";

describe("product demonstration media", () => {
  it("uses a distinct optimized image for each product moment", () => {
    render(
      <>
        <AxonHardwareFrame compact />
        <DriverCameraFrame view="frontal" />
        <DriverCameraFrame view="side" />
      </>,
    );

    expect(
      screen.getByRole("img", { name: /axon hardware/i }),
    ).toHaveAttribute("src", "/axon-hardware-cabin.webp");
    expect(
      screen.getByRole("img", { name: /frontal infrared/i }),
    ).toHaveAttribute("src", "/axon-driver-ir-demo.webp");
    expect(
      screen.getByRole("img", { name: /side-angle infrared/i }),
    ).toHaveAttribute("src", "/axon-driver-side-event.webp");
    expect(
      new Set(
        screen
          .getAllByRole("img")
          .map((image) => image.getAttribute("src")),
      ).size,
    ).toBe(3);
  });

  it("uses the side-view caption only when the caller omits a label", () => {
    const { container, rerender } = render(
      <DriverCameraFrame view="side" />,
    );

    expect(within(container).getByText("IR CAM 02")).toBeInTheDocument();
    expect(
      within(container).getByText("Driver side angle"),
    ).toBeInTheDocument();

    rerender(
      <DriverCameraFrame
        label="Driver camera · Frame 0618"
        view="side"
      />,
    );
    expect(
      within(container).getByText("Driver camera · Frame 0618"),
    ).toBeInTheDocument();
    expect(
      within(container).queryByText("Driver side angle"),
    ).not.toBeInTheDocument();
  });

  it("exposes the hardware lock and device health state", () => {
    const { container } = render(<AxonHardwareFrame />);

    expect(
      within(container).getByRole("status", {
        name: "Hardware lock reticle",
      }),
    ).toBeInTheDocument();
    expect(within(container).getByText("Device healthy")).toBeInTheDocument();
  });
});
