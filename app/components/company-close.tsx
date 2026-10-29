import {
  ArrowRight,
  BadgeCheck,
  Cpu,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { MotionSurface } from "./motion-surface";

export function CompanyClose() {
  return (
    <>
      <figure className="road-band">
        {/* biome-ignore lint/performance/noImgElement: vinext's image optimizer requires an unavailable worker ASSETS binding; this pre-optimized WebP is served directly. */}
        <img
          alt="Indian freight truck on a night highway traced by telemetry lines"
          decoding="async"
          height="936"
          loading="lazy"
          src="/generated/hero-highway.webp"
          width="1664"
        />
        <figcaption>
          <span>Real vehicles. Real roads. Real lives.</span>
          <small>NH-CORRIDOR · ILLUSTRATIVE FRAME</small>
        </figcaption>
      </figure>

      <section
        className="company-section"
        id="company"
        aria-labelledby="company-title"
      >
        <MotionSurface
          replayLabel="Replay context continuity"
          sequence="continuity"
        >
          <div
            className="company-continuity"
            role="img"
            aria-label="Operational context travelling with AGR-006 from Delhi to the Nagpur relay point"
          >
            <div className="company-continuity__bar">
              <span>CONTEXT CONTINUITY</span>
              <span>AGR-006 · LIVE</span>
            </div>
            <div className="company-continuity__canvas">
              <div className="continuity-stage continuity-stage--device">
                <Cpu aria-hidden size={14} />
                <span>
                  <small>Edge context onboard</small>
                  <strong>Delhi · AGR-006</strong>
                </span>
              </div>

              <div className="continuity-stage continuity-stage--record">
                <ShieldCheck aria-hidden size={17} />
                <span>
                  <small>Fleet decision retained</small>
                  <strong>evt_1a7f9c2e</strong>
                </span>
                <BadgeCheck aria-hidden size={14} />
              </div>

              <div className="continuity-stage continuity-stage--relay">
                <MapPin aria-hidden size={14} />
                <span>
                  <small>Relay ready</small>
                  <strong>Nagpur · handoff</strong>
                </span>
              </div>
            </div>
            <div className="company-continuity__footer">
              <span>DRIVER</span>
              <i />
              <span>TRUCK</span>
              <i />
              <span>ROUTE</span>
              <i />
              <span>EVIDENCE</span>
            </div>
          </div>
        </MotionSurface>
        <div className="company-section__copy">
          <span className="section-kicker">Built for the Indian road</span>
          <h2 id="company-title">
            Intelligence should travel with the truck.
          </h2>
          <p>
            DevNullX is building the operational layer for safer drivers,
            clearer fleet decisions, and more coordinated freight movement
            across India&apos;s heavy-vehicle network.
          </p>
        </div>
      </section>

      <section className="pilot-section" id="pilot" aria-labelledby="pilot-title">
        <div>
          <span className="section-kicker">Early pilot conversations</span>
          <h2 id="pilot-title">Bring us your hardest corridor.</h2>
        </div>
        <div className="pilot-section__action">
          <p>
            A direct contact channel is being prepared. For now, review the
            working system and the capability available in the development
            environment.
          </p>
          <a className="button button--light" href="#platform">
            Review current capability
            <ArrowRight aria-hidden size={16} />
          </a>
        </div>
        <span className="pilot-section__mark" aria-hidden>
          <i />
          <i />
        </span>
      </section>

    </>
  );
}
