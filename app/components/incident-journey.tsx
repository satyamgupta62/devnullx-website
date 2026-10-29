import {
  Camera,
  Check,
  FileCheck2,
  FileVideo,
  Fingerprint,
  MapPin,
  Radio,
  ShieldCheck,
} from "lucide-react";
import { incidentSteps, proofBoundary } from "../content/product";
import { MotionSurface } from "./motion-surface";
import { DriverCameraFrame, PerclosTrace } from "./product-demo";
import { StatusPill } from "./status-pill";

export function IncidentJourney() {
  return (
    <section
      className="incident-section"
      id="safety"
      aria-labelledby="incident-title"
    >
      <header className="section-intro section-intro--incident">
        <div>
          <span className="section-kicker">Incident journey</span>
          <h2 id="incident-title">
            An alert is useful. <span>Evidence makes it actionable.</span>
          </h2>
        </div>
        <div className="section-intro__aside">
          <StatusPill tone="quiet">{proofBoundary.label}</StatusPill>
          <p>
            A composed walkthrough of the event, video, telemetry, and review
            path already represented in the development system.
          </p>
        </div>
      </header>

      <MotionSurface
        replayLabel="Replay incident evidence checks"
        sequence="incident"
      >
        <div className="incident-console">
          <div className="incident-console__bar">
            <div>
              <span className="window-dot window-dot--coral" />
              <span className="window-dot" />
              <span className="window-dot" />
            </div>
            <span>AGR-006 / event review</span>
            <StatusPill
              tone="mint"
              icon={<Radio aria-hidden size={11} strokeWidth={2} />}
            >
              Edge connected
            </StatusPill>
          </div>

          <div className="incident-console__body">
            <div className="incident-media">
              <div className="incident-media__header">
                <span>
                  <Camera aria-hidden size={14} />
                  Driver camera
                </span>
                <time dateTime="10:24:31">10:24:31 IST</time>
              </div>

              <div
                className="incident-camera-analysis"
                role="img"
                aria-label="Driver camera eye-region analysis at 10:24:31"
              >
                <div
                  className="incident-analysis-media"
                  data-motion-phase="media"
                >
                  <DriverCameraFrame
                    label="Driver camera · Frame 0618"
                    view="side"
                  />
                  <div className="incident-analysis-media__facts">
                    <span>
                      <small>MODEL SIGNAL</small>
                      <strong>Drowsiness · High</strong>
                    </span>
                    <span>
                      <small>CONFIDENCE</small>
                      <strong>0.82</strong>
                    </span>
                    <span>
                      <small>SECOND CAMERA</small>
                      <strong>Side view · synced</strong>
                    </span>
                  </div>
                </div>

                <div
                  className="incident-analysis-data"
                  data-motion-phase="trace"
                >
                  <PerclosTrace />
                  <div className="incident-analysis-data__event">
                    <span>
                      <small>Eye closure trace</small>
                      <strong>2.8s</strong>
                    </span>
                    <span>
                      <small>Event buffer</small>
                      <strong>04.2s</strong>
                    </span>
                  </div>
                  <dl className="incident-analysis-data__facts">
                    <div>
                      <dt>PERCLOS</dt>
                      <dd>34%</dd>
                    </div>
                    <div>
                      <dt>Vehicle</dt>
                      <dd>62 km/h</dd>
                    </div>
                    <div>
                      <dt>Context</dt>
                      <dd>GPS · CAN attached</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="incident-context">
                <div>
                  <span>Signal</span>
                  <strong>PERCLOS 34%</strong>
                </div>
                <div>
                  <span>Vehicle</span>
                  <strong>62 km/h</strong>
                </div>
                <div>
                  <span>
                    <MapPin aria-hidden size={11} />
                    Context
                  </span>
                  <strong>GPS and CAN context</strong>
                </div>
              </div>
            </div>

            <div className="incident-review">
              <div className="incident-review__header">
                <span>SEALED RECORD</span>
                <strong>evt_1a7f9c2e</strong>
              </div>
              <ul
                className="evidence-artifacts"
                data-motion-phase="evidence"
                aria-label="Sealed evidence artifacts"
              >
                <li>
                  <FileVideo aria-hidden size={14} />
                  <span>
                    <strong>Event clip</strong>
                    <small>04.2s · playable</small>
                  </span>
                  <Check aria-hidden size={12} />
                </li>
                <li>
                  <MapPin aria-hidden size={14} />
                  <span>
                    <strong>GPS and CAN</strong>
                    <small>Position + vehicle state</small>
                  </span>
                  <Check aria-hidden size={12} />
                </li>
                <li>
                  <FileCheck2 aria-hidden size={14} />
                  <span>
                    <strong>Checksum</strong>
                    <small>5C7A…91D2 verified</small>
                  </span>
                  <Check aria-hidden size={12} />
                </li>
                <li>
                  <Fingerprint aria-hidden size={14} />
                  <span>
                    <strong>Operator acknowledgement</strong>
                    <small>Pending review action</small>
                  </span>
                  <span className="artifact-pending">READY</span>
                </li>
              </ul>

              <ol
                className="incident-timeline"
                data-motion-phase="review"
                aria-label="Incident evidence chain"
              >
                {incidentSteps.map((step, index) => (
                  <li
                    className={`incident-step incident-step--${step.tone}`}
                    key={step.state}
                  >
                    <div className="incident-step__marker" aria-hidden>
                      {index === incidentSteps.length - 1 ? (
                        <ShieldCheck size={15} />
                      ) : (
                        <Check size={14} />
                      )}
                    </div>
                    <div>
                      <time dateTime={step.timestamp}>{step.timestamp}</time>
                      <strong>{step.label}</strong>
                      <p>{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </MotionSurface>

      <p className="proof-note">
        <ShieldCheck aria-hidden size={15} />
        {proofBoundary.detail}
      </p>
    </section>
  );
}
