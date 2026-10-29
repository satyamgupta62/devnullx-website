import type {
  IncidentStep,
  NetworkRoute,
  OperationalPlane,
  ProductPillar,
} from "../types/product";

export const proofBoundary = {
  label: "Product demonstration",
  detail:
    "Illustrative data composed from working DevNullX capabilities. It is not customer deployment evidence.",
  disallowedClaims: [
    "validated safety reduction",
    "validated fleet savings",
    "production deployment",
    "customer-scale outcomes",
  ],
} as const;

export const networkRoute: NetworkRoute = {
  deviceId: "AGR-006",
  origin: "Delhi",
  destination: "Nagpur",
  status: "Edge connected",
  routeLabel: "Illustrative Delhi → Nagpur corridor",
  nodes: [
    { id: "delhi", label: "Delhi", x: 65, y: 20, kind: "origin" },
    { id: "event", label: "Safety event", x: 57, y: 43, kind: "event" },
    { id: "relay", label: "Relay point", x: 51, y: 62, kind: "relay" },
    { id: "nagpur", label: "Nagpur", x: 54, y: 80, kind: "destination" },
  ],
};

export const operationalPlanes: OperationalPlane[] = [
  {
    id: "edge",
    step: "01",
    eyebrow: "In the cab",
    title: "Axon edge",
    description:
      "Driver-facing intelligence observes risk locally and keeps the safety loop useful when connectivity is degraded.",
    status: "Drowsiness event",
    detail: "AGR-006 · camera role: driver frontal",
  },
  {
    id: "cloud",
    step: "02",
    eyebrow: "Across the link",
    title: "Evidence cloud",
    description:
      "Event context, location, telemetry, and a browser-playable clip arrive as one reviewable record.",
    status: "Evidence sealed",
    detail: "Event + clip + GPS/CAN context",
  },
  {
    id: "operator",
    step: "03",
    eyebrow: "At fleet command",
    title: "Operator desk",
    description:
      "The fleet team sees the route, understands the event, reviews the evidence, and chooses the next action.",
    status: "Operator notified",
    detail: "Review queue · evidence · acknowledgement",
  },
  {
    id: "relay",
    step: "04",
    eyebrow: "Along the corridor",
    title: "Relay network",
    description:
      "The same driver, truck, route, and evidence context can support managed legs and verified handoffs.",
    status: "Handoff ready",
    detail: "Nagpur relay point · next leg staged",
  },
];

export const incidentSteps: IncidentStep[] = [
  {
    state: "risk_detected",
    timestamp: "10:24:31",
    label: "Risk detected",
    detail: "Drowsiness state crosses the on-edge safety threshold.",
    tone: "coral",
  },
  {
    state: "context_captured",
    timestamp: "10:24:32",
    label: "Context captured",
    detail: "Camera role, GPS and CAN context attach to the event.",
    tone: "cyan",
  },
  {
    state: "evidence_sealed",
    timestamp: "10:24:35",
    label: "Evidence sealed",
    detail: "The event and browser-playable clip become one record.",
    tone: "mint",
  },
  {
    state: "operator_notified",
    timestamp: "10:24:38",
    label: "Operator notified",
    detail: "The incident appears in the review queue and route map.",
    tone: "violet",
  },
];

export const productPillars: ProductPillar[] = [
  {
    id: "safety",
    index: "01",
    eyebrow: "Edge intelligence",
    title: "See risk where it happens.",
    description:
      "Aghrahan observes driver state inside the truck, captures the surrounding context, and preserves evidence for review.",
    proof: [
      "Drowsiness and distraction events",
      "Live and event-linked camera views",
      "Offline-aware event buffering",
    ],
  },
  {
    id: "operations",
    index: "02",
    eyebrow: "Fleet operations",
    title: "Operate with clarity.",
    description:
      "One operator surface connects vehicles, drivers, routes, alerts, clips, telemetry, provisioning, and updates.",
    proof: [
      "Fleet map and event pins",
      "GPS and CAN/OBD context",
      "Provisioning and OTA controls",
    ],
  },
  {
    id: "relay",
    index: "03",
    eyebrow: "Relay logistics",
    title: "Move freight through a verified network.",
    description:
      "Trips become managed legs with driver workflows, relay points, handoffs, and settlement context.",
    proof: [
      "Leg and trip coordination",
      "Driver handoff workflow",
      "Relay-point operations",
    ],
  },
];

export const currentCapabilities = [
  "Axon edge agent operating in the development environment",
  "Two-camera development configuration on AGR-006",
  "Events, clips, maps, telemetry, dashboard, and driver-app workflows",
  "Relay legs, trips, wallet, relay-point, and handoff workflows",
];

export const roadmapCapabilities = [
  "A production environment and onboarding controls",
  "Fleet intelligence, scorecards, and efficiency analytics",
  "A broader relay network and shipper-facing workflows",
];
