import { ArrowUpRight, Check, FlaskConical } from "lucide-react";
import {
  currentCapabilities,
  roadmapCapabilities,
} from "../content/product";
import { StatusPill } from "./status-pill";

function CapabilityList({
  items,
  kind,
}: {
  items: readonly string[];
  kind: "current" | "roadmap";
}) {
  return (
    <ul className="capability-list">
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden>
            {kind === "current" ? <Check size={13} /> : <ArrowUpRight size={13} />}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CapabilityLedger() {
  return (
    <section
      className="capability-section"
      id="platform"
      aria-labelledby="capability-title"
    >
      <header className="capability-heading">
        <span className="section-kicker">Product state</span>
        <h2 id="capability-title">
          Built enough to demonstrate. <span>Clear about what comes next.</span>
        </h2>
        <p>
          DevNullX is an active development system—not a concept render and not
          yet a production fleet deployment.
        </p>
      </header>

      <div className="capability-ledger">
        <article aria-label="Current capability" className="capability-column">
          <div className="capability-column__header">
            <StatusPill
              tone="mint"
              icon={<Check aria-hidden size={11} strokeWidth={2} />}
            >
              Demonstrable now
            </StatusPill>
            <span>Development environment</span>
          </div>
          <CapabilityList items={currentCapabilities} kind="current" />
        </article>

        <article aria-label="Roadmap direction" className="capability-column capability-column--roadmap">
          <div className="capability-column__header">
            <StatusPill
              tone="violet"
              icon={<FlaskConical aria-hidden size={11} strokeWidth={2} />}
            >
              Roadmap
            </StatusPill>
            <span>Direction, not a released claim</span>
          </div>
          <CapabilityList items={roadmapCapabilities} kind="roadmap" />
        </article>
      </div>
    </section>
  );
}
