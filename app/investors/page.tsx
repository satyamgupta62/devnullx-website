import "./investors.css";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FlaskConical,
  Mail,
} from "lucide-react";
import { StatusPill } from "../components/status-pill";
import { SupportedBy } from "../components/supported-by";
import { MeasuredWall } from "./measured-wall";
import { Reveal } from "./reveal";

export const metadata = {
  title: "Investors — DevNullX",
  description:
    "DevNullX for investors: measured evidence from a development fleet environment, the compounding safety-to-relay thesis, cost architecture, and an honest boundary on what exists today.",
};

const marketCards = [
  {
    id: "logistics-cost",
    figure: "~12%",
    title: "of a product's price is spent moving it",
    body: "In India, logistics absorbs close to an eighth of what a product costs — roughly double what the US or China spend. That gap is paid in fuel, delay, disputes, and accidents.",
  },
  {
    id: "fleet-size",
    figure: "5M",
    title: "commercial trucks on Indian roads",
    body: "Heavy trucking carries the freight and the risk. It is the largest addressable surface for in-cab intelligence in the country.",
  },
  {
    id: "wedge",
    figure: "Safety",
    title: "is the wedge, not the whole product",
    body: "Fatigue and distraction are measurable inside the cab today with a camera and an NPU. That measurement is what earns a place in the vehicle.",
  },
  {
    id: "relay-precedent",
    figure: "Relay",
    title: "is already commercially proven here",
    body: "Rivigo built a relay trucking business in India and patented their own scheduling method. We read that as market validation — their achievement, not ours. Our method is distinct.",
  },
];

const chainSteps = [
  {
    id: "edge",
    index: "01",
    title: "Edge",
    body: "An in-cab agent watches for drowsiness, distraction, and phone use and raises an alert in under 150 ms — on the device, with no network in the path.",
    tone: "mint" as const,
    tag: "Built",
  },
  {
    id: "evidence",
    index: "02",
    title: "Evidence",
    body: "Each event seals a short clip with speed, RPM, and GPS context around it. Gaps stay null. Nothing in the context window is fabricated.",
    tone: "mint" as const,
    tag: "Built",
  },
  {
    id: "operations",
    index: "03",
    title: "Operations",
    body: "A console joins the event, the trace, and the vehicle so an operator can review what happened instead of reconstructing it hours later.",
    tone: "mint" as const,
    tag: "Built",
  },
  {
    id: "relay",
    index: "04",
    title: "Relay",
    body: "Once identity and conduct are provable at the vehicle itself, a driver can hand the truck to the next driver and still sleep at home. That is where a safety product becomes a network.",
    tone: "violet" as const,
    tag: "Design",
  },
];

const economics = [
  {
    id: "idle",
    figure: "< $1 / month",
    tone: "mint" as const,
    tag: "Metered",
    body: "Idle cost of the entire cloud stack when no device is publishing and no dashboard is querying. Nothing bills for existing.",
  },
  {
    id: "batching",
    figure: "26×",
    tone: "mint" as const,
    tag: "Metered",
    body: "IoT messaging cost reduction from batching telemetry. The 6.08M metered messages cost roughly two dollars.",
  },
  {
    id: "fifty-trucks",
    figure: "~$328 / month",
    tone: "cyan" as const,
    tag: "Modelled",
    body: "Cloud cost at 50 trucks streaming around the clock, built up from the metered unit rates above.",
  },
  {
    id: "blended",
    figure: "~$7.20 / truck",
    tone: "cyan" as const,
    tag: "Modelled",
    body: "Blended monthly infrastructure cost at small scale, trending toward roughly $4.50 per truck at 10,000 vehicles. The 10,000-truck figure is a model, not an observation.",
  },
];

