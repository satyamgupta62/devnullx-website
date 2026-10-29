import { ArrowUpRight, Mail, Sparkles, Terminal, Truck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CareersReveal } from "./careers-reveal";
import "./careers.css";

export const metadata: Metadata = {
  title: "Careers — DevNullX",
  description:
    "Engineering roles at DevNullX Technology. Remote (India). Edge AI on Indian-made hardware, an AWS IoT fleet backbone, and a relay logistics network for heavy trucks.",
};

const reasons = [
  {
    body: "Aghrahan runs on real hardware in a real cab. The pilot truck, AGR-006, takes edge releases over the air through AWS IoT Jobs — no SSH, roughly 31 seconds end to end. What you merge is what drives.",
    icon: <Truck aria-hidden size={15} />,
    id: "ship",
    quote: "Your code will run on production trucks within 3 months.",
    tag: "Ship",
  },
  {
    body: "The team is small and the surface is wide: FastAPI services, IoT rules, telemetry pipelines, an operator console. You are the reviewer, the on-call, and the person who decides the schema.",
    icon: <Terminal aria-hidden size={15} />,
    id: "own",
    quote: "You'll own entire services from design to deployment.",
    tag: "Own",
  },
  {
    body: "GitHub Copilot and Claude Code are part of the standard toolchain, not a guilty secret. We care about the judgement behind the diff — what you chose to build, what you refused to fake.",
    icon: <Sparkles aria-hidden size={15} />,
    id: "ai",
    quote: "Yes, we use AI assistants extensively.",
    tag: "AI-native",
  },
] as const;

const platformFacts = [
  "RK3588 · 6 TOPS NPU",
  "Sub-150 ms alert latency",
  "AWS ap-south-1 (Mumbai)",
  "6.08M IoT messages metered · May 2026",
] as const;

const hiringStages = [
  {
    detail: "Read by an engineer, not a filter. Days 1–2.",
    id: "application",
    title: "Application review",
    tone: "cyan",
  },
  {
    detail: "Auto-graded. Real problems, no puzzle trivia.",
    id: "assessment",
    title: "Technical assessment",
    tone: "cyan",
  },
  {
    detail: "Code, systems, and how you reason under constraints.",
    id: "interview-one",
    title: "Technical interview I",
    tone: "cyan",
  },
  {
    detail: "With the founder or tech lead. Architecture and trade-offs.",
    id: "interview-two",
    title: "Technical interview II",
    tone: "cyan",
  },
  {
    detail: "How you work, what you refuse to ship, what you want next.",
    id: "culture",
    title: "Culture conversation",
    tone: "cyan",
  },
  {
    detail: "Compensation, level, and ESOP where it applies.",
    id: "offer",
    title: "Offer",
    tone: "mint",
  },
  {
    detail: "Standard verification, run in parallel with onboarding prep.",
    id: "background",
    title: "Background check",
    tone: "mint",
  },
  {
    detail: "Laptop, AWS access, first service. Week one ships something.",
    id: "onboarding",
    title: "Onboarding",
    tone: "mint",
  },
] as const;

const openRoles = [
  {
    id: "backend-engineer",
    mailto:
      "mailto:careers@devnullx.com?subject=Backend%20Engineer%20application%20%E2%80%94%20DevNullX",
    meta: ["Remote (India)", "Full-time", "₹6–12 LPA", "3–10 years"],
    note: "ESOP at senior levels.",
    responsibilities: [
      "Design and ship FastAPI services on Lambda that carry fleet identity, evidence, and relay state.",
      "Work the AWS IoT surface directly: rules, device shadows, Jobs-based OTA, Kinesis streams.",
      "Own the data model across DynamoDB and PostgreSQL, with Redis where latency earns it.",
      "Keep the truth boundary intact — telemetry gaps stay null, never interpolated.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "AWS IoT Core",
      "Kinesis",
      "Lambda",
    ],
    subtitle: "Python · FastAPI · AWS IoT",
    title: "Backend Engineer",
  },
  {
    id: "devops-engineer",
    mailto:
      "mailto:careers@devnullx.com?subject=DevOps%20Engineer%20contract%20application%20%E2%80%94%20DevNullX",
    meta: ["Remote (India)", "Part-time contract", "~20 hrs/week"],
    note: "Greenfield — you set the conventions.",
    responsibilities: [
      "Bring the AWS footprint under Terraform, module by module, without stopping delivery.",
      "Build CI/CD that releases both the cloud services and the signed edge wheel.",
      "Set up alarms and cost guardrails for a fleet that must stay near-free at rest.",
      "Harden account, certificate, and secret handling across the IoT estate.",
    ],
    stack: ["Terraform", "AWS", "GitHub Actions", "CI/CD", "Observability"],
    subtitle: "Part-time contract",
    title: "DevOps Engineer",
  },
] as const;

const principles = [
  "Pragmatism over perfection.",
  "Shipping over polish.",
  "Learning over planning.",
] as const;

