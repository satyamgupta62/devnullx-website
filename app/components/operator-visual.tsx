"use client";

import { Check, FileVideo } from "lucide-react";
import { useState } from "react";

type QueueEvent = {
  device: string;
  event: string;
  time: string;
  location: string;
  evidence: string;
};

const reviewQueue: QueueEvent[] = [
  {
    device: "AGR-006",
    event: "Drowsiness · High",
    time: "10:24:31",
    location: "NH44 · Nagpur approach",
    evidence: "Clip · GPS · CAN",
  },
  {
    device: "AGR-011",
    event: "Camera obstruction",
    time: "10:17:12",
    location: "NH48 · Surat bypass",
    evidence: "Tamper flag · GPS",
  },
  {
    device: "AGR-019",
    event: "Following distance",
    time: "10:14:06",
    location: "NH16 · Vijayawada ring",
    evidence: "Clip · GPS · CAN",
  },
];

function SurfaceToolbar({
  label,
  state,
}: {
  label: string;
  state: string;
}) {
  return (
    <div className="surface-toolbar">
      <span>
        <i />
        {label}
      </span>
      <span>{state}</span>
    </div>
  );
}

export function OperatorVisual() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [acknowledged, setAcknowledged] = useState<string[]>([]);

  const selected = reviewQueue[selectedIndex];
  const isAcknowledged = acknowledged.includes(selected.device);
  const pending = reviewQueue.length - acknowledged.length;

  return (
    <section
      className="plane-visual operator-product"
      aria-label="Operator review workspace — select an event to inspect it"
    >
      <SurfaceToolbar
        label="FLEET COMMAND"
        state={`${pending} EVENT${pending === 1 ? "" : "S"} IN QUEUE`}
      />
      <div className="operator-product__body">
        <div className="operator-review-queue">
          <div className="operator-review-queue__label">
            <span>Review queue</span>
            <small>Newest first</small>
          </div>
          {reviewQueue.map((event, index) => (
            <button
              aria-pressed={index === selectedIndex}
              className={`operator-review-row${
                index === selectedIndex ? " operator-review-row--active" : ""
              }${
                acknowledged.includes(event.device)
                  ? " operator-review-row--done"
                  : ""
              }`}
              key={event.device}
              onClick={() => setSelectedIndex(index)}
              type="button"
            >
              <span>
                <strong>{event.device}</strong>
                <small>{event.event}</small>
              </span>
              {acknowledged.includes(event.device) ? (
                <Check aria-label="Acknowledged" size={12} />
              ) : (
                <time dateTime={event.time}>{event.time}</time>
              )}
            </button>
          ))}
        </div>
        <div className="operator-event-detail">
          <div className="operator-event-detail__heading">
            <span>
              <small>SELECTED EVENT</small>
              <strong>{selected.event}</strong>
            </span>
            <FileVideo aria-hidden size={17} />
          </div>
          <dl>
            <div>
              <dt>Vehicle</dt>
              <dd>{selected.device}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{selected.location}</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>{selected.evidence}</dd>
            </div>
          </dl>
          <button
            className={`operator-event-detail__action${
              isAcknowledged ? " operator-event-detail__action--done" : ""
            }`}
            onClick={() =>
              setAcknowledged((prev) =>
                prev.includes(selected.device)
                  ? prev.filter((device) => device !== selected.device)
                  : [...prev, selected.device],
              )
            }
            type="button"
          >
            <Check aria-hidden size={12} />
            <span>
              {isAcknowledged ? "Event acknowledged" : "Acknowledge event"}
            </span>
            <kbd>A</kbd>
          </button>
        </div>
      </div>
    </section>
  );
}
