"use client";

import { usePathname } from "next/navigation";
import { CONTACT } from "@/lib/data";
import { Icon } from "./Icon";

/** Feste, schlanke Kontaktleiste am unteren Rand (nur Handy). Auf Kontakt und Impressum steht die Nummer ohnehin im Blick. */
export function ContactBar() {
  const path = usePathname();
  if (path.startsWith("/kontakt") || path.startsWith("/impressum")) return null;
  return (
    <nav className="cbar" aria-label="Schnellkontakt">
      <a className="cbar__item" href={CONTACT.phoneHref}>
        <Icon name="phone" size={17} />
        <span>Anrufen</span>
      </a>
      <a className="cbar__item cbar__item--wa" href={CONTACT.whatsapp} target="_blank" rel="noopener">
        <Icon name="message-circle" size={17} />
        <span>WhatsApp</span>
      </a>
    </nav>
  );
}
