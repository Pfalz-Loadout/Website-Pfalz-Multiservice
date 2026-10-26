"use client";
import { useEffect } from "react";

/** Kopieren, Ausschneiden und Ziehen von Inhalten unterbinden – Formularfelder bleiben normal nutzbar */
export function CopyGuard() {
  useEffect(() => {
    const isField = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("input, textarea, select, [contenteditable='true']");
    const block = (e: Event) => { if (!isField(e.target)) e.preventDefault(); };
    const events = ["copy", "cut", "dragstart", "contextmenu"] as const;
    events.forEach((ev) => document.addEventListener(ev, block));
    return () => events.forEach((ev) => document.removeEventListener(ev, block));
  }, []);
  return null;
}
