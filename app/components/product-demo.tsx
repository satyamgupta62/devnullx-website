import { Camera, ScanEye } from "lucide-react";

type LandmarkBox = {
  label: string;
  value: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

/**
 * Landmark coordinates are percentages of the rendered 3:2 frame, measured
 * per photograph. They are image data, not styling — each view has its own.
 */
const driverViews = {
  frontal: {
    src: "/axon-driver-ir-demo.webp",
    alt: "Frontal infrared driver-monitoring frame",
    camera: "IR CAM 01",
    face: { label: "FACE", value: "0.97", left: 41, top: 8.5, width: 18.5, height: 29 },
    eyes: [
      { label: "EYE R", value: "0.79", left: 43.4, top: 21.1, width: 4.8, height: 4.4 },
      { label: "EYE L", value: "0.82", left: 49.8, top: 20.9, width: 4.8, height: 4.4 },
    ],
  },
  side: {
    src: "/axon-driver-side-event.webp",
    alt: "Side-angle infrared event evidence frame",
    camera: "IR CAM 02",
    face: { label: "FACE", value: "0.94", left: 37.8, top: 9.5, width: 14.5, height: 29 },
    eyes: [
      { label: "EYE R", value: "0.81", left: 43.2, top: 22.1, width: 4.6, height: 4.2 },
      { label: "EYE L", value: "0.77", left: 48.8, top: 21.1, width: 4.6, height: 4.2 },
    ],
  },
} as const satisfies Record<
  string,
  {
    src: string;
    alt: string;
    camera: string;
    face: LandmarkBox;
    eyes: readonly LandmarkBox[];
  }
>;

function boxStyle(box: LandmarkBox) {
  return {
    left: `${box.left}%`,
    top: `${box.top}%`,
    width: `${box.width}%`,
    height: `${box.height}%`,
  };
}

export function DriverCameraFrame({
  compact = false,
  label,
  view = "frontal",
}: {
  compact?: boolean;
  label?: string;
  view?: keyof typeof driverViews;
}) {
  const media = driverViews[view];
  const caption =
    label ?? (view === "side" ? "Driver side angle" : "Driver frontal");

  return (
    <figure
      className={`driver-frame${compact ? " driver-frame--compact" : ""}`}
    >
      <div className="driver-frame__toolbar">
        <span>
          <i />
          {media.camera}
        </span>
        <span>FRAME 0618 · 10:24:31</span>
      </div>
      <div className="driver-frame__image">
        {/* biome-ignore lint/performance/noImgElement: vinext's image optimizer requires an unavailable worker ASSETS binding; this pre-optimized WebP is served directly. */}
        <img
          alt={media.alt}
          decoding="async"
          fetchPriority={compact ? "high" : "auto"}
          height="1024"
          loading={compact ? "eager" : "lazy"}
          src={media.src}
          width="1536"
        />
        <span className="driver-frame__corner driver-frame__corner--tl" />
        <span className="driver-frame__corner driver-frame__corner--tr" />
        <span className="driver-frame__corner driver-frame__corner--bl" />
        <span className="driver-frame__corner driver-frame__corner--br" />
        <span className="driver-frame__landmark driver-frame__landmark--face" style={boxStyle(media.face)}>
          <small>
            {media.face.label} {media.face.value}
          </small>
        </span>
        {media.eyes.map((eye, index) => (
          <span
            className={`driver-frame__landmark driver-frame__landmark--eye driver-frame__landmark--eye-${
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
          {caption}
        </span>
        <strong>
          <ScanEye aria-hidden size={12} />
          Drowsiness detected
        </strong>
      </figcaption>
    </figure>
  );
}

export function AxonHardwareFrame({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <figure
      className={`driver-frame axon-hardware-frame${
        compact ? " driver-frame--compact" : ""
      }`}
    >
      <div className="driver-frame__toolbar">
        <span>
          <i />
          AXON HW 01
        </span>
        <span>DEVICE LOCK · LIVE</span>
      </div>
      <div className="driver-frame__image">
        {/* biome-ignore lint/performance/noImgElement: vinext's image optimizer requires an unavailable worker ASSETS binding; this pre-optimized WebP is served directly. */}
        <img
          alt="Axon hardware mounted in a night-time truck cabin"
          decoding="async"
          fetchPriority={compact ? "high" : "auto"}
          height="941"
          loading={compact ? "eager" : "lazy"}
          src="/axon-hardware-cabin.webp"
          width="1672"
        />
        <span className="driver-frame__corner driver-frame__corner--tl" />
        <span className="driver-frame__corner driver-frame__corner--tr" />
        <span className="driver-frame__corner driver-frame__corner--bl" />
        <span className="driver-frame__corner driver-frame__corner--br" />
        <span
          aria-label="Hardware lock reticle"
          className="driver-frame__landmark driver-frame__landmark--device"
          role="status"
          style={boxStyle({
            label: "AXON",
            value: "LOCKED",
            left: 29.8,
            top: 32.5,
            width: 12,
            height: 15.5,
          })}
        >
          <small>AXON · LOCKED</small>
        </span>
      </div>
      <figcaption>
        <span>
          <Camera aria-hidden size={12} />
          Axon hardware
        </span>
        <strong>
          <ScanEye aria-hidden size={12} />
          Device healthy
        </strong>
      </figcaption>
    </figure>
  );
}

export function PerclosTrace({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`perclos-trace${compact ? " perclos-trace--compact" : ""}`}>
      <div className="perclos-trace__heading">
        <span>PERCLOS trace</span>
        <strong>34%</strong>
      </div>
      <svg
        aria-label="PERCLOS rises above the 24 percent threshold at the event marker"
        role="img"
        viewBox="0 0 640 180"
      >
        <line className="trace-grid" x1="0" x2="640" y1="40" y2="40" />
        <line className="trace-grid" x1="0" x2="640" y1="90" y2="90" />
        <line className="trace-grid" x1="0" x2="640" y1="140" y2="140" />
        <g data-motion-phase="threshold">
          <line
            className="trace-threshold"
            x1="0"
            x2="640"
            y1="104"
            y2="104"
          />
        </g>
        <path
          className="trace-area"
          d="M0 139 C45 138 62 132 92 134 C128 137 151 124 182 128 C219 133 235 113 267 118 C306 124 319 82 354 86 C391 90 405 47 441 53 C477 59 489 31 522 39 C554 46 571 73 604 70 C620 68 631 64 640 58 L640 180 L0 180 Z"
        />
        <path
          className="trace-line"
          d="M0 139 C45 138 62 132 92 134 C128 137 151 124 182 128 C219 133 235 113 267 118 C306 124 319 82 354 86 C391 90 405 47 441 53 C477 59 489 31 522 39 C554 46 571 73 604 70 C620 68 631 64 640 58"
        />
        <line className="trace-event" x1="522" x2="522" y1="18" y2="162" />
        <circle className="trace-event-dot" cx="522" cy="39" r="5" />
      </svg>
      <div className="perclos-trace__legend" data-motion-phase="threshold">
        <span>10:24:28</span>
        <strong>Threshold 24%</strong>
        <span>10:24:34</span>
      </div>
    </div>
  );
}
