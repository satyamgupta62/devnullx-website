import type { ReactNode } from "react";

type StatusTone = "coral" | "cyan" | "mint" | "violet" | "quiet";

export function StatusPill({
  children,
  tone = "quiet",
  icon,
}: {
  children: ReactNode;
  tone?: StatusTone;
  icon?: ReactNode;
}) {
  return (
    <span className={`status-pill status-pill--${tone}`}>
      {icon}
      <span>{children}</span>
    </span>
  );
}
