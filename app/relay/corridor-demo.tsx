"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  advance,
  createWorld,
  LAST,
  type Snapshot,
  snapshotOf,
  STATIONS,
  type World,
} from "./corridor-sim";

/** Seconds of schedule rendered as the settled state under reduced motion. */
const STATIC_SECONDS = 240;

const VIEW_W = 1240;
const VIEW_H = 420;
const X_ORIGIN = 92;
const X_STEP = 264;
const LANE_DELHI = 152;
const LANE_KANPUR = 246;
const CENTER_Y = 199;
const CHIP_UP_Y = 88;
const CHIP_DOWN_Y = 306;
const NAME_Y = 360;
const META_Y = 382;

function stationX(index: number) {
  return X_ORIGIN + index * X_STEP;
}

function laneY(dir: number) {
  return dir === 1 ? LANE_DELHI : LANE_KANPUR;
}

function PoolChip({
  x,
  y,
  dir,
  count,
}: {
  x: number;
  y: number;
  dir: 1 | -1;
  count: number;
}) {
  return (
    <g className="relayp-chip" transform={`translate(${x} ${y})`}>
      <rect height="28" rx="8" width="62" x="-31" y="-14" />
      <text dy="4" textAnchor="middle" x="0" y="0">
        {dir === 1 ? "▲" : "▼"} {count}
      </text>
    </g>
  );
}

