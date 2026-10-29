export type OperationalPlaneId = "edge" | "cloud" | "operator" | "relay";

export interface OperationalPlane {
  id: OperationalPlaneId;
  step: string;
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  detail: string;
}

export interface IncidentStep {
  state:
    | "risk_detected"
    | "context_captured"
    | "evidence_sealed"
    | "operator_notified";
  timestamp: string;
  label: string;
  detail: string;
  tone: "coral" | "cyan" | "mint" | "violet";
}

export interface RouteNode {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: "origin" | "event" | "relay" | "destination";
}

export interface NetworkRoute {
  deviceId: string;
  origin: string;
  destination: string;
  status: string;
  routeLabel: string;
  nodes: RouteNode[];
}

export interface ProductPillar {
  id: "safety" | "operations" | "relay";
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  proof: string[];
}
