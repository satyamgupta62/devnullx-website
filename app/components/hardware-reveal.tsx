"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export function HardwareReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 24,
    mass: 0.42,
  });

  const productOpacity = useTransform(
    progress,
    [0, 0.08, 0.57, 0.72],
    [0, 1, 1, 0],
  );
  const productY = useTransform(
    progress,
    [0, 0.22, 0.55, 0.72],
    [180, 0, -6, -96],
  );
  const productScale = useTransform(
    progress,
    [0, 0.25, 0.52, 0.72],
    [0.68, 0.96, 1.08, 0.82],
  );
  const productRotateX = useTransform(progress, [0, 0.44], [8, 0]);
  const headingOpacity = useTransform(
    progress,
    [0, 0.1, 0.5, 0.65],
    [0.25, 1, 1, 0],
  );
  const headingY = useTransform(progress, [0, 0.2, 0.65], [24, 0, -32]);
  const logoOpacity = useTransform(
    progress,
    [0.18, 0.38, 0.58, 0.7],
    [0, 0.72, 0.84, 0],
  );
  const productGlow = useTransform(
    progress,
    [0.12, 0.44, 0.67],
    [0.02, 0.2, 0.04],
  );

  const awarenessOpacity = useTransform(
    progress,
    [0.62, 0.78, 1],
    [0, 1, 1],
  );
  const awarenessScale = useTransform(
    progress,
    [0.62, 0.82, 1],
    [0.84, 0.97, 1],
  );
  const awarenessY = useTransform(
    progress,
    [0.62, 0.84, 1],
    [110, 12, 0],
  );
  const backgroundLight = useTransform(
    progress,
    [0, 0.42, 0.78, 1],
    [0.02, 0.1, 0.04, 0.08],
  );

  return (
    <section
      aria-labelledby="hardware-title"
      className="hardware-reveal"
      id="hardware"
      ref={sectionRef}
    >
      <div className="hardware-reveal__sticky">
        <motion.div
          aria-hidden
          className="hardware-reveal__ambient"
          style={
            shouldReduceMotion
              ? { opacity: 0.08 }
              : { opacity: backgroundLight }
          }
        />

        <motion.header
          className="hardware-reveal__heading"
          style={
            shouldReduceMotion
              ? undefined
              : { opacity: headingOpacity, y: headingY }
          }
        >
          <span className="section-kicker">Aghrahan / in-cab edge brain</span>
          <h2 id="hardware-title">Intelligence, made physical.</h2>
          <p>
            A 7-inch inclined edge terminal built for the Indian truck cabin.
            Local compute, driver workflow, telemetry, and evidence remain
            useful when the network does not.
          </p>
        </motion.header>

        <div className="hardware-reveal__stage">
          <motion.div
            aria-hidden
            className="hardware-device__glow"
            style={
              shouldReduceMotion ? { opacity: 0.14 } : { opacity: productGlow }
            }
          />

          <div className="hardware-device-shell">
            <motion.div
              className="hardware-device hardware-device--premium"
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: productOpacity,
                      rotateX: productRotateX,
                      scale: productScale,
                      y: productY,
                    }
              }
            >
              <Image
                alt="Aghrahan 7-inch inclined in-cab edge terminal"
                className="hardware-device__cad"
                fill
                priority
                sizes="(max-width: 860px) 98vw, 920px"
                src="/models/aghran-apple-hires.png"
                unoptimized
              />
              <motion.div
                aria-hidden
                className="hardware-device__screen-logo"
                style={
                  shouldReduceMotion
                    ? { opacity: 0.42 }
                    : { opacity: logoOpacity }
                }
              >
                <Image
                  alt=""
                  height={54}
                  src="/images/devnullx-logo.png"
                  unoptimized
                  width={260}
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.figure
            className="awareness-reveal"
            style={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: awarenessOpacity,
                    scale: awarenessScale,
                    y: awarenessY,
                  }
            }
          >
            <div className="awareness-reveal__frame">
              <Image
                alt="DevNullX 360-degree situational awareness showing eight camera clusters and overlapping fields of view around a truck"
                height={1024}
                src="/images/situational-awareness.webp"
                unoptimized
                width={1536}
              />
              <span aria-hidden className="awareness-reveal__sheen" />
            </div>
            <figcaption>
              <span>Nayan / situational awareness</span>
              <strong>Every side of the vehicle, one edge context.</strong>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