const standards = [
  {
    id: "ncap",
    title: "Euro NCAP DSM taxonomy",
    body: "Implemented end to end on the edge: microsleep, sleep, unresponsive, long distraction, cumulative eyes-off-road, and camera-blocked — with a three-level warning ladder.",
    tone: "mint" as const,
    tag: "Implemented",
  },
  {
    id: "ais140",
    title: "AIS-140 readiness",
    body: "Built toward the Indian telematics standard so a fleet does not have to choose between our device and a compliant one.",
    tone: "cyan" as const,
    tag: "Readiness",
  },
  {
    id: "obd",
    title: "BS4 / BS6 OBD",
    body: "Over 40 parameter IDs read directly off CAN at 500 kbps, across both emission generations still on Indian roads.",
    tone: "mint" as const,
    tag: "Implemented",
  },
  {
    id: "residency",
    title: "Data residency",
    body: "Everything runs in AWS ap-south-1, Mumbai. Indian fleet and freight data stays in India.",
    tone: "mint" as const,
    tag: "Implemented",
  },
  {
    id: "dpdpa",
    title: "DPDPA-aware retention",
    body: "Clip lifecycle and telemetry retention windows are designed against India's data protection obligations rather than bolted on later.",
    tone: "cyan" as const,
    tag: "Designed",
  },
  {
    id: "offline",
    title: "Edge-first offline design",
    body: "A disk-backed event spool means a dropped network delays delivery instead of losing the event. The truck does not need the cloud to stay safe.",
    tone: "mint" as const,
    tag: "Implemented",
  },
  {
    id: "camera-half",
    title: "Nobody else has the camera half",
    body: "The planned relay handshake verifies the driver's face on the Axon and the signed QR offline: the face proves identity, the QR proves authorisation, and the cloud stays out of the critical path.",
    tone: "violet" as const,
    tag: "Design",
  },
];

const todayFacts = [
  "One pilot truck, AGR-006, running the edge agent in a development fleet environment.",
  "Software installed and updated only through AWS IoT Jobs — no engineer has to SSH into a vehicle.",
  "No production environment yet, and no fleet paying to run on the platform.",
  "No customer outcomes, case studies, or validated safety or savings numbers. We have none, so we claim none.",
  "The relay system exists as a design, a scheduler, and a working demo — not as a live network moving freight.",
];

const nextFacts = [
  "A production environment and onboarding for the first operator fleets.",
  "Expansion beyond the single pilot vehicle to a multi-truck deployment.",
  "Fleet analytics built on the telemetry already being collected and queried.",
  "Relay network build-out: relay points, driver pools, and an immutable custody ledger.",
  "Edge-verified handoff — QR authorisation plus in-cab face verification, working offline.",
];

