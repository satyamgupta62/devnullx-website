"use client";

import { useEffect, useRef, useState } from "react";
import { useArmedInView } from "./reveal";

type Measurement = {
  id: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

/**
 * Every entry here is a reading taken from the DevNullX development
 * environment — AWS billing meters, test runs, and the AGR-006 pilot truck.
 * Nothing on this wall is a projection; do not add one.
 */
const measurements: Measurement[] = [
  {
    id: "iot-messages",
    value: 6.08,
    decimals: 2,
    suffix: "M",
    label: "AWS IoT messages metered in a single month",
    note: "AWS billing meter · May 2026",
  },
  {
    id: "aws-services",
    value: 24,
    suffix: "+",
    label: "AWS services carrying live workloads",
    note: "Account inventory",
  },
  {
    id: "endpoints",
    value: 155,
    prefix: "~",
    label: "HTTP endpoints across two service planes",
    note: "Fleet API + driver BFF",
  },
  {
    id: "backend-tests",
    value: 550,
    suffix: "/550",
    label: "backend unit tests passing",
    note: "Fleet API suite",
  },
  {
    id: "edge-tests",
    value: 1175,
    label: "edge test cases in the in-cab agent suite",
    note: "IDSS streamer suite",
  },
  {
    id: "ota",
    value: 31,
    prefix: "~",
    suffix: "s",
    label: "over-the-air update, end to end, on the pilot truck",
    note: "AGR-006 · AWS IoT Jobs, no SSH",
  },
  {
    id: "cameras",
    value: 2,
    label: "camera streams running live at once on AGR-006",
    note: "Frontal + side, simultaneous",
  },
  {
    id: "telemetry",
    value: 50,
    suffix: "+ GB",
    label: "telemetry queryable today",
    note: "Athena over S3 Parquet",
  },
  {
    id: "latency",
    value: 150,
    prefix: "<",
    suffix: "ms",
    label: "edge alert latency, on device and network independent",
    note: "Detection to in-cab alert",
  },
];

function formatValue(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

function MeasuredStat({ measurement }: { measurement: Measurement }) {
  const { decimals = 0, label, note, prefix, suffix, value } = measurement;
  const ref = useRef<HTMLDivElement>(null);
  const state = useArmedInView(ref);
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    if (state === "static") {
      setDisplayed(value);
      return;
    }

    if (state === "out") {
      setDisplayed(0);
      return;
    }

    const duration = 950;
    const start = performance.now();
    let frame = requestAnimationFrame(function step(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;

      setDisplayed(value * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    });
    // Guarantees the exact reading is what settles, whatever the frame timing.
    const settle = setTimeout(() => setDisplayed(value), duration + 140);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, [state, value]);

  return (
    <div
      className="investors-stat investors-reveal"
      data-reveal={state}
      ref={ref}
    >
      <p aria-hidden className="investors-stat__value">
        {prefix ? <em>{prefix}</em> : null}
        {formatValue(displayed, decimals)}
        {suffix ? <small>{suffix}</small> : null}
      </p>
      <span className="sr-only">
        {`${prefix ?? ""}${formatValue(value, decimals)}${suffix ?? ""}`}
      </span>
      <p className="investors-stat__note">{note}</p>
      <p className="investors-stat__label">{label}</p>
    </div>
  );
}

export function MeasuredWall() {
  return (
    <div className="investors-wall">
      {measurements.map((measurement) => (
        <MeasuredStat key={measurement.id} measurement={measurement} />
      ))}
    </div>
  );
}
