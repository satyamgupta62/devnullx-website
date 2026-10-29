"use client";

import { useInView, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
  /** Element to render. `li` keeps list markup valid inside an ordered list. */
  as?: "div" | "li";
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. Applied as a transition delay only. */
  delay?: number;
};

/**
 * Restrained in-view reveal.
 *
 * Content renders in its completed state on the server and for anyone with
 * reduced motion or without IntersectionObserver. The hidden state is armed
 * only after mount, and only for elements that start below the first
 * viewport — so nothing that is already on screen ever flashes out.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() === true;
  const [armed, setArmed] = useState(false);
  const inView = useInView(ref, { amount: 0.2, once: true });

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || typeof IntersectionObserver === "undefined") {
      return;
    }

    const rect = node.getBoundingClientRect();
    const alreadyOnScreen = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyOnScreen) {
      return;
    }

    setArmed(true);
  }, [reduced]);

  const state = !armed || inView ? "visible" : "hidden";

  return (
    <Tag
      className={`platform-reveal${className ? ` ${className}` : ""}`}
      data-reveal={state}
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