export default function CareersPage() {
  return (
    <main id="main">
      <section aria-labelledby="careers-title" className="careers-hero">
        <div className="careers-hero__head">
          <span className="section-kicker">Careers · Remote (India)</span>
          <span className="careers-hero__stamp">
            DevNullX Technology · Aghrahan platform
          </span>
        </div>

        <CareersReveal className="careers-hero__copy">
          <h1 id="careers-title">
            Every year, truck accidents claim thousands of lives in India.
          </h1>
          <p className="careers-hero__body">
            Drivers fall asleep at the wheel. Cargo disappears without trace.
            Fleet managers operate blind, reacting to problems hours too late.{" "}
            <strong>
              DevNullX is changing this with real-time AI that sees, thinks, and
              prevents.
            </strong>
          </p>
        </CareersReveal>

        <CareersReveal className="careers-hero__foot" delay={0.08}>
          <p className="careers-hero__line">
            <i aria-hidden />
            Real vehicles. Real roads. Real lives.
          </p>
          <div className="careers-hero__actions">
            <a className="button button--primary" href="#roles">
              See open roles
              <ArrowUpRight aria-hidden size={15} />
            </a>
            <a className="button button--secondary" href="#process">
              How we hire
            </a>
          </div>
        </CareersReveal>
      </section>

      <section aria-labelledby="careers-why-title" className="careers-why">
        <header className="careers-why__heading">
          <span className="section-kicker">Why this work matters</span>
          <h2 id="careers-why-title">
            Three months from joining, <span>a truck is running your code.</span>
          </h2>
        </header>

        <div className="careers-why__grid">
          {reasons.map((reason, index) => (
            <CareersReveal
              as="article"
              className="careers-why__card"
              delay={index * 0.06}
              key={reason.id}
            >
              <div className="careers-why__tag">
                {reason.icon}
                {reason.tag}
              </div>
              <h3>{reason.quote}</h3>
              <p>{reason.body}</p>
            </CareersReveal>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="careers-building-title"
        className="careers-building"
      >
        <CareersReveal className="careers-building__copy">
          <span className="section-kicker">What we're building</span>
          <h2 id="careers-building-title">
            A nervous system for trucks, <span>then a network on top of it.</span>
          </h2>
          <p>
            Aghrahan puts edge AI in the cab on Indian-made RK3588 hardware —
            camera-based driver monitoring, Euro NCAP DSM taxonomy, all decided
            on-device — and carries the result over an AWS IoT fleet backbone in
            Mumbai: live video, GPS, CAN and OBD telemetry, sealed event
            evidence, over-the-air releases. On top of that sits the relay
            logistics network we are designing, which decouples the vehicle's
            journey from the driver's so nobody spends a week away from home.
          </p>
          <Link className="careers-building__link" href="/platform">
            See the platform in detail
            <ArrowUpRight aria-hidden size={15} />
          </Link>
        </CareersReveal>

        <CareersReveal className="careers-building__facts" delay={0.08}>
          <ul>
            {platformFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </CareersReveal>
      </section>

      <CareersReveal className="careers-band">
        <figure>
          {/* biome-ignore lint/performance/noImgElement: vinext's image optimizer requires an unavailable worker ASSETS binding; this pre-optimized WebP is served directly. */}
          <img
            alt="Fleet operations room at night with dark telemetry dashboards and map surfaces"
            decoding="async"
            height="900"
            loading="lazy"
            src="/generated/control-room.webp"
            width="1600"
          />
          <figcaption>
            Illustrative · the operator workspace today is a 22-page console
            over a development-environment pilot
          </figcaption>
        </figure>
      </CareersReveal>

      <section
        aria-labelledby="careers-process-title"
        className="careers-process"
        id="process"
      >
        <CareersReveal className="careers-process__heading">
          <span className="section-kicker">How we hire</span>
          <h2 id="careers-process-title">
            Application to offer <span>in 7–10 days.</span>
          </h2>
          <p>
            The India average is 16.1 days. Eight stages, run tight, with a
            human answer at every one of them — including the no.
          </p>
        </CareersReveal>

        <ol className="careers-process__list">
          {hiringStages.map((stage, index) => (
            <CareersReveal
              as="li"
              className={`careers-process__item careers-process__item--${stage.tone}`}
              delay={Math.min(index, 4) * 0.05}
              key={stage.id}
            >
              <span className="careers-process__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{stage.title}</h3>
              <p>{stage.detail}</p>
            </CareersReveal>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="careers-roles-title"
        className="careers-roles"
        id="roles"
      >
        <header className="careers-roles__heading">
          <span className="section-kicker">Open roles</span>
          <h2 id="careers-roles-title">
            Two seats open. <span>Both of them matter.</span>
          </h2>
        </header>

        <div className="careers-roles__grid">
          {openRoles.map((role, index) => (
            <CareersReveal
              as="article"
              className="careers-role"
              delay={index * 0.07}
              key={role.id}
            >
              <div className="careers-role__head">
                <h3>{role.title}</h3>
                <span className="careers-role__subtitle">{role.subtitle}</span>
              </div>

              <ul className="careers-role__meta">
                {role.meta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <ul className="careers-role__list">
                {role.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <ul className="careers-role__stack">
                {role.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="careers-role__foot">
                <a className="button button--primary" href={role.mailto}>
                  <Mail aria-hidden size={15} />
                  Apply for {role.title}
                </a>
                <small>{role.note}</small>
              </div>
            </CareersReveal>
          ))}
        </div>

        <p className="careers-roles__open">
          Don't see your role? Write to us anyway —{" "}
          <a href="mailto:careers@devnullx.com?subject=Introduction%20%E2%80%94%20DevNullX">
            careers@devnullx.com
          </a>
          .
        </p>
      </section>

      <section aria-labelledby="careers-bar-title" className="careers-bar">
        <CareersReveal className="careers-bar__inner">
          <span className="section-kicker">The hiring bar, honestly</span>
          <h2 id="careers-bar-title">
            You don't need to know every technology listed.{" "}
            <span>
              You need to be the kind of engineer who can pick up AWS IoT Core
              documentation on Monday and have working MQTT message routing by
              Friday.
            </span>
          </h2>
          <ul className="careers-bar__principles">
            {principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </CareersReveal>
      </section>
    </main>
  );
}
