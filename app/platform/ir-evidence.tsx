"use client";

import { Camera, ScanEye } from "lucide-react";
import { useState } from "react";

type Box = {
  label: string;
  value: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

/**
 * Landmark coordinates are percentages of the rendered 4:3 frame, measured
 * per image. They are image data, not styling — each view has its own.
 */
const views = {
  alert: {
    src: "/generated/driver-ir-frontal.webp",
    alt: "Infrared driver-monitoring frame with the driver facing forward and both eyes open",
    tab: "Alert",
    camera: "IR CAM 01 · FRONTAL",
    clock: "FRAME 0411 · 10:24:18",
    tone: "mint",
    state: "Eyes open · tracking",
    face: { label: "FACE", value: "0.97", left: 34.5, top: 13.5, width: 32, height: 60 },
    eyes: [
      { label: "EAR R", value: "0.31", left: 40.9, top: 40.6, width: 6.6, height: 5.2 },
      { label: "EAR L", value: "0.30", left: 54.3, top: 40.4, width: 6.6, height: 5.2 },
    ],
    readouts: [
      { term: "Eye aspect ratio", value: "0.31 / 0.30" },
      { term: "Head pose", value: "Forward · normalized" },
      { term: "Detector state", value: "Nominal" },
    ],
  },
  drowsy: {
    src: "/generated/driver-ir-drowsy.webp",
    alt: "Infrared driver-monitoring frame of the same driver with both eyes closed and the head drooping forward",
    tab: "Drowsiness event",
    camera: "IR CAM 01 · FRONTAL",
    clock: "FRAME 0618 · 10:24:31",
    tone: "coral",
    state: "Eye closure · sustained",
    face: { label: "FACE", value: "0.94", left: 34.5, top: 15, width: 32, height: 60 },
    eyes: [
      { label: "EAR R", value: "0.07", left: 41, top: 44.7, width: 6.6, height: 4.6 },
      { label: "EAR L", value: "0.06", left: 54, top: 44.5, width: 6.6, height: 4.6 },
    ],
    readouts: [
      { term: "Eye aspect ratio", value: "0.07 / 0.06" },
      { term: "Head pose", value: "Forward droop" },
      { term: "Detector state", value: "Closure candidate" },
    ],
  },
} as const;

type ViewKey = keyof typeof views;

const order: readonly ViewKey[] = ["alert", "drowsy"];

function boxStyle(box: Box) {
  return {
    left: `${box.left}%`,
    top: `${box.top}%`,
    width: `${box.width}%`,
    height: `${box.height}%`,
  };
}

export function IrEvidence() {
  const [active, setActive] = useState<ViewKey>("alert");
  const view = views[active];

  return (
    <div className="platform-ir">
      <div className="platform-ir__controls">
        <span className="platform-ir__controls-label">Frame state</span>
        <div className="platform-ir__switch">
          {order.map((key) => (
            <button
              aria-pressed={key === active}
              className="platform-ir__switch-button"
              data-tone={views[key].tone}
              key={key}
              onClick={() => setActive(key)}
              type="button"
            >
              {views[key].tab}
            </button>
          ))}
        </div>
      </div>

      <figure className="platform-frame platform-ir__frame" data-tone={view.tone}>
        <div className="platform-frame__toolbar">
          <span>
            <i />
            {view.camera}
          </span>
          <span>{view.clock}</span>
        </div>

        <div className="platform-frame__image platform-frame__image--portrait">
          {order.map((key) => (
            // biome-ignore lint/performance/noImgElement: vinext's image optimizer requires an unavailable worker ASSETS binding; this pre-optimized WebP is served directly.
            <img
              alt={views[key].alt}
              data-active={key === active}
              decoding="async"
              height="1086"
              key={key}
              loading="lazy"
              src={views[key].src}
              width="1448"
            />
          ))}

          <span className="platform-frame__corner platform-frame__corner--tl" />
          <span className="platform-frame__corner platform-frame__corner--tr" />
          <span className="platform-frame__corner platform-frame__corner--bl" />
          <span className="platform-frame__corner platform-frame__corner--br" />

          <span
            className="platform-frame__box platform-frame__box--face"
            style={boxStyle(view.face)}
          >
            <small>
              {view.face.label} {view.face.value}
            </small>
          </span>

          {view.eyes.map((eye, index) => (
            <span
              className={`platform-frame__box platform-frame__box--eye platform-frame__box--eye-${
                index === 0 ? "r" : "l"
              }`}
              key={eye.label}
              style={boxStyle(eye)}
            >
              <small>
                {eye.label} {eye.value}
              </small>
            </span>
          ))}
        </div>

        <figcaption>
          <span>
            <Camera aria-hidden size={12} />
            {view.tab}
          </span>
          <strong>
            <ScanEye aria-hidden size={12} />
            {view.state}
          </strong>
        </figcaption>
      </figure>

      <dl aria-live="polite" className="platform-ir__readout">
        {view.readouts.map((row) => (
          <div key={row.term}>
            <dt>{row.term}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
