"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Renders the final value in SSR HTML (readable without JS), then counts up
 * from zero once scrolled into view. Reduced motion keeps the static value.
 */
export function CountUp({
  decimals = 0,
  duration = 1300,
  prefix = "",
  suffix = "",
  value,
}: {
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  value: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inertRef = useRef<HTMLSpanElement>(null);
  const supportsIntersectionObserver =
    typeof IntersectionObserver !== "undefined";
  const isInView = useInView(supportsIntersectionObserver ? ref : inertRef, {
    amount: 0.6,
    once: true,
  });
  const shouldReduceMotion = useReducedMotion() === true;
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || !supportsIntersectionObserver) {
      return;
    }

    if (!armed) {
      setDisplay(0);
      setArmed(true);
      return;
    }

    if (!isInView) {
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(value * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [
    armed,
    duration,
    isInView,
    shouldReduceMotion,
    supportsIntersectionObserver,
    value,
  ]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
