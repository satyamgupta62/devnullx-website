import { ArrowRight, ArrowUpRight, Package, Truck, UserRound, Users } from "lucide-react";
import Link from "next/link";
import "./company.css";
import { Reveal } from "./reveal";

export const metadata = {
  title: "Company — DevNullX",
  description:
    "DevNullX exists to make logistics radically cheaper and more transparent by democratizing data across India's road freight network.",
};

const segments = [
  {
    id: "fleet-owners",
    label: "Fleet owners",
    icon: Truck,
    lede: "Running capital-heavy assets on thin, unpredictable margins.",
    pains: [
      "Cash-flow unpredictability",
      "Fuel theft",
      "Low utilization",
      "Maintenance surprises",
    ],
  },
  {
    id: "small-operators",
    label: "Small operators",
    icon: Users,
    lede: "One to five trucks, no back office, no leverage.",
    pains: [
      "Broker dependency",
      "Fragmented payments",
      "No credit access",
      "Compliance burden",
    ],
  },
  {
    id: "drivers",
    label: "Drivers",
    icon: UserRound,
    lede: "The people who carry the risk and hold the least proof.",
    pains: [
      "Irregular wages",
      "Fuel-theft accusations without proof",
      "No amenities on the road",
      "Fatigue and safety risk",
    ],
  },
  {
    id: "shippers",
    label: "Shippers",
    icon: Package,
    lede: "Paying for freight they cannot see and cannot verify.",
    pains: [
      "No visibility",
      "Unreliable ETAs",
      "Hidden costs",
      "Settlement disputes",
    ],
  },
];

const principles = [
  {
    id: "evidence",
    index: "01",
    title: "Evidence before promise",
    body: "Demonstrate working mechanisms, and label development or illustrative material honestly.",
  },
  {
    id: "edge",
    index: "02",
    title: "Edge reliability first",
    body: "Safety detection and evidence capture stay useful under real truck and connectivity constraints.",
  },
  {
    id: "one-story",
    index: "03",
    title: "One operational story",
    body: "Vehicle safety, fleet visibility, driver workflows, and relay handoffs are one system, not unrelated products.",
  },
  {
    id: "india",
    index: "04",
    title: "Built for Indian logistics",
    body: "Decisions reflect HCV operations, drivers, small operators, fleet teams, and the realities of long-haul routes.",
  },
  {
    id: "ambition",
    index: "05",
    title: "Ambition without fabrication",
    body: "State the relay-network vision boldly while keeping current capability, targets, and roadmap clearly separated.",
  },
];

const ladder = [
  {
    id: "today",
    marker: "Today",
    value: "1 truck",
    note: "AGR-006, one development-environment pilot vehicle with the edge agent installed over the air.",
  },
  {
    id: "near",
    marker: "Ambition",
    value: "100 vehicles",
    note: "The first corridor operating as a relay network rather than a set of individual trips.",
  },
  {
    id: "far",
    marker: "Ambition",
    value: "10,000+",
    note: "A national relay fabric inside an addressable base of roughly 100,000 trucks.",
  },
];

