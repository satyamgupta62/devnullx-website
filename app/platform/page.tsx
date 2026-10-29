import "./platform.css";

import {
  ArrowRight,
  Camera,
  Check,
  Cloud,
  Cpu,
  Database,
  Gauge,
  HardDrive,
  Lock,
  MapPin,
  Quote,
  Radio,
  Route,
  Satellite,
  ScanEye,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { StatusPill } from "../components/status-pill";
import { IrEvidence } from "./ir-evidence";
import { Reveal } from "./reveal";

export const metadata: Metadata = {
  title: "Platform — DevNullX",
  description:
    "How Aghrahan works: the Axon edge agent, the Euro NCAP driver-state taxonomy running on-device, the edge-to-cloud evidence chain, hardware, fleet lifecycle, and cost architecture.",
};

const surfaces = [
  {
    icon: Cpu,
    name: "Axon edge agent",
    detail:
      "In-cab inference, event capture, and the disk-backed spool that survives dead zones.",
  },
  {
    icon: Gauge,
    name: "Operations console",
    detail:
      "A 22-page web workspace for review queues, device health, telemetry, and journeys.",
  },
  {
    icon: Radio,
    name: "Raahi driver app",
    detail:
      "The driver's own view: assigned truck, live camera, trip context, documents.",
  },
] as const;

const detections = [
  {
    className: "microsleep",
    label: "Microsleep",
    detail:
      "A brief involuntary eye-closure lapse while the vehicle is moving.",
    level: "Critical",
    tone: "coral",
  },
  {
    className: "sleep",
    label: "Sleep",
    detail:
      "Sustained closure consistent with the driver actually falling asleep.",
    level: "Critical",
    tone: "coral",
  },
  {
    className: "unresponsive",
    label: "Unresponsive",
    detail:
      "The driver stops responding to the escalating in-cab alert ladder.",
    level: "Critical",
    tone: "coral",
  },
  {
    className: "vats_long_distraction",
    label: "VATS long distraction",
    detail:
      "Cumulative eyes-off-road of 10s or more inside a rolling 30s window.",
    level: "Alert",
    tone: "cyan",
  },
  {
    className: "long_distraction",
    label: "Long distraction",
    detail: "A single continuous glance away from the road of 3s or more.",
    level: "Alert",
    tone: "cyan",
  },
  {
    className: "camera_blocked",
    label: "Camera blocked or tampered",
    detail:
      "Lens covered, obstructed, or moved — a statistics-only check that stays night-safe.",
    level: "Warning",
    tone: "quiet",
  },
] as const;

const detectionFacts = [
  {
    term: "Fusion",
    value: "Pose-normalized EAR + head-nod + yawn",
  },
  {
    term: "Calibration",
    value: "Per-driver baselines",
  },
  {
    term: "Alert latency",
    value: "Sub-150ms",
  },
  {
    term: "Escalation",
    value: "WARNING → ALERT → CRITICAL",
  },
  {
    term: "Connectivity",
    value: "Detects and alerts offline",
  },
] as const;

const chain = [
  {
    step: "01",
    tag: "ON-EDGE INFERENCE",
    title: "The decision is made in the cab.",
    detail:
      "Driver-state detection runs on the Axon itself. No frame has to reach a server for the driver to be warned, so the alert does not depend on a mobile signal.",
    icon: ScanEye,
  },
  {
    step: "02",
    tag: "LIVE VIDEO · KVS",
    title: "Live view goes to Kinesis Video Streams.",
    detail:
      "Operators can open the cab feed on demand. The stream is separate from the evidence path, so a lost live view never costs an event.",
    icon: Camera,
  },
  {
    step: "03",
    tag: "SEALED EVIDENCE · S3",
    title: "Event and clip are sealed together in S3.",
    detail:
      "The clip and the event row are joined through S3 object metadata — never by parsing filenames. Filename parsing broke this join twice, so the contract moved into metadata.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    tag: "TELEMETRY · MQTT",
    title: "CAN, OBD, and GPS publish at 1 Hz.",
    detail:
      "The CAN bus runs at 500 kbps and GPS samples at 10 Hz on the device; both are reduced to a 1 Hz MQTT publish so a truck costs bandwidth, not a fortune.",
    icon: Satellite,
  },
  {
    step: "05",
    tag: "IOT RULES",
    title: "Rules route each topic to its consumer.",
    detail:
      "AWS IoT rules fan messages out to the API, the archive, and the stream processors without a broker of our own to operate.",
    icon: Route,
  },
  {
    step: "06",
    tag: "BRONZE / SILVER",
    title: "Telemetry lands as Parquet, queryable in Athena.",
    detail:
      "Raw messages are archived to a Bronze layer, normalized into Silver, and read with SQL. More than 50 GB of development telemetry is queryable today.",
    icon: Database,
  },
  {
    step: "07",
    tag: "SURFACES",
    title: "Console and driver app read the same record.",
    detail:
      "The operator's review queue and the driver's app resolve to one event and one vehicle state — there is no second copy of the truth to reconcile.",
    icon: Gauge,
  },
  {
    step: "08",
    tag: "FLEET LIFECYCLE",
    title: "Provisioning, OTA, and diagnostics close the loop.",
    detail:
      "Fleet Provisioning issues identity, IoT Jobs deliver software, and Secure Tunneling opens a diagnostic shell only when one is requested.",
    icon: Cloud,
  },
] as const;

const discipline = [
  {
    icon: HardDrive,
    title: "The spool is on disk, not in memory.",
    detail:
      "Every event is written to a disk-backed spool before anything is sent. A record is deleted only after a QoS-1 PUBACK comes back from the broker — so a dead zone delays evidence, it does not destroy it.",
    marker: "Zero event loss offline",
  },
  {
    icon: Lock,
    title: "Clips join by object metadata, never filenames.",
    detail:
      "The clip↔event association is carried in S3 object metadata. Two regex changes to a filename convention once orphaned 211 clips; that class of failure is now structurally impossible.",
    marker: "Metadata contract",
  },
  {
    icon: MapPin,
    title: "Context is recorded, not reconstructed.",
    detail:
      "Each event carries a 10s-before / 5s-after window of speed, RPM, and GPS. Where a sensor had no reading, the field is null. Nothing in that window is interpolated, smoothed, or invented.",
    marker: "Never fabricated — nulls for gaps",
  },
] as const;

const hardware = [
  { term: "Device", value: "Vicharak Axon", note: "Indian-made" },
  { term: "SoC", value: "Rockchip RK3588", note: "8-core ARM" },
  { term: "NPU", value: "6 TOPS", note: "On-device inference" },
  { term: "Memory", value: "8 GB RAM", note: "Dual camera capable" },
  { term: "Inference", value: "20+ FPS", note: "Sustained" },
  { term: "Alert latency", value: "<150 ms", note: "Detection to in-cab alert" },
  { term: "GPS", value: "<2.5 m @ 10 Hz", note: "Downsampled to 1 Hz uplink" },
  { term: "Vehicle bus", value: "40+ OBD PIDs", note: "BS4 and BS6" },
  { term: "Operating range", value: "−40 to +85 °C", note: "Cabin-mounted" },
  { term: "Data footprint", value: "~42 MB", note: "Per truck per day" },
] as const;

const lifecycle = [
  {
    icon: ShieldCheck,
    title: "Zero-touch provisioning",
    detail:
      "A device earns its identity from a hardware fingerprint and AWS IoT Fleet Provisioning. Nobody types a certificate into a truck.",
  },
  {
    icon: Cloud,
    title: "OTA through IoT Jobs",
    detail:
      "Software reaches the pilot truck as an IoT Job — measured at roughly 31 seconds end to end, health-checked on arrival, and rolled back automatically if the check fails.",
  },
  {
    icon: Terminal,
    title: "Diagnostics without SSH",
    detail:
      "Remote shells run over AWS IoT Secure Tunneling, opened per session. There is no SSH daemon listening on a production device.",
  },
] as const;

const costs = [
  { value: "<$1", unit: "per month", note: "Fleet parked and idle" },
  { value: "~$328", unit: "per month", note: "Modelled at 50 trucks, 24/7" },
  { value: "26×", unit: "reduction", note: "IoT cost cut by message batching" },
] as const;

export default function PlatformPage() {
  return (
    <main className="platform-page" id="main">
      <section className="platform-hero" aria-labelledby="platform-title">
        <div className="platform-hero__copy">
          <span className="section-kicker">Platform · Aghrahan</span>
          <h1 id="platform-title">
            One system from the cab to the control room{" "}
            <span>to the relay point.</span>
          </h1>
          <p className="platform-hero__summary">
            Aghrahan is three surfaces over one record: the{" "}
            <strong>Axon edge agent</strong> that watches the driver and the
            vehicle, the <strong>operations console</strong> where an event is
            reviewed, and <strong>Raahi</strong>, the driver app in the cab.
            What follows is how it actually works.
          </p>
          <div className="platform-hero__pills">
            <StatusPill tone="coral">Development pilot · AGR-006</StatusPill>
            <StatusPill tone="cyan">AWS ap-south-1 · Mumbai</StatusPill>
          </div>
        </div>

        <figure className="platform-frame platform-hero__frame">
          <div className="platform-frame__toolbar">
            <span>
              <i />
              AXON · IN-CAB MOUNT
            </span>
            <span>DEVICE LOCK · LIVE</span>
          </div>
          <div className="platform-frame__image platform-frame__image--wide">
            {/* biome-ignore lint/performance/noImgElement: vinext's image optimizer requires an unavailable worker ASSETS binding; this pre-optimized WebP is served directly. */}
            <img
              alt="Rugged black edge-AI device mounted behind a truck windshield at dusk"
              decoding="async"
              fetchPriority="high"
              height="936"
              src="/generated/axon-device-cabin.webp"
              width="1664"
            />
            <span className="platform-frame__corner platform-frame__corner--tl" />
            <span className="platform-frame__corner platform-frame__corner--tr" />
            <span className="platform-frame__corner platform-frame__corner--bl" />
            <span className="platform-frame__corner platform-frame__corner--br" />
            <span
              className="platform-frame__box platform-frame__box--device"
              style={{ left: "32.5%", top: "29%", width: "25%", height: "33%" }}
            >
              <small>AXON · MOUNTED</small>
            </span>
          </div>
          <figcaption>
            <span>
              <Camera aria-hidden size={12} />
              Axon hardware
            </span>
            <strong>
              <ScanEye aria-hidden size={12} />
              Edge agent v1.6.6
            </strong>
          </figcaption>
        </figure>

        <ul className="platform-hero__surfaces">
          {surfaces.map((surface) => (
            <li key={surface.name}>
              <surface.icon aria-hidden size={16} strokeWidth={1.7} />
              <strong>{surface.name}</strong>
              <p>{surface.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="platform-section" id="edge" aria-labelledby="edge-title">
        <header className="platform-section__intro">
          <div>
            <span className="section-kicker">Edge intelligence</span>
            <h2 id="edge-title">
              The driver-state taxonomy runs on the device.{" "}
              <span>Not in a datacentre.</span>
            </h2>
          </div>
          <p>
            Aghrahan implements the Euro NCAP driver-state monitoring taxonomy
            end to end on the Axon. Each detection is a named class with its own
            evidence, not a single blended &ldquo;drowsiness score&rdquo;.
          </p>
        </header>

        <Reveal>
          <div className="platform-taxonomy">
            <table>
              <caption className="sr-only">
                Euro NCAP driver-state detection classes implemented on the Axon
                edge agent
              </caption>
              <thead>
                <tr>
                  <th scope="col">Detection</th>
                  <th scope="col">What it means</th>
                  <th scope="col">Class</th>
                  <th scope="col">Level</th>
                </tr>
              </thead>
              <tbody>
                {detections.map((detection) => (
                  <tr key={detection.className}>
                    <th scope="row">{detection.label}</th>
                    <td>{detection.detail}</td>
                    <td>
                      <code>{detection.className}</code>
                    </td>
                    <td>
                      <StatusPill tone={detection.tone}>
                        {detection.level}
                      </StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal>
          <dl className="platform-facts">
            {detectionFacts.map((fact) => (
              <div key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <div className="platform-quote">
            <Quote aria-hidden size={18} />
            <blockquote>
              <p>
                The classical face-tracker → PERCLOS drowsiness pipeline is at
                parity with commercial DMS vendors — it is not a toy.
              </p>
            </blockquote>
            <footer>
              <span>Internal engineering assessment</span>
              <strong>No heuristic fakes shipped.</strong>
              <small>
                The gaps are named on purpose: there is no NIR sensor and no
                true gaze estimation yet. Neither is faked with a heuristic to
                make a demo look complete.
              </small>
            </footer>
          </div>
        </Reveal>
      </section>

      <section
        className="platform-section platform-section--evidence"
        id="frames"
        aria-labelledby="frames-title"
      >
        <header className="platform-section__intro">
          <div>
            <span className="section-kicker">Evidence frames</span>
            <h2 id="frames-title">
              Eye state is the signal. <span>Everything else is context.</span>
            </h2>
          </div>
          <p>
            Two infrared frames of the same cab, the same driver, and the same
            camera — one alert, one mid-event. Illustrative frames rendered for
            this page, not customer footage.
          </p>
        </header>

        <Reveal>
          <IrEvidence />
        </Reveal>

        <p className="platform-note">
          <ShieldCheck aria-hidden size={15} />
          Illustrative DMS frames. Landmark boxes and eye-aspect-ratio readouts
          demonstrate the analysis the edge agent performs; they are not
          measurements from a customer vehicle.
        </p>
      </section>

      <section className="platform-section" id="chain" aria-labelledby="chain-title">
        <header className="platform-section__intro">
          <div>
            <span className="section-kicker">Edge to cloud</span>
            <h2 id="chain-title">
              Eight steps from a closed eye <span>to a queryable record.</span>
            </h2>
          </div>
          <p>
            The chain is deliberately boring. Every hop is a managed AWS service
            with a defined failure mode, and every hop keeps the event and its
            evidence attached to each other.
          </p>
        </header>

        <ol className="platform-chain">
          {chain.map((link, index) => (
            <Reveal
              as="li"
              className="platform-chain__step"
              delay={index * 0.05}
              key={link.step}
            >
              <span className="platform-chain__index" aria-hidden>
                {link.step}
              </span>
              <span className="platform-chain__icon" aria-hidden>
                <link.icon size={15} strokeWidth={1.7} />
              </span>
              <div className="platform-chain__body">
                <span className="platform-chain__tag">{link.tag}</span>
                <strong>{link.title}</strong>
                <p>{link.detail}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section
        className="platform-section"
        id="discipline"
        aria-labelledby="discipline-title"
      >
        <header className="platform-section__intro">
          <div>
            <span className="section-kicker">Evidence discipline</span>
            <h2 id="discipline-title">
              An alert nobody can verify <span>is just an opinion.</span>
            </h2>
          </div>
          <p>
            Three rules protect the record. They exist because each one was
            learned the expensive way in the development fleet.
          </p>
        </header>

        <div className="platform-discipline">
          {discipline.map((rule, index) => (
            <Reveal delay={index * 0.05} key={rule.title}>
              <article className="platform-card">
                <rule.icon aria-hidden size={17} strokeWidth={1.6} />
                <strong>{rule.title}</strong>
                <p>{rule.detail}</p>
                <span className="platform-card__marker">
                  <Check aria-hidden size={12} />
                  {rule.marker}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="platform-section"
        id="hardware"
        aria-labelledby="hardware-title"
      >
        <header className="platform-section__intro">
          <div>
            <span className="section-kicker">Hardware</span>
            <h2 id="hardware-title">
              Built on an Indian-made edge computer.{" "}
              <span>Rated for an Indian cab.</span>
            </h2>
          </div>
          <p>
            The Axon is a Rockchip RK3588 board from Vicharak. It runs the
            models, the spool, the telemetry reader, and the cockpit display on
            one device, bare-metal — no container runtime in the truck.
          </p>
        </header>

        <Reveal>
          <dl className="platform-specs">
            {hardware.map((spec) => (
              <div key={spec.term}>
                <dt>{spec.term}</dt>
                <dd>{spec.value}</dd>
                <small>{spec.note}</small>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section
        className="platform-section"
        id="lifecycle"
        aria-labelledby="lifecycle-title"
      >
        <header className="platform-section__intro">
          <div>
            <span className="section-kicker">Fleet lifecycle</span>
            <h2 id="lifecycle-title">
              A truck is not a laptop. <span>You cannot drive to it.</span>
            </h2>
          </div>
          <p>
            Every operation a field engineer would otherwise perform in person
            is a remote, audited, reversible action.
          </p>
        </header>

        <div className="platform-lifecycle">
          {lifecycle.map((item, index) => (
            <Reveal delay={index * 0.05} key={item.title}>
              <article className="platform-card">
                <item.icon aria-hidden size={17} strokeWidth={1.6} />
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="platform-note">
          <Check aria-hidden size={15} />
          Edge agent v1.6.6 reached the pilot truck by IoT Job alone — no
          engineer has connected to that device by SSH.
        </p>
      </section>

      <section className="platform-cost" id="cost" aria-labelledby="cost-title">
        <div className="platform-cost__copy">
          <span className="section-kicker">Cost architecture</span>
          <h2 id="cost-title">
            Free at rest. <span>By design.</span>
          </h2>
          <p>
            Nothing in the platform is an always-on server. Cost begins when a
            device publishes and a dashboard runs a query, and stops when they
            stop — which is what makes a small pilot affordable enough to be
            worth running properly.
          </p>
        </div>
        <dl className="platform-cost__figures">
          {costs.map((cost) => (
            <div key={cost.note}>
              <dt>
                {cost.value} <span>{cost.unit}</span>
              </dt>
              <dd>{cost.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="platform-close" aria-labelledby="close-title">
        <div>
          <span className="section-kicker">Next</span>
          <h2 id="close-title">Safety is the sensor. Relay is the network.</h2>
        </div>
        <div className="platform-close__action">
          <p>
            The same device that watches the driver verifies the handoff at a
            relay point — offline, in under a handful of seconds. That is the
            second half of the system.
          </p>
          <div className="platform-close__buttons">
            <Link className="button button--light" href="/relay">
              The relay network this enables
              <ArrowRight aria-hidden size={16} />
            </Link>
            <Link className="button platform-close__secondary" href="/investors#contact">
              Start a pilot
            </Link>
          </div>
        </div>
        <span className="platform-close__mark" aria-hidden>
          <i />
          <i />
        </span>
      </section>
    </main>
  );
}
