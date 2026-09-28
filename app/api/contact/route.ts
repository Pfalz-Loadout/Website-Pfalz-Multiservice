import { NextResponse } from "next/server";

/**
 * Kontaktformular-Versand über Resend (https://resend.com).
 * In Vercel unter Settings → Environment Variables setzen:
 *   RESEND_API_KEY   = re_xxx
 *   CONTACT_TO       = kontakt@pfalz-loadout.de   (Empfänger)
 *   CONTACT_FROM     = Pfalz Multiservice <anfrage@ihre-domain.de>  (verifizierte Absender-Domain)
 * Ohne Konfiguration antwortet die Route mit { fallback: true } und das Formular öffnet das E-Mail-Programm.
 */
export async function POST(req: Request) {
  let data: Record<string, string>;
  try { data = await req.json(); } catch { return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 }); }

  if (data.website) return NextResponse.json({ ok: true }); // Honeypot: Bots still ignorieren
  const name = (data.name || "").trim().slice(0, 200);
  const email = (data.email || "").trim().slice(0, 200);
  const message = (data.message || "").trim().slice(0, 5000);
  if (!name || !/.+@.+\..+/.test(email) || !message) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ fallback: true }, { status: 503 });

  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
  const rows = [
    ["Name", name], ["Unternehmen", data.company || "–"], ["E-Mail", email], ["Telefon", data.phone || "–"],
    ["Leistungsbereich", data.service || "Allgemeine Anfrage"],
  ];
  const html = `<h2>Neue Anfrage über pfalz-multiservice</h2><table>${rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${esc(String(v))}</td></tr>`).join("")}</table>
    <p style="white-space:pre-wrap">${esc(message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Pfalz Multiservice <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || "kontakt@pfalz-loadout.de"],
      reply_to: email,
      subject: `Anfrage: ${data.service || "Allgemeine Anfrage"} – ${name}`,
      html,
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "Versand fehlgeschlagen" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
