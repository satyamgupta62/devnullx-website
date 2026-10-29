import { ArrowRight, ScanEye, ShieldCheck, Users } from "lucide-react";
import { CorridorDemo } from "./corridor-demo";
import "./relay.css";

export const metadata = {
  title: "Relay Network — DevNullX",
  description:
    "A design preview of DevNullX relay logistics: the truck runs the corridor continuously while each driver takes one leg out and the mirror leg home.",
};

const beats = [
  {
    id: "pool",
    icon: Users,
    label: "A pool, not a person",
    body: "Every relay point keeps a small group of authorised drivers ready in each direction. A truck arriving is matched to that pool, so it is never waiting on one named individual to turn up.",
  },
  {
    id: "handshake",
    icon: ScanEye,
    label: "Verified on the vehicle",
    body: "The handover is confirmed between the driver and the truck itself: a signed single-use code proves authorisation, and the in-cab camera proves identity. It completes with no network available.",
  },
  {
    id: "custody",
    icon: ShieldCheck,
    label: "Custody stays joined",
    body: "Driver, truck, route and evidence move together in an append-only record that reconciles when the relay point comes back online. Who was driving which leg is never in dispute.",
  },
] as const;

const designTargets = [
  { value: "≤60 s", label: "Dwell at a relay point" },
  { value: "≤3 s", label: "Handover, fully offline" },
  { value: "110–150 km", label: "Relay leg length" },
  { value: "Same day", label: "Driver returns home" },
  { value: "4–5 h", label: "Maximum continuous driving" },
] as const;

