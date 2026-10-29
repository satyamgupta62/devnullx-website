"use client";

import { useInView, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export type RevealState = "static" | "out" | "in";

type RevealStyle = CSSProperties & {
  "--investors-delay"?: string;
};

/**
 * Reveals are armed only for content that starts below the viewport, so
 * above-the-fold copy never flashes out and back in after hydration. Reduced
 * motion and missing IntersectionObserver support keep the static state, in
 * which the element renders in its final position with no transition.
 */
export function useArmedInView(ref: RefObject<HTMLElement | null>): RevealState {
  const reducedMotion = useReducedMotion() === true;
  const [armed, setArmed] = useState(false);
  const inView = useInView(ref, { amount: 0.15, once: true });

  useEffect(() => {
    const node = ref.current;

    if (
      !node ||
      reducedMotion ||
      typeof IntersectionObserver === "undefined" ||
      node.getBoundingClientRect().top <= window.innerHeight * 0.88
    ) {
      return;
    }

    setArmed(true);
  }, [ref, reducedMotion]);

  if (!armed) {
    return "static";
  }

  return inView ? "in" : "out";
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useArmedInView(ref);
  const style: RevealStyle = delay ? { "--investors-delay": `${delay}ms` } : {};

  return (
    <div
      className={`investors-reveal${className ? ` ${className}` : ""}`}
      data-reveal={state}
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
}