export default function CompanyPage() {
  return (
    <main className="company-page" id="main">
      <section
        aria-labelledby="companyp-mission-title"
        className="companyp-hero"
      >
        <div aria-hidden className="companyp-hero__media">
          {/* biome-ignore lint/performance/noImgElement: vinext's image optimizer requires an unavailable worker ASSETS binding; this pre-optimized WebP is served directly. */}
          <img
            alt=""
            decoding="async"
            height="936"
            loading="lazy"
            src="/generated/hero-highway.webp"
            width="1664"
          />
        </div>

        <div className="companyp-hero__inner">
          <span className="section-kicker">DevNullX · Company</span>
          <h1 className="companyp-hero__statement" id="companyp-mission-title">
            To make logistics radically cheaper and more transparent by
            democratizing data
            <span className="companyp-hero__tail">
              {" "}
              — enabling every player in the supply chain to access, share, and
              pool tools, insights, and infrastructure.
            </span>
          </h1>
          <dl className="companyp-hero__meta">
            <div>
              <dt>Company</dt>
              <dd>DevNullX Technology · Remote (India)</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>Aghrahan edge · IDSS safety · Raahi driver app</dd>
            </div>
            <div>
              <dt>Stage</dt>
              <dd>Development-environment pilot · AGR-006</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="companyp-problem-title"
        className="companyp-section companyp-problem"
        id="problem"
      >
        <Reveal className="companyp-problem__copy">
          <span className="section-kicker">The problem</span>
          <h2 id="companyp-problem-title">
            India pays a freight tax on everything it makes.
          </h2>
          <p className="companyp-quote">
            “In India, we quietly spend nearly 12% of a product&apos;s total
            price just on moving it from one place to another… almost double
            what countries like the US or China spend.”
          </p>
          <p className="companyp-body">
            Too much paperwork, too many middlemen, too little clarity. Indian
            trucking&apos;s bureaucratic maze leads to delayed payments, fuel
            disputes, and unfair outcomes.
          </p>
        </Reveal>

        <Reveal className="companyp-figure" delay={90}>
          <div className="companyp-figure__head">
            <span>Logistics cost as a share of product price</span>
          </div>

          <div className="companyp-figure__row companyp-figure__row--india">
            <span className="companyp-figure__value">
              12<i>%</i>
            </span>
            <span className="companyp-figure__place">India</span>
            <span aria-hidden className="companyp-bar">
              <i style={{ width: "100%" }} />
            </span>
          </div>

          <div className="companyp-figure__row">
            <span className="companyp-figure__value companyp-figure__value--quiet">
              6–7<i>%</i>
            </span>
            <span className="companyp-figure__place">US · China</span>
            <span aria-hidden className="companyp-bar companyp-bar--quiet">
              <i style={{ width: "54%" }} />
            </span>
          </div>

          <p className="companyp-figure__note">
            Industry framing carried from our founding thesis. It is not a
            DevNullX measurement.
          </p>
        </Reveal>
      </section>

      <section
        aria-labelledby="companyp-record-title"
        className="companyp-section companyp-record"
        id="mission"
      >
        <div className="companyp-record__head">
          <span className="section-kicker">Stated commitments</span>
          <h2 id="companyp-record-title">
            Two sentences govern what we build.
          </h2>
        </div>

        <div className="companyp-record__grid">
          <Reveal as="blockquote" className="companyp-card companyp-card--mission">
            <span className="companyp-card__label">Mission</span>
            <p>
              To make logistics radically cheaper and more transparent by
              democratizing data — enabling every player in the supply chain to
              access, share, and pool tools, insights, and infrastructure.
            </p>
          </Reveal>

          <Reveal
            as="blockquote"
            className="companyp-card companyp-card--vision"
            delay={90}
          >
            <span className="companyp-card__label">Vision</span>
            <p>
              We envision a logistics ecosystem where data isn&apos;t locked
              behind silos, where AI-driven collaboration reduces costs, boosts
              uptime, and makes efficiency a shared outcome — not a competitive
              secret.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="companyp-serve-title"
        className="companyp-section companyp-serve"
        id="who-we-serve"
      >
        <div className="companyp-section__head">
          <span className="section-kicker">Who we serve</span>
          <h2 id="companyp-serve-title">
            Four groups. <span>One broken flow of information.</span>
          </h2>
          <p className="companyp-body">
            The same missing data hurts each of them differently. That is why
            the platform is built as one operational record rather than four
            disconnected tools.
          </p>
        </div>

        <ul className="companyp-serve__grid">
          {segments.map((segment, index) => (
            <Reveal
              as="li"
              className="companyp-segment"
              delay={index * 70}
              key={segment.id}
            >
              <segment.icon aria-hidden size={18} />
              <h3>{segment.label}</h3>
              <p>{segment.lede}</p>
              <ul>
                {segment.pains.map((pain) => (
                  <li key={pain}>{pain}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="companyp-principles-title"
        className="companyp-section companyp-principles"
        id="how-we-work"
      >
        <div className="companyp-section__head">
          <span className="section-kicker">How we work</span>
          <h2 id="companyp-principles-title">
            Five principles, <span>applied before anything ships.</span>
          </h2>
        </div>

        <ol className="companyp-principles__list">
          {principles.map((principle, index) => (
            <Reveal
              as="li"
              className="companyp-principle"
              delay={index * 60}
              key={principle.id}
            >
              <span className="companyp-principle__index">
                {principle.index}
              </span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="companyp-ambition-title"
        className="companyp-section companyp-ambition"
        id="ambition"
      >
        <div className="companyp-ambition__head">
          <span className="section-kicker">The ambition</span>
          <h2 id="companyp-ambition-title">
            The operating system for Indian relay logistics.
          </h2>
          <p className="companyp-body">
            The scale below is direction, not delivery. Today DevNullX runs a
            development-environment pilot on a single truck; everything beyond
            it is roadmap we intend to earn.
          </p>
          <span className="status-pill status-pill--violet">
            Ambition · roadmap · not achieved
          </span>
        </div>

        <ol className="companyp-ladder">
          {ladder.map((step, index) => (
            <Reveal
              as="li"
              className={`companyp-ladder__step companyp-ladder__step--${step.id}`}
              delay={index * 80}
              key={step.id}
            >
              <span className="companyp-ladder__marker">{step.marker}</span>
              <strong>{step.value}</strong>
              <p>{step.note}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="companyp-closing">
          <p>
            Clarity replaces confusion, trust replaces disputes, efficiency
            becomes the norm — not the exception.
          </p>
        </Reveal>
      </section>

      <section
        aria-labelledby="companyp-cta-title"
        className="companyp-section companyp-cta"
        id="next"
      >
        <div>
          <span className="section-kicker">Next</span>
          <h2 id="companyp-cta-title">See it, or help build it.</h2>
        </div>
        <div className="companyp-cta__actions">
          <Link className="button button--primary" href="/platform">
            See the working system
            <ArrowRight aria-hidden size={16} />
          </Link>
          <Link className="button button--secondary" href="/careers">
            Build it with us
            <ArrowUpRight aria-hidden size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
