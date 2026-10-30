import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { UPLOAD_MAX_FILES, UPLOAD_MAX_MB } from "@/lib/briefing";
import { filesOf, ipOf, limited, parsePath, sameOrigin } from "@/lib/briefing-server";

export const runtime = "nodejs";

/**
 * Stellt für jede einzelne Datei eine Upload-Freigabe aus. Die Datei geht danach direkt
 * vom Browser in den Vercel-Blob-Speicher (nicht über diesen Server, daher bis 25 MB möglich).
 * Freigabe nur für: richtigen Ordner, erlaubte Endung, max. 25 MB, max. 20 Dateien je Briefing.
 */
export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: "Upload nicht eingerichtet" }, { status: 503 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "Nicht erlaubt" }, { status: 403 });
  let body: HandleUploadBody;
  try { body = (await req.json()) as HandleUploadBody; } catch { return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 }); }

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (limited("up:" + ipOf(req), 40, 60 * 60 * 1000)) throw new Error("Zu viele Uploads. Bitte später erneut versuchen.");
        const p = parsePath(pathname);
        if (!p) throw new Error("Dateiname oder Format nicht erlaubt.");
        const existing = await filesOf(p.id);
        if (existing.length >= UPLOAD_MAX_FILES) throw new Error(`Höchstens ${UPLOAD_MAX_FILES} Dateien je Briefing.`);
        return {
          maximumSizeInBytes: UPLOAD_MAX_MB * 1024 * 1024,
          addRandomSuffix: true, // nicht erratbare Adresse
          allowOverwrite: false,
          validUntil: Date.now() + 30 * 60 * 1000,
          tokenPayload: JSON.stringify({ id: p.id }),
        };
      },
      onUploadCompleted: async () => {
        /* Prüfung des Inhalts erfolgt beim Absenden des Briefings */
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Upload abgelehnt" }, { status: 400 });
  }
}
