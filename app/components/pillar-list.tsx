"use client";

import { ArrowRight } from "lucide-react";
import type { PointerEvent } from "react";
import { productPillars } from "../content/product";

const pillarTones = {
  safety: "coral",
  operations: "cyan",
  relay: "violet",
} as const;

export function PillarList() {
  function handlePointerMove(event: PointerEvent<HTMLOListElement>) {
    const item = (event.target as HTMLElement).closest("li");
    if (!item) {
      return;
    }
    const rect = item.getBoundingClientRect();
    item.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    item.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <ol className="pillar-list" onPointerMove={handlePointerMove}>
      {productPillars.map((pillar) => (
        <li data-tone={pillarTones[pillar.id]} key={pillar.id}>
          <span className="pillar-list__index">{pillar.index}</span>
          <div className="pillar-list__copy">
            <span>{pillar.eyebrow}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
            <ul>
              {pillar.proof.map((proof) => (
                <li key={proof}>{proof}</li>
              ))}
            </ul>
          </div>
          <ArrowRight className="pillar-list__arrow" aria-hidden size={18} />
        </li>
      ))}
    </ol>
  );
}
