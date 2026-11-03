"use client";
import Link from "next/link";
import { useState } from "react";
import { CONTACT } from "@/lib/data";
import { Button } from "./Button";
import { Icon } from "./Icon";

type State = "idle" | "sending" | "sent";

/** Meldeverfahren nach Art. 16 DSA: Versand über dieselbe Route wie das Kontaktformular, mit Eingangsbestätigung an den Meldenden */
export function ReportForm() {
  const [state, setState] = useState<State>("idle");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (!d.name?.trim() || !/.+@.+\..+/.test(d.email || "") || !d.url?.trim() || !d.reason?.trim()) {
      setError("Bitte füllen Sie alle Pflichtfelder aus und geben Sie eine gültige E-Mail-Adresse an.");
      return;
    }
    setError("");
    setState("sending");
    const message = `Betroffene Adresse (URL): ${d.url}\n\nBegründung, warum der Inhalt rechtswidrig ist:\n${d.reason}\n\nDer Meldende erklärt, dass seine Angaben nach bestem Wissen und Gewissen richtig und vollständig sind.`;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: d.name, email: d.email, website: d.website, service: "Meldung rechtswidriger Inhalte (Art. 16 DSA)", report: "1", message }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
    } catch {
      setState("idle");
      setError(`Die Meldung konnte nicht gesendet werden. Bitte schreiben Sie uns direkt an ${CONTACT.email}.`);
    }
  }

  if (state === "sent") {
    return (
      <div className="form-card" role="status">
        <p style={{ margin: 0, font: "var(--type-body)" }}>
          <Icon name="check" size={16} /> Ihre Meldung ist bei uns eingegangen. Eine Eingangsbestätigung senden wir Ihnen per E-Mail.
        </p>
      </div>
    );
  }

  return (
    <div className="form-card">
      <form className="form-grid" onSubmit={submit} noValidate>
        <label className="field">
          <span className="field__label">Name <span>*</span></span>
          <input name="name" className="field__control" autoComplete="name" />
        </label>
        <label className="field">
          <span className="field__label">E-Mail <span>*</span></span>
          <input name="email" type="email" className="field__control" autoComplete="email" />
        </label>
        <label className="field full">
          <span className="field__label">Genaue Adresse (URL) des Inhalts <span>*</span></span>
          <input name="url" className="field__control" placeholder="https://…" />
        </label>
        <label className="field full">
          <span className="field__label">Warum ist der Inhalt rechtswidrig? <span>*</span></span>
          <textarea name="reason" rows={5} className="field__control" />
        </label>
        <div className="honey" aria-hidden="true">
          <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <label className="consent">
          <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />
          <span className="consent__box">{ok && <Icon name="check" size={14} />}</span>
          <span>
            Ich bin überzeugt, dass meine Angaben richtig und vollständig sind. Hinweise zum Datenschutz in der{" "}
            <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </span>
        </label>
        {error && <p className="form-status" role="alert">{error}</p>}
        <div className="form-foot">
          <span className="form-note">* Pflichtfelder</span>
          <Button type="submit" disabled={!ok || state === "sending"}>{state === "sending" ? "Wird gesendet …" : "Meldung senden"}</Button>
        </div>
      </form>
    </div>
  );
}
