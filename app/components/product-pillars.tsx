import {
  BadgeCheck,
  Check,
  FileCheck2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { MotionSurface } from "./motion-surface";
import { PillarList } from "./pillar-list";

export function ProductPillars() {
  return (
    <section
      className="relay-section"
      id="relay"
      aria-labelledby="relay-title"
    >
      <div className="relay-story">
        <span className="section-kicker">The compounding system</span>
        <h2 id="relay-title">
          Safety earns trust. <span>Trust enables the handoff.</span>
        </h2>
        <p>
          DevNullX connects what happens inside the cab to what the fleet can
          coordinate across a corridor. That is how a safety platform grows
          into a relay operating network.
        </p>

        <MotionSurface
          replayLabel="Replay relay handoff"
          sequence="relay"
        >
          <div
            className="relay-control"
            role="img"
            aria-label="Relay control showing an incoming leg, verified handoff, and staged outbound leg at Nagpur"
          >
            <div className="relay-control__bar">
              <span>TRIP DLH-HYD-042</span>
              <span>CONTROLLED HANDOFF</span>
            </div>

            <div className="relay-control__records">
              <div className="relay-control__record relay-control__record--incoming">
                <MapPin aria-hidden size={13} />
                <span>
                  <small>Incoming leg</small>
                  <strong>Delhi → Nagpur</strong>
                  <em>AGR-006 · context available</em>
                </span>
                <Check aria-hidden size={12} />
              </div>

              <div className="relay-control__record relay-control__record--gate">
                <BadgeCheck aria-hidden size={17} />
                <span>
                  <small>Verification gate</small>
                  <strong>Identity verified</strong>
                  <em>Nagpur relay point</em>
                </span>
                <Check aria-hidden size={12} />
              </div>

              <div className="relay-control__record relay-control__record--outgoing">
                <FileCheck2 aria-hidden size={15} />
                <span>
                  <small>Outbound leg staged</small>
                  <strong>Nagpur → Hyderabad</strong>
                  <em>Ready after acknowledgement</em>
                </span>
                <Check aria-hidden size={12} />
              </div>
            </div>

            <div className="relay-control__continuity">
              <ShieldCheck aria-hidden size={14} />
              <span>Evidence continuity</span>
              <strong>Event record attached to next leg</strong>
            </div>
          </div>
        </MotionSurface>
      </div>

      <PillarList />
    </section>
  );
}