export default function RelayPage() {
  return (
    <main className="relay-page" id="main">
      <section aria-labelledby="relay-hero-title" className="relayp-hero">
        <div className="relayp-hero__copy">
          <span className="section-kicker">Relay network · design preview</span>
          <h1 id="relay-hero-title">
            Keep the truck moving. <span>Send the driver home.</span>
          </h1>
          <div className="relayp-hero__aside">
            <span className="status-pill status-pill--violet">
              Design target · not yet deployed
            </span>
            <p>
              Conventional line-haul ties one driver to the whole corridor: ten
              hours at the wheel and a night that ends a long way from home.
              Relay decouples the vehicle&apos;s journey from the driver&apos;s
              journey. The truck runs the corridor continuously, while each
              driver takes one leg out and the mirror leg back and sleeps in
              their own bed the same night.
            </p>
          </div>
        </div>

        <blockquote className="relayp-quote">
          <p>
            The vehicle never waits for a named person. It waits for the pool.
          </p>
          <cite>The no-wait guarantee</cite>
        </blockquote>

        <figure className="relayp-band">
          {/* biome-ignore lint/performance/noImgElement: vinext's image optimizer requires an unavailable worker ASSETS binding; this pre-optimized WebP is served directly. */}
          <img
            alt="Two freight trucks at a night relay yard, a driver walking between them with a bag"
            decoding="async"
            height="900"
            loading="lazy"
            src="/generated/relay-handoff-yard.webp"
            width="1600"
          />
          <figcaption>
            <span className="relayp-band__tag">Relay point · illustrative</span>
            <strong className="relayp-band__line">
              A relay point is a stop the route already had. The change of
              driver hides inside it.
            </strong>
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="relay-demo-title"
        className="relayp-section"
        id="corridor"
      >
        <header className="section-intro">
          <div>
            <span className="section-kicker">
              Simulation · illustrative schedule
            </span>
            <h2 id="relay-demo-title">
              One corridor, two directions. <span>Nobody stands still.</span>
            </h2>
          </div>
          <div className="section-intro__aside">
            <span className="status-pill status-pill--quiet">
              Illustration · not deployment data
            </span>
            <p>
              Kanpur to Delhi, with relay points at Etawah, Agra and Mathura.
              Trucks arrive, change drivers within a beat, and carry on. The
              driver who steps off waits for the next truck heading back the way
              they came.
            </p>
          </div>
        </header>

        <CorridorDemo />
      </section>

      <section
        aria-labelledby="relay-beats-title"
        className="relayp-section"
        id="how"
      >
        <header className="section-intro">
          <div>
            <span className="section-kicker">How a handover works</span>
            <h2 id="relay-beats-title">
              Three things have to be true{" "}
              <span>for a truck to change hands mid-corridor.</span>
            </h2>
          </div>
          <div className="section-intro__aside">
            <span className="status-pill status-pill--violet">
              Design · specification stage
            </span>
            <p>
              The scheduling method behind the corridor is not published. What
              matters on the road is what the driver and the truck can prove to
              each other in a few seconds.
            </p>
          </div>
        </header>

        <div className="relayp-beats">
          {beats.map((beat) => {
            const Icon = beat.icon;
            return (
              <article className="relayp-beat" key={beat.id}>
                <span className="relayp-beat__label">
                  <Icon aria-hidden size={14} strokeWidth={1.7} />
                  {beat.label}
                </span>
                <p>{beat.body}</p>
              </article>
            );
          })}
        </div>

        <p className="relayp-callout">
          <strong className="relayp-callout__lead">
            Refusing tired drivers is a safety feature.
          </strong>
          <span className="relayp-callout__body">
            A driver at their hours limit is not assigned a leg, full stop. The
            ready pool covers it instead.
          </span>
        </p>
      </section>

      <section
        aria-labelledby="relay-credible-title"
        className="relayp-section"
        id="credibility"
      >
        <div className="relayp-credible">
          <div className="relayp-credible__copy">
            <span className="section-kicker">Why this is credible</span>
            <h2 id="relay-credible-title">
              Relay trucking is already commercially proven in India.
            </h2>
            <p>
              Rivigo built a national relay network on this operating model, so
              the hard question — whether Indian drivers and shippers accept a
              vehicle that changes hands mid-corridor — already has a commercial
              answer. We do not claim relay as our invention. Our scheduling
              method is our own, and it is not on this page.
            </p>
          </div>

          <div className="relayp-pillars">
            <blockquote className="relayp-pillars__quote">
              <p>
                Relay reduces fatigue; IDSS monitors the fatigue that remains.
              </p>
            </blockquote>
            <div className="relayp-pillar">
              <span className="relayp-pillar__tag">Relay</span>
              <strong className="relayp-pillar__line">
                Removes the fatigue that should never exist.
              </strong>
              <small className="relayp-pillar__body">
                Continuous driving collapses from a full corridor run to a
                single leg.
              </small>
            </div>
            <div className="relayp-pillar relayp-pillar--safety">
              <span className="relayp-pillar__tag">IDSS</span>
              <strong className="relayp-pillar__line">
                Watches the fatigue that is left.
              </strong>
              <small className="relayp-pillar__body">
                In-cab driver monitoring on the same edge unit that verifies the
                handover.
              </small>
            </div>
            <p className="relayp-pillars__note">
              The camera that proves a driver is who they say they are is the
              camera that notices when they start to fade.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="relay-targets-title"
        className="relayp-section"
        id="targets"
      >
        <div className="relayp-targets">
          <div className="relayp-targets__head">
            <span className="section-kicker">Design targets</span>
            <h2 id="relay-targets-title">
              What the system is being built to hit.
            </h2>
            <p>
              Engineering targets for the relay design, not measured results.
              Nothing on this page has been validated in commercial operation.
            </p>
          </div>
          <dl className="relayp-targets__grid">
            {designTargets.map((target) => (
              <div key={target.label}>
                <dt>{target.value}</dt>
                <dd>{target.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="relay-close-title" className="relayp-close">
        <div>
          <span className="section-kicker">Next</span>
          <h2 id="relay-close-title">
            Relay only works on a truck that can already see.
          </h2>
        </div>
        <div className="relayp-close__actions">
          <p>
            The handover, the custody record and the fatigue model all run on
            the same in-cab edge platform. Start there, or talk to us about the
            corridor.
          </p>
          <div className="relayp-close__buttons">
            <a className="button button--light" href="/platform">
              The safety layer underneath
              <ArrowRight aria-hidden size={16} />
            </a>
            <a
              className="button relayp-close__secondary"
              href="/investors#contact"
            >
              Discuss the corridor pilot
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
