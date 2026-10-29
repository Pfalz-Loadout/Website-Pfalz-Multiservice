import { createHmac, timingSafeEqual } from "node:crypto";
import { get, list } from "@vercel/blob";
import { BRIEFING, UPLOAD_MAX_MB, UPLOAD_TYPES } from "./briefing";
import { checkBytes } from "./filesig";

/** Ordner im Blob-Speicher: briefing/<id>/<feld>/<dateiname> */
export const ID_RE = /^[a-f0-9]{32}$/;
export const FIELD_IDS = BRIEFING.flatMap((s) => s.fields.filter((f) => f.kind === "files").map((f) => f.id));
export const FILE_TTL_DAYS = 30;
export type Access = "private" | "public";
export const ACCESS: Access = (process.env.BLOB_ACCESS || process.env.NEXT_PUBLIC_BLOB_ACCESS) === "public" ? "public" : "private";

/** Dateiname bereinigen: nur Buchstaben, Ziffern, Punkt, Bindestrich, Unterstrich */
export function safeName(name: string) {
  const ext = (name.split(".").pop() || "").toLowerCase();
  const base = name.slice(0, name.length - ext.length - 1)
    .normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "datei";
  return { base, ext };
}

/** Prüft einen Blob-Pfad: richtiger Ordner, bekanntes Feld, erlaubte Endung */
export function parsePath(pathname: string) {
  const m = /^briefing\/([a-f0-9]{32})\/([a-z_]+)\/([A-Za-z0-9_.-]+)$/.exec(pathname);
  if (!m || !FIELD_IDS.includes(m[2])) return null;
  const ext = (m[3].split(".").pop() || "").toLowerCase();
  if (!UPLOAD_TYPES[ext]) return null;
  return { id: m[1], field: m[2], file: m[3], ext };
}

/* ---------- Signierte Download-Links (gültig, solange die Datei existiert) ---------- */
function key() {
  const k = process.env.BRIEFING_SECRET || process.env.BLOB_READ_WRITE_TOKEN;
  if (!k) throw new Error("Kein Schlüssel für Download-Links konfiguriert");
  return k;
}
export function sign(pathname: string) {
  return createHmac("sha256", key()).update("briefing-file:" + pathname).digest("base64url");
}
export function verify(pathname: string, sig: string) {
  const a = Buffer.from(sign(pathname)), b = Buffer.from(sig || "");
  return a.length === b.length && timingSafeEqual(a, b);
}

/* ---------- Inhaltsprüfung: passt der Dateiinhalt zur Endung? ---------- */
async function readHead(pathname: string, bytes: number): Promise<Buffer | null> {
  const r = await get(pathname, { access: ACCESS }).catch(() => null);
  if (!r?.stream) return null;
  const reader = r.stream.getReader();
  const chunks: Uint8Array[] = [];
  let n = 0;
  while (n < bytes) {
    const { done, value } = await reader.read();
    if (done || !value) break;
    chunks.push(value); n += value.length;
  }
  await reader.cancel().catch(() => {});
  return Buffer.concat(chunks).subarray(0, bytes);
}

/** Gibt einen Grund zurück, wenn die Datei abgelehnt wird – sonst null */
export async function inspect(pathname: string, ext: string, size: number): Promise<string | null> {
  if (size > UPLOAD_MAX_MB * 1024 * 1024) return "größer als erlaubt";
  if (size === 0) return "leer";
  const b = await readHead(pathname, ext === "svg" ? 1024 * 1024 : 64);
  if (!b) return "nicht lesbar";
  return checkBytes(b, ext);
}

/** Alle hochgeladenen Dateien einer Einsendung (aus dem Speicher, nicht aus Angaben des Browsers) */
export async function filesOf(id: string) {
  const out: { pathname: string; size: number; uploadedAt: Date }[] = [];
  let cursor: string | undefined;
  do {
    const r = await list({ prefix: `briefing/${id}/`, cursor, limit: 100 });
    out.push(...r.blobs.map((b) => ({ pathname: b.pathname, size: b.size, uploadedAt: b.uploadedAt })));
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  return out;
}

/* ---------- Einfacher Schutz gegen Massen-Anfragen (je Server-Instanz) ---------- */
const hits = new Map<string, number[]>();
export function limited(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}
export const ipOf = (req: Request) => (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unbekannt";

/** Nur Anfragen von der eigenen Website annehmen */
export function sameOrigin(req: Request) {
  const o = req.headers.get("origin");
  if (!o) return true; // manche Browser senden bei gleicher Herkunft keinen Origin
  try {
    const h = new URL(o).hostname;
    return h === new URL(req.url).hostname || h === "www.pfalz-multiservice.de" || h === "pfalz-multiservice.de" || h === "localhost";
  } catch {
    return false;
  }
}
