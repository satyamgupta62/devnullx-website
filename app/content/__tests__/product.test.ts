import { describe, expect, it } from "vitest";
import {
  incidentSteps,
  networkRoute,
  operationalPlanes,
  proofBoundary,
} from "../product";

describe("public demonstration content", () => {
  it("keeps the approved edge-to-relay order", () => {
    expect(operationalPlanes.map((plane) => plane.id)).toEqual([
      "edge",
      "cloud",
      "operator",
      "relay",
    ]);
  });

  it("labels demonstration data and avoids outcome claims", () => {
    expect(proofBoundary.label).toBe("Product demonstration");
    expect(proofBoundary.disallowedClaims).toContain(
      "validated safety reduction",
    );
    expect(networkRoute.deviceId).toBe("AGR-006");
  });

  it("turns one incident into a complete operator-readable sequence", () => {
    expect(incidentSteps.map((step) => step.state)).toEqual([
      "risk_detected",
      "context_captured",
      "evidence_sealed",
      "operator_notified",
    ]);
  });
});
