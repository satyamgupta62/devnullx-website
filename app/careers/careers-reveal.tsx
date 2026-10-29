"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Server-rendered markup ships in its resolved, visible state. The hidden
 * start position is armed only after hydration, and only when an
 * IntersectionObserver exists, so meaningful content is never withheld behind
 * motion and the arming step itself is instantaneous.
 */
const useArmingEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const elements: Record<CareersRevealElement, ElementType> = {
  article: motion.article,
  div: motion.div,
  li: motion.li,
};

export type CareersRevealElement = "article" | "div" | "li";

export type CareersRevealProps = {
  as?: CareersRevealElement;
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function CareersReveal({
  as = "div",
  children,
  className,
  delay = 0,
}: CareersRevealProps) {
  const surfaceRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() === true;
  const [armed, setArmed] = useState(false);
  const inView = useInView(surfaceRef, { amount: 0.15, once: true });

  useArmingEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }
    setArmed(true);
  }, []);

  const resolved = !armed || reduced || inView;
  const Component = elements[as];

  return (
    <Component
      animate={resolved ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      className={className}
      initial={false}
      ref={surfaceRef}
      transition={
        resolved
          ? { delay, duration: 0.62, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0 }
      }
    >
      {children}
    </Component>
  );
}
