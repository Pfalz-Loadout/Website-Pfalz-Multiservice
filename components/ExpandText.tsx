"use client";
import { useId, useState } from "react";

/**
 * Beschreibungstext, der auf dem Handy nur eine Zeile zeigt und per Pfeil aufgeklappt wird.
 * Am Desktop steht der Text vollständig da, der Pfeil ist ausgeblendet (CSS .xt).
 */
export function ExpandText({ text, className = "", wrapClassName = "" }: { text: string; className?: string; wrapClassName?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`xt ${open ? "is-open" : ""} ${wrapClassName}`.trim()}>
      <p id={id} className={`xt__text ${className}`.trim()}>{text}</p>
      <button type="button" className="xt__btn" aria-controls={id} aria-expanded={open}
        aria-label={open ? "Beschreibung zuklappen" : "Beschreibung aufklappen"} onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
