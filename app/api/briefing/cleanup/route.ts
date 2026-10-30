import { NextResponse } from "next/server";
import { del, list } from "@vercel/blob";
import { FILE_TTL_DAYS } from "@/lib/briefing-server";

export const runtime = "nodejs";

/**
 * Täglicher Aufräum-Job (Vercel Cron, siehe vercel.json):
 * löscht Briefing-Dateien nach 30 Tagen und nie abgeschickte Uploads nach 2 Tagen.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Nicht erlaubt" }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ skipped: true });

  const now = Date.now();
  const all: { url: string; pathname: string; uploadedAt: Date }[] = [];
  let cursor: string | undefined;
  do {
    const r = await list({ prefix: "briefing/", cursor, limit: 1000 });
    all.push(...r.blobs);
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);

  const submitted = new Set(all.filter((b) => b.pathname.endsWith("/_abgeschickt.json")).map((b) => b.pathname.split("/")[1]));
  const old = all.filter((b) => {
    const age = (now - new Date(b.uploadedAt).getTime()) / 86400000;
    const id = b.pathname.split("/")[1];
    return age > FILE_TTL_DAYS || (!submitted.has(id) && age > 2);
  });
  for (let i = 0; i < old.length; i += 100) await del(old.slice(i, i + 100).map((b) => b.url));
  return NextResponse.json({ deleted: old.length });
}
