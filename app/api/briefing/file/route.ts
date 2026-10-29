import { get } from "@vercel/blob";
import { ACCESS, parsePath, verify } from "@/lib/briefing-server";

export const runtime = "nodejs";

/**
 * Download-Link aus der Briefing-E-Mail. Nur mit gültiger Signatur, immer als Download
 * (nie im Browser geöffnet), damit keine Datei auf dieser Website Code ausführen kann.
 */
export async function GET(req: Request) {
  const u = new URL(req.url);
  const p = u.searchParams.get("p") || "";
  const s = u.searchParams.get("s") || "";
  const info = parsePath(p);
  if (!info || !verify(p, s)) return new Response("Link ungültig.", { status: 403 });
  const r = await get(p, { access: ACCESS }).catch(() => null);
  if (!r?.stream) return new Response("Datei nicht mehr vorhanden (Dateien werden nach 30 Tagen gelöscht).", { status: 404 });
  const name = p.split("/").pop() || "datei";
  return new Response(r.stream, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${name.replace(/"/g, "")}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
