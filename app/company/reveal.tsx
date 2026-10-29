"use client";

import { useInView, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealTag = "div" | "li" | "figure" | "blockquote";

type RevealStyle = CSSProperties & {
  "--companyp-delay"?: string;
};

/**
 * Restrained in-view reveal. The server-rendered state is "static", so the
 * content is present and legible before any motion initialises, and stays that
 * way under reduced-motion preferences or without IntersectionObserver.
 */
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
}: {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() === true;
  const [ready, setReady] = useState(false);
  const inView = useInView(ref, {
    amount: 0.15,
    initial: false,
    once: true,
  });

  useEffect(() => {
    setReady(typeof IntersectionObserver !== "undefined");
  }, []);

  const state = !ready || reduced ? "static" : inView ? "in" : "out";
  const style: RevealStyle | undefined = delay
    ? { "--companyp-delay": `${delay}ms` }
    : undefined;

  return (
    <Tag className={className} data-reveal={state} ref={ref} style={style}>
      {children}
    </Tag>
  );
}
