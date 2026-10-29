"use client";

import { RotateCcw } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export type MotionSurfaceProps = {
  children: ReactNode;
  className?: string;
  replayLabel: string;
  sequence:
    | "edge"
    | "evidence"
    | "operator"
    | "relay"
    | "incident"
    | "continuity";
};

type MotionSurfaceStyle = CSSProperties & {
  "--motion-play-state": "paused" | "running";
};

export function MotionSurface({
  children,
  className,
  replayLabel,
  sequence,
}: MotionSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const inertViewportRef = useRef<HTMLDivElement>(null);
  const supportsIntersectionObserver =
    typeof IntersectionObserver !== "undefined";
  const viewportRef = supportsIntersectionObserver
    ? surfaceRef
    : inertViewportRef;
  const observedInView = useInView(viewportRef, {
    amount: 0.2,
    initial: false,
  });
  const reduced = useReducedMotion() === true;
  const [observerReady, setObserverReady] = useState(false);
  const [activated, setActivated] = useState(false);
  const [visible, setVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );
  const [run, setRun] = useState(0);
  const staticMode = reduced || !observerReady;
  const active =
    observerReady && (activated || observedInView);
  const playState =
    !staticMode && observerReady && observedInView && visible
      ? "running"
      : "paused";
  const style: MotionSurfaceStyle = {
    "--motion-play-state": playState,
  };

  useEffect(() => {
    const updateDocumentVisibility = () => {
      setVisible(!document.hidden);
    };

    setObserverReady(supportsIntersectionObserver);
    updateDocumentVisibility();
    document.addEventListener("visibilitychange", updateDocumentVisibility);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        updateDocumentVisibility,
      );
    };
  }, [supportsIntersectionObserver]);

  useEffect(() => {
    if (observedInView) {
      setActivated(true);
    }
  }, [observedInView]);

  return (
    <div
      className={`motion-surface${className ? ` ${className}` : ""}`}
      data-motion-sequence={sequence}
      data-motion-state={staticMode ? "complete" : active ? "active" : "idle"}
      data-testid="motion-surface"
      ref={surfaceRef}
      style={style}
    >
      <div className="motion-surface__content" key={run}>
        {children}
      </div>
      <button
        aria-label={replayLabel}
        className="motion-surface__replay"
        onClick={() => setRun((currentRun) => currentRun + 1)}
        type="button"
      >
        <RotateCcw aria-hidden size={12} />
        Replay
      </button>
    </div>
  );
}
