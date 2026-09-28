import type { ReactNode } from "react";

export function Eyebrow({ children, align = "left", className = "" }: { children: ReactNode; align?: "left" | "center"; className?: string }) {
  return (
    <div className={`eyebrow ${align === "center" ? "eyebrow--center" : ""} ${className}`}>
      <span className="eyebrow__rule" aria-hidden="true" />
      <span className="eyebrow__text">{children}</span>
      {align === "center" && <span className="eyebrow__rule" aria-hidden="true" />}
    </div>
  );
}
