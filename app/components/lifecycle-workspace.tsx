"use client";

import {
  Check,
  FileCheck2,
  MapPin,
  Radio,
  RotateCcw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { networkRoute, proofBoundary } from "../content/product";
import { AxonHardwareFrame } from "./product-demo";
import { StatusPill } from "./status-pill";

const lifecycleSchedule = [
  { stage: 0, at: 0 },
  { stage: 1, at: 2400 },
  { stage: 2, at: 4700 },
  { stage: 3, at: 7200 },
] as const;
const lifecycleDuration = 10800;

const eventJourney = [
  {
    label: "Detected",
    detail: "Edge signal",
    time: "10:24:31",
    tone: "coral",
  },
  {
    label: "Contextualized",
    detail: "GPS · CAN · clip",
    time: "10:24:32",
    tone: "cyan",
  },
  {
    label: "Reviewed",
    detail: "Operator queue",
    time: "10:24:38",
    tone: "mint",
  },
  {
    label: "Handed off",
    detail: "Relay ready",
    time: "10:25:04",
    tone: "violet",
  },
] as const;

type LifecycleStageState = "active" | "complete" | "idle";

function getStageState(
  index: number,
  activeStage: number,
  shouldReduceMotion: boolean,
): LifecycleStageState {
  if (shouldReduceMotion || index < activeStage) {
    return "complete";
  }

  return index === activeStage ? "active" : "idle";
}

export function LifecycleWorkspace() {
  const workspaceRef = useRef<HTMLElement>(null);
  const inertViewportRef = useRef<HTMLElement>(null);
  const elapsedRef = useRef(0);
  const scheduleRevisionRef = useRef(0);
  const supportsIntersectionObserver =
    typeof IntersectionObserver !== "undefined";
  const viewportRef = supportsIntersectionObserver
    ? workspaceRef
    : inertViewportRef;
  const observedInView = useInView(viewportRef, {
    amount: 0.2,
    initial: false,
  });
  const isInView = supportsIntersectionObserver && observedInView;
  const shouldReduceMotion = useReducedMotion() === true;
  const [observerReady, setObserverReady] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [activeStage, setActiveStage] = useState(0);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [keyboardFocusedStage, setKeyboardFocusedStage] = useState<
    number | null
  >(null);
  const [stageRuns, setStageRuns] = useState([0, 0, 0, 0]);
  const [scheduleRevision, setScheduleRevision] = useState(0);
  const staticMode = shouldReduceMotion || !observerReady;
  const clockRunning =
    documentVisible && isInView && !shouldReduceMotion && observerReady;

  useEffect(() => {
    const updateDocumentVisibility = () => {
      setDocumentVisible(document.visibilityState !== "hidden");
    };

    setObserverReady(supportsIntersectionObserver);
    updateDocumentVisibility();
    document.addEventListener("visibilitychange", updateDocumentVisibility);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        updateDocumentVisibility,
      );
    };
  }, [supportsIntersectionObserver]);

  useEffect(() => {
    if (!clockRunning) {
      return;
    }

    const resumeAt = elapsedRef.current;
    const startedAt = Date.now();
    const startedRevision = scheduleRevision;
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    let resumeStage = 0;

    for (const item of lifecycleSchedule) {
      if (item.at <= resumeAt) {
        resumeStage = item.stage;
      }
    }

    setActiveStage(resumeStage);

    for (const item of lifecycleSchedule) {
      if (item.at <= resumeAt) {
        continue;
      }

      timers.push(
        setTimeout(() => {
          setActiveStage(item.stage);
        }, item.at - resumeAt),
      );
    }

    timers.push(
      setTimeout(() => {
        elapsedRef.current = 0;
        setActiveStage(0);
        scheduleRevisionRef.current += 1;
        setScheduleRevision(scheduleRevisionRef.current);
      }, lifecycleDuration - resumeAt),
    );

    return () => {
      for (const timer of timers) {
        clearTimeout(timer);
      }

      if (scheduleRevisionRef.current === startedRevision) {
        elapsedRef.current = Math.min(
          lifecycleDuration,
          resumeAt + Math.max(0, Date.now() - startedAt),
        );
      }
    };
  }, [clockRunning, scheduleRevision]);

  const inspectedStage = keyboardFocusedStage ?? hoveredStage;

  const restartStageVisual = (index: number) => {
    setStageRuns((runs) =>
      runs.map((run, runIndex) => (runIndex === index ? run + 1 : run)),
    );
  };

  const beginPointerInspection = (index: number) => {
    if (inspectedStage !== index) {
      restartStageVisual(index);
    }
    setHoveredStage(index);
  };

  const beginFocusInspection = (index: number) => {
    if (inspectedStage !== index) {
      restartStageVisual(index);
    }
    setKeyboardFocusedStage(index);
  };

  const activateInspection = (index: number, clickDetail: number) => {
    if (inspectedStage !== index) {
      restartStageVisual(index);
      setKeyboardFocusedStage(index);
      return;
    }

    if (clickDetail === 0) {
      restartStageVisual(index);
    }
  };

  const replayLifecycle = () => {
    elapsedRef.current = 0;
    setActiveStage(0);
    setHoveredStage(null);
    setKeyboardFocusedStage(null);
    setStageRuns((runs) => runs.map((run) => run + 1));
    scheduleRevisionRef.current += 1;
    setScheduleRevision(scheduleRevisionRef.current);
  };

  const stageStates = lifecycleSchedule.map(({ stage }) =>
    getStageState(stage, activeStage, staticMode),
  );
  const operatorAcknowledged = stageStates[2] !== "idle";
  const relayVerified = stageStates[3] !== "idle";

  return (
    <section
      aria-label={`${networkRoute.deviceId} event lifecycle`}
      className="lifecycle-workspace"
      data-clock-state={clockRunning ? "running" : "paused"}
      data-reduced-motion={shouldReduceMotion ? "true" : "false"}
      ref={workspaceRef}
    >
      <div className="lifecycle-workspace__bar">
        <span>
          <i />
          {networkRoute.deviceId}
          <small>Drowsiness event</small>
        </span>
        <span>
          Illustrative product demonstration
          <StatusPill
            tone="mint"
            icon={<Radio aria-hidden size={11} strokeWidth={2} />}
          >
            {networkRoute.status}
          </StatusPill>
          <button
            aria-label="Replay full event lifecycle"
            className="lifecycle-workspace__replay"
            onClick={replayLifecycle}
            type="button"
          >
            <RotateCcw aria-hidden size={12} />
            <span>Replay</span>
          </button>
        </span>
      </div>

      <span
        aria-label={`Illustrative ${networkRoute.origin} to ${networkRoute.destination} route for ${networkRoute.deviceId}`}
        className="sr-only"
        role="img"
      />

      <div className="lifecycle-workspace__grid">
        <article
          className="lifecycle-pane lifecycle-pane--edge"
          data-stage-focus={inspectedStage === 0 ? "true" : "false"}
          data-stage-state={stageStates[0]}
          data-testid="lifecycle-edge"
        >
          <header className="lifecycle-pane__header">
            <span>
              <button
                aria-label="Inspect Axon edge"
                aria-pressed={inspectedStage === 0}
                onBlur={() => setKeyboardFocusedStage(null)}
                onClick={(event) => activateInspection(0, event.detail)}
                onFocus={() => beginFocusInspection(0)}
                onPointerEnter={() => beginPointerInspection(0)}
                onPointerLeave={() => setHoveredStage(null)}
                type="button"
              >
                <span aria-hidden>1</span>
              </button>
              Axon edge
            </span>
            <small>LIVE</small>
          </header>
          <div
            className="lifecycle-pane__body"
            data-testid="lifecycle-edge-motion"
            key={stageRuns[0]}
          >
            <AxonHardwareFrame compact />
            <dl className="lifecycle-metrics">
              <div>
                <dt>PERCLOS</dt>
                <dd>34%</dd>
              </div>
              <div>
                <dt>Closure</dt>
                <dd>2.8s</dd>
              </div>
              <div>
                <dt>Buffer</dt>
                <dd>04.2s</dd>
              </div>
            </dl>
            <ul
              aria-label="On-edge detection classes, Euro NCAP driver-state taxonomy"
              className="lifecycle-taxonomy"
            >
              <li data-active="true">microsleep</li>
              <li>sleep</li>
              <li>vats</li>
              <li>distraction</li>
              <li>cam-block</li>
            </ul>
          </div>
        </article>

        <article
          className="lifecycle-pane lifecycle-pane--evidence"
          data-stage-focus={inspectedStage === 1 ? "true" : "false"}
          data-stage-state={stageStates[1]}
          data-testid="lifecycle-evidence"
        >
          <header className="lifecycle-pane__header">
            <span>
              <button
                aria-label="Inspect Evidence sealed"
                aria-pressed={inspectedStage === 1}
                onBlur={() => setKeyboardFocusedStage(null)}
                onClick={(event) => activateInspection(1, event.detail)}
                onFocus={() => beginFocusInspection(1)}
                onPointerEnter={() => beginPointerInspection(1)}
                onPointerLeave={() => setHoveredStage(null)}
                type="button"
              >
                <span aria-hidden>2</span>
              </button>
              Evidence sealed
            </span>
            <small>ATTACHED</small>
          </header>
          <div className="lifecycle-pane__body" key={stageRuns[1]}>
          <div className="evidence-summary">
            <span>
              <FileCheck2 aria-hidden size={15} />
              <small>EVENT RECORD</small>
            </span>
            <strong>evt_1a7f9c2e</strong>
            <code>5C7A…91D2</code>
          </div>
          <div className="corridor-context">
            <div className="corridor-context__road" aria-hidden>
              <span />
              <i />
              <b />
            </div>
            <div className="corridor-context__places">
              <span>
                {networkRoute.origin}
                <small>Origin</small>
              </span>
              <span>
                NH44
                <small>Event context</small>
              </span>
              <span>
                {networkRoute.destination}
                <small>Relay point</small>
              </span>
            </div>
          </div>
          <dl className="evidence-facts">
            <div>
              <dt>Clip</dt>
              <dd>04.2s</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>GPS · CAN</dd>
            </div>
            <div>
              <dt>Speed trace</dt>
              <dd>−10s → +5s</dd>
            </div>
          </dl>
          </div>
        </article>

        <article
          className="lifecycle-pane lifecycle-pane--operator"
          data-stage-focus={inspectedStage === 2 ? "true" : "false"}
          data-stage-state={stageStates[2]}
          data-testid="lifecycle-operator"
        >
          <header className="lifecycle-pane__header">
            <span>
              <button
                aria-label="Inspect Operator review"
                aria-pressed={inspectedStage === 2}
                onBlur={() => setKeyboardFocusedStage(null)}
                onClick={(event) => activateInspection(2, event.detail)}
                onFocus={() => beginFocusInspection(2)}
                onPointerEnter={() => beginPointerInspection(2)}
                onPointerLeave={() => setHoveredStage(null)}
                type="button"
              >
                <span aria-hidden>3</span>
              </button>
              Operator review
            </span>
            <small>{operatorAcknowledged ? "ACKNOWLEDGED" : "IN QUEUE"}</small>
          </header>
          <div className="lifecycle-pane__body" key={stageRuns[2]}>
          <div className="operator-queue">
            <div className="operator-queue__title">
              <span>Review queue</span>
              <small>3 events</small>
            </div>
            <div className="operator-queue__item operator-queue__item--active">
              <span>
                <strong>{networkRoute.deviceId}</strong>
                <small>Drowsiness · High</small>
              </span>
              <time dateTime="10:24:31">10:24:31</time>
            </div>
            <div className="operator-queue__item">
              <span>
                <strong>AGR-011</strong>
                <small>Camera obstruction</small>
              </span>
              <time dateTime="10:17:12">10:17:12</time>
            </div>
            <div className="operator-queue__item">
              <span>
                <strong>AGR-019</strong>
                <small>Following distance</small>
              </span>
              <time dateTime="10:14:06">10:14:06</time>
            </div>
          </div>
          <div className="lifecycle-action">
            <UserCheck aria-hidden size={13} />
            {operatorAcknowledged ? "Acknowledged" : "Ready for review"}
            <kbd>A</kbd>
          </div>
          </div>
        </article>

        <article
          className="lifecycle-pane lifecycle-pane--relay"
          data-stage-focus={inspectedStage === 3 ? "true" : "false"}
          data-stage-state={stageStates[3]}
          data-testid="lifecycle-relay"
        >
          <header className="lifecycle-pane__header">
            <span>
              <button
                aria-label="Inspect Relay ready"
                aria-pressed={inspectedStage === 3}
                onBlur={() => setKeyboardFocusedStage(null)}
                onClick={(event) => activateInspection(3, event.detail)}
                onFocus={() => beginFocusInspection(3)}
                onPointerEnter={() => beginPointerInspection(3)}
                onPointerLeave={() => setHoveredStage(null)}
                type="button"
              >
                <span aria-hidden>4</span>
              </button>
              Relay ready
            </span>
            <small>{relayVerified ? "VERIFIED" : "PENDING"}</small>
          </header>
          <div className="lifecycle-pane__body" key={stageRuns[3]}>
          <div className="relay-summary">
            <ShieldCheck aria-hidden size={20} />
            <span>
              <small>CONTEXT CONTINUITY</small>
              <strong>Identity and evidence retained</strong>
            </span>
          </div>
          <dl className="relay-facts">
            <div>
              <dt>Incoming leg</dt>
              <dd>
                {networkRoute.origin} → {networkRoute.destination}
              </dd>
            </div>
            <div>
              <dt>Vehicle</dt>
              <dd>{networkRoute.deviceId}</dd>
            </div>
            <div>
              <dt>Outbound state</dt>
              <dd>Staged after review</dd>
            </div>
            <div>
              <dt>Driver pool</dt>
              <dd>2 ready · no-wait</dd>
            </div>
          </dl>
          <div className="relay-location">
            <MapPin aria-hidden size={13} />
            {networkRoute.destination} relay point
            <Check aria-hidden size={13} />
          </div>
          </div>
        </article>
      </div>

      <ol
        className="lifecycle-rail"
        aria-label="Event journey from edge detection to relay handoff"
      >
        {eventJourney.map((state, index) => (
          <li
            data-stage-state={stageStates[index]}
            key={state.label}
          >
            <span
              className={`lifecycle-rail__marker lifecycle-rail__marker--${state.tone}`}
            >
              {index === eventJourney.length - 1 ? (
                <Check aria-hidden size={10} />
              ) : (
                <i />
              )}
            </span>
            <span>
              <strong>{state.label}</strong>
              <small>{state.detail}</small>
            </span>
            <time dateTime={state.time}>{state.time}</time>
          </li>
        ))}
      </ol>

      <p className="sr-only">
        System proof sequence: {networkRoute.deviceId} Axon edge online; a
        drowsiness event is captured; GPS and CAN context plus the event clip
        are uploaded; evidence sealed and ready for operator review.
      </p>
      <p className="lifecycle-disclosure">
        <span>Demonstration boundary</span>A single event packet moves through
        the system; its evidence and route context never split apart.{" "}
        {proofBoundary.detail}
      </p>
    </section>
  );
}
