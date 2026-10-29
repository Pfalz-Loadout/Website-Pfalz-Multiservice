/** Erkennt anhand der ersten Bytes, ob der Dateiinhalt zur Endung passt – und blockt Programme. */
const starts = (b: Buffer, sig: number[] | string, at = 0) => {
  const s = typeof sig === "string" ? Buffer.from(sig, "latin1") : Buffer.from(sig);
  return b.length >= at + s.length && b.subarray(at, at + s.length).equals(s);
};
const isFtyp = (b: Buffer, brands?: string[]) => starts(b, "ftyp", 4) && (!brands || brands.includes(b.subarray(8, 12).toString("latin1")));
const looksText = (b: Buffer) => !b.includes(0);


export function checkBytes(b: Buffer, ext: string): string | null {
  // Ausführbare Programme erkennen, egal welche Endung (Windows, Linux, macOS, Skripte)
  if (starts(b, "MZ") || starts(b, [0x7f, 0x45, 0x4c, 0x46]) || starts(b, [0xcf, 0xfa, 0xed, 0xfe]) || starts(b, [0xca, 0xfe, 0xba, 0xbe]) || starts(b, "#!"))
    return "ausführbare Datei";
  const ok: Record<string, () => boolean> = {
    pdf: () => starts(b, "%PDF"),
    png: () => starts(b, [0x89, 0x50, 0x4e, 0x47]),
    jpg: () => starts(b, [0xff, 0xd8, 0xff]),
    jpeg: () => starts(b, [0xff, 0xd8, 0xff]),
    gif: () => starts(b, "GIF8"),
    webp: () => starts(b, "RIFF") && starts(b, "WEBP", 8),
    tif: () => starts(b, [0x49, 0x49, 0x2a, 0x00]) || starts(b, [0x4d, 0x4d, 0x00, 0x2a]),
    tiff: () => starts(b, [0x49, 0x49, 0x2a, 0x00]) || starts(b, [0x4d, 0x4d, 0x00, 0x2a]),
    heic: () => isFtyp(b, ["heic", "heix", "hevc", "hevx", "mif1", "msf1", "heim", "heis"]),
    heif: () => isFtyp(b, ["heic", "heix", "hevc", "hevx", "mif1", "msf1", "heim", "heis"]),
    mp4: () => isFtyp(b),
    mov: () => isFtyp(b) || starts(b, "moov", 4) || starts(b, "wide", 4) || starts(b, "mdat", 4) || starts(b, "free", 4),
    zip: () => starts(b, [0x50, 0x4b, 0x03, 0x04]) || starts(b, [0x50, 0x4b, 0x05, 0x06]),
    docx: () => starts(b, [0x50, 0x4b, 0x03, 0x04]),
    xlsx: () => starts(b, [0x50, 0x4b, 0x03, 0x04]),
    pptx: () => starts(b, [0x50, 0x4b, 0x03, 0x04]),
    odt: () => starts(b, [0x50, 0x4b, 0x03, 0x04]),
    ai: () => starts(b, "%PDF") || starts(b, "%!PS"),
    eps: () => starts(b, "%!PS") || starts(b, [0xc5, 0xd0, 0xd3, 0xc6]),
    txt: () => looksText(b),
    svg: () => {
      if (!looksText(b)) return false;
      const s = b.toString("utf8").replace(/^﻿/, "").trimStart().toLowerCase();
      if (!(s.startsWith("<svg") || s.startsWith("<?xml") || s.startsWith("<!--") || s.startsWith("<!doctype svg"))) return false;
      // SVG mit Skript oder Event-Handlern kann beim Öffnen im Browser Code ausführen
      return !/<script|javascript:|\son[a-z]+\s*=|<foreignobject/i.test(s);
    },
  };
  const check = ok[ext];
  if (!check) return "Format nicht erlaubt";
  return check() ? null : "Inhalt passt nicht zur Dateiendung";
}
