import { operationalPlanes, proofBoundary } from "../content/product";
import { OperationalPlaneCard } from "./operational-plane";
import { StatusPill } from "./status-pill";

export function OperationalStack() {
  return (
    <section
      className="system-section"
      id="system"
      aria-labelledby="system-title"
    >
      <header className="section-intro">
        <div>
          <span className="section-kicker">One signal. Four working planes.</span>
          <h2 id="system-title">
            From the cab to the control room.{" "}
            <span>Then across the network.</span>
          </h2>
        </div>
        <div className="section-intro__aside">
          <StatusPill tone="quiet">{proofBoundary.label}</StatusPill>
          <p>
            One illustrative event travels through the real DevNullX operating
            model. The interface changes; the context stays intact.
          </p>
        </div>
      </header>

      <div className="operational-stage">
        {operationalPlanes.map((plane) => (
          <OperationalPlaneCard key={plane.id} plane={plane} />
        ))}
        <p className="sr-only">
          Motion is optional. Every system plane remains available in document
          order without animation.
        </p>
      </div>
    </section>
  );
}
