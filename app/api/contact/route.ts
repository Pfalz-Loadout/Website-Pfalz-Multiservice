import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/**
 * Kontaktformular-Versand direkt über das eigene Strato-Postfach (SMTP), ohne Drittanbieter.
 * In Vercel unter Settings → Environment Variables setzen (Production + Preview):
 *   SMTP_USER   = kontakt@pfalz-multiservice.de
 *   SMTP_PASS   = Passwort des Strato-Postfachs
 *   optional: SMTP_HOST (Standard smtp.strato.de), SMTP_PORT (Standard 465), CONTACT_TO (Standard = SMTP_USER)
 * Ohne Konfiguration antwortet die Route mit { fallback: true } und das Formular öffnet das E-Mail-Programm.
 */
export async function POST(req: Request) {
  let data: Record<string, string>;
  try { data = await req.json(); } catch { return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 }); }

  if (data.website) return NextResponse.json({ ok: true }); // Honeypot: Bots still ignorieren
  const clean = (s: unknown, max: number) => String(s ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
  const name = clean(data.name, 200);
  const email = clean(data.email, 200);
  const company = clean(data.company, 200);
  const phone = clean(data.phone, 100);
  const service = clean(data.service, 120) || "Allgemeine Anfrage";
  const message = String(data.message ?? "").trim().slice(0, 5000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 422 });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return NextResponse.json({ fallback: true }, { status: 503 });

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.strato.de",
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
  const rows: [string, string][] = [
    ["Name", name], ["Unternehmen", company || "–"], ["E-Mail", email], ["Telefon", phone || "–"], ["Leistungsbereich", service],
  ];
  const html = `<h2 style="font-family:sans-serif">Neue Anfrage über pfalz-multiservice.de</h2><table style="font-family:sans-serif">${rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${esc(v)}</td></tr>`).join("")}</table>
    <p style="font-family:sans-serif;white-space:pre-wrap">${esc(message)}</p>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`;

  try {
    await transporter.sendMail({
      from: `"Pfalz Multiservice – Kontaktformular" <${user}>`,
      to: process.env.CONTACT_TO || user,
      replyTo: { name, address: email },
      subject: `Anfrage: ${service} – ${name}`,
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] Versand fehlgeschlagen:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Versand fehlgeschlagen" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