export function CorridorDemo() {
  const worldRef = useRef<World | null>(null);
  if (worldRef.current === null) {
    worldRef.current = createWorld();
  }
  const world = worldRef.current;

  const [snapshot, setSnapshot] = useState<Snapshot>(() => snapshotOf(world));
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    function apply(matches: boolean) {
      setReduced(matches);
      if (!matches) {
        return;
      }
      const settled = createWorld();
      advance(settled, STATIC_SECONDS);
      worldRef.current = settled;
      setSnapshot(snapshotOf(settled));
    }

    apply(query.matches);
    function onChange(event: MediaQueryListEvent) {
      apply(event.matches);
    }
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting === true),
      { rootMargin: "160px 0px", threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onVisibility() {
      setPageVisible(document.visibilityState !== "hidden");
    }
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const running = playing && inView && pageVisible && !reduced;

  useEffect(() => {
    if (!running) {
      return;
    }
    let frame = 0;
    let last = performance.now();

    function loop(now: number) {
      const delta = Math.min((now - last) / 1000, 0.12);
      last = now;
      advance(world, delta);
      setSnapshot(snapshotOf(world));
      frame = requestAnimationFrame(loop);
    }

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [running, world]);

  return (
    <div className="relayp-demo" ref={frameRef}>
      <div className="relayp-demo__bar">
        <span>
          <i />
          RELAY CORRIDOR · ILLUSTRATION
        </span>
        <span>KANPUR ↔ DELHI · ~440 KM</span>
      </div>

      <div className="relayp-demo__scroll">
        <svg
          aria-label={`Illustration of the Kanpur to Delhi relay corridor. Trucks run in both directions and change drivers at Etawah, Agra and Mathura, with ready drivers waiting at each relay point. ${snapshot.handoffs} handoffs shown, ${snapshot.driversHome} drivers back at their own base.`}
          className="relayp-svg"
          role="img"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        >
          <title>Kanpur to Delhi relay corridor</title>
          <defs>
            <pattern
              height="40"
              id="relayp-grid"
              patternUnits="userSpaceOnUse"
              width="40"
            >
              <path d="M40 0H0V40" fill="none" />
            </pattern>
          </defs>

          <rect
            className="relayp-grid-field"
            height={VIEW_H}
            width={VIEW_W}
            x="0"
            y="0"
          />

          <line
            className="relayp-lane"
            x1={stationX(0)}
            x2={stationX(LAST)}
            y1={LANE_DELHI}
            y2={LANE_DELHI}
          />
          <line
            className="relayp-lane"
            x1={stationX(0)}
            x2={stationX(LAST)}
            y1={LANE_KANPUR}
            y2={LANE_KANPUR}
          />
          <line
            className="relayp-axis"
            x1={stationX(0)}
            x2={stationX(LAST)}
            y1={CENTER_Y}
            y2={CENTER_Y}
          />

          <text
            className="relayp-lane-label"
            x={stationX(3) + 44}
            y={LANE_DELHI - 16}
          >
            ▶ TO DELHI
          </text>
          <text
            className="relayp-lane-label"
            x={stationX(0) + 44}
            y={LANE_KANPUR + 28}
          >
            ◀ TO KANPUR
          </text>

          {STATIONS.map((station, index) => {
            const x = stationX(index);
            const pool = snapshot.pools[index];
            const isRelay = index > 0 && index < LAST;
            return (
              <g className="relayp-station" key={station.code}>
                <line className="relayp-tick" x1={x} x2={x} y1={116} y2={284} />
                <rect
                  className="relayp-node"
                  height="11"
                  transform={`rotate(45 ${x} ${CENTER_Y})`}
                  width="11"
                  x={x - 5.5}
                  y={CENTER_Y - 5.5}
                />
                <text
                  className="relayp-station-name"
                  textAnchor="middle"
                  x={x}
                  y={NAME_Y}
                >
                  {station.name}
                </text>
                <text
                  className="relayp-station-meta"
                  textAnchor="middle"
                  x={x}
                  y={META_Y}
                >
                  {isRelay ? "RELAY" : "DEPOT"} · {station.km} KM
                </text>

                {(isRelay || index === 0) && (
                  <>
                    <line
                      className="relayp-stem"
                      x1={x}
                      x2={x}
                      y1={CHIP_UP_Y + 16}
                      y2={LANE_DELHI - 16}
                    />
                    <PoolChip count={pool.up} dir={1} x={x} y={CHIP_UP_Y} />
                  </>
                )}

                {(isRelay || index === LAST) && (
                  <>
                    <line
                      className="relayp-stem"
                      x1={x}
                      x2={x}
                      y1={LANE_KANPUR + 16}
                      y2={CHIP_DOWN_Y - 16}
                    />
                    <PoolChip count={pool.down} dir={-1} x={x} y={CHIP_DOWN_Y} />
                  </>
                )}
              </g>
            );
          })}

          {snapshot.trucks.map((truck) =>
            truck.pulse > 0 ? (
              <circle
                className="relayp-pulse"
                cx={stationX(Math.round(truck.pos))}
                cy={laneY(truck.dir)}
                key={`pulse-${truck.id}`}
                opacity={truck.pulse * 0.7}
                r={12 + (1 - truck.pulse) * 28}
              />
            ) : null,
          )}

          {snapshot.trucks.map((truck) => (
            <g
              className={`relayp-truck${truck.swapping ? " relayp-truck--swap" : ""}`}
              key={truck.id}
              transform={`translate(${stationX(truck.pos)} ${laneY(truck.dir)})`}
            >
              <rect height="22" rx="6" width="58" x="-29" y="-11" />
              <text dy="3.5" textAnchor="middle" x="0" y="0">
                {truck.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="relayp-demo__footer">
        <dl className="relayp-demo__counters">
          <div>
            <dt>Handoffs shown</dt>
            <dd>{snapshot.handoffs}</dd>
          </div>
          <div>
            <dt>Drivers back at base</dt>
            <dd>{snapshot.driversHome}</dd>
          </div>
          <div>
            <dt>Trucks waiting for a driver</dt>
            <dd>0</dd>
          </div>
        </dl>

        <button
          className="relayp-control"
          disabled={reduced}
          onClick={() => setPlaying((value) => !value)}
          type="button"
        >
          {playing ? (
            <Pause aria-hidden size={13} />
          ) : (
            <Play aria-hidden size={13} />
          )}
          {reduced ? "Motion reduced" : playing ? "Pause" : "Play"}
        </button>
      </div>

      <p className="relayp-demo__legend">
        <span>▲ ▼ drivers ready at a relay point</span>
        <span>Violet pulse — driver changes over, truck carries on</span>
      </p>

      <p className="relayp-demo__note">
        Illustration, not telemetry. Relay points are drawn at even spacing for
        legibility and the schedule is simplified. The scheduling system itself
        is not shown.
      </p>
    </div>
  );
}