export default function InvestorsPage() {
  return (
    <main id="main">
      <section
        aria-labelledby="investors-hero-title"
        className="investors-hero"
        id="top"
      >
        <div className="investors-hero__row">
          <span className="section-kicker">
            Investors · DevNullX Technology
          </span>
          <StatusPill tone="quiet">Development environment</StatusPill>
        </div>

        <h1 id="investors-hero-title">
          Not a slide deck &mdash;{" "}
          <span>deployed and metering real traffic.</span>
        </h1>

        <p className="investors-hero__lede">
          DevNullX builds edge safety and relay logistics for Indian heavy
          trucking. The platform is built and running in a development fleet
          environment: an in-cab agent on a pilot truck, a cloud control plane
          behind it, and AWS meters keeping an honest score of both.
        </p>

        <div className="investors-hero__actions">
          <a
            className="button button--primary"
            href="mailto:contact@devnullx.com?subject=DevNullX%20data%20room"
          >
            Request the data room
            <ArrowRight aria-hidden size={16} strokeWidth={1.8} />
          </a>
          <a className="button button--secondary" href="#measured">
            See the measured wall
          </a>
        </div>

        <p className="investors-hero__meta">
          <span>AGR-006 pilot truck</span>
          <span>ap-south-1 Mumbai</span>
          <span>Two service planes</span>
          <span>No production fleet yet</span>
        </p>
      </section>

      <section
        aria-labelledby="investors-market-title"
        className="investors-section"
        id="why-now"
      >
        <Reveal className="investors-head">
          <div>
            <span className="section-kicker">Why now</span>
            <h2 id="investors-market-title">
              The cost of moving things in India{" "}
              <span>is a tax nobody itemises.</span>
            </h2>
          </div>
          <div className="investors-head__aside">
            <p>
              Freight in India is expensive, opaque, and dangerous in ways that
              can be measured. Two of those three can be attacked from inside
              the cab, which is where we started.
            </p>
          </div>
        </Reveal>

        <div className="investors-market__grid">
          {marketCards.map((card, index) => (
            <Reveal
              className="investors-market__card"
              delay={index * 70}
              key={card.id}
            >
              <strong>{card.figure}</strong>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="investors-note investors-note--spaced">
          Market context uses publicly cited industry figures. Nothing in this
          section is a DevNullX measurement or a DevNullX result.
        </p>
      </section>

      <section
        aria-labelledby="investors-measured-title"
        className="investors-section"
        id="measured"
      >
        <Reveal className="investors-head">
          <div>
            <span className="section-kicker">Measured, not projected</span>
            <h2 id="investors-measured-title">
              Every number here is a reading.{" "}
              <span>None of them is a forecast.</span>
            </h2>
          </div>
          <div className="investors-head__aside">
            <span className="investors-provenance">
              <i aria-hidden />
              AWS-metered · development environment · Jul 2026
            </span>
            <p>
              These come from billing meters, test runs, and one pilot truck. If
              a number could not be read off a system, it is not on this wall.
            </p>
          </div>
        </Reveal>

        <MeasuredWall />

        <p className="investors-note investors-note--spaced">
          Engineering and infrastructure measurements from our own development
          environment. They are not customer outcomes, not validated safety or
          savings claims, and not evidence of a production deployment.
        </p>
      </section>

      <section
        aria-labelledby="investors-thesis-title"
        className="investors-section"
        id="thesis"
      >
        <Reveal className="investors-head">
          <div>
            <span className="section-kicker">The compounding thesis</span>
            <h2 id="investors-thesis-title">
              Safety earns trust. Trust enables the handoff.{" "}
              <span>The handoff compounds into a network.</span>
            </h2>
          </div>
          <div className="investors-head__aside">
            <p>
              Each stage is worth something on its own, and each one makes the
              next stage possible. The first three are built. The fourth is why
              they were built.
            </p>
          </div>
        </Reveal>

        <div className="investors-chain">
          {chainSteps.map((step, index) => (
            <Reveal
              className="investors-chain__step"
              delay={index * 80}
              key={step.id}
            >
              <span className="investors-chain__index">{step.index}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <StatusPill tone={step.tone}>{step.tag}</StatusPill>
            </Reveal>
          ))}
        </div>

        <blockquote className="investors-quote">
          &ldquo;Relay reduces fatigue; IDSS monitors the fatigue that
          remains.&rdquo;
          <footer>DevNullX operating principle</footer>
        </blockquote>
      </section>

      <section
        aria-label="Fleet operations imagery"
        className="investors-band"
        id="operations-band"
      >
        <div className="investors-band__frame">
          {/* biome-ignore lint/performance/noImgElement: vinext's image optimizer requires an unavailable worker ASSETS binding; this pre-optimized WebP is served directly. */}
          <img
            alt="Dark fleet operations room with map, telemetry, and camera displays"
            decoding="async"
            height="900"
            loading="lazy"
            src="/generated/control-room.webp"
            width="1600"
          />
          <span aria-hidden className="investors-band__overlay" />
          <div className="investors-band__copy">
            <p>
              The operating picture we are building toward: one fleet, one
              evidence trail, one place to act.
            </p>
            <span className="investors-note">
              Illustrative rendering. Not a photograph of a DevNullX facility or
              a customer operation.
            </span>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="investors-economics-title"
        className="investors-section"
        id="economics"
      >
        <Reveal className="investors-head">
          <div>
            <span className="section-kicker">Unit economics by design</span>
            <h2 id="investors-economics-title">
              Free at rest. <span>By design.</span>
            </h2>
          </div>
          <div className="investors-head__aside">
            <p>
              Cost starts when a device publishes or a dashboard runs a query.
              An idle fleet, a paused pilot, or a quiet month costs us close to
              nothing — which is what makes a per-truck price defensible.
            </p>
          </div>
        </Reveal>

        <div className="investors-econ__grid">
          {economics.map((item, index) => (
            <Reveal
              className="investors-econ__card"
              delay={index * 70}
              key={item.id}
            >
              <StatusPill tone={item.tone}>{item.tag}</StatusPill>
              <strong>{item.figure}</strong>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="investors-note investors-note--spaced">
          Idle cost and the batching reduction are metered. Fleet-scale figures
          are models built on those metered unit rates — they describe
          infrastructure cost only, and say nothing about revenue, margin, or
          demand.
        </p>
      </section>

      <section
        aria-labelledby="investors-standards-title"
        className="investors-section"
        id="standards"
      >
        <Reveal className="investors-head">
          <div>
            <span className="section-kicker">
              Standards &amp; defensibility
            </span>
            <h2 id="investors-standards-title">
              The hard parts are the ones{" "}
              <span>with standards attached.</span>
            </h2>
          </div>
          <div className="investors-head__aside">
            <p>
              Taxonomies, emission standards, residency, and offline behaviour
              are slow to build and awkward to copy. Each line below carries a
              label for how far along it actually is.
            </p>
          </div>
        </Reveal>

        <div className="investors-standards__list">
          {standards.map((standard, index) => (
            <Reveal
              className="investors-standard"
              delay={index * 50}
              key={standard.id}
            >
              <h3>{standard.title}</h3>
              <p>{standard.body}</p>
              <StatusPill tone={standard.tone}>{standard.tag}</StatusPill>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="investors-boundary-title"
        className="investors-section"
        id="boundary"
      >
        <Reveal className="investors-head">
          <div>
            <span className="section-kicker">Where we honestly are</span>
            <h2 id="investors-boundary-title">
              A development pilot on one truck.{" "}
              <span>Stated plainly, on purpose.</span>
            </h2>
          </div>
          <div className="investors-head__aside">
            <p>
              An investor page that hides its boundary is asking you to find it
              later. Here it is now: what is true today, and what we are
              building next.
            </p>
          </div>
        </Reveal>

        <div className="investors-ledger">
          <Reveal className="investors-column">
            <div className="investors-column__header">
              <StatusPill
                icon={<Check aria-hidden size={11} strokeWidth={2} />}
                tone="mint"
              >
                True today
              </StatusPill>
              <span className="investors-column__meta">
                Development environment
              </span>
            </div>
            <ul className="investors-list">
              {todayFacts.map((fact) => (
                <li key={fact}>
                  <span aria-hidden>
                    <Check size={13} />
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            className="investors-column investors-column--next"
            delay={90}
          >
            <div className="investors-column__header">
              <StatusPill
                icon={<FlaskConical aria-hidden size={11} strokeWidth={2} />}
                tone="violet"
              >
                What&apos;s next
              </StatusPill>
              <span className="investors-column__meta">
                Direction, not a released claim
              </span>
            </div>
            <ul className="investors-list">
              {nextFacts.map((fact) => (
                <li key={fact}>
                  <span aria-hidden>
                    <ArrowUpRight size={13} />
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <SupportedBy />

      <section
        aria-labelledby="investors-contact-title"
        className="investors-contact"
        id="contact"
      >
        <div>
          <span className="section-kicker">Diligence</span>
          <h2 id="investors-contact-title">Request the data room.</h2>
        </div>

        <div className="investors-contact__action">
          <p>
            The architecture documents, the cost workings, the internal
            financial model, and the full pilot detail are available on request.
            Active pilot conversations are underway across defence, energy, and
            FMCG logistics; we do not publish counterparty names.
          </p>
          <div className="investors-contact__buttons">
            <a
              className="button button--light"
              href="mailto:contact@devnullx.com?subject=DevNullX%20data%20room"
            >
              Request the data room
              <ArrowRight aria-hidden size={16} strokeWidth={1.8} />
            </a>
            <a
              className="button button--outline"
              href="mailto:contact@devnullx.com?subject=DevNullX%20pilot%20conversation"
            >
              <Mail aria-hidden size={15} strokeWidth={1.8} />
              Start a pilot conversation
            </a>
          </div>
        </div>

        <p className="investors-contact__meta">
          contact@devnullx.com · DevNullX Technology · Remote (India) · ap-south-1
          Mumbai
        </p>
      </section>
    </main>
  );
}
