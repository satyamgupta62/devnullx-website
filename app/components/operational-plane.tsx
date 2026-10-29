import {
  BadgeCheck,
  Camera,
  Check,
  Cloud,
  FileVideo,
  Gauge,
  MapPin,
  Route,
  ShieldCheck,
} from "lucide-react";
import type { OperationalPlane } from "../types/product";
import { MotionSurface } from "./motion-surface";
import { OperatorVisual } from "./operator-visual";
import { DriverCameraFrame, PerclosTrace } from "./product-demo";
import { StatusPill } from "./status-pill";

function SurfaceToolbar({
  label,
  state,
}: {
  label: string;
  state: string;
}) {
  return (
    <div className="surface-toolbar">
      <span>
        <i />
        {label}
      </span>
      <span>{state}</span>
    </div>
  );
}

function EdgeVisual() {
  return (
    <div
      className="plane-visual edge-product"
      role="img"
      aria-label="Dual-camera edge analysis for AGR-006"
    >
      <SurfaceToolbar label="AXON EDGE · LIVE ANALYSIS" state="AGR-006" />
      <div className="edge-product__body">
        <div className="edge-product__camera" data-motion-phase="camera">
          <DriverCameraFrame compact />
        </div>
        <div className="edge-product__trace">
          <div data-motion-phase="trace">
            <PerclosTrace compact />
          </div>
          <dl className="product-fact-grid">
            <div>
              <dt>Eye closure trace</dt>
              <dd>2.8s</dd>
            </div>
            <div>
              <dt>Event buffer</dt>
              <dd>04.2s</dd>
            </div>
            <div>
              <dt>Second camera</dt>
              <dd>Side view · synced</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function CloudVisual() {
  return (
    <div
      className="plane-visual evidence-product"
      role="img"
      aria-label="Sealed evidence packet for event evt_1a7f9c2e"
    >
      <SurfaceToolbar label="EVENT DOSSIER" state="evt_1a7f9c2e" />
      <div className="evidence-product__body">
        <div className="evidence-product__asset">
          <FileVideo aria-hidden size={18} />
          <span>
            <small>EVENT CLIP</small>
            <strong>event_clip.mp4</strong>
            <em>04.2s · browser ready</em>
          </span>
          <Check aria-hidden size={14} />
        </div>
        <dl className="evidence-product__metadata">
          <div>
            <dt>Captured</dt>
            <dd>10:24:31 IST</dd>
          </div>
          <div>
            <dt>Route context</dt>
            <dd>Delhi → Nagpur</dd>
          </div>
          <div>
            <dt>GPS</dt>
            <dd>Attached</dd>
          </div>
          <div>
            <dt>CAN</dt>
            <dd>Attached</dd>
          </div>
          <div>
            <dt>Vehicle</dt>
            <dd>62 km/h</dd>
          </div>
          <div>
            <dt>Checksum</dt>
            <dd>5C7A…91D2</dd>
          </div>
        </dl>
      </div>
      <div className="evidence-product__seal">
        <ShieldCheck aria-hidden size={15} />
        <span>
          <strong>Checksum verified</strong>
          <small>Clip and vehicle context sealed together</small>
        </span>
        <code>SCHEMA V2</code>
      </div>
    </div>
  );
}

function RelayVisual() {
  return (
    <div
      className="plane-visual relay-product"
      role="img"
      aria-label="Verified relay handoff at Nagpur"
    >
      <SurfaceToolbar label="RELAY CONTROL" state="DLH-NGP-042" />
      <div className="relay-product__body">
        <div className="relay-record relay-record--incoming">
          <span>
            <small>INCOMING LEG</small>
            <strong>Delhi → Nagpur</strong>
          </span>
          <em>AGR-006</em>
        </div>
        <div className="relay-verification">
          <BadgeCheck aria-hidden size={20} />
          <span>
            <small>VERIFICATION GATE</small>
            <strong>Identity and evidence retained</strong>
            <em>Driver · truck · route · event dossier</em>
          </span>
        </div>
        <div className="relay-record relay-record--outgoing">
          <span>
            <small>OUTBOUND LEG STAGED</small>
            <strong>Nagpur → Hyderabad</strong>
          </span>
          <em>Ready after acknowledgement</em>
        </div>
      </div>
      <div className="relay-product__footer">
        <MapPin aria-hidden size={13} />
        <span>Nagpur relay point</span>
        <Check aria-hidden size={13} />
        <strong>Verified context available</strong>
      </div>
    </div>
  );
}

const motionSequences = {
  edge: "edge",
  cloud: "evidence",
  operator: "operator",
  relay: "relay",
} as const;

const replayLabels = {
  edge: "Replay edge trace",
  cloud: "Replay evidence sealing",
  operator: "Replay operator acknowledgement",
  relay: "Replay relay verification",
} as const;

const icons = {
  edge: Camera,
  cloud: Cloud,
  operator: Gauge,
  relay: Route,
};

const tones = {
  edge: "coral",
  cloud: "cyan",
  operator: "mint",
  relay: "violet",
} as const;

export function OperationalPlaneCard({
  plane,
}: {
  plane: OperationalPlane;
}) {
  const Icon = icons[plane.id];

  return (
    <article className={`operational-chapter operational-chapter--${plane.id}`}>
      <div className="operational-chapter__copy">
        <span className="operational-chapter__step">
          <Icon aria-hidden size={15} strokeWidth={1.7} />
          {plane.step} · {plane.eyebrow}
        </span>
        <h3>{plane.title}</h3>
        <p>{plane.description}</p>
        <div className="operational-chapter__state">
          <StatusPill tone={tones[plane.id]}>{plane.status}</StatusPill>
          <small>{plane.detail}</small>
        </div>
      </div>
      <div className="operational-chapter__visual">
        <MotionSurface
          replayLabel={replayLabels[plane.id]}
          sequence={motionSequences[plane.id]}
        >
          {plane.id === "edge" ? <EdgeVisual /> : null}
          {plane.id === "cloud" ? <CloudVisual /> : null}
          {plane.id === "operator" ? <OperatorVisual /> : null}
          {plane.id === "relay" ? <RelayVisual /> : null}
        </MotionSurface>
      </div>
    </article>
  );
}
