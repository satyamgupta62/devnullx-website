import { ArrowRight } from "lucide-react";
import { proofBoundary } from "../content/product";
import { CountUp } from "./count-up";
import { LifecycleWorkspace } from "./lifecycle-workspace";
import { StatusPill } from "./status-pill";

export function NetworkAtlas() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow-row">
          <span className="eyebrow">DevNullX · Aghrahan</span>
          <StatusPill tone="quiet">{proofBoundary.label}</StatusPill>
        </div>

        <h1 id="hero-title">
          A safer fleet becomes a <span>smarter network.</span>
        </h1>

        <p className="hero-summary">
          Edge-first driver safety, fleet operations, and relay logistics for
          Indian heavy trucks—connected by one living control plane.
        </p>

        <div className="hero-actions">
          <a className="button button--primary" href="#system">
            See DevNullX in action
            <ArrowRight aria-hidden size={16} strokeWidth={1.8} />
          </a>
          <a className="button button--secondary" href="#platform">
            Review current capability
          </a>
        </div>

        <p className="hero-proof">
          One event. One evidence record. One operational chain.
        </p>
      </div>
    </section>
  );
}

export function ProductSpotlight() {
  return (
    <section
      aria-label="AGR-006 product demonstration spotlight"
      className="product-spotlight"
    >
      <LifecycleWorkspace />

      <dl aria-label="Measured system facts" className="hero-stats">
        <div>
          <dd>
            <CountUp prefix="<" suffix=" ms" value={150} />
          </dd>
          <dt>edge alert latency</dt>
        </div>
        <div>
          <dd>
            <CountUp decimals={2} suffix="M" value={6.08} />
          </dd>
          <dt>IoT messages metered / month</dt>
        </div>
        <div>
          <dd>
            <CountUp suffix="/550" value={550} />
          </dd>
          <dt>backend tests passing</dt>
        </div>
        <div>
          <dd>
            <CountUp prefix="~" suffix=" s" value={31} />
          </dd>
          <dt>over-the-air update, pilot truck</dt>
        </div>
      </dl>
    </section>
  );
}
